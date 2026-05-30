import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { contactPageQuery } from "./queries";

export interface ContactPage {
  heading?: string | null;
  intro?: string | null;
}

/**
 * Fetch the Contact page document. Only `heading` and `intro` live on
 * this page-specific document — the email / phone / address are global
 * and live on `siteSettings` (CMS_PLAN.md §9.6).
 */
export async function getContactPage(): Promise<ContactPage | null> {
  "use cache";
  cacheTag("sanity:contactPage", "sanity:type:contactPage");
  cacheLife("max");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<ContactPage | null>(contactPageQuery);
  } catch (error) {
    console.error("[sanity] contactPage fetch failed", error);
    return null;
  }
}
