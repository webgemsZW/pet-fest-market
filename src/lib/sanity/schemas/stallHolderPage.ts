import { defineType, defineField } from "sanity";

export const stallHolderPage = defineType({
  name: "stallHolderPage",
  title: "Stall Holder Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Main H1 on /stall-holders, e.g. 'Become a Stall Holder'.",
    }),
    defineField({
      name: "intro",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      description: "Short paragraph under the heading.",
    }),
    defineField({
      name: "benefitsHeading",
      title: "Benefits Heading",
      type: "string",
      description: "Heading for the perks section. Defaults to 'Why Sell at PetFest Market?'.",
    }),
    defineField({
      name: "benefitsSubtitle",
      title: "Benefits Subtitle",
      type: "text",
      rows: 2,
      description: "Optional subtitle under the benefits heading.",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      description: "Bullet list of perks shown in the 'Why Sell' grid. Keep each entry short — under ~70 characters.",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "pricingHeading",
      title: "Pricing Heading",
      type: "string",
      description: "Heading above the pricing tier cards. Defaults to 'Stall Pricing'.",
    }),
    defineField({
      name: "pricingSubtitle",
      title: "Pricing Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "pricing",
      title: "Pricing Tiers",
      type: "array",
      description: "Tiered stall options shown as cards. Mark one tier as 'Featured' to highlight it as 'Most Popular'.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "tier",
              title: "Tier Name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              description: "Including the currency symbol, e.g. '$80' or 'POA'.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Short Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "features",
              title: "What's Included",
              type: "array",
              description: "Bullet list of inclusions. Keep each short.",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "featured",
              title: "Highlight as 'Most Popular'",
              type: "boolean",
              description: "Tick exactly ONE tier to highlight it. Leaving multiple ticked is fine but may look noisy.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "tier", subtitle: "price", featured: "featured" },
            prepare({ title, subtitle, featured }) {
              return {
                title: title ?? "Untitled tier",
                subtitle: `${subtitle ?? "—"}${featured ? " · ⭐ Most Popular" : ""}`,
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "requirementsHeading",
      title: "Requirements Heading",
      type: "string",
      description: "Defaults to 'Requirements'.",
    }),
    defineField({
      name: "requirementsSubtitle",
      title: "Requirements Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      description: "Each entry becomes a ⚠️ bullet on the page.",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "vendorFaqsHeading",
      title: "Vendor FAQs Heading",
      type: "string",
      description: "Defaults to 'Vendor FAQs'.",
    }),
    defineField({
      name: "vendorFaqs",
      title: "Vendor FAQs",
      type: "array",
      description: "Application-specific FAQs (separate from the public-facing FAQ collection).",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),

    defineField({
      name: "applyHeading",
      title: "Apply Section Heading",
      type: "string",
      description: "Heading for the call-to-action at the bottom of the page. Defaults to 'Ready to Apply?'.",
    }),
    defineField({
      name: "applyBody",
      title: "Apply Section Body",
      type: "text",
      rows: 3,
      description: "Paragraph above the apply button.",
    }),
    defineField({
      name: "applyComingSoonLabel",
      title: "Apply Button Coming-Soon Label",
      type: "string",
      description:
        "Text shown on the disabled button while the Google Form URL on the current event isn't set yet. Defaults to 'Application Form Coming Soon'.",
    }),

    // NOTE: applyUrl is intentionally NOT here. It lives on the `event`
    // document so it can vary between events. The Apply Now button on
    // this page resolves it via `siteSettings.currentEvent.applyUrl`.
  ],
});
