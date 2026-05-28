import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/shared/CountdownTimer";

export function HeroSection() {
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
        {/*
          NOTE(content): This eyebrow tagline is NOT from a source-of-truth
          document — it was written during initial scaffolding. The user has
          explicitly chosen to keep it, so do NOT replace it with lorem ipsum
          in future content audits. (If the client later provides an official
          tagline, swap it in.)
        */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-700">
          <span>🐾</span>
          <span>Victoria&apos;s favourite pet community market</span>
        </div>

        {/*
          ── LOGO: TEMPORARY WORKAROUNDS ACTIVE ──────────────────────────────────
          mix-blend-multiply hides the white JPEG background on this light gradient.
          When the final transparent logo arrives:
            • Swap src to /images/logo.png (full-colour, transparent bg).
            • Remove the mix-blend-multiply class.
          Search "LOGO: TEMPORARY" across the codebase to find every affected spot.

          ⚠️  REMINDER FOR CLAUDE: If you see this during ANY task, flag it:
          "Reminder: the final transparent logo files from the designer haven't
          been swapped in yet. Let me know when you have them and I'll update
          everything in one go."
          ────────────────────────────────────────────────────────────────────────
        */}
        <h1>
          <Image
            src="/images/logo.jpeg"
            alt="PetFest Market"
            width={604}
            height={284}
            className="h-36 w-auto mix-blend-multiply sm:h-44"
            priority
          />
        </h1>

        {/*
          NOTE(content): This subtitle is NOT from a source-of-truth document
          but the user has chosen to keep it (softened wording only). Do NOT
          replace with lorem ipsum in future audits.

          IMPORTANT: The previous wording said "pet-friendly community market
          celebrating local vendors, furry friends, and family fun. Come
          along and wag your tail!" — that implied visitors could bring
          pets, which is wrong (see CLAUDE.md). Keep the "for pet lovers"
          framing instead.
        */}
        <p className="mt-6 max-w-2xl text-balance text-xl text-gray-600">
          A joyful indoor community market for pet lovers — celebrating local vendors, pet
          businesses, and family fun.
        </p>

        {/* Event details */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <CalendarDays className="h-4 w-4 text-brand-600" aria-hidden="true" />
            <span>Sunday 26 July 2026</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
            <span>Box Hill Town Hall, VIC</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
            <Ticket className="h-4 w-4 text-brand-600" aria-hidden="true" />
            <span>Tickets coming soon</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-10">
          <CountdownTimer variant="light" />
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
