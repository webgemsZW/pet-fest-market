import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { FooterNewsletterForm } from "./FooterNewsletterForm";
import { TiktokIcon } from "@/components/shared/TiktokIcon";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";
import { urlFor } from "@/lib/sanity/image";
import { DEFAULT_SOCIAL_LINKS } from "@/lib/site-defaults";

/* ──────────────────────────────────────────────────────────────────
   Fallbacks used when Sanity is unreachable, env vars unset, or the
   matching field is blank in Site Settings.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_ACKNOWLEDGEMENT =
  "We acknowledge the Traditional Owners and Custodians of Country throughout Australia and recognise their continuing connection to lands, waters and communities. We pay our respect to their Elders past, present and emerging and extend that respect to all Aboriginal and Torres Strait Islander peoples.";

// Generic tagline per the 2 June 2026 client revision — explicitly NOT
// tied to a specific city or date so the footer doesn't need updating
// between markets (Box Hill VIC, then Disterrly Rd QLD, then Morris
// Moore VIC).
const FALLBACK_TAGLINE = "An indoor market for Pet Lovers!";
const FALLBACK_NP_CREDIT_TEXT = "PetFest Market is an event of";
const FALLBACK_NP_LOGO_SRC = "/images/nonconformity-logo.png";

const FALLBACK_MAILING_HEADING = "Get Updates on PetFest news and events";

// TODO(content): "/sponsors" link is intentionally omitted while no
// sponsors are signed. Restore the entry below once the client confirms
// the first sponsor.
//   { href: "/sponsors", label: "Sponsors" },
const footerNav = [
  { href: "/about", label: "About" },
  { href: "/stall-holders", label: "Stallholders" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/*
  Footer policy links — per Andrea's 3 June 2026 note, these point
  directly to the PDF documents served from /public/policies/ (rather
  than the in-site rendered pages at /policies/*). PDFs open in-tab in
  most browsers for a cleaner viewer experience than the original
  .docx files. The Refund Policy was removed — refund details will
  live in the Stallholder Guidelines (emailed to successful applicants)
  and the ticketing company's own T&Cs once set up.

  The in-site rendered pages at /policies/{terms,privacy,code-of-conduct}
  are still available as a backup — they're just not linked from the
  footer any more.
*/
const policyLinks = [
  { href: "/policies/terms-and-conditions.pdf", label: "Terms & Conditions" },
  { href: "/policies/privacy-policy.pdf", label: "Privacy Policy" },
  { href: "/policies/code-of-conduct.pdf", label: "Code of Conduct" },
];

export async function Footer() {
  const siteSettings = await getSiteSettings();

  const acknowledgement =
    siteSettings?.acknowledgementOfCountry?.trim() || FALLBACK_ACKNOWLEDGEMENT;
  // Use the generic tagline by default — even if siteSettings.siteDescription
  // is filled in, the footer wants the short generic line, not the SEO
  // description. We deliberately do NOT use siteDescription here.
  const tagline = FALLBACK_TAGLINE;

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
  const npText = siteSettings?.nonconformityCredit?.text?.trim() || FALLBACK_NP_CREDIT_TEXT;
  const npLogoFromSanity = siteSettings?.nonconformityCredit?.logo?.asset?._ref
    ? urlFor(siteSettings.nonconformityCredit.logo as Parameters<typeof urlFor>[0])
        .width(400)
        .url()
    : null;
  const npLogoSrc = npLogoFromSanity ?? FALLBACK_NP_LOGO_SRC;
  const npLogoAlt = siteSettings?.nonconformityCredit?.logo?.alt || "Nonconformity Productions";

  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo-light.png"
                alt="PetFest Market"
                width={2346}
                height={942}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-brand-300">{tagline}</p>

            {/* Social — Facebook / Instagram / TikTok have hardcoded
                defaults (see src/lib/site-defaults.ts), so these icons
                always render. Twitter is shown only when its URL is
                explicitly set in Site Settings. */}
            <div className="mt-4 flex gap-3">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
              >
                <TiktokIcon className="h-5 w-5" />
              </a>
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Twitter / X"
                  className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-400">
              Navigate
            </h3>
            <ul className="space-y-2">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies — plain <a> rather than next/link since these
              point to static .docx files in /public/policies/.
              target="_blank" so the document opens without losing the
              current page. */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-400">
              Policies
            </h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mailing list */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-400">
              {FALLBACK_MAILING_HEADING}
            </h3>
            <FooterNewsletterForm />
          </div>
        </div>

        {/* Acknowledgement of Country — sourced from Sanity with a verbatim
            fallback. See src/lib/sanity/get-site-settings.ts. */}
        <div className="mt-12 border-t border-brand-800 pt-8">
          <p className="text-sm text-brand-400">
            <span className="font-semibold text-brand-300">Acknowledgement of Country —</span>{" "}
            {acknowledgement}
          </p>
        </div>

        {/* Nonconformity Productions credit. */}
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-brand-800 pt-6">
          <p className="text-xs text-brand-500">{npText}</p>
          <Image
            src={npLogoSrc}
            alt={npLogoAlt}
            width={1080}
            height={1080}
            className={
              npLogoFromSanity
                ? "h-10 w-auto opacity-60"
                : "h-10 w-auto brightness-0 invert opacity-60"
            }
          />
        </div>

        {/* Copyright year is hardcoded — Cache Components mode forbids `new Date()`
            in server components. Update once a year, or refactor to a tiny
            Client Component if we want it to roll over automatically. */}
        <div className="mt-6 text-center text-xs text-brand-600">
          © 2026 PetFest Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
