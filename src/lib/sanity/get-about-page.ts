import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { aboutPageQuery } from "./queries";

interface PortableBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: Array<{ _type?: string; text?: string; marks?: string[] }>;
  markDefs?: unknown[];
  [key: string]: unknown;
}

export interface AboutPage {
  heading?: string | null;
  body?: PortableBlock[] | null;
  image?: {
    asset?: { _ref?: string };
    alt?: string | null;
  } | null;
}

/**
 * Fetch the About page document. Cached under `sanity:aboutPage` so
 * editor publishes flow through immediately.
 */
export async function getAboutPage(): Promise<AboutPage | null> {
  "use cache";
  cacheTag("sanity:aboutPage", "sanity:type:aboutPage");
  cacheLife("max");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<AboutPage | null>(aboutPageQuery);
  } catch (error) {
    console.error("[sanity] aboutPage fetch failed", error);
    return null;
  }
}
