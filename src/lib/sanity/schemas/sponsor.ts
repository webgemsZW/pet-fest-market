import { defineType, defineField } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Sponsor Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short one-line description shown beneath the name, e.g. 'Premium pet accessories & grooming'.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Upload at any size — the site auto-resizes. Transparent PNGs look best.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the logo for screen readers. Usually just the sponsor's name.",
        }),
      ],
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
      description: "Optional. When set, the sponsor card links to this URL.",
    }),
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
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Lower numbers appear first within each tier. Use 10, 20, 30… so you can slot new sponsors between existing ones without renumbering everything.",
      initialValue: 100,
      validation: (r) => r.integer(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo", order: "order" },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title ?? "Untitled sponsor",
        subtitle: `${subtitle ?? "—"}${typeof order === "number" ? ` · #${order}` : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Tier, then order",
      name: "tierThenOrder",
      by: [
        { field: "tier", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
