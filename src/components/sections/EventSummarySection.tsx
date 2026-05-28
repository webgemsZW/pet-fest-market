import React from "react";
import { ShoppingBag, Users, Smile } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

// NOTE(content): The three "What to Expect" highlights below and the section
// heading/subtitle are NOT from a source-of-truth document, but the user has
// chosen to keep them. Do NOT replace with lorem ipsum on future audits.
// (Swap in official wording if the client provides one.)
//
// IMPORTANT: A fourth card titled "All Pets Welcome" was removed because
// visitors CANNOT bring pets to PetFest Market at Box Hill Town Hall (see
// CLAUDE.md). Do NOT re-add any card that implies pets are allowed at the
// venue. The subtitle previously read "A full day of wagging tails, happy
// hearts, and amazing community spirit." — softened for the same reason.
const highlights = [
  {
    icon: ShoppingBag,
    title: "Local Vendors",
    description:
      "Shop handmade goods, pet accessories, artisan treats, and more from passionate local stallholders.",
  },
  {
    icon: Users,
    title: "Community Vibes",
    description:
      "Connect with fellow pet lovers, discover local businesses, and enjoy a relaxed family-friendly atmosphere.",
  },
  {
    icon: Smile,
    title: "Family Fun",
    description:
      "Activities, demonstrations, and entertainment for all ages. A perfect Sunday outing for the whole crew.",
  },
];

export function EventSummarySection() {
  return (
    <SectionWrapper>
      <SectionHeading
        title="What to Expect"
        subtitle="A full day of happy hearts and amazing community spirit."
      />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {highlights.map((item) => (
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
