# Pet Fest Market Website — MVP Build Prompt

You are a senior full-stack engineer and UI/UX developer.

Build a production-quality MVP website for an event called “Pet Fest Market”.

The project should prioritise:

* clean architecture
* maintainability
* excellent mobile UX
* fast iteration
* modern best practices
* AI-friendly code structure
* component reusability
* accessibility
* SEO fundamentals
* performance

The website should feel:

* playful
* pet-focused
* community-oriented
* calm and refreshing
* modern
* welcoming

Avoid corporate styling.

Use:

* Next.js (latest stable App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Sanity CMS
* Vercel-ready architecture

Do NOT use:

* Redux
* complex state management
* heavy animation frameworks
* unnecessary abstractions
* CSS modules
* styled-components
* over-engineering

Use:

* server components by default
* client components only when necessary
* simple and readable code
* small reusable components
* consistent patterns
* strong typing everywhere

---

# Initial MVP Goals

The goal is to quickly deploy an attractive MVP that can later be iterated on with a designer and client feedback.

Use tasteful placeholder content and placeholder imagery.

Use Australian English spelling and tone throughout the site.

---

# Event Information

Event Name:
Pet Fest Market

Date:
4 July 2026

Location:
Box Hill, Victoria, Australia

Ticket Price:
$5

Primary CTA:
Apply as Vendor

Secondary CTA:
Subscribe to Mailing List

---

# Website Requirements

The website must include:

## Homepage

Sections:

* Hero section
* Event summary
* Countdown timer to event date
* Vendor CTA section
* Sponsor preview section
* FAQ preview
* Mailing list CTA
* Welcome to Country section
* Footer

The homepage should immediately communicate:

* what the event is
* where it is
* when it is
* how to apply as a stall holder

---

## About Us Page

Community-oriented copy explaining:

* what the market is
* pet-friendly community focus
* local vendors
* family atmosphere

---

## Stall Holder Information Page

Include:

* benefits of being a vendor
* placeholder pricing
* requirements
* FAQ
* large “Apply Now” button

Use a placeholder Google Form URL.

---

## FAQ Page

Use accordion UI.

Example FAQ categories:

* General
* Vendors
* Pets
* Tickets

---

## Sponsors Page

Display placeholder sponsor cards/logos.

CMS-editable.

---

## Contact Page

Include:

* contact form
* placeholder email
* placeholder social media links

The form does not need backend email functionality yet.
Frontend validation only is fine.

---

## Policies

Create separate pages for:

* Terms & Conditions
* Privacy Policy
* Refund Policy

Use professionally written placeholder content.

---

# CMS Requirements

Use Sanity CMS.

The client should be able to edit:

* homepage content
* about page
* FAQs
* sponsors
* event settings
* policies
* welcome to country text
* stall holder content
* contact details
* social links

Implement proper schema organisation.

Use:

* singleton documents for fixed pages/settings
* collections for repeatable content

Suggested structure:

Singletons:

* siteSettings
* homepage
* aboutPage
* stallHolderPage
* faqPage
* sponsorsPage
* contactPage
* policyPages
* eventSettings

Collections:

* faqItem
* sponsor

---

# Design System

Create a lightweight design system.

Use:

* rounded cards
* soft shadows
* large spacing
* modern typography
* accessible colour contrast
* subtle hover effects

Colour direction:

* teal
* aqua
* sage
* warm white
* soft neutral backgrounds

Do not hardcode branding-specific assets.

The design should later support easy replacement of:

* logo
* fonts
* colour palette
* imagery

---

# Navigation

Top navigation:

* Home
* About
* Stall Holders
* FAQ
* Sponsors
* Contact

Sticky header on scroll.

Mobile-responsive hamburger menu.

---

# Footer

Include:

* navigation links
* placeholder social links
* mailing list CTA
* policies
* acknowledgement/welcome to country snippet

---

# Countdown Timer

Create reusable countdown component.

Must:

* count down to 4 July 2026
* gracefully handle event passed state
* be visually prominent

---

# Technical Requirements

Use:

* ESLint
* Prettier
* strict TypeScript
* environment variables
* clean folder structure

Create a scalable structure like:

src/
app/
components/
ui/
layout/
sections/
shared/
lib/
sanity/
schemas/
queries/
types/
styles/

---

# Sanity Integration

Set up:

* Sanity client
* GROQ queries
* schema exports
* environment variable support

Ensure:

* content fetching is cleanly abstracted
* queries are reusable
* typing is strong

---

# Accessibility

Ensure:

* semantic HTML
* keyboard accessibility
* proper heading hierarchy
* alt text support
* accessible forms
* sufficient contrast

---

# SEO

Implement:

* metadata
* Open Graph support
* sensible page titles
* sensible descriptions

---

# Placeholder Content

Generate tasteful placeholder:

* FAQ content
* About content
* policy text
* sponsor names
* event descriptions

Keep copy concise and skimmable.

Assume users have short attention spans.

---

# Development Workflow

Generate the project incrementally.

Suggested order:

1. initialise project
2. configure Tailwind/shadcn
3. create layout/navigation/footer
4. build homepage
5. build reusable components
6. add page routes
7. integrate Sanity
8. add CMS schemas
9. connect CMS content
10. polish responsiveness
11. optimise UX

Do NOT generate massive files.

Prefer:

* smaller focused components
* reusable sections
* readable code

---

# Deliverables

Generate:

* complete project structure
* setup commands
* all required dependencies
* all pages
* reusable components
* Sanity schemas
* example GROQ queries
* responsive layouts
* placeholder content
* deployment-ready configuration

The final result should be deployable to Vercel with minimal additional setup.
