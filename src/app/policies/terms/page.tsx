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

          {/*
            TODO(content): The client-supplied Terms & Conditions document
            (site-info/docs/Petfest Website Use Terms and Conditions.docx) covers
            WEBSITE USE ONLY. Event-attendance terms (tickets, pets at the event,
            stallholder agreement, photography, conduct on the day, event liability
            waiver, etc.) have NOT been provided by the client. A previous version
            of this page had invented sections covering those topics — they have
            been removed. Request the additional content from the client before
            adding any event-attendance terms here.
          */}

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
