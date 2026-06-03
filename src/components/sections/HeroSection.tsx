import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { getCurrentEvent } from "@/lib/sanity/get-site-settings";
import { getHomepage } from "@/lib/sanity/get-homepage";
import { DEFAULT_APPLY_URL, DEFAULT_EVENT_TIMES } from "@/lib/site-defaults";

// Fallbacks — used when no `event` document is configured as the
// `siteSettings.currentEvent`, or when the homepage doc hasn't been
// populated yet. NOTE(content): the user has chosen to keep the eyebrow
// and subheading fallbacks even though they're not from a source-of-truth
// document — do not replace with lorem ipsum on audits.
const FALLBACK_EVENT_DATE_ISO = "2026-07-26T09:00:00+10:00";
const FALLBACK_DATE_LABEL = "Sunday 26 July 2026";
const FALLBACK_LOCATION = "Box Hill Town Hall, VIC";
const FALLBACK_EYEBROW = "Victoria's favourite pet community market";
const FALLBACK_SUBHEADING =
  "An indoor community market for pet lovers — celebrating local Stallholders, pet businesses, and family fun.";

function formatDatePill(iso: string | null | undefined): string {
  if (!iso) return FALLBACK_DATE_LABEL;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return FALLBACK_DATE_LABEL;
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function HeroSection() {
  const [event, homepage] = await Promise.all([getCurrentEvent(), getHomepage()]);
  const dateLabel = formatDatePill(event?.eventDate);
  const location = event?.location?.trim() || FALLBACK_LOCATION;
  const ticketUrl = event?.ticketUrl?.trim() || null;
  // Apply URL: prefer the per-event URL from Sanity; fall back to the
  // hardcoded default in src/lib/site-defaults.ts so this button
  // always works even before Sanity is populated.
  const applyUrl = event?.applyUrl?.trim() || DEFAULT_APPLY_URL;
  const countdownIso = event?.eventDate ?? FALLBACK_EVENT_DATE_ISO;
  const eyebrow = homepage?.heroEyebrow?.trim() || FALLBACK_EYEBROW;
  const subheading = homepage?.heroSubheading?.trim() || FALLBACK_SUBHEADING;

  // Trading times — Sanity per-event values override the hardcoded
  // defaults (see src/lib/site-defaults.ts).
  const doorsOpen = event?.doorsOpenTime?.trim() || DEFAULT_EVENT_TIMES.doorsOpen;
  const endTime = event?.eventEndTime?.trim() || DEFAULT_EVENT_TIMES.end;
  const timeLabel = `${doorsOpen} – ${endTime}`;

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
        {/* Eyebrow — editable via Studio (Homepage → Hero Eyebrow). Falls
            back to the original tagline if blank. */}
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

        {/* Subheading — editable via Studio (Homepage → Hero Subtitle).
            Must not imply visitors can bring pets to the venue. */}
        <p className="mt-6 max-w-2xl text-balance text-xl text-gray-600">{subheading}</p>

        {/* Event details — date, time, venue, and tickets pills. Date / venue /
            tickets read from siteSettings.currentEvent. Time uses per-event
            Sanity values when set, else the hardcoded 10am – 3pm default. */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <CalendarDays className="h-4 w-4 text-brand-600" aria-hidden="true" />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
            <span>{timeLabel}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
            <span>{location}</span>
          </div>
          {ticketUrl ? (
            <a
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              <Ticket className="h-4 w-4" aria-hidden="true" />
              <span>Buy Tickets</span>
            </a>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
              <Ticket className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span>Tickets coming soon</span>
            </div>
          )}
        </div>

        {/* Countdown */}
        <div className="mt-10">
          <CountdownTimer variant="light" eventDate={countdownIso} />
        </div>

        {/* CTAs — primary opens the Stallholder application form (uses the
            per-event URL from Sanity, or the hardcoded default). */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={applyUrl} target="_blank" rel="noopener noreferrer">
              Apply as Stallholder
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#mailing-list">Get Event Updates</Link>
          </Button>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full fill-stone-50"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
