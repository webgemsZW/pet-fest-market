import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, Clock, Ticket, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { getFeaturedEvent, type EventDoc } from "@/lib/sanity/get-events";
import { getHomepage, type Homepage } from "@/lib/sanity/get-homepage";
import { formatEventDate, formatTimeZoneAbbrev, resolveEventEndMs } from "@/lib/format-event-date";
import { DEFAULT_APPLY_URL, DEFAULT_EVENT_TIMES } from "@/lib/site-defaults";

// Fallbacks for the homepage marketing copy (used when the Homepage document
// isn't populated). NOTE(content): the user has chosen to keep the eyebrow
// and subheading fallbacks even though they're not from a source-of-truth
// document — do not replace with lorem ipsum on audits.
const FALLBACK_EYEBROW = "Victoria's favourite pet community market";
const FALLBACK_SUBHEADING =
  "An indoor community market for pet lovers — celebrating local Stallholders, pet businesses, and family fun.";

/**
 * Static placeholder shown while the (dynamic, self-healing) hero streams
 * in. Mirrors the hero's frame — same gradient and logo — so the shell
 * paints instantly and the event-specific pills fill in without a jarring
 * layout shift. Rendered as the <Suspense> fallback on the home page.
 */
export function HeroFallback() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-brand-100 to-brand-100 pt-20">
      <Image
        src="/images/logo.png"
        alt="PetFest Market"
        width={2346}
        height={942}
        className="h-36 w-auto animate-pulse sm:h-44"
        priority
      />
    </section>
  );
}

export async function HeroSection() {
  // The featured event is self-healing: it honours the Studio override while
  // that event is upcoming, otherwise auto-advances to the soonest future
  // market — and is null when no upcoming event is published.
  const [event, homepage] = await Promise.all([getFeaturedEvent(), getHomepage()]);
  const eyebrow = homepage?.heroEyebrow?.trim() || FALLBACK_EYEBROW;
  const applyUrl = event?.applyUrl?.trim() || DEFAULT_APPLY_URL;
  const applyLabel = homepage?.heroApplyLabel?.trim() || "Apply as Stallholder";
  const updatesLabel = homepage?.heroUpdatesLabel?.trim() || "Get Event Updates";

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-50 via-brand-100 to-brand-100 pt-20">
      {/* Background decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-40 h-[400px] w-[400px] rounded-full bg-brand-200/40 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        {/* Eyebrow — editable via Studio (Homepage → Hero Eyebrow). */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-700">
          <span>🐾</span>
          <span>{eyebrow}</span>
        </div>

        <h1>
          <Image
            src="/images/logo.png"
            alt="PetFest Market"
            width={2346}
            height={942}
            className="h-36 w-auto sm:h-44"
            priority
          />
        </h1>

        {event ? (
          <FeaturedEventHero
            event={event}
            homepage={homepage}
            applyUrl={applyUrl}
            applyLabel={applyLabel}
            updatesLabel={updatesLabel}
          />
        ) : (
          <NoEventHero homepage={homepage} applyUrl={applyUrl} applyLabel={applyLabel} updatesLabel={updatesLabel} />
        )}
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full fill-stone-50">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

/** Hero content when there is a featured (always upcoming) market. */
function FeaturedEventHero({
  event,
  homepage,
  applyUrl,
  applyLabel,
  updatesLabel,
}: {
  event: EventDoc;
  homepage: Homepage | null;
  applyUrl: string;
  applyLabel: string;
  updatesLabel: string;
}) {
  const dateLabel = formatEventDate(event.eventDate, event.timezone) ?? "Date to be confirmed";
  const location = event.location?.trim() || "";
  const ticketUrl = event.ticketUrl?.trim() || null;
  // Subheading comes from the featured event's Short Description (blurb),
  // falling back to Homepage → Hero Subtitle, then the default.
  const subheading = event.blurb?.trim() || homepage?.heroSubheading?.trim() || FALLBACK_SUBHEADING;
  const doorsOpen = event.doorsOpenTime?.trim() || DEFAULT_EVENT_TIMES.doorsOpen;
  const endTime = event.eventEndTime?.trim() || DEFAULT_EVENT_TIMES.end;
  const tzAbbr = formatTimeZoneAbbrev(event.eventDate, event.timezone);
  const timeLabel = `${doorsOpen} – ${endTime}${tzAbbr ? ` ${tzAbbr}` : ""}`;
  const ticketLabel = homepage?.heroTicketLabel?.trim() || "Buy Tickets";
  const ticketComingSoonLabel = homepage?.heroTicketComingSoonLabel?.trim() || "Tickets coming soon";

  return (
    <>
      <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">{event.eventName}</h2>

      <p className="mt-6 max-w-2xl text-balance text-xl text-gray-600">{subheading}</p>

      {/* Event details — date, time, venue. */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
          <CalendarDays className="h-4 w-4 text-brand-600" aria-hidden="true" />
          <span>{dateLabel}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
          <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
          <span>{timeLabel}</span>
        </div>
        {location && (
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
            <span>{location}</span>
          </div>
        )}
      </div>

      {/* Countdown */}
      <div className="mt-10">
        <CountdownTimer
          variant="light"
          eventDate={event.eventDate}
          endsAt={resolveEventEndMs(event.eventDate, event.eventEndTime, event.timezone) ?? undefined}
        />
      </div>

      {/* CTAs — Buy Tickets prominent; Apply + Get Updates alongside. */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {ticketUrl ? (
          <Button asChild size="lg">
            <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
              <Ticket className="mr-2 h-4 w-4" aria-hidden="true" />
              {ticketLabel}
            </a>
          </Button>
        ) : (
          <Button size="lg" disabled>
            <Ticket className="mr-2 h-4 w-4" aria-hidden="true" />
            {ticketComingSoonLabel}
          </Button>
        )}
        <Button asChild size="lg" variant="secondary">
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            {applyLabel}
          </a>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="#mailing-list">{updatesLabel}</Link>
        </Button>
      </div>
    </>
  );
}

/**
 * Hero content when no upcoming market is published yet. Deliberately shows
 * NO date, countdown, or tickets — so a finished/absent event never surfaces
 * as a stale "the event has started" placeholder.
 */
function NoEventHero({
  homepage,
  applyUrl,
  applyLabel,
  updatesLabel,
}: {
  homepage: Homepage | null;
  applyUrl: string;
  applyLabel: string;
  updatesLabel: string;
}) {
  const subheading = homepage?.heroSubheading?.trim() || FALLBACK_SUBHEADING;

  return (
    <>
      <p className="mt-6 max-w-2xl text-balance text-xl text-gray-600">{subheading}</p>

      <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-base font-medium text-gray-700 shadow-sm">
        <CalendarClock className="h-5 w-5 text-brand-600" aria-hidden="true" />
        <span>Our next market will be announced soon</span>
      </div>

      <p className="mt-4 max-w-xl text-gray-600">
        Join the mailing list and you&apos;ll be the first to know when the next date drops.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="#mailing-list">{updatesLabel}</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            {applyLabel}
          </a>
        </Button>
      </div>
    </>
  );
}
