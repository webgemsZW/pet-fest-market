import { type EventDoc } from "@/lib/sanity/get-events";
import { SITE_URL } from "@/lib/site-url";
import { resolveEventEndMs } from "@/lib/format-event-date";

/**
 * Event structured data (JSON-LD).
 *
 * Renders an invisible <script type="application/ld+json"> tag that
 * Google reads to power its event-style rich results — the search
 * snippet with date, venue, and (when tickets are on sale) a Buy
 * Tickets link directly in Google's UI.
 *
 * Describes the given `event` — used on the /events/<slug> detail page.
 * No content is rendered visibly.
 *
 * Schema reference: https://schema.org/Event
 * Google's event SEO guidelines: https://developers.google.com/search/docs/appearance/structured-data/event
 *
 * Notes on omissions:
 *   - `endDate` — only emitted for multi-day events (those with
 *     `additionalDays`), where it's the last day's closing instant and
 *     Google expects it. Single-day events omit it: it would mean parsing
 *     the free-form `eventEndTime` string ("3pm"), and Google accepts
 *     events with just startDate.
 *   - `offers` — only emitted when both `ticketUrl` and `ticketPrice`
 *     are populated in the event document. Google requires url + price
 *     + currency + validFrom on an Offer; partial data would just be
 *     ignored. Adding the ticket URL alone isn't enough.
 *   - `image` — uses the site OG image rather than the per-event hero
 *     image, since OG image is more likely to be a clean square crop.
 *     Can be swapped to event-specific imagery later if needed.
 */
export function EventStructuredData({
  event,
  ticketsClosed = false,
}: {
  event: EventDoc;
  /** True once tickets can no longer be bought (sales closed or event finished) — suppresses the (now invalid) ticket Offer. */
  ticketsClosed?: boolean;
}) {

  const siteUrl = SITE_URL;

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

  if (event.additionalDays?.length) {
    const endMs = resolveEventEndMs(
      event.eventDate,
      event.eventEndTime,
      event.timezone,
      event.additionalDays,
    );
    if (endMs != null) jsonLd.endDate = new Date(endMs).toISOString();
  }

  // Add Offer block only when we have enough info for Google to honour it.
  // Per Google: an Offer requires url, price, priceCurrency, and validFrom.
  // Skipped once tickets can't be bought (sales closed or event finished), so
  // "InStock" would be false. (schema.org has no "EventCompleted" status, so a
  // past event keeps EventScheduled with its past startDate, which Google
  // treats as past.)
  if (!ticketsClosed && event.ticketUrl && typeof event.ticketPrice === "number") {
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
