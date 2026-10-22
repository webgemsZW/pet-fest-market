import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SponsorEnquiryForm } from "@/components/sections/SponsorEnquiryForm";
import { getSponsorsPage } from "@/lib/sanity/get-sponsors-page";

const FALLBACK_CTA_HEADING = "Become a Sponsor";
// Client-supplied copy (Andrea, sponsor tab request).
const FALLBACK_CTA_BODY =
  "Interested in sponsoring PetFest Market? Complete the form and we will be in touch with you to discuss.";

/**
 * The "Become a Sponsor" block: heading, intro and enquiry form. Shown on the
 * Sponsors page and the home page. The copy is edited once in Studio
 * (Sponsors Page → Enquiry Form), so both places always match.
 */
export async function SponsorEnquirySection({ className }: { className?: string }) {
  const page = await getSponsorsPage();
  const heading = page?.ctaHeading?.trim() || FALLBACK_CTA_HEADING;
  const body = page?.ctaBody?.trim() || FALLBACK_CTA_BODY;

  return (
    <SectionWrapper className={className}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 text-4xl">🤝</div>
          <h2 className="text-3xl font-bold text-gray-900">{heading}</h2>
          <p className="mt-3 text-lg text-gray-500">{body}</p>
        </div>
        <SponsorEnquiryForm />
      </div>
    </SectionWrapper>
  );
}
