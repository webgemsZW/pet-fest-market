/*
  Tier styling for sponsors. Sponsor records themselves live in Sanity
  (see @/lib/sanity/get-sponsors) — this file only supplies `tierConfig`,
  which the /sponsors page and <SponsorPreviewSection /> use for labels
  and colours.

  The `sponsors` array below is a legacy empty list and is not read by the
  site.
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
