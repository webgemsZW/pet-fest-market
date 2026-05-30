import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getSponsors } from "@/lib/sanity/get-sponsors";
import { urlFor } from "@/lib/sanity/image";

/*
  This component is currently NOT rendered on the homepage (the import in
  src/app/page.tsx is commented out) because `getSponsors()` returns an
  empty list while no sponsors are published. When the first real sponsor
  is added, the homepage import + /sponsors nav links should be
  re-enabled.

  Source of truth is Sanity (via @/lib/sanity/get-sponsors). Both this
  preview AND the full /sponsors page read from the same helper.
*/
export async function SponsorPreviewSection() {
  const sponsors = await getSponsors();
  if (sponsors.length === 0) return null;

  // Show up to 6 sponsors on the homepage — favours highest tiers first
  // since getSponsors() already sorts by tier then order.
  const preview = sponsors.slice(0, 6);

  return (
    <SectionWrapper>
      <SectionHeading
        title="Our Sponsors"
        subtitle="Proudly supported by local businesses who love pets as much as we do."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {preview.map((sponsor) => {
          const logoUrl = sponsor.logo?.asset?._ref
            ? urlFor(sponsor.logo as Parameters<typeof urlFor>[0])
                .width(120)
                .height(120)
                .fit("crop")
                .url()
            : null;

          return (
            <div
              key={sponsor._id}
              className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-6 text-center ring-1 ring-gray-100 transition-shadow hover:shadow-sm"
            >
              <div className="mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-brand-100">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={sponsor.logo?.alt || sponsor.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-2xl">🐾</span>
                )}
              </div>
              <p className="text-xs font-semibold text-gray-700">{sponsor.name}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-brand-500">
                {sponsor.tier}
              </p>
            </div>
          );
        })}
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
