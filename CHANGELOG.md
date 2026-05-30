# PetFest Market — Changelog

A record of changes made to the PetFest Market website. Designed so you can
cross-check what's been done.

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