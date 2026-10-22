// Clear values left behind by fields that were removed from the schema.
//
// Removing a field from a Sanity schema does NOT delete its stored value —
// Studio then shows an "Unknown field found" warning on that document. This
// script unsets those leftover values (published docs AND drafts) for the
// fields listed in ORPHANED below.
//
// SAFETY: same guards as seed-events.mjs — you must name the dataset, and
// writes to the LIVE project (SANITY_PROD_PROJECT_ID) are refused unless you
// pass --allow-production. Runs as a dry run unless --apply is given.
//
// Prerequisites: SANITY_WRITE_TOKEN (Editor token for the target project) and
// NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local.
//
// Usage:
//   npm run unset:orphaned -- --dataset=production            # dry run
//   npm run unset:orphaned -- --dataset=production --apply    # clear values
//   npm run unset:orphaned -- --dataset=production --project=<prodId> --allow-production --apply

import { createClient } from "@sanity/client";

// Document type → fields removed from its schema whose stored values
// should be cleared. Add entries here when a schema field is removed.
const ORPHANED = {
  // Removed when the /sponsors page switched to the enquiry form
  // (empty state dropped; the CTA button became the form).
  sponsorsPage: ["emptyStateHeading", "emptyStateBody", "ctaButtonLabel"],
};

const args = process.argv.slice(2);
const getFlag = (name) => args.includes(`--${name}`);
const getOpt = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : undefined;
};

const dataset = getOpt("dataset");
const apply = getFlag("apply");
const allowProduction = getFlag("allow-production");

const projectId = getOpt("project") ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const prodProjectId = process.env.SANITY_PROD_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

if (!dataset) fail("No dataset given. Pass --dataset=<name> (e.g. --dataset=production).");
if (!projectId || projectId === "missing-project-id") {
  fail("No project id. Set NEXT_PUBLIC_SANITY_PROJECT_ID (run with --env-file=.env.local) or pass --project=<id>.");
}
if (!token) {
  fail("SANITY_WRITE_TOKEN is not set. Create an Editor token in the target Sanity project and add it to .env.local.");
}
if (apply && prodProjectId && projectId === prodProjectId && !allowProduction) {
  fail(
    `Project '${projectId}' is your LIVE site (matches SANITY_PROD_PROJECT_ID). ` +
      "Refusing to write. Re-run with --allow-production only if you truly intend to change petfest.com.au.",
  );
}
if (!prodProjectId) {
  console.warn(
    "\n⚠  SANITY_PROD_PROJECT_ID is not set, so there's no automatic live-site guard.\n" +
      "   Double-check the project id printed below is the one you mean.",
  );
}

// "raw" perspective so drafts (drafts.*) are returned alongside published docs.
const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false, perspective: "raw" });

console.log(`\nTarget → project: ${projectId}   dataset: ${dataset}   mode: ${apply ? "APPLY" : "dry run"}\n`);

try {
  const tx = client.transaction();
  let count = 0;

  for (const [type, fields] of Object.entries(ORPHANED)) {
    const docs = await client.fetch(
      `*[_type == $type && (${fields.map((f) => `defined(${f})`).join(" || ")})]`,
      { type },
    );
    for (const doc of docs) {
      const present = fields.filter((f) => doc[f] !== undefined);
      console.log(`• ${doc._id}`);
      for (const f of present) console.log(`    ${f}: ${JSON.stringify(doc[f])}`);
      tx.patch(doc._id, (p) => p.unset(present));
      count++;
    }
  }

  if (count === 0) {
    console.log("✓ Nothing to clean — no orphaned values found.\n");
  } else if (!apply) {
    console.log(`\n${count} document(s) would be patched. Re-run with --apply to clear these values.\n`);
  } else {
    await tx.commit();
    console.log(`\n✓ Cleared orphaned values from ${count} document(s).\n`);
  }
} catch (err) {
  fail(`Sanity request failed: ${err.message}`);
}
