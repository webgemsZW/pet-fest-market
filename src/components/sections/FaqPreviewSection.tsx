import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  getFaqItems,
  groupFaqsByCategory,
  type FaqCategory,
  type FaqItem,
} from "@/lib/sanity/get-faq-items";
import { previewFaqs as fallbackPreviewFaqs } from "@/lib/faq-data";
import { getHomepage } from "@/lib/sanity/get-homepage";

const FALLBACK_HEADING = "Common Questions";
const FALLBACK_SUBTITLE = "Quick answers to what people ask most.";

/**
 * Pick a preview of FAQs to show on the homepage: first item from each
 * category that has any. If no Sanity items are published yet, returns
 * the placeholder lorem-ipsum preview from src/lib/faq-data.ts so the
 * section never renders empty.
 */
function pickPreview(items: FaqItem[]): Array<{
  id: string;
  question: string;
  answer: string;
}> {
  if (items.length === 0) {
    return fallbackPreviewFaqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
    }));
  }

  const grouped = groupFaqsByCategory(items);
  const order: FaqCategory[] = ["general", "vendors", "pets", "tickets"];
  return order
    .map((cat) => grouped[cat][0])
    .filter((item): item is FaqItem => Boolean(item))
    .map((f) => ({ id: f._id, question: f.question, answer: f.answer }));
}

export async function FaqPreviewSection() {
  const [items, homepage] = await Promise.all([getFaqItems(), getHomepage()]);
  const preview = pickPreview(items);
  const heading = homepage?.faqPreviewHeading?.trim() || FALLBACK_HEADING;
  const subtitle = homepage?.faqPreviewSubtitle?.trim() || FALLBACK_SUBTITLE;

  return (
    <SectionWrapper className="bg-brand-50">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={heading} subtitle={subtitle} />

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <Accordion type="single" collapsible className="w-full">
            {preview.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="secondary">
            <Link href="/faq">View All FAQs</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
