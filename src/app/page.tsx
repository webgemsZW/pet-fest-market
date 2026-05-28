import { HeroSection } from "@/components/sections/HeroSection";
import { EventSummarySection } from "@/components/sections/EventSummarySection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { VendorCtaSection } from "@/components/sections/VendorCtaSection";
// TODO(content): SponsorPreviewSection is commented out — we have no
// confirmed sponsors yet. Re-import + re-add to the page below once the
// client signs the first sponsor and supplies their logo/name/tier.
// import { SponsorPreviewSection } from "@/components/sections/SponsorPreviewSection";
import { FaqPreviewSection } from "@/components/sections/FaqPreviewSection";
import { MailingListSection } from "@/components/sections/MailingListSection";
import { WelcomeToCountrySection } from "@/components/sections/WelcomeToCountrySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventSummarySection />
      <CountdownSection />
      <VendorCtaSection />
      {/* TODO(content): <SponsorPreviewSection /> hidden until we have real sponsors. */}
      <FaqPreviewSection />
      <MailingListSection />
      <WelcomeToCountrySection />
    </>
  );
}
