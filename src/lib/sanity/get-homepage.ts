import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { homepageQuery } from "./queries";

export interface WhatToExpectCard {
  icon?: string | null;
  title: string;
  description: string;
}

export interface VendorCtaPricingPill {
  headline?: string | null;
  subline?: string | null;
}

export interface Homepage {
  heroEyebrow?: string | null;
  heroSubheading?: string | null;
  heroImage?: {
    asset?: { _ref?: string };
    alt?: string | null;
  } | null;
  whatToExpectHeading?: string | null;
  whatToExpectSubtitle?: string | null;
  whatToExpectCards?: WhatToExpectCard[] | null;
  vendorCtaBadge?: string | null;
  vendorCtaHeadline?: string | null;
  vendorCtaBody?: string | null;
  vendorCtaPerks?: string[] | null;
  vendorCtaPricingPill?: VendorCtaPricingPill | null;
  faqPreviewHeading?: string | null;
  faqPreviewSubtitle?: string | null;
  mailingListHeading?: string | null;
  mailingListBody?: string | null;
}

export async function getHomepage(): Promise<Homepage | null> {
  "use cache";
  cacheTag("sanity:homepage", "sanity:type:homepage");
  cacheLife("max");

  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<Homepage | null>(homepageQuery);
  } catch (error) {
    console.error("[sanity] homepage fetch failed", error);
    return null;
  }
}
