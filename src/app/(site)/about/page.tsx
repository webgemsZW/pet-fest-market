import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getAboutPage } from "@/lib/sanity/get-about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "PetFest Market — a fun community indoor market bringing together makers, creators and small businesses showcasing all kinds of pet products, goods and services.",
};

/* ──────────────────────────────────────────────────────────────────
   Fallback content sourced verbatim from
   `site-info/docs/About.docx` (provided by the client on 2 June 2026).
   The previous longer "Our Story" + values cards layout was removed
   on the client's request — they wanted something simple while the
   market establishes itself.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_HEADING = "About";

const FALLBACK_BODY_PARAGRAPHS = [
  "PetFest Market is a fun community indoor market bringing together makers, creators and small businesses showcasing all kinds of pet products, goods and services.",
  "From treats and toys, to accessories, handmade products and gifts. It is the perfect event for pet lovers to shop, discover and support local businesses.",
];

export default async function AboutPage() {
  const data = await getAboutPage();
  const heading = data?.heading?.trim() || FALLBACK_HEADING;
  const hasSanityBody = Array.isArray(data?.body) && data!.body!.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🐾</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{heading}</h1>
        </div>
      </section>

      {/* Body */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg prose-orange mx-auto text-gray-600">
            {hasSanityBody ? (
              <PortableText value={data!.body!} />
            ) : (
              FALLBACK_BODY_PARAGRAPHS.map((p, i) => (
                <p key={i} className={i === 0 ? "" : "mt-4"}>
                  {p}
                </p>
              ))
            )}
          </div>
        </div>
      </SectionWrapper>

      {/*
        Acknowledgement of Country intentionally NOT duplicated here — it
        lives in the global Footer (see Footer.tsx) so it already appears
        on this page.
      */}
    </>
  );
}
