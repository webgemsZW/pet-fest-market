import { defineType, defineField } from "sanity";
import { seoField } from "./_seo-fields";

/**
 * Editable copy for the standalone /faq page. The FAQ questions & answers
 * themselves live in the `faqItem` collection — this doc only holds the
 * page's hero heading/subtitle and the follow-up call-to-action, which
 * were previously hardcoded (and duplicated from the homepage section).
 */
export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Main H1. Defaults to 'Frequently Asked Questions'.",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      description: "Line under the heading. Defaults to 'Everything you need to know about PetFest Market.'.",
    }),
    defineField({
      name: "ctaPrompt",
      title: "Follow-up Prompt",
      type: "string",
      description: "Line under the FAQ list. Defaults to \"Can't find what you're looking for?\".",
    }),
    defineField({
      name: "ctaLabel",
      title: "Follow-up Button Label",
      type: "string",
      description: "Button under the FAQ list. Defaults to 'Get in Touch'.",
    }),
    seoField(),
  ],
});
