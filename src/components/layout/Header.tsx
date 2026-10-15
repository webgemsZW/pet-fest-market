"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
  The Header is a Client Component (it needs useState for the mobile menu +
  scroll behaviour), so it can't fetch from Sanity itself. The server layout
  passes in `events` — minimal event data used to decide, in the browser,
  whether there's an upcoming market. Both nav CTAs (Buy Tickets, Apply as
  Stallholder) link to /events, where the visitor picks a market and then
  buys / applies for it. The Buy Tickets button only shows when a market is
  actually upcoming — evaluated client-side by today's date so it self-heals
  as markets roll over, without forcing the whole site to render dynamically.
*/

// `ticketsCloseAt` is when online sales stop for that market (its ticket
// sales deadline, else the moment it opens).
type NavEvent = { ticketsCloseAt: number | null };

function hasUpcomingEvent(events: NavEvent[], now: number): boolean {
  return events.some((e) => e.ticketsCloseAt != null && e.ticketsCloseAt >= now);
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/stall-holders", label: "Stallholders" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header({ events = [] }: { events?: NavEvent[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Whether to show the nav "Buy Tickets" button depends on today's date,
  // which we can only evaluate in the browser. Start false (no button) on the
  // server + first client render, then resolve after mount — so it shows only
  // when a market is genuinely upcoming, never flashing for a past one.
  const [showTickets, setShowTickets] = useState(false);

  useEffect(() => {
    setShowTickets(hasUpcomingEvent(events, Date.now()));
  }, [events]);

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
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="PetFest Market"
            width={2346}
            height={942}
            className="h-16 w-auto"
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
          {showTickets && (
            <Button asChild size="sm">
              <Link href="/events">Buy Tickets</Link>
            </Button>
          )}
          <Button asChild size="sm" variant="secondary">
            <Link href="/stall-holders">Apply as Stallholder</Link>
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
            <div className="mt-3 flex flex-col gap-2">
              {showTickets && (
                <Button asChild className="w-full">
                  <Link href="/events" onClick={() => setMenuOpen(false)}>
                    Buy Tickets
                  </Link>
                </Button>
              )}
              <Button asChild className="w-full" variant="secondary">
                <Link href="/stall-holders" onClick={() => setMenuOpen(false)}>
                  Apply as Stallholder
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
