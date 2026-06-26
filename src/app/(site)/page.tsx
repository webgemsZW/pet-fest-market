import { HeroSection } from "@/components/sections/HeroSection";
import { EventSummarySection } from "@/components/sections/EventSummarySection";
// CountdownSection has been folded into HeroSection — the timer now lives
// in the hero itself (see <CountdownTimer variant="light" /> inside
// HeroSection.tsx). The CountdownSection component file is kept in the
// codebase in case we want a dedicated dark-banner countdown again later.
// import { CountdownSection } from "@/components/sections/CountdownSection";
//
// VendorCtaSection ("Grow your business at PetFest Market") was removed
// from the homepage per the 2 June 2026 client revision — the market
// is intentionally simple at launch. The component file is kept in the
// codebase so it can be brought back if/when the market scales.
// import { VendorCtaSection } from "@/components/sections/VendorCtaSection";
//
// SponsorPreviewSection is commented out — we have no confirmed sponsors
// yet. Re-import + re-add to the page below once the client signs the
// first sponsor and supplies their logo/name/tier.
// import { SponsorPreviewSection } from "@/components/sections/SponsorPreviewSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { MailingListSection } from "@/components/sections/MailingListSection";
import { EventStructuredData } from "@/components/seo/EventStructuredData";

// NOTE: The Acknowledgement of Country lives in the global Footer (see
// Footer.tsx) so it appears on every page.

export default function HomePage() {
  return (
    <>
      {/* Invisible to humans — emits a JSON-LD script tag that lets
          Google show this event as a rich result in search. Reads from
          the Sanity current-event document, so updates flow through
          automatically when Andrea changes it. */}
      <EventStructuredData />

      <HeroSection />
      <EventSummarySection />
      {/* TODO(content): <VendorCtaSection /> hidden until the market grows. */}
      {/* TODO(content): <SponsorPreviewSection /> hidden until we have real sponsors. */}
      <FaqSection />
      <MailingListSection />
    </>
  );
}
