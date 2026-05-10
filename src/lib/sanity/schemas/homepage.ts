import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text", rows: 2 }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "eventSummary", title: "Event Summary", type: "text", rows: 3 }),
    defineField({ name: "vendorCtaHeadline", title: "Vendor CTA Headline", type: "string" }),
    defineField({ name: "vendorCtaBody", title: "Vendor CTA Body", type: "text", rows: 3 }),
    defineField({
      name: "welcomeToCountryText",
      title: "Welcome to Country Text",
      type: "text",
      rows: 4,
    }),
  ],
});
