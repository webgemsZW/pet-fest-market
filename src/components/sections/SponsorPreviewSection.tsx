import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { sponsors } from "@/lib/sponsors-data";

/*
  This component is currently NOT rendered on the homepage (the import in
  src/app/page.tsx is commented out) because the `sponsors` array in
  @/lib/sponsors-data is empty. When the first real sponsor is added, the
  homepage import + /sponsors nav links should be re-enabled — see the
  comment at the top of @/lib/sponsors-data for the checklist.
*/
export function SponsorPreviewSection() {
  if (sponsors.length === 0) return null;

  return (
    <SectionWrapper>
      <SectionHeading
        title="Our Sponsors"
        subtitle="Proudly supported by local businesses who love pets as much as we do."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-6 text-center ring-1 ring-gray-100 transition-shadow hover:shadow-sm"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-2xl">
              🐾
            </div>
            <p className="text-xs font-semibold text-gray-700">{sponsor.name}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-brand-500">
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
          <Link href="/contact" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">
            Get in touch
          </Link>
        </p>
      </div>
    </SectionWrapper>
  );
}
