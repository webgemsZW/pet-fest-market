import { getCurrentEvent } from "@/lib/sanity/get-site-settings";

/**
 * Event structured data (JSON-LD) for the home page.
 *
 * Renders an invisible <script type="application/ld+json"> tag that
 * Google reads to power its event-style rich results — the search
 * snippet with date, venue, and (when tickets are on sale) a Buy
 * Tickets link directly in Google's UI.
 *
 * The data is pulled from `siteSettings.currentEvent` so flipping the
 * pointer to a future event (Disterrly Rd, Morris Moore) automatically
 * updates what Google sees too. No content is rendered visibly.
 *
 * Schema reference: https://schema.org/Event
 * Google's event SEO guidelines: https://developers.google.com/search/docs/appearance/structured-data/event
 *
 * Notes on omissions:
 *   - `endDate` — omitted. We'd need to combine the eventDate's date
 *     portion with the free-form `eventEndTime` string ("3pm") which
 *     is parse-fragile. Google accepts events with just startDate.
 *   - `offers` — only emitted when both `ticketUrl` and `ticketPrice`
 *     are populated in the event document. Google requires url + price
 *     + currency + validFrom on an Offer; partial data would just be
 *     ignored. Adding the ticket URL alone isn't enough.
 *   - `image` — uses the site OG image rather than the per-event hero
 *     image, since OG image is more likely to be a clean square crop.
 *     Can be swapped to event-specific imagery later if needed.
 */
export async function EventStructuredData() {
  const event = await getCurrentEvent();
  if (!event) return null;

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://petfest.com.au").replace(/\/$/, "");

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.eventName,
    description: `${event.eventName} — an indoor community market for pet lovers at ${event.location}. Celebrating local Stallholders, pet businesses, and family fun.`,
    startDate: event.eventDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
    },
    image: [`${siteUrl}/images/og-default.png`],
    organizer: {
      "@type": "Organization",
      name: "Nonconformity Productions",
      url: siteUrl,
    },
  };

  // Add Offer block only when we have enough info for Google to honour it.
  // Per Google: an Offer requires url, price, priceCurrency, and validFrom.
  if (event.ticketUrl && typeof event.ticketPrice === "number") {
    // validFrom: six months before the event start — deterministic from
    // the event date so this never depends on the current time (which
    // would break Cache Components mode).
    const eventStart = new Date(event.eventDate);
    const validFrom = new Date(eventStart);
    validFrom.setMonth(validFrom.getMonth() - 6);

    jsonLd.offers = {
      "@type": "Offer",
      url: event.ticketUrl,
      price: String(event.ticketPrice),
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
      validFrom: validFrom.toISOString(),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
