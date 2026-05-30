import React from "react";
import { getHomepage } from "@/lib/sanity/get-homepage";
import { MailingListForm } from "./MailingListForm";

const FALLBACK_HEADING = "Don't miss a thing";
const FALLBACK_BODY =
  "Be the first to hear about vendor announcements, event updates, and exclusive offers.";

/**
 * Server wrapper — fetches the editable heading + body from the
 * Homepage document and passes them to the client-side form below.
 * Split this way so the form's `useState` stays in a Client Component
 * while the fetch lives in the server tree.
 */
export async function MailingListSection() {
  const homepage = await getHomepage();
  const heading = homepage?.mailingListHeading?.trim() || FALLBACK_HEADING;
  const body = homepage?.mailingListBody?.trim() || FALLBACK_BODY;

  return (
    <section
      id="mailing-list"
      className="bg-gradient-to-br from-brand-100 to-brand-100 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <div className="mb-4 text-4xl">📬</div>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-lg text-gray-600">{body}</p>
        <MailingListForm />
        <p className="mt-4 text-xs text-gray-400">No spam, ever. Unsubscribe any time.</p>
      </div>
    </section>
  );
}
