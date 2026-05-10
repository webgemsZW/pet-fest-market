import { defineType, defineField } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Sponsor Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "website", title: "Website URL", type: "url" }),
    defineField({
      name: "tier",
      title: "Sponsorship Tier",
      type: "string",
      options: {
        list: [
          { title: "Platinum", value: "platinum" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
        ],
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo" },
  },
});
