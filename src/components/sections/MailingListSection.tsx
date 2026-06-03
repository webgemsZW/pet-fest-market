import React from "react";
import { getHomepage } from "@/lib/sanity/get-homepage";
import { MailingListForm } from "./MailingListForm";

// Per the 2 June 2026 client revision, the mailing-list section no
// longer carries a "Be the first to hear about..." body paragraph.
// The subscribe form is open to anyone and links to MailChimp.
const FALLBACK_HEADING = "Get Updates on PetFest news and events";

/**
 * Server wrapper — fetches the editable heading from the Homepage
 * document and renders the client-side form below.
 */
export async function MailingListSection() {
  const homepage = await getHomepage();
  const heading = homepage?.mailingListHeading?.trim() || FALLBACK_HEADING;

  return (
    <section
      id="mailing-list"
      className="bg-gradient-to-br from-brand-100 to-brand-100 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <div className="mb-4 text-4xl">📬</div>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{heading}</h2>
        <MailingListForm />
        <p className="mt-4 text-xs text-gray-400">No spam, ever. Unsubscribe any time.</p>
      </div>
    </section>
  );
}
