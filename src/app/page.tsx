import { HeroSection } from "@/components/sections/HeroSection";
import { EventSummarySection } from "@/components/sections/EventSummarySection";
// CountdownSection has been folded into HeroSection — the timer now lives
// in the hero itself (see <CountdownTimer variant="light" /> inside
// HeroSection.tsx). The CountdownSection component file is kept in the
// codebase in case we want a dedicated dark-banner countdown again later.
// import { CountdownSection } from "@/components/sections/CountdownSection";
import { VendorCtaSection } from "@/components/sections/VendorCtaSection";
// TODO(content): SponsorPreviewSection is commented out — we have no
// confirmed sponsors yet. Re-import + re-add to the page below once the
// client signs the first sponsor and supplies their logo/name/tier.
// import { SponsorPreviewSection } from "@/components/sections/SponsorPreviewSection";
import { FaqPreviewSection } from "@/components/sections/FaqPreviewSection";
import { MailingListSection } from "@/components/sections/MailingListSection";

// NOTE: The Acknowledgement of Country lives in the global Footer (see
// Footer.tsx) so it appears on every page. Do not re-add
// <WelcomeToCountrySection /> here — that would duplicate it on the home
// page. The WelcomeToCountrySection component still exists in case we
// want a more prominent in-page acknowledgement on a specific page later.

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventSummarySection />
      <VendorCtaSection />
      {/* TODO(content): <SponsorPreviewSection /> hidden until we have real sponsors. */}
      <FaqPreviewSection />
      <MailingListSection />
    </>
  );
}
