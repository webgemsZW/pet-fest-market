import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { faqItemsQuery } from "./queries";

/**
 * Per the 2 June 2026 client revision, FAQs are a single unified list
 * — no general/vendors/pets/tickets categories. The old `FaqCategory`
 * type was removed.
 */
export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  order?: number | null;
}

/**
 * Fetch all FAQ items, ordered by the editor-supplied `order` field
 * (ascending), then insertion order. Cached under
 * `sanity:type:faqItem` and invalidated by the publish webhook.
 *
 * Returns an empty array on any failure so callers fall back to the
 * hardcoded list in src/lib/faq-data.ts.
 */
export async function getFaqItems(): Promise<FaqItem[]> {
  "use cache";
  cacheTag("sanity:type:faqItem");
  cacheLife("max");

  if (!isSanityConfigured()) return [];

  try {
    return (await sanityClient.fetch<FaqItem[]>(faqItemsQuery)) ?? [];
  } catch (error) {
    console.error("[sanity] faqItems fetch failed", error);
    return [];
  }
}
