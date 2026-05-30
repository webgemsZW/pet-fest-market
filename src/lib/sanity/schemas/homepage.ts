import { defineType, defineField } from "sanity";
import { iconChoices } from "./_icon-field";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "expect", title: "What to Expect" },
    { name: "vendorCta", title: "Vendor CTA" },
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
        "Paragraph under the logo. Must NOT imply visitors can bring pets to the venue — pets are not allowed at the venue.",
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

    // ── Vendor CTA ─────────────────────────────────────────────────
    defineField({
      name: "vendorCtaBadge",
      title: "Top Badge Text",
      type: "string",
      group: "vendorCta",
      description: "Small uppercase pill at the top of the vendor CTA. Defaults to 'Vendor Applications Open'.",
    }),
    defineField({
      name: "vendorCtaHeadline",
      title: "Headline",
      type: "string",
      group: "vendorCta",
    }),
    defineField({
      name: "vendorCtaBody",
      title: "Body Text",
      type: "text",
      rows: 3,
      group: "vendorCta",
      description: "The event date and venue are appended automatically — you don't need to write them here.",
    }),
    defineField({
      name: "vendorCtaPerks",
      title: "Perks Bullet List",
      type: "array",
      group: "vendorCta",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "vendorCtaPricingPill",
      title: "Pricing Pill (right-hand side)",
      type: "object",
      group: "vendorCta",
      description: "Decorative pricing summary on the right side of the vendor CTA.",
      fields: [
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description: "Big bold line, e.g. 'Stalls from $80'.",
        }),
        defineField({
          name: "subline",
          title: "Subline",
          type: "string",
          description: "Smaller line below, e.g. 'Limited spots available'.",
        }),
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
      description: "Defaults to \"Don't miss a thing\".",
    }),
    defineField({
      name: "mailingListBody",
      title: "Mailing List Body",
      type: "text",
      rows: 2,
      group: "mailing",
    }),
  ],
});
