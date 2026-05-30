import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { stallHolderPageQuery } from "./queries";

export interface PricingTier {
  tier: string;
  price: string;
  description?: string | null;
  features?: string[] | null;
  featured?: boolean | null;
}

export interface VendorFaq {
  question: string;
  answer: string;
}

export interface StallHolderPage {
  heading?: string | null;
  intro?: string | null;
  benefitsHeading?: string | null;
  benefitsSubtitle?: string | null;
  benefits?: string[] | null;
  pricingHeading?: string | null;
  pricingSubtitle?: string | null;
  pricing?: PricingTier[] | null;
  requirementsHeading?: string | null;
  requirementsSubtitle?: string | null;
  requirements?: string[] | null;
  vendorFaqsHeading?: string | null;
  vendorFaqs?: VendorFaq[] | null;
  applyHeading?: string | null;
  applyBody?: string | null;
  applyComingSoonLabel?: string | null;
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
