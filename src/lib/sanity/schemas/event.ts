import { defineType, defineField } from "sanity";

/**
 * An event run by PetFest Market.
 *
 * This is a COLLECTION (not a singleton) so the site can be flipped from
 * one event to the next by changing `siteSettings.currentEvent`. The
 * site UI today only renders the current event — future event listing /
 * archive pages are deferred until event #2 is on the calendar
 * (CMS_PLAN.md §14).
 */
export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "eventName",
      title: "Event Name",
      type: "string",
      description: "Internal name for the event, e.g. 'Box Hill Town Hall 2026'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL-safe version of the event name. Auto-generated from the Event Name — click 'Generate' if it's blank. Future-proofs URLs like /events/<slug>; not used by the live site today.",
      options: {
        source: "eventName",
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eventDate",
      title: "Event Date & Start Time",
      type: "datetime",
      description:
        "Full date and start time of the event. Powers the homepage countdown and the date pill in the hero.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "doorsOpenTime",
      title: "Doors Open Time",
      type: "string",
      description:
        "Human-readable opening time, e.g. '10am'. Optional — defaults to '10am' (the Box Hill trading time) if left blank.",
    }),
    defineField({
      name: "eventEndTime",
      title: "Event End Time",
      type: "string",
      description:
        "Human-readable closing time, e.g. '3pm'. Optional — defaults to '3pm' (the Box Hill trading time) if left blank.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Venue name and city, e.g. 'Box Hill Town Hall, VIC'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ticketPrice",
      title: "Ticket Price (AUD)",
      type: "number",
      description: "Optional. Leave blank if tickets aren't on sale yet.",
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket Purchase URL",
      type: "url",
      description:
        "External ticketing platform URL. When set, the hero's 'Tickets coming soon' pill becomes a buy link.",
    }),
    defineField({
      name: "applyUrl",
      title: "Stallholder Application URL",
      type: "url",
      description:
        "Google Form URL for Stallholder applications. When set, all 'Apply as Stallholder' buttons link here directly.",
    }),
  ],
  preview: {
    select: {
      title: "eventName",
      date: "eventDate",
      location: "location",
    },
    prepare({ title, date, location }) {
      const formattedDate = date
        ? new Date(date as string).toLocaleDateString("en-AU", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "No date set";
      return {
        title: title ?? "Untitled event",
        subtitle: `${formattedDate}${location ? ` — ${location}` : ""}`,
      };
    },
  },
});
