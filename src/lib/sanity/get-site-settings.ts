import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { siteSettingsQuery } from "./queries";

/**
 * The resolved current event embedded inside `SiteSettings.currentEvent`.
 * Matches the projection inside `siteSettingsQuery`.
 */
export interface CurrentEvent {
  _id: string;
  eventName: string;
  slug?: string | null;
  eventDate: string;
  doorsOpenTime?: string | null;
  eventEndTime?: string | null;
  location: string;
  ticketPrice?: number | null;
  ticketUrl?: string | null;
  applyUrl?: string | null;
}

export interface SiteSettings {
  siteName?: string | null;
  siteDescription?: string | null;
  acknowledgementOfCountry?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactAddress?: string | null;
  socialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    tiktok?: string | null;
    twitter?: string | null;
  } | null;
  mailingListUrl?: string | null;
  nonconformityCredit?: {
    text?: string | null;
    logo?: {
      asset?: { _ref?: string };
      alt?: string | null;
    } | null;
  } | null;
  currentEvent?: CurrentEvent | null;
}

/**
 * Fetch the global Site Settings document with the current event
 * resolved inline.
 *
 * Tag strategy:
 *   - `sanity:siteSettings`        → invalidated when the Site Settings
 *                                    doc is published
 *   - `sanity:type:siteSettings`   → invalidated by any siteSettings change
 *   - `sanity:type:event`          → invalidated by ANY event change, so
 *                                    the inline currentEvent projection
 *                                    stays fresh when the event the site
 *                                    points at is updated
 *
 * The webhook in /api/revalidate fires `sanity:<docId>` and
 * `sanity:type:<docType>` on every publish, so these tags catch all
 * relevant changes.
 *
 * Returns `null` if the Sanity env vars are unset, the fetch fails, or
 * no `siteSettings` document has been published yet. Callers fall back
 * to hardcoded defaults on `null`.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  "use cache";
  cacheTag("sanity:siteSettings", "sanity:type:siteSettings", "sanity:type:event");
  cacheLife("max");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
  } catch (error) {
    console.error("[sanity] siteSettings fetch failed", error);
    return null;
  }
}

/**
 * Convenience: return just the current event from Site Settings. Saves
 * components from writing `(await getSiteSettings())?.currentEvent` and
 * the same null-check ceremony.
 */
export async function getCurrentEvent(): Promise<CurrentEvent | null> {
  const settings = await getSiteSettings();
  return settings?.currentEvent ?? null;
}
