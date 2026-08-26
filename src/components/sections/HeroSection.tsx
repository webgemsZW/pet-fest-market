import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Ticket, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHomepage } from "@/lib/sanity/get-homepage";
import { getCitiesWithEvents } from "@/lib/sanity/get-events";
import { citySlug } from "@/lib/cities";

// Fallbacks for the homepage marketing copy (used when the Homepage document
// isn't populated). NOTE(content): the user has chosen to keep the eyebrow
// and subheading fallbacks even though they're not from a source-of-truth
// document — do not replace with lorem ipsum on audits.
const FALLBACK_EYEBROW = "Victoria's favourite pet community market";
const FALLBACK_SUBHEADING =
  "An indoor community market for pet lovers — celebrating local Stallholders, pet businesses, and family fun.";
const FALLBACK_CITIES_HEADING = "Find a market near you";

export async function HeroSection() {
  const [homepage, cities] = await Promise.all([getHomepage(), getCitiesWithEvents()]);
  const eyebrow = homepage?.heroEyebrow?.trim() || FALLBACK_EYEBROW;
  const subheading = homepage?.heroSubheading?.trim() || FALLBACK_SUBHEADING;
  const citiesHeading = homepage?.citiesHeading?.trim() || FALLBACK_CITIES_HEADING;
  const ticketLabel = homepage?.heroTicketLabel?.trim() || "Buy Tickets";
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

        <p className="mt-6 max-w-2xl text-balance text-xl text-gray-600">{subheading}</p>

        {/* City directory — pick a city to see its markets. */}
        <div className="mt-12 w-full">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-700">
            {citiesHeading}
          </h2>
          {cities.length > 0 ? (
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/events/${citySlug(city)}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-brand-800 shadow-sm ring-1 ring-brand-100 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white hover:shadow-md"
                >
                  <MapPin
                    className="h-5 w-5 text-brand-600 group-hover:text-white"
                    aria-hidden="true"
                  />
                  {city}
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">
              New markets are coming soon — join the mailing list below to be the first to know.
            </p>
          )}
        </div>

        {/* CTAs — Buy Tickets and Apply lead to the events page (pick a
            market there); Get Updates jumps to the mailing-list section. */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button asChild size="lg">
            <Link href="/events">
              <Ticket className="mr-2 h-4 w-4" aria-hidden="true" />
              {ticketLabel}
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/events">{applyLabel}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#mailing-list">{updatesLabel}</Link>
          </Button>
        </div>
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
