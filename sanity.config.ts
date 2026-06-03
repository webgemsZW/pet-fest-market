import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/lib/sanity/schemas";

// Document types that should appear as fixed singletons in the Studio
// Desk. The structure below shows each one as a single document; the
// document template + actions are filtered so editors can't create
// duplicates or accidentally delete them.
const singletons = new Set([
  "siteSettings",
  "homepage",
  "aboutPage",
  "stallHolderPage",
  "contactPage",
]);

export default defineConfig({
  name: "pet-fest-market",
  title: "PetFest Market CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Global settings ----------------------------------------
            S.listItem().title("Site Settings").id("siteSettings").child(
              S.document().schemaType("siteSettings").documentId("siteSettings"),
            ),
            S.divider(),
            // Events (collection — pick "Current Event" in Site Settings)
            S.documentTypeListItem("event").title("Events"),
            S.divider(),
            // Page-specific singletons -------------------------------
            S.listItem().title("Homepage").id("homepage").child(
              S.document().schemaType("homepage").documentId("homepage"),
            ),
            S.listItem().title("About Page").id("aboutPage").child(
              S.document().schemaType("aboutPage").documentId("aboutPage"),
            ),
            S.listItem().title("Stallholder Page").id("stallHolderPage").child(
              S.document().schemaType("stallHolderPage").documentId("stallHolderPage"),
            ),
            S.listItem().title("Contact Page").id("contactPage").child(
              S.document().schemaType("contactPage").documentId("contactPage"),
            ),
            S.divider(),
            // Collections --------------------------------------------
            S.documentTypeListItem("faqItem").title("FAQ Items"),
            S.documentTypeListItem("sponsor").title("Sponsors"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletons.has(context.schemaType)
        ? input.filter(({ action }) =>
            action ? ["publish", "discardChanges", "restore"].includes(action) : true,
          )
        : input,
  },
});
