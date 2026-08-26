import React from "react";
import Link from "next/link";
import { CITIES, citySlug, type City } from "@/lib/cities";

/**
 * City filter chips shown on /events and /events/<city>. Plain links (no
 * client state) — "All Markets" → /events and each city → /events/<city> —
 * so visitors can switch cities without going back to the home page. The
 * active chip is highlighted. Reuses the existing per-city routes rather than
 * client-side filtering, so URLs stay shareable and crawlable.
 */
export function CityFilter({ active }: { active: "all" | City }) {
  const base =
    "inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-all active:scale-95";
  const activeCls = "bg-brand-600 text-white shadow";
  const idleCls = "border-2 border-brand-600 bg-white text-brand-700 hover:bg-brand-50";

  const chips: Array<{ label: string; href: string; isActive: boolean }> = [
    { label: "All Markets", href: "/events", isActive: active === "all" },
    ...CITIES.map((c) => ({
      label: c,
      href: `/events/${citySlug(c)}`,
      isActive: active === c,
    })),
  ];

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {chips.map((chip) => (
        <Link
          key={chip.href}
          href={chip.href}
          aria-current={chip.isActive ? "page" : undefined}
          className={`${base} ${chip.isActive ? activeCls : idleCls}`}
        >
          {chip.label}
        </Link>
      ))}
    </div>
  );
}
