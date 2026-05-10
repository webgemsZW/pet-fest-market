import React from "react";
import Link from "next/link";
import { MapPin, CalendarDays, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-50 via-teal-100 to-sage-100 pt-20">
      {/* Background decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-40 h-[400px] w-[400px] rounded-full bg-sage-200/40 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700">
          <span>🐾</span>
          <span>Victoria&apos;s favourite pet community market</span>
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Pet Fest{" "}
          <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
            Market
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-xl text-gray-600">
          A joyful, pet-friendly community market celebrating local vendors, furry friends, and
          family fun. Come along and wag your tail!
        </p>

        {/* Event details */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <CalendarDays className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span>4 July 2026</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <MapPin className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span>Box Hill, Victoria</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <Ticket className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span>Entry from $5</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/stall-holders#apply">Apply as Vendor</Link>
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
