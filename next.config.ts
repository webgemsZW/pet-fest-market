import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Next 16 Cache Components so functions tagged with `"use cache"`
  // are bucketed by `cacheLife` profile and can be invalidated via
  // `revalidateTag(tag, profile)`. Required for the Sanity webhook in
  // /api/revalidate to actually invalidate cached fetches.
  cacheComponents: true,
  // Cache profile for all Sanity reads (see src/lib/sanity/*).
  //   stale: 0      — clients always revalidate, so a published change shows
  //                   on the next normal refresh (no incognito needed).
  //   revalidate: 900 (15 min) — background safety net: even if the Sanity
  //                   webhook ever misses, content self-heals within 15 min.
  //   expire: 3600 (1 hr) — hard cap before a blocking refresh.
  // Real edits still appear (near-)instantly via the /api/revalidate webhook;
  // these values only bound how stale things can get if that ever fails.
  cacheLife: {
    sanity: {
      stale: 0,
      revalidate: 900,
      expire: 3600,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
