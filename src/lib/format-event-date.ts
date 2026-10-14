/**
 * Shared event-date formatting. Pure string → string helpers (no current
 * time), so they're safe to call from cached and dynamic scopes alike.
 *
 * IMPORTANT: dates are formatted in a fixed Australian timezone, NOT the
 * server's. Sanity stores a `datetime` as a UTC instant, so an event
 * entered as e.g. "15 Nov 2026, 10:00" in Australia is saved as
 * "2026-11-14T23:00:00Z". Formatting that in the server's zone (UTC on
 * Vercel) would render the wrong calendar day ("14 November"). Pinning the
 * zone makes the displayed day correct and stable everywhere the code runs.
 *
 * All PetFest markets are in Australia (VIC/QLD); Melbourne is used as the
 * canonical display zone. Only the calendar date is derived from the
 * instant — trading times are separate free-text fields — so the VIC/QLD
 * DST difference never affects what's shown.
 *
 * MULTI-DAY MARKETS: an event's own `eventDate` / `doorsOpenTime` /
 * `eventEndTime` describe its FIRST day. Further days live in
 * `additionalDays` — each a calendar date (YYYY-MM-DD, in the event's zone)
 * with optional per-day times that fall back to the first day's. A single-day
 * event simply has no additional days, and every helper below behaves exactly
 * as it always did for it.
 */
import { DEFAULT_EVENT_TIMES } from "./site-defaults";

export const EVENT_TIME_ZONE = "Australia/Melbourne";

/** A further day of a multi-day market. Times are optional (default to the first day's). */
export interface EventExtraDay {
  /** Calendar day, "YYYY-MM-DD", in the event's time zone. */
  date?: string | null;
  doorsOpenTime?: string | null;
  eventEndTime?: string | null;
}

/** The event fields the schedule helpers read. Structurally satisfied by `EventDoc`. */
export interface EventScheduleInput {
  eventDate: string;
  doorsOpenTime?: string | null;
  eventEndTime?: string | null;
  timezone?: string | null;
  additionalDays?: EventExtraDay[] | null;
}

/** One resolved trading day (times already defaulted). */
export interface EventDay {
  dateKey: string; // "YYYY-MM-DD"
  doorsOpen: string;
  endTime: string;
}

export interface EventTimeLine {
  /** E.g. "Daily" or "Sat 20 Mar"; null for a single-day event. */
  label: string | null;
  text: string;
}

/**
 * Fallback window used only when an event has no usable end time: how long
 * after its start it still reads as "in progress" before flipping to
 * finished. When `eventEndTime` is set we use the real end instead (see
 * resolveEventEndMs) for a tight, accurate boundary.
 */
export const EVENT_UNDERWAY_WINDOW_MS = 8 * 60 * 60 * 1000;

export type EventPhase = "upcoming" | "underway" | "finished";

/** Parse a free-text time-of-day like "3pm", "3.00pm", "15:30" → minutes since midnight. */
function parseTimeOfDay(text: string | null | undefined): number | null {
  if (!text) return null;
  const m = text.trim().toLowerCase().match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;
  let hours = parseInt(m[1], 10);
  const minutes = m[2] ? parseInt(m[2], 10) : 0;
  const meridiem = m[3];
  if (hours > 23 || minutes > 59) return null;
  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

/** The local wall-clock time (minutes since midnight) of an instant, in a timezone. */
function localMinutesInTz(instantMs: number, timeZone: string): number | null {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date(instantMs));
  const hh = Number(parts.find((p) => p.type === "hour")?.value);
  const mm = Number(parts.find((p) => p.type === "minute")?.value);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  return (hh % 24) * 60 + mm;
}

/**
 * The exact instant (epoch ms) an event finishes, derived from its start
 * (`startIso`), free-text end time (`endTimeText`, e.g. "3pm"), and timezone.
 * For a single-day event the end is on the same calendar day as the start;
 * returns null when the end time is blank/unparseable or not after the start
 * — callers then fall back to EVENT_UNDERWAY_WINDOW_MS.
 *
 * With `additionalDays`, the event finishes at the end time of its LAST day
 * (that day's own end time, else the first day's, else the default).
 */
export function resolveEventEndMs(
  startIso: string | null | undefined,
  endTimeText: string | null | undefined,
  timeZone?: string | null,
  additionalDays?: EventExtraDay[] | null,
): number | null {
  if (!startIso) return null;
  const start = new Date(startIso).getTime();
  if (Number.isNaN(start)) return null;

  const days = getEventDays({
    eventDate: startIso,
    eventEndTime: endTimeText,
    timezone: timeZone,
    additionalDays,
  });
  if (days.length > 1) {
    const last = days[days.length - 1];
    // A multi-day event always has a defined last day; if its end time is
    // unparseable, treat the event as running to the end of that day rather
    // than letting it flip to "finished" a few hours after day one starts.
    const endMinutes = parseTimeOfDay(last.endTime) ?? 24 * 60 - 1;
    const end = zonedWallTimeToMs(last.dateKey, endMinutes, zoneOf(timeZone));
    return end != null && end > start ? end : null;
  }

  const endMinutes = parseTimeOfDay(endTimeText);
  if (endMinutes == null) return null;
  const startMinutes = localMinutesInTz(start, timeZone || EVENT_TIME_ZONE);
  if (startMinutes == null) return null;
  const deltaMinutes = endMinutes - startMinutes;
  if (deltaMinutes <= 0) return null; // end not after start on the same day — unreliable
  return start + deltaMinutes * 60_000;
}

