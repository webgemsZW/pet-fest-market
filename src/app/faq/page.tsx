import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Pet Fest Market — tickets, pets, vendors, and more.",
};

type FaqCategory = "general" | "vendors" | "pets" | "tickets";

const faqData: Record<FaqCategory, { id: string; question: string; answer: string }[]> = {
  general: [
    {
      id: "g1",
      question: "When and where is Pet Fest Market?",
      answer:
        "Pet Fest Market is held on 4 July 2026 in Box Hill, Victoria. The event runs from 9:00am to 4:00pm. Full venue details will be published closer to the date.",
    },
    {
      id: "g2",
      question: "Is the event suitable for children?",
      answer:
        "Absolutely! Pet Fest Market is a family-friendly event. Children under 12 enter free. We have activities and entertainment suited to all ages.",
    },
    {
      id: "g3",
      question: "What happens if it rains?",
      answer:
        "The event proceeds rain or shine. Most stalls have covered shelters. We recommend bringing a jacket and sturdy footwear just in case.",
    },
    {
      id: "g4",
      question: "Is there food and drink at the market?",
      answer:
        "Yes! We have a range of food and beverage vendors serving everything from breakfast bites to specialty coffees. There will also be pet-friendly treats available.",
    },
    {
      id: "g5",
      question: "Is the venue wheelchair accessible?",
      answer:
        "Yes, the venue is fully accessible. We have accessible parking, paved pathways, and accessible amenities. Please contact us if you have specific accessibility needs.",
    },
  ],
  vendors: [
    {
      id: "v1",
      question: "How do I apply to be a stall holder?",
      answer:
        "Visit our Stall Holders page and complete the online application form. We review applications on a rolling basis and respond within 7–10 business days.",
    },
    {
      id: "v2",
      question: "What types of products can I sell?",
      answer:
        "We welcome all pet-related and general market products — including handmade goods, artisan food, clothing, home décor, pet accessories, and more. Applications are curated to maintain variety.",
    },
    {
      id: "v3",
      question: "Do I need my own marquee?",
      answer:
        "Yes. All stallholders are required to supply their own marquee or shelter. Tables are provided as specified in your stall package.",
    },
    {
      id: "v4",
      question: "What time do vendors need to arrive?",
      answer:
        "Bump-in is from 7:00am to 8:30am. All stalls must be set up and ready by 8:45am. The market opens to the public at 9:00am.",
    },
  ],
  pets: [
    {
      id: "p1",
      question: "Can I bring my dog?",
      answer:
        "Yes! Dogs are very welcome at Pet Fest Market. They must be kept on a lead at all times and must be vaccinated. Please ensure your dog is comfortable in busy, crowded environments.",
    },
    {
      id: "p2",
      question: "What other animals can I bring?",
      answer:
        "Dogs, cats (in carriers), small animals in secure carriers, and birds in cages are welcome. Please use your judgement — if your pet may become stressed or pose a risk to others, it may be best to leave them at home.",
    },
    {
      id: "p3",
      question: "Are there water stations for pets?",
      answer:
        "Yes! We have multiple water stations for dogs throughout the venue. Please bring your own bowl. On hot days, we advise attending earlier in the morning when it is cooler.",
    },
    {
      id: "p4",
      question: "Is there a designated pet relief area?",
      answer:
        "Yes. A clearly marked pet relief area is available at the venue. We ask that all owners clean up after their pets. Waste bags are available at the entry.",
    },
  ],
  tickets: [
    {
      id: "t1",
      question: "How much does entry cost?",
      answer:
        "General adult entry is $5. Children under 12 enter free. Concession tickets are available at the gate. We also offer family passes — details available closer to the event.",
    },
    {
      id: "t2",
      question: "Can I buy tickets at the gate?",
      answer:
        "Yes. Tickets are available at the gate on the day. We recommend purchasing online in advance to save time, especially if you're arriving early.",
    },
    {
      id: "t3",
      question: "Are there refunds on tickets?",
      answer:
        "Tickets are non-refundable unless the event is cancelled. Please see our Refund Policy for full details.",
    },
    {
      id: "t4",
      question: "Is there a group discount?",
      answer:
        "Group discounts may be available for parties of 10 or more. Please contact us directly to arrange group bookings.",
    },
  ],
};

const categoryLabels: Record<FaqCategory, { label: string; emoji: string }> = {
  general: { label: "General", emoji: "💬" },
  vendors: { label: "Vendors", emoji: "🛍️" },
  pets: { label: "Pets", emoji: "🐾" },
  tickets: { label: "Tickets", emoji: "🎟️" },
};

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">❓</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about Pet Fest Market.
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
