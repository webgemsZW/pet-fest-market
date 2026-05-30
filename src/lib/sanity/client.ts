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
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "missing-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
});

export function isSanityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "missing-project-id",
  );
}
