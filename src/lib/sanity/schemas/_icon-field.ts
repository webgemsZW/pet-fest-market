/**
 * Shared icon picker used across multiple schemas (About values, Homepage
 * "What to Expect" cards, etc.). Keep this list in sync with
 * `ICON_REGISTRY` in src/lib/icon-registry.tsx — the keys MUST match.
 *
 * Why a shared list: lets editors pick from a consistent set of icons,
 * and means adding a new icon is a two-file change (one for display, one
 * for the editor dropdown) rather than touching every schema.
 */
export const iconChoices = [
  { title: "Shopping bag", value: "shopping-bag" },
  { title: "Heart", value: "heart" },
  { title: "Users", value: "users" },
  { title: "Star", value: "star" },
  { title: "Smile", value: "smile" },
  { title: "Store", value: "store" },
  { title: "Paw print", value: "paw-print" },
  { title: "Calendar", value: "calendar" },
  { title: "Map pin", value: "map-pin" },
  { title: "Ticket", value: "ticket" },
  { title: "Sparkles", value: "sparkles" },
  { title: "Hand with coins", value: "hand-coins" },
  { title: "Music note", value: "music" },
];
