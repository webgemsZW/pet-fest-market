import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { faqItemsQuery } from "./queries";

export type FaqCategory = "general" | "vendors" | "pets" | "tickets";

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  order?: number | null;
}

/**
 * Fetch all FAQ items, ordered by category then `order` (asc), then
 * insertion order. The whole collection is cached under
 * `sanity:type:faqItem`; the webhook in /api/revalidate fires that tag
 * whenever ANY FAQ doc changes, so add/edit/delete in Studio shows up
 * within seconds.
 *
 * Returns an empty array if Sanity is unreachable or env vars are unset.
 * Callers fall back to placeholder lorem ipsum data when this returns
 * an empty array.
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

/**
 * Group an array of FAQ items by category. Order within each category
 * is preserved (the GROQ query already sorts).
 */
export function groupFaqsByCategory(items: FaqItem[]): Record<FaqCategory, FaqItem[]> {
  const groups: Record<FaqCategory, FaqItem[]> = {
    general: [],
    vendors: [],
    pets: [],
    tickets: [],
  };
  for (const item of items) {
    if (groups[item.category]) {
      groups[item.category].push(item);
    }
  }
  return groups;
}
