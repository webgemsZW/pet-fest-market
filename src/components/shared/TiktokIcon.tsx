import React from "react";

/**
 * TikTok logo. `lucide-react` doesn't ship one (TikTok's branding
 * guidelines restrict third-party packages), so we inline a small SVG
 * that follows the same `className` / aria conventions as the other
 * lucide icons we use.
 */
export function TiktokIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M19.6 6.86a4.83 4.83 0 0 1-3.77-4.6V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.9 21.18a6.32 6.32 0 0 0 10.7-4.5V9.42a8.16 8.16 0 0 0 4.77 1.52V7.5a4.85 4.85 0 0 1-1.77-.64Z" />
    </svg>
  );
}
