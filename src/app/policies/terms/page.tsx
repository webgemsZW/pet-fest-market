import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for attending and participating in Pet Fest Market.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 pb-12 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Terms &amp; Conditions</h1>
          <p className="mt-3 text-gray-500">Last updated: May 2026</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="prose prose-teal mx-auto max-w-3xl text-gray-600">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By attending or participating in Pet Fest Market (&quot;the Event&quot;), you agree to
            be bound by these Terms &amp; Conditions. If you do not agree, please do not attend or
            participate.
          </p>

          <h2>2. Event Details</h2>
          <p>
            Pet Fest Market is scheduled for 4 July 2026 in Box Hill, Victoria, Australia. The
            organisers reserve the right to alter, postpone, or cancel the event at any time due to
            circumstances beyond their control, including but not limited to extreme weather, public
            safety concerns, or government directives.
          </p>

          <h2>3. Tickets &amp; Entry</h2>
          <p>
            Entry to the event requires a valid ticket purchased via authorised channels. Tickets
            are non-transferable unless otherwise stated. The organisers reserve the right to refuse
            entry to any person without explanation. Children under 12 enter free when accompanied
            by a paying adult.
          </p>

          <h2>4. Pets</h2>
          <p>
            Pet owners are fully responsible for the behaviour of their animals at all times. All
            dogs must be kept on a lead. Owners are required to clean up after their pets. Any
            animal deemed dangerous or causing distress may be asked to leave the event.
          </p>

          <h2>5. Vendors &amp; Stallholders</h2>
          <p>
            All stallholders are bound by the Stallholder Agreement provided upon application
            approval. Pet Fest Market organisers accept no liability for loss, damage, or theft of
            vendor property.
          </p>

          <h2>6. Photography &amp; Media</h2>
          <p>
            Photography and video recording for personal use is permitted. By attending the event,
            you acknowledge that you may be photographed or filmed by the event organisers for
            promotional purposes. Please notify staff if you do not wish to be included.
          </p>

          <h2>7. Liability</h2>
          <p>
            Pet Fest Market and its organisers accept no liability for personal injury, loss, or
            damage to property sustained at the event. Attendance is entirely at your own risk.
          </p>

          <h2>8. Conduct</h2>
          <p>
            We ask that all attendees treat others, including animals, with kindness and respect.
            Any individual whose conduct is deemed inappropriate may be removed from the event
            without refund.
          </p>

          <h2>9. Contact</h2>
          <p>
            For questions about these Terms &amp; Conditions, please contact us at{" "}
            <a href="mailto:hello@petfestmarket.com.au">hello@petfestmarket.com.au</a>.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
