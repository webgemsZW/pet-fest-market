import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { sponsors, tierConfig, type SponsorTier } from "@/lib/sponsors-data";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Meet the sponsors of PetFest Market — local businesses supporting our pet community event.",
};

/*
  /sponsors is intentionally NOT linked from the header or footer navigation
  while `sponsors` (in @/lib/sponsors-data) is empty. The page itself stays
  accessible at /sponsors so direct links still resolve and so the "Become a
  Sponsor" CTA remains discoverable. When sponsors are signed:
    1. Populate `sponsors` in @/lib/sponsors-data.ts.
    2. Restore the /sponsors link in Header.tsx + Footer.tsx.
    3. Re-enable <SponsorPreviewSection /> on the homepage.
*/
export default function SponsorsPage() {
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
                    {tierSponsors.map((sponsor) => (
                      <div
                        key={sponsor.name}
                        className={`rounded-2xl ${config.bgClass} flex flex-col items-center p-8 text-center ring-1 ring-gray-100`}
                      >
                        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm text-3xl">
                          🐾
                        </div>
                        <p className={`font-semibold ${config.textClass}`}>{sponsor.name}</p>
                        <p className="mt-1 text-sm text-gray-500">{sponsor.tagline}</p>
                        <span
                          className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${config.badgeClass}`}
                        >
                          {config.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /*
            TODO(content): Empty state shown while no sponsors are signed.
            The previous version of this page hardcoded fake sponsors
            ("Paws & Co.", "Happy Tails Vet", etc.) — those have been
            removed. Populate @/lib/sponsors-data once real sponsors come
            on board.
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
