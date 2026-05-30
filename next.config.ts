import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Next 16 Cache Components so functions tagged with `"use cache"`
  // are bucketed by `cacheLife` profile and can be invalidated via
  // `revalidateTag(tag, profile)`. Required for the Sanity webhook in
  // /api/revalidate to actually invalidate cached fetches.
  cacheComponents: true,
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
