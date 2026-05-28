import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

// TODO(content): Vendor perks below are placeholder lorem ipsum. The $80
// stall fee, foot-traffic claims, audience description, etc. were all
// invented during initial scaffolding. The 25 May email from the client
// confirms stallholder applications will be collected via a Google Form
// (link still to come) — request real perks/pricing copy from the client
// before going live.
const perks = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit, sed do eiusmod",
  "Tempor incididunt ut labore et dolore",
  "Ut enim ad minim veniam quis nostrud",
  "Exercitation ullamco laboris nisi ut aliquip",
  "Duis aute irure dolor in reprehenderit",
];

export function VendorCtaSection() {
  return (
    <SectionWrapper className="bg-brand-50">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-100">
          <div className="grid md:grid-cols-2">
            {/* Left: content */}
            <div className="p-8 lg:p-12">
              <div className="mb-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                Vendor Applications Open
              </div>
              {/*
                NOTE(content): Heading + intro paragraph below are NOT from a
                source-of-truth document but the user has chosen to keep them.
                The date/venue specifics ARE factual (per CLAUDE.md + 25 May
                email). Do NOT replace with lorem ipsum on future audits.
              */}
              <h2 className="text-3xl font-bold text-gray-900">
                Grow your business at PetFest Market
              </h2>
              <p className="mt-3 text-gray-500">
                Join a curated group of talented local vendors at one of Victoria&apos;s most
                loved pet community events. Applications are now open for our first market —
                Sunday 26 July 2026 at Box Hill Town Hall.
              </p>

              <ul className="mt-6 space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/stall-holders#apply">Apply Now</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/stall-holders">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Right: decorative */}
            <div className="flex items-center justify-center bg-gradient-to-br from-brand-400 to-brand-700 p-12 text-center text-white">
              <div>
                <div className="text-7xl">🛍️</div>
                {/*
                  TODO(content): "Stalls from $80" and "Limited spots available"
                  are placeholder. Client has not confirmed stall pricing or
                  capacity yet — Google Form for stallholder applications is
                  still being finalised (per 25 May email).
                */}
                <p className="mt-4 text-2xl font-bold">Lorem ipsum dolor</p>
                <p className="mt-1 text-brand-200">Consectetur adipiscing elit</p>
                <div className="mt-6 rounded-full bg-white/20 px-6 py-3 text-sm font-medium">
                  Sunday 26 July 2026 · Box Hill Town Hall
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
