import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getFaqItems, type FaqItem } from "@/lib/sanity/get-faq-items";
import { faqData as fallbackFaqData } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about PetFest Market — tickets, animals, accessibility, and more.",
};

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

export default async function FaqPage() {
  const items = await getFaqItems();
  const list = resolveList(items);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">❓</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about PetFest Market.
          </p>
        </div>
      </section>

      {/* FAQ list — single unified list (no tabs/categories) per the
          2 June 2026 client revision. */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
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
            <p className="mb-4 text-sm text-gray-600">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Button asChild variant="secondary">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
