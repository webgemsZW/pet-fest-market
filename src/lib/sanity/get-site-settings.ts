import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { siteSettingsQuery } from "./queries";

/**
 * A single event document. Shared shape used everywhere an event is read
 * (hero, listing, detail page, structured data) — matches EVENT_PROJECTION.
 */
export interface SanityImage {
  asset?: { _ref?: string };
  alt?: string | null;
}

export interface CurrentEvent {
  _id: string;
  eventName: string;
  slug?: string | null;
  eventDate: string;
  showCountdown?: boolean | null;
  doorsOpenTime?: string | null;
  eventEndTime?: string | null;
  /** Further days of a multi-day market (the fields above describe the first day). */
  additionalDays?: { date?: string | null; doorsOpenTime?: string | null; eventEndTime?: string | null }[] | null;
  timezone?: string | null;
  city?: string | null;
  location: string;
  blurb?: string | null;
  image?: SanityImage | null;
  ticketPrice?: number | null;
  ticketUrl?: string | null;
  ticketSalesCloseMode?: string | null;
  ticketSalesCloseDate?: string | null;
  ticketSalesCloseTime?: string | null;
  applyUrl?: string | null;
  applyDeadline?: string | null;
}

export interface SiteSettings {
  siteName?: string | null;
  siteDescription?: string | null;
  acknowledgementOfCountry?: string | null;
  footerTagline?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactAddress?: string | null;
  socialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    tiktok?: string | null;
    twitter?: string | null;
  } | null;
  nonconformityCredit?: {
    text?: string | null;
    logo?: {
      asset?: { _ref?: string };
      alt?: string | null;
    } | null;
  } | null;
  policyDocuments?: {
    termsPdf?: { asset?: { url?: string | null } | null } | null;
    privacyPdf?: { asset?: { url?: string | null } | null } | null;
    codeOfConductPdf?: { asset?: { url?: string | null } | null } | null;
  } | null;
}

/**
 * Fetch the global Site Settings document.
 *
 * Tag strategy:
 *   - `sanity:siteSettings`        → invalidated when the Site Settings
 *                                    doc is published
 *   - `sanity:type:siteSettings`   → invalidated by any siteSettings change
 *
 * The webhook in /api/revalidate fires `sanity:<docId>` and
 * `sanity:type:<docType>` on every publish, so these tags catch all
 * relevant changes. (The Featured Event pointer moved to the Homepage
 * document, so this no longer needs the event type tag.)
 *
 * Returns `null` if the Sanity env vars are unset, the fetch fails, or
 * no `siteSettings` document has been published yet. Callers fall back
 * to hardcoded defaults on `null`.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  "use cache";
  cacheTag("sanity:siteSettings", "sanity:type:siteSettings");
  cacheLife("sanity");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
  } catch (error) {
    console.error("[sanity] siteSettings fetch failed", error);
    return null;
  }
}
