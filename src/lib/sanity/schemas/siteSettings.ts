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
      description: "Mailing address or venue. Optional — leave blank to hide.",
    }),

    // Social & mailing list --------------------------------------------
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      group: "social",
      description:
        "Full URLs (including https://). Leave any field blank to hide the matching icon in the footer and Contact page.",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
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

    // Current event ----------------------------------------------------
    defineField({
      name: "currentEvent",
      title: "Current Event",
      type: "reference",
      group: "event",
      description:
        "The event the site is currently promoting. Pick from the list of events. To flip the site over to a new event, change this reference.",
      to: [{ type: "event" }],
      validation: (r) => r.required(),
    }),
  ],
});
