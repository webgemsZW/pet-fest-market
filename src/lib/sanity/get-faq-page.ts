import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { faqPageQuery } from "./queries";
import type { SeoFields } from "@/lib/seo";

export interface FaqPage {
  heading?: string | null;
  subtitle?: string | null;
  ctaPrompt?: string | null;
  ctaLabel?: string | null;
  seo?: SeoFields | null;
}

/**
 * Fetch the FAQ page document (hero copy + follow-up CTA). The questions
 * themselves live in the `faqItem` collection.
 */
export async function getFaqPage(): Promise<FaqPage | null> {
  "use cache";
  cacheTag("sanity:faqPage", "sanity:type:faqPage");
  cacheLife("sanity");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<FaqPage | null>(faqPageQuery);
  } catch (error) {
    console.error("[sanity] faqPage fetch failed", error);
    return null;
  }
}
