# Every Second Counts — Project Specs

## What the app does and who it's for
A single-page marketing site for **Every Second Counts**, a U.S. nonprofit
building life-saving evacuation technology for schools, places of worship, and
community spaces — and supporting families impacted by gun violence.

Audience: prospective donors, partner schools/congregations, press, and
families looking for support resources.

## Tech stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + design-token CSS variables in `app/globals.css`
- **Animation:** Framer Motion (scroll-linked progress bar, IntersectionObserver
  reveals, parallax hero image, word-by-word headline reveal, staggered grids,
  micro-interactions on buttons/cards/links)
- **Fonts:** Source Serif 4 (headings) + Public Sans (body) + JetBrains Mono
  (eyebrows/labels), all via Google Fonts

## Pages and user flows
Single page (`app/page.tsx`) with ten sections:
1. Sticky Nav (scroll progress bar across the top of the viewport)
2. Hero — headline, lead, two CTAs, three meta items, hero image collage
3. The Problem — editorial prose + 4-card qualitative grid
4. Our Mission — dark ink section with three numbered pillars
5. What We Build — three-card horizontal grid with feature lists
6. Who We Help — three audience cards
7. How Donations Help — five program categories + pre-launch contact card
8. Family Support — pullquote + four service rows
9. Transparency — four accountability commitments + four operating principles
10. Final CTA — donate buttons + email signup form
11. Footer

User flows:
- Read → Donate (mailto link to `info@everysecondcount.org`)
- Read → Partner (mailto link)
- Read → Subscribe (client-side email validation; no backend yet)

## Data models / storage
No persistent storage in this phase. The email subscribe form validates
client-side and shows a confirmation message — wiring it to a real list
(Mailchimp, Resend, Supabase, etc.) is deferred until the org chooses a
provider.

## Third-party services
- **Fonts:** Google Fonts (no API key required)
- **Donations / contact:** `mailto:` links to `info@everysecondcount.org`
  (no payment provider in this phase; the org doesn't have a donation
  account yet per the design transcript)

## "Done" looks like
- `npm install` succeeds
- `npm run build` succeeds with zero TypeScript or build errors
- `npm run dev` serves the page at `http://localhost:3000` with no console
  errors
- Every section from the design renders pixel-close to the Claude Design
  prototype
- Animations are smooth (60fps on a modern laptop) and respect
  `prefers-reduced-motion`
- The page is responsive from 360px to 1440px+
- Hero image (`/public/images/hero-school-hallway.png`) loads correctly

## Out of scope (deferred)
- Supabase integration (no auth, no DB needed yet — single static page)
- Real donation processing (Stripe / donor-CRM)
- CMS for editing copy
- Multi-page routing (about, blog, news)
- Tweaks panel from the design prototype (it's a Claude Design dev tool, not
  a site feature)
