import type { Metadata } from "next";
import { Suspense } from "react";
import { ExternalLink, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getStallHolderPage } from "@/lib/sanity/get-stall-holder-page";
import { getEventsView, isApplyOpen, type EventDoc } from "@/lib/sanity/get-events";
import { formatEventDate } from "@/lib/format-event-date";
import { pageMetadata } from "@/lib/seo";
import { DEFAULT_APPLY_URL } from "@/lib/site-defaults";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStallHolderPage();
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: "Stallholders",
    fallbackDescription:
      "Apply to be a Stallholder at PetFest Market. Choose an upcoming market and follow the link to its online application form.",
  });
}

/* ──────────────────────────────────────────────────────────────────
   The Stallholder page now lists every UPCOMING market, each with its
   own "Apply" button, so Stallholders can apply for future events — not
   just the next one. Each market uses its own `applyUrl` from Sanity
   (falling back to DEFAULT_APPLY_URL), and its button switches to
   "Applications closed" once the market's `applyDeadline` has passed.

   When no upcoming markets exist, the page falls back to a single Apply
   button pointing at the default form, so it always works.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_HEADING = "Become a Stallholder";

function MarketRow({ event, label }: { event: EventDoc; label: string }) {
  const dateLabel = formatEventDate(event.eventDate) ?? "Date to be confirmed";
  const applyUrl = event.applyUrl?.trim() || DEFAULT_APPLY_URL;
  const open = isApplyOpen(event);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{event.eventName}</h3>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-brand-600" aria-hidden="true" />
            {dateLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
            {event.location}
          </span>
        </div>
      </div>
      {open ? (
        <Button asChild className="shrink-0">
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            {label}
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      ) : (
        <Button className="shrink-0" variant="secondary" disabled>
          Applications closed
        </Button>
      )}
    </div>
  );
}

export default async function StallHoldersPage() {
  const page = await getStallHolderPage();

  const heading = page?.heading?.trim() || FALLBACK_HEADING;
  const intro = page?.intro?.trim() || null;
  const applyLabel = page?.applyButtonLabel?.trim() || "Apply Here";
  const upcomingHeading = page?.upcomingHeading?.trim() || "Apply for an upcoming market";

  return (
    <>
      {/* Hero (static) */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🛍️</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{heading}</h1>
          {intro && <p className="mt-4 text-xl text-gray-600">{intro}</p>}
        </div>
      </section>

      {/* Markets are resolved at request time (self-healing + per-event
          apply-deadline check), so this island streams in. */}
      <SectionWrapper>
        <Suspense fallback={<MarketsSkeleton />}>
          <UpcomingMarkets applyLabel={applyLabel} upcomingHeading={upcomingHeading} />
        </Suspense>
      </SectionWrapper>
    </>
  );
}

async function UpcomingMarkets({
  applyLabel,
  upcomingHeading,
}: {
  applyLabel: string;
  upcomingHeading: string;
}) {
  const { featured, upcoming } = await getEventsView();

  // Every upcoming market (featured first), so Stallholders can apply for
  // future events too. `featured` can be a past event when nothing is
  // upcoming — filter it out here so only genuinely upcoming markets show.
  const now = Date.now();
  const markets = [featured, ...upcoming]
    .filter((e): e is EventDoc => Boolean(e))
    .filter((e) => new Date(e.eventDate).getTime() >= now);

  // No upcoming markets → single default apply button (always works).
  if (markets.length === 0) {
    return (
      <div className="flex justify-center">
        <Button asChild size="lg">
          <a href={DEFAULT_APPLY_URL} target="_blank" rel="noopener noreferrer">
            {applyLabel}
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">{upcomingHeading}</h2>
      <div className="space-y-4">
        {markets.map((event) => (
          <MarketRow key={event._id} event={event} label={applyLabel} />
        ))}
      </div>
    </div>
  );
}

function MarketsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {[0, 1].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
      ))}
    </div>
  );
}
