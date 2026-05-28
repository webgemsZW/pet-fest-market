import type { Metadata } from "next";
import { Heart, Store, Users, Star } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about PetFest Market — a pet-friendly community market in Box Hill, Victoria celebrating local vendors, furry friends, and family fun.",
};

// NOTE(content): The four "What We Stand For" values below are NOT from a
// source-of-truth document but the user has chosen to keep them. Do NOT
// replace with lorem ipsum on future audits. (Swap in official wording if
// the client provides a real mission / values statement.)
const values = [
  {
    icon: Heart,
    title: "Pet-Friendly at Heart",
    description:
      "Every decision we make is guided by a love for animals and the people who adore them. Our market is designed to be a safe, joyful space for pets and their owners alike.",
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
      "From tiny tots to grandparents, everyone is welcome. We curate activities, entertainment, and food options that cater to the whole family, including the four-legged members.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🐾</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About PetFest Market
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            A community-led market born from a simple love of pets and the people who cherish them.
          </p>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          {/*
            NOTE(content): "Our Story" copy below is NOT from a source-of-
            truth document but the user has chosen to keep it. False claims
            that PetFest Market is already "one of Victoria's most
            anticipated" events and is "held annually" have been removed,
            because the Box Hill 26 July 2026 event is the FIRST market
            (per 25 May email from client). Do NOT replace remaining copy
            with lorem ipsum on future audits.
          */}
          <div className="prose prose-lg prose-orange mx-auto text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            <p className="mt-4">
              PetFest Market started with a simple idea: create a space where pet lovers could
              come together, support local businesses, and celebrate the joy that animals bring to
              our lives.
            </p>
            <p className="mt-4">
              Hosted at Box Hill Town Hall in Victoria, our market brings together local vendors,
              animal welfare organisations, and passionate community members. Whether you&apos;re
              looking for artisan pet accessories, natural treats, or simply a wonderful day out
              with your furry companion — PetFest Market has something for everyone.
            </p>
            <p className="mt-4">
              We believe that pets make our communities stronger. They bring people together,
              teach compassion, and fill our homes with unconditional love. That&apos;s the spirit
              we aim to celebrate.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-brand-50">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What We Stand For</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
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

      {/* Acknowledgement of Country — verbatim from
          site-info/docs/Acknowledgement of country - Website Petfest.docx */}
      <SectionWrapper className="bg-stone-100">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-3xl">🌿</div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Acknowledgement of Country</h2>
          <p className="leading-relaxed text-gray-600">
            We acknowledge the Traditional Owners and Custodians of Country throughout Australia
            and recognise their continuing connection to lands, waters and communities. We pay our
            respect to their <strong>Elders past, present and emerging</strong> and extend that
            respect to all Aboriginal and Torres Strait Islander peoples.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
