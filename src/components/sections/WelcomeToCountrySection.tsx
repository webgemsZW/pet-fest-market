import React from "react";

export function WelcomeToCountrySection() {
  return (
    <section className="bg-stone-100 py-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-3 text-2xl">🌿</div>
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Welcome to Country</h2>
        <p className="leading-relaxed text-gray-600">
          Pet Fest Market acknowledges the{" "}
          <strong>Wurundjeri Woi Wurrung People of the Kulin Nation</strong> as the Traditional
          Custodians of the land on which our event takes place. We pay our deepest respects to
          Elders past, present, and emerging, and celebrate the ongoing living cultures of First
          Nations Peoples across Australia.
        </p>
      </div>
    </section>
  );
}
