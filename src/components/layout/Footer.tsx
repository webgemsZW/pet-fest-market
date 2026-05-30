import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { FooterNewsletterForm } from "./FooterNewsletterForm";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

/**
 * Verbatim acknowledgement from
 * site-info/docs/Acknowledgement of country - Website Petfest.docx.
 * Used as a safe fallback if Sanity is unreachable, env vars are unset,
 * or no siteSettings document has been created yet.
 */
const FALLBACK_ACKNOWLEDGEMENT =
  "We acknowledge the Traditional Owners and Custodians of Country throughout Australia and recognise their continuing connection to lands, waters and communities. We pay our respect to their Elders past, present and emerging and extend that respect to all Aboriginal and Torres Strait Islander peoples.";

// TODO(content): "/sponsors" link is intentionally omitted while no
// sponsors are signed (per @/lib/sponsors-data). Restore the entry below
// once the client confirms the first sponsor.
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
            <p className="mt-3 text-sm text-brand-300">
              An indoor community market for pet lovers in Box Hill, Victoria.
            </p>
            <p className="mt-1 text-sm text-brand-400">Sunday 26 July 2026</p>

            {/*
              TODO(content): Social URLs below currently point nowhere
              (href="#"). The client has not supplied real handles yet —
              replace each href once provided, or remove the icons
              entirely if PetFest Market won't be on that platform.
            */}
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Instagram (link pending)"
                className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook (link pending)"
                className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter / X (link pending)"
                className="rounded-full p-2 text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
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

        {/* Acknowledgement of Country — sourced from Sanity (siteSettings.acknowledgementOfCountry)
            with a hardcoded fallback for safety. See src/lib/sanity/get-site-settings.ts. */}
        <div className="mt-12 border-t border-brand-800 pt-8">
          <p className="text-sm text-brand-400">
            <span className="font-semibold text-brand-300">Acknowledgement of Country —</span>{" "}
            {acknowledgement}
          </p>
        </div>

        {/* Nonconformity Productions credit */}
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-brand-800 pt-6">
          <p className="text-xs text-brand-500">PetFest Market is an event of</p>
          <Image
            src="/images/nonconformity-logo.png"
            alt="Nonconformity Productions"
            width={1080}
            height={1080}
            className="h-10 w-auto brightness-0 invert opacity-60"
          />
        </div>

        <div className="mt-6 text-center text-xs text-brand-600">
          © {new Date().getFullYear()} PetFest Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
