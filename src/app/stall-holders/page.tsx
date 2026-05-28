import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Stall Holders",
  description:
    "Apply to be a vendor at PetFest Market. Learn about stall pricing, requirements, and how to apply.",
};

// TODO(content): All benefits below are placeholder lorem ipsum. The
// previous list invented foot-traffic claims, event hours (9am–4pm), and
// marketing perks. Replace with real vendor benefits once the client
// confirms the stallholder package details.
const benefits = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit, sed do eiusmod",
  "Tempor incididunt ut labore et dolore",
  "Ut enim ad minim veniam, quis nostrud",
  "Exercitation ullamco laboris nisi ut aliquip",
  "Duis aute irure dolor in reprehenderit",
  "In voluptate velit esse cillum dolore",
  "Excepteur sint occaecat cupidatat non proident",
];

// TODO(content): Pricing tiers below are placeholder. The previous version
// invented stall sizes (3m×3m, 3m×6m, 4m×4m), prices ($80/$140/$180),
// power add-on cost ($20), and inclusions. Per the 25 May email from the
// client, stallholder applications are still being finalised on a Google
// Form — request the real pricing structure (or remove tiers entirely if
// pricing isn't tiered) before going live.
const pricingTiers = [
  {
    tier: "Lorem Ipsum",
    price: "$—",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    features: ["Lorem ipsum", "Dolor sit amet", "Consectetur adipiscing", "Sed do eiusmod"],
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
    features: [
      "Lorem ipsum",
      "Dolor sit amet",
      "Consectetur",
      "Adipiscing elit",
      "Sed do eiusmod",
    ],
  },
];

// TODO(content): Requirements below are placeholder. The previous list
// invented ABN/insurance/timing rules — none confirmed by the client.
const requirements = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
  "Duis aute irure dolor in reprehenderit in voluptate velit",
  "Excepteur sint occaecat cupidatat non proident sunt in culpa",
];

// TODO(content): Vendor FAQs below are placeholder. The previous version
// invented application review times ("7–10 business days"), cancellation
// terms (50% refund > 14 days), and electricity fees. NOTE: these are
// stall-application-specific FAQs and are intentionally separate from the
// public FAQ data in `@/lib/faq-data` (which covers visitor-facing topics).
const vendorFaqs = [
  {
    id: "v1",
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  },
  {
    id: "v2",
    question: "Ut enim ad minim veniam?",
    answer:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  },
  {
    id: "v3",
    question: "Duis aute irure dolor in reprehenderit?",
    answer:
      "In voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    id: "v4",
    question: "Sunt in culpa qui officia deserunt?",
    answer:
      "Mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
  },
  {
    id: "v5",
    question: "Laudantium totam rem aperiam?",
    answer:
      "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
];

export default function StallHoldersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🛍️</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Become a Stall Holder</h1>
          {/*
            NOTE(content): Hero subtitle below is NOT from a source-of-truth
            document but the user has chosen to keep it. Do NOT replace with
            lorem ipsum on future audits. (Heads-up: the "most loved" framing
            implies an established event, but Box Hill 26 July 2026 is the
            FIRST PetFest Market — leave as-is unless the user revisits.)
          */}
          <p className="mt-4 text-xl text-gray-600">
            Showcase your products to hundreds of passionate pet lovers at one of Victoria&apos;s
            most loved community markets.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="#apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <SectionWrapper>
        <SectionHeading
          title="Why Sell at PetFest Market?"
          subtitle="Join a community of passionate local vendors and connect with your ideal customers."
        />
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
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
        <SectionHeading title="Stall Pricing" subtitle="Simple, transparent pricing with no surprises." />
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
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-brand-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Requirements */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title="Requirements"
            subtitle="Please read these requirements before applying."
            centered
          />
          <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-100 sm:p-8">
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 text-sm text-gray-700">
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
          <SectionHeading title="Vendor FAQs" />
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {vendorFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
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
          <h2 className="text-3xl font-bold text-gray-900">Ready to Apply?</h2>
          <p className="mt-3 text-lg text-gray-500">
            Our stallholder application form is almost ready. Sign up below to be notified the
            moment applications open — spots are limited!
          </p>
          {/*
            TODO: Replace the disabled button below with a live link once the Google Form is ready.
            Simply swap the <div> for:
              <a href="YOUR_GOOGLE_FORM_URL" target="_blank" rel="noopener noreferrer">
            and remove the "coming soon" note.
          */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-brand-200 px-6 py-3 text-base font-medium text-brand-500">
              Application Form Coming Soon
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </div>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Have Questions?</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            In the meantime, email us at{" "}
            <a href="mailto:petfest@nonconformity.com.au" className="text-brand-600 hover:underline">
              petfest@nonconformity.com.au
            </a>
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
