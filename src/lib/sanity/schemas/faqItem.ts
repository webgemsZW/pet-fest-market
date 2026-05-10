import { defineType, defineField } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Vendors", value: "vendors" },
          { title: "Pets", value: "pets" },
          { title: "Tickets", value: "tickets" },
        ],
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
});
