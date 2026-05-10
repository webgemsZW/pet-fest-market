import { HeroSection } from "@/components/sections/HeroSection";
import { EventSummarySection } from "@/components/sections/EventSummarySection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { VendorCtaSection } from "@/components/sections/VendorCtaSection";
import { SponsorPreviewSection } from "@/components/sections/SponsorPreviewSection";
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
      <SponsorPreviewSection />
      <FaqPreviewSection />
      <MailingListSection />
      <WelcomeToCountrySection />
    </>
  );
}
