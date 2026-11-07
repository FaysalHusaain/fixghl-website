# FixGHL website: project handoff

Last updated: 8 November 2026 (full refresh: everything through the humanizer pass, plus plans and open decisions). Read this first in any new session, then `README.md`, `CONTENT.md` and `TODO.md`.

## 1. What this project is

- **Site:** https://fixghl.com, the marketing site for FixGHL, a specialist GoHighLevel (GHL) studio. It sets up, fixes, automates and migrates GHL accounts for coaches, agencies and local businesses.
- **Repo:** GitHub `FaysalHusaain/fixghl-website`, branch `main`. A push to `main` auto-deploys to production on Vercel, usually in about 1–2 minutes.
- **Stack:**
  - Next.js 16.4.3 (App Router, Turbopack, `cacheComponents`, `inlineCss`), React 19, Tailwind CSS v4, MDX.
  - Read `AGENTS.md`: this Next.js version differs from older docs.
- **Owner preferences:**
  - Execution first: do the task, with no moral commentary, unsolicited warnings or alternatives unless asked.
  - Give opinions only when invited.
  - Test everything before showing it.
  - Explain things simply when asked.

## 2. Brand and writing rules (always apply)

- **Voice:** "We", never "I". Never name studio members or other individuals in site copy. The one exception is Faysal Husaain, named only on /about#founder and in guide and comparison bylines, with no job title (see Founder visibility).
- **No fabricated proof.** Approved claims only: **7+ years in GHL (since 2019), 100+ GHL projects, 4 regions (US, UK, EU, Middle East)**, and clients are coaches, agencies and local businesses.
- **Client reviews:** only from `src/content/testimonials.ts`, verbatim. Never edit review text.
- **Banned:** hype words (revolutionize, unlock, seamless, supercharge, game-changer and so on), emoji, em dashes, and any mention of Fiverr on the site.
- **US spelling** everywhere: enroll, inquiry, labeling, standardize, center, color and so on. `aria-labelledby` is an HTML attribute; leave it as is.
- **Humanizer rules on prose:** no "not X but Y", no one-line closers, no stock AI words, no staged openers.
- **Prices and platform facts:** verify against official HighLevel pages and cite them with the date checked.
- **Colors:** gold `#FFDE59`, black `#08080A`. Fonts: Inter (body) and Inter Tight (display).
- **Design:** mobile-first. Keep the existing design system. Don't redesign sections the owner likes; they rejected one redesign, see section 5.

## 3. Key integrations and IDs

| Item | Value |
| --- | --- |
| GHL host | `https://link.codenovahq.com` |
| GHL calendar ID | `EJK8Z8tRUS73r8KUbzFV` (widget: `/widget/booking/EJK8Z8tRUS73r8KUbzFV`) |
| GHL form ID | `82ZHqKAiWU0WMYKDwZOr` (form name "fixGHL") |
| GHL resizer script | `https://link.codenovahq.com/js/form_embed.js` (loaded once) |
| GA4 | `G-7MHF0P2H0Z`, Consent Mode v2, analytics denied by default |
| Affiliate | `/try-ghl` gives a 307 redirect to `https://www.gohighlevel.com/highlevel-bootcamp?fp_ref=faisal13&fp_sid=fixghl`. Links use `rel="sponsored nofollow"`, `data-track="affiliate_click"`, and the line "We may earn a commission if you sign up through our link." |
| IndexNow key | `03ce8abe2fc275f9b08416cd125d578d` (file at `public/03ce8abe2fc275f9b08416cd125d578d.txt`) |
| Organization `sameAs` | Crunchbase `https://www.crunchbase.com/organization/fixghl`, Instagram `https://www.instagram.com/fixghlstudio/`, Pinterest `https://www.pinterest.com/fixghl/`, LinkedIn company `https://www.linkedin.com/company/fixghl/` (in `src/lib/site.ts`). Company profiles only, never a personal one |
| Instagram bio link | `/ig` gives a 307 redirect to `/book?utm_source=instagram&utm_medium=social&utm_campaign=bio` (`next.config.ts`) |
| Contact email | hello@fixghl.com |

