# Adding content

## A new guide

1. Add metadata to `src/content/guides/index.ts`: `slug`, `title` (H1), `metaTitle` (60 characters max), `description` (155 max), `summary` (one line, used in hubs and llms.txt), `published`, `updated`, `faqs` (3 or more) and `related` (at least 3 internal links).
2. Create `src/content/guides/<slug>.mdx`. Structure:
   - Open with `<p className="answer">…</p>`: a direct 40–60 word answer to the title.
   - Every H2 is a question people type ("Why is my … not …?"), followed by a 40–60 word answer paragraph, then steps, a table or a checklist.
   - Link to GHL's help center for platform facts. Wrap anything you could not confirm in `<mark className="todo">[[VERIFY: …]]</mark>`.
   - End with a link to the matching service.
3. Run `npm run build`. The page, its OG image, the sitemap entry, the llms.txt entry, the TOC and the Article and FAQPage schema all generate automatically.

Comparisons work the same way in `src/content/compare/`. Glossary terms go in `src/content/glossary/index.ts` plus `<slug>.mdx`.

## Writing rules

- Write as "we". Never "I", never a person's name.
- Make only verifiable claims. Approved proof: 7+ years in GHL (since 2019), 100+ GHL projects, clients are coaches, agencies and local businesses, clients are in the US, UK, EU and Middle East. Client quotes come only from src/content/testimonials.ts.
- Don't use hype words (revolutionize, unlock, seamless, supercharge, game-changer), emoji or em dashes.
- Date every price and platform limit ("as listed in October 2026") and update `updated` when you change a page.
