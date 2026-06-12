# PetFest Market — Changelog

A record of changes made to the PetFest Market website. Designed so you can
cross-check what's been done.

---

## Friday, 12 June 2026 — Revisions from your follow-up note

A few small refinements based on your feedback after going through the
site.

### FAQ wording updates

Two answers reworded as you supplied:

- **"Will there be real animals at the PetFest Markets?"** — now
  reads:
  > There may be animal displays at PetFest Markets as we are hoping
  > to showcase Rescues organisations and, where possible, if venues
  > allow have some breed displays.
- **"Can I bring my animals?"** — now reads:
  > All PetFest Markets are held indoors. Some venues may allow you
  > to bring your dog. Please check individual Market venues
  > information prior to attending for details.

These show up immediately in both the home page FAQ block and on
`/faq`. Once you publish your own FAQ Items in Sanity, those override
the seeded copy.

### Footer policies

- **Refund Policy link removed.** Refund details will live in the
  Stallholder Guidelines (emailed to successful Stallholders) and the
  ticketing company's own T&Cs (linked back to the site when ready).
- **Terms & Conditions / Privacy Policy / Code of Conduct** in the
  footer now link directly to PDF versions of the documents you
  provided. Clicking each link opens the PDF in a new browser tab.
  The files live at `/policies/terms-and-conditions.pdf`,
  `/policies/privacy-policy.pdf`, and `/policies/code-of-conduct.pdf`.
  The original `.docx` source files are also kept on the site (same
  paths, `.docx` extension) for reference. The rendered in-site pages
  at `/policies/terms`, `/policies/privacy` and `/policies/code-of-conduct`
  are still there as a backup but aren't linked from the footer any
  more.

### Stallholder page

- **"Have Questions?" button removed** — the page is now just a
  heading and a single **Apply Here** button. Visitors with questions
  can reach you via the Contact page (linked in the header / footer)
  or the email in the footer.

---

## Wednesday, 3 June 2026 (afternoon) — Small UX tweaks

A few quick follow-ups to make the site easier to use.

### Home page FAQ — now shows the full list

The home page used to show only the first four FAQs with a "View All
FAQs" button. The full list is now on the home page itself — no
clicking around required.

### Stallholders page — single tidy call-to-action

The page is now just one block: a heading and two buttons side by side
— **Apply Here** (opens the Google Form in a new tab) and **Have
Questions?** (opens an email to you). The "Apply" section at the
bottom that used to repeat the Apply Here button has been removed.

The Google Form URL you sent
(`https://docs.google.com/forms/d/e/1FAIpQLSd6OnpOkcU9eoFm02Zs6XpNoJuOtUMCH9g3iR77yXlpMgjoJQ/viewform?usp=sharing&ouid=102085881350428569314`)
is now wired in as a hardcoded default — every "Apply" button across
the site (hero, header, Stallholders page) opens it directly. When
you eventually run a second market with a different form, you'll
override the URL on the new event document in Sanity.

### FAQ — "Can't find what you're looking for?" button

Both the home page FAQ block and the dedicated `/faq` page now end
with a friendly prompt:

> Can't find what you're looking for?
>
> **[ Get in Touch ]**

The button links straight to the Contact page.

---

## Wednesday, 3 June 2026 — Revisions from your 2 June email

I worked through the revision list you sent over and made the following
changes. The two new documents you provided (About statement and the
unified FAQ list) are now treated as official source-of-truth.

### Home page

- **Hero subtitle** — dropped "joyful" per your note. Now reads "An
  indoor community market for pet lovers — celebrating local
  Stallholders, pet businesses, and family fun."
- **What to Expect → Family Fun card** — tightened to just "A perfect
  Sunday outing for the whole crew." You can flesh it out in Studio
  when the market grows.
- **"Grow your business" section** — removed from the home page. The
  component is kept in the codebase so we can switch it back on later;
  it's not visible to visitors today.
- **Subscribe area** — the "Be the first to hear about vendor
  announcements…" body line was removed. The form will hook straight
  into MailChimp once you've got that account set up.

### Footer

- **Tagline under the logo** — changed to the generic "An indoor market
  for Pet Lovers!" so it doesn't need updating between markets (Box
  Hill, then Disterrly Rd QLD, then Morris Moore).
- **Date line under the tagline** ("Sunday 26 July 2026") — removed for
  the same reason; event-specific dates still appear in the hero pills
  on the home page, where they belong.
- **"Stay in the loop" heading** — renamed to "Get Updates on PetFest
  news and events".
- **Nav links** — "Stall Holders" is now "Stallholders" (one word, per
  your note).

