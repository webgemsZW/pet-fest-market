import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { tierConfig } from "@/lib/sponsors-data";
import { getSponsors, type SponsorTier } from "@/lib/sanity/get-sponsors";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Meet the sponsors of PetFest Market — local businesses supporting our pet community event.",
};

/*
  /sponsors is intentionally NOT linked from the header or footer navigation
  while there are no published sponsors. The page itself stays accessible so
  direct links still resolve and so the "Become a Sponsor" CTA remains
  discoverable. When sponsors are signed:
    1. Add a Sponsor document in Studio.
    2. Restore the /sponsors link in Header.tsx + Footer.tsx.
    3. Re-enable <SponsorPreviewSection /> on the homepage.

  Source-of-truth is now Sanity (via @/lib/sanity/get-sponsors). The legacy
  src/lib/sponsors-data.ts is kept only for its `tierConfig` styling map.
*/
export default async function SponsorsPage() {
  const sponsors = await getSponsors();
  const tierOrder: SponsorTier[] = ["platinum", "gold", "silver", "bronze"];
  const hasSponsors = sponsors.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🏆</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Our Sponsors</h1>
          <p className="mt-4 text-xl text-gray-600">
            PetFest Market is made possible through the generous support of local businesses.
          </p>
        </div>
      </section>

      {/* Sponsors list or placeholder */}
      <SectionWrapper>
        {hasSponsors ? (
          <div className="space-y-16">
            {tierOrder.map((tier) => {
              const tierSponsors = sponsors.filter((s) => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              const config = tierConfig[tier];

              return (
                <div key={tier}>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-2xl">{config.emoji}</span>
                    <h2 className="text-2xl font-bold text-gray-900">{config.label} Sponsors</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tierSponsors.map((sponsor) => {
                      const logoUrl = sponsor.logo?.asset?._ref
                        ? urlFor(sponsor.logo as Parameters<typeof urlFor>[0])
                            .width(200)
                            .height(200)
                            .fit("crop")
                            .url()
                        : null;

                      const card = (
                        <div
                          className={`rounded-2xl ${config.bgClass} flex flex-col items-center p-8 text-center ring-1 ring-gray-100`}
                        >
                          <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                            {logoUrl ? (
                              <Image
                                src={logoUrl}
                                alt={sponsor.logo?.alt || sponsor.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <span className="text-3xl">🐾</span>
                            )}
                          </div>
                          <p className={`font-semibold ${config.textClass}`}>{sponsor.name}</p>
                          {sponsor.tagline && (
                            <p className="mt-1 text-sm text-gray-500">{sponsor.tagline}</p>
                          )}
                          <span
                            className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${config.badgeClass}`}
                          >
                            {config.label}
                          </span>
                        </div>
                      );

                      return sponsor.website ? (
                        <a
                          key={sponsor._id}
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-transform hover:-translate-y-0.5"
                        >
                          {card}
                        </a>
                      ) : (
                        <div key={sponsor._id}>{card}</div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /*
            Empty state shown while no sponsors are signed. Editors can
            add Sponsors in Studio whenever a partner is confirmed —
            this page will automatically switch to the populated view.
          */
          <div className="mx-auto max-w-2xl rounded-2xl bg-brand-50 p-12 text-center ring-1 ring-brand-100">
            <div className="mb-4 text-4xl">🤝</div>
            <h2 className="text-2xl font-bold text-gray-900">Sponsors coming soon</h2>
            <p className="mt-3 text-gray-600">
              We&apos;re currently lining up partners for our first PetFest Market on Sunday 26
              July 2026 at Box Hill Town Hall. Want to be the first?
            </p>
          </div>
        )}
      </SectionWrapper>

      {/* Become a sponsor */}
      <SectionWrapper className="bg-brand-50">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-4xl">🤝</div>
          <h2 className="text-3xl font-bold text-gray-900">Become a Sponsor</h2>
          <p className="mt-3 text-lg text-gray-500">
            Interested in supporting PetFest Market? We&apos;d love to have you on board. Reach out
            to discuss sponsorship opportunities and packages.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
