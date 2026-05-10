import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Pet Fest Market — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 pb-12 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: May 2026</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="prose prose-teal mx-auto max-w-3xl text-gray-600">
          <h2>1. Introduction</h2>
          <p>
            Pet Fest Market (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to
            protecting your privacy and handling your personal information responsibly in accordance
            with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>Name and contact details (email, phone, address) when you register or contact us</li>
            <li>Payment information when purchasing tickets or stall registrations</li>
            <li>Information submitted through our contact form or mailing list sign-up</li>
            <li>Browsing data collected via cookies and analytics tools</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process ticket purchases and vendor applications</li>
            <li>Send event-related communications and updates</li>
            <li>Respond to your enquiries</li>
            <li>Improve our website and event experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. We may share
            your information with trusted service providers (such as ticketing platforms and email
            services) solely for the purpose of operating the event. All third parties are bound by
            confidentiality obligations.
          </p>

          <h2>5. Mailing List</h2>
          <p>
            If you subscribe to our mailing list, you will receive updates about Pet Fest Market.
            You can unsubscribe at any time by clicking the unsubscribe link in any email we send.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Our website uses cookies to improve your browsing experience and collect anonymised
            analytics data. You can disable cookies through your browser settings, although this may
            affect some website functionality.
          </p>

          <h2>7. Security</h2>
          <p>
            We take reasonable steps to protect your personal information from misuse, loss,
            unauthorised access, modification, or disclosure.
          </p>

          <h2>8. Access &amp; Correction</h2>
          <p>
            You have the right to request access to or correction of your personal information. To
            make a request, please contact us at{" "}
            <a href="mailto:hello@petfestmarket.com.au">hello@petfestmarket.com.au</a>.
          </p>

          <h2>9. Contact</h2>
          <p>
            For any privacy-related questions or complaints, contact us at{" "}
            <a href="mailto:hello@petfestmarket.com.au">hello@petfestmarket.com.au</a>.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
