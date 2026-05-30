import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { FooterNewsletterForm } from "./FooterNewsletterForm";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";
import { urlFor } from "@/lib/sanity/image";

/* ──────────────────────────────────────────────────────────────────
   Fallbacks used when Sanity is unreachable, env vars unset, or the
   matching field is blank in Site Settings. These keep the footer
   rendering safely even before any content has been entered.
   ──────────────────────────────────────────────────────────────── */

const FALLBACK_ACKNOWLEDGEMENT =
  "We acknowledge the Traditional Owners and Custodians of Country throughout Australia and recognise their continuing connection to lands, waters and communities. We pay our respect to their Elders past, present and emerging and extend that respect to all Aboriginal and Torres Strait Islander peoples.";

const FALLBACK_TAGLINE = "An indoor community market for pet lovers in Box Hill, Victoria.";
const FALLBACK_EVENT_DATE_DISPLAY = "Sunday 26 July 2026";
const FALLBACK_NP_CREDIT_TEXT = "PetFest Market is an event of";
const FALLBACK_NP_LOGO_SRC = "/images/nonconformity-logo.png";

/**
 * Format an event ISO datetime as "Sunday 26 July 2026" for the
 * Australian audience. Defensive: returns the fallback if the input
 * isn't a valid date string.
 */
function formatEventDate(iso: string | null | undefined): string {
  if (!iso) return FALLBACK_EVENT_DATE_DISPLAY;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return FALLBACK_EVENT_DATE_DISPLAY;
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// TODO(content): "/sponsors" link is intentionally omitted while no
// sponsors are signed. Restore the entry below once the client confirms
// the first sponsor.
//   { href: "/sponsors", label: "Sponsors" },
const footerNav = [
  { href: "/about", label: "About" },
  { href: "/stall-holders", label: "Stall Holders" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const policyLinks = [
  { href: "/policies/terms", label: "Terms & Conditions" },
  { href: "/policies/privacy", label: "Privacy Policy" },
  { href: "/policies/refund", label: "Refund Policy" },
  { href: "/policies/code-of-conduct", label: "Code of Conduct" },
];

export async function Footer() {
  const siteSettings = await getSiteSettings();

  const acknowledgement =
    siteSettings?.acknowledgementOfCountry?.trim() || FALLBACK_ACKNOWLEDGEMENT;
  const tagline = siteSettings?.siteDescription?.trim() || FALLBACK_TAGLINE;
  const eventDateDisplay = formatEventDate(siteSettings?.currentEvent?.eventDate);

  const social = siteSettings?.socialLinks ?? {};
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
            <p className="mt-1 text-sm text-brand-400">{eventDateDisplay}</p>

            {/* Social — only render an icon if Site Settings has a URL for it. */}
            <div className="mt-4 flex gap-3">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
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

          {/* Policies */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-400">
              Policies
            </h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
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

          {/* Mailing list */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-400">
              Stay in the loop
            </h3>
            <p className="mb-4 text-sm text-brand-300">
              Get updates on vendors, activities, and event news.
            </p>
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

        {/* Nonconformity Productions credit — text + logo from Site Settings,
            with hardcoded fallback so the block always renders cleanly. */}
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
