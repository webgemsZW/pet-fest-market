import { defineType, defineField } from "sanity";
import { iconChoices } from "./_icon-field";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Main H1 at the top of /about, e.g. 'About PetFest Market'.",
    }),
    defineField({
      name: "subheading",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      description: "Short tagline shown directly under the heading.",
    }),
    defineField({
      name: "story",
      title: "Our Story",
      type: "array",
      of: [{ type: "block" }],
      description: "The 'Our Story' rich-text content. Use the toolbar for paragraphs, bold, links. Avoid making claims that aren't true yet (the Box Hill 26 July 2026 event is the FIRST PetFest Market).",
    }),
    defineField({
      name: "image",
      title: "Feature Image",
      type: "image",
      description: "Optional. Not currently rendered on the live page — reserved for a future redesign.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "values",
      title: "What We Stand For",
      type: "array",
      description: "The four cards under 'What We Stand For'. Aim for 3–4 entries.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: iconChoices, layout: "dropdown" },
              description: "Icon shown at the top of the card.",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "description", icon: "icon" } },
        },
      ],
    }),
  ],
});
