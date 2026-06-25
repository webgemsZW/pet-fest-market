"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAILCHIMP } from "@/lib/site-defaults";

/**
 * Footer newsletter signup. Same MailChimp pattern as the homepage's
 * MailingListForm: POSTs directly to MailChimp with target="_blank",
 * shows a brief local confirmation in the footer column once
 * submitted. See src/components/sections/MailingListForm.tsx for the
 * full explanation.
 */
export function FooterNewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="text-sm text-brand-200">
        🎉 Almost there — check your inbox to confirm.
      </p>
    );
  }

  return (
    <form
      action={MAILCHIMP.actionUrl}
      method="POST"
      target="_blank"
      onSubmit={() => setSubmitted(true)}
      className="flex flex-col gap-2"
    >
      <Input
        type="email"
        name="EMAIL"
        placeholder="your@email.com.au"
        required
        aria-label="Email address"
        className="border-brand-700 bg-brand-800 text-white placeholder:text-brand-500 focus-visible:ring-brand-400"
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
  );
}
