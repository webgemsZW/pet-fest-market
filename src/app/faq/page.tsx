import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData, categoryLabels, type FaqCategory } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about PetFest Market — tickets, pets, vendors, and more.",
};

export default function FaqPage() {
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
          {(Object.keys(faqData) as FaqCategory[]).map((category) => (
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
                  {faqData[category].map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
