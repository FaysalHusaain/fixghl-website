# fixghl.com

Marketing site for FixGHL, a specialist GoHighLevel studio. Next.js 16 (App Router, Turbopack, Cache Components), React 19, Tailwind CSS 4, MDX. Static everywhere except the lead form endpoint and OG images.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical domain, sitemap, schema, OG URLs |
| `NEXT_PUBLIC_GHL_CALENDAR_URL` | public | GHL calendar embed (iframe `src`). Without it the booking tab shows a placeholder |
| `GHL_FORM_WEBHOOK_URL` | server | GHL inbound webhook for the fallback form. Without it, production returns 503 and dev logs the lead |
| `NEXT_PUBLIC_GHL_AFFILIATE_URL` | public | Trial button on `/try-ghl` (`rel="sponsored"`) |
| `NEXT_PUBLIC_GA_ID` | public | GA4 measurement ID. Enables GA and the consent banner |
| `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` | server | Search Console and Bing Webmaster meta tags |
| `INDEXNOW_KEY` | server | IndexNow key; must match `public/<key>.txt` |
| `NEXT_PUBLIC_SHOW_TESTIMONIALS` | public | Keep `false` until real, approved testimonials exist |

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel (framework preset: Next.js, no `vercel.json` needed).
2. Add the environment variables above for Production and Preview.
3. Enable **Web Analytics** and **Speed Insights** in the Vercel project (the components only render on Vercel).
4. Add the `fixghl.com` domain and redirect `www` to the apex.
5. After the first production deploy: verify the domain in Google Search Console and Bing Webmaster Tools, submit `https://fixghl.com/sitemap.xml` to both, then run `node scripts/indexnow.mjs`.

CLI alternative: `npx vercel` (preview) and `npx vercel --prod`.

## Booking, form and conversion tracking

- **Calendar (primary):** `/book` and the homepage embed the GHL calendar from `NEXT_PUBLIC_GHL_CALENDAR_URL`, lazy-loaded near the viewport inside a fixed-height box (no layout shift). Put the 4 qualifying questions in the GHL calendar's form: what you need, current platform, urgency, website or GHL URL.
- **Form (fallback):** posts JSON to `/api/lead`, which validates on the server, drops honeypot submissions (`company_site`), rate-limits to 5 per IP per 10 minutes, and forwards to `GHL_FORM_WEBHOOK_URL` as `{name, email, need, platform, urgency, website, details, source, submitted_at}`. Map those fields in the GHL inbound-webhook workflow.
- **Success:** both paths land on `/book/thanks` (noindex). For the calendar, set the GHL calendar's confirmation to stay in the widget; the site listens for the booking `postMessage` and redirects. [[VERIFY: GHL booking postMessage payload. Open DevTools, make a test booking, and confirm the message matches the listener in `src/components/booking/BookingModule.tsx`.]]

### GA4 events

| Event | Fired when | Mark as key event (conversion) |
| --- | --- | --- |
| `book_call_click` | Any "Book a call" link (`data-track`), with `location` param | No |
| `calendar_booked` | GHL calendar iframe reports a completed booking | Yes |
| `form_submit` | Fallback form accepted by `/api/lead`, with `need` and `urgency` | Yes |
| `affiliate_click` | Trial button on `/try-ghl` | No |

GA4 loads only with `NEXT_PUBLIC_GA_ID`, runs Consent Mode v2 with analytics denied by default, and updates on the visitor's choice. Ads storage stays denied.

**AI referrals.** When the referrer is chatgpt.com, chat.openai.com, perplexity.ai, gemini.google.com, copilot.microsoft.com or claude.ai, the GA config sends `ai_source`. In GA4 Admin, register `ai_source` as an event-scoped custom dimension. Also build an exploration filtered on session source matching `chatgpt|openai|perplexity|gemini|copilot|claude` to see AI traffic, including visits where the parameter is missing.

## SEO and AI visibility

- `/sitemap.xml`, `/robots.txt` and `/llms.txt` are generated from `src/lib/routes.ts` and the content indexes, so new guides appear automatically.
- `robots.txt` explicitly allows search, AI answer and AI training crawlers (Googlebot, Google-Extended, Bingbot, Applebot, Applebot-Extended, OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User, CCBot, Meta). Names checked against vendor docs in October 2026.
- JSON-LD: Organization + WebSite sitewide, Service on service pages, BreadcrumbList on every inner page, TechArticle on guides and comparisons, FAQPage wherever FAQs show, DefinedTerm/DefinedTermSet on the glossary, ItemList on the services hub. Authors are always the Organization.
- OG images: `/og/<path>` renders a 1200×630 brand card for every route.
- Entity consistency: the one-line description lives in `src/lib/site.ts` (`site.oneLine`). Use it everywhere, including third-party profiles.

## Brand rules enforced in code

"We" voice only. No individuals' names, no fake proof. Approved claims live in `src/lib/site.ts`. Testimonials stay hidden behind a flag, and `/case-studies` is noindexed and left out of nav and the sitemap. Missing facts are written as `[[TODO: ...]]` or `[[VERIFY: ...]]`, highlighted on the page, and listed in `TODO.md`. Before launch, run `grep -rn "\[\[TODO\|\[\[VERIFY" src` and resolve every hit.
