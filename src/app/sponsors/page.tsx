import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Meet the sponsors of Pet Fest Market — local businesses supporting our pet community event.",
};

type SponsorTier = "platinum" | "gold" | "silver" | "bronze";

const sponsors: { name: string; tier: SponsorTier; tagline: string }[] = [
  { name: "Paws & Co.", tier: "platinum", tagline: "Premium pet accessories & grooming" },
  { name: "Happy Tails Vet Clinic", tier: "gold", tagline: "Compassionate veterinary care" },
  { name: "Bark & Brew", tier: "gold", tagline: "Dog-friendly café and treats" },
  { name: "FurEver Home", tier: "silver", tagline: "Pet adoption and rescue support" },
  { name: "The Pet Pantry", tier: "silver", tagline: "Natural & organic pet food" },
  { name: "Whiskers & Wings", tier: "silver", tagline: "Bird and small animal supplies" },
  { name: "Pawsome Photography", tier: "bronze", tagline: "Pet portrait photography" },
  { name: "Canine Academy", tier: "bronze", tagline: "Dog training and behaviour" },
  { name: "Aqua Tails", tier: "bronze", tagline: "Aquarium & fish specialists" },
  { name: "Fluffy Threads", tier: "bronze", tagline: "Handmade pet clothing & accessories" },
];

const tierConfig: Record<
  SponsorTier,
  { label: string; emoji: string; bgClass: string; textClass: string; badgeClass: string }
> = {
  platinum: {
    label: "Platinum",
    emoji: "⭐",
    bgClass: "bg-gray-50",
    textClass: "text-gray-800",
    badgeClass: "bg-gray-200 text-gray-700",
  },
  gold: {
    label: "Gold",
    emoji: "🏅",
    bgClass: "bg-amber-50",
    textClass: "text-amber-900",
    badgeClass: "bg-amber-200 text-amber-800",
  },
  silver: {
    label: "Silver",
    emoji: "🥈",
    bgClass: "bg-slate-50",
    textClass: "text-slate-800",
    badgeClass: "bg-slate-200 text-slate-700",
  },
  bronze: {
    label: "Bronze",
    emoji: "🥉",
    bgClass: "bg-orange-50",
    textClass: "text-orange-900",
    badgeClass: "bg-orange-200 text-orange-800",
  },
};

export default function SponsorsPage() {
  const tierOrder: SponsorTier[] = ["platinum", "gold", "silver", "bronze"];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🏆</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Our Sponsors</h1>
          <p className="mt-4 text-xl text-gray-600">
            Pet Fest Market is made possible through the generous support of these wonderful local
            businesses.
          </p>
        </div>
      </section>

      {/* Sponsors by tier */}
      <SectionWrapper>
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
      </SectionWrapper>

      {/* Become a sponsor */}
      <SectionWrapper className="bg-teal-50">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-4xl">🤝</div>
          <h2 className="text-3xl font-bold text-gray-900">Become a Sponsor</h2>
          <p className="mt-3 text-lg text-gray-500">
            Interested in supporting Pet Fest Market? We&apos;d love to have you on board. Reach out
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
