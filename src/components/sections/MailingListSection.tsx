"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MailingListSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section
      id="mailing-list"
      className="bg-gradient-to-br from-sage-100 to-teal-100 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <div className="mb-4 text-4xl">📬</div>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Don&apos;t miss a thing
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Be the first to hear about vendor announcements, event updates, and exclusive offers.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-teal-100">
            <div className="text-3xl">🎉</div>
            <p className="mt-3 text-lg font-semibold text-gray-900">You&apos;re on the list!</p>
            <p className="mt-1 text-gray-500">We&apos;ll be in touch with all the good stuff.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="your@email.com.au"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="flex-1"
            />
            <Button type="submit" size="default" className="sm:w-auto">
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-gray-400">
          No spam, ever. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
