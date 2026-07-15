import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { sponsorsPageQuery } from "./queries";
import type { SeoFields } from "@/lib/seo";

export interface SponsorsPage {
  heading?: string | null;
  subtitle?: string | null;
  emptyStateHeading?: string | null;
  emptyStateBody?: string | null;
  ctaHeading?: string | null;
  ctaBody?: string | null;
  ctaButtonLabel?: string | null;
  seo?: SeoFields | null;
}

/**
 * Fetch the Sponsors page copy (hero, empty state, and "Become a Sponsor"
 * block). The sponsor logos/names live in the `sponsor` collection.
 */
export async function getSponsorsPage(): Promise<SponsorsPage | null> {
  "use cache";
  cacheTag("sanity:sponsorsPage", "sanity:type:sponsorsPage");
  cacheLife("max");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<SponsorsPage | null>(sponsorsPageQuery);
  } catch (error) {
    console.error("[sanity] sponsorsPage fetch failed", error);
    return null;
  }
}
