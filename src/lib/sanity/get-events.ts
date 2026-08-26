import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { type CurrentEvent } from "./get-site-settings";
import { allEventsQuery, eventBySlugQuery } from "./queries";
import { orderedCitiesWithEvents, type City } from "@/lib/cities";

/**
 * A single event document. Shared shape so every event surface (hero,
 * listing, detail page, structured data) agrees on the fields.
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
  /** Upcoming events, soonest first. */
  upcoming: EventDoc[];
  /** Past events, most recent first. */
  past: EventDoc[];
  /** Every event, oldest → newest. */
  all: EventDoc[];
}

const eventTime = (e: EventDoc): number => new Date(e.eventDate).getTime();

function splitByTime(all: EventDoc[], now: number): EventsView {
  const isUpcoming = (e: EventDoc) => eventTime(e) >= now;
  return {
    upcoming: all.filter(isUpcoming), // already sorted ascending
    past: all.filter((e) => !isUpcoming(e)).reverse(), // most recent first
    all,
  };
}

/**
 * Request-time view of all events, split into upcoming / past. `await
 * connection()` opts this into DYNAMIC rendering so the split reflects the
 * actual request time (Cache Components forbids reading `now` while cached).
 */
export async function getEventsView(): Promise<EventsView> {
  await connection();
  return splitByTime(await getAllEvents(), Date.now());
}

/**
 * Same as getEventsView but filtered to one city (matched case-insensitively
 * against the event `city` field). `hasCityEvents` is whether ANY event
 * (past or upcoming) exists for the city — used to tell "no markets yet" from
 * "only past markets".
 */
export async function getCityEventsView(
  city: string,
): Promise<EventsView & { hasCityEvents: boolean }> {
  await connection();
  const target = city.trim().toLowerCase();
  const cityEvents = (await getAllEvents()).filter(
    (e) => (e.city ?? "").trim().toLowerCase() === target,
  );
  return { ...splitByTime(cityEvents, Date.now()), hasCityEvents: cityEvents.length > 0 };
}

/**
 * The known cities that currently have at least one event (any date), in
 * canonical display order — powers the homepage badges. Date-agnostic, so it
 * stays cacheable (no `connection()`), keeping the homepage static.
 */
export async function getCitiesWithEvents(): Promise<City[]> {
  const all = await getAllEvents();
  return orderedCitiesWithEvents(all.map((e) => e.city));
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