### About page

- Replaced the longer "Our Story" + "What We Stand For" layout with the
  short About statement from your **About.docx**:
  > PetFest Market is a fun community indoor market bringing together
  > makers, creators and small businesses showcasing all kinds of pet
  > products, goods and services. From treats and toys, to accessories,
  > handmade products and gifts. It is the perfect event for pet lovers
  > to shop, discover and support local businesses.
- The "What We Stand For" values cards have been removed for now. We
  can bring them back as the market grows.

### Stallholder page

- Renamed throughout (page heading + nav label + Studio panel) to
  **Stallholder** — one word, per your note. The "Apply as Vendor"
  button on the hero / header is now **Apply as Stallholder**.
- Hero subtitle ("Showcase your products to hundreds of passionate pet
  lovers…") removed.
- **Apply Now button** — now reads **Apply Here** and links to the
  Google Form URL you sent
  (`https://docs.google.com/forms/d/e/1FAIpQLSd6OnpOkcU9eoFm02Zs6XpNoJuOtUMCH9g3iR77yXlpMgjoJQ/viewform`).
  This URL is stored on the **event** document so each market can have
  its own form.
- **Why Sell at PetFest Market** section — removed.
- **Stall Pricing** section — removed.
- **Requirements** section — removed.
- **Vendor FAQ** section — removed (covered by the Stallholder
  application form and the T&Cs PDF you'll email applicants).
- **"Ready to Apply?"** — kept the heading and the Apply Here button.
  The introductory line ("Our stallholder application form is almost
  ready…") was removed. The **Have Questions?** button now opens an
  email to `petfest@nonconformity.com.au`.

### FAQ page

- Switched from four tabbed categories (General / Vendors / Pets /
  Tickets) to a **single unified list**, matching your **Website
  FAQs - PetFest.docx**. All eleven of your supplied Q&As are now
  seeded as the page's default content.
- The Sanity CMS has been updated to match — the **Category** field on
  FAQ Items was removed. Sorting is by the **Display Order** number
  only (lower numbers first). You can now also drag-and-drop in Studio
  to reorder.

### Tickets

- The hero already has a "Tickets coming soon" pill that automatically
  switches to a **Buy Tickets** button when you set the **Ticket
  Purchase URL** on the current event in Sanity. You can drop the
  link in there as soon as the ticketing company sends it through.

### Social media

- Added a **TikTok** icon to the footer and the Contact page (in
  addition to Facebook and Instagram). All three URL fields are
  editable in Site Settings; the icons only show when the matching
  URL is filled in.
- Your handles, per the email — `@petfestaustralia` on Facebook,
  Instagram, and TikTok. Set the full URLs in Site Settings → Social
  Links when you're next in Studio.

### Behind-the-scenes notes

- The Sanity CMS schema was tightened to match the new simpler site —
  the Vendor CTA, About values, Stall Holder Page benefits/pricing/
  requirements/vendor-FAQs, and FAQ Category fields are all gone. Old
  data in those fields stays safe in Sanity but won't show up on the
  site or in Studio.
- Multi-event readiness is now genuinely useful — the data model knew
  about future events in the abstract; with the QLD and Morris Moore
  dates confirmed in your email, the system is ready for them as soon
  as we want to add the documents.
- The Editor Guide has been updated to reflect all of the above.

---

## Saturday, 30 May 2026 (later)

### 1. Almost the whole site is now editable from the back-office

Building on yesterday's Acknowledgement-of-Country vertical slice, I
wired the rest of the site through to Sanity. You and Carolyn can now
edit, from the back-office at `/studio`, all of the following:

**Global settings (Site Settings):**

- Contact email, phone, postal address (edit once, updates the footer
  AND the Contact page)
- Social media URLs — when blank, the relevant icon hides automatically
- Nonconformity Productions credit (text + logo)
- Acknowledgement of Country
- Mailing-list sign-up URL (waiting on the MailChimp account)
- **Current Event** pointer — see #2

**Events (now a collection — see #3):**

- Event name, slug, date + start time, doors-open time, end time
- Venue / location
- Ticket price, ticket purchase URL, stallholder application URL

**Homepage:**

- Hero eyebrow + subtitle
- "What to Expect" cards (three by default, fully customisable — icon,
  title, description)
- Vendor CTA section — badge, headline, body, perks list, pricing pill
- FAQ preview heading + subtitle
- Mailing list heading + body

**About Page:**

- Heading + subtitle
- "Our Story" rich-text content
- "What We Stand For" values cards (icon + title + description per card)

**Stall Holder Page:**

- Heading + intro
- Benefits list (with editable section heading + subtitle)
- Pricing tiers (name, price, description, inclusions list, "Most
  Popular" highlight flag)
- Requirements list
- Vendor-specific FAQs
- Apply section copy

**Contact Page:**

- Heading + intro

**Collections:**

- **FAQ Items** — each question is its own editable card. Categories:
  General / Vendors / Pets / Tickets. Drag-style order field controls
  display order within each category.
- **Sponsors** — name, tagline, logo upload, website URL, tier
  (Platinum/Gold/Silver/Bronze), display order.

Everything reads from Sanity at build/render time, falls back to
sensible hardcoded copy if any field is left blank, and updates on the
live site within ~3 seconds of clicking Publish (no developer
involvement).

### 2. The "Current Event" pointer

Site Settings now has a **Current Event** picker that points at one of
your event documents. Every page that displays the event date, venue,
ticket link, or stallholder application URL reads from whatever event
this pointer is pointing at. When the second PetFest Market happens
later this year or next, you just create the new event document, fill
in its details, and change this one pointer — the whole site flips
over.

### 3. Events are now multi-event-ready

Behind the scenes, what used to be a single "Event Settings" page is
now a list — you can create as many events as you want. The current
site UI still focuses on one event at a time (via the Current Event
pointer above), but the foundation for future event listings, archive
pages, etc. is in place. Adding event #2 now is a few minutes of
typing, not a website rebuild.

### 4. Smarter buttons and links

A handful of buttons now respond to what's in the back-office:

- **Tickets pill in the hero** — shows "Tickets coming soon" until you
  fill in a Ticket URL on the event; then automatically becomes a
  "Buy Tickets" button.
- **Apply as Vendor buttons** (hero, vendor CTA, stall-holders page) —
  link to the in-page section while the Google Form URL is blank.
  Once you set it on the event, every Apply button across the site
  automatically links straight to the form.
- **Sponsor cards** — when a sponsor has a website URL set, their
  card becomes clickable.
- **Footer social icons** — only render the icons whose URLs are
  filled in. Blank URLs = no icon shown.

### 5. Editor guide written

A friendly how-to-edit-the-site guide is now at **EDITOR_GUIDE.md**
in the project folder. It covers logging in, what each section in the
back-office controls, how to add an FAQ or a sponsor, image upload
hints, and the rules of the road (especially the "no pets at the
venue" wording rule). When your Sanity account is set up, this is the
first thing to read.

### 6. What's still hardcoded

Three categories deliberately stay as code (not editable from the
back-office):

- **Legal pages** (Privacy, Terms, Code of Conduct, Refund Policy) —
  these come from the `.docx` files you supplied and change rarely.
- **Top + footer navigation menu items** — adding/removing nav links
  is a developer change for now.
- **Logos, brand colours, fonts** — visual identity changes go through
  a developer.

If you want any of these changed, just ask Charles.

---

## Friday–Saturday, 29–30 May 2026

### 1. Planned the content editor dashboard (CMS)

You and Carolyn will soon be able to log in to a simple back-office and
edit the website's content yourselves, without needing a developer in the
loop. The full plan — including how it works, who logs in how, and what
becomes editable in what order — lives in **CMS_PLAN.md** in the project
folder if you'd like to read it.

Key decisions:

- The editor tool is **Sanity** — free for our scale, friendly UI, three
  editor seats (you, Carolyn, me) included at no cost.
- Sign-in is **Google** (with email magic-link as a fallback if either of
  you would rather not use a Google account).
- Images you upload go to Sanity's image hosting, which auto-resizes and
  crops them — you just drop a file in and the website handles the rest.
- The **legal pages** (Privacy, Terms, Code of Conduct, Refund Policy)
  stay as code, since they need to match the source `.docx` documents you
  provide and change rarely.
- The data model is built to be **multi-event ready** from day one — when
  PetFest Market eventually runs a second market, adding it is a few
  minutes of typing, not a website rebuild. The user-facing pages for
  multiple events (event listing, calendar, archive of past events,
  etc.) are deferred until you confirm event #2 is happening.

### 2. First editable field is live — Acknowledgement of Country

As proof that the whole pipeline works end-to-end, the Acknowledgement of
Country in the footer is now editable through the back-office. Changes
appear on the live site within ~3 seconds of clicking Publish — no
developer involvement needed. Over the next sessions I'll move the rest
of the editable content in the same way: site contact details, event
details (date, venue, etc.), FAQs, sponsors, and then page-by-page copy.

**Next step from your side:** create a Sanity account (it's free) and
let me know once you have. I'll then walk you through inviting Carolyn
and giving me access so I can finish wiring everything to your account
rather than my development sandbox. The site will keep working normally
in the meantime — there's a safe fallback that uses the hardcoded text
if anything's ever unreachable.

### 3. "What to Expect" cards on the home page restyled

The three cards under "What to Expect" on the home page were given a
cleaner, less boxy look — circular icons in a soft brand tint, no card
backgrounds, more breathing room between items.

### 4. Duplicate Acknowledgement of Country removed

The Acknowledgement of Country previously appeared in the footer, at the
bottom of the home page, and on the About page. It now appears only in
the footer (which is shown on every page, so it's still visible
everywhere).

---

## Thursday, 28 May 2026

### 1. New brand colours

The site was repainted using the new brand colour palette — a warm amber and
orange scheme over a dark brown. The colours now appear consistently across
buttons, headings, accents, and the footer.

### 2. Headings switched to Title Case

Site branding now uses PetFest Market in Title case. This was applied to every page.

### 3. Draft logo placed across the site

The draft logo file has been placed in the header, hero (top of the home
page), and footer. I'm still waiting for some files from the designer to make additional enhancements to the logo.

### 4. Client documents added (privacy, terms, code of conduct, acknowledgement)

The documents you supplied on 25 May were taken as the source of truth and
incorporated into the site:

- **Privacy Policy** — full text from your document, available at the
  Privacy Policy link in the footer.
- **Terms & Conditions** — covers website use only (the document does not
  yet cover event-attendance terms; those are flagged as missing).
- **Code of Conduct** — full text from your document, including the
  anti-harassment policy and reporting steps.
- **Acknowledgement of Country** — the exact wording from your document now
  appears in the footer of every page.
- **Nonconformity Productions credit** — added to the footer with your
  logo, noting that PetFest Market is an event of Nonconformity
  Productions.

### 5. Removed invented copy; flagged missing content

During an earlier scaffolding pass, placeholder copy was written to make the
site look complete (fake FAQ answers, invented ticket prices, made-up
sponsor names, etc.). Today I audited the whole site and **removed
anything that wasn't supplied by you**. Wherever real content is still
missing, the visible text has been replaced with Lorem Ipsum (a recognisable
placeholder language) and a note has been left in the code so nothing
fictional slips through to launch.

Specific changes:

- The Refund Policy page has been cleared to a placeholder — no refund
  policy was provided yet.
- The "Event Attendance" portion of the Terms & Conditions (covering pets,
  tickets, conduct on the day) has been removed because it wasn't in your
  document.
- All FAQ answers are now placeholder Lorem Ipsum — the previous answers
  invented prices, hours, and rules.
- All stallholder pricing tiers, requirements, and vendor FAQs are
  placeholder.
- The fake sponsor list has been removed entirely. The Sponsors page now
  shows a "coming soon" message and the Sponsors link has been temporarily
  hidden from the menu until your first sponsor is signed.
- The social media icons (Instagram, Facebook, Twitter) currently link
  nowhere; they're waiting on real handles from you.
- The wrong event date (an earlier draft showed "4 July 2026") was
  corrected everywhere to **Sunday 26 July 2026** at Box Hill Town Hall.

### 6. Home page tidy-up and "no pets at the venue" sweep

The home page was decluttered and an important factual correction was
applied across the whole site:

- **Countdown moved into the hero.** The standalone countdown banner was
  removed; the count-down clock now sits inside the main hero at the top of
  the home page, so the event date, venue, and timer are all in one place.

- **"Visitors can bring their pets" wording removed everywhere.** Because
  visitors cannot bring pets to PetFest Market at Box Hill Town Hall, all
  copy that implied otherwise has been rewritten. A "Pets Welcome" card on
  the home page was removed; phrases like "wag your tail", "bring your
  furry friend", "your furry companion", "pet-friendly venue", and "the
  four-legged members of the family" were removed or rephrased to
  "community market for pet lovers".

---

## Still to come from you

To help the pending, the following are still needed:

- Real text for the home page's "What to Expect" section, the About page
  "Our Story", and the values block.
- The full FAQ content (general, vendors, pets, tickets).
- Stallholder pricing, requirements, vendor benefits, and the Google Form
  link.
  - MailChimp account (or other mailing list platform).
- The refund policy and any event-attendance terms.
- Ticketing platform details and the ticket-purchase link. (If applicable)
- Social media handles (Instagram, Facebook, Twitter).
- Sponsor names and tiers as they come on board. (If applicable)