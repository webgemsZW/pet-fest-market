import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for PetFest Market and Nonconformity Productions — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-12 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: May 2026</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="prose prose-orange mx-auto max-w-3xl text-gray-600">
          <p>
            This Privacy Policy applies to all personal information collected by PetFest Market and
            Nonconformity Productions via the website located at{" "}
            <a href="https://www.petfest.com.au">www.petfest.com.au</a>.
          </p>

          <h2>What information do we collect?</h2>
          <p>
            The kind of Personal Information that we collect from you will depend on how you use the
            website. The Personal Information which we collect and hold about you may include:
          </p>
          <ul>
            <li>Email address</li>
            <li>Name</li>
            <li>Phone number</li>
            <li>Address</li>
            <li>Business name</li>
          </ul>

          <h2>Types of information</h2>
          <p>
            The Privacy Act 1998 (Cth) (&ldquo;Privacy Act&rdquo;) defines types of information,
            including Personal Information and Sensitive Information.
          </p>
          <p>
            <strong>Personal Information</strong> means information or an opinion about an
            identified individual or an individual who is reasonably identifiable, whether the
            information or opinion is true or not, and whether it is recorded in a material form or
            not. If the information does not disclose your identity or enable your identity to be
            ascertained, it will in most cases not be classified as &ldquo;Personal
            Information&rdquo; and will not be subject to this privacy policy.
          </p>
          <p>
            <strong>Sensitive Information</strong> is defined in the Privacy Act as including
            information or opinion about such things as an individual&apos;s racial or ethnic
            origin, political opinions, membership of a political association, religious or
            philosophical beliefs, membership of a trade union or other professional body, criminal
            record, or health information. Sensitive Information will be used by us only for the
            primary purpose for which it was obtained, for a secondary purpose directly related to
            the primary purpose, or with your consent or where required or authorised by law.
          </p>

          <h2>How we collect your Personal Information</h2>
          <p>
            We may collect Personal Information from you whenever you input such information into
            the website or provide it to us in any other way. We may also collect cookies from your
            computer which enable us to tell when you use the website and to help customise your
            experience. As a general rule, it is not possible to identify you personally from our
            use of cookies.
          </p>
          <p>
            We generally don&apos;t collect Sensitive Information, but when we do, we will comply
            with the above. Where reasonable and practicable, we collect your Personal Information
            from you only. However, sometimes we may be given information from a third party — in
            such cases we will take steps to make you aware of the information that was provided.
          </p>

          <h2>Purpose of collection</h2>
          <p>
            We collect Personal Information to provide you with the best service experience possible
            on the website and to keep in touch with you about developments in our business. We
            customarily only disclose Personal Information to our service providers who assist us in
            operating the website.
          </p>
          <p>
            By using our website, you consent to the receipt of direct marketing material. We will
            only use your Personal Information for this purpose if we have collected such information
            directly from you, and if it is material of a type which you would reasonably expect to
            receive. We do not use sensitive Personal Information in direct marketing activity. Our
            direct marketing material will include a simple means by which you can request not to
            receive further communications of this nature, such as an unsubscribe link.
          </p>

          <h2>Security, Access and Correction</h2>
          <p>
            We store your Personal Information in a way that reasonably protects it from
            unauthorised access, misuse, modification, or disclosure. When we no longer require your
            Personal Information for the purpose for which we obtained it, we will take reasonable
            steps to destroy, anonymise, or de-identify it. Most Personal Information stored in our
            records will be kept for a maximum of 7 years to fulfil our record-keeping obligations.
          </p>
          <p>The Australian Privacy Principles:</p>
          <ul>
            <li>
              permit you to obtain access to the Personal Information we hold about you in certain
              circumstances (Australian Privacy Principle 12); and
            </li>
            <li>
              allow you to correct inaccurate Personal Information subject to certain exceptions
              (Australian Privacy Principle 13).
            </li>
          </ul>
          <p>
            To obtain such access, please contact us in writing using the details at the bottom of
            this policy.
          </p>

          <h2>Complaint procedure</h2>
          <p>
            If you have a complaint concerning the manner in which we maintain the privacy of your
            Personal Information, please contact us using the details at the bottom of this policy.
            All complaints will be considered by PetFest Market and Nonconformity Productions, and
            we may seek further information from you to clarify your concerns. If we agree that your
            complaint is well founded, we will, in consultation with you, take appropriate steps to
            rectify the problem. If you remain dissatisfied with the outcome, you may refer the
            matter to the{" "}
            <a
              href="https://www.oaic.gov.au"
              target="_blank"
              rel="noopener noreferrer"
            >
              Office of the Australian Information Commissioner
            </a>
            .
          </p>

          <h2>Overseas transfer</h2>
          <p>
            Your Personal Information will not be disclosed to recipients outside Australia unless
            you expressly request us to do so. If you request us to transfer your Personal
            Information to an overseas recipient, the overseas recipient will not be required to
            comply with the Australian Privacy Principles and we will not be liable for any
            mishandling of your information in such circumstances.
          </p>

          <h2>How to contact us about privacy</h2>
          <p>
            If you have any queries, wish to access your Personal Information, or have a complaint
            about our privacy practices, you can contact us at:{" "}
            <a href="mailto:petfest@nonconformity.com.au">petfest@nonconformity.com.au</a>
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
