import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

// Built-in fallbacks. The site name and description are now editable in
// Studio (Site Settings → General → Site Name / Site Description); these
// constants are used only when those fields are blank or Sanity is
// unreachable. The only client-confirmed facts baked in are the venue,
// date, and that all PetFest Markets are indoor.
const FALLBACK_SITE_NAME = "PetFest Market";
const FALLBACK_TITLE = "PetFest Market — Box Hill, Victoria";
const FALLBACK_DESCRIPTION =
  "PetFest Market — an indoor community market for pet lovers at Box Hill Town Hall, Victoria, on Sunday 26 July 2026.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName?.trim() || FALLBACK_SITE_NAME;
  const description = settings?.siteDescription?.trim() || FALLBACK_DESCRIPTION;
  // The default (home) title uses the fuller built-in headline unless a
  // site name has been customised; inner pages get "<Page> | <siteName>".
  const defaultTitle = settings?.siteName?.trim() ? siteName : FALLBACK_TITLE;

  return {
    metadataBase,
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: ["pet market", "PetFest", "Box Hill", "Victoria", "community market", "pet lovers"],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/images/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/images/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName,
      title: defaultTitle,
      description,
      images: [
        {
          url: "/images/og-default.png",
          width: 1200,
          height: 630,
          alt: "PetFest Market logo on a branded background",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: ["/images/og-default.png"],
    },
  };
}

/**
 * Root layout. Intentionally MINIMAL — just the html/body wrapper and
 * font setup. The site-wide Header/Footer chrome lives in the
 * `(site)` route group's layout (src/app/(site)/layout.tsx) so that
 * the embedded Sanity Studio at /studio renders full-screen without
 * the public-site navbar covering its toolbar.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {children}
        {/*
          Vercel Web Analytics — cookieless visitor / page-view counts.
          Only emits beacons in production deploys on Vercel; in local
          development the component is a no-op. Toggle the collection
          itself on/off via Vercel dashboard → Project → Analytics.
        */}
        <Analytics />
      </body>
    </html>
  );
}
