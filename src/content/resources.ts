// Free, ungated resources served at /resources/<slug>. Same metadata shape as guides, so they share the article layout.
import type { ArticleMeta } from "./types";

export const resources: ArticleMeta[] = [
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
