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

export const metadata: Metadata = {
  title: {
    default: "Pet Fest Market — Box Hill, Victoria",
    template: "%s | Pet Fest Market",
  },
  description:
    "A pet-friendly community market in Box Hill, Victoria. Join us on 4 July 2026 for a fun-filled day of stalls, activities, and furry friends.",
  keywords: ["pet market", "pet fest", "Box Hill", "Victoria", "community market", "pet friendly"],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Pet Fest Market",
    title: "Pet Fest Market — Box Hill, Victoria",
    description:
      "A pet-friendly community market in Box Hill, Victoria. Join us on 4 July 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Fest Market — Box Hill, Victoria",
    description:
      "A pet-friendly community market in Box Hill, Victoria. Join us on 4 July 2026.",
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
