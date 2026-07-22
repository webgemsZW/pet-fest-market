import { defineType, defineField } from "sanity";
import { seoField } from "./_seo-fields";

/**
 * Editable copy for the /sponsors page. Previously every string on this
 * page was hardcoded in the component (heading, subtitle, the empty
 * "coming soon" state, and the "Become a Sponsor" block). The individual
 * Sponsor logos/names still live in the `sponsor` collection — this doc
 * only holds the surrounding page copy.
 */
export const sponsorsPage = defineType({
  name: "sponsorsPage",
  title: "Sponsors Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "empty", title: "Empty State" },
    { name: "cta", title: "Become a Sponsor" },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      group: "hero",
      description: "Main H1. Defaults to 'Our Sponsors'.",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      group: "hero",
      description:
        "Line under the heading. Defaults to 'PetFest Market is made possible through the generous support of local businesses.'.",
    }),
    defineField({
      name: "emptyStateHeading",
      title: "Empty State Heading",
      type: "string",
      group: "empty",
      description:
        "Shown while no sponsors have been added yet. Defaults to 'Sponsors coming soon'.",
    }),
    defineField({
      name: "emptyStateBody",
      title: "Empty State Body",
      type: "text",
      rows: 3,
      group: "empty",
      description:
        "Message shown while no sponsors are signed. Avoid hardcoding a specific date/venue here so it stays valid across markets.",
    }),
    defineField({
      name: "ctaHeading",
      title: "'Become a Sponsor' Heading",
      type: "string",
      group: "cta",
      description: "Defaults to 'Become a Sponsor'.",
    }),
    defineField({
      name: "ctaBody",
      title: "'Become a Sponsor' Body",
      type: "text",
      rows: 3,
      group: "cta",
      description:
        "Invitation to prospective sponsors. Defaults to a short 'reach out to discuss sponsorship' message.",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "'Become a Sponsor' Button Label",
      type: "string",
      group: "cta",
      description: "Defaults to 'Get in Touch'.",
    }),
    seoField("hero"),
  ],
});
