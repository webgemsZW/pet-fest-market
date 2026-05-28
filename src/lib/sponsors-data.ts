/*
  Single source of truth for sponsors.

  Both the (currently hidden) `SponsorPreviewSection` on the homepage and
  the `/sponsors` page read from this file so they cannot drift apart.

  TODO(content): The previous version of the site hardcoded fake sponsor
  names ("Paws & Co.", "Happy Tails Vet", "Bark & Brew", etc.) — none of
  these are real partners. The 25 May email from the client confirms no
  sponsors are signed yet for the Box Hill 26 July 2026 launch event.

  While `sponsors` is empty:
    - the `/sponsors` page is hidden from header + footer navigation.
    - `<SponsorPreviewSection />` is commented out of the homepage
      (see src/app/page.tsx).
    - the `/sponsors` page itself still exists (for direct linking) and
      shows a placeholder state.

  When the first sponsor is signed:
    1. Add an entry to `sponsors` below with name + tier + tagline.
    2. Uncomment the `/sponsors` link in both Header.tsx and Footer.tsx.
    3. Uncomment `<SponsorPreviewSection />` in src/app/page.tsx.
*/

export type SponsorTier = "platinum" | "gold" | "silver" | "bronze";

export interface Sponsor {
  name: string;
  tier: SponsorTier;
  tagline: string;
}

export const sponsors: Sponsor[] = [];

export const tierConfig: Record<
  SponsorTier,
  { label: string; emoji: string; bgClass: string; textClass: string; badgeClass: string }
> = {
  platinum: {
    label: "Platinum",
    emoji: "⭐",
    bgClass: "bg-gray-50",
    textClass: "text-gray-800",
    badgeClass: "bg-gray-200 text-gray-700",
  },
  gold: {
    label: "Gold",
    emoji: "🏅",
    bgClass: "bg-amber-50",
    textClass: "text-amber-900",
    badgeClass: "bg-amber-200 text-amber-800",
  },
  silver: {
    label: "Silver",
    emoji: "🥈",
    bgClass: "bg-slate-50",
    textClass: "text-slate-800",
    badgeClass: "bg-slate-200 text-slate-700",
  },
  bronze: {
    label: "Bronze",
    emoji: "🥉",
    bgClass: "bg-orange-50",
    textClass: "text-orange-900",
    badgeClass: "bg-orange-200 text-orange-800",
  },
};
