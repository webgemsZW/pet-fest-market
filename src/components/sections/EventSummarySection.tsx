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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
