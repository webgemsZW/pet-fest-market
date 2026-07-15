/**
 * Shared event-date formatting. Pure string → string helpers (no current
 * time), so they're safe to call from cached and dynamic scopes alike.
 */

/** "Sunday 26 July 2026" — used in hero pills and detail-page headers. */
export function formatEventDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "Sun 26 Jul 2026" — compact form for listing cards. */
export function formatEventDateShort(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
