// GROQ queries for fetching Sanity content.
//
// Style notes:
//   - Singletons fetched by their fixed documentId (e.g. "siteSettings"),
//     not by querying all docs of the type. Faster and unambiguous.
//   - Page-driven references (e.g. currentEvent) are projected inline so
//     the consumer gets one round-trip instead of two.
//   - When this file changes, also update the matching getXxx() helper
//     so cache tags stay in sync with what's actually fetched.

// ------------------------------------------------------------------
// Shared event projection — used everywhere an event is read so the
// TypeScript `EventDoc` shape stays in one place. `image` is projected
// as the raw object so `urlFor()` can build the CDN URL.
// ------------------------------------------------------------------
const EVENT_PROJECTION = `
  _id,
  eventName,
  "slug": slug.current,
  eventDate,
  doorsOpenTime,
  eventEndTime,
  timezone,
  location,
  blurb,
  image,
  ticketPrice,
  ticketUrl,
  applyUrl,
  applyDeadline
`;

// ------------------------------------------------------------------
// Site Settings (singleton) — global content + currentEvent reference
// ------------------------------------------------------------------
export const siteSettingsQuery = `*[_id == "siteSettings"][0]{
  siteName,
  siteDescription,
  acknowledgementOfCountry,
  footerTagline,
  contactEmail,
  contactPhone,
  contactAddress,
  socialLinks{
    facebook,
    instagram,
    tiktok,
    twitter
  },
  mailingListUrl,
  nonconformityCredit{
    text,
    logo
  },
  policyDocuments{
    termsPdf{ asset->{ url } },
    privacyPdf{ asset->{ url } },
    codeOfConductPdf{ asset->{ url } }
  },
  currentEvent->{${EVENT_PROJECTION}}
}`;

// ------------------------------------------------------------------
// Single event by id — used when you need the event directly, e.g.
// for cache-tagging by event id.
// ------------------------------------------------------------------
export const eventByIdQuery = `*[_type == "event" && _id == $id][0]{${EVENT_PROJECTION}}`;

// Single event by slug — powers the /events/<slug> detail page.
export const eventBySlugQuery = `*[_type == "event" && slug.current == $slug][0]{${EVENT_PROJECTION}}`;

// All events, oldest → newest. The "featured / upcoming / past" split is
// computed at request time (see get-events.ts) so this query stays
// deterministic and cacheable.
export const allEventsQuery = `*[_type == "event" && defined(eventDate)] | order(eventDate asc){${EVENT_PROJECTION}}`;

// ------------------------------------------------------------------
// Page singletons
// ------------------------------------------------------------------
export const homepageQuery = `*[_id == "homepage"][0]{
  heroEyebrow,
  heroSubheading,
  heroImage,
  heroApplyLabel,
  heroUpdatesLabel,
  heroTicketLabel,
  heroTicketComingSoonLabel,
  whatToExpectHeading,
  whatToExpectSubtitle,
  whatToExpectCards[]{
    icon,
    title,
    description
  },
  faqPreviewHeading,
  faqPreviewSubtitle,
  faqCtaPrompt,
  faqCtaLabel,
  mailingListHeading,
  mailingListSubline
}`;

export const aboutPageQuery = `*[_id == "aboutPage"][0]{
  heading,
  body,
  image,
  seo
}`;

export const stallHolderPageQuery = `*[_id == "stallHolderPage"][0]{
  heading,
  intro,
  applyButtonLabel,
  upcomingHeading,
  seo
}`;

export const contactPageQuery = `*[_id == "contactPage"][0]{
  heading,
  intro,
  detailsHeading,
  followHeading,
  formHeading,
  seo
}`;

export const faqPageQuery = `*[_id == "faqPage"][0]{
  heading,
  subtitle,
  ctaPrompt,
  ctaLabel,
  seo
}`;

export const sponsorsPageQuery = `*[_id == "sponsorsPage"][0]{
  heading,
  subtitle,
  emptyStateHeading,
  emptyStateBody,
  ctaHeading,
  ctaBody,
  ctaButtonLabel,
  seo
}`;

// ------------------------------------------------------------------
// Collections — FAQ items and sponsors.
// ------------------------------------------------------------------
export const faqItemsQuery = `*[_type == "faqItem"] | order(order asc, _createdAt asc){
  _id,
  question,
  answer,
  order
}`;

export const sponsorsQuery = `*[_type == "sponsor"] | order(tier asc, order asc, name asc){
  _id,
  name,
  logo,
  website,
  tier,
  tagline,
  order
}`;
