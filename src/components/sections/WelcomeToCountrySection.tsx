import React from "react";

export function WelcomeToCountrySection() {
  return (
    <section className="bg-stone-100 py-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-3 text-2xl">🌿</div>
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Welcome to Country</h2>
        <p className="leading-relaxed text-gray-600">
          We acknowledge the Traditional Owners and Custodians of Country throughout Australia and
          recognise their continuing connection to lands, waters and communities. We pay our respect
          to their <strong>Elders past, present and emerging</strong> and extend that respect to all
          Aboriginal and Torres Strait Islander peoples.
        </p>
      </div>
    </section>
  );
}
