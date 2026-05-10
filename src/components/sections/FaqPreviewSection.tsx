import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const previewFaqs = [
  {
    id: "q1",
    question: "Can I bring my dog to Pet Fest Market?",
    answer:
      "Absolutely! Pet Fest Market is a pet-friendly event. Dogs must be kept on a lead at all times. We ask that all pets are up to date with their vaccinations and are comfortable in crowds.",
  },
  {
    id: "q2",
    question: "How much does it cost to attend?",
    answer:
      "Entry is $5 per adult, and children under 12 enter free. Concession pricing is available. Purchase tickets at the gate or online in advance.",
  },
  {
    id: "q3",
    question: "How do I apply to be a vendor?",
    answer:
      "Fill out our online application form on the Stall Holders page. Applications are reviewed on a rolling basis, and you'll hear back within 7–10 business days.",
  },
  {
    id: "q4",
    question: "Is there parking available?",
    answer:
      "Yes, there is ample free parking nearby. We also encourage visitors to use public transport — Box Hill is well-serviced by bus and train.",
  },
];

export function FaqPreviewSection() {
  return (
    <SectionWrapper className="bg-teal-50">
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
