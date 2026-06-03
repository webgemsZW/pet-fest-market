import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getFaqItems, type FaqItem } from "@/lib/sanity/get-faq-items";
import { faqData as fallbackFaqData } from "@/lib/faq-data";
import { getHomepage } from "@/lib/sanity/get-homepage";

const FALLBACK_HEADING = "Frequently Asked Questions";
const FALLBACK_SUBTITLE = "Everything you need to know about PetFest Market.";

/**
 * Resolve the FAQ list — prefer Sanity-published items, fall back to
 * the hardcoded client list in src/lib/faq-data.ts when Sanity returns
 * nothing.
 */
function resolveList(items: FaqItem[]): Array<{ id: string; question: string; answer: string }> {
  if (items.length === 0) {
    return fallbackFaqData.map((f) => ({ id: f.id, question: f.question, answer: f.answer }));
  }
  return items.map((f) => ({ id: f._id, question: f.question, answer: f.answer }));
}

/**
 * Renders the full FAQ list on the home page. Previously this was a
 * "preview" of 4 items linking out to /faq; the client asked for all
 * FAQs in one place so visitors don't need to click through.
 */
export async function FaqSection() {
  const [items, homepage] = await Promise.all([getFaqItems(), getHomepage()]);
  const list = resolveList(items);
  const heading = homepage?.faqPreviewHeading?.trim() || FALLBACK_HEADING;
  const subtitle = homepage?.faqPreviewSubtitle?.trim() || FALLBACK_SUBTITLE;

  return (
    <SectionWrapper className="bg-brand-50">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={heading} subtitle={subtitle} />

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <Accordion type="single" collapsible className="w-full">
            {list.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Catch-all CTA for visitors whose question isn't covered above. */}
        <div className="mt-10 text-center">
          <p className="mb-4 text-sm text-gray-600">Can&apos;t find what you&apos;re looking for?</p>
          <Button asChild variant="secondary">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