/**
 * Where an event sits in its lifecycle relative to `now` (epoch ms). Pass
 * `endMs` (from resolveEventEndMs) for a precise finish boundary; without it,
 * the EVENT_UNDERWAY_WINDOW_MS fallback applies. Timezone-agnostic (operates
 * on absolute instants), so it's safe in both server and client code.
 */
export function eventPhase(
  startIso: string | null | undefined,
  now: number,
  endMs?: number | null,
): EventPhase | null {
  if (!startIso) return null;
  const start = new Date(startIso).getTime();
  if (Number.isNaN(start)) return null;
  if (now < start) return "upcoming";
  const finishAt = endMs ?? start + EVENT_UNDERWAY_WINDOW_MS;
  if (now < finishAt) return "underway";
  return "finished";
}

const zoneOf = (timeZone?: string | null): string => timeZone || EVENT_TIME_ZONE;

const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

/** The calendar day ("YYYY-MM-DD") an instant falls on in a timezone. */
export function localDateKey(instant: string | number, timeZone?: string | null): string | null {
  const d = new Date(instant);
  if (Number.isNaN(d.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zoneOf(timeZone),
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Offset (ms) of a timezone from UTC at a given instant: local wall clock minus UTC. */
function tzOffsetMs(instantMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date(instantMs));
  const n = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const wallAsUtc = Date.UTC(n("year"), n("month") - 1, n("day"), n("hour"), n("minute"), n("second"));
  return wallAsUtc - Math.floor(instantMs / 1000) * 1000;
}

/**
 * The instant a wall-clock time (`minutes` since midnight) on a calendar day
 * occurs in a timezone. Two passes so it's right across a DST changeover
 * (e.g. a weekend that straddles the first Sunday in April).
 */
function zonedWallTimeToMs(dateKey: string, minutes: number, timeZone: string): number | null {
  const m = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const wallAsUtc = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 0, minutes);
  const firstPass = wallAsUtc - tzOffsetMs(wallAsUtc, timeZone);
  return wallAsUtc - tzOffsetMs(firstPass, timeZone);
}

const dayNumber = (dateKey: string): number => {
  const [y, m, d] = dateKey.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86_400_000;
};

/**
 * Every trading day of an event, in date order, with times resolved: the
 * first day (from `eventDate` and the event's own times) plus any valid,
 * distinct additional days after it. Per-day times fall back to the first
 * day's, then to the Box Hill defaults.
 */
export function getEventDays(event: EventScheduleInput): EventDay[] {
  const start = new Date(event.eventDate).getTime();
  const firstKey = Number.isNaN(start) ? null : localDateKey(start, event.timezone);
  if (!firstKey) return [];

  const baseOpen = event.doorsOpenTime?.trim() || DEFAULT_EVENT_TIMES.doorsOpen;
  const baseEnd = event.eventEndTime?.trim() || DEFAULT_EVENT_TIMES.end;
  const days: EventDay[] = [{ dateKey: firstKey, doorsOpen: baseOpen, endTime: baseEnd }];

  const seen = new Set([firstKey]);
  for (const extra of event.additionalDays ?? []) {
    const key = extra?.date?.trim();
    // Skip blanks, malformed dates, repeats, and anything not after day one.
    if (!key || !DATE_KEY.test(key) || key <= firstKey || seen.has(key)) continue;
    seen.add(key);
    days.push({
      dateKey: key,
      doorsOpen: extra.doorsOpenTime?.trim() || baseOpen,
      endTime: extra.eventEndTime?.trim() || baseEnd,
    });
  }
  return days.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
}

/**
 * The instant an event is considered finished: its real end when resolvable,
 * otherwise the EVENT_UNDERWAY_WINDOW_MS fallback after the start. Null only
 * for an unparseable start. Deterministic (no `now`), so safe to precompute.
 */
export function eventFinishMs(event: EventScheduleInput): number | null {
  const start = new Date(event.eventDate).getTime();
  if (Number.isNaN(start)) return null;
  return (
    resolveEventEndMs(event.eventDate, event.eventEndTime, event.timezone, event.additionalDays) ??
    start + EVENT_UNDERWAY_WINDOW_MS
  );
}

/**
 * The instant online ticket sales stop: the event's `ticketSalesDeadline`
 * when set, otherwise the moment the first day opens (`eventDate`) — we don't
 * sell tickets while a market is on unless an editor explicitly allows it.
 * Null only when there's neither a valid deadline nor a valid start.
 */
export function resolveTicketSalesCloseMs(event: {
  eventDate: string;
  ticketSalesDeadline?: string | null;
}): number | null {
  const deadline = event.ticketSalesDeadline ? new Date(event.ticketSalesDeadline).getTime() : NaN;
  if (!Number.isNaN(deadline)) return deadline;
  const start = new Date(event.eventDate).getTime();
  return Number.isNaN(start) ? null : start;
}

function dayParts(dateKey: string, style: "long" | "short") {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-AU", { timeZone: "UTC", ...opts }).format(date);
  return {
    weekday: fmt({ weekday: style }),
    day: fmt({ day: "numeric" }),
    month: fmt({ month: style }),
    year: String(y),
  };
}

/**
 * The event's date(s) as display text. A single-day event gives exactly what
 * formatEventDate / formatEventDateShort give. Consecutive days collapse to a
 * range — "Saturday 20 – Sunday 21 March 2027" (month/year repeated only
 * when they change); non-consecutive days are listed.
 */
export function formatEventDates(
  event: EventScheduleInput,
  style: "long" | "short" = "long",
): string | null {
  const days = getEventDays(event);
  if (days.length === 0) return null;
  if (days.length === 1) {
    return style === "long"
      ? formatEventDate(event.eventDate, event.timezone)
      : formatEventDateShort(event.eventDate, event.timezone);
  }

  const parts = days.map((d) => dayParts(d.dateKey, style));
  const consecutive = days.every((d, i) => i === 0 || dayNumber(d.dateKey) - dayNumber(days[i - 1].dateKey) === 1);

  if (consecutive) {
    const first = parts[0];
    const last = parts[parts.length - 1];
    const sameYear = first.year === last.year;
    const sameMonth = sameYear && first.month === last.month;
    const left = `${first.weekday} ${first.day}${
      sameMonth ? "" : ` ${first.month}${sameYear ? "" : ` ${first.year}`}`
    }`;
    return `${left} – ${last.weekday} ${last.day} ${last.month} ${last.year}`;
  }

  const full = parts.map((p) => `${p.weekday} ${p.day} ${p.month} ${p.year}`);
  return full.length === 2 ? full.join(" & ") : `${full.slice(0, -1).join(", ")} & ${full[full.length - 1]}`;
}

/**
 * Trading hours as one or more display lines, each ending in the zone label
 * (e.g. "10am – 3pm AEST"). Identical hours on every day collapse to a single
 * "Daily" line; differing hours give one line per day.
 */
export function formatEventTimes(event: EventScheduleInput): EventTimeLine[] {
  const days = getEventDays(event);
  const tzAbbr = formatTimeZoneAbbrev(event.eventDate, event.timezone);
  const suffix = tzAbbr ? ` ${tzAbbr}` : "";
  const range = (d: Pick<EventDay, "doorsOpen" | "endTime">) => `${d.doorsOpen} – ${d.endTime}${suffix}`;

  if (days.length === 0) {
    return [
      {
        label: null,
        text: range({
          doorsOpen: event.doorsOpenTime?.trim() || DEFAULT_EVENT_TIMES.doorsOpen,
          endTime: event.eventEndTime?.trim() || DEFAULT_EVENT_TIMES.end,
        }),
      },
    ];
  }

  const same = days.every((d) => d.doorsOpen === days[0].doorsOpen && d.endTime === days[0].endTime);
  if (same) return [{ label: days.length > 1 ? "Daily" : null, text: range(days[0]) }];

  return days.map((d) => {
    const p = dayParts(d.dateKey, "short");
    return { label: `${p.weekday} ${p.day} ${p.month}`, text: range(d) };
  });
}

/** "Sunday 26 July 2026" — used in hero pills and detail-page headers. */
export function formatEventDate(
  iso: string | null | undefined,
  timeZone?: string | null,
): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: zoneOf(timeZone),
  });
}

/** "Sun 26 Jul 2026" — compact form for listing cards. */
export function formatEventDateShort(
  iso: string | null | undefined,
  timeZone?: string | null,
): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: zoneOf(timeZone),
  });
}

/**
 * The short timezone abbreviation for an event's date/zone — e.g. "AEST",
 * "AEDT", "AWST". Shown next to the trading times so visitors know which
 * zone the hours are in. DST is resolved from the event's date.
 */
export function formatTimeZoneAbbrev(
  iso: string | null | undefined,
  timeZone?: string | null,
): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const part = new Intl.DateTimeFormat("en-AU", {
    timeZone: zoneOf(timeZone),
    timeZoneName: "short",
  })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName");
  return part?.value ?? null;
}
