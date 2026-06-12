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
   The Stallholder page is intentionally minimal: a single hero with
   the heading, an optional intro line, and the Apply Here button.

   - 2 June 2026: stripped out benefits / pricing / requirements /
     vendor FAQs / standalone apply section.
   - 3 June 2026 (afternoon): "Have Questions?" button removed per
     Andrea's request — visitors who have questions can use the
     Contact page or the email in the footer.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_HEADING = "Become a Stallholder";
const FALLBACK_INTRO: string | null = null;

export default async function StallHoldersPage() {
  const [page, siteSettings] = await Promise.all([getStallHolderPage(), getSiteSettings()]);

  const heading = page?.heading?.trim() || FALLBACK_HEADING;
  const intro = page?.intro?.trim() || FALLBACK_INTRO;

  // Apply URL: prefer the per-event URL from Sanity; fall back to the
  // hardcoded default in src/lib/site-defaults.ts so this button
  // always works even before Sanity is populated.
  const applyUrl = siteSettings?.currentEvent?.applyUrl?.trim() || DEFAULT_APPLY_URL;

  return (
    <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-4 text-5xl">🛍️</div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{heading}</h1>
        {intro && <p className="mt-4 text-xl text-gray-600">{intro}</p>}

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <a href={applyUrl} target="_blank" rel="noopener noreferrer">
              Apply Here
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
