import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the PetFest Market website and attending the event.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-12 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Terms &amp; Conditions</h1>
          <p className="mt-3 text-gray-500">Last updated: May 2026</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="prose prose-orange mx-auto max-w-3xl text-gray-600">

          <h2>Website Use</h2>
          <p>
            PetFest Market and Nonconformity Productions is the operator and owner of this website.
            All persons using this website agree to be bound by these terms and conditions, which
            are subject to change at the sole discretion of PetFest Market and Nonconformity
            Productions. Any use or access to this site indicates a person&apos;s acceptance of
            these terms and conditions.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All intellectual property and content on this site is owned by PetFest Market and
            Nonconformity Productions and their licensors, partners, sponsors, or advertisers. All
            content on this site is protected by Australian and international copyright and trademark
            laws. A person may not do anything which interferes with or breaches these laws or the
            intellectual property rights of any content on the PetFest Market site.
          </p>
          <p>
            A person may download and view the content of the PetFest Market website or print a copy
            for their own personal or non-commercial use, provided you do not modify the copy from
            how it appears on the PetFest Market website (including any copyright notice). All rights
            not expressly granted under these terms of use are reserved.
          </p>

          <h2>Third Party Content &amp; Links</h2>
          <p>
            The PetFest Market website may include third party (partners or sponsors) content which
            is subject to that third party&apos;s terms and conditions of use. The website may also
            include links to third party sites which are not related to PetFest Market and in
            relation to which PetFest Market has no control or interest. The appearance of these
            links on the PetFest Market website does not indicate any relationship between PetFest
            Market / Nonconformity Productions and that third party, nor does it give any
            endorsement of that third party, its site, or the products or services it advertises.
          </p>

          <h2>Liability</h2>
          <p>
            PetFest Market has no responsibility or liability in relation to any loss or damage that
            you incur, including damage to your software or hardware, arising from your use of or
            access to the PetFest Market website. This site is not to be used for any purpose or in
            any way which is unlawful.
          </p>

          <h2>Event Attendance</h2>
          <p>
            By attending or participating in PetFest Market (&ldquo;the Event&rdquo;), you agree to
            be bound by the following additional terms. If you do not agree, please do not attend or
            participate.
          </p>

          <h3>Event Details</h3>
          <p>
            PetFest Market is scheduled for Sunday 26 July 2026 at Box Hill Town Hall, Victoria, Australia. The
            organisers reserve the right to alter, postpone, or cancel the event at any time due to
            circumstances beyond their control, including but not limited to extreme weather, public
            safety concerns, or government directives.
          </p>

          <h3>Tickets &amp; Entry</h3>
          <p>
            Entry to the event requires a valid ticket purchased via authorised channels. Tickets
            are non-transferable unless otherwise stated. The organisers reserve the right to refuse
            entry to any person without explanation. Children under 12 enter free when accompanied
            by a paying adult.
          </p>

          <h3>Pets</h3>
          <p>
            Pet owners are fully responsible for the behaviour of their animals at all times. All
            dogs must be kept on a lead. Owners are required to clean up after their pets. Any
            animal deemed dangerous or causing distress may be asked to leave the event.
          </p>

          <h3>Vendors &amp; Stallholders</h3>
          <p>
            All stallholders are bound by the Stallholder Agreement provided upon application
            approval. PetFest Market organisers accept no liability for loss, damage, or theft of
            vendor property.
          </p>

          <h3>Photography &amp; Media</h3>
          <p>
            Photography and video recording for personal use is permitted. By attending the event,
            you acknowledge that you may be photographed or filmed by the event organisers for
            promotional purposes. Please notify staff if you do not wish to be included.
          </p>

          <h3>Conduct</h3>
          <p>
            We ask that all attendees treat others, including animals, with kindness and respect.
            Any individual whose conduct is deemed inappropriate may be removed from the event
            without refund. Please also refer to our{" "}
            <a href="/policies/code-of-conduct">Code of Conduct</a>.
          </p>

          <h3>Event Liability</h3>
          <p>
            PetFest Market and its organisers accept no liability for personal injury, loss, or
            damage to property sustained at the event. Attendance is entirely at your own risk.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms &amp; Conditions, please contact us at{" "}
            <a href="mailto:petfest@nonconformity.com.au">petfest@nonconformity.com.au</a>.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
