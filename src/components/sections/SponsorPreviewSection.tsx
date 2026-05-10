import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

const placeholderSponsors = [
  { name: "Paws & Co.", tier: "Platinum" },
  { name: "Happy Tails Vet", tier: "Gold" },
  { name: "Bark & Brew", tier: "Gold" },
  { name: "FurEver Home", tier: "Silver" },
  { name: "The Pet Pantry", tier: "Silver" },
  { name: "Whiskers & Wings", tier: "Bronze" },
];

export function SponsorPreviewSection() {
  return (
    <SectionWrapper>
      <SectionHeading
        title="Our Sponsors"
        subtitle="Proudly supported by local businesses who love pets as much as we do."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {placeholderSponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-6 text-center ring-1 ring-gray-100 transition-shadow hover:shadow-sm"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-2xl">
              🐾
            </div>
            <p className="text-xs font-semibold text-gray-700">{sponsor.name}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-teal-500">
              {sponsor.tier}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="secondary">
          <Link href="/sponsors">View All Sponsors</Link>
        </Button>
        <p className="mt-4 text-sm text-gray-400">
          Interested in sponsoring?{" "}
          <Link href="/contact" className="text-teal-600 underline underline-offset-2 hover:text-teal-700">
            Get in touch
          </Link>
        </p>
      </div>
    </SectionWrapper>
  );
}
