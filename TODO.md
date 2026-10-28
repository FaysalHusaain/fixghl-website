# Launch checklist

## Before or at launch
- [ ] Deploy to Vercel (see README) and connect fixghl.com
- [x] GHL calendar and form embedded on /book and the homepage
- [ ] Paste design/ghl-calendar-custom-code.html into the GHL calendar Custom code box (replace any old code)
- [ ] Env: GHL_FORM_WEBHOOK_URL (the "Send details" form needs it in production)
- [x] GA4 G-7MHF0P2H0Z live, generate_lead fires on /book/thanks
- [ ] GA4: mark generate_lead as a key event; register ai_source and method custom dimensions
- [ ] Env: GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION; submit sitemap; run scripts/indexnow.mjs
- [x] /try-ghl redirects (307) to the GoHighLevel affiliate link
- [ ] Test a real booking and confirm the GHL calendar postMessage triggers calendar_booked (see README)

## Review when convenient
- [ ] Have a lawyer review /terms (liability wording) and /privacy (retention wording)
- [x] Logo system in public/brand (regenerate with `node design/brand.mjs`)
- [ ] Social profile URLs for schema sameAs (src/lib/site.ts)
- [ ] US entity or address, if you want it in the footer and schema
- [ ] Re-check GHL and ClickFunnels prices each quarter and update the dates on /try-ghl and the comparison
- [ ] Case studies: /case-studies stays noindexed until real ones exist
