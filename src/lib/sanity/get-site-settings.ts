import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { siteSettingsQuery } from "./queries";

/**
 * Shape returned by `siteSettingsQuery`. As we extend the schema in later
 * phases, add the new fields here too so consumers get typed access.
 */
export interface SiteSettings {
  siteName?: string | null;
  siteDescription?: string | null;
  acknowledgementOfCountry?: string | null;
  logoText?: string | null;
  socialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
  } | null;
  mailingListUrl?: string | null;
}

/**
 * Fetch the global Site Settings document.
 *
 * The `"use cache"` directive caches the whole function output under the
 * `max` cacheLife profile, tagged `sanity:siteSettings` and
 * `sanity:type:siteSettings`. The publish webhook at /api/revalidate
 * calls `revalidateTag(tag, "max")` to bust both tags whenever an editor
 * publishes a change.
 *
 * Returns `null` if:
 *   - the Sanity env vars are unset (e.g. during early dev before the
 *     project exists)
 *   - the fetch fails for any reason (CMS outage, transient network)
 *   - no `siteSettings` document has been created yet
 *
 * Callers are expected to fall back to hardcoded defaults on `null` so
 * the public site keeps rendering safely.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  "use cache";
  cacheTag("sanity:siteSettings", "sanity:type:siteSettings");
  cacheLife("max");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
  } catch (error) {
    console.error("[sanity] siteSettings fetch failed", error);
    return null;
  }
}
