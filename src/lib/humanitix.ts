/**
 * Normalise whatever Humanitix link an editor pastes into the exact shape the
 * pop-up checkout widget needs: "<event-url>/tickets?widget=popup".
 *
 * Editors may paste any of these — all should "just work":
 *   https://events.humanitix.com/petfest-market-box-hill
 *   https://events.humanitix.com/petfest-market-box-hill/
 *   https://events.humanitix.com/petfest-market-box-hill/tickets
 *   https://events.humanitix.com/petfest-market-box-hill/tickets?widget=popup
 *   …with tracking query params, trailing slashes, etc.
 *
 * We keep the event path, drop any existing "/tickets" segment and query, then
 * re-append "/tickets?widget=popup". Non-Humanitix URLs are returned unchanged
 * (so a different ticketing provider still works as a plain link); anything
 * unparseable returns null.
 */
export function toHumanitixPopupUrl(raw: string | null | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  // Only rewrite Humanitix links; leave any other provider's URL as-is.
  if (!/(^|\.)humanitix\.com$/i.test(url.hostname)) return value;

  const path = url.pathname
    .replace(/\/+$/, "") // drop trailing slashes
    .replace(/\/tickets$/i, ""); // drop an existing /tickets step

  return `${url.origin}${path}/tickets?widget=popup`;
}
