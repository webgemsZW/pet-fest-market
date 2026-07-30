import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { getSiteSettings, type CurrentEvent } from "./get-site-settings";
import { allEventsQuery, eventBySlugQuery } from "./queries";

/**
 * A single event document. Same shape as the `currentEvent` projection on
 * Site Settings — kept as one type so every event surface (hero, listing,
 * detail page, structured data) agrees on the fields.
 */
export type EventDoc = CurrentEvent;

/**
 * All events, oldest → newest. CACHED and deterministic: it must NOT read
 * the current time (Cache Components forbids `Date.now()` / `new Date()`
 * inside `"use cache"`). The "which of these is upcoming?" decision is
 * made later, at request time, in `getEventsView()`.
 *
 * Tagged `sanity:type:event` so the Sanity publish webhook invalidates it
 * whenever ANY event doc changes.
 */
export async function getAllEvents(): Promise<EventDoc[]> {
  "use cache";
  cacheTag("sanity:type:event");
  cacheLife("sanity");

  if (!isSanityConfigured()) return [];

  try {
    return (await sanityClient.fetch<EventDoc[]>(allEventsQuery)) ?? [];
  } catch (error) {
    console.error("[sanity] all events fetch failed", error);
    return [];
  }
}

/**
 * A single event by slug — powers `/events/<slug>`. Cached; time-based
 * derived state (e.g. whether applications are still open) is computed by
 * the caller at request time.
 */
export async function getEventBySlug(slug: string): Promise<EventDoc | null> {
  "use cache";
  cacheTag("sanity:type:event");
  cacheLife("sanity");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<EventDoc | null>(eventBySlugQuery, { slug });
  } catch (error) {
    console.error("[sanity] event-by-slug fetch failed", error);
    return null;
  }
}

export interface EventsView {
  /**
   * The prominent (always UPCOMING) event shown in the hero and at the top
   * of /events. Null when no upcoming events exist — callers fall back to
   * their own defaults (e.g. the hero's hardcoded Box Hill placeholder).
   */
  featured: EventDoc | null;
  /** Remaining upcoming events (excludes `featured`), soonest first. */
  upcoming: EventDoc[];
  /** Past events, most recent first. */
  past: EventDoc[];
  /** Every event, oldest → newest. */
  all: EventDoc[];
}

const eventTime = (e: EventDoc): number => new Date(e.eventDate).getTime();

/**
 * Resolve the request-time view of all events.
 *
 * `await connection()` opts this into DYNAMIC rendering so `Date.now()`
 * reflects the actual request time (not build time) — this is what makes
 * the featured event "self-healing": once a market's date passes, the
 * site rolls forward to the next one automatically, with no publish and
 * no manual pointer change.
 *
 * Featured-event rule:
 *   1. If `siteSettings.currentEvent` is set AND still upcoming → use it
 *      (lets an editor spotlight an event out of date order).
 *   2. Otherwise → the soonest upcoming event.
 *   3. If nothing is upcoming → null (the hero shows its own fallback and
 *      /events shows only the past-markets list).
 */
export async function getEventsView(): Promise<EventsView> {
  await connection();

  const [settings, all] = await Promise.all([getSiteSettings(), getAllEvents()]);
  const now = Date.now();
  const isUpcoming = (e: EventDoc) => eventTime(e) >= now;

  const upcomingAll = all.filter(isUpcoming); // already sorted ascending
  const pointer = settings?.currentEvent?._id
    ? all.find((e) => e._id === settings.currentEvent!._id) ?? null
    : null;

  // Featured is always an upcoming event (or null): the pinned override
  // while it's still upcoming, otherwise the soonest upcoming market.
  const featured = pointer && isUpcoming(pointer) ? pointer : upcomingAll[0] ?? null;

  const upcoming = upcomingAll.filter((e) => e._id !== featured?._id);
  const past = all.filter((e) => !isUpcoming(e)).reverse(); // most recent first

  return { featured, upcoming, past, all };
}

/** Convenience: just the prominent event (self-healing). */
export async function getFeaturedEvent(): Promise<EventDoc | null> {
  return (await getEventsView()).featured;
}

/**
 * Whether Stallholder applications are still open for an event.
 *
 * Reads the current time, so callers MUST be in a dynamic scope — either
 * call `await connection()` first, or call this from a component that
 * already has (e.g. a page that awaited `getEventsView()`). An event with
 * no `applyDeadline` is treated as open right up to the event date.
 */
export function isApplyOpen(event: Pick<EventDoc, "eventDate" | "applyDeadline">): boolean {
  const now = Date.now();
  const deadline = event.applyDeadline ?? event.eventDate;
  return new Date(deadline).getTime() >= now;
}
