# PetFest Market — CMS Implementation Plan

> Living plan for wiring the PetFest Market site to a content management
> system (CMS) so Andrea, Carolyn, and I can update copy and assets without
> a developer in the loop. Owned by Charles. Last updated:
> **2026-05-29**.

---

## 1. Background & goal

The PetFest Market site is currently a Next.js 16 application on Vercel with
all content hardcoded in React components. Most of the visible copy is
either source-of-truth (from client `.docx` files) or lorem-ipsum
placeholder waiting on client content. Updating anything means a code change
and a redeploy.

**Goal:** let non-technical editors maintain page copy, FAQs, sponsors, and
key event details through a friendly web UI without touching code. The
public site should pick up changes within seconds, not minutes, and should
keep working safely if the CMS is unreachable.

---

## 2. What's already in the codebase

The Sanity CMS scaffolding is roughly 60% built. Today, none of it is
actually consumed by any page — everything renders from hardcoded React.

| Already in place | Status |
|---|---|
| `sanity` + `next-sanity` + `@sanity/client` + `@sanity/image-url` in `package.json` | ✅ Installed |
| `sanity.config.ts` with singletons + collection structure | ✅ Configured |
| `src/app/studio/[[...tool]]/page.tsx` — embedded Studio at `/studio` | ✅ Wired |
| `src/lib/sanity/schemas/` — schemas for site/event/page/FAQ/sponsor | ⚠️ Need audit + rework (see §9) |
| `src/lib/sanity/client.ts`, `queries.ts`, `image.ts` | ⚠️ Defined but no page imports them |
| Any actual page fetching from Sanity | ❌ None |

We're **not starting from scratch.** Most of the structural decisions
(Sanity over Payload/Strapi/custom, embedded Studio over hosted Studio) were
already taken when this scaffolding was added. This plan finishes what's
been started.

---

## 3. Settled decisions

The following are locked in unless explicitly revisited:

| Topic | Decision |
|---|---|
| **CMS** | Sanity v3 (continue existing scaffolding) |
| **Editors** | 3 named seats — Charles, Andrea, Carolyn — fits Sanity free tier (3 users / 10K docs / 1M API requests / 500MB assets / 10GB bandwidth per project) |
| **Auth method** | Google sign-in (email magic link enabled as fallback if any editor prefers not to use Google) |
| **Image hosting** | Sanity CDN, not Vercel Blob — keeps upload UX inside Studio and gives editor-friendly cropping/hotspot out of the box |
| **Legal pages** | Privacy / Terms / Code of Conduct stay as code, edited by PR with the `.docx` in `site-info/docs/`. They change rarely and are legal documents. |
| **Global site details** | Email / phone / address / acknowledgement live in **one place** (Site Settings) and are referenced from both the footer and the Contact page (Option A — single source of truth) |
| **FAQ "Pets" category** | Kept as-is — will hold future pet-related Q&A (e.g. "what pet products will vendors sell?"). Editors must not write content that implies pets are allowed at the venue. |
| **Account split** | Two separate Sanity **projects** — dev under Charles's account, prod under the client's account (Option 1). Charles invited as admin to the client's project for schema migrations. |
| **Caching** | Next.js 16 Cache Components — every Sanity fetch wrapped with `use cache` + `cacheTag('sanity:<doc-id>')`. Webhook from Sanity hits `/api/revalidate` and calls `revalidateTag()`. |
| **Draft / preview mode** | `next-sanity` draft handoff. Editors click "Preview" in Studio → land on the live site rendering unpublished content via Next.js draft mode. |
| **Multi-event readiness** | Data model is multi-event-ready from day one — `eventSettings` is a **collection**, not a singleton, and `siteSettings.currentEvent` points at the active one. UI and navigation remain single-event for v1 (no event listing, no calendar, no archive). See §15 for the deferred-until-needed list. |

---

## 4. Architecture

