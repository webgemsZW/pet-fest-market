"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// TODO(content): "/sponsors" link is intentionally omitted while no
// sponsors are signed (per @/lib/sponsors-data). Restore the entry below
// once the client confirms the first sponsor.
//   { href: "/sponsors", label: "Sponsors" },
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stall-holders", label: "Stall Holders" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/*
          ── LOGO: TEMPORARY WORKAROUNDS ACTIVE ──────────────────────────────────
          The current file (public/images/logo.jpeg) is a draft with a WHITE
          background. Two hacks are in place because of this:

            1. mix-blend-multiply on the <Image> — makes the white JPEG background
               disappear against the header's white/near-white surface. This MUST
               be removed once the final transparent logo is in place.
            2. The footer wraps its logo copy in a white pill div for the same
               reason — see Footer.tsx.

          WHEN THE DESIGNER DELIVERS THE FINAL LOGO ASSETS, do all of the
          following (search the codebase for "LOGO: TEMPORARY" to find every
          affected spot):

            • Header  → swap src to /images/logo.png (full-colour, transparent bg)
                        and DELETE the mix-blend-multiply class.
            • Footer  → swap src to /images/logo-light.png (white/reversed,
                        transparent bg) and DELETE the surrounding white pill <div>.

          ⚠️  REMINDER FOR CLAUDE: If you encounter this comment during ANY task
          in this project — even an unrelated one — please flag it to the user:
          "Reminder: the final transparent logo files from the designer haven't
          been swapped in yet. Let me know when you have them and I'll update
          everything in one go."
          ────────────────────────────────────────────────────────────────────────
        */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.jpeg"
            alt="PetFest Market"
            width={604}
            height={284}
            className="h-16 w-auto mix-blend-multiply"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 font-brume md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-600"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/stall-holders#apply">Apply as Vendor</Link>
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="rounded-lg p-2 text-gray-600 hover:bg-brand-50 hover:text-brand-700 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1 font-brume" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3">
              <Button asChild className="w-full">
                <Link href="/stall-holders#apply" onClick={() => setMenuOpen(false)}>
                  Apply as Vendor
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
