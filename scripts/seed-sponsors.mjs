// Seed / remove DEMO sponsor documents in a Sanity dataset, so the Sponsors
// page (and homepage sponsor strip) can be previewed with realistic data.
//
// Everything here is obviously fake: invented businesses, example.com links,
// and generated placeholder logos (a coloured tile with initials). Every doc
// uses a fixed `sponsor-demo-*` _id, so re-running updates in place and
// `--delete` removes exactly this set without touching real sponsors.
//
// Same safety model as seed-events.mjs: you must name the dataset, and the
// live site is guarded by PROJECT ID (SANITY_PROD_PROJECT_ID in .env.local),
// not dataset name — "production" exists in both the dev and live projects.
//
// Usage:
//   npm run seed:sponsors -- --dataset=production --project=<devProjectId>
//   npm run seed:sponsors -- --dataset=production --project=<devProjectId> --delete
//
// Needs SANITY_WRITE_TOKEN (Editor) for the target project in .env.local.

import { createClient } from "@sanity/client";
import sharp from "sharp";

const args = process.argv.slice(2);
const getFlag = (name) => args.includes(`--${name}`);
const getOpt = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : undefined;
};

const dataset = getOpt("dataset") ?? process.env.SANITY_SEED_DATASET;
const deleteMode = getFlag("delete");
const allowProduction = getFlag("allow-production");

const projectId = getOpt("project") ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const prodProjectId = process.env.SANITY_PROD_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

if (!dataset) fail("No dataset given. Pass --dataset=<name> (required so the script never silently picks a target).");
if (!projectId || projectId === "missing-project-id") {
  fail("No project id. Set NEXT_PUBLIC_SANITY_PROJECT_ID (run with --env-file=.env.local) or pass --project=<id>.");
}
if (!token) fail("SANITY_WRITE_TOKEN is not set. Add an Editor token for the target project to .env.local.");
if (prodProjectId && projectId === prodProjectId && !allowProduction) {
  fail(
    `Project '${projectId}' is your LIVE site (matches SANITY_PROD_PROJECT_ID). ` +
      "Refusing to write demo data there. Re-run with --allow-production only if you truly mean to.",
  );
}
if (!prodProjectId) {
  console.warn(
    "\n⚠  SANITY_PROD_PROJECT_ID is not set, so there's no automatic live-site guard.\n" +
      "   Double-check the project id printed below is your DEV project before continuing.",
  );
}

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false });

// `color` is the logo tile background; `logo: false` leaves the logo empty so
// you can see the paw fallback. `website: null` shows a non-clickable card.
const sponsors = [
  { id: "platinum-1", name: "Waggle & Co", tagline: "Premium pet food & treats", tier: "platinum", order: 10, color: "#f6861f", website: "https://example.com/waggle" },
  { id: "platinum-2", name: "Harbour Vet Group", tagline: "Caring for pets across Melbourne", tier: "platinum", order: 20, color: "#2563eb", website: "https://example.com/harbour-vet" },
  { id: "gold-1", name: "Pawsitive Grooming", tagline: "Mobile grooming & pet spa", tier: "gold", order: 10, color: "#16a34a", website: "https://example.com/pawsitive" },
  { id: "gold-2", name: "Nest & Whisker", tagline: "Handmade beds, blankets & toys", tier: "gold", order: 20, color: "#9333ea", website: "https://example.com/nest-whisker" },
  { id: "gold-3", name: "Tailored Insurance", tagline: "Pet insurance made simple", tier: "gold", order: 30, color: "#0891b2", website: null },
  { id: "silver-1", name: "Fetch Pet Photography", tagline: "Portraits your pet will love", tier: "silver", order: 10, color: "#db2777", website: "https://example.com/fetch" },
  { id: "silver-2", name: "The Treat Jar", tagline: "Small-batch baked treats", tier: "silver", order: 20, color: "#ca8a04", website: "https://example.com/treat-jar" },
  { id: "silver-3", name: "Companion Training", tagline: "Positive-reward training classes", tier: "silver", order: 30, color: "#475569", website: null, logo: false },
  { id: "bronze-1", name: "Little Paws Rescue", tagline: "Community animal rescue", tier: "bronze", order: 10, color: "#dc2626", website: "https://example.com/little-paws" },
  { id: "bronze-2", name: "Box Hill Pet Supplies", tagline: null, tier: "bronze", order: 20, color: "#65a30d", website: "https://example.com/bh-pet-supplies" },
  { id: "bronze-3", name: "Whiskers Cafe", tagline: "Coffee for pet lovers", tier: "bronze", order: 30, color: "#78350f", website: null },
];

const docId = (s) => `sponsor-demo-${s.id}`;

const initials = (name) =>
  name
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

/** A 400×400 transparent-corner PNG: coloured rounded tile with white initials. */
async function makeLogo(name, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect width="400" height="400" rx="72" fill="${color}"/>
    <text x="200" y="262" font-family="Arial, Helvetica, sans-serif" font-size="190" font-weight="700"
          fill="#ffffff" text-anchor="middle">${initials(name)}</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

console.log(`\nTarget → project: ${projectId}   dataset: ${dataset}\n`);

try {
  if (deleteMode) {
    const tx = client.transaction();
    for (const s of sponsors) tx.delete(docId(s));
    await tx.commit();
    console.log(`✓ Removed ${sponsors.length} demo sponsor(s) from '${dataset}'.`);
    console.log("  (Uploaded logo images stay in the media library as unused assets — harmless.)\n");
  } else {
    const tx = client.transaction();
    for (const s of sponsors) {
      const doc = {
        _id: docId(s),
        _type: "sponsor",
        name: s.name,
        tier: s.tier,
        order: s.order,
        ...(s.tagline ? { tagline: s.tagline } : {}),
        ...(s.website ? { website: s.website } : {}),
      };
      if (s.logo !== false) {
        const asset = await client.assets.upload("image", await makeLogo(s.name, s.color), {
          filename: `demo-sponsor-${s.id}.png`,
          contentType: "image/png",
        });
        doc.logo = { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: s.name };
      }
      tx.createOrReplace(doc);
    }
    await tx.commit();
    console.log(`✓ Seeded ${sponsors.length} demo sponsor(s) into '${dataset}':`);
    for (const s of sponsors) console.log(`    • [${s.tier}] ${s.name}`);
    console.log("");
  }
} catch (err) {
  fail(`Sanity write failed: ${err.message}`);
}
