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

    // ── Mailing list ───────────────────────────────────────────────
    defineField({
      name: "mailingListHeading",
      title: "Mailing List Heading",
      type: "string",
      group: "mailing",
      description: "Defaults to \"Get Updates on PetFest news and events\".",
    }),
  ],
});