Our affiliate link lands on HighLevel's bootcamp page, which offers a **30-day free trial**. HighLevel's standard trial is 14 days.

## 4. Site structure (main files)

- `src/app/page.tsx`: homepage.
- `src/components/home/`: `Hero.tsx`, `ServiceList.tsx`.
- `src/components/booking/BookingModule.tsx`: GHL calendar and form embeds, skeletons, lazy loading, booking message listener.
- `src/components/layout/`: `Header.tsx`, `Footer.tsx`, `MobileBookBar.tsx` (sticky mobile CTA).
- `src/components/analytics/`: `Reveal.tsx` (scroll fade-ins), `DeferredGA.tsx`, `LeadEvent.tsx` (fires `generate_lead` on `/book/thanks`).
- `src/components/content/`:
  - `ArticleLayout.tsx`: guides and comparisons, with the sidebar and closing banner.
  - `TryGhl.tsx`: affiliate trial box.
- `src/content/`:
  - Guides: `guides/index.ts` plus `.mdx` files.
  - Comparisons: `compare/`.
  - Glossary: `glossary/`.
  - Other: `services.ts`, `faqs.ts`, `testimonials.ts`, `types.ts`.
- `src/lib/site.ts`: site facts, `sameAs` and the one-line description.
- `src/lib/routes.ts`: feeds the sitemap.
- `src/app/llms.txt/route.ts`: llms.txt.
- `src/app/sitemap.ts`, `src/app/robots.ts`: generated SEO files.
- `next.config.ts`: the `/try-ghl` redirect.
- `src/app/globals.css`: plain CSS **must sit before the `@utility` blocks**. Rules after them were dropped.
- `design/ghl-calendar-custom-code.html`: CSS the owner pastes into GHL's calendar "Custom code" box.
- `public/brand/`: logo system, regenerated with `node design/brand.mjs`.
- `scripts/indexnow.mjs`: pings IndexNow from the sitemap. It runs automatically on every push to main through `.github/workflows/indexnow.yml` (see section 8 about the sandbox).
- `src/content/pricing.ts`: published prices and the "From $X · timeline" map. `public/pricing.md` mirrors it for machines.
- `src/content/hubs.ts` with `src/components/content/HubIntro.tsx`: intros on /compare, /services and /guides.
- `src/components/ui/OpenOnHash.tsx`: opens a FAQ item when the URL hash points to it (`/pricing#care-plan`).
- `content-queue.md`: the topic list for the scheduled guide writer (see section 5, Content pipeline).
- `public/testimonials/`: client photos (`<name>.jpg` originals) and the 160px square WebP avatars the site uses. Regenerate with `python3 scripts/testimonial-photos.py` (per-photo face crops are set in the script).
- `public/social/ig/`: Instagram carousel images (6 posts), hosted for GHL Social Planner CSV upload. Made in another session.
- `CONTENT.md`: how to add a guide, plus the writing rules. `HANDOFF.md`: this file.

**Pages:**
- `/`, `/book`, `/book/thanks` (noindex), `/how-it-works`, `/pricing`, `/about`, `/faq`.
- `/services` plus 7 services: ghl-fixes, ghl-setup, migrations, automation, funnels-websites, saas-white-label, integrations.
- `/services/migrations/[platform]`: clickfunnels, wix, kajabi, hubspot (each `-to-ghl`).
- `/guides` (12 guides, see below), `/compare` (GoHighLevel vs ClickFunnels), `/glossary` (10 terms).
- `/pricing.md`, `/llms.txt`, `/sitemap.xml` (44 URLs as of 8 Nov), `/robots.txt`.

