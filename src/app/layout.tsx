import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO(content): The marketing description below is placeholder. The only
// client-confirmed facts are the event name, venue (Box Hill Town Hall, VIC),
// date (Sunday 26 July 2026), and that all PetFest Markets are indoor. A real
// tagline / SEO description has not been provided.
export const metadata: Metadata = {
  title: {
    default: "PetFest Market — Box Hill, Victoria",
    template: "%s | PetFest Market",
  },
  description:
    "PetFest Market — an indoor pet-friendly community market at Box Hill Town Hall, Victoria, on Sunday 26 July 2026.",
  keywords: ["pet market", "PetFest", "Box Hill", "Victoria", "community market", "pet friendly"],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "PetFest Market",
    title: "PetFest Market — Box Hill, Victoria",
    description:
      "An indoor pet-friendly community market at Box Hill Town Hall, Victoria — Sunday 26 July 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PetFest Market — Box Hill, Victoria",
    description:
      "An indoor pet-friendly community market at Box Hill Town Hall, Victoria — Sunday 26 July 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
