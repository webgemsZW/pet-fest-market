import React from "react";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { getCurrentEvent } from "@/lib/sanity/get-site-settings";

// Currently not rendered on the home page — the countdown was folded
// into HeroSection. Kept in the codebase in case we want a dedicated
// dark-banner countdown again later. Reads the event date from
// `siteSettings.currentEvent` so it always reflects the active event.
//
// Fallback values so the section renders cleanly even if Sanity is
// unreachable.
const FALLBACK_EVENT_DATE_ISO = "2026-07-26T09:00:00+10:00";
const FALLBACK_DATE_LABEL = "Sunday 26 July 2026";
const FALLBACK_LOCATION = "Box Hill Town Hall, Victoria";

function formatDateLabel(iso: string | null | undefined): string {
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

export async function CountdownSection() {
  const event = await getCurrentEvent();
  const eventDateIso = event?.eventDate ?? FALLBACK_EVENT_DATE_ISO;
  const dateLabel = formatDateLabel(event?.eventDate);
  const location = event?.location?.trim() || FALLBACK_LOCATION;
  const ticketUrl = event?.ticketUrl?.trim() || null;

  return (
    <section className="bg-gradient-to-r from-brand-600 to-brand-800 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-200">
          Mark your calendar
        </p>
        <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
          {dateLabel} — The countdown is on!
        </h2>
        <CountdownTimer eventDate={eventDateIso} />
        <p className="mt-8 text-brand-200">
          📍 {location} &nbsp;·&nbsp; 🎟️ {ticketUrl ? "Tickets on sale now" : "Tickets coming soon"}
        </p>
      </div>
    </section>
  );
}
