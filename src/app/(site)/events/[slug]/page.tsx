import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Ticket, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { EventStructuredData } from "@/components/seo/EventStructuredData";
import { EventImage } from "@/components/events/EventImage";
import { CityMarkets, CityMarketsSkeleton } from "@/components/events/CityMarkets";
import { getEventBySlug, isApplyOpen } from "@/lib/sanity/get-events";
import { formatEventDate, formatTimeZoneAbbrev, eventPhase, resolveEventEndMs } from "@/lib/format-event-date";
import { pageMetadata } from "@/lib/seo";
import { cityFromSlug } from "@/lib/cities";
import { DEFAULT_APPLY_URL, DEFAULT_EVENT_TIMES } from "@/lib/site-defaults";

type Params = { slug: string };

// This single dynamic segment serves TWO kinds of URL:
//   /events/<city>  (e.g. /events/melbourne)  → the city's markets listing
//   /events/<slug>  (e.g. /events/box-hill-…) → an individual event page
// We branch on whether the slug matches a known city. (One segment because
// Next can't have two dynamic children at the same path level.)
//
// No generateStaticParams: both render dynamically (they read the current
// time), and Cache Components requires generateStaticParams to be non-empty,
// which this repo can't guarantee (it must build with zero Sanity events).
// `params` is request-time data, so content lives inside a Suspense
// boundary; an unknown event slug is therefore a streamed "soft 404".

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const city = cityFromSlug(slug);
  if (city) {
    return pageMetadata({
      fallbackTitle: `PetFest Markets in ${city}`,
      fallbackDescription: `Upcoming and past PetFest Markets in and around ${city} — a community market for pet lovers.`,
    });
  }

  const event = await getEventBySlug(slug);
  if (!event) return { title: "Market" };

  const dateLabel = formatEventDate(event.eventDate);
  return pageMetadata({
    fallbackTitle: event.eventName,
    fallbackDescription:
      event.blurb?.trim() ||
      `PetFest Market${dateLabel ? ` — ${dateLabel}` : ""} at ${event.location}. A community market for pet lovers.`,
  });
}

export default function EventsSlugPage({ params }: { params: Promise<Params> }) {
  // `params` is request-time data under Cache Components, so reading it (to
  // branch city-vs-event) must happen inside the Suspense boundary.
  return (
    <Suspense fallback={<CityMarketsSkeleton />}>
      <SlugRouter params={params} />
    </Suspense>
  );
}

async function SlugRouter({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const city = cityFromSlug(slug);
  return city ? <CityMarkets city={city} /> : <EventDetail slug={slug} />;
}

async function EventDetail({ slug }: { slug: string }) {
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const dateLabel = formatEventDate(event.eventDate, event.timezone) ?? "Date to be confirmed";
  const doorsOpen = event.doorsOpenTime?.trim() || DEFAULT_EVENT_TIMES.doorsOpen;
  const endTime = event.eventEndTime?.trim() || DEFAULT_EVENT_TIMES.end;
  const tzAbbr = formatTimeZoneAbbrev(event.eventDate, event.timezone);
  const ticketUrl = event.ticketUrl?.trim() || null;
  const applyUrl = event.applyUrl?.trim() || DEFAULT_APPLY_URL;
  // EventDetail already renders at request time (it awaits `params`), so
  // these time-based checks reflect "now" without needing connection().
  const applyOpen = isApplyOpen(event);
  const endsAt = resolveEventEndMs(event.eventDate, event.eventEndTime, event.timezone);
  const phase = eventPhase(event.eventDate, Date.now(), endsAt);
  // Only offer tickets while they make sense: a real link right up until the
  // event has finished, and "coming soon" only before it starts. A started
  // or finished event never shows "Tickets coming soon".
  const showBuyTickets = Boolean(ticketUrl) && phase !== "finished";
  const showTicketsComingSoon = !ticketUrl && phase === "upcoming";

  const hasImage = Boolean(event.image?.asset?._ref);

  return (
    <>
      <EventStructuredData event={event} />

      {/* Hero — centered to match the rest of the site's page heroes. */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          {/* Back link stays left-aligned above the centered content. */}
          <div className="mb-6 text-left">
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All markets
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{event.eventName}</h1>
          {event.blurb && (
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">{event.blurb}</p>
          )}

          {/* Detail pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
              <CalendarDays className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span>{dateLabel}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
              <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span>
                {doorsOpen} – {endTime}
                {tzAbbr ? ` ${tzAbbr}` : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
              <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Countdown (centers itself — now consistent with the hero).
              Only shown when the event has the countdown toggled on. */}
          {event.showCountdown && (
            <div className="mt-10">
              <CountdownTimer variant="light" eventDate={event.eventDate} endsAt={endsAt ?? undefined} />
            </div>
          )}

          {/* CTAs. Buy Tickets links to the Humanitix ticket URL; the pop-up
              script turns it into an on-page modal, falling back to opening
              the link if the script can't load. */}
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            {showBuyTickets ? (
              <Button asChild size="lg">
                <a href={ticketUrl!} target="_blank" rel="noopener noreferrer">
                  <Ticket className="mr-2 h-4 w-4" aria-hidden="true" />
                  Buy Tickets
                </a>
              </Button>
            ) : showTicketsComingSoon ? (
              <Button size="lg" disabled>
                <Ticket className="mr-2 h-4 w-4" aria-hidden="true" />
                Tickets coming soon
              </Button>
            ) : null}

            {applyOpen ? (
              <Button asChild size="lg" variant="secondary">
                <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply as Stallholder
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            ) : (
              <Button size="lg" variant="secondary" disabled>
                Stallholder applications closed
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Optional event image */}
      {hasImage && (
        <SectionWrapper>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-sm ring-1 ring-gray-100">
            <EventImage event={event} className="aspect-[16/10]" sizes="(min-width: 896px) 896px, 100vw" />
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
