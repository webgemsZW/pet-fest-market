import { defineType, defineField } from "sanity";
import { seoField } from "./_seo-fields";

/**
 * Editable copy for the /sponsors page (heading, subtitle, and the intro
 * above the enquiry form). The individual Sponsor logos/names live in the
 * `sponsor` collection — this doc only holds the surrounding page copy.
 * The enquiry form's fields themselves are fixed in code.
 */
export const sponsorsPage = defineType({
  name: "sponsorsPage",
  title: "Sponsors Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "cta", title: "Enquiry Form" },
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
        "Intro shown above the sponsor enquiry form. Defaults to 'Interested in sponsoring PetFest Market? Complete the form and we will be in touch with you to discuss.'",
    }),
    seoField("hero"),
  ],
});
