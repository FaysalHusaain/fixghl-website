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
| `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` | server | Search Console and Bing Webmaster meta tags |
| `INDEXNOW_KEY` | server | IndexNow key; must match `public/<key>.txt` |

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel (framework preset: Next.js, no `vercel.json` needed).
2. Add the environment variables above for Production and Preview.
3. Enable **Web Analytics** and **Speed Insights** in the Vercel project (the components only render on Vercel).
4. Add the `fixghl.com` domain and redirect `www` to the apex.
5. After the first production deploy: verify the domain in Google Search Console and Bing Webmaster Tools, submit `https://fixghl.com/sitemap.xml` to both, then run `node scripts/indexnow.mjs`.

CLI alternative: `npx vercel` (preview) and `npx vercel --prod`.

## Booking, form and conversion tracking

- **Calendar and form:** `/book` and the homepage embed the GHL calendar ("Book a call") and the GHL form ("Send details") from `link.codenovahq.com`, loaded near the viewport. GHL's `form_embed.js` sizes both iframes to their content. Styling for the calendar is in `design/ghl-calendar-custom-code.html` (paste into the calendar's Custom code box).
- **Success:** both paths land on `/book/thanks` (noindex). For the calendar, set the GHL calendar's confirmation to stay in the widget; the site listens for the booking `postMessage` and redirects. [[VERIFY: GHL booking postMessage payload. Open DevTools, make a test booking, and confirm the message matches the listener in `src/components/booking/BookingModule.tsx`.]]

### GA4 events

| Event | Fired when | Mark as key event (conversion) |
| --- | --- | --- |
| `book_call_click` | Any "Book a call" link (`data-track`), with `location` param | No |
| `calendar_booked` | GHL calendar iframe reports a completed booking | Yes |
| `affiliate_click` | Any `/try-ghl` link (307 to the GoHighLevel affiliate URL, set in `next.config.ts`) | No |

GA4 (`G-7MHF0P2H0Z`, set in `src/lib/site.ts`) loads through `@next/third-parties` on the first interaction or 4s after load (`DeferredGA`), runs Consent Mode v2 with analytics denied by default, and updates on the visitor's choice. Ads storage stays denied.

**AI referrals.** When the referrer is chatgpt.com, chat.openai.com, perplexity.ai, gemini.google.com, copilot.microsoft.com or claude.ai, the GA config sends `ai_source`. In GA4 Admin, register `ai_source` as an event-scoped custom dimension. Also build an exploration filtered on session source matching `chatgpt|openai|perplexity|gemini|copilot|claude` to see AI traffic, including visits where the parameter is missing.

## SEO and AI visibility

- `/sitemap.xml`, `/robots.txt` and `/llms.txt` are generated from `src/lib/routes.ts` and the content indexes, so new guides appear automatically.
- `robots.txt` explicitly allows search, AI answer and AI training crawlers (Googlebot, Google-Extended, Bingbot, Applebot, Applebot-Extended, OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User, CCBot, Meta). Names checked against vendor docs in October 2026.
- JSON-LD: Organization + WebSite sitewide, Service on service pages, BreadcrumbList on every inner page, TechArticle on guides and comparisons, FAQPage wherever FAQs show, DefinedTerm/DefinedTermSet on the glossary, ItemList on the services hub. Authors are always the Organization.
- OG images: `/og/<path>` renders a 1200×630 brand card for every route.
- Entity consistency: the one-line description lives in `src/lib/site.ts` (`site.oneLine`). Use it everywhere, including third-party profiles.

## Brand rules enforced in code

"We" voice only. No individuals' names, no fake proof. Approved claims live in `src/lib/site.ts`. Client reviews live in `src/content/testimonials.ts`: verbatim sentences from five-star Fiverr reviews, chosen so no individual is named. Add new ones only from a real source. `/case-studies` is noindexed and left out of nav and the sitemap. Missing facts are written as `[[TODO: ...]]` or `[[VERIFY: ...]]`, highlighted on the page, and listed in `TODO.md`. Before launch, run `grep -rn "\[\[TODO\|\[\[VERIFY" src` and resolve every hit.
