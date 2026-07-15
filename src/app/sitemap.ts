import type { MetadataRoute } from "next";
import { getAllEvents } from "@/lib/sanity/get-events";

/**
 * Sitemap for search engines. Generated automatically at /sitemap.xml.
 *
 * Includes the canonical user-facing pages plus one entry per event
 * detail page (/events/<slug>), pulled from Sanity. Deliberately excluded:
 *   - /studio                 — admin interface, no public benefit
 *   - /api/*                  — endpoint URLs, no human content
 *   - /policies/*             — in-site rendered fallbacks of the legal
 *                              docs. The PDFs in /public/policies are
 *                              the canonical version (linked from the
 *                              footer); this avoids duplicate-content
 *                              ranking penalties.
 *   - /sponsors               — placeholder "coming soon" while no
 *                              sponsors signed; will be added once
 *                              real sponsors are in Sanity and the
 *                              page is linked from the nav.
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://petfest.com.au").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getAllEvents();
  const eventRoutes: MetadataRoute.Sitemap = events
    .filter((e) => e.slug)
    .map((e) => ({
      url: `${SITE_URL}/events/${e.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/events`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/stall-holders`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...eventRoutes,
  ];
}
