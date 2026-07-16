import { defineType, defineField } from "sanity";

/**
 * An event run by PetFest Market.
 *
 * This is a COLLECTION (not a singleton) so the site can host many events
 * over time. As of the multi-event build the site now renders:
 *   - a prominent "featured" event (see get-events.ts → getFeaturedEvent,
 *     which honours `siteSettings.currentEvent` while it is still upcoming
 *     and otherwise auto-advances to the soonest future event),
 *   - an `/events` listing of every upcoming market, and
 *   - a per-event detail page at `/events/<slug>`.
 *
 * Adding a market is therefore just "create a document" — no code change.
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
        "URL-safe version of the event name. Auto-generated from the Event Name — click 'Generate' if it's blank. This is the address of the event's detail page: /events/<slug>.",
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
      name: "timezone",
      title: "Time Zone",
      type: "string",
      description:
        "The venue's local time zone. Drives the displayed date and the zone label shown next to the trading times (e.g. AEST / AEDT). Defaults to Melbourne — change it for interstate markets (e.g. Queensland).",
      options: {
        list: [
          { title: "Victoria / NSW / ACT / Tasmania (AEST/AEDT)", value: "Australia/Melbourne" },
          { title: "Queensland (AEST)", value: "Australia/Brisbane" },
          { title: "South Australia (ACST/ACDT)", value: "Australia/Adelaide" },
          { title: "Western Australia (AWST)", value: "Australia/Perth" },
          { title: "Northern Territory (ACST)", value: "Australia/Darwin" },
        ],
        layout: "dropdown",
      },
      initialValue: "Australia/Melbourne",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Venue name and city, e.g. 'Box Hill Town Hall, VIC'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "blurb",
      title: "Short Description",
      type: "text",
      rows: 3,
      description:
        "One or two sentences describing this market. Shown on the /events listing card and on the event's detail page. Optional — leave blank to show just the date and venue.",
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      description:
        "Optional. Used on the /events listing card and the event detail page. Falls back to the PetFest logo when blank.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
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
        "Google Form URL for Stallholder applications. When set, this event's 'Apply as Stallholder' buttons link here directly. Stallholders can apply for any upcoming market, not just the featured one.",
    }),
    defineField({
      name: "applyDeadline",
      title: "Stallholder Application Deadline",
      type: "datetime",
      description:
        "Optional. After this date the 'Apply' button for this event switches to 'Applications closed'. Leave blank to keep applications open right up to the event.",
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
            timeZone: "Australia/Melbourne",
          })
        : "No date set";
      return {
        title: title ?? "Untitled event",
        subtitle: `${formattedDate}${location ? ` — ${location}` : ""}`,
      };
    },
  },
});
