import { defineType, defineField } from "sanity";

/**
 * A single Frequently Asked Question.
 *
 * Per the 2 June 2026 client revision, FAQs are a SINGLE unified list —
 * no general/vendors/pets/tickets category split. The old `category`
 * field was removed.
 *
 * Display order is controlled by the numeric `order` field; lower
 * numbers appear first.
 *
 * Note: visitors CANNOT bring pets to the venue. Content authored here
 * must reflect that — see CLAUDE.md.
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
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Lower numbers appear first. Use 10, 20, 30… so you can slot new questions between existing ones without renumbering everything.",
      initialValue: 100,
      validation: (r) => r.integer(),
    }),
  ],
  preview: {
    select: { title: "question", order: "order" },
    prepare({ title, order }) {
      return {
        title: title ?? "Untitled question",
        subtitle: typeof order === "number" ? `#${order}` : undefined,
      };
    },
  },
  orderings: [
    {
      title: "Display order (asc)",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
