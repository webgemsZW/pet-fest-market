# PetFest Market — Project Rules

## About the project
Event website for **PetFest Market**, a pet-friendly community market run by **Nonconformity Productions** at Box Hill Town Hall, Victoria on Sunday 26 July 2026. All PetFest Markets are held in indoor venues.

- **"PetFest Market"** is the correct spelling — always capitalised exactly this way (camel-case P and F, no space between "Pet" and "Fest"). Never write "Pet Fest Market", "Petfest Market", "petfest market", or any other variation.
- PetFest Market is the public-facing **brand** used everywhere on the site.
- Nonconformity Productions is the **legal operating company** — it should only appear in legal/policy documents (Privacy Policy, Terms & Conditions) and official contact details, never in general site copy.
- Contact email: petfest@nonconformity.com.au

### ⚠️ Terminology: "Stallholder" — one word
The client uses **"Stallholder"** (one word, capital S when at the start of a sentence or as a noun referring to the role). Never write "Stall Holder", "stall-holder", or "vendor" in user-facing copy. "Vendor" is reserved for internal/dev jargon only. Existing variable names and schema fields that say `vendor*` (e.g. `vendorCta*`, `vendorFaqs`) can stay — they're not user-visible — but any UI text must say "Stallholder".

### Upcoming events (per 2 June 2026 client email)
The client has confirmed two further events after Box Hill:
- **Disterrly Road Market**, QLD — Sunday 1 November 2026
- **Morris Moore (Kingston / Cheltenham)**, VIC — Sunday 15 November 2026

These reinforce the multi-event-ready data model (see CMS_PLAN.md §9.2). For now the site still focuses on one event at a time via `siteSettings.currentEvent`; the second and third events get added to Studio when the dates approach.

### Event times (Box Hill)
- **Doors open:** 10 am
- **Event ends:** 3 pm

### ⚠️ Visitors CANNOT bring pets to the venue
**Visitors cannot bring their own pets to PetFest Market at Box Hill Town Hall.** Despite the name, PetFest Market is a *market about pets* (vendors, products, demonstrations, community) — not a *pets-allowed venue*. Site copy must never imply otherwise.

- ❌ Avoid: "bring your dog/cat/furry friend", "pets welcome", "pet-friendly venue", "wag your tail", "four-legged guests/members", "your furry companion".
- ✅ Prefer: "community market for pet lovers", "celebrating pets and the people who love them", "market about pets".
- The word **"pet-friendly"** specifically implies the venue allows pets — do not use it as a descriptor of the event or venue. Use "pet community", "pet lover", or "pet-loving" instead.

## Source-of-truth documents
The folder `site-info/docs/` contains official documents provided by the client. These are the **authoritative source of truth** for their respective sections of the site. Always use the content from these documents when updating those sections — do not paraphrase or substitute with generic placeholder copy.

| Document | Governs |
|---|---|
| `Acknowledgement of country - Website Petfest.docx` | `WelcomeToCountrySection.tsx` and footer acknowledgement |
| `Nonconformity Productions Privacy Policy.docx` | `/policies/privacy` page |
| `Petfest Website Use Terms and Conditions.docx` | `/policies/terms` page |
| `Petfest Code of Conduct.docx` | `/policies/code-of-conduct` page |
| `25 May email from client.txt` | General site facts (initial event details, contact email) |
| `About.docx` | `/about` page body |
| `Website FAQs - PetFest.docx` | `/faq` page content (single unified list — no categories) |
| `email_2_June.docx` | Revision request — site simplification, terminology, future event dates, social handles |

If the client provides updated versions of any of these documents, extract the new content and update the corresponding page(s) accordingly.

### Copy that is NOT yet sourced
Anything not covered by a source-of-truth document above is **placeholder**. The site is currently kept honest by using lorem ipsum + `TODO(content):` comments wherever real copy is missing. Do not invent or paraphrase replacements for these placeholders — wait for the client to provide the content, or ask the user first. Known gaps awaiting client input:

- Hero eyebrow / hero subtitle (kept from initial scaffold with user approval)
- "What to Expect" highlights (kept from initial scaffold with user approval)
- Stallholder Google Form link — provided in 2 June email but per-event so lives on the `event` document
- Ticketing platform details and ticket-purchase link (per 2 June email — "tickets won't be released until mid July, sold through a ticketing company")
- Refund Policy (per 2 June email — refund policy will be handled by the ticketing company)
- Sponsor list and sponsorship tiers (no sponsors yet — `/sponsors` shows a "coming soon" state)

### Hardcoded defaults (always render, Sanity overrides)
A few values are hardcoded in `src/lib/site-defaults.ts` so the live site always shows them even if Sanity is unset. Sanity values still take precedence when populated. Current defaults:
- **Social URLs:** Facebook `@petfestaustralia`, Instagram `@petfestaustralia`, TikTok `@petfestaustralia`
- **Event trading times (Box Hill):** doors open `10am`, event ends `3pm`
- **Stallholder application URL:** the Box Hill Google Form (per 3 June 2026 email). Per-event `applyUrl` on the `event` document overrides — set it when running additional markets.

## Logo
The final logo assets are integrated:
- `public/images/logo.png` — full-colour, transparent background (header + hero)
- `public/images/logo-light.png` — white/reversed, transparent background (footer)
- `public/images/favicon-source.png` — icon source used for favicon/app icons

Related derived assets:
- `public/favicon.ico`
- `public/apple-touch-icon.png`
- `public/images/icon-192.png`
- `public/images/icon-512.png`
- `public/images/og-default.png`

## Colour palette
Brand colours are defined as the `brand` scale in `tailwind.config.ts`. The three anchor values are:
- `brand-400` = `#fcb041` (light amber)
- `brand-600` = `#f6861f` (orange)
- `brand-900` = `#5a3511` (dark brown)

To retheme the site, update only `tailwind.config.ts` and the CSS custom properties in `globals.css`.

## Stack
Next.js 16 (App Router), TypeScript, Tailwind CSS v3, Radix UI, Sanity CMS v3, lucide-react.

- Sanity Studio is at `/studio`
- Do not use `__experimental_actions` in Sanity schemas (deprecated in v3)
- Client interactions inside layout components must be extracted to separate `"use client"` files
