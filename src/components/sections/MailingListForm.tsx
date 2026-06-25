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
 * tab. A small "Almost there!" message appears beneath the form so the
 * visitor has an in-page confirmation that their click registered.
 *
 * Important — the form stays mounted after submission. Earlier we
 * tried to replace the form with the thank-you message, but doing so
 * unmounted the form before the browser fired the native submit
 * (Chrome warned: "Form submission canceled because the form is not
 * connected"). Keeping the form in the DOM lets the native POST
 * complete reliably.
 */
export function MailingListForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <form
        action={MAILCHIMP.actionUrl}
        method="POST"
        target="_blank"
        onSubmit={() => setSubmitted(true)}
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

      {submitted && (
        <div
          role="status"
          className="mt-6 rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-brand-100"
        >
          <p className="text-lg font-semibold text-gray-900">🎉 Almost there!</p>
          <p className="mt-1 text-sm text-gray-500">
            Check your inbox to confirm your subscription — the MailChimp confirmation page just
            opened in a new tab.
          </p>
        </div>
      )}
    </>
  );
}
