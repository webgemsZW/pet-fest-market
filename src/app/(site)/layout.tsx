import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HumanitixPopup } from "@/components/events/HumanitixPopup";
import { getAllEvents } from "@/lib/sanity/get-events";

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
  // Cached fetch, so the layout stays static. The Header decides in the
  // browser (by date) whether to show the nav Buy Tickets button, so it
  // self-heals as markets roll over without making the site dynamic.
  const allEvents = await getAllEvents();

  // Minimal, serialisable event dates the Header needs to know whether any
  // market is upcoming.
  const navEvents = allEvents.map((e) => ({ eventDate: e.eventDate }));

  return (
    <>
      {/* Global: powers the Humanitix pop-up used by the event detail page's
          Buy Tickets button (the checkout opens in a modal over the site). */}
      <HumanitixPopup />
      <Header events={navEvents} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