```
┌────────────────────────────────┐          ┌────────────────────────────────┐
│   Sanity Cloud — DEV project   │          │   Sanity Cloud — PROD project  │
│   owner: Charles               │          │   owner: client (Andrea)       │
│   members: Charles             │          │   members: Andrea, Carolyn,    │
│                                │          │            Charles (admin)     │
│   datasets: production         │          │   datasets: production         │
└──────────────┬─────────────────┘          └───────────────┬────────────────┘
               │ publish webhook                            │ publish webhook
               ▼                                            ▼
        ┌──────────────────────────────────────────────────────────┐
        │   Next.js 16 on Vercel                                   │
        │                                                          │
        │   Per-environment env vars decide which Sanity project   │
        │   the deploy talks to:                                   │
        │     • Development + Preview  →  DEV project              │
        │     • Production             →  PROD project             │
        │                                                          │
        │   Pages (RSC):                                           │
        │     ┌────────────────────────────────────────────┐       │
        │     │  use cache                                 │       │
        │     │  cacheLife('weeks')                        │       │
        │     │  cacheTag('sanity:<docId>')                │       │
        │     │  const data = await sanityClient.fetch(…)  │       │
        │     └────────────────────────────────────────────┘       │
        │                                                          │
        │   Routes:                                                │
        │     /studio                  → embedded Sanity Studio    │
        │     /api/revalidate          → webhook target            │
        │     /api/draft-mode/enable   → Studio → preview handoff  │
        │     /api/draft-mode/disable  → exit preview              │
        └──────────────────────────────────────────────────────────┘
                ▲
                │
       ┌────────┴────────┐
       │  Editors        │
       │  Andrea         │   → https://petfest.com.au/studio    (PROD)
       │  Carolyn        │   → https://petfest.com.au/studio    (PROD)
       │  Charles        │   → http://localhost:3000/studio     (DEV)
       │                 │   → https://<preview>.vercel.app/studio (DEV)
       └─────────────────┘
```

### Why this shape works on Vercel

- **No extra infrastructure.** The Studio is just another route in the
  Next.js app. The webhook is just an API route. No separate database, no
  separate admin app, no extra build pipeline.
- **Sanity's CDN handles assets.** No Vercel Blob configuration needed.
- **Cache-tag invalidation is near-instant.** When an editor hits Publish,
  Sanity fires a webhook within ~1 second; Vercel revalidates the relevant
  tag(s) and serves fresh content on the next request — without a full
  rebuild.
- **Build-time fallback.** If Sanity is ever unreachable, the most recent
  cached fetch keeps serving. The site doesn't 500 because the CMS is
  having a bad day.

---

## 5. Two-project setup (dev + prod)

The "two separate projects" approach gives the client clean ownership of
their own data while keeping Charles's dev sandbox out of their hair.

### 5.1 Account & project creation order

| Step | Who | What |
|---|---|---|
| 1 | Charles | Create or sign in to Sanity account |
| 2 | Charles | `npx sanity init` → create **dev project** "PetFest Market — Dev". Note the project ID. |
| 3 | Andrea | Sign up at sanity.io with the email she wants tied to the account (her business email, ideally) |
| 4 | Andrea | Create **prod project** "PetFest Market" (no "— Dev" suffix). Note the project ID. |
| 5 | Andrea | In prod project → Members → invite Carolyn (admin) and Charles (admin) |
| 6 | Charles | Accept invite |
| 7 | Charles | In each project → API → CORS origins → add the relevant URLs (see §5.3) |
| 8 | Charles | In each project → API → Tokens → create a **read token** (label: "next-sanity production read") |
| 9 | Charles | In each project → API → Webhooks → create a publish webhook pointing at `/api/revalidate` (see §7) |

### 5.2 Why the prod project is owned by the client

Sanity bills the project owner. By having Andrea own the prod project from
day one:

