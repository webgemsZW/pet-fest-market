import { defineType, defineField } from "sanity";

/**
 * Page-specific copy for /contact. Email, phone, and address are global
 * and live on `siteSettings` instead (so they only need editing in one
 * place even though they appear on multiple pages).
 */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Main H1, e.g. 'Get in Touch'.",
    }),
    defineField({
      name: "intro",
      title: "Intro Text",
      type: "text",
      rows: 3,
      description: "Short paragraph shown under the heading.",
    }),
  ],
});
