import { defineType, defineField } from "sanity";
import { seoField } from "./_seo-fields";

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
    defineField({
      name: "detailsHeading",
      title: "Contact Details Heading",
      type: "string",
      description: "Heading above the email / phone / location block. Defaults to 'Contact Details'.",
    }),
    defineField({
      name: "followHeading",
      title: "Follow Us Heading",
      type: "string",
      description: "Heading above the social icons. Defaults to 'Follow Us'.",
    }),
    defineField({
      name: "formHeading",
      title: "Message Form Heading",
      type: "string",
      description: "Heading above the contact form. Defaults to 'Send a Message'.",
    }),
    seoField(),
  ],
});
