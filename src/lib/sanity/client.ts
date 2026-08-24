import { createClient } from "next-sanity";

/**
 * Sanity client wired through `next-sanity` so fetches integrate with the
 * Next.js fetch cache. Call sites pass `{ next: { tags: ["sanity:<doc-id>"] } }`
 * so the webhook in /api/revalidate can invalidate just what changed.
 *
 * The client throws at fetch time if the project ID env var is missing —
 * call sites should guard with `isSanityConfigured()` before fetching so
 * the site keeps rendering during early dev (before the Sanity project
 * exists) and if env vars are ever unset by mistake.
 *
 * useCdn is deliberately FALSE. Sanity's API CDN is eventually consistent
 * (it lags a publish by seconds–minutes), which races our webhook: after a
 * publish the webhook revalidates the Next cache, the page re-fetches, but
 * the CDN can still return the OLD value and Next re-caches it — so an edit
 * appears then "reverts". Every read here is already wrapped in `"use cache"`
 * (see the get-*.ts helpers), so Next's cache handles performance; hitting
 * the live API means revalidation always gets fresh, authoritative data.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "missing-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
});

export function isSanityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "missing-project-id",
  );
}
