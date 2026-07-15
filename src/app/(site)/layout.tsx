import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";
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
  // Resolve the nav "Apply" URL from the pinned event (cached — keeps the
  // layout static). The Hero and per-event pages resolve the fully
  // self-healing featured event separately.
  const settings = await getSiteSettings();
  const applyUrl = settings?.currentEvent?.applyUrl?.trim() || DEFAULT_APPLY_URL;

  return (
    <>
      <Header applyUrl={applyUrl} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
