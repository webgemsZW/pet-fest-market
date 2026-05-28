import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { previewFaqs } from "@/lib/faq-data";

export function FaqPreviewSection() {
  return (
    <SectionWrapper className="bg-brand-50">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Common Questions" subtitle="Quick answers to what people ask most." />

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <Accordion type="single" collapsible className="w-full">
            {previewFaqs.map((faq) => (
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
