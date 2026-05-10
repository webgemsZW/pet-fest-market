import React from "react";
import { Heart, ShoppingBag, Users, Smile } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

const highlights = [
  {
    icon: ShoppingBag,
    title: "Local Vendors",
    description:
      "Shop handmade goods, pet accessories, artisan treats, and more from passionate local stallholders.",
  },
  {
    icon: Heart,
    title: "All Pets Welcome",
    description:
      "Dogs, cats, rabbits, birds — bring your furry, fluffy, or feathered friends along for the fun.",
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
      "Activities, demonstrations, and entertainment for all ages. A perfect Saturday outing for the whole crew.",
  },
];

export function EventSummarySection() {
  return (
    <SectionWrapper>
      <SectionHeading
        title="What to Expect"
        subtitle="A full day of wagging tails, happy hearts, and amazing community spirit."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-100">
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
