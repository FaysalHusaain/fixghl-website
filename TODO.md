# Launch checklist

## Before or at launch
- [ ] Deploy to Vercel (see README) and connect fixghl.com
- [ ] Env: NEXT_PUBLIC_GHL_CALENDAR_URL=https://link.codenovahq.com/widget/booking/EJK8Z8tRUS73r8KUbzFV, then Redeploy (until set, the booking box offers email booking at hello@fixghl.com)
- [ ] Paste design/ghl-calendar-custom-code.html into the GHL calendar Custom code box (replace any old code)
- [ ] Env: GHL_FORM_WEBHOOK_URL (the "Send details" form needs it in production)
- [ ] Env: NEXT_PUBLIC_GA_ID; mark calendar_booked and form_submit as key events; register ai_source dimension
- [ ] Env: GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION; submit sitemap; run scripts/indexnow.mjs
- [ ] Env (optional): NEXT_PUBLIC_GHL_AFFILIATE_URL shows the trial button on /try-ghl
- [ ] Test a real booking and confirm the GHL calendar postMessage triggers calendar_booked (see README)

## Review when convenient
- [ ] Have a lawyer review /terms (liability wording) and /privacy (retention wording)
- [x] Logo system in public/brand (regenerate with `node design/brand.mjs`)
- [ ] Social profile URLs for schema sameAs (src/lib/site.ts)
- [ ] US entity or address, if you want it in the footer and schema
- [ ] Re-check GHL and ClickFunnels prices each quarter and update the dates on /try-ghl and the comparison
- [ ] Case studies: /case-studies stays noindexed until real ones exist
