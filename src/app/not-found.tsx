import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

/**
 * Root `not-found.tsx` — rendered when any URL doesn't match a route.
 *
 * Lives at the root rather than inside `(site)/` because Next.js looks
 * for `app/not-found.tsx` (root) when serving 404s for unmatched
 * routes. Route-group `not-found.tsx` files only catch `notFound()`
 * calls from within that group, not arbitrary bad URLs.
 *
 * Since the root layout deliberately doesn't include the site chrome
 * (so /studio can render full-screen), we render Header + Footer
 * directly here to match the rest of the public site visually.
 *
 * Marked noindex so search engines drop this URL from their indexes;
 * Next.js also returns HTTP 404 automatically for this file.
 */

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "We couldn't find that page. Here are some places to go next.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-brand-50 via-brand-100 to-brand-100 pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-700">
              <span>🐾</span>
              <span>404 — Page Not Found</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              We couldn&apos;t find that page
            </h1>

            <p className="mt-4 text-balance text-xl text-gray-600">
              The link you followed may be broken, or the page may have moved. Here&apos;s where
              you might be looking to go:
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/about">About</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/faq">FAQ</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/stall-holders">Stallholders</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
