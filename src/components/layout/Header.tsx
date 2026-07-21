"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEFAULT_APPLY_URL } from "@/lib/site-defaults";

/*
  The Header is a Client Component (it needs useState for the mobile menu +
  scroll behaviour), so it can't fetch from Sanity itself. The server layout
  passes in:
   - `applyUrl` — the Stallholder form link (from the pinned event).
   - `events` + `featuredEventId` — the minimal event data used to resolve
     the CURRENT event's ticket link in the browser. Doing that pick
     client-side (by today's date) means the nav "Buy Tickets" link
     self-heals to the next event automatically as markets roll over,
     without forcing the whole site to render dynamically.
*/

type NavEvent = { _id: string; eventDate: string; ticketUrl: string | null };

/** Mirror of getFeaturedEvent: pinned event while it's still upcoming, else
 *  the soonest upcoming — then return that event's ticket link. */
function resolveTicketUrl(events: NavEvent[], featuredEventId: string | null, now: number): string | null {
  const pinned = featuredEventId ? events.find((e) => e._id === featuredEventId) : null;
  const isUpcoming = (e: NavEvent) => new Date(e.eventDate).getTime() >= now;
  const featured =
    pinned && isUpcoming(pinned)
      ? pinned
      : events.filter(isUpcoming).sort((a, b) => +new Date(a.eventDate) - +new Date(b.eventDate))[0] ?? null;
  return featured?.ticketUrl || null;
}

// TODO(content): "/sponsors" link is intentionally omitted while no
// sponsors are signed (per @/lib/sponsors-data). Restore the entry below
// once the client confirms the first sponsor.
//   { href: "/sponsors", label: "Sponsors" },
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/stall-holders", label: "Stallholders" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  applyUrl = DEFAULT_APPLY_URL,
  events = [],
  featuredEventId = null,
}: {
  applyUrl?: string;
  events?: NavEvent[];
  featuredEventId?: string | null;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Deterministic initial value (no `Date.now()`) so server and first client
  // render match — avoids a hydration mismatch. Corrected to the true
  // date-based pick right after mount, and re-picks daily as events pass.
  const initialTicketUrl = useMemo(
    () =>
      (featuredEventId ? events.find((e) => e._id === featuredEventId)?.ticketUrl : null) ||
      events.find((e) => e.ticketUrl)?.ticketUrl ||
      null,
    [events, featuredEventId],
  );
  const [ticketUrl, setTicketUrl] = useState<string | null>(initialTicketUrl);

  useEffect(() => {
    setTicketUrl(resolveTicketUrl(events, featuredEventId, Date.now()));
  }, [events, featuredEventId]);

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
          {ticketUrl && (
            <Button asChild size="sm">
              <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                Buy Tickets
              </a>
            </Button>
          )}
          <Button asChild size="sm" variant="secondary">
            <a href={applyUrl} target="_blank" rel="noopener noreferrer">
              Apply as Stallholder
            </a>
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
              {ticketUrl && (
                <Button asChild className="w-full">
                  <a
                    href={ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                  >
                    Buy Tickets
                  </a>
                </Button>
              )}
              <Button asChild className="w-full" variant="secondary">
                <a
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  Apply as Stallholder
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
