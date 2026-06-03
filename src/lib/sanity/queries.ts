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
// Site Settings (singleton) — global content + currentEvent reference
// ------------------------------------------------------------------
export const siteSettingsQuery = `*[_id == "siteSettings"][0]{
  siteName,
  siteDescription,
  acknowledgementOfCountry,
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
  currentEvent->{
    _id,
    eventName,
    "slug": slug.current,
    eventDate,
    doorsOpenTime,
    eventEndTime,
    location,
    ticketPrice,
    ticketUrl,
    applyUrl
  }
}`;

// ------------------------------------------------------------------
// Single event by id — used when you need the event directly, e.g.
// for cache-tagging by event id. The "currentEvent" projection inside
// siteSettingsQuery already returns the same shape.
// ------------------------------------------------------------------
export const eventByIdQuery = `*[_type == "event" && _id == $id][0]{
  _id,
  eventName,
  "slug": slug.current,
  eventDate,
  doorsOpenTime,
  eventEndTime,
  location,
  ticketPrice,
  ticketUrl,
  applyUrl
}`;

// ------------------------------------------------------------------
// Page singletons — not wired up yet, will be consumed in Phase 4.
// Kept here so the GROQ stays alongside the schemas they describe.
// ------------------------------------------------------------------
export const homepageQuery = `*[_id == "homepage"][0]{
  heroEyebrow,
  heroSubheading,
  heroImage,
  whatToExpectHeading,
  whatToExpectSubtitle,
  whatToExpectCards[]{
    icon,
    title,
    description
  },
  faqPreviewHeading,
  faqPreviewSubtitle,
  mailingListHeading
}`;

export const aboutPageQuery = `*[_id == "aboutPage"][0]{
  heading,
  body,
  image
}`;

export const stallHolderPageQuery = `*[_id == "stallHolderPage"][0]{
  heading,
  intro
}`;

export const contactPageQuery = `*[_id == "contactPage"][0]{
  heading,
  intro
}`;

// ------------------------------------------------------------------
// Collections — FAQ items and sponsors. Phase 3 wires these to pages.
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
