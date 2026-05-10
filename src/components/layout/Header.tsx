"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stall-holders", label: "Stall Holders" },
  { href: "/faq", label: "FAQ" },
  { href: "/sponsors", label: "Sponsors" },
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-teal-700">
          <PawPrint className="h-7 w-7" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tight">
            Pet Fest <span className="text-teal-500">Market</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-teal-600"
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
          className="rounded-lg p-2 text-gray-600 hover:bg-teal-50 hover:text-teal-700 md:hidden"
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
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
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
