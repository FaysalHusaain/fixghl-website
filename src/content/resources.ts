// Free, ungated resources served at /resources/<slug>. Same metadata shape as guides, so they share the article layout.
import type { ArticleMeta } from "./types";

export const resources: ArticleMeta[] = [
  {
    slug: "gohighlevel-cost-calculator",
    title: "GoHighLevel cost calculator",
    metaTitle: "GoHighLevel Cost Calculator: Your Real Monthly Bill | FixGHL",
    description:
      "Free GoHighLevel cost calculator: pick a plan, phone numbers, texts, calls, email, AI and add-ons and see your real monthly bill at HighLevel's published prices.",
    summary:
      "Free calculator for the real monthly cost of GoHighLevel: plan, phone numbers, SMS, calls, A2P, email, AI Employee plans and add-ons, at HighLevel's published US prices.",
    published: "2026-11-25",
    updated: "2026-11-25",
    faqs: [
      { q: "How much does GoHighLevel cost per month in total?", a: "The plan is $97, $297 or $497 a month. Usage comes on top: a single business with one number, 2,000 texts, 600 call minutes and 10,000 emails a month pays about $139 a month on Starter, at HighLevel's prices checked in November 2026." },
      { q: "Does GoHighLevel charge for text messages?", a: "Yes. On LC Phone each SMS segment costs $0.00747, sent or received, plus a carrier fee of roughly half a cent. A local number costs $1.15 a month, and texting US contacts needs A2P 10DLC registration." },
      { q: "Can I pass GoHighLevel usage costs on to my clients?", a: "On the $297 Unlimited plan you can rebill phone and email costs to each client at cost. On the $497 Founder plan you can add a markup and also rebill AI usage. Starter can't rebill." },
      { q: "Is the GoHighLevel AI Employee included in the plan?", a: "Content AI and the AI builders are free on every plan. AI agents such as Conversation AI and Voice AI are paid per use, or through an AI Employee plan at $50 or $97 a month per sub-account. A $20 plan for AI assistants is available on the Founder plan only." },
    ],
    related: [
      { href: "/guides/how-much-does-gohighlevel-cost", label: "How much does GoHighLevel cost?" },
      { href: "/guides/gohighlevel-saas-mode", label: "GoHighLevel SaaS mode explained" },
      { href: "/guides/connect-twilio-lc-phone-gohighlevel", label: "How to connect Twilio or LC Phone to GoHighLevel" },
      { href: "/resources/a2p-10dlc-checklist", label: "A2P 10DLC approval checklist" },
      { href: "/services/ghl-setup", label: "GoHighLevel account setup" },
    ],
    ctaLine: "Know your numbers and want the account built right? We set up GoHighLevel, phone, A2P and rebilling with you. The first 30-minute call is free.",
  },
  {
    slug: "a2p-10dlc-checklist",
    title: "A2P 10DLC approval checklist for GoHighLevel",
    metaTitle: "A2P 10DLC Checklist for GoHighLevel (Free, With Templates) | FixGHL",
    description:
      "A free A2P 10DLC checklist for GoHighLevel: brand, website, opt-in form and campaign checks, plus copy-ready consent, privacy, STOP and HELP text.",
    summary:
      "Free checklist for getting A2P 10DLC approved in GoHighLevel: brand, website, opt-in form and campaign checks, with copy-ready consent, privacy, terms, STOP and HELP text.",
    published: "2026-11-22",
    updated: "2026-11-22",
    faqs: [],
    related: [
      { href: "/guides/connect-twilio-lc-phone-gohighlevel", label: "How to connect Twilio or LC Phone to GoHighLevel" },
      { href: "/services/ghl-setup", label: "GoHighLevel account setup and onboarding" },
      { href: "/services/integrations", label: "GoHighLevel integrations" },
    ],
    ctaLine: "Rejected and not sure why? Book a free 30-minute call and we'll look at your registration with you.",
  },
];

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);
