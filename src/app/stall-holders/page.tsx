import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getStallHolderPage, type PricingTier, type VendorFaq } from "@/lib/sanity/get-stall-holder-page";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

export const metadata: Metadata = {
  title: "Stall Holders",
  description:
    "Apply to be a vendor at PetFest Market. Learn about stall pricing, requirements, and how to apply.",
};

/* ────────────────────────────────────────────────────────────────
   Fallback placeholder content — used when Sanity is unreachable or
   the stallHolderPage document hasn't been published yet. All of it
   is lorem ipsum (intentionally — no real stallholder pricing or
   benefits have been confirmed by the client). When the editor fills
   in the Stall Holder Page in Studio, this fallback disappears.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_HEADING = "Become a Stall Holder";
// NOTE(content): user kept this subtitle even though it's not from a
// source-of-truth doc. See CLAUDE.md / earlier audit notes.
const FALLBACK_INTRO =
  "Showcase your products to hundreds of passionate pet lovers at one of Victoria's most loved community markets.";

const FALLBACK_BENEFITS_HEADING = "Why Sell at PetFest Market?";
const FALLBACK_BENEFITS_SUBTITLE =
  "Join a community of passionate local vendors and connect with your ideal customers.";

const FALLBACK_BENEFITS: string[] = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit, sed do eiusmod",
  "Tempor incididunt ut labore et dolore",
  "Ut enim ad minim veniam, quis nostrud",
  "Exercitation ullamco laboris nisi ut aliquip",
  "Duis aute irure dolor in reprehenderit",
  "In voluptate velit esse cillum dolore",
  "Excepteur sint occaecat cupidatat non proident",
];

const FALLBACK_PRICING_HEADING = "Stall Pricing";
const FALLBACK_PRICING_SUBTITLE = "Simple, transparent pricing with no surprises.";

const FALLBACK_PRICING: PricingTier[] = [
  {
    tier: "Lorem Ipsum",
    price: "$—",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    features: ["Lorem ipsum", "Dolor sit amet", "Consectetur adipiscing", "Sed do eiusmod"],
    featured: false,
  },
  {
    tier: "Dolor Sit Amet",
    price: "$—",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: [
      "Lorem ipsum dolor",
      "Sit amet consectetur",
      "Adipiscing elit",
      "Sed do eiusmod tempor",
      "Incididunt ut labore",
    ],
    featured: true,
  },
  {
    tier: "Consectetur Adipiscing",
    price: "$—",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    features: ["Lorem ipsum", "Dolor sit amet", "Consectetur", "Adipiscing elit", "Sed do eiusmod"],
    featured: false,
  },
];

const FALLBACK_REQUIREMENTS_HEADING = "Requirements";
const FALLBACK_REQUIREMENTS_SUBTITLE = "Please read these requirements before applying.";

const FALLBACK_REQUIREMENTS: string[] = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
  "Duis aute irure dolor in reprehenderit in voluptate velit",
  "Excepteur sint occaecat cupidatat non proident sunt in culpa",
];

const FALLBACK_VENDOR_FAQS_HEADING = "Vendor FAQs";
const FALLBACK_VENDOR_FAQS: VendorFaq[] = [
  {
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Ut enim ad minim veniam?",
    answer:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Duis aute irure dolor in reprehenderit?",
    answer:
      "In voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Sunt in culpa qui officia deserunt?",
    answer: "Mollit anim id est laborum.",
  },
  {
    question: "Laudantium totam rem aperiam?",
    answer:
      "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
];

const FALLBACK_APPLY_HEADING = "Ready to Apply?";
const FALLBACK_APPLY_BODY =
  "Our stallholder application form is almost ready. Sign up below to be notified the moment applications open — spots are limited!";
const FALLBACK_APPLY_COMING_SOON = "Application Form Coming Soon";

const FALLBACK_CONTACT_EMAIL = "petfest@nonconformity.com.au";

export default async function StallHoldersPage() {
  const [page, siteSettings] = await Promise.all([getStallHolderPage(), getSiteSettings()]);

  const heading = page?.heading?.trim() || FALLBACK_HEADING;
  const intro = page?.intro?.trim() || FALLBACK_INTRO;

  const benefitsHeading = page?.benefitsHeading?.trim() || FALLBACK_BENEFITS_HEADING;
  const benefitsSubtitle = page?.benefitsSubtitle?.trim() || FALLBACK_BENEFITS_SUBTITLE;
  const benefits = page?.benefits?.length ? page.benefits : FALLBACK_BENEFITS;

  const pricingHeading = page?.pricingHeading?.trim() || FALLBACK_PRICING_HEADING;
  const pricingSubtitle = page?.pricingSubtitle?.trim() || FALLBACK_PRICING_SUBTITLE;
  const pricingTiers = page?.pricing?.length ? page.pricing : FALLBACK_PRICING;

  const requirementsHeading = page?.requirementsHeading?.trim() || FALLBACK_REQUIREMENTS_HEADING;
  const requirementsSubtitle =
    page?.requirementsSubtitle?.trim() || FALLBACK_REQUIREMENTS_SUBTITLE;
  const requirements = page?.requirements?.length ? page.requirements : FALLBACK_REQUIREMENTS;

  const vendorFaqsHeading = page?.vendorFaqsHeading?.trim() || FALLBACK_VENDOR_FAQS_HEADING;
  const vendorFaqs = page?.vendorFaqs?.length ? page.vendorFaqs : FALLBACK_VENDOR_FAQS;

  const applyHeading = page?.applyHeading?.trim() || FALLBACK_APPLY_HEADING;
  const applyBody = page?.applyBody?.trim() || FALLBACK_APPLY_BODY;
  const applyComingSoon = page?.applyComingSoonLabel?.trim() || FALLBACK_APPLY_COMING_SOON;

  // Apply URL comes from the CURRENT EVENT, not the page document, so
  // it can vary between events (per CMS_PLAN.md §9.5).
  const applyUrl = siteSettings?.currentEvent?.applyUrl?.trim() || null;
  const contactEmail = siteSettings?.contactEmail?.trim() || FALLBACK_CONTACT_EMAIL;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🛍️</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{heading}</h1>
          <p className="mt-4 text-xl text-gray-600">{intro}</p>
          <div className="mt-8">
            <Button asChild size="lg">
              {applyUrl ? (
                <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              ) : (
                <Link href="#apply">Apply Now</Link>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <SectionWrapper>
        <SectionHeading title={benefitsHeading} subtitle={benefitsSubtitle} />
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <div key={`${benefit}-${i}`} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
                  aria-hidden="true"
                />
                <span className="text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Pricing */}
      <SectionWrapper className="bg-brand-50">
        <SectionHeading title={pricingHeading} subtitle={pricingSubtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.tier}
              className={tier.featured ? "ring-2 ring-brand-500" : ""}
            >
              {tier.featured && (
                <div className="rounded-t-2xl bg-brand-500 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.tier}</CardTitle>
                <div className="text-3xl font-bold text-brand-600">{tier.price}</div>
                {tier.description && <CardDescription>{tier.description}</CardDescription>}
              </CardHeader>
              {tier.features && tier.features.length > 0 && (
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li
                        key={`${feature}-${i}`}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand-500" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Requirements */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={requirementsHeading}
            subtitle={requirementsSubtitle}
            centered
          />
          <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-100 sm:p-8">
            <ul className="space-y-3">
              {requirements.map((req, i) => (
                <li key={`${req}-${i}`} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 shrink-0 text-amber-500">⚠️</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Vendor FAQ */}
      <SectionWrapper className="bg-brand-50">
        <div className="mx-auto max-w-3xl">
          <SectionHeading title={vendorFaqsHeading} />
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {vendorFaqs.map((faq, i) => (
                <AccordionItem key={`${faq.question}-${i}`} value={`v-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </SectionWrapper>

      {/* Apply */}
      <SectionWrapper id="apply">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-5xl">✍️</div>
          <h2 className="text-3xl font-bold text-gray-900">{applyHeading}</h2>
          <p className="mt-3 text-lg text-gray-500">{applyBody}</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {applyUrl ? (
              <Button asChild size="lg">
                <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            ) : (
              <div className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-brand-200 px-6 py-3 text-base font-medium text-brand-500">
                {applyComingSoon}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </div>
            )}
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Have Questions?</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            In the meantime, email us at{" "}
            <a href={`mailto:${contactEmail}`} className="text-brand-600 hover:underline">
              {contactEmail}
            </a>
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
