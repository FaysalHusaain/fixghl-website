# Open items before launch

Resolve each one, then remove the marker from the code. Find all markers with `grep -rn "\[\[TODO\|\[\[VERIFY" src`.

## Business facts (TODO)
- [ ] Business email: `src/lib/site.ts` (privacy, terms)
- [ ] Offers and pricing: `/pricing` cards (`price` field), studio FAQ, payment terms FAQ
- [ ] GHL affiliate URL: env `NEXT_PUBLIC_GHL_AFFILIATE_URL`
- [ ] GHL calendar embed URL: env `NEXT_PUBLIC_GHL_CALENDAR_URL`
- [ ] GHL form webhook: env `GHL_FORM_WEBHOOK_URL`
- [ ] Reply-time promise: `site.replyTime` (shown on `/book/thanks`)
- [ ] Social profile URLs for schema `sameAs`: `site.sameAs`
- [ ] Legal entity name and jurisdiction: `site.legalEntity`, terms governing law
- [ ] Final logo (temporary text wordmark and "F" favicon in use)
- [ ] Typical timelines per service (each service's `timeline`, how-it-works)
- [ ] Turnaround for urgent fixes (GHL fixes FAQ, home FAQ)
- [ ] Ongoing support or retainer offer (home FAQ)
- [ ] Post-project warranty or support policy (studio FAQ)
- [ ] Working hours and time zone; communication channel during projects (studio FAQ)
- [ ] Data retention periods (privacy policy)
- [ ] Payment terms and refunds; limitation of liability (terms, needs a lawyer's review)
- [x] Testimonials: 5 Fiverr reviews added (src/content/testimonials.ts)
- [ ] More reviews (studio is sending more screenshots)
- [x] Client names confirmed by the studio (Colt Blumenthal, Kerry Moore, Eric Thompson, Dr. Chris Simon, Matthew White, Tanner Tinsley)
- [ ] Add Australia to approved client regions? (one reviewer is in Australia)
- [ ] Case studies: none yet; /case-studies stays noindexed

## Facts to verify against official sources (VERIFY)
- [ ] GoHighLevel plan prices and SaaS mode plan requirement (official pricing page)
- [ ] ClickFunnels plan prices and features: SMS, appointments, CRM (official pricing page)
- [ ] GHL ClickFunnels importer support for ClickFunnels 2.0 pages
- [ ] Current workflow trigger names; Email Services menu path; DMARC handling in GHL setup
- [ ] Conversation AI channels and plan availability
- [ ] Kajabi subscription transfer options; HubSpot activity history import
- [ ] GHL calendar booking `postMessage` payload (test booking in DevTools)

## Launch steps
- [ ] Deploy to Vercel, add env vars, enable Web Analytics and Speed Insights
- [ ] Search Console and Bing verification tokens; submit the sitemap; run `scripts/indexnow.mjs`
- [ ] GA4: mark `calendar_booked` and `form_submit` as key events; register the `ai_source` dimension
- [ ] Pick a font pairing to lock: Inter Tight + Inter chosen (done)
