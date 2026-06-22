# PetFest Market — Editor Guide

A friendly reference for **Andrea** and **Carolyn** for editing the
PetFest Market website without needing a developer.

This guide covers what you can edit, how to do it, and what to look out
for. If something here doesn't match what you're seeing on screen, ping
Charles — the site is still evolving.

---

## 1. Logging in

The editor dashboard lives at:

- Local development → `http://localhost:3000/studio`
- Live site → `https://petfest.com.au/studio` (once the prod account
  is wired up — see Charles)

You'll be prompted to sign in with **Google**. Use the Google account
you provided when accepting the Sanity invitation.

---

## 2. What the dashboard looks like

The left-hand sidebar groups everything into sections. From top to
bottom:

| Section | What lives here |
|---|---|
| **Site Settings** | Global things — site name, contact details, social media URLs, the Acknowledgement of Country, the Nonconformity credit, and a pointer to the **Current Event** |
| **Events** | The collection of events you've run / are about to run. PetFest Market at Box Hill is the first one. |
| **Homepage** | Hero text + "What to Expect" cards + Vendor CTA + FAQ preview + Mailing list copy |
| **About Page** | Hero, "Our Story", values cards |
| **Stall Holder Page** | All the content on `/stall-holders` — benefits, pricing tiers, requirements, vendor FAQs |
| **Contact Page** | Heading + intro only (email/phone/address live in Site Settings) |
| **FAQ Items** | Individual frequently-asked-questions, sorted by category |
| **Sponsors** | Individual sponsor cards, grouped by tier |

---

## 3. The "Current Event" pointer

PetFest Market is a single-event site today, but the dashboard is
already set up for the future when you'll run more events.

Here's how it works:

1. The **Events** section is a list — each entry is one event (e.g.
   "Box Hill Town Hall 2026"). You can add as many as you like.
2. **Site Settings → Current Event** points at one of those entries.
3. Every page on the site that shows the event date, venue, ticket
   link, or stallholder application URL reads from the event that
   pointer is pointing at.

So when you eventually run a second market: create a new event, fill in
its details, then change the **Current Event** pointer. The whole site
flips over.

---

## 4. Editing flow

For any page or document:

1. Click into it in the sidebar.
2. Make your changes. The form shows red error indicators on any
   required field that's blank or invalid.
3. Hit **Publish** in the bottom-right.
4. Within ~3 seconds the change is live on the website. (No code
   changes, no waiting on a developer.)

If you publish something and don't immediately see it on the live site,
do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R). Browser cache can hold
old versions for a few seconds.

---

## 5. Images

Anywhere there's an image field:

- Drag-and-drop, or click to choose a file.
- Any size works — the site automatically resizes and crops. Bigger
  source images = better quality on retina screens, so don't shrink
  them yourself.
- After uploading, you can **drag the crop circle** to pick which part
  of the image stays visible when the site crops it square or
  rectangular. This is called the "hotspot".
- Add **alt text** (a short description) for accessibility. Screen
  readers read this aloud to vision-impaired visitors.

---

## 6. Important rules to remember

### Visitors cannot bring pets to PetFest Market at Box Hill Town Hall

Despite the name, PetFest Market is a *market about pets* (vendors,
products, demonstrations) — not a venue where visitors can bring their
own pets. **Any copy you write must not imply otherwise.**

- ❌ Avoid: "bring your dog/cat/furry friend", "pets welcome",
  "pet-friendly venue", "wag your tail", "your furry companion".
- ✅ Use instead: "community market for pet lovers", "celebrating pets
  and the people who love them", "market about pets".

The schemas will not enforce this — it's up to you to keep an eye out.

### "PetFest Market" spelling

Always written as **PetFest Market** — capital P, capital F, no space
between "Pet" and "Fest". Not "Petfest", not "Pet Fest", not "petfest".

### Nonconformity Productions

This is the legal company name. It should ONLY appear in legal /
policy pages and the footer credit. Don't use it in marketing copy —
the public-facing brand is **PetFest Market**.

---

## 7. Fields that change everywhere when you edit them

These live on **Site Settings** so you only have to update them in one
place:

| Field | Where it shows up |
|---|---|
| Acknowledgement of Country | Footer (every page) |
| Contact Email | Footer, Contact page, Stall Holders page CTA — AND the destination for contact-form submissions (visitor messages get emailed here) |
| Contact Phone | Contact page (only if filled in) |
| Contact Address | Contact page |
| Social media URLs (FB / IG / TikTok / X) | Footer + Contact page. Facebook, Instagram, and TikTok have hardcoded defaults that always show; filling these fields in overrides the default. Twitter / X has no default — leave blank to hide that icon. |
| Mailing list URL | Newsletter sign-up forms (still being wired up) |
| Nonconformity credit text + logo | Footer credit block |
| **Current Event** pointer | Date pill in hero, venue pill in hero, countdown timer, Stallholder Apply button, ticket link in hero |

---

## 8. Fields that drive the homepage

