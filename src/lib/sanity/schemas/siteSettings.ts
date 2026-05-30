import { defineType, defineField } from "sanity";

/**
 * Global site-wide settings. Singleton — there is only ever one document
 * of this type, and most pages depend on it. See CMS_PLAN.md §9.1.
 *
 * NOTE: This schema is being extended incrementally per the phased plan.
 * Phase 1 adds `acknowledgementOfCountry` (drives the footer). Subsequent
 * phases will add contact details, the Nonconformity credit, and the
 * `currentEvent` reference. Don't bulk-add fields before they're wired
 * up on the consuming pages.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "siteDescription", title: "Site Description", type: "text", rows: 2 }),
    defineField({
      name: "acknowledgementOfCountry",
      title: "Acknowledgement of Country",
      type: "text",
      rows: 6,
      description:
        "Shown in the site footer on every page. Update this if the wording changes.",
      validation: (r) => r.required().min(20),
    }),
    defineField({ name: "logoText", title: "Logo Text", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
      ],
    }),
    defineField({ name: "mailingListUrl", title: "Mailing List URL", type: "url" }),
  ],
});
