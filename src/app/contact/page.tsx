import type { Metadata } from "next";
import { Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Pet Fest Market team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">📩</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-600">
            Questions, sponsorship enquiries, or just want to say hello? We&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Contact details */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <a
                    href="mailto:hello@petfestmarket.com.au"
                    className="font-medium text-teal-600 hover:text-teal-700"
                  >
                    hello@petfestmarket.com.au
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Event Location</p>
                  <p className="font-medium text-gray-700">Box Hill, Victoria, Australia</p>
                  <p className="text-sm text-gray-400">Full address coming soon</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-colors hover:bg-teal-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-colors hover:bg-teal-200"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Twitter"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-colors hover:bg-teal-200"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Response time note */}
            <div className="mt-8 rounded-2xl bg-teal-50 p-5 ring-1 ring-teal-100">
              <p className="text-sm text-teal-700">
                💬 We typically respond within <strong>1–2 business days</strong>. For urgent
                vendor or sponsorship enquiries, please mention it in your message.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
