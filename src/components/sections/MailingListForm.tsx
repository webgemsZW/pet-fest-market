"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAILCHIMP } from "@/lib/site-defaults";

/**
 * Inline email-capture form used by the home page mailing-list section.
 *
 * Submissions POST directly to MailChimp's hosted signup endpoint with
 * target="_blank". MailChimp opens its hosted confirmation page in a
 * new tab; the original tab shows a thank-you message below the form.
 *
 * Fields:
 *   - EMAIL (required) — MailChimp's required merge field
 *   - FNAME, LNAME (optional) — first / last name merge fields. MailChimp
 *     audiences ship with these by default; if the editor ever removes
 *     them from the audience schema in MailChimp, the submission still
 *     succeeds (MailChimp ignores unknown merge fields).
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
        className="mt-8 grid gap-3 sm:grid-cols-2"
      >
        <Input
          type="text"
          name="FNAME"
          placeholder="First name"
          aria-label="First name"
          autoComplete="given-name"
        />
        <Input
          type="text"
          name="LNAME"
          placeholder="Last name"
          aria-label="Last name"
          autoComplete="family-name"
        />
        <Input
          type="email"
          name="EMAIL"
          placeholder="your@email.com.au"
          required
          aria-label="Email address"
          autoComplete="email"
          className="sm:col-span-2"
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
        <Button type="submit" size="default" className="sm:col-span-2">
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
