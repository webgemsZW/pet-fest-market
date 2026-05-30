import {
  Heart,
  Store,
  Users,
  Star,
  Smile,
  ShoppingBag,
  PawPrint,
  CalendarDays,
  MapPin,
  Ticket,
  Sparkles,
  HandCoins,
  Music,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for the icons available to editors via Sanity
 * schemas that have an `icon` field. The keys here are the string values
 * editors choose in Studio; the values are the React components rendered
 * on the site.
 *
 * To add a new icon:
 *   1. Import it from `lucide-react` above.
 *   2. Add an entry below.
 *   3. Add a matching `{ title, value }` entry to `iconChoices` in
 *      src/lib/sanity/schemas/_icon-field.ts so editors can pick it.
 */
export const ICON_REGISTRY: Record<string, LucideIcon> = {
  "shopping-bag": ShoppingBag,
  heart: Heart,
  users: Users,
  star: Star,
  smile: Smile,
  store: Store,
  "paw-print": PawPrint,
  calendar: CalendarDays,
  "map-pin": MapPin,
  ticket: Ticket,
  sparkles: Sparkles,
  "hand-coins": HandCoins,
  music: Music,
};

export type IconName = keyof typeof ICON_REGISTRY;

interface IconProps {
  name?: string | null;
  fallback?: IconName;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * Render an icon picked by an editor. Falls back to a safe default if
 * the saved icon name isn't (or is no longer) in the registry — so
 * removing an entry from `ICON_REGISTRY` never breaks the page, it just
 * shows the fallback icon.
 */
export function Icon({
  name,
  fallback = "sparkles",
  className,
  ...rest
}: IconProps) {
  const Resolved = (name && ICON_REGISTRY[name]) || ICON_REGISTRY[fallback];
  return <Resolved className={className} {...rest} />;
}
