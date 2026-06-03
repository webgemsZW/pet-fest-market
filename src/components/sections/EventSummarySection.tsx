import React from "react";
import { ShoppingBag, Users, Smile } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icon } from "@/lib/icon-registry";
import { getHomepage, type WhatToExpectCard } from "@/lib/sanity/get-homepage";

/* ──────────────────────────────────────────────────────────────────
   Fallback content used when the homepage document isn't populated.
   NOTE(content): the user has chosen to keep these three cards as the
   site's default "What to Expect" content — do not replace with lorem
   ipsum on audits.

   A fourth card titled "All Pets Welcome" was removed earlier because
   visitors can't bring pets to the venue (CLAUDE.md). Do NOT add any
   card that implies pets are allowed at the venue.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_HEADING = "What to Expect";
const FALLBACK_SUBTITLE = "A full day of happy hearts and amazing community spirit.";

type FallbackCard = {
  icon: typeof ShoppingBag;
  title: string;
  description: string;
};

const FALLBACK_CARDS: FallbackCard[] = [
  {
    icon: ShoppingBag,
    title: "Local Stallholders",
    description:
      "Shop handmade goods, pet accessories, artisan treats, and more from passionate local Stallholders.",
  },
  {
    icon: Users,
    title: "Community Vibes",
    description:
      "Connect with fellow pet lovers, discover local businesses, and enjoy a relaxed family-friendly atmosphere.",
  },
  // Family Fun: shortened per the 2 June 2026 client revision —
  // Box Hill is the first market, so no specific activities are
  // promised; just the framing line. As the market grows the
  // editor can flesh this out via Studio.
  {
    icon: Smile,
    title: "Family Fun",
    description: "A perfect Sunday outing for the whole crew.",
  },
];

export async function EventSummarySection() {
  const homepage = await getHomepage();
  const heading = homepage?.whatToExpectHeading?.trim() || FALLBACK_HEADING;
  const subtitle = homepage?.whatToExpectSubtitle?.trim() || FALLBACK_SUBTITLE;
  const sanityCards: WhatToExpectCard[] = (homepage?.whatToExpectCards ?? []).filter(
    (c) => c?.title && c?.description,
  );
  const useSanity = sanityCards.length > 0;

  return (
    <SectionWrapper>
      <SectionHeading title={heading} subtitle={subtitle} />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {useSanity
          ? sanityCards.map((card, i) => (
              <div key={`${card.title}-${i}`} className="flex flex-col items-center text-center">
                <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-brand-600 ring-8 ring-brand-50">
                  <Icon name={card.icon} fallback="sparkles" className="h-9 w-9" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{card.title}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-gray-600">{card.description}</p>
              </div>
            ))
          : FALLBACK_CARDS.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-brand-600 ring-8 ring-brand-50">
                  <item.icon className="h-9 w-9" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
      </div>
    </SectionWrapper>
  );
}
