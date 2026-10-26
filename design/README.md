# FixGHL design direction (Phase 1)

## Direction
Type-led, Apple-style product page. Dark `#08080A` first screen with one large answer-first headline, then the product shown as real GHL interface fragments drawn in HTML (workflows, pipelines, calendars). Sections alternate between ink and warm-paper grounds. Gold appears only on the primary action, focus rings on dark, and "fixed" states inside UI fragments.

**The idea:** the name is a verb. Every fragment on the site shows a GHL screen in the state we leave it: fixed. The hero workflow shows the trigger that was broken and the note that says why.
**The live element (Phase 2):** a symptom finder set as a large command list ("Fix a workflow that isn't firing", "Fix emails landing in spam" and so on). You type your problem and the list narrows to the right service.

## Fonts
- **A (default): Geist Sans** for display and text, via `next/font`. Geist Mono is used only in code blocks inside guides.
- **B: Inter Tight** for display, **Inter** for text. Tighter and more editorial at large sizes, with slightly more contrast between headings and body.

## Palette
Run `node design/palette.mjs` to regenerate it. Ink is a warm neutral scale (hue 40) running from `#FAF9F8` to `#08080A`. Gold is `#FFDE59`.
- On dark surfaces, gold text and focus rings measure 15.1:1 (pass).
- Ink text on a gold fill measures 15.1:1 (pass).
- Gold on white measures 1.33:1 (fail), so it is never used.
- On light surfaces, the primary button is an ink fill and gold is not used.

## Review page
Run `node design/build-preview.mjs <out.html>` while `next start -p 3100` is running. It builds a self-contained page with real-size desktop and phone frames from the production build. Published: https://claude.ai/artifact/JdjfCGrJ19kn6oQQpYRHKs

## Mobile-first rules (locked)
- Lay out phone width first and enhance at `md`. The primary CTA sits on the first phone screen, and tap targets are at least 52px.
- GHL fragments render vertically on phones, the way GHL's own builder does, and horizontally from `md` up.
- Phase 2: a sticky bottom "Book a 30-minute call" bar on phones once the hero scrolls out of view, respecting the safe area.
