import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { Heart, Store, Users, Star } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Icon } from "@/lib/icon-registry";
import { getAboutPage, type AboutPageValue } from "@/lib/sanity/get-about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about PetFest Market — an indoor community market for pet lovers at Box Hill Town Hall, Victoria, celebrating local vendors and the pet community.",
};

/* ──────────────────────────────────────────────────────────────────
   Fallback content used when Sanity is unreachable, env vars unset,
   or no aboutPage document has been published yet. The original
   hand-written copy from the pre-CMS site lives here so the page
   always renders cleanly. NOTE(content): the user has chosen to keep
   this fallback copy — do not replace with lorem ipsum on audits.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_HEADING = "About PetFest Market";
const FALLBACK_SUBHEADING =
  "A community-led market born from a simple love of pets and the people who cherish them.";

const FALLBACK_STORY_PARAGRAPHS = [
  "PetFest Market started with a simple idea: create a space where pet lovers could come together, support local businesses, and celebrate the joy that animals bring to our lives.",
  "Hosted at Box Hill Town Hall in Victoria, our market brings together local vendors, animal welfare organisations, and passionate community members. Whether you're looking for artisan pet accessories, natural treats, or simply a wonderful day out celebrating the animals you love — PetFest Market has something for everyone.",
  "We believe that pets make our communities stronger. They bring people together, teach compassion, and fill our homes with unconditional love. That's the spirit we aim to celebrate.",
];

const FALLBACK_VALUES: Array<{
  icon: typeof Heart;
  title: string;
  description: string;
}> = [
  {
    icon: Heart,
    title: "Pets at Heart",
    description:
      "Every decision we make is guided by a love for animals and the people who adore them. Our market is designed to celebrate pets and the community of people who care for them.",
  },
  {
    icon: Store,
    title: "Supporting Local Vendors",
    description:
      "We champion small businesses and independent creators. Our market gives local artisans, pet product makers, and food vendors a platform to connect with a passionate community.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "PetFest Market is more than a shopping event — it's a gathering. We create a welcoming atmosphere where neighbours meet, friendships form, and memories are made.",
  },
  {
    icon: Star,
    title: "Family-Friendly Always",
    description:
      "From tiny tots to grandparents, everyone is welcome. We curate activities, entertainment, and food options that cater to the whole family.",
  },
];

export default async function AboutPage() {
  const data = await getAboutPage();

  const heading = data?.heading?.trim() || FALLBACK_HEADING;
  const subheading = data?.subheading?.trim() || FALLBACK_SUBHEADING;
  const hasSanityStory = Array.isArray(data?.story) && data!.story!.length > 0;
  const sanityValues: AboutPageValue[] = data?.values?.filter((v) => v?.title && v?.description) ?? [];
  const useSanityValues = sanityValues.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🐾</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{heading}</h1>
          <p className="mt-4 text-xl text-gray-600">{subheading}</p>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg prose-orange mx-auto text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            {hasSanityStory ? (
              <PortableText value={data!.story!} />
            ) : (
              FALLBACK_STORY_PARAGRAPHS.map((p, i) => (
                <p key={i} className="mt-4">
                  {p}
                </p>
              ))
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-brand-50">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What We Stand For</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {useSanityValues
            ? sanityValues.map((value, idx) => (
                <div
                  key={`${value.title}-${idx}`}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                    <Icon name={value.icon} fallback="sparkles" className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{value.description}</p>
                </div>
              ))
            : FALLBACK_VALUES.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{value.description}</p>
                </div>
              ))}
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
