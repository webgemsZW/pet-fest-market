import { defineType, defineField } from "sanity";

export const eventSettings = defineType({
  name: "eventSettings",
  title: "Event Settings",
  type: "document",
  fields: [
    defineField({ name: "eventName", title: "Event Name", type: "string" }),
    defineField({ name: "eventDate", title: "Event Date", type: "datetime" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "ticketPrice", title: "Ticket Price (AUD)", type: "number" }),
    defineField({ name: "ticketUrl", title: "Ticket Purchase URL", type: "url" }),
    defineField({ name: "applyUrl", title: "Vendor Application URL", type: "url" }),
  ],
});
