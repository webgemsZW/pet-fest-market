"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Inline email-capture form used by the home page mailing-list section.
 *
 * TODO(integration): currently does NOT submit anywhere — the form just
 * shows a thank-you state on the client. When the MailChimp account (or
 * other mailing-list platform) is available, swap the submit handler
 * for a real POST to /api/subscribe (or whichever endpoint we wire up).
 */
export function MailingListForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand-100">
        <div className="text-3xl">🎉</div>
        <p className="mt-3 text-lg font-semibold text-gray-900">You&apos;re on the list!</p>
        <p className="mt-1 text-gray-500">We&apos;ll be in touch with all the good stuff.</p>
      </div>
    );
  }

  return (
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
  );
}
