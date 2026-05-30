import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getCurrentEvent } from "@/lib/sanity/get-site-settings";
import { getHomepage } from "@/lib/sanity/get-homepage";

/* ──────────────────────────────────────────────────────────────────
   Fallback content. NOTE(content): the user chose to keep the marketing
   headline + body framing — leave as-is on audits. The perks list and
   pricing pill are intentionally lorem ipsum because the client hasn't
   confirmed stallholder pricing/benefits yet.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_BADGE = "Vendor Applications Open";
const FALLBACK_HEADLINE = "Grow your business at PetFest Market";
const FALLBACK_BODY =
  "Join a curated group of talented local vendors at one of Victoria's most loved pet community events. Applications are now open for our first market —";

const FALLBACK_PERKS: string[] = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit, sed do eiusmod",
  "Tempor incididunt ut labore et dolore",
  "Ut enim ad minim veniam quis nostrud",
  "Exercitation ullamco laboris nisi ut aliquip",
  "Duis aute irure dolor in reprehenderit",
];

const FALLBACK_PRICING_HEADLINE = "Lorem ipsum dolor";
const FALLBACK_PRICING_SUBLINE = "Consectetur adipiscing elit";

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
  const [event, homepage] = await Promise.all([getCurrentEvent(), getHomepage()]);
  const dateLabel = formatDateLabel(event?.eventDate);
  const location = event?.location?.trim() || FALLBACK_LOCATION;
  const applyUrl = event?.applyUrl?.trim() || null;

  const badge = homepage?.vendorCtaBadge?.trim() || FALLBACK_BADGE;
  const headline = homepage?.vendorCtaHeadline?.trim() || FALLBACK_HEADLINE;
  const body = homepage?.vendorCtaBody?.trim() || FALLBACK_BODY;
  const perks = homepage?.vendorCtaPerks?.length ? homepage.vendorCtaPerks : FALLBACK_PERKS;
  const pricingHeadline =
    homepage?.vendorCtaPricingPill?.headline?.trim() || FALLBACK_PRICING_HEADLINE;
  const pricingSubline =
    homepage?.vendorCtaPricingPill?.subline?.trim() || FALLBACK_PRICING_SUBLINE;

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
                  {applyUrl ? (
                    <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                      Apply Now
                    </a>
                  ) : (
                    <Link href="/stall-holders#apply">Apply Now</Link>
                  )}
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
