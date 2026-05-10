import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const perks = [
  "Affordable stall fees starting from $80",
  "High foot traffic in a popular community location",
  "Pet-loving, engaged audience",
  "All product categories welcome",
  "Easy online application process",
  "Support from our friendly team",
];

export function VendorCtaSection() {
  return (
    <SectionWrapper className="bg-teal-50">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-teal-100">
          <div className="grid md:grid-cols-2">
            {/* Left: content */}
            <div className="p-8 lg:p-12">
              <div className="mb-4 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
                Vendor Applications Open
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Grow your business at Pet Fest Market
              </h2>
              <p className="mt-3 text-gray-500">
                Join a curated group of talented local vendors at one of Victoria&apos;s most
                loved pet community events. Applications are now open for the July 2026 market.
              </p>

              <ul className="mt-6 space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal-500"
                      aria-hidden="true"
                    />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/stall-holders#apply">Apply Now</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/stall-holders">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Right: decorative */}
            <div className="flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-700 p-12 text-center text-white">
              <div>
                <div className="text-7xl">🛍️</div>
                <p className="mt-4 text-2xl font-bold">Stalls from $80</p>
                <p className="mt-1 text-teal-200">Limited spots available</p>
                <div className="mt-6 rounded-full bg-white/20 px-6 py-3 text-sm font-medium">
                  4 July 2026 · Box Hill, VIC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
