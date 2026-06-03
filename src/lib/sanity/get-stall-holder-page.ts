import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { stallHolderPageQuery } from "./queries";

export interface StallHolderPage {
  heading?: string | null;
  intro?: string | null;
}

export async function getStallHolderPage(): Promise<StallHolderPage | null> {
  "use cache";
  cacheTag("sanity:stallHolderPage", "sanity:type:stallHolderPage");
  cacheLife("max");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<StallHolderPage | null>(stallHolderPageQuery);
  } catch (error) {
    console.error("[sanity] stallHolderPage fetch failed", error);
    return null;
  }
}
