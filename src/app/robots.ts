import type { MetadataRoute } from "next";

/**
 * Crawler instructions. Generated automatically at /robots.txt.
 *
 * Disallow rules:
 *   - /studio           — admin interface, no benefit to indexing
 *   - /api              — internal endpoints, never user-facing
 *   - /policies/(rendered fallbacks) — the PDFs in /public/policies/
 *                         are the canonical legal docs (linked from the
 *                         footer); these in-site versions are
 *                         duplicate content and should not be indexed.
 *
 * Everything else is allowed. The PDFs in /public/policies/*.pdf are
 * NOT blocked — letting legal docs be indexed is normal practice.
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://petfest.com.au").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio",
          "/studio/",
          "/api/",
          "/policies/terms",
          "/policies/privacy",
          "/policies/code-of-conduct",
          "/policies/refund",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
