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
