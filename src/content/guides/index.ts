import type { ArticleMeta } from "../types";

export const guides: ArticleMeta[] = [
  {
    slug: "ghl-workflow-not-triggering",
    title: "GoHighLevel workflow not triggering: how to fix it",
    metaTitle: "GoHighLevel Workflow Not Triggering? How to Fix It",
    description:
      "Why a GoHighLevel workflow stops triggering and how to fix it: draft status, trigger filters, re-entry, wrong trigger type and how to read execution logs.",
    summary: "A step-by-step check for GHL workflows that enroll nobody, enroll the wrong contacts or stop part way.",
    published: "2026-10-26",
    updated: "2026-10-26",
    faqs: [
      { q: "Why is my GoHighLevel workflow not triggering?", a: "The most common causes are a workflow left in draft, a trigger filter the contact does not meet, re-entry switched off for a contact who already went through, or a trigger type that does not match the event, such as Contact Created for a contact that already existed." },
      { q: "Do draft workflows run in GoHighLevel?", a: "No. A workflow in draft does not process live trigger events. Publish it, then test with a fresh contact." },
      { q: "How do I see why a contact did not enter a workflow?", a: "Open the workflow's execution logs and enrollment history and search for the contact. If they are not listed, the trigger never fired for them, so check the trigger and its filters." },
    ],
    related: [
      { href: "/services/ghl-fixes", label: "GHL fixes and troubleshooting" },
      { href: "/services/automation", label: "Workflows and automation" },
      { href: "/glossary/trigger", label: "What is a trigger in GHL?" },
      { href: "/glossary/workflow", label: "What is a workflow in GHL?" },
    ],
  },
  {
    slug: "ghl-emails-going-to-spam",
    title: "GHL emails going to spam: domain, DNS and warm-up fixes",
    metaTitle: "GHL Emails Going to Spam? Domain, DNS & Warm-Up Fixes",
    description:
      "Fix GoHighLevel emails landing in spam: set up a dedicated sending domain, SPF, DKIM and DMARC, clean your list and warm up sending volume.",
    summary: "How to move GHL email from spam to the inbox with a dedicated sending domain, SPF, DKIM, DMARC and a warm-up plan.",
    published: "2026-10-26",
    updated: "2026-10-26",
    faqs: [
      { q: "Why are my GoHighLevel emails going to spam?", a: "Usually because mail is sent from a shared or unauthenticated domain, the domain is missing SPF, DKIM or DMARC, the list contains old or bought addresses, or a new domain is sending too much too soon." },
      { q: "Does GoHighLevel set up DMARC for me?", a: "GHL's dedicated sending domain setup covers the SPF and DKIM records. A DMARC record is published separately at _dmarc on your domain." },
      { q: "Should I use a subdomain for GHL email?", a: "Yes, if your main domain already sends mail through Google Workspace or Microsoft 365. A subdomain such as mail.yourdomain.com keeps GHL's records separate from your inbox provider's." },
    ],
    related: [
      { href: "/services/ghl-fixes", label: "GHL fixes and troubleshooting" },
      { href: "/services/ghl-setup", label: "GHL account setup" },
      { href: "/glossary/lc-email", label: "What is LC Email?" },
      { href: "/glossary/sub-account", label: "What is a sub-account?" },
    ],
  },
  {
    slug: "migrate-clickfunnels-to-gohighlevel",
    title: "How to migrate from ClickFunnels to GoHighLevel without losing data",
    metaTitle: "Migrate ClickFunnels to GoHighLevel Without Losing Data",
    description:
      "A step-by-step plan to move funnels, contacts, products and email sequences from ClickFunnels to GoHighLevel, with checks so nothing is lost.",
    summary: "The order of work for a ClickFunnels to GHL move: inventory, custom fields, contacts, pages, checkout, sequences, testing and cut-over.",
    published: "2026-10-26",
    updated: "2026-10-26",
    faqs: [
      { q: "Can I import ClickFunnels funnels into GoHighLevel?", a: "GHL can import ClickFunnels pages by URL, one page at a time. Results vary, and some pages need rebuilding." },
      { q: "How do I move contacts from ClickFunnels to GHL?", a: "Export contacts from ClickFunnels as a CSV, create any custom fields in GHL first, then import the file and map every column. Tag the batch so you can check it afterwards." },
      { q: "Do ClickFunnels automations transfer to GHL?", a: "No. Email sequences and automations have to be rebuilt as GHL workflows." },
    ],
    related: [
      { href: "/services/migrations/clickfunnels-to-ghl", label: "ClickFunnels to GHL migration service" },
      { href: "/compare/gohighlevel-vs-clickfunnels", label: "GoHighLevel vs ClickFunnels" },
      { href: "/glossary/workflow", label: "What is a workflow in GHL?" },
      { href: "/services/funnels-websites", label: "Funnels and websites in GHL" },
    ],
  },
  {
    slug: "what-is-gohighlevel",
    title: "What is GoHighLevel? A plain-English guide",
    metaTitle: "What Is GoHighLevel (GHL)? A Plain-English Guide",
    description:
      "GoHighLevel (HighLevel, GHL) in plain English: what it does, who it suits, which tools it replaces, what it costs and how to start the free trial.",
    summary: "What GoHighLevel is, who it suits, which tools it replaces, how agencies and sub-accounts work, and how to start.",
    published: "2026-10-29",
    updated: "2026-10-29",
    ctaLine: "Not sure GoHighLevel fits your business? Tell us what you run today and we'll tell you straight on a free 30-minute call.",
    faqs: [
      { q: "Is GoHighLevel the same as HighLevel?", a: "Yes. GoHighLevel, HighLevel and GHL are names for the same platform. The company is HighLevel LLC, a subsidiary of GoHighLevel Inc., based in Dallas, Texas." },
      { q: "Does GoHighLevel have a free trial?", a: "Yes. Every plan starts with a 14-day free trial with full access to that plan's features. Billing starts automatically when the trial ends unless you cancel, and usage fees for phone and email can apply during the trial." },
      { q: "Do I need to be an agency to use GoHighLevel?", a: "No. HighLevel describes its $97 Starter plan as for smaller businesses and solo marketers. A single business usually runs everything from one sub-account." },
    ],
    related: [
      { href: "/guides/how-much-does-gohighlevel-cost", label: "How much does GoHighLevel cost per month?" },
      { href: "/services/ghl-setup", label: "GHL account setup" },
      { href: "/compare/gohighlevel-vs-clickfunnels", label: "GoHighLevel vs ClickFunnels" },
    ],
  },
  {
    slug: "how-much-does-gohighlevel-cost",
    title: "How much does GoHighLevel cost per month?",
    metaTitle: "GoHighLevel Pricing: How Much Does GHL Cost per Month?",
    description:
      "GoHighLevel pricing: every plan ($97, $297, $497), what each includes, phone, SMS, email and AI usage rates, add-ons, and which plan fits which business.",
    summary: "Every GoHighLevel plan and price, the usage rates for phone, SMS, email and AI, add-on costs and which plan to choose.",
    published: "2026-10-29",
    updated: "2026-10-29",
    ctaLine: "Not sure which plan or add-ons you need? We'll work it out with you on a free 30-minute call.",
    faqs: [
      { q: "Does GoHighLevel charge per contact or per user?", a: "No. Every plan includes unlimited contacts and unlimited users. The plan price changes with the number of sub-accounts and the rebilling options, not with list or team size." },
      { q: "Is SMS included in the GoHighLevel price?", a: "No. Texts, calls, phone numbers and email sending are billed by usage from a prepaid wallet. In the US and Canada an SMS segment costs $0.00747 sent or received, plus carrier fees." },
      { q: "Can I charge my clients for their GoHighLevel usage?", a: "Yes, on the $297 Unlimited plan you can rebill phone and email to clients at cost. The $497 plan also lets you add a markup and rebill AI usage." },
    ],
    related: [
      { href: "/guides/what-is-gohighlevel", label: "What is GoHighLevel?" },
      { href: "/services/saas-white-label", label: "SaaS mode and white-label setup" },
      { href: "/glossary/saas-mode", label: "What is SaaS mode?" },
    ],
  },
  {
    slug: "is-gohighlevel-down",
    title: "Is GoHighLevel down? How to check and what to do",
    metaTitle: "Is GoHighLevel Down? How to Check GHL Status and Fix It",
    description:
      "Check if GoHighLevel is down on the official status page, tell an outage from an account problem, fix loading and login issues, and reach GHL support.",
    summary: "How to check HighLevel's status page, tell an outage from an account problem, fix loading and login issues and contact support.",
    published: "2026-10-29",
    updated: "2026-10-29",
    faqs: [
      { q: "Is GoHighLevel down right now?", a: "Check HighLevel's official status page at status.gohighlevel.com. It shows whether all services are online, the uptime of each part of the platform and any incidents reported today." },
      { q: "Why is GoHighLevel not loading for me when it works for others?", a: "The cause is usually local: stored site data or cookies, a browser extension, a VPN or web protection software, or your user's access. Try an incognito window and a different network first." },
      { q: "How do I report a GoHighLevel outage?", a: "Agency admins and agency users can contact HighLevel support 24/7 through live chat from the blue question mark in the app, or call +1 (888) 732-4197 if they cannot log in." },
    ],
    related: [
      { href: "/services/ghl-fixes", label: "GHL fixes and troubleshooting" },
      { href: "/guides/ghl-workflow-not-triggering", label: "GoHighLevel workflow not triggering" },
      { href: "/guides/ghl-emails-going-to-spam", label: "GHL emails going to spam" },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