Open **Homepage** in the sidebar. Four tabs at the top of the form:

1. **Hero** — the eyebrow pill, subtitle, optional feature image.
2. **What to Expect** — the three (or more) cards under "What to
   Expect". Each has an icon, title, and description.
3. **FAQ Preview** — the heading + subtitle for the FAQ section on the
   home page. (The actual questions come from **FAQ Items**.)
4. **Mailing List** — heading for the newsletter sign-up section.

> The old "Vendor CTA" block was removed at the client's request — the
> market is intentionally simple while it establishes itself. We can
> bring it back when the market grows.

---

## 9. FAQ Items

Each FAQ is its own document under **FAQ Items**. The FAQs are a single
unified list — no categories. To add a question:

1. Click **+ Create** at the top of the FAQ Items list.
2. Type the question (phrased *as* a question), the answer, and a
   **Display Order**.
3. Use display order 10, 20, 30, 40 so you can slot new questions
   between existing ones without renumbering everything.
4. Publish.

> ⚠️ Per the client's note (2 June 2026): visitors can't bring their
> own pets to most market venues (specifically Box Hill). When writing
> FAQs about animals, follow the client's wording — see the seeded
> "Can I bring my animals?" answer for the right framing.

---

## 10. Sponsors

Each sponsor is its own document under **Sponsors**.

- Upload the sponsor's **logo** (any size — the site resizes).
- Pick a **tier**: Platinum, Gold, Silver, or Bronze. Tier order on the
  page is always Platinum first, then Gold, etc.
- Add a one-line **tagline** (shown beneath the name).
- Optional: a **website URL** — the sponsor card becomes clickable when
  set.
- Set the **Display Order** to control sort order within the tier.

While there are zero sponsors published, the Sponsors page shows a
"coming soon" placeholder and the Sponsors link is hidden from the main
navigation. Add your first sponsor and the page automatically switches
to the populated view.

> One thing only Charles can do: re-add the Sponsors link to the
> header + footer navigation once your first sponsor is signed. Ping
> him when that happens.

---

## 11. What you CAN'T edit (yet)

A few things still live in code and require Charles to change:

- Logo files (header, footer, favicon)
- Brand colours
- Privacy Policy, Terms & Conditions, Code of Conduct, Refund Policy
  — these are legal documents and stay as code so they always match
  the source `.docx` files you provided.
- Navigation menu items (Home / About / Stallholders / FAQ / Contact)
- Footer policy links

If you want any of these changed, send Charles a message.

---

## 12. Seeding the Box Hill event

The first event document to create under **Events** is the Box Hill
2026 market. Suggested values:

| Field | Value |
|---|---|
| Event Name | `Box Hill Town Hall 2026` |
| Slug | (auto-generates as `box-hill-town-hall-2026`) |
| Event Date & Start Time | `2026-07-26T10:00:00+10:00` (Sun 26 Jul 2026, 10 am AEST) |
| Doors Open Time | `10am` (default if left blank) |
| Event End Time | `3pm` (default if left blank) |
| Location | `Box Hill Town Hall, VIC` |
| Ticket Price | Leave blank (tickets via third-party platform — mid July) |
| Ticket Purchase URL | Leave blank until the ticketing company sends the link |
| Stallholder Application URL | `https://docs.google.com/forms/d/e/1FAIpQLSd6OnpOkcU9eoFm02Zs6XpNoJuOtUMCH9g3iR77yXlpMgjoJQ/viewform?usp=sharing&ouid=102085881350428569314` (default if left blank) |

Then in **Site Settings**, set **Current Event** to point at this
event. The hero pills, countdown timer, and Stallholder Apply button
all read from this.

Future events (per the 2 June email):
- **Disterrly Road Market**, QLD — Sunday 1 November 2026
- **Morris Moore (Kingston / Cheltenham)**, VIC — Sunday 15 November 2026

When those approach, add them as new event documents and update
**Current Event** to swap the site over.

---

## 13. Common questions

**"I published a change but I don't see it on the site."**
Hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R). If still
nothing after 30 seconds, the publish webhook may have failed — ping
Charles with the time of the publish.

**"I made a mistake — can I roll back?"**
Yes. Open the document, click the clock icon (📜) at the top, pick
the version you want, and click **Restore**. Sanity keeps every
historical version automatically.

**"Can I work on a change in private before publishing?"**
Yes — every change starts as a **draft** that only you can see until
you click Publish. Drafts persist across sessions.

**"Carolyn and I both edited the same document at once — what happens?"**
Sanity shows both of you live in the document and surfaces a warning.
The last person to publish wins. For long edits, message each other
beforehand to avoid stepping on toes.

**"I see a field labelled in a way that doesn't make sense for me."**
Tell Charles which one. Every field has an editable description that
he can update.

---

## 14. Who to ask

- **Anything content-related** — Andrea or Carolyn can answer each
  other.
- **Anything technical** (site is broken, publish failed, can't log
  in, want a new feature) — Charles.
