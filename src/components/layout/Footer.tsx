import React from "react";
import Link from "next/link";
import { PawPrint, Instagram, Facebook, Twitter } from "lucide-react";
import { FooterNewsletterForm } from "./FooterNewsletterForm";

const footerNav = [
  { href: "/about", label: "About" },
  { href: "/stall-holders", label: "Stall Holders" },
  { href: "/faq", label: "FAQ" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

const policyLinks = [
  { href: "/policies/terms", label: "Terms & Conditions" },
  { href: "/policies/privacy", label: "Privacy Policy" },
  { href: "/policies/refund", label: "Refund Policy" },
];

export function Footer() {
  return (
    <footer className="bg-teal-900 text-teal-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white">
              <PawPrint className="h-7 w-7" aria-hidden="true" />
              <span className="text-lg font-bold">
                Pet Fest <span className="text-teal-300">Market</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-teal-300">
              A pet-friendly community market in Box Hill, Victoria.
            </p>
            <p className="mt-1 text-sm text-teal-400">4 July 2026</p>

            {/* Social links */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full p-2 text-teal-300 transition-colors hover:bg-teal-800 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full p-2 text-teal-300 transition-colors hover:bg-teal-800 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="rounded-full p-2 text-teal-300 transition-colors hover:bg-teal-800 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-400">
              Navigate
            </h3>
            <ul className="space-y-2">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-400">
              Policies
            </h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mailing list */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-400">
              Stay in the loop
            </h3>
            <p className="mb-4 text-sm text-teal-300">
              Get updates on vendors, activities, and event news.
            </p>
            <FooterNewsletterForm />
          </div>
        </div>

        {/* Welcome to Country */}
        <div className="mt-12 border-t border-teal-800 pt-8">
          <p className="text-sm text-teal-400">
            <span className="font-semibold text-teal-300">Welcome to Country —</span> Pet Fest
            Market acknowledges the Wurundjeri Woi Wurrung People of the Kulin Nation as the
            Traditional Custodians of the land on which our event is held. We pay our respects to
            Elders past, present, and emerging.
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-teal-600">
          © {new Date().getFullYear()} Pet Fest Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
