import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Page Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro Text", type: "text", rows: 2 }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
  ],
});
