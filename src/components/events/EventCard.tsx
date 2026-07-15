import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import { formatEventDate, formatEventDateShort } from "@/lib/format-event-date";
import { DEFAULT_EVENT_TIMES } from "@/lib/site-defaults";
import type { EventDoc } from "@/lib/sanity/get-events";

const FALLBACK_IMAGE = "/images/og-default.png";

function eventImageUrl(event: EventDoc): string {
  if (event.image?.asset?._ref) {
    return urlFor(event.image as Parameters<typeof urlFor>[0])
      .width(800)
      .height(500)
      .fit("crop")
      .url();
  }
  return FALLBACK_IMAGE;
}

/**
 * A single event on the /events listing. `variant="featured"` renders the
 * prominent hero-style card (wide, full detail); `variant="compact"` is
 * the smaller card used in the upcoming grid and the past-events list.
 */
export function EventCard({
  event,
  variant = "compact",
  muted = false,
}: {
  event: EventDoc;
  variant?: "featured" | "compact";
  muted?: boolean;
}) {
  const href = event.slug ? `/events/${event.slug}` : "/events";
  const dateLabel =
    (variant === "featured" ? formatEventDate(event.eventDate) : formatEventDateShort(event.eventDate)) ??
    "Date to be confirmed";
  const doorsOpen = event.doorsOpenTime?.trim() || DEFAULT_EVENT_TIMES.doorsOpen;
  const endTime = event.eventEndTime?.trim() || DEFAULT_EVENT_TIMES.end;
  const imageUrl = eventImageUrl(event);
  const imageAlt = event.image?.alt || event.eventName;

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className="group grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md md:grid-cols-2"
      >
        <div className="relative aspect-[16/10] md:aspect-auto">
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
          <span className="inline-flex w-fit items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Next market
          </span>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{event.eventName}</h2>
          {event.blurb && <p className="text-gray-600">{event.blurb}</p>}
          <dl className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span>{dateLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span>
                {doorsOpen} – {endTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
          </dl>
          <span className="mt-2 inline-flex items-center gap-1 font-medium text-brand-600 group-hover:text-brand-700">
            View details &amp; apply
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md ${
        muted ? "opacity-70 hover:opacity-100" : ""
      }`}
    >
      <div className="relative aspect-[16/10]">
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(min-width: 640px) 33vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-gray-900">{event.eventName}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarDays className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span>{dateLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span>{event.location}</span>
        </div>
        {event.blurb && <p className="mt-1 line-clamp-2 text-sm text-gray-500">{event.blurb}</p>}
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-brand-600 group-hover:text-brand-700">
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
