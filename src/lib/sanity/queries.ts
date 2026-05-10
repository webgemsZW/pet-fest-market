export const homepageQuery = `*[_type == "homepage"][0]{
  heroHeadline,
  heroSubheading,
  heroImage,
  eventSummary,
  vendorCtaHeadline,
  vendorCtaBody,
  welcomeToCountryText
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  heading,
  subheading,
  body,
  image
}`;

export const stallHolderPageQuery = `*[_type == "stallHolderPage"][0]{
  heading,
  intro,
  benefits,
  pricing[]{
    tier,
    price,
    description
  },
  requirements,
  applyUrl,
  faqs[]{
    question,
    answer
  }
}`;

export const faqPageQuery = `*[_type == "faqPage"][0]{
  heading,
  intro
}`;

export const faqItemsQuery = `*[_type == "faqItem"] | order(category asc, _createdAt asc){
  _id,
  question,
  answer,
  category
}`;

export const sponsorsPageQuery = `*[_type == "sponsorsPage"][0]{
  heading,
  intro
}`;

export const sponsorsQuery = `*[_type == "sponsor"] | order(tier asc, name asc){
  _id,
  name,
  logo,
  website,
  tier
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  heading,
  intro,
  email,
  phone,
  address
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  siteDescription,
  logoText,
  socialLinks{
    facebook,
    instagram,
    twitter
  },
  mailingListUrl
}`;

export const eventSettingsQuery = `*[_type == "eventSettings"][0]{
  eventName,
  eventDate,
  location,
  ticketPrice,
  ticketUrl,
  applyUrl
}`;

export const policyPagesQuery = `*[_type == "policyPages"][0]{
  termsAndConditions,
  privacyPolicy,
  refundPolicy
}`;
