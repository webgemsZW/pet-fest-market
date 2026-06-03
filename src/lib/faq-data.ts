/*
  Hardcoded fallback FAQ content used when Sanity is unreachable, env
  vars are unset, or no FAQ Items have been published yet.

  Source of truth: site-info/docs/Website FAQs - PetFest.docx
  (provided by the client on 2 June 2026). The earlier lorem-ipsum
  placeholder list has been replaced with the actual copy so the
  deployed site shows something real even before any Sanity content
  exists.

  When an editor publishes their first FAQ Item in Studio, the
  fallback drops out and the Sanity-driven list takes over.

  IMPORTANT: visitors CANNOT bring pets to the Box Hill venue. The
  "Can I bring my animals?" entry below reflects that — do not edit
  it to imply otherwise (see CLAUDE.md).
*/

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: "what-is",
    question: "What is PetFest Market?",
    answer: "PetFest Market is a local regional Pet Market.",
  },
  {
    id: "real-animals",
    question: "Will there be real animals at the PetFest Markets?",
    answer:
      "Yes! There will be animal displays at PetFest Markets as we are hoping to showcase rescues and where possible if venues allow have some breed displays.",
  },
  {
    id: "animal-safety",
    question: "Is it safe for these animals to be at PetFest Market days?",
    answer:
      "All animals are checked upon entry and are only allowed to enter if they are in good health. Animals will be closely monitored by their owners or handlers to ensure they are comfortable at all times.",
  },
  {
    id: "bring-animals",
    question: "Can I bring my animals?",
    answer:
      "Unfortunately, no, not at some market venues. All PetFest Markets are held indoors. (However, some venues may allow you to bring your dog with you. Please see individual Market venue information prior to coming.)",
  },
  {
    id: "kids-infants",
    question: "Are kids and infants welcome?",
    answer:
      "Yes! Children under 16 are free to enter the PetFest Markets! Parent or guardian supervision is required at all times and young persons ages 16 and under are unable to enter the event without an accompanying adult.",
  },
  {
    id: "tickets-cost",
    question: "How much are PetFest Tickets?",
    answer:
      "PetFest entry tickets are $8 and concession tickets are $5. All children 16 and under are free.",
  },
  {
    id: "concession-seniors",
    question: "Will the PetFest Markets accept my Concession or Seniors Card?",
    answer:
      "Yes! At all PetFest Markets Concession Cards and Seniors Cards can be used to purchase tickets.",
  },
  {
    id: "companion-card",
    question: "Will the PetFest Markets accept my Companion Card?",
    answer:
      "Yes. State approved Companions Cards will allow the companion of the card holder free entry into the event.",
  },
  {
    id: "other-costs",
    question: "Will there be other costs for me, once I am inside the PetFest Market?",
    answer:
      "Your ticket is entry into the PetFest Market — any additional expenses once inside are up to you! Food and drinks will be available for sale and our Stallholders will be stocked full of goodies available to purchase should you choose to do so.",
  },
  {
    id: "adopt-pets",
    question: "Will I be able to adopt pets from the PetFest Markets?",
    answer:
      "No. No pets will be available for adoption from the event, however you will be able to see pets and you may be able to get information on registered breeders and rescue organisations where you can adopt your new pet after the market.",
  },
  {
    id: "photos-video",
    question: "Can I bring my own camera and take photographs or video at the PetFest Markets?",
    answer:
      "Yes you can however please ensure you get expressed verbal consent from all individuals that you feature in photographs.",
  },
];

// `previewFaqs` was removed when the home page switched from a 4-item
// FAQ preview to showing the full list (3 June 2026 client revision —
// see CHANGELOG.md). The full `faqData` array above is the only
// fallback consumers need now.
