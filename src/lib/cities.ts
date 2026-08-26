/**
 * The cities PetFest Market currently runs in. Single source of truth, used
 * by the Sanity `city` dropdown, the homepage city badges, and the
 * /events/<city> landing pages. The array order is the display order
 * (Melbourne, Brisbane, Adelaide). Add a city here to extend the site.
 */
export const CITIES = ["Melbourne", "Brisbane"] as const;

export type City = (typeof CITIES)[number];

/** "Melbourne" → "melbourne" — the URL slug used at /events/<city>. */
export function citySlug(city: string): string {
  return city.trim().toLowerCase().replace(/\s+/g, "-");
}

/** Resolve a URL slug back to a known city (case-insensitive), or null. */
export function cityFromSlug(slug: string): City | null {
  const s = slug.toLowerCase();
  return CITIES.find((c) => citySlug(c) === s) ?? null;
}

/** The Sanity dropdown options for the event `city` field. */
export const CITY_OPTIONS = CITIES.map((c) => ({ title: c, value: c }));