- The free tier is attached to her account, not Charles's.
- If she ever scales beyond the free tier, the upgrade prompt lands in her
  inbox (not Charles's).
- If Charles ever stops being involved, ownership doesn't need transferring
  — she already has it.
- Charles still has full admin access via the invitation.

### 5.3 CORS origins to configure per project

Sanity will block browser-side requests from any origin not in this list.

**Dev project** (`PetFest Market — Dev`):
- `http://localhost:3000`
- `https://*-charles-the-developer.vercel.app` (or whatever your Vercel
  preview URL pattern is)

**Prod project** (`PetFest Market`):
- `https://petfest.com.au` (or whatever the live domain ends up being)
- `https://www.petfest.com.au` if a `www` redirect is configured

### 5.4 Members & roles

**Dev project:**
- Charles — Administrator

**Prod project:**
- Andrea — Administrator (owner)
- Carolyn — Editor (can publish content, can't change project settings)
- Charles — Administrator (so he can update schemas, manage webhooks, etc.)

### 5.5 Schema migrations

The schemas live in this repo in `src/lib/sanity/schemas/`. They're shared
between both projects automatically — when a `next build` runs and the
Studio is served, whichever project the env vars point at picks up the
latest schema.

This is normally seamless **but breaks down if a field is renamed
or removed** while real content exists. Migration hygiene:

- Never rename a field in place. Add the new field, migrate data with a
  one-off Sanity CLI script, then remove the old field in a follow-up.
- Never delete a field that has real published content without copying that
  content somewhere first.
- For destructive schema changes, test on dev first by populating dummy
  content that exercises the old field, then run the migration, then check
  the Studio still loads cleanly. Only then deploy to prod.

---

## 6. Vercel environment variables

These get configured in the Vercel dashboard for the PetFest Market project,
scoped per environment.

### 6.1 Required variables

| Variable | Production | Preview & Development | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | client project ID | dev project ID | `NEXT_PUBLIC_` so the embedded Studio bundle can read it |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | `production` | Both projects use a single `production` dataset internally (the projects themselves are the separation) |
| `SANITY_API_READ_TOKEN` | client project read token | dev project read token | Server-side only — NO `NEXT_PUBLIC_` prefix |
| `SANITY_REVALIDATE_SECRET` | random 32-char string A | random 32-char string B | Validates incoming webhooks (see §7) |
| `NEXT_PUBLIC_SITE_URL` | `https://petfest.com.au` | (leave unset — auto-derived from Vercel) | Already used in `layout.tsx` for `metadataBase` |

### 6.2 Local development

In `.env.local` (gitignored), set the dev project's values:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<dev project id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<dev read token>
SANITY_REVALIDATE_SECRET=<any string, only matters when testing webhooks locally>
```

### 6.3 Marketplace integration as an alternative

Vercel's Sanity Marketplace integration auto-provisions
`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` for you,
but only against a single project. Because we want **different projects
per environment**, we'll do the env-var wiring manually. The Marketplace
integration is fine for single-project setups but doesn't fit ours.

---

## 7. Caching & revalidation

Strategy in one sentence: **fetch from Sanity once, cache forever, invalidate
on publish.**

### 7.1 How a page fetch looks

```ts
// Example sketch — not yet wired up.
import { unstable_cache } from "next/cache"; // or use the `use cache` directive
import { sanityClient } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/sanity/queries";

async function getHomepage() {
  "use cache";
  cacheLife("weeks");           // very long — invalidated by tag, not time
  cacheTag("sanity:homepage");  // tied to the singleton doc id

  return sanityClient.fetch(homepageQuery);
}
```

Every fetch gets tagged with the document ID it depends on. The tag is what
gets invalidated when an editor publishes.

### 7.2 Webhook endpoint — `/api/revalidate`

A POST route that Sanity hits whenever content is published.

```ts
// /src/app/api/revalidate/route.ts (sketch)
export async function POST(req: Request) {
  const signature = req.headers.get("sanity-webhook-signature") ?? "";
  const body = await req.text();

  // Validate the signature against SANITY_REVALIDATE_SECRET
  // (Sanity's libraries provide a helper for this — implementation TBD.)

  const { _id, _type } = JSON.parse(body);

  // Tag-based invalidation
  revalidateTag(`sanity:${_id}`);
  revalidateTag(`sanity:type:${_type}`); // for collections like FAQs/sponsors

  return Response.json({ revalidated: true });
}
```

### 7.3 Webhook setup in Sanity

Each project (dev + prod) gets its own webhook configured in the Sanity
dashboard → API → Webhooks:

| Field | Value |
|---|---|
| Name | "Vercel revalidate" |
| URL | dev: `https://<preview-domain>.vercel.app/api/revalidate` <br/> prod: `https://petfest.com.au/api/revalidate` |
| Dataset | `production` |
| Trigger on | `create`, `update`, `delete` |
| Filter | `_type in ['siteSettings','eventSettings','homepage','aboutPage','stallHolderPage','contactPage','faqItem','sponsor']` |
| HTTP method | POST |
| Secret | matching `SANITY_REVALIDATE_SECRET` for that environment |
| Payload projection | `{ _id, _type, slug }` |

### 7.4 Why tags, not paths

`revalidatePath('/about')` is also possible, but tag-based invalidation:

- Survives URL changes (e.g. if we ever move `/about` → `/our-story`)
- Lets a single piece of content (e.g. siteSettings) invalidate every page
  that depends on it via one tag, not by enumerating every path
- Plays nicely with Cache Components (which is the recommended Next 16
  pattern)

---

## 8. Draft & preview mode

Editors hit "Preview" in Studio → land on the live site with unpublished
content visible — without affecting public visitors.

### 8.1 Flow

1. Editor edits `aboutPage` in Studio, doesn't publish yet.
2. Editor clicks **Preview** in Studio.
3. Studio links to `https://petfest.com.au/api/draft-mode/enable?slug=/about&secret=<token>`.
4. The endpoint validates the token, calls `draftMode().enable()`, redirects
   to `/about`.
5. The page now reads from Sanity with `perspective: "previewDrafts"` and
   renders the unpublished version. The reader sees a small "Preview mode
   on" banner.
6. Editor clicks "Exit preview" → cookie cleared → public version restored.

### 8.2 Studio "Preview" pane

Sanity Studio can render an inline iframe of the site next to the document
editor — handy for "type, see-it-instantly" workflows. Optional Phase 4
polish; not required for v1.

---

## 9. Schema changes

Detailed audit done in conversation; summary version captured here so the
plan stays self-contained.

### 9.1 `siteSettings` — keep + extend

**Keep:** `siteName`, `siteDescription`, `socialLinks { facebook, instagram, twitter }`, `mailingListUrl`.

**Drop:** `logoText` (unused — brand is an image logo).

**Add:**
- `contactEmail` (string) — moved out of `contactPage`
- `contactPhone` (string, optional)
- `contactAddress` (text) — venue / mailing address
- `acknowledgementOfCountry` (text, multi-paragraph) — moved out of `homepage`. Footer reads from this.
- `nonconformityCredit` (object with `logo` image + `text` string) — drives the "PetFest Market is an event of Nonconformity Productions" block in the footer.
- `currentEvent` (reference to an `event` document, required) — points at "the event the site is currently promoting". Every page that displays event details (hero pills, countdown, vendor CTA pricing pill, etc.) resolves this reference rather than fetching `event` directly. To flip the site over to a new event, an editor just changes this one field.

### 9.2 `event` (formerly `eventSettings`) — convert to collection

**Why the change:** the site is centred on one event (Box Hill 26 July
2026) today, but the client will run more in future. Making `event` a
collection now — and resolving "the active event" via
`siteSettings.currentEvent` — gives us multi-event readiness at the data
layer for ~30 minutes of work, without committing to any multi-event UI
(event listings, calendars, archive pages — see §15). When event #2
lands, adding it is just "create a new doc and flip the pointer".

**Rename + restructure:**
- Was: singleton `eventSettings`
- Now: collection `event`
- Removed from the `singletons` set in `sanity.config.ts`
- Studio Desk gets an "Events" list item showing all event documents

**Keep:** `eventName`, `eventDate`, `location`, `ticketPrice`, `ticketUrl`, `applyUrl`.

**Add:**
- `slug` (slug, required, source = `eventName`) — future-proofs URLs like `/events/box-hill-town-hall-2026` if/when we add per-event pages. Not used by any route in v1, but populated from day one so we don't need a backfill migration later.
- `doorsOpenTime` (string, e.g. "9:00 am")
- `eventEndTime` (string, e.g. "4:00 pm")

**Document preview in Studio:** title = `eventName`, subtitle = formatted `eventDate` (so the list view reads "Box Hill Town Hall — Sun 26 Jul 2026").

**Wire-up:**
- The `CountdownTimer` component currently has the event date hardcoded.
  Once `event.eventDate` is editable, the timer must read from the
  document resolved by `siteSettings.currentEvent`.
- Every page that currently shows event details (hero pills, vendor CTA
  pricing pill, footer date, etc.) follows the same pattern: fetch
  `siteSettings` → resolve `currentEvent` reference → read fields.
- Always cache-tag both: `cacheTag('sanity:siteSettings')` AND
  `cacheTag('sanity:<event-doc-id>')`. That way a publish on either
  document invalidates the relevant pages.

### 9.3 `homepage` — significant rework

**Keep:** `heroSubheading`, `heroImage`, `vendorCtaHeadline`, `vendorCtaBody`.

**Rename:** `heroHeadline` → `heroEyebrow` (the "Victoria's favourite pet community market" pill — the actual headline area shows the logo image).

**Drop:**
- `welcomeToCountryText` — duplicate; moves to `siteSettings`.
- `eventSummary` (single text field) — replaced with cards array (see below).

**Add:**
- `whatToExpectCards` — array of objects, each with `icon` (enum from a fixed list), `title` (string), `description` (text).
- `heroCtaPrimary` (object: `label`, `href`) — currently hardcoded "Apply as Vendor" / `/stall-holders#apply`.
- `heroCtaSecondary` (object: `label`, `href`).
- `vendorCtaPerks` (array of strings) — the 6 bullet points in the vendor CTA card.
- `vendorCtaPricingPill` (object: `headline`, `subline`) — the "Stalls from $—" pill on the right of the vendor CTA.
- `faqPreviewHeading` (string), `faqPreviewSubtitle` (string).
- `mailingListHeading` (string), `mailingListBody` (text).

### 9.4 `aboutPage` — add values

**Keep:** `heading`, `subheading`, `body` (block content), `image`.

**Add:**
- `values` — array of objects with `icon` (enum), `title`, `description`.

### 9.5 `stallHolderPage` — small additions

**Keep:** everything currently there except `applyUrl`.

**Drop:** `applyUrl` — duplicate of `eventSettings.applyUrl`.

**Modify `pricing` tier object:**
- Add `features` (array of strings) — the bullet points inside each tier card
- Add `featured` (boolean) — marks the "Most Popular" tier

**Add:**
- `applyHeading` (string), `applyBody` (text) — the "Ready to Apply?" section
- `applyComingSoonLabel` (string, default "Application Form Coming Soon")

### 9.6 `contactPage` — slim down

**Keep:** `heading`, `intro`.

**Drop:** `email`, `phone`, `address` — moved to `siteSettings`.

### 9.7 `policyPages` — delete

Per the settled decision, legal pages stay as code. Schema + Studio
singleton both deleted. `sanity.config.ts` updated accordingly.

### 9.8 `faqItem` — keep, add order

**Keep:** `question`, `answer`, `category` (general / vendors / pets / tickets).

**Add:**
- `order` (number) or integrate `@sanity/orderable-document-list` for
  drag-and-drop ordering within each category.

### 9.9 `sponsor` — keep, add tagline & order

**Keep:** `name`, `logo`, `website`, `tier`.

**Add:**
- `tagline` (string) — matches the existing `src/lib/sponsors-data.ts` shape.
- `order` (number) or orderable-document-list integration.

---

## 10. Phasing & sequencing

The work is split into five phases so we can ship value early and validate
the pipeline before fanning out.

### Phase 1 — Foundation & vertical slice (target: 1 working session)

Get the whole pipeline working end-to-end for **one** small piece of
content, before touching the rest. This proves all the moving parts.

Tasks:
- [ ] Create dev Sanity project (Charles)
- [ ] Wait on Andrea to create prod project; she invites Charles + Carolyn
- [ ] Configure CORS, tokens, webhooks on both projects (§5.3, §7.3)
- [ ] Set Vercel env vars per environment (§6.1)
- [ ] Delete `policyPages` schema + singleton from `sanity.config.ts`
- [ ] Update `siteSettings` schema with the §9.1 changes (start with
      `acknowledgementOfCountry` only — minimum needed for the slice)
- [ ] Create `/api/revalidate` route with signature validation
- [ ] Wire the **footer's Acknowledgement of Country** to read from
      `siteSettings.acknowledgementOfCountry` via Sanity
- [ ] Seed the doc in both dev + prod Sanity projects with the real
      acknowledgement text from `site-info/docs/`
- [ ] Verify: change the text in dev Studio → publish → see it update on the
      preview URL within ~3 seconds (no rebuild)
- [ ] Same verification flow on prod once domain is live

**Exit criteria:** the Acknowledgement text is editable via Studio, changes
propagate within seconds, and a broken Sanity connection falls back to the
last cached value without breaking the page.

### Phase 2 — Site-wide singletons + event collection (target: 1 session)

Extend `siteSettings`, convert `eventSettings` to the `event` collection,
and wire the global details that appear in multiple places.

- [ ] Finish `siteSettings` (contact email/phone/address, social links,
      Nonconformity credit, `currentEvent` reference field)
- [ ] Convert `eventSettings` → `event` collection (§9.2): add slug,
      remove from singletons set, add Studio Desk "Events" list item,
      add doors-open + end-time fields, configure document preview
- [ ] Seed the Box Hill 26 July 2026 event document in both Sanity
      projects and point `siteSettings.currentEvent` at it
- [ ] Refactor `CountdownTimer` to read `eventDate` from the document
      resolved by `siteSettings.currentEvent`
- [ ] Wire the Footer + Contact page contact details from `siteSettings`
- [ ] Wire the Hero event-detail pills from `siteSettings.currentEvent`
- [ ] Wire the social icon URLs from `siteSettings.socialLinks`

**Exit criteria:** an editor changes the event date in Studio, the hero
pill *and* the countdown both update on next request. Creating a second
event doc and flipping `siteSettings.currentEvent` swaps the entire site
over to the new event with no code changes.

### Phase 3 — Editable collections (target: 1–2 sessions)

The two collection types — FAQ items and sponsors — are the highest-value
once the client has real content.

- [ ] Add `order` to `faqItem`; install orderable-document-list plugin
- [ ] Add `tagline` + `order` to `sponsor`
- [ ] Replace `src/lib/faq-data.ts` with a Sanity-backed query; both the
      homepage FAQ preview and the full FAQ page read from it
- [ ] Replace `src/lib/sponsors-data.ts` with a Sanity-backed query; sponsors
      page and (commented-out) homepage preview read from it
- [ ] Add Studio entry guidance — "what kinds of questions belong in 'Pets'?"
      written into the schema's `description` field as a reminder that pets
      aren't allowed at the venue

**Exit criteria:** adding a new FAQ or sponsor in Studio appears on the
public site within seconds; ordering can be drag-and-dropped.

### Phase 4 — Page-by-page editorial copy (target: 2 sessions)

Replace the remaining lorem-ipsum / hardcoded copy with Sanity-driven
content per page.

Order of attack:
1. About page (lowest risk — single body of text)
2. Stall Holders page (pricing tiers + benefits + FAQs — most placeholder content)
3. Home page sections (What to Expect cards, Vendor CTA perks)
4. Contact page (heading + intro)

Each page swap follows the same recipe:
- [ ] Update the relevant page schema in `src/lib/sanity/schemas/`
- [ ] Update the GROQ query in `src/lib/sanity/queries.ts`
- [ ] Modify the page component to fetch from Sanity, wrapped in `use cache`
      + `cacheTag('sanity:<doc-id>')`
- [ ] Seed the doc in dev Sanity with the current placeholder content, so
      the page still renders before the client provides real copy
- [ ] Confirm the `TODO(content):` comments in the affected components are
      removed (or updated to point at the Studio field instead)

**Exit criteria:** every page on the site reads from Sanity; the
`TODO(content):` markers are gone; no hardcoded copy remains except in
legal pages.

### Phase 5 — Polish (target: 1 session)

- [ ] Draft / preview mode wired through Studio's preview pane
- [ ] Studio entry guidance — `description` fields on every schema field
      so editors know what's expected (e.g. "Keep the eyebrow under 40
      characters")
- [ ] Sanity desk structure improvements — group related singletons,
      friendly section titles
- [ ] Editor onboarding doc handed to Andrea and Carolyn (probably a short
      Loom + a one-pager)
- [ ] Optional: hosted Sanity Studio at `<project>.sanity.studio` as a
      fallback if the main site is down (free, just a `sanity deploy` away)

---

## 11. Acceptance criteria (overall)

The CMS migration is "done" when **all** of the following are true:

1. Andrea and Carolyn can each independently log in to `/studio`, edit
   content, and publish, with no developer involvement.
2. Every editable field has a clear label and a `description` explaining
   what it's for and any constraints.
3. Published changes appear on the live site within 5 seconds of clicking
   Publish (no rebuild required).
4. Preview mode works: editors can see unpublished content on the actual
   live site URL, hidden behind a draft-mode cookie.
5. No piece of public site copy is hardcoded except for the three legal
   pages.
6. The site continues to render last-known-good content if Sanity is
   temporarily unreachable.
7. The dev and prod Sanity projects are fully separated — no cross-talk on
   webhooks, tokens, or CORS.

---

## 12. Risks & gotchas

| Risk | Likelihood | Mitigation |
|---|---|---|
| Schema rename breaks existing content in prod | Medium | Never rename in place — deprecate + migrate. Practice on dev first. (§5.5) |
| Editor accidentally publishes to wrong dataset | Low | Both projects only have a `production` dataset; no dataset switcher in Studio for editors. |
| Webhook misconfiguration → stale content on site | Medium | Phase 1 vertical slice validates the end-to-end webhook flow before scaling. |
| Sanity outage takes the site down | Low | Cache Components serve last-known-good. Site renders fine when Sanity is unreachable; only the Studio is unavailable. |
| Editor uploads enormous image | Medium | Sanity asset CDN handles resizing — site uses `?w=…&auto=format`, never the raw upload. Worth a one-paragraph note in onboarding ("upload whatever size, the site handles it"). |
| Free-tier limit hit (10K docs / 1M requests) | Very low | This is a tiny site — well within free tier. Monitor at year 2. |
| Andrea or Carolyn lose Google account access | Low | Each can be re-invited under a new email by the other admin (Charles). |
| Schema migration script blows up prod | Low | All migrations tested on dev first. Sanity has document history → can roll back individual docs. |
| Charles disappears | Low (hi) | Schemas are in the repo; Andrea retains admin on prod and could engage another developer. No vendor lock-in beyond Sanity itself. |

---

## 13. Open questions / decisions still to make

These are not blockers for Phase 1 but should be settled before Phase 4:

- [ ] **Hosted Studio as fallback?** `sanity deploy` gives a free
      `<project>.sanity.studio` URL that doesn't depend on the Next.js app
      being up. Worth turning on for both projects?
- [ ] **Image alt-text strategy** — make `alt` required in schema, or just
      recommended? Required is better for accessibility but creates
      friction for editors.
- [ ] **Brand voice / style guide for editors** — "use Australian English",
      "always use 'PetFest Market' (not 'Petfest')", etc. Belongs in a
      `STYLE_GUIDE.md` or in `description:` fields on each schema.
- [ ] **Backup strategy beyond Sanity's built-in history** — probably not
      needed (Sanity retains version history for free), but worth a
      decision.

---

## 14. Deferred: full multi-event features

The data layer is multi-event-ready (§9.1, §9.2) — adding a second event
is "create a document, flip a pointer". The **user-facing** multi-event
story is deliberately not built yet. The following are decisions and
work items waiting for "event #2 is actually on the calendar":

- **Event listing / index page.** No `/events` route. Need to choose:
  card grid, calendar, simple list?
- **Per-event detail pages.** No `/events/<slug>` routes. Schema is
  ready (every `event` has a slug) but the route handler, template, and
  navigation aren't built.
- **Past-event behaviour.** When the current event passes, does it
  disappear from the site? Get an "event has ended" banner? Stay live as
  an archive? Currently the countdown component just says "The event has
  started — see you there!" once the date passes, which is fine for v1.
- **Per-event FAQ scoping.** Today's FAQs implicitly belong to "the
  event". When there are two, do they share an FAQ list, or each have
  their own? Schema would need an optional `event` reference on
  `faqItem`.
- **Per-event sponsorship scoping.** Same question as FAQs.
- **Per-event stallholder applications.** Today's `applyUrl` lives on
  the event document. If two events run in parallel with two Google
  Forms, do we surface both, or only the current one?
- **Navigation changes.** A multi-event site usually has "Events" in the
  top nav. We'd need to decide that menu structure.
- **SEO and canonical URLs.** Multi-event sites need careful canonical
  URL strategy so search engines don't confuse the homepage with the
  current event's detail page.
- **Cross-event analytics.** If the client wants to see "ticket interest
  per event" comparisons, that's a separate question.

**Trigger to revisit:** when the client confirms event #2 has a date.
Until then this list stays as a parking lot.

---

## 15. Glossary (for non-developer readers)

| Term | Meaning |
|---|---|
| **CMS** | Content Management System. The "back office" where Andrea and Carolyn type in copy, upload images, and click Publish. |
| **Sanity** | The specific CMS we're using. https://sanity.io |
| **Studio** | The editing UI Sanity ships. Available at `petfest.com.au/studio` once live. |
| **Project** | A Sanity account-level container. Each project has its own users, content, and bill. We're using two — one for development, one for production. |
| **Dataset** | A bucket of content inside a project. Each of our projects has one dataset called `production`. |
| **Schema** | The shape of the editable form fields, defined in code. Determines what Andrea sees in Studio. |
| **Singleton** | A document there's only one of — e.g. "Site Settings", "Homepage". The opposite is a collection (e.g. FAQ items, sponsors, events), where you can have many. |
| **Reference** | A pointer from one Sanity document to another. We use one to mark which event is "the current event the site is promoting". |
| **Current event** | The event the site is currently centred on. Editors set this in Sanity by picking from the list of event documents. Today: Box Hill Town Hall 26 July 2026. |
| **Slug** | The URL-safe version of a name. "Box Hill Town Hall 2026" → `box-hill-town-hall-2026`. Stored on each event document so future per-event URLs work without a content migration. |
| **Webhook** | A message Sanity sends to the site whenever an editor clicks Publish, so the site knows to refresh that piece of content. |
| **Cache tag** | A label attached to a piece of cached content. When the webhook arrives, the site invalidates everything with the matching label, rather than rebuilding the whole site. |
| **Draft / preview mode** | A way for editors to see unpublished changes on the live site, hidden from the public. |
| **Vercel** | Where the website is hosted. |
| **CORS** | A browser security rule. Each Sanity project has to know which website addresses are allowed to talk to it. |
| **Env var (environment variable)** | A secret value the site reads at startup. Lets us point the same code at different Sanity projects depending on which environment we're in. |
