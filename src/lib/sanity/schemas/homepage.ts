import { defineType, defineField } from "sanity";
import { iconChoices } from "./_icon-field";

/**
 * Homepage content. Per the 2 June 2026 client revision the
 * "Grow your business" / Vendor CTA section was removed (the market
 * is intentionally simple at this stage). The matching schema fields
 * for that section have been dropped too.
 */
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "expect", title: "What to Expect" },
    { name: "faq", title: "FAQ Preview" },
    { name: "mailing", title: "Mailing List" },
  ],
  fields: [
    // ── Hero ───────────────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      group: "hero",
      description: "Small pill of text shown above the logo. Keep under ~40 characters.",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      group: "hero",
      description:
        "Paragraph under the logo. Must NOT imply visitors can bring pets to the venue (the Box Hill venue doesn't allow visitor pets — some other venues may).",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      description: "Optional. Not currently rendered on the live page — reserved for a future redesign.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "heroApplyLabel",
      title: "Hero — Apply Button Label",
      type: "string",
      group: "hero",
      description: "Text on the primary hero button. Defaults to 'Apply as Stallholder'.",
    }),
    defineField({
      name: "heroUpdatesLabel",
      title: "Hero — Updates Button Label",
      type: "string",
      group: "hero",
      description: "Text on the secondary hero button that jumps to the sign-up form. Defaults to 'Get Event Updates'.",
    }),
    defineField({
      name: "heroTicketLabel",
      title: "Hero — Tickets Pill (on sale)",
      type: "string",
      group: "hero",
      description: "Label on the tickets pill once a ticket link is set on the event. Defaults to 'Buy Tickets'.",
    }),
    defineField({
      name: "heroTicketComingSoonLabel",
      title: "Hero — Tickets Pill (coming soon)",
      type: "string",
      group: "hero",
      description: "Label on the tickets pill before a ticket link is set. Defaults to 'Tickets coming soon'.",
    }),

    // ── What to Expect ─────────────────────────────────────────────
    defineField({
      name: "whatToExpectHeading",
      title: "Section Heading",
      type: "string",
      group: "expect",
      description: "Defaults to 'What to Expect'.",
    }),
    defineField({
      name: "whatToExpectSubtitle",
      title: "Section Subtitle",
      type: "text",
      rows: 2,
      group: "expect",
    }),
    defineField({
      name: "whatToExpectCards",
      title: "Cards",
      type: "array",
      group: "expect",
      description: "Three cards work best with the current layout. Adding a 4th will wrap to a second row.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: iconChoices, layout: "dropdown" },
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
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),

    // ── FAQ Preview ────────────────────────────────────────────────
    defineField({
      name: "faqPreviewHeading",
      title: "FAQ Section Heading",
      type: "string",
      group: "faq",
      description: "Defaults to 'Common Questions'.",
    }),
    defineField({
      name: "faqPreviewSubtitle",
      title: "FAQ Section Subtitle",
      type: "text",
      rows: 2,
      group: "faq",
    }),
    defineField({
      name: "faqCtaPrompt",
      title: "FAQ — Follow-up Prompt",
      type: "string",
      group: "faq",
      description: "Line under the FAQ list inviting people to get in touch. Defaults to \"Can't find what you're looking for?\".",
    }),
    defineField({
      name: "faqCtaLabel",
      title: "FAQ — Follow-up Button Label",
      type: "string",
      group: "faq",
      description: "Button under the FAQ list. Defaults to 'Get in Touch'.",
    }),

    // ── Mailing list ───────────────────────────────────────────────
    defineField({
      name: "mailingListHeading",
      title: "Mailing List Heading",
      type: "string",
      group: "mailing",
      description: "Defaults to \"Get Updates on PetFest news and events\".",
    }),
    defineField({
      name: "mailingListSubline",
      title: "Mailing List Reassurance Line",
      type: "string",
      group: "mailing",
      description: "Small print under the sign-up form. Defaults to 'No spam, ever. Unsubscribe any time.'.",
    }),
  ],
});
