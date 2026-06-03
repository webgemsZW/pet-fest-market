import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStallHolderPage } from "@/lib/sanity/get-stall-holder-page";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";
import { DEFAULT_APPLY_URL } from "@/lib/site-defaults";

export const metadata: Metadata = {
  title: "Stallholders",
  description:
    "Apply to be a Stallholder at PetFest Market. Follow the link to our online application form.",
};

/* ──────────────────────────────────────────────────────────────────
   Per the 3 June 2026 client revision, the Stallholder page is now
   just a single hero with two buttons: Apply Here (opens the Google
   Form) and Have Questions? (mailto). The old "Apply" section at the
   bottom of the page has been removed — it was a duplicate of the
   hero button.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_HEADING = "Become a Stallholder";
const FALLBACK_INTRO: string | null = null;
const FALLBACK_CONTACT_EMAIL = "petfest@nonconformity.com.au";

export default async function StallHoldersPage() {
  const [page, siteSettings] = await Promise.all([getStallHolderPage(), getSiteSettings()]);

  const heading = page?.heading?.trim() || FALLBACK_HEADING;
  const intro = page?.intro?.trim() || FALLBACK_INTRO;

  // Apply URL: prefer the per-event URL from Sanity; fall back to the
  // hardcoded default in src/lib/site-defaults.ts so this button
  // always works even before Sanity is populated.
  const applyUrl = siteSettings?.currentEvent?.applyUrl?.trim() || DEFAULT_APPLY_URL;
  const contactEmail = siteSettings?.contactEmail?.trim() || FALLBACK_CONTACT_EMAIL;

  return (
    <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-4 text-5xl">🛍️</div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{heading}</h1>
        {intro && <p className="mt-4 text-xl text-gray-600">{intro}</p>}

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <a href={applyUrl} target="_blank" rel="noopener noreferrer">
              Apply Here
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={`mailto:${contactEmail}`}>Have Questions?</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
