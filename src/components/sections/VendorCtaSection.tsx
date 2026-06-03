import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getCurrentEvent } from "@/lib/sanity/get-site-settings";
import { DEFAULT_APPLY_URL } from "@/lib/site-defaults";

/* ──────────────────────────────────────────────────────────────────
   ⚠️ NOT CURRENTLY RENDERED ON THE LIVE SITE.

   The "Grow your business at PetFest Market" CTA was removed from the
   homepage per the 2 June 2026 client revision (the market is
   deliberately simple at launch). This component is retained in the
   codebase so it can be re-introduced when the market scales — the
   matching Homepage schema fields will need to be re-added at that
   point. For now the component runs entirely on hardcoded fallback
   content and a fetch of the current event for date/venue specifics.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_BADGE = "Stallholder Applications Open";
const FALLBACK_HEADLINE = "Grow your business at PetFest Market";
const FALLBACK_BODY =
  "Join a curated group of talented local Stallholders at one of Victoria's most loved pet community events. Applications are now open for our first market —";

const FALLBACK_PERKS: string[] = [
  "High foot-traffic indoor venue",
  "Targeted pet-lover audience",
  "Friendly, supportive event team",
  "Curated stall mix to maximise variety",
  "Marketing across socials + mailing list",
  "Simple Google Form application",
];

const FALLBACK_PRICING_HEADLINE = "Stalls coming soon";
const FALLBACK_PRICING_SUBLINE = "Pricing to be confirmed";

const FALLBACK_DATE_LABEL = "Sunday 26 July 2026";
const FALLBACK_LOCATION = "Box Hill Town Hall";

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

export async function VendorCtaSection() {
  const event = await getCurrentEvent();
  const dateLabel = formatDateLabel(event?.eventDate);
  const location = event?.location?.trim() || FALLBACK_LOCATION;
  const applyUrl = event?.applyUrl?.trim() || DEFAULT_APPLY_URL;

  const badge = FALLBACK_BADGE;
  const headline = FALLBACK_HEADLINE;
  const body = FALLBACK_BODY;
  const perks = FALLBACK_PERKS;
  const pricingHeadline = FALLBACK_PRICING_HEADLINE;
  const pricingSubline = FALLBACK_PRICING_SUBLINE;

  return (
    <SectionWrapper className="bg-brand-50">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-100">
          <div className="grid md:grid-cols-2">
            {/* Left: content */}
            <div className="p-8 lg:p-12">
              <div className="mb-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                {badge}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{headline}</h2>
              <p className="mt-3 text-gray-500">
                {body} {dateLabel} at {location}.
              </p>

              <ul className="mt-6 space-y-3">
                {perks.map((perk, i) => (
                  <li
                    key={`${perk}-${i}`}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
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
                  <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </a>
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
                <p className="mt-4 text-2xl font-bold font-brume">{pricingHeadline}</p>
                <p className="mt-1 text-brand-200">{pricingSubline}</p>
                <div className="mt-6 rounded-full bg-white/20 px-6 py-3 text-sm font-medium">
                  {dateLabel} · {location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
