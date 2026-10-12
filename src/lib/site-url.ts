/**
 * The site's public origin — single source for `metadataBase`, canonical
 * URLs, the sitemap, robots.txt and JSON-LD, so they can never disagree.
 *
 * The production domain is served from `www.petfest.com.au`; the apex
 * `petfest.com.au` 308-redirects to it (Vercel domain settings). Canonical
 * URLs must point at the host that actually serves the page, so the apex is
 * normalised to `www` here regardless of how NEXT_PUBLIC_SITE_URL or
 * VERCEL_PROJECT_PRODUCTION_URL is set. If the primary domain ever changes,
 * update this file.
 */
const rawOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_URL = rawOrigin
  .replace(/\/$/, "")
  .replace(/^https?:\/\/petfest\.com\.au$/, "https://www.petfest.com.au");
