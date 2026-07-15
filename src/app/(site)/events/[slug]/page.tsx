import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Ticket, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { EventStructuredData } from "@/components/seo/EventStructuredData";
import { getEventBySlug, isApplyOpen } from "@/lib/sanity/get-events";
import { formatEventDate } from "@/lib/format-event-date";
import { urlFor } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo";
import { DEFAULT_APPLY_URL, DEFAULT_EVENT_TIMES } from "@/lib/site-defaults";

type Params = { slug: string };

// No generateStaticParams: event detail pages render dynamically at
// request time (they read the current time to decide whether Stallholder
// applications are still open), and Cache Components requires
// generateStaticParams to be non-empty — which this repo can't guarantee,
// since it must build with zero Sanity events.
//
// Consequence: because `params` is request-time (uncached) data under
// Cache Components, the whole page lives inside a Suspense boundary, so an
// unknown slug is a streamed "soft 404" (200 status + the not-found UI)
// rather than a hard 404. That's fine for real (linked) event URLs. To
// upgrade to a hard 404 later, add generateStaticParams returning the
// published event slugs — safe once the production dataset always has
// at least one event at build time.

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
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

export default function EventDetailPage({ params }: { params: Promise<Params> }) {
  // `params` is request-time data under Cache Components, so the content
  // (which reads it) must sit inside a Suspense boundary.
  return (
    <Suspense fallback={<EventDetailSkeleton />}>
      <EventDetail params={params} />
    </Suspense>
  );
}

function EventDetailSkeleton() {
  return (
    <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="h-6 w-32 animate-pulse rounded bg-white/60" />
        <div className="mt-6 h-12 w-2/3 animate-pulse rounded bg-white/60" />
        <div className="mt-8 flex gap-4">
          <div className="h-9 w-40 animate-pulse rounded-full bg-white/60" />
          <div className="h-9 w-32 animate-pulse rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}

async function EventDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const dateLabel = formatEventDate(event.eventDate) ?? "Date to be confirmed";
  const doorsOpen = event.doorsOpenTime?.trim() || DEFAULT_EVENT_TIMES.doorsOpen;
  const endTime = event.eventEndTime?.trim() || DEFAULT_EVENT_TIMES.end;
  const ticketUrl = event.ticketUrl?.trim() || null;
  const applyUrl = event.applyUrl?.trim() || DEFAULT_APPLY_URL;
  // EventDetail already renders at request time (it awaits `params`), so
  // this deadline check reflects "now" without needing connection().
  const applyOpen = isApplyOpen(event);

  const imageUrl = event.image?.asset?._ref
    ? urlFor(event.image as Parameters<typeof urlFor>[0])
        .width(1600)
        .height(700)
        .fit("crop")
        .url()
    : null;

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
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
              <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Countdown (centers itself — now consistent with the hero) */}
          <div className="mt-10">
            <CountdownTimer variant="light" eventDate={event.eventDate} />
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            {ticketUrl ? (
              <Button asChild size="lg">
                <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                  <Ticket className="mr-2 h-4 w-4" aria-hidden="true" />
                  Buy Tickets
                </a>
              </Button>
            ) : (
              <Button size="lg" disabled>
                <Ticket className="mr-2 h-4 w-4" aria-hidden="true" />
                Tickets coming soon
              </Button>
            )}

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
      {imageUrl && (
        <SectionWrapper>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-sm ring-1 ring-gray-100">
            <div className="relative aspect-[16/7]">
              <Image
                src={imageUrl}
                alt={event.image?.alt || event.eventName}
                fill
                className="object-cover"
                sizes="(min-width: 896px) 896px, 100vw"
              />
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
