export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoText: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  mailingListUrl?: string;
}

export interface EventSettings {
  eventName: string;
  eventDate: string;
  location: string;
  ticketPrice: number;
  ticketUrl?: string;
  applyUrl?: string;
}

export interface HomepageData {
  heroHeadline?: string;
  heroSubheading?: string;
  heroImage?: SanityImage;
  eventSummary?: string;
  vendorCtaHeadline?: string;
  vendorCtaBody?: string;
  welcomeToCountryText?: string;
}

export interface AboutPageData {
  heading?: string;
  subheading?: string;
  body?: string;
  image?: SanityImage;
}

export interface PricingTier {
  tier: string;
  price: string;
  description: string;
}

export interface StallHolderFaq {
  question: string;
  answer: string;
}

export interface StallHolderPageData {
  heading?: string;
  intro?: string;
  benefits?: string[];
  pricing?: PricingTier[];
  requirements?: string[];
  applyUrl?: string;
  faqs?: StallHolderFaq[];
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: "general" | "vendors" | "pets" | "tickets";
}

export interface Sponsor {
  _id: string;
  name: string;
  logo?: SanityImage;
  website?: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
}

export interface ContactPageData {
  heading?: string;
  intro?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface PolicyPages {
  termsAndConditions?: string;
  privacyPolicy?: string;
  refundPolicy?: string;
}
