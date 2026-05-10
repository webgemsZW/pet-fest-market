import React from "react";
import { CountdownTimer } from "@/components/shared/CountdownTimer";

export function CountdownSection() {
  return (
    <section className="bg-gradient-to-r from-teal-600 to-teal-800 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-200">
          Mark your calendar
        </p>
        <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
          4 July 2026 — The countdown is on!
        </h2>
        <CountdownTimer />
        <p className="mt-8 text-teal-200">
          📍 Box Hill, Victoria &nbsp;·&nbsp; Entry from $5
        </p>
      </div>
    </section>
  );
}
