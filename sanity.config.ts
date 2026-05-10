import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/lib/sanity/schemas";

const singletons = new Set([
  "siteSettings",
  "eventSettings",
  "homepage",
  "aboutPage",
  "stallHolderPage",
  "contactPage",
  "policyPages",
]);

export default defineConfig({
  name: "pet-fest-market",
  title: "Pet Fest Market CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      // Sanity Studio structure
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Site Settings").id("siteSettings").child(
              S.document().schemaType("siteSettings").documentId("siteSettings"),
            ),
            S.listItem().title("Event Settings").id("eventSettings").child(
              S.document().schemaType("eventSettings").documentId("eventSettings"),
            ),
            S.divider(),
            S.listItem().title("Homepage").id("homepage").child(
              S.document().schemaType("homepage").documentId("homepage"),
            ),
            S.listItem().title("About Page").id("aboutPage").child(
              S.document().schemaType("aboutPage").documentId("aboutPage"),
            ),
            S.listItem().title("Stall Holder Page").id("stallHolderPage").child(
              S.document().schemaType("stallHolderPage").documentId("stallHolderPage"),
            ),
            S.listItem().title("Contact Page").id("contactPage").child(
              S.document().schemaType("contactPage").documentId("contactPage"),
            ),
            S.listItem().title("Policy Pages").id("policyPages").child(
              S.document().schemaType("policyPages").documentId("policyPages"),
            ),
            S.divider(),
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
