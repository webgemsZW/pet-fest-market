import { defineType, defineField, defineArrayMember } from "sanity";
import { CITY_OPTIONS } from "../../cities";
import { EVENT_TIME_ZONE, localDateKey } from "../../format-event-date";

/**
 * An event run by PetFest Market.
 *
 * This is a COLLECTION (not a singleton) so the site can host many events
 * over time. The site renders:
 *   - homepage city badges (grouped by the `city` field),
 *   - a per-city listing at `/events/<city>`,
 *   - an `/events` listing of every market, and
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
      description:
        "The event's name, shown publicly as its title on event cards and the event page. E.g. 'Box Hill Town Hall 2026'.",
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
        "Full date and start time of the event. Powers the countdown on the event's page, the dates shown on event listings, and whether the market shows as upcoming or past. For a multi-day market this is the FIRST day — add the other days under 'Additional Days' below.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "showCountdown",
      title: "Show Countdown Timer",
      type: "boolean",
      description:
        "Turn the live countdown to this event on or off (shown on the event's own page). Off by default.",
      initialValue: false,
    }),
    defineField({
      name: "doorsOpenTime",
      title: "Doors Open Time",
      type: "string",
      description:
        "Human-readable opening time, e.g. '10am'. Optional — defaults to '10am' (the Box Hill trading time) if left blank. For a multi-day market this is the first day's time, and the default for any additional day that doesn't set its own.",
    }),
    defineField({
      name: "eventEndTime",
      title: "Event End Time",
      type: "string",
      description:
        "Human-readable closing time, e.g. '3pm'. Optional — defaults to '3pm' (the Box Hill trading time) if left blank. For a multi-day market this is the first day's time, and the default for any additional day that doesn't set its own.",
    }),
    defineField({
      name: "additionalDays",
      title: "Additional Days",
      type: "array",
      description:
        "Only for multi-day markets. The Event Date above is the first day; add each further day here (e.g. Sunday of a two-day weekend). Each day can have its own opening and closing times — leave them blank to use the first day's. The market stays 'upcoming' until the last day's closing time. Leave this list empty for a single-day market.",
      of: [
        defineArrayMember({
          type: "object",
          name: "eventDay",
          title: "Day",
          fields: [
            defineField({
              name: "date",
              title: "Date",
              type: "date",
              description: "The calendar day, in the venue's time zone.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "doorsOpenTime",
              title: "Doors Open Time",
              type: "string",
              description: "e.g. '10am'. Optional — leave blank to use the first day's time.",
            }),
            defineField({
              name: "eventEndTime",
              title: "Event End Time",
              type: "string",
              description: "e.g. '4pm'. Optional — leave blank to use the first day's time.",
            }),
          ],
          preview: {
            select: { date: "date", open: "doorsOpenTime", end: "eventEndTime" },
            prepare({ date, open, end }) {
              const title = date
                ? new Date(`${date as string}T12:00:00Z`).toLocaleDateString("en-AU", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })
                : "No date set";
              return {
                title,
                subtitle:
                  open || end
                    ? `${open || "first-day open"} – ${end || "first-day close"}`
                    : "Same times as the first day",
              };
            },
          },
        }),
      ],
      validation: (r) =>
        r.custom((days, context) => {
          const doc = context.document as { eventDate?: string; timezone?: string } | undefined;
          const firstKey = doc?.eventDate
            ? localDateKey(doc.eventDate, doc.timezone || EVENT_TIME_ZONE)
            : null;
          const seen = new Set<string>();
          for (const day of (days as { date?: string }[] | undefined) ?? []) {
            if (!day?.date) continue;
            if (firstKey && day.date <= firstKey) {
              return `Each additional day must be after the first day (${firstKey}).`;
            }
            if (seen.has(day.date)) return "Each additional day must be a different date.";
            seen.add(day.date);
          }
          return true;
        }),
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
      name: "city",
      title: "City",
      type: "string",
      description:
        "Which city this market belongs to. Drives the homepage city badges and the /events/<city> pages. Pick the nearest listed metro.",
      options: { list: CITY_OPTIONS, layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Venue name and area, e.g. 'Box Hill Town Hall, VIC'.",
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
      title: "Humanitix Ticket URL",
      type: "url",
      description:
        "Powers the 'Buy Tickets' button — tickets open in a pop-up over the site. Just paste your event's Humanitix link (e.g. https://events.humanitix.com/your-event); the site automatically formats it for the pop-up, so the exact shape of the link you paste doesn't matter. The event must be published on Humanitix. Leave blank to show 'Tickets coming soon'.",
    }),
    defineField({
      name: "ticketSalesDeadline",
      title: "Ticket Sales Close",
      type: "datetime",
      description:
        "Optional. The last moment tickets can be bought online. After this, the 'Buy Tickets' button changes to 'Ticket sales closed'. Leave blank to stop selling the moment the market opens. Set a later time only if you want to keep selling after the doors open (e.g. until the end of the first day of a multi-day market).",
    }),
    defineField({
      name: "applyUrl",
      title: "Stallholder Application URL",
      type: "url",
      description:
        "Google Form URL for Stallholder applications. When set, this event's 'Apply as Stallholder' buttons link here directly. Stallholders can apply for any upcoming market.",
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
      additionalDays: "additionalDays",
    },
    prepare({ title, date, location, additionalDays }) {
      const formattedDate = date
        ? new Date(date as string).toLocaleDateString("en-AU", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Australia/Melbourne",
          })
        : "No date set";
      const extraDays = Array.isArray(additionalDays) ? additionalDays.length : 0;
      return {
        title: title ?? "Untitled event",
        subtitle: `${formattedDate}${extraDays ? ` +${extraDays} more day${extraDays > 1 ? "s" : ""}` : ""}${location ? ` — ${location}` : ""}`,
      };
    },
  },
});
