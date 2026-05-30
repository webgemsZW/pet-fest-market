import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { sponsorsQuery } from "./queries";

export type SponsorTier = "platinum" | "gold" | "silver" | "bronze";

export interface Sponsor {
  _id: string;
  name: string;
  tagline?: string | null;
  logo?: {
    asset?: { _ref?: string };
    alt?: string | null;
  } | null;
  website?: string | null;
  tier: SponsorTier;
  order?: number | null;
}

/**
 * Fetch all sponsors, ordered by tier then `order` then name. Cached
 * under `sanity:type:sponsor`; the webhook invalidates whenever any
 * sponsor doc changes.
 *
 * Returns an empty array if Sanity is unreachable, env vars are unset,
 * or no sponsors have been published yet. Pages render a "coming soon"
 * placeholder when this returns an empty array.
 */
export async function getSponsors(): Promise<Sponsor[]> {
  "use cache";
  cacheTag("sanity:type:sponsor");
  cacheLife("max");

  if (!isSanityConfigured()) return [];

  try {
    return (await sanityClient.fetch<Sponsor[]>(sponsorsQuery)) ?? [];
  } catch (error) {
    console.error("[sanity] sponsors fetch failed", error);
    return [];
  }
}
