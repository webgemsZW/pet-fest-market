"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAILCHIMP } from "@/lib/site-defaults";

/**
 * Inline email-capture form used by the home page mailing-list section.
 *
 * Submissions POST directly to MailChimp's hosted signup endpoint with
 * target="_blank" — MailChimp opens its confirmation page in a new
 * tab, while this tab flips to a local "check your inbox" state. From
 * the visitor's point of view they:
 *   1. Type their email here
 *   2. Click Subscribe
 *   3. See "Almost there!" on this page + a MailChimp confirmation tab
 *   4. Confirm via the double-opt-in email MailChimp sends them
 *
 * No email addresses are stored on the PetFest side — MailChimp owns
 * the list. Configuration lives in src/lib/site-defaults.ts.
 */
export function MailingListForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand-100">
        <div className="text-3xl">🎉</div>
        <p className="mt-3 text-lg font-semibold text-gray-900">Almost there!</p>
        <p className="mt-1 text-gray-500">
          Check your inbox to confirm your subscription. We&apos;ve opened the MailChimp
          confirmation page for you in a new tab.
        </p>
      </div>
    );
  }

  return (
    <form
      action={MAILCHIMP.actionUrl}
      method="POST"
      target="_blank"
      onSubmit={() => {
        // Native form submit proceeds in the new tab; we just flip our
        // local UI to the thank-you state so the visitor knows the
        // click registered.
        setSubmitted(true);
      }}
      className="mt-8 flex flex-col gap-3 sm:flex-row"
    >
      <Input
        type="email"
        name="EMAIL"
        placeholder="your@email.com.au"
        required
        aria-label="Email address"
        className="flex-1"
      />
      {/*
        MailChimp's honeypot — the input must exist in the submission
        but stay empty. Bots that auto-fill all visible inputs fill it
        in; MailChimp then drops the submission as spam. Position it
        completely off-screen + hide from screen readers + skip tab order.
      */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-5000px" }}
      >
        <input
          type="text"
          name={MAILCHIMP.honeypotName}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <Button type="submit" size="default" className="sm:w-auto">
        Subscribe
      </Button>
    </form>
  );
}
