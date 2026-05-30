import { defineType, defineField } from "sanity";

/**
 * A single Frequently Asked Question.
 *
 * Categories match the four tabs on /faq. The "Pets" category is for
 * questions about pet products / vendors / market content — NOT about
 * bringing pets to the venue (visitors cannot bring pets — see CLAUDE.md
 * "Visitors CANNOT bring pets to the venue").
 */
export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "Phrased as a question, e.g. 'What time does the market open?'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      description: "Plain-text answer. Keep it tight — one or two short paragraphs.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Which tab on /faq this question belongs to. IMPORTANT: the 'Pets' category is for questions about pet products and vendors at the market — NOT about bringing pets to the venue. Visitors cannot bring pets inside.",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Vendors", value: "vendors" },
          { title: "Pets", value: "pets" },
          { title: "Tickets", value: "tickets" },
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
        "Lower numbers appear first within each category. Use 10, 20, 30… so you can slot new questions between existing ones without renumbering everything.",
      initialValue: 100,
      validation: (r) => r.integer(),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "category", order: "order" },
    prepare({ title, subtitle, order }) {
      return {
        title: title ?? "Untitled question",
        subtitle: `${subtitle ?? "—"}${typeof order === "number" ? ` · #${order}` : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Category, then order",
      name: "categoryThenOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
