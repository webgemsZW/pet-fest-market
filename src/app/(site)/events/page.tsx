import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getEventsView } from "@/lib/sanity/get-events";
import { EventCard } from "@/components/events/EventCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Markets",
  description:
    "Upcoming PetFest Market events — dates, venues, and how to apply as a Stallholder. A community market for pet lovers.",
};

/*
  /events lists every market. The prominent "featured" event is resolved
  self-healingly at request time (see get-events.ts → getEventsView): it
  honours the Studio "Featured Event" override while that event is still
  upcoming, otherwise it auto-advances to the soonest future market. Past
  markets appear in a muted "Previous markets" strip once any exist.
*/
export default function EventsPage() {
  return (
    <>
      {/* Hero (static) */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">📅</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">PetFest Markets</h1>
          <p className="mt-4 text-xl text-gray-600">
            Community markets for pet lovers — see what&apos;s coming up and where.
          </p>
        </div>
      </section>

      <SectionWrapper>
        {/* The market list is resolved at request time (self-healing), so
            it streams in behind a skeleton per Cache Components. */}
        <Suspense fallback={<EventsListSkeleton />}>
          <EventsList />
        </Suspense>

        {/* Stallholder CTA (static) */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-gray-600">Want a stall at one of our markets?</p>
          <Button asChild size="lg">
            <Link href="/stall-holders">Apply as a Stallholder</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}

async function EventsList() {
  const { featured, upcoming, past } = await getEventsView();
  const hasAnything = Boolean(featured) || upcoming.length > 0 || past.length > 0;

  if (!hasAnything) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-brand-50 p-12 text-center ring-1 ring-brand-100">
        <div className="mb-4 text-4xl">🐾</div>
        <h2 className="text-2xl font-bold text-gray-900">New markets coming soon</h2>
        <p className="mt-3 text-gray-600">
          We&apos;re busy planning our next market. Join the mailing list from the home page to be
          the first to know.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Featured / next market */}
      {featured && (
        <div>
          <EventCard event={featured} variant="featured" />
        </div>
      )}

      {/* Other upcoming markets */}
      {upcoming.length > 0 && (
        <div>
          <SectionHeading title="More upcoming markets" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event._id} event={event} variant="compact" />
            ))}
          </div>
        </div>
      )}

      {/* Past markets */}
      {past.length > 0 && (
        <div>
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-500">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
            Previous markets
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event._id} event={event} variant="compact" muted />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EventsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-64 animate-pulse rounded-3xl bg-gray-100" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
