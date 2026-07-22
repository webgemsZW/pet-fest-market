import { defineType, defineField } from "sanity";
import { seoField } from "./_seo-fields";

/**
 * Stallholder page content. Per the 2/3 June 2026 client revisions the
 * page is deliberately minimal — heading, optional intro, and two
 * buttons in the hero (Apply Here + Have Questions). The earlier
 * sections (benefits, pricing tiers, requirements, vendor FAQs, and
 * the standalone Apply section at the bottom) have all been removed.
 *
 * The Google Form URL itself lives on the `event` document so it can
 * vary between events. If no current event has one set, the page
 * falls back to `DEFAULT_APPLY_URL` in src/lib/site-defaults.ts.
 */
export const stallHolderPage = defineType({
  name: "stallHolderPage",
  title: "Stallholder Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Main H1 on /stall-holders, e.g. 'Become a Stallholder'.",
    }),
    defineField({
      name: "intro",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      description:
        "Short paragraph under the heading. Optional — leave blank for a clean hero with just the heading and the two buttons.",
    }),
    defineField({
      name: "applyButtonLabel",
      title: "Apply Button Label",
      type: "string",
      description: "Text on the application button. Defaults to 'Apply Here'.",
    }),
    defineField({
      name: "upcomingHeading",
      title: "Upcoming Markets Heading",
      type: "string",
      description:
        "Heading above the list of markets Stallholders can apply for. Defaults to 'Apply for an upcoming market'. Only shown when more than one upcoming market exists.",
    }),
    seoField(),
  ],
});
