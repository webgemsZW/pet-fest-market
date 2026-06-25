"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAILCHIMP } from "@/lib/site-defaults";

/**
 * Footer newsletter signup. Same MailChimp pattern as the homepage's
 * MailingListForm — see that file for full notes. In particular:
 *   - The form stays mounted after submission so the native POST has
 *     time to fire (unmounting mid-submit silently cancels the request).
 *   - FNAME and LNAME are optional merge fields; if the visitor leaves
 *     them blank, MailChimp just records the email with empty names.
 */
export function FooterNewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const darkInput =
    "border-brand-700 bg-brand-800 text-white placeholder:text-brand-500 focus-visible:ring-brand-400";

  return (
    <>
      <form
        action={MAILCHIMP.actionUrl}
        method="POST"
        target="_blank"
        onSubmit={() => setSubmitted(true)}
        className="flex flex-col gap-2"
      >
        <Input
          type="text"
          name="FNAME"
          placeholder="First name"
          aria-label="First name"
          autoComplete="given-name"
          className={darkInput}
        />
        <Input
          type="text"
          name="LNAME"
          placeholder="Last name"
          aria-label="Last name"
          autoComplete="family-name"
          className={darkInput}
        />
        <Input
          type="email"
          name="EMAIL"
          placeholder="your@email.com.au"
          required
          aria-label="Email address"
          autoComplete="email"
          className={darkInput}
        />
        {/* MailChimp honeypot — see MailingListForm for explanation. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
          <input
            type="text"
            name={MAILCHIMP.honeypotName}
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>
        <Button type="submit" variant="secondary" className="w-full">
          Subscribe
        </Button>
      </form>

      {submitted && (
        <p role="status" className="mt-3 text-sm text-brand-200">
          🎉 Almost there — check your inbox to confirm.
        </p>
      )}
    </>
  );
}
