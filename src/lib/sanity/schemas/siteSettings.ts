import { defineType, defineField } from "sanity";

/**
 * Global site-wide settings. Singleton — there is only ever one document
 * of this type, and most pages depend on it. See CMS_PLAN.md §9.1.
 *
 * Contact details (email/phone/address) live here rather than on
 * contactPage so the footer and the /contact page draw from a single
 * source of truth.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social & Mailing list" },
    { name: "branding", title: "Branding" },
    { name: "policies", title: "Policy Documents" },
    { name: "event", title: "Current Event" },
  ],
  fields: [
    // General -----------------------------------------------------------
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "general",
      description: "Displayed in browser tabs and SEO metadata. Should normally be 'PetFest Market'.",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 2,
      group: "general",
      description: "Short tagline used for SEO and link previews. Keep under 160 characters.",
    }),
    defineField({
      name: "acknowledgementOfCountry",
      title: "Acknowledgement of Country",
      type: "text",
      rows: 6,
      group: "general",
      description: "Shown in the site footer on every page.",
      validation: (r) => r.required().min(20),
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
      group: "general",
      description:
        "Short line shown under the logo in the footer. Defaults to 'An indoor market for Pet Lovers!'. Keep it generic (no specific city or date) so it works across every market.",
    }),

    // Contact -----------------------------------------------------------
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "contact",
      description: "Public contact address shown in the footer and on the Contact page.",
      validation: (r) =>
        r.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" }).error("Must be a valid email address"),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      group: "contact",
      description: "Optional. Leave blank if you don't want to publish a phone number.",
    }),
    defineField({
      name: "contactAddress",
      title: "Contact Address",
      type: "text",
      rows: 3,
      group: "contact",
      description:
        "The organiser's postal / mailing address shown on the Contact page (NOT the event venue). Leave blank to use the default PO Box.",
    }),

    // Social & mailing list --------------------------------------------
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      group: "social",
      description:
        "Full URLs (including https://). Facebook, Instagram, and TikTok all have hardcoded defaults pointing at @petfestaustralia (see src/lib/site-defaults.ts), so the icons appear on the live site even if these fields are blank. Filling a field in here overrides the default. Twitter / X has no default — leave blank to hide that icon.",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
      ],
    }),
    defineField({
      name: "mailingListUrl",
      title: "Mailing List Sign-up URL",
      type: "url",
      group: "social",
      description:
        "External form URL (e.g. MailChimp hosted form). Used by the newsletter sign-up forms in the footer and on the home page.",
    }),

    // Branding ---------------------------------------------------------
    defineField({
      name: "nonconformityCredit",
      title: "Nonconformity Productions Credit",
      type: "object",
      group: "branding",
      description: "Footer credit block. Leave blank to use the default text and logo.",
      fields: [
        defineField({
          name: "text",
          title: "Lead-in Text",
          type: "string",
          description: "Defaults to 'PetFest Market is an event of'.",
        }),
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        }),
      ],
    }),

    // Policy documents -------------------------------------------------
    defineField({
      name: "policyDocuments",
      title: "Policy Documents (PDFs)",
      type: "object",
      group: "policies",
      description:
        "Upload the PDF for each legal policy — these are exactly what the footer links to. Upload a new file here any time to update the live document; no developer or deploy needed. Leave a slot empty to keep using the built-in default PDF that ships with the site.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "termsPdf",
          title: "Terms & Conditions PDF",
          type: "file",
          options: { accept: "application/pdf" },
        }),
        defineField({
          name: "privacyPdf",
          title: "Privacy Policy PDF",
          type: "file",
          options: { accept: "application/pdf" },
        }),
        defineField({
          name: "codeOfConductPdf",
          title: "Code of Conduct PDF",
          type: "file",
          options: { accept: "application/pdf" },
        }),
      ],
    }),

    // Current event ----------------------------------------------------
    defineField({
      name: "currentEvent",
      title: "Featured Event (optional override)",
      type: "reference",
      group: "event",
      description:
        "Optional. Pin a specific event as the prominent one across the site. Leave this blank and the site automatically features the soonest upcoming market (and rolls forward on its own once an event passes). Only set this if you want to spotlight an event out of date order — and note it is ignored once the event it points at is in the past.",
      to: [{ type: "event" }],
    }),
  ],
});
