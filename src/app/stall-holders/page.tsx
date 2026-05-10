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
    "Apply to be a vendor at Pet Fest Market. Learn about stall pricing, requirements, and how to apply.",
};

const benefits = [
  "Access to a large, engaged pet-loving audience",
  "Affordable stall fees with no hidden costs",
  "Prime location in busy Box Hill",
  "Dedicated support from our event team",
  "Opportunity to connect with fellow local vendors",
  "Feature in our pre-event social media and email campaigns",
  "Simple, fast online application process",
  "Market open from 9am to 4pm — full day of exposure",
];

const pricingTiers = [
  {
    tier: "Standard Stall",
    price: "$80",
    description: "A 3m × 3m space. Perfect for small vendors, jewellery, accessories, and crafts.",
    features: ["3m × 3m space", "One trestle table", "Basic signage included", "Up to 2 stallholders"],
  },
  {
    tier: "Premium Stall",
    price: "$140",
    description: "A 3m × 6m space with extra depth for food vendors and larger displays.",
    features: [
      "3m × 6m space",
      "Two trestle tables",
      "Power access available (+$20)",
      "Priority placement",
      "Up to 3 stallholders",
    ],
    featured: true,
  },
  {
    tier: "Corner Stall",
    price: "$180",
    description: "High-visibility corner position with double frontage. Limited availability.",
    features: [
      "Corner placement",
      "4m × 4m space",
      "Two trestle tables",
      "Power access available (+$20)",
      "Premium foot traffic",
    ],
  },
];

const requirements = [
  "Valid ABN or registered business (sole trader accepted)",
  "Public liability insurance ($10M minimum)",
  "Products must be pet-friendly and suitable for the event theme",
  "Stallholders must supply their own marquee/shelter",
  "Arrival and bump-in between 7:00am – 8:30am on the day",
  "Stallholders must remain for the full duration of the event",
];

const vendorFaqs = [
  {
    id: "v1",
    question: "When will I find out if my application is approved?",
    answer:
      "We review applications on a rolling basis and aim to respond within 7–10 business days. During peak application periods this may take slightly longer. You will receive an email either way.",
  },
  {
    id: "v2",
    question: "Can I sell food at the market?",
    answer:
      "Yes! Food vendors are welcome. You will need to hold a current food handling certificate and comply with local council food safety requirements. Please note this in your application.",
  },
  {
    id: "v3",
    question: "What if I need to cancel after I've been accepted?",
    answer:
      "Cancellations made more than 14 days before the event receive a 50% refund. Cancellations within 14 days are non-refundable. Please see our Refund Policy for full details.",
  },
  {
    id: "v4",
    question: "Is electricity available at all stalls?",
    answer:
      "Electricity is available for Premium and Corner stalls at an additional $20 fee. Standard stall holders are welcome to bring battery-powered equipment.",
  },
  {
    id: "v5",
    question: "Can I bring my own pet to the stall?",
    answer:
      "Yes — we actively encourage it! Pets must be kept calm and under control at all times. Please ensure your animal is comfortable in a busy market environment.",
  },
];

export default function StallHoldersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🛍️</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Become a Stall Holder</h1>
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
          title="Why Sell at Pet Fest Market?"
          subtitle="Join a community of passionate local vendors and connect with your ideal customers."
        />
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal-500"
                  aria-hidden="true"
                />
                <span className="text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Pricing */}
      <SectionWrapper className="bg-teal-50">
        <SectionHeading title="Stall Pricing" subtitle="Simple, transparent pricing with no surprises." />
        <div className="grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.tier}
              className={tier.featured ? "ring-2 ring-teal-500" : ""}
            >
              {tier.featured && (
                <div className="rounded-t-2xl bg-teal-500 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.tier}</CardTitle>
                <div className="text-3xl font-bold text-teal-600">{tier.price}</div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-teal-500" aria-hidden="true" />
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
      <SectionWrapper className="bg-teal-50">
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
            Fill out our online application form. Spots are limited, so don&apos;t wait too long!
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <a
                href="https://forms.google.com/placeholder"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply via Google Form
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Have Questions?</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Applications reviewed within 7–10 business days.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
