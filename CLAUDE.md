# PetFest Market — Project Rules

## About the project
Event website for **PetFest Market**, a pet-friendly community market run by **Nonconformity Productions** at Box Hill Town Hall, Victoria on Sunday 26 July 2026. All PetFest Markets are held in indoor venues.

- **"PetFest Market"** is the correct spelling — always capitalised exactly this way (camel-case P and F, no space between "Pet" and "Fest"). Never write "Pet Fest Market", "Petfest Market", "petfest market", or any other variation.
- PetFest Market is the public-facing **brand** used everywhere on the site.
- Nonconformity Productions is the **legal operating company** — it should only appear in legal/policy documents (Privacy Policy, Terms & Conditions) and official contact details, never in general site copy.
- Contact email: petfest@nonconformity.com.au

## Source-of-truth documents
The folder `site-info/docs/` contains official documents provided by the client. These are the **authoritative source of truth** for their respective sections of the site. Always use the content from these documents when updating those sections — do not paraphrase or substitute with generic placeholder copy.

| Document | Governs |
|---|---|
| `Acknowledgement of country - Website Petfest.docx` | `WelcomeToCountrySection.tsx` and footer acknowledgement |
| `Nonconformity Productions Privacy Policy.docx` | `/policies/privacy` page |
| `Petfest Website Use Terms and Conditions.docx` | `/policies/terms` page |
| `Petfest Code of Conduct.docx` | `/policies/code-of-conduct` page |

If the client provides updated versions of any of these documents, extract the new content and update the corresponding page(s) accordingly.

## Logo
The current logo (`public/images/logo.jpeg`) is a **draft** with a white background. Workarounds are in place — search `LOGO: TEMPORARY` in the codebase to find every affected file.

When the designer delivers final assets:
- `public/images/logo.png` — full-colour, transparent background (header + hero)
- `public/images/logo-light.png` — white/reversed, transparent background (footer)

⚠️ Reminder: if you notice the `LOGO: TEMPORARY` comments while working on any task, flag to the user that the final logo files may be ready to swap in.

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
