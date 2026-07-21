import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HumanitixPopup } from "@/components/events/HumanitixPopup";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";
import { getAllEvents } from "@/lib/sanity/get-events";
import { DEFAULT_APPLY_URL } from "@/lib/site-defaults";

/**
 * Layout for the public marketing site. Wraps every route in the
 * `(site)` route group with the global Header + Footer.
 *
 * Routes OUTSIDE this group — `/studio/[[...tool]]` and `/api/*` —
 * don't get this chrome. That keeps the embedded Sanity Studio
 * full-screen and avoids the fixed top nav covering its toolbar.
 *
 * The `(site)` segment in the folder name is a route-group marker —
 * it does NOT show up in URLs. `/about` etc. still resolve normally.
 */
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Both fetches are cached, so the layout stays static. The Header picks
  // the "active" event by date in the browser (see Header.tsx), which keeps
  // the nav Buy Tickets link self-healing without making the site dynamic.
  const [settings, allEvents] = await Promise.all([getSiteSettings(), getAllEvents()]);
  const applyUrl = settings?.currentEvent?.applyUrl?.trim() || DEFAULT_APPLY_URL;

  // Minimal, serialisable event data the Header needs to resolve the
  // current event's ticket link.
  const navEvents = allEvents.map((e) => ({
    _id: e._id,
    eventDate: e.eventDate,
    ticketUrl: e.ticketUrl?.trim() || null,
  }));
  const featuredEventId = settings?.currentEvent?._id ?? null;

  return (
    <>
      {/* Global: powers the Humanitix pop-up for the nav Buy Tickets button
          (which appears on every page) and the hero/detail buttons. */}
      <HumanitixPopup />
      <Header applyUrl={applyUrl} events={navEvents} featuredEventId={featuredEventId} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