**Guides (slug: published / updated):**
- ghl-workflow-not-triggering (26 Oct), ghl-emails-going-to-spam (26 Oct), migrate-clickfunnels-to-gohighlevel (26 Oct)
- what-is-gohighlevel (29 Oct), how-much-does-gohighlevel-cost (29 Oct), is-gohighlevel-down (29 Oct)
- is-gohighlevel-worth-it (31 Oct), what-is-gohighlevel-used-for (31 Oct), gohighlevel-snapshots (31 Oct)
- how-to-set-up-gohighlevel (2 Nov, merged via PR #1), is-gohighlevel-a-good-crm (5 Nov, merged via PR #2)
- `/privacy`, `/terms`, `/affiliate-disclosure`, `/try-ghl`.
- `/case-studies`: noindexed, not in nav or sitemap.

## 5. Work done (chronological)

### Earlier
- Built the full site: homepage, booking, services, migrations, guides, glossary, comparison, SEO and AI layer (JSON-LD, sitemap, robots, llms.txt, OG images).
- Client reviews and stories, plus a logo system: a spirit-level mark with an outlined wordmark, in `public/brand`.

### GHL calendar styling
- The owner's rule: **no custom calendar or form. Use the GHL widget only.** The custom calendar branch was abandoned; the owner was told to delete it on GitHub.
- Wrote CSS for GHL's calendar "Custom code" box, restyling colors, fonts, borders, radius and spacing without changing layout. Iterations:
  - Dropdown list constrained to the field width on mobile.
  - No height cap on the form step.
  - Confirm button 24px below the last field, full width.
  - Dropdown exactly 52px tall.
  - Details step: back arrow and heading on one row, 24px from the card top; heading aligned with the fields; textarea 110px; 32px under Confirm.
  - Date step: 40px top padding, 24px from the date grid to the time zone.
  - Goal: fits one screen at 1366x768.
- The final CSS is in `design/ghl-calendar-custom-code.html`. TODO: confirm it is pasted into GHL.

### Wiring and launch QA
- Wired the live GHL calendar and form embeds, GA4 (`generate_lead` on `/book/thanks`) and the `/try-ghl` affiliate redirect.
- Full production QA:
  - Zero layout shift; 44px tap targets.
  - Deferred GA4: loads on first interaction or 4s after load.
  - Skeleton placeholders the exact size of the GHL widgets: calendar 582px (524px at ≤450px width, re-measured 31 Oct 2026), form 632px (620px).

### Booking speed
- Preconnect to `link.codenovahq.com`. **Now exactly one preconnect**, at the owner's request.
- `/book`: the calendar is injected as soon as the page hydrates. It is not in the server HTML, because that delayed first paint on mobile.
- Homepage: the calendar loads when the booking module is within 1200px of the viewport, or 2s after load when idle.
- Form: loads on pointerenter, focus or touchstart of the "Send details" tab. `form_embed.js` loads once.
- **Time until the calendar is usable:** about 10s before, about 4.3–5s after. GHL's widget itself needs about 4–5s and loads around 100 files.
- **Form after opening the tab:** about 2.8s before, about 1.8s on desktop and about 2.3s on mobile after.

### Homepage funnel rework (current order)
1. Hero.
2. Sound familiar.
3. Services, with the 4 migration platform links as pills under Migrations.
4. Why a specialist.
5. How it works.
6. Reviews.
7. Booking module (`id="describe"`).
8. FAQ, ending with "Didn't see your question? Ask it on the call." and a "Book the free call" button.
9. **Stats strip (7+ / 100+ / 4), directly under the FAQ.** The owner insisted on this position.
10. Footer.

**Details:**
- **Hero:**
  - Subline: "We set up GoHighLevel accounts, build the automations and funnels that run them, move businesses over from ClickFunnels, Wix, Kajabi and HubSpot, and fix accounts that have stopped working. FixGHL is the specialist GHL studio for coaches, agencies and local businesses."
  - Buttons: "Book a free 30-minute GHL call" and "Describe your project". "Describe your issue" became "Describe your project" sitewide.
- **"Sound familiar":** the owner **rejected a 2x2 redesign. The ORIGINAL design is restored and must be kept.**
  - Sticky heading on the left with the intro "Most of our calls start with one of these."
  - Stacked cards, each with a quote, "Why it happens" and "What we do", and a link.
  - Copy shortened to 4 cards: workflow enrolls nobody, never set up, manual follow-up, leaving ClickFunnels.
  - A black closing card: "Recognize one of these?", "We'll tell you what we'd do and what it costs, whether or not you hire us." and a gold button, "Book a free 30-minute call".
- **Services order:** GHL setup, Workflows & automation, Funnels & websites, Migrations, GHL fixes, SaaS mode & white-label, Integrations.
- **Mobile sticky bar:**
  - Slim black bar, "Book a free 30-minute call →", with safe-area padding.
  - Shows after the hero, hidden while the booking module is on screen, never on `/book` pages.
  - Fires `book_call_click` with location `mobile_bar`.
- **Booking module copy:** "After you pick a time, we ask your name, email, what you need and a line about your account."
- **Homepage metadata:** title "FixGHL | GoHighLevel Setup, Automation & Migrations".
- **Cleanup:** removed the dead `/api/lead` endpoint and `src/content/lead.ts`, plus all "not connected" and TODO text from the site. Ran a US-spelling pass and a humanizer pass.

### PageSpeed work on /book
- One preconnect only.
- Skeleton shimmer: 40+ animated bars replaced by one compositor-only sweep. The skeleton fades with opacity only.
- Above-the-fold text never fades. Below-the-fold content hides instantly and only animates on scroll.

### Three new guides (29 Oct 2026)
- `/guides/what-is-gohighlevel`, `/guides/how-much-does-gohighlevel-cost` and `/guides/is-gohighlevel-down`.
- Facts were verified against gohighlevel.com/pricing, help.gohighlevel.com articles and status.gohighlevel.com, with dated "Sources" sections.
- Each has FAQ schema, 3 related links and a booking CTA, and is in the sitemap and llms.txt. IndexNow was pinged (202, 41 URLs).
- Verified pricing facts (29 Oct 2026):
  - **Plans:**
    - Starter $97/month: 3 sub-accounts.
    - Unlimited $297/month: unlimited sub-accounts, rebill phone and email at cost, basic API.
    - $497/month: called "Founder" on the pricing cards and in the help center, "Pro" in the pricing FAQ. Adds rebilling with markup and SaaS mode.
    - Enterprise: custom.
    - All plans: unlimited contacts and users, 14-day trial, month to month.
  - **Phone and SMS (US/Canada):**
    - Numbers: local $1.15/month, toll-free $2.15/month.
    - SMS $0.00747 per segment, sent or received, plus carrier fees.
    - Calls: outbound $0.0166/min, inbound $0.01165/min.
    - A2P registration: $22.50 one-time.
  - **Email:** LC Email $0.675 per 1,000.
  - **AI Employee plans:** Growth $50 per sub-account, Unlimited $97 per sub-account, Starter $20 (only on the $497 plan).
- The trial box on the what-is and pricing guides reads: "Start a 30-day free trial through our link (HighLevel's standard trial is 14 days)." plus the commission line.

### Article banners
`ArticleMeta.kind` drives the sidebar box and the closing banner together:

| `kind` | Wording |
| --- | --- |
| `"fix"` | "Rather have it fixed for you?" |
| `"migration"` | "Rather have us move it for you?" |
| unset (default) | "Rather have it set up for you?" |

- Fix: workflow-not-triggering, emails-going-to-spam, is-gohighlevel-down.
- Migration: migrate-clickfunnels-to-gohighlevel.
- Set up (default): what-is, pricing, the ClickFunnels comparison, and any new guide.

### Schema
Added the Crunchbase URL to the Organization `sameAs`.

### Published pricing (30 Oct 2026)
- `/pricing` rebuilt with the owner's exact copy:
  - Quick Fix from $99 (1–3 business days, full refund if not fixed).
  - GHL Setup from $697 (7–14 days, "Recommended" card with a gold border).
  - Move to GHL from $997 (2–3 weeks).
  - SaaS and white-label from $1,497, quoted on a call.
  - GHL Care Plan $297/month (anchor `#care-plan` opens its FAQ item).
- The page also has "How payment works", the proof strip, 7 pricing FAQs and a closing banner.
- JSON-LD: one Service plus Offer per price, the Care Plan as a UnitPriceSpecification (MON), and FAQPage.
- Prices live in `src/content/pricing.ts` (plans, Care Plan, and the `servicePriceLine` map). `public/pricing.md` mirrors them; update both together.
- A "From $X · timeline" line, linked to /pricing, shows on the homepage service rows and under each service page's intro:
  - $99: fixes, automation, integrations.
  - $697: setup.
  - $997: migrations and all 4 platform pages.
  - $1,497: SaaS.
  - "Quoted on a free call": funnels and websites.
- FAQ answers accept `[label](/path)` links. `/try-ghl` links get the affiliate attributes, and the schema gets plain text.
- The old "quoted after a call" answers were rewritten to match the prices: homepage cost FAQ, studio pricing, timeline and support FAQs, the GHL fixes cost FAQ, and llms.txt.

### Final batch (30 Oct 2026; the owner called the site frozen then, but changes continued on request)
- Homepage title is "GoHighLevel Expert for Fixes, Setup & Migrations | FixGHL", with the eyebrow "GoHighLevel expert studio" above the unchanged H1.
- Intros of 120–180 words sit under the H1 on /compare, /services and /guides (`src/content/hubs.ts`, `HubIntro.tsx`). They link to /pricing and the two top guides. The /compare meta description was rewritten.
- Every glossary term has a "Common problems" paragraph in its MDX. The bottom Related block lists the guide, the service and related terms (`related` in `src/content/glossary/index.ts`).
- IndexNow: `.github/workflows/indexnow.yml` runs `scripts/indexnow.mjs` on every push to main, after waiting 4 minutes for Vercel to deploy. The key is read from `public/<key>.txt`; run it by hand with `npm run indexnow`.

### Booking calendar fix (3 Nov 2026)
- **Symptom:** after moving from the homepage to /book inside the site, the /book calendar iframe stayed at 150px and showed after 8s cut off.
- **Cause:**
  - GHL's `form_embed.js` registers only the iframes that exist when it runs, and tracks them by id.
  - Next keeps the previous page mounted (hidden) during client navigation, so the homepage iframe, with the same fixed id, was still in the document.
- **Fix (in `BookingModule.tsx`):**
  - Every GHL iframe gets an id unique to its mount (a counter).
  - `form_embed.js` is injected again each time a GHL iframe mounts. It skips iframes it already knows, and the browser serves it from cache. Do not go back to a single `next/script` tag.
- **Safety net:** the calendar iframe has `min-height: 505px` (455px under 450px wide), so it is fully usable even if the resizer never reports. GHL still grows it for the time slots and details step.
- **Swap timing:** the swap waits for GHL's first content height report and a steady height, with a 5s fallback.

### Founder visibility (7 Nov 2026, revised 8 Nov)
- **Where he's named:** Faysal Husaain appears in two places only. The rest of the site still speaks as "we":
  - /about#founder: a "Who you'll work with" section with his photo, his name, "Runs FixGHL" and two paragraphs. No LinkedIn link and no job title.
  - Bylines on guides and comparisons: "Written by FixGHL · Reviewed by Faysal Husaain", with a small photo, linking to /about#founder.
- **Photo alt text:** "Faysal Husaain of FixGHL".
- **Details:** in `site.founder` in `src/lib/site.ts`. Photos are `public/brand/founder.jpg` (original), `founder.webp` (800px) and `founder-128.webp` (byline).
- **Schema:**
  - A Person `https://fixghl.com/#founder` sits in the sitewide graph, with name, url, image and worksFor. It has no jobTitle and no sameAs.
  - The Organization has `founder` pointing to it.
  - Each guide and comparison adds a WebPage node with `reviewedBy` pointing to the Person. `lastReviewed` is the page's own `updated` date.
- **Organization sameAs** includes the LinkedIn company page `https://www.linkedin.com/company/fixghl/`. Never add a personal profile.

### Audit fixes (31 Oct 2026)
- Vague link text replaced with descriptive text ("Read more" became "{Term} explained", and so on).
- /compare got a heading, "How do we compare GoHighLevel with other platforms?", with a 150-word answer that links to each comparison.
- /affiliate-disclosure was expanded to about 200 words, covering the 30-day trial through our link versus HighLevel's standard 14.
- Calendar placeholder: the skeleton and the live widget share one grid cell, so the box never shrinks while GHL settles. This gives zero layout shift.

### Three more guides (31 Oct 2026)
- is-gohighlevel-worth-it: an honest review, legit or scam, pros and cons, who it suits. Has the /try-ghl trial box.
- what-is-gohighlevel-used-for: 12 use cases by business type, each linked to its service.
- gohighlevel-snapshots: what a snapshot copies, and how to import and load one. Every step is cited from HighLevel help articles.
- The Snapshot glossary entry's Guide link points to the snapshots guide.

### Content pipeline (set up by another session)
- **Scheduled writer:** a guide writer runs on Mondays. It takes the first unchecked topic in `content-queue.md`, writes the guide on a branch, and opens a PR. The owner merges it (PRs #1 and #2 so far).
- **Next up:** "GoHighLevel SaaS mode explained", with slug `gohighlevel-saas-mode`, which must be used exactly.
  - /services/saas-white-label (`relatedGuides`) and /glossary/saas-mode (`related`) already point to that slug.
  - Both pages skip a guide link until the guide exists, so nothing breaks before it's published.
- **Queue after that:** GHL API key, Twilio/LC Phone, custom domain, A2P 10DLC, Google Calendar/Calendly, creating a sub-account, building a website, custom fields vs custom values, trigger links, free plan/trial, who owns GoHighLevel. Then comparisons with HubSpot, Kajabi and Calendly.
- **Requirements for every new guide:** follow `CONTENT.md`; facts checked on official HighLevel pages and cited with dates; 40–60 word answer under each question heading; 3 FAQs; 3 related links. Add contextual links to it from 2–3 related pages so it is never orphaned.

### Semrush fixes (5 Nov 2026)
- **Nofollow:** the only internal links with `nofollow` point to /try-ghl, which keeps `sponsored nofollow` by owner decision. So Semrush's "nofollow on internal links" warning, on 45 pages from the footer, stays.
- **Orphan:** the setup checklist guide now has links from the what-is, used-for and worth-it guides and the GHL setup service page.
- **Title equals H1:** two titles changed:
  - Setup checklist: "How to Set Up GoHighLevel: Step-by-Step Checklist | FixGHL".
  - Used-for guide: "What GoHighLevel Is Used For: 12 Examples | FixGHL".
- **Lighthouse mobile (5 Nov):**

  | Page | Performance | LCP | TBT |
  | --- | --- | --- | --- |
  | / | 92 | 2.4s | 249ms |
  | /pricing | 88 | 2.0s | 440ms |
  | /book | 86 | 2.4s | 428ms |
  | Setup checklist guide | 86 | 2.3s | 485ms |
  | Snapshots guide | 97 | 1.8s | 171ms |

  CLS is 0 everywhere, and every LCP element is text. Blocking time comes from Next.js and React's own JavaScript. Image and font audits all pass.

### Homepage canonical (5 Nov 2026)
- The homepage URL is `https://fixghl.com/` (with the slash) in the sitemap, canonical and og:url.
- Next's metadata always strips that slash, so `src/app/page.tsx` renders its own `<link rel="canonical">` and og:url, which React hoists into `<head>`. `pageMetadata` skips both for "/".
- `absoluteUrl("/")` returns the slashed form.

### Search Console tweaks (6 Nov 2026)
- Cost guide title: "GoHighLevel Pricing: Plans & Costs per Month | FixGHL".
- Worth-it guide title: "Is GoHighLevel Worth It? Honest Review | FixGHL".
- The SaaS mode guide is pre-wired (see Content pipeline).

### Humanizer pass (8 Nov 2026)
- The whole public copy was reviewed with the humanizer skill. Only 4 lines changed, in the "What we see in real accounts" sections of the setup checklist and CRM guides.
- Kept unchanged on purpose: answer-first openings, the owner's /pricing copy, number ranges like "1–3", and "No cost and no obligation" on /book.
- Dates are not changed for wording-only fixes.

### Testimonial photos (8 Nov 2026)
- Every testimonial now shows the client's photo as a small circle where the gold-on-black initials disc used to be: 56px in the homepage stories, 48px in quote cards (service pages, migration pages, and the Kerry Moore card in the homepage booking section, desktop only).
- Each entry in `src/content/testimonials.ts` has a `photo` path. Alt text is the client's name. Quote text is unchanged.
- No `photo` means an initials avatar: neutral grey disc (`ink-700`), light text, Inter medium. All 6 current clients have photos.
- Kerry Moore's photo was replaced on 8 Nov: face-detected crop (YuNet), 320px for retina, brightness +4% and contrast +6%. Settings are in the script.
- To add one: put `<first>-<last>.jpg` in `public/testimonials/`, add its crop to `scripts/testimonial-photos.py`, run it, and set `photo` on the entry.

### Other sessions' work, for awareness
- Booking (2 Nov):
  - The inactive booking tab stays laid out (out of flow, inert) instead of `display:none`.
  - The form preloads after the calendar settles.
  - Iframe corners are rounded.
  - The calendar uses the full module width on phones.
- The Instagram carousel images and the `/ig` link (see section 3).

## 6. Current scores (live, mobile, Lighthouse with PageSpeed's settings)

| Page | Performance | Accessibility | Best Practices | SEO | Speed Index |
| --- | --- | --- | --- | --- | --- |
| `/book` | 85–91 | 100 | 79 | 100 | 1.3–1.4s |
| `/` | 89–93 | 100 | 79 | 100 | 4.3–4.5s |

- Desktop: `/` 99–100 and `/book` 95–99 Performance.
- **Best Practices 78–79** is caused by GHL's third-party `__cf_bm` cookie, because the calendar now loads during the test. Restoring "load on first interaction" would bring it back to 100, at the cost of the calendar appearing later. This is the owner's call; currently not restored.
- **Homepage Speed Index (open issue):**
  - What the trace shows: the frame is painted about 0.25s after the HTML, but the browser doesn't present it until about 2.5s.
  - Only happens on the live homepage under Lighthouse. The local build gives 1.0–1.2s, other live pages are fine, and Playwright first paint is 0.3–0.6s.
  - Ruled out: GHL embeds, the Vercel scripts, the hero, the reveal effects.
  - Root cause not found. It may be a quirk of headless Chrome in the sandbox.
  - The owner was asked to run real PageSpeed at pagespeed.web.dev, because the anonymous PSI API quota was exhausted. Waiting on their results.
- Newer numbers (5 Nov, median of 3) are in Semrush fixes in section 5.

## 7. Remaining / open items

**Waiting on the owner:**
1. **Test one real booking and one real form submit.** Cloudflare Turnstile blocks automated submits.
2. **In GHL, set the redirect URLs:**
   - Form on submit: `https://fixghl.com/book/thanks?via=form`
   - Calendar: `https://fixghl.com/book/thanks?via=calendar`
3. Paste `design/ghl-calendar-custom-code.html` into the GHL calendar's Custom code box, if not done.
4. Run PageSpeed mobile on `/` and `/book` and share the results, for the Speed Index investigation.
5. Decide whether to restore activity-gated GHL loading for Best Practices 100.
6. **Make one real booking** after the 3 Nov calendar fix. The automated test reaches the submitting state and is stopped by Turnstile. If a "QA Test (automated)" booking for Thu 5 Nov, 5:00 PM UTC appeared in GHL, delete it.
7. **New service idea, "GHL account cleanup"** (owner's idea, 5 Nov): deduplicate contacts and custom fields, untangle workflows that clash, and clean up tags and unused assets without losing anything.
   - Proposed build:
     - Service page `/services/ghl-cleanup`.
     - A price line, a /pricing mention and a `pricing.md` entry.
     - A guide, "How to clean up a messy GoHighLevel account".
     - Wiring into the homepage list, footer, sitemap and llms.txt, plus links from related guides and glossary.
   - **Blocked on the owner:** starting price and timeline (one price or tiers by account size), and the service name ("GHL account cleanup", "CRM cleanup" or "Account audit & cleanup").

**Planned / recurring:**
- Monday guide-writer runs from `content-queue.md` (SaaS mode guide next). After each merge, check the new guide gets 2–3 contextual internal links, and that IndexNow ran (the GitHub Actions "IndexNow" workflow).
- Re-check GHL prices and plan names quarterly: guides, /pricing FAQ "plans from $97/month", the comparison, `pricing.md`.

**From `TODO.md`:**
- GA4: mark `generate_lead` as a key event; register the `ai_source` and `method` custom dimensions.
- Add the `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` env vars in Vercel; submit the sitemap in Search Console and Bing Webmaster Tools.
- Confirm the GHL calendar booking `postMessage` matches the listener in `BookingModule.tsx`, so `calendar_booked` fires.
- Lawyer review of `/terms` and `/privacy`.
- More company profile URLs for `sameAs` (Crunchbase, Instagram, Pinterest and LinkedIn company are done).
- Re-check GHL and ClickFunnels prices every quarter and update the dates on the guides, the comparison and `/try-ghl`.
- Case studies stay noindexed until real ones exist.

**Known housekeeping:**
- `README.md` still says "Static everywhere except the lead form endpoint". That endpoint was removed.
- `TODO.md` "Deploy to Vercel" is done.

## 8. How to work in this repo

- **Commands:**
  - Build: `npm run build`.
  - Local server: `npx next start -p 3100`.
  - Lint and type-check: `npx eslint src --quiet && npx tsc --noEmit`.
- **Stale CSS:** if the CSS looks wrong after a build, run `rm -rf .next` and rebuild. Turbopack once served stale CSS.
- **Commit trailer** (required on every commit):
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: <session link>
  ```
  Never put model names in code or commit text beyond that trailer.
- **Deploy:** `git push origin main`, then poll the live URL until the change shows.
- **Testing:** Playwright and Chromium are preinstalled in the cloud sandbox. Test at 390px and 1440px, check for no horizontal overflow, and check every link.
  - Use `scrollTo({behavior: "instant"})`; smooth scroll breaks tests.
  - On mobile, tap iframe steps and wait for them to settle.
  - Use the iframe element's own `contentFrame()`, not a cached frame.
- **IndexNow from the sandbox:** Node's `fetch` doesn't use the sandbox proxy, so `scripts/indexnow.mjs` fails there. Send the same JSON with `curl` to `https://api.indexnow.org/indexnow`. The script works normally elsewhere.
- **Fetching HighLevel pages from the sandbox:** the web-fetch tool is blocked from gohighlevel.com. Fetch them with `curl` or a Playwright browser instead; both work through the proxy.
- **Pulling first:** other sessions and the owner also push to `main` (PRs, uploads). Always `git pull origin main` before you start.
- **Founder rule:** never add his name, job title or personal links anywhere except /about#founder and the automatic bylines.
- **Testing gotcha:** don't inject CSS that targets a bare `header` selector in screenshot scripts; it also hits the article `<header>`. Use `body > header` instead.
- **New guide:** follow `CONTENT.md`.
  - Add the entry to `src/content/guides/index.ts`. Set `kind` only for `"fix"` or `"migration"` guides; add `ctaLine` if needed.
  - The sitemap and llms.txt update automatically. Then ping IndexNow.
