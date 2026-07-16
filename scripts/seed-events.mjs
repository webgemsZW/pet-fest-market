// Seed / remove sample event documents in a Sanity dataset.
//
// SAFETY: this script never guesses a target. You must name the dataset,
// and — because "production" is just a dataset name that exists in BOTH
// the dev and the live Sanity projects — the real live-site guard keys off
// the PROJECT ID, not the dataset name. Set SANITY_PROD_PROJECT_ID in
// .env.local to the live site's (Andrea's) project ID and this script will
// refuse to write there unless you also pass --allow-production.
//
// Prerequisites:
//   1. A WRITE token for the project you're targeting (Sanity manage →
//      that project → API → Tokens → "Editor"). Put it in .env.local as:
//        SANITY_WRITE_TOKEN=sk...
//   2. NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local (the project localhost
//      uses). Override per-run with --project=<id> if needed.
//   3. (Recommended) SANITY_PROD_PROJECT_ID in .env.local = the LIVE
//      site's project ID, so a mis-pointed run at production is blocked.
//
// Usage (Node 20.6+ loads .env.local via --env-file):
//   node --env-file=.env.local scripts/seed-events.mjs --dataset=production
//   node --env-file=.env.local scripts/seed-events.mjs --dataset=production --delete
//   node --env-file=.env.local scripts/seed-events.mjs --dataset=production --project=<prodId> --allow-production
//
// Or via npm (append args after --):
//   npm run seed:events -- --dataset=production            # seed / update
//   npm run seed:events -- --dataset=production --delete   # remove the seeded set
//   npm run seed:events -- --dataset=production --wipe-all # remove EVERY event doc
//
// Modes:
//   (default)   createOrReplace the sample events (idempotent — fixed _ids,
//               so re-running updates in place rather than duplicating).
//   --delete    remove exactly the sample events this script creates. Leaves
//               any events you made by hand in Studio untouched.
//   --wipe-all  remove ALL event documents in the dataset (handy to reset to
//               the empty state for testing). Same live-site guard applies.

import { createClient } from "@sanity/client";

const args = process.argv.slice(2);
const getFlag = (name) => args.includes(`--${name}`);
const getOpt = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : undefined;
};

const dataset = getOpt("dataset") ?? process.env.SANITY_SEED_DATASET;
const deleteMode = getFlag("delete");
const wipeAll = getFlag("wipe-all");
const allowProduction = getFlag("allow-production");

const projectId = getOpt("project") ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const prodProjectId = process.env.SANITY_PROD_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

if (!dataset) {
  fail(
    "No dataset given. Pass --dataset=<name> (e.g. --dataset=production for your dev project). " +
      "Required on purpose so the script can never silently pick a target.",
  );
}
if (!projectId || projectId === "missing-project-id") {
  fail("No project id. Set NEXT_PUBLIC_SANITY_PROJECT_ID (run with --env-file=.env.local) or pass --project=<id>.");
}
if (!token) {
  fail("SANITY_WRITE_TOKEN is not set. Create an Editor token in the target Sanity project and add it to .env.local.");
}
// The real live-site guard: block writes to the production PROJECT (not
// merely a dataset literally named "production", which also exists in the
// safe dev project).
if (prodProjectId && projectId === prodProjectId && !allowProduction) {
  fail(
    `Project '${projectId}' is your LIVE site (matches SANITY_PROD_PROJECT_ID). ` +
      "Refusing to write. Re-run with --allow-production only if you truly intend to change petfest.com.au.",
  );
}
if (!prodProjectId) {
  console.warn(
    "\n⚠  SANITY_PROD_PROJECT_ID is not set, so there's no automatic live-site guard.\n" +
      "   Double-check the project id printed below is your DEV project before continuing.",
  );
}

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false });

// The three client-confirmed markets. Facts only (name, date, venue, trading
// times) — no marketing copy is invented. `blurb`, ticket + apply URLs are
// left unset so the site falls back to its defaults (the default apply form).
// Times: Box Hill (Jul) & Disterrly Rd QLD are +10:00; Morris Moore (Nov, VIC)
// is +11:00 (daylight saving).
const events = [
  {
    _id: "event-box-hill-2026",
    _type: "event",
    eventName: "Box Hill Town Hall 2026",
    slug: { _type: "slug", current: "box-hill-town-hall-2026" },
    eventDate: "2026-07-26T10:00:00+10:00",
    doorsOpenTime: "10am",
    eventEndTime: "3pm",
    timezone: "Australia/Melbourne",
    location: "Box Hill Town Hall, VIC",
  },
  {
    _id: "event-disterrly-road-2026",
    _type: "event",
    eventName: "Disterrly Road Market 2026",
    slug: { _type: "slug", current: "disterrly-road-market-2026" },
    eventDate: "2026-11-01T10:00:00+10:00",
    doorsOpenTime: "10am",
    eventEndTime: "3pm",
    timezone: "Australia/Brisbane",
    location: "Disterrly Road Market, QLD",
  },
  {
    _id: "event-morris-moore-2026",
    _type: "event",
    eventName: "Morris Moore 2026",
    slug: { _type: "slug", current: "morris-moore-2026" },
    eventDate: "2026-11-15T10:00:00+11:00",
    doorsOpenTime: "10am",
    eventEndTime: "3pm",
    timezone: "Australia/Melbourne",
    location: "Morris Moore, Cheltenham, VIC",
  },
];

console.log(`\nTarget → project: ${projectId}   dataset: ${dataset}\n`);

try {
  if (wipeAll) {
    const { results = [] } = await client.delete({ query: '*[_type == "event"]' });
    console.log(`✓ Wiped ${results.length} event document(s) from '${dataset}'.\n`);
  } else if (deleteMode) {
    const tx = client.transaction();
    for (const e of events) tx.delete(e._id);
    await tx.commit();
    console.log(`✓ Removed ${events.length} seeded event(s) from '${dataset}'.\n`);
  } else {
    const tx = client.transaction();
    for (const e of events) tx.createOrReplace(e);
    await tx.commit();
    console.log(`✓ Seeded ${events.length} event(s) into '${dataset}':`);
    for (const e of events) console.log(`    • ${e.eventName}  (/events/${e.slug.current})`);
    console.log("");
  }
} catch (err) {
  fail(`Sanity write failed: ${err.message}`);
}
