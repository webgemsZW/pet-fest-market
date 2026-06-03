import { defineType, defineField } from "sanity";

/**
 * About page content. Per the 2 June 2026 client revision the page is
 * intentionally simple — just the heading and a single body block of
 * text. The "Our Story" rich-text section and "What We Stand For"
 * values cards have been removed; we can add them back when the market
 * grows.
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Main H1 at the top of /about. Defaults to 'About'.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      description:
        "The About content. Use the toolbar for paragraphs / bold / links. Keep it short for now — the client has asked for a simple statement.",
    }),
    defineField({
      name: "image",
      title: "Feature Image",
      type: "image",
      description: "Optional. Not currently rendered on the live page — reserved for a future redesign.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
  ],
});
