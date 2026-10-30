// Published starting prices. Single source for /pricing, the service price lines and the pricing schema.
// public/pricing.md mirrors this for machines; update both together.

export type Plan = {
  id: string;
  name: string;
  price: string;
  minPrice: number;
  timeline: string;
  for: string;
  includes: string[];
  note: string;
  recommended?: boolean;
};

export const plans: Plan[] = [
  {
    id: "quick-fix",
    name: "Quick Fix",
    price: "From $99",
    minPrice: 99,
    timeline: "Fixed in 1–3 business days",
    for: "One thing in GHL that's broken right now.",
    includes: [
      "One issue fixed: a workflow that won't fire, emails landing in spam, a domain that won't connect, or a calendar or integration that stopped syncing",
      "A short screen recording showing what broke and what we changed",
      "7 days of follow-up if the same issue comes back",
    ],
    note: "If we can't fix it, you get a full refund.",
  },
  {
    id: "ghl-setup",
    name: "GHL Setup",
    price: "From $697",
    minPrice: 697,
    timeline: "Live in 7–14 days",
    for: "A new GHL account, or one that was never set up properly.",
    includes: [
      "Pipelines, calendars, forms and your core follow-up automations",
      "Domain and email setup so your emails reach the inbox",
      "Help with A2P 10DLC registration for US texting",
      "A recorded walkthrough of your account",
      "14 days of free fixes after launch, then optional GHL Care Plan",
    ],
    note: "50% to start, 50% once it's live and you've approved it.",
    recommended: true,
  },
  {
    id: "move-to-ghl",
    name: "Move to GHL",
    price: "From $997",
    minPrice: 997,
    timeline: "Live in 2–3 weeks",
    for: "Businesses moving from ClickFunnels, Wix or another platform.",
    includes: [
      "Funnels, pages, contacts and automations rebuilt in GHL",
      "Every old link checked against its new page before launch",
      "A recorded walkthrough of your new setup",
      "14 days of free fixes after launch",
    ],
    note: "50% to start, 50% once it's live and you've approved it.",
  },
];

export const saasBuild = { name: "SaaS / white-label build", minPrice: 1497, line: "Building a SaaS or white-label GHL offer? From $1,497, quoted on a free call." };

export const carePlan = {
  name: "GHL Care Plan",
  price: "$297/month",
  amount: 297,
  text: "For accounts that are already running. Up to 5 requests a month, replies within 1 business day, and a monthly account health check. Cancel anytime.",
};

// The "From $X · timeline" line on service cards and service pages.
const FIX = "From $99 · fixed in 1–3 business days";
const SETUP = "From $697 · live in 7–14 days";
const MIGRATION = "From $997 · live in 2–3 weeks";
export const servicePriceLine: Record<string, string> = {
  "ghl-fixes": FIX,
  automation: FIX,
  integrations: FIX,
  "ghl-setup": SETUP,
  migrations: MIGRATION,
  "clickfunnels-to-ghl": MIGRATION,
  "wix-to-ghl": MIGRATION,
  "kajabi-to-ghl": MIGRATION,
  "hubspot-to-ghl": MIGRATION,
  "saas-white-label": "From $1,497 · quoted on a call",
  "funnels-websites": "Quoted on a free call",
};
