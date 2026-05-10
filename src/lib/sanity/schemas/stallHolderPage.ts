import { defineType, defineField } from "sanity";

export const stallHolderPage = defineType({
  name: "stallHolderPage",
  title: "Stall Holder Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Page Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro Text", type: "text", rows: 3 }),
    defineField({ name: "benefits", title: "Benefits", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "pricing",
      title: "Pricing Tiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "tier", title: "Tier Name", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({ name: "requirements", title: "Requirements", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "applyUrl", title: "Application Form URL", type: "url" }),
    defineField({
      name: "faqs",
      title: "Vendor FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
  ],
});
