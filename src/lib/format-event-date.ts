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
 */
export const EVENT_TIME_ZONE = "Australia/Melbourne";

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
 * Assumes the end is on the same calendar day as the start. Returns null when
 * the end time is blank/unparseable or not after the start — callers then
 * fall back to EVENT_UNDERWAY_WINDOW_MS.
 */
export function resolveEventEndMs(
  startIso: string | null | undefined,
  endTimeText: string | null | undefined,
  timeZone?: string | null,
): number | null {
  if (!startIso) return null;
  const start = new Date(startIso).getTime();
  if (Number.isNaN(start)) return null;
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
