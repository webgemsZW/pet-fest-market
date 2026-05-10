import type { Metadata } from "next";
import { Heart, Store, Users, Star } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Pet Fest Market — a pet-friendly community market in Box Hill, Victoria celebrating local vendors, furry friends, and family fun.",
};

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
      "Pet Fest Market is more than a shopping event — it's a gathering. We create a welcoming atmosphere where neighbours meet, friendships form, and memories are made.",
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
      <section className="bg-gradient-to-br from-teal-50 to-sage-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">🐾</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About Pet Fest Market
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            A community-led market born from a simple love of pets and the people who cherish them.
          </p>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg prose-teal mx-auto text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            <p className="mt-4">
              Pet Fest Market started with a simple idea: create a space where pet lovers could
              come together, support local businesses, and celebrate the joy that animals bring to
              our lives. What began as a small neighbourhood initiative has grown into one of
              Victoria&apos;s most anticipated pet community events.
            </p>
            <p className="mt-4">
              Held annually in the heart of Box Hill, our market brings together dozens of local
              vendors, animal welfare organisations, and passionate community members. Whether
              you&apos;re looking for artisan pet accessories, natural treats, or simply a
              wonderful day out with your furry companion — Pet Fest Market has something for
              everyone.
            </p>
            <p className="mt-4">
              We believe that pets make our communities stronger. They bring people together,
              teach compassion, and fill our homes with unconditional love. That&apos;s the spirit
              we aim to celebrate every single year.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-teal-50">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What We Stand For</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                <value.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">{value.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Welcome to Country */}
      <SectionWrapper className="bg-stone-100">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-3xl">🌿</div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Welcome to Country</h2>
          <p className="leading-relaxed text-gray-600">
            Pet Fest Market acknowledges the{" "}
            <strong>Wurundjeri Woi Wurrung People of the Kulin Nation</strong> as the Traditional
            Custodians of the land on which our event takes place in Box Hill, Victoria. We pay our
            deepest respects to Elders past, present, and emerging. We celebrate the ongoing living
            cultures of First Nations Peoples across Australia and recognise their enduring
            connection to Country.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
