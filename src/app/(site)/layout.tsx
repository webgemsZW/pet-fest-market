import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
