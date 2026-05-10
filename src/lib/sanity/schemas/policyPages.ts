import { defineType, defineField } from "sanity";

export const policyPages = defineType({
  name: "policyPages",
  title: "Policy Pages",
  type: "document",
  fields: [
    defineField({
      name: "termsAndConditions",
      title: "Terms & Conditions",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "privacyPolicy",
      title: "Privacy Policy",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "refundPolicy",
      title: "Refund Policy",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
