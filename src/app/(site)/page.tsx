import { HeroSection } from "@/components/sections/HeroSection";
import { EventSummarySection } from "@/components/sections/EventSummarySection";
// SponsorPreviewSection is commented out — we have no confirmed sponsors
// yet. Re-import + re-add to the page below once the client signs the
// first sponsor and supplies their logo/name/tier.
// import { SponsorPreviewSection } from "@/components/sections/SponsorPreviewSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { MailingListSection } from "@/components/sections/MailingListSection";

// NOTE: The Acknowledgement of Country lives in the global Footer (see
// Footer.tsx) so it appears on every page.
//
// The home page is deliberately event-agnostic: the hero is brand + a
// directory of city badges (Homepage → cities), not any single event.
// Per-event details (dates, tickets, countdown, JSON-LD) live on the
// city listings and the individual /events/<slug> pages.

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventSummarySection />
      {/* TODO(content): <SponsorPreviewSection /> hidden until we have real sponsors. */}
      <FaqSection />
      <MailingListSection />
    </>
  );
}
