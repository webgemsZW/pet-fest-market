import type { Metadata } from "next";
import Image from "next/image";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SponsorEnquirySection } from "@/components/sections/SponsorEnquirySection";
import { tierConfig } from "@/lib/sponsors-data";
import { getSponsors, type SponsorTier } from "@/lib/sanity/get-sponsors";
import { getSponsorsPage } from "@/lib/sanity/get-sponsors-page";
import { urlFor } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo";

const FALLBACK_HEADING = "Our Sponsors";
const FALLBACK_SUBTITLE =
  "PetFest Market is made possible through the generous support of local businesses.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSponsorsPage();
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: "Sponsors",
    fallbackDescription:
      "Meet the sponsors of PetFest Market — local businesses supporting our pet community event.",
  });
}

/*
  Sponsors come from Sanity (via @/lib/sanity/get-sponsors); the legacy
  src/lib/sponsors-data.ts is kept only for its `tierConfig` styling map.

  The page leads with the sponsor enquiry form. While there are no signed
  sponsors the tiered list is simply omitted — add Sponsor documents in
  Studio and it appears below the form automatically.
  The homepage <SponsorPreviewSection /> stays off until there are sponsors.
*/
export default async function SponsorsPage() {
  const [sponsors, page] = await Promise.all([getSponsors(), getSponsorsPage()]);
  const tierOrder: SponsorTier[] = ["platinum", "gold", "silver", "bronze"];
  const hasSponsors = sponsors.length > 0;

  const heading = page?.heading?.trim() || FALLBACK_HEADING;
  const subtitle = page?.subtitle?.trim() || FALLBACK_SUBTITLE;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🏆</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{heading}</h1>
          <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
        </div>
      </section>

      {/* Sponsor enquiry */}
      <SponsorEnquirySection />

      {/* Sponsors list — only when at least one sponsor is published */}
      {hasSponsors && (
        <SectionWrapper className="bg-brand-50">
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
        </SectionWrapper>
      )}

    </>
  );
}
