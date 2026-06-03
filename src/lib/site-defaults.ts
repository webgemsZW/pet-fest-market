/**
 * Hardcoded fallback values that should ALWAYS render on the site even
 * if Sanity Site Settings is empty or unreachable. Sanity values, when
 * present, take precedence — these are the floor.
 *
 * Why hardcode them at all (vs. relying solely on Sanity):
 *   - These details rarely change. The social handles are stable
 *     brand assets and the Box Hill event times (10am–3pm) are
 *     confirmed by the client.
 *   - We don't want the site to ever show a footer with NO social
 *     icons or a hero with NO trading times just because nobody
 *     populated Site Settings.
 *
 * If any of these need updating across multiple events, change them
 * here AND update the corresponding Sanity field (which will continue
 * to take precedence on the deployed site).
 */

export const DEFAULT_SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/petfestaustralia",
  instagram: "https://www.instagram.com/petfestaustralia/",
  tiktok: "https://www.tiktok.com/@petfestau",
} as const;

/**
 * Default Box Hill event trading times. Sanity's per-event
 * `doorsOpenTime` / `eventEndTime` on the active event document
 * override these.
 */
export const DEFAULT_EVENT_TIMES = {
  doorsOpen: "10am",
  end: "3pm",
} as const;

/** Convenience: pre-formatted "10am – 3pm" string. */
export const DEFAULT_EVENT_TIME_RANGE = `${DEFAULT_EVENT_TIMES.doorsOpen} – ${DEFAULT_EVENT_TIMES.end}`;

/**
 * Default Stallholder application form URL. The active `event` document's
 * `applyUrl` overrides this when set; the default keeps every "Apply"
 * button working out of the box. This URL points at the Box Hill 2026
 * Google Form supplied by the client on 3 June 2026 — update here AND
 * on future event documents when running additional markets.
 */
export const DEFAULT_APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd6OnpOkcU9eoFm02Zs6XpNoJuOtUMCH9g3iR77yXlpMgjoJQ/viewform?usp=sharing&ouid=102085881350428569314";
