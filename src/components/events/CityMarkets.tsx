import React from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/EventCard";
import { MailingListForm } from "@/components/sections/MailingListForm";
import { getCityEventsView } from "@/lib/sanity/get-events";
import type { City } from "@/lib/cities";

/**
 * The /events/<city> landing page body: the markets in one city, split into
 * upcoming (hero cards, soonest first) and previous. Rendered dynamically
 * (getCityEventsView reads "now"), so callers wrap it in <Suspense>.
 */
export async function CityMarkets({ city }: { city: City }) {
  const { upcoming, past } = await getCityEventsView(city);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-6 text-left">
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All markets
            </Link>
          </div>
          <div className="mb-4 text-5xl">📍</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            PetFest Markets in {city}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Community markets for pet lovers in and around {city}.
          </p>
        </div>
      </section>

      <SectionWrapper>
        {upcoming.length > 0 ? (
          <>
            {/* Upcoming markets in this city */}
            <div>
              <SectionHeading title="Upcoming Markets" />
              <div className="space-y-8">
                {upcoming.map((event) => (
                  <EventCard key={event._id} event={event} variant="featured" />
                ))}
              </div>
            </div>

            {/* Stallholder CTA — only when there are markets to apply for. */}
            <div className="mt-16 text-center">
              <p className="mb-4 text-gray-600">Want a stall at one of our markets?</p>
              <Button asChild size="lg">
                <Link href="/stall-holders">Apply as a Stallholder</Link>
              </Button>
            </div>
          </>
        ) : (
          /* No upcoming markets → urge the visitor to subscribe for updates
             (no Stallholder CTA, since there's nothing to apply for yet). */
          <div className="mx-auto max-w-xl rounded-2xl bg-brand-50 p-8 text-center ring-1 ring-brand-100 sm:p-12">
            <div className="mb-4 text-4xl">🐾</div>
            <h2 className="text-2xl font-bold text-gray-900">
              No markets scheduled in {city} yet
            </h2>
            <p className="mt-3 text-gray-600">
              Be the first to know when our next {city} market is announced — pop your details in
              below and we&apos;ll keep you posted.
            </p>
            <div className="mt-6 text-left">
              <MailingListForm />
            </div>
          </div>
        )}

        {/* Previous markets in this city */}
        {past.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-500">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
              Previous {city} markets
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event._id} event={event} variant="compact" muted />
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>
    </>
  );
}

export function CityMarketsSkeleton() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto h-12 w-2/3 animate-pulse rounded bg-white/60" />
        </div>
      </section>
      <SectionWrapper>
        <div className="space-y-8">
          {[0, 1].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-gray-100" />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
