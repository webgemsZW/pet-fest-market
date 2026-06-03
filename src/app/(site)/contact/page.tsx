import type { Metadata } from "next";
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ContactForm } from "@/components/sections/ContactForm";
import { TiktokIcon } from "@/components/shared/TiktokIcon";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";
import { getContactPage } from "@/lib/sanity/get-contact-page";
import { DEFAULT_SOCIAL_LINKS } from "@/lib/site-defaults";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the PetFest Market team. We'd love to hear from you.",
};

// Fallback values if siteSettings is unreachable or fields are blank.
const FALLBACK_EMAIL = "petfest@nonconformity.com.au";
const FALLBACK_LOCATION = "Box Hill Town Hall, Victoria, Australia";
const FALLBACK_HEADING = "Get in Touch";
const FALLBACK_INTRO =
  "Questions, sponsorship enquiries, or just want to say hello? We'd love to hear from you.";

export default async function ContactPage() {
  const [siteSettings, contactPage] = await Promise.all([getSiteSettings(), getContactPage()]);
  const email = siteSettings?.contactEmail?.trim() || FALLBACK_EMAIL;
  const phone = siteSettings?.contactPhone?.trim() || null;
  const address = siteSettings?.contactAddress?.trim() || null;
  const location = address || siteSettings?.currentEvent?.location || FALLBACK_LOCATION;
  // Resolve each social link: prefer the Sanity-supplied URL, fall
  // back to the hardcoded default (see src/lib/site-defaults.ts).
  // Twitter has no default — only shows when explicitly set in Sanity.
  const sanitySocial = siteSettings?.socialLinks ?? {};
  const social = {
    facebook: sanitySocial.facebook?.trim() || DEFAULT_SOCIAL_LINKS.facebook,
    instagram: sanitySocial.instagram?.trim() || DEFAULT_SOCIAL_LINKS.instagram,
    tiktok: sanitySocial.tiktok?.trim() || DEFAULT_SOCIAL_LINKS.tiktok,
    twitter: sanitySocial.twitter?.trim() || null,
  };
  const heading = contactPage?.heading?.trim() || FALLBACK_HEADING;
  const intro = contactPage?.intro?.trim() || FALLBACK_INTRO;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 text-5xl">📩</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{heading}</h1>
          <p className="mt-4 text-xl text-gray-600">{intro}</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Contact details */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Details</h2>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="font-medium text-brand-600 hover:text-brand-700"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Phone — only render when populated in Site Settings */}
              {phone && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="font-medium text-brand-600 hover:text-brand-700"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Event Location</p>
                  <p className="whitespace-pre-line font-medium text-gray-700">{location}</p>
                  {!address && (
                    <p className="text-sm text-gray-400">Full address coming soon</p>
                  )}
                </div>
              </div>
            </div>

            {/* Social links — Facebook / Instagram / TikTok have hardcoded
                defaults (see src/lib/site-defaults.ts), so these icons
                always render. Twitter is shown only when its URL is
                explicitly set in Site Settings. */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-colors hover:bg-brand-200"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-colors hover:bg-brand-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on TikTok"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-colors hover:bg-brand-200"
                >
                  <TiktokIcon className="h-5 w-5" />
                </a>
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Twitter / X"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-colors hover:bg-brand-200"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
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
