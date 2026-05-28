---
name: final-logo-integration
overview: Replace the temporary draft JPEG logo setup with final transparent assets across header, hero, and footer, removing all interim styling hacks and validating sizing/alignment against the final files.
todos:
  - id: place-final-assets
    content: Copy the exact recommended logo source files from site-info into public/images using production filenames.
    status: completed
  - id: swap-header-hero
    content: Update header and hero logo sources to logo.png and remove blend-mode workaround classes.
    status: completed
  - id: swap-footer
    content: Update footer logo source to logo-light.png and remove white-pill workaround wrapper.
    status: completed
  - id: tune-sizing
    content: Check and adjust width/height and Tailwind height utilities if the final logo aspect ratio differs.
    status: completed
  - id: remove-temp-comments
    content: Remove all interim-logo comments and reminders so no comments imply the final assets are still pending.
    status: completed
  - id: verify-ui
    content: Run lint and visually verify header/hero/footer logo rendering on key pages and breakpoints.
    status: completed
  - id: add-favicon-assets
    content: Add favicon and app icon assets from the approved icon source and wire them into Next.js metadata/icons.
    status: completed
  - id: add-og-image
    content: Create and wire a default Open Graph/Twitter social image asset and validate social previews.
    status: completed
isProject: false
---

# Final Logo Integration Plan

## Current Context Confirmed
- Temporary logo handling is explicitly documented in:
  - [C:/code/pet-fest-market/src/components/layout/Header.tsx](C:/code/pet-fest-market/src/components/layout/Header.tsx)
  - [C:/code/pet-fest-market/src/components/layout/Footer.tsx](C:/code/pet-fest-market/src/components/layout/Footer.tsx)
  - [C:/code/pet-fest-market/src/components/sections/HeroSection.tsx](C:/code/pet-fest-market/src/components/sections/HeroSection.tsx)
  - [C:/code/pet-fest-market/CLAUDE.md](C:/code/pet-fest-market/CLAUDE.md)
- Current workaround behavior:
  - Header and hero use `mix-blend-multiply` with `logo.jpeg` to hide white background.
  - Footer wraps `logo.jpeg` in a white rounded pill so it works on dark background.
- Intended final behavior (per existing comments):
  - Header + hero use transparent full-color logo (`logo.png`).
  - Footer uses transparent white/reversed logo (`logo-light.png`) with no white pill wrapper.

## Exact Asset Mapping (Approved)
- Source files to use from [C:/code/pet-fest-market/site-info/Pet Fest Market - Logo Files](C:/code/pet-fest-market/site-info/Pet Fest Market - Logo Files):
  - `4x/Pet Fest Market - Logo - Main Dark@4x.png` -> [C:/code/pet-fest-market/public/images/logo.png](C:/code/pet-fest-market/public/images/logo.png) (header + hero)
  - `4x/Pet Fest Market - Logo - Light@4x.png` -> [C:/code/pet-fest-market/public/images/logo-light.png](C:/code/pet-fest-market/public/images/logo-light.png) (footer)
- Required favicon/app icon source:
  - `4x/Pet Fest Market - Icon - Dark Main@4x.png` -> [C:/code/pet-fest-market/public/images/favicon-source.png](C:/code/pet-fest-market/public/images/favicon-source.png)
- Required social OG source:
  - `4x/Pet Fest Market - Logo - Main Dark@4x.png` -> [C:/code/pet-fest-market/public/images/og-default.png](C:/code/pet-fest-market/public/images/og-default.png) (target: 1200x630 composition)

## Implementation Plan
1. Add final logo assets to `public/images/` using exact file mapping:
   - Copy `site-info/Pet Fest Market - Logo Files/4x/Pet Fest Market - Logo - Main Dark@4x.png` to `public/images/logo.png`.
   - Copy `site-info/Pet Fest Market - Logo Files/4x/Pet Fest Market - Logo - Light@4x.png` to `public/images/logo-light.png`.
2. Update header logo rendering in [C:/code/pet-fest-market/src/components/layout/Header.tsx](C:/code/pet-fest-market/src/components/layout/Header.tsx):
   - Swap `src` from `/images/logo.jpeg` to `/images/logo.png`.
   - Remove `mix-blend-multiply` from the logo class list.
3. Update homepage hero logo in [C:/code/pet-fest-market/src/components/sections/HeroSection.tsx](C:/code/pet-fest-market/src/components/sections/HeroSection.tsx):
   - Swap `src` to `/images/logo.png`.
   - Remove `mix-blend-multiply`.
4. Update footer logo in [C:/code/pet-fest-market/src/components/layout/Footer.tsx](C:/code/pet-fest-market/src/components/layout/Footer.tsx):
   - Swap `src` to `/images/logo-light.png`.
   - Remove the temporary white pill wrapper (`rounded-xl bg-white px-3 py-2`) so the logo sits directly on footer background.
5. Validate image sizing and layout stability:
   - Recheck `width`/`height` props and visual scale (`h-16`, `h-36 sm:h-44`, `h-12`) against final logo aspect ratio.
   - Adjust only if the new logo ratio causes distortion, excess whitespace, or overflow.
6. Remove outdated interim-logo comments and reminders so project state is accurate:
   - Delete `LOGO: TEMPORARY` blocks in:
     - [C:/code/pet-fest-market/src/components/layout/Header.tsx](C:/code/pet-fest-market/src/components/layout/Header.tsx)
     - [C:/code/pet-fest-market/src/components/layout/Footer.tsx](C:/code/pet-fest-market/src/components/layout/Footer.tsx)
     - [C:/code/pet-fest-market/src/components/sections/HeroSection.tsx](C:/code/pet-fest-market/src/components/sections/HeroSection.tsx)
   - Update logo section wording in [C:/code/pet-fest-market/CLAUDE.md](C:/code/pet-fest-market/CLAUDE.md) so it reflects final assets are already integrated.
   - Remove or revise any other in-code comments that still mention waiting for final logo delivery.
7. Run lint/verification and do a UI pass:
   - Confirm header (all pages), homepage hero, and footer render correctly in desktop + mobile states.
   - Confirm dark footer contrast and no blend/pill artifacts remain.
8. Add required favicon/app icons as part of this rollout:
   - Generate favicon-ready assets from `public/images/favicon-source.png` (at minimum favicon + Apple touch icon).
   - Wire icons into [C:/code/pet-fest-market/src/app/layout.tsx](C:/code/pet-fest-market/src/app/layout.tsx) metadata so they are served consistently.
   - Verify favicon appears in browser tab and mobile home-screen contexts.
9. Add required Open Graph/Twitter image support:
   - Create `public/images/og-default.png` with a web-safe social ratio (1200x630), using approved logo source and brand colors.
   - Update [C:/code/pet-fest-market/src/app/layout.tsx](C:/code/pet-fest-market/src/app/layout.tsx) metadata with:
     - `metadataBase` (if missing) for absolute URL resolution.
     - `openGraph.images` pointing to `/images/og-default.png`.
     - `twitter.images` pointing to `/images/og-default.png`.
   - Validate social preview rendering via at least one scraper/debugger after deployment.

## Out of Scope by Default
- Page-specific OG image variants remain out of scope; this rollout adds one global OG/Twitter image.