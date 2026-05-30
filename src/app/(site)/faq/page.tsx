import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  getFaqItems,
  groupFaqsByCategory,
  type FaqCategory,
  type FaqItem,
} from "@/lib/sanity/get-faq-items";
import { faqData as fallbackFaqData, categoryLabels } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about PetFest Market — tickets, pets, vendors, and more.",
};

const CATEGORY_ORDER: FaqCategory[] = ["general", "vendors", "pets", "tickets"];

/**
 * Choose the data source per category: prefer Sanity-published FAQs;
 * if Sanity returned nothing at all (empty array — no docs yet, or
 * Sanity unreachable), fall back to the lorem-ipsum placeholder data
 * from src/lib/faq-data so the page is never empty.
 *
 * The fallback runs as a whole — we don't mix Sanity items and lorem
 * items in the same category, since that'd be confusing for editors.
 */
function resolveData(items: FaqItem[]): Record<FaqCategory, Array<{
  id: string;
  question: string;
  answer: string;
}>> {
  if (items.length === 0) {
    const empty: Record<FaqCategory, Array<{ id: string; question: string; answer: string }>> = {
      general: [],
      vendors: [],
      pets: [],
      tickets: [],
    };
    for (const cat of CATEGORY_ORDER) {
      empty[cat] = fallbackFaqData[cat].map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
      }));
    }
    return empty;
  }

  const grouped = groupFaqsByCategory(items);
  const result: Record<FaqCategory, Array<{ id: string; question: string; answer: string }>> = {
    general: [],
    vendors: [],
    pets: [],
    tickets: [],
  };
  for (const cat of CATEGORY_ORDER) {
    result[cat] = grouped[cat].map((f) => ({
      id: f._id,
      question: f.question,
      answer: f.answer,
    }));
  }
  return result;
}

export default async function FaqPage() {
  const items = await getFaqItems();
  const data = resolveData(items);

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

      {/* FAQ sections */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-12">
          {CATEGORY_ORDER.map((category) => {
            const entries = data[category];
            if (entries.length === 0) return null;
            return (
              <div key={category}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {categoryLabels[category].emoji}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {categoryLabels[category].label}
                  </h2>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {entries.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
