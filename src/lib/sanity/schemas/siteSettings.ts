import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "siteDescription", title: "Site Description", type: "text", rows: 2 }),
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
