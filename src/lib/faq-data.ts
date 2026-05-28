/*
  Single source of truth for FAQ content.

  Both the homepage preview (`FaqPreviewSection`) and the full `/faq` page
  read from this file so they cannot drift apart.

  TODO(content): Every FAQ entry below is placeholder lorem ipsum. The
  previous hand-written versions invented event hours (9am–4pm), entry
  pricing ($5 adult / free under-12), bump-in times, pet rules, parking,
  accessibility answers, refund terms, and similar — none of which are
  confirmed by the client. The old "When and where" answer even said the
  WRONG date ("4 July 2026" instead of the actual Sunday 26 July 2026 per
  CLAUDE.md + 25 May email from client). The old "Pets" category answered
  questions like "Can I bring my dog?" with YES — that is WRONG. Visitors
  CANNOT bring pets to PetFest Market at Box Hill Town Hall (see
  CLAUDE.md). When repopulating the "pets" category, do not write content
  that implies pets are allowed at the venue. Replace each question +
  answer with real content from the client once provided.
*/

export type FaqCategory = "general" | "vendors" | "pets" | "tickets";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: Record<FaqCategory, FaqItem[]> = {
  general: [
    {
      id: "g1",
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      id: "g2",
      question: "Ut enim ad minim veniam?",
      answer:
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
    {
      id: "g3",
      question: "Duis aute irure dolor?",
      answer:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "g4",
      question: "Sed ut perspiciatis unde omnis?",
      answer:
        "Iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
    },
    {
      id: "g5",
      question: "Nemo enim ipsam voluptatem?",
      answer:
        "Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
  ],
  vendors: [
    {
      id: "v1",
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
    },
    {
      id: "v2",
      question: "Ut labore et dolore magnam aliquam?",
      answer:
        "Quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    },
    {
      id: "v3",
      question: "Quis autem vel eum iure?",
      answer:
        "Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
    },
    {
      id: "v4",
      question: "At vero eos et accusamus?",
      answer:
        "Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint.",
    },
  ],
  pets: [
    {
      id: "p1",
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    },
    {
      id: "p2",
      question: "Et harum quidem rerum facilis?",
      answer:
        "Est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
    },
    {
      id: "p3",
      question: "Temporibus autem quibusdam et aut?",
      answer:
        "Officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    },
    {
      id: "p4",
      question: "Itaque earum rerum hic tenetur?",
      answer:
        "A sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    },
  ],
  tickets: [
    {
      id: "t1",
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ticketing details still to be confirmed by the client (per 25 May email).",
    },
    {
      id: "t2",
      question: "Ut enim ad minim veniam?",
      answer:
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "t3",
      question: "Duis aute irure dolor?",
      answer:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "t4",
      question: "Sed ut perspiciatis unde omnis?",
      answer:
        "Iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    },
  ],
};

export const categoryLabels: Record<FaqCategory, { label: string; emoji: string }> = {
  general: { label: "General", emoji: "💬" },
  vendors: { label: "Vendors", emoji: "🛍️" },
  pets: { label: "Pets", emoji: "🐾" },
  tickets: { label: "Tickets", emoji: "🎟️" },
};

/**
 * The first item from each category — used as the homepage FAQ preview so
 * the preview always stays consistent with the full FAQ page. If you want
 * a different curation strategy (e.g. hand-picked highlights), change this
 * derivation rather than re-hardcoding the questions elsewhere.
 */
export const previewFaqs: FaqItem[] = (Object.keys(faqData) as FaqCategory[])
  .map((cat) => faqData[cat][0])
  .filter((item): item is FaqItem => Boolean(item));
