import type { ArticleMeta } from "../types";

export const guides: ArticleMeta[] = [
  {
    slug: "ghl-workflow-not-triggering",
    kind: "fix",
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
      { href: "/guides/is-gohighlevel-down", label: "Is GoHighLevel down? How to check" },
    ],
  },
  {
    slug: "ghl-emails-going-to-spam",
    kind: "fix",
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
    kind: "migration",
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
    metaTitle: "GoHighLevel Pricing: Plans & Costs per Month | FixGHL",
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
    kind: "fix",
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
  {
    slug: "is-gohighlevel-worth-it",
    title: "Is GoHighLevel worth it? An honest review",
    metaTitle: "Is GoHighLevel Worth It? Honest Review | FixGHL",
    description:
      "Is GoHighLevel worth it, legit or a scam? An honest review of its pros and cons, the real costs, who it suits and who should skip it.",
    summary: "An honest GoHighLevel review: whether it is legit, its strengths and downsides, real costs, and who it suits or does not.",
    published: "2026-10-31",
    updated: "2026-10-31",
    ctaLine: "Not sure GoHighLevel fits your business? Tell us what you run today and we'll give you a straight answer on a free 30-minute call.",
    faqs: [
      { q: "Is GoHighLevel legit?", a: "Yes. GoHighLevel is made by HighLevel LLC, a subsidiary of GoHighLevel Inc., with its head office in Dallas, Texas. Prices are published, plans are month to month, and you can cancel from your dashboard at any time." },
      { q: "Is GoHighLevel good for small businesses?", a: "It suits small businesses that sell through calls, appointments or quotes and would use several of its tools together. It is a poor fit for a business that only needs one tool or has no one to run the account." },
      { q: "Can I cancel GoHighLevel at any time?", a: "Yes. HighLevel says plans are month to month with no long-term contract, and you can upgrade, downgrade or cancel from your dashboard. Billing starts automatically when the free trial ends unless you cancel." },
    ],
    related: [
      { href: "/guides/how-much-does-gohighlevel-cost", label: "How much does GoHighLevel cost per month?" },
      { href: "/guides/what-is-gohighlevel-used-for", label: "What is GoHighLevel used for? 12 real examples" },
      { href: "/services/ghl-setup", label: "GHL account setup" },
    ],
  },
  {
    slug: "what-is-gohighlevel-used-for",
    title: "What is GoHighLevel used for? 12 real examples",
    metaTitle: "What GoHighLevel Is Used For: 12 Examples | FixGHL",
    description:
      "What GoHighLevel is used for: 12 real examples for coaches, agencies and local businesses, from call booking and funnels to missed-call text-back.",
    summary: "Twelve real GoHighLevel use cases for coaches, agencies and local businesses, each with the features it relies on.",
    published: "2026-10-31",
    updated: "2026-10-31",
    ctaLine: "Know which of these you want running? We'll scope it with you on a free 30-minute call.",
    faqs: [
      { q: "What is GoHighLevel mainly used for?", a: "Capturing leads, following up with them automatically and turning them into booked calls, sales and reviews. It combines a CRM, funnels, email and SMS, calendars, workflows, reviews and payments in one account." },
      { q: "Who uses GoHighLevel?", a: "Mostly coaches and consultants, marketing agencies and local businesses such as clinics and home services. Agencies use it to run many clients from one login, each in a separate sub-account." },
      { q: "Can GoHighLevel replace my website?", a: "Yes, for most service businesses. GoHighLevel includes a website and funnel builder with domain management, so your site, forms and booking pages can all run in the same account as your CRM." },
    ],
    related: [
      { href: "/guides/what-is-gohighlevel", label: "What is GoHighLevel?" },
      { href: "/guides/is-gohighlevel-worth-it", label: "Is GoHighLevel worth it? An honest review" },
      { href: "/services/automation", label: "Workflows and automation" },
    ],
  },
  {
    slug: "gohighlevel-snapshots",
    title: "GoHighLevel snapshots: what they are and how to import one",
    metaTitle: "GoHighLevel Snapshots: What They Are and How to Import",
    description:
      "What a snapshot is in GHL, what it copies and what it leaves out, and step-by-step how to import a snapshot and load it into a sub-account.",
    summary: "What a GHL snapshot copies and leaves out, and the exact steps to import one and load it into a sub-account.",
    published: "2026-10-31",
    updated: "2026-10-31",
    ctaLine: "Rather not load and reconnect a snapshot yourself? We'll set it up in your account. The first 30-minute call is free.",
    faqs: [
      { q: "Does a GoHighLevel snapshot copy contacts?", a: "No. Snapshots copy configuration such as workflows, funnels, calendars, forms and custom values. Contacts, appointments, conversations and integrations do not transfer." },
      { q: "Will loading a snapshot delete my existing data?", a: "No. Loading a snapshot adds the assets you select. Existing items only change if you choose Override for a conflict during the load." },
      { q: "Why can't I see Load Snapshot in GoHighLevel?", a: "Your user may not have snapshot access. An agency admin can switch it on under roles and permissions in the agency dashboard." },
    ],
    related: [
      { href: "/glossary/snapshot", label: "What is a snapshot in GHL?" },
      { href: "/services/ghl-setup", label: "GHL account setup" },
      { href: "/services/saas-white-label", label: "SaaS mode and white-label setup" },
    ],
  },
  {
    slug: "how-to-set-up-gohighlevel",
    title: "How to set up GoHighLevel: a beginner's checklist",
    metaTitle: "How to Set Up GoHighLevel: Step-by-Step Checklist | FixGHL",
    description:
      "Set up GoHighLevel step by step: sub-account, business profile, users, phone and A2P 10DLC, sending domain, website domain, calendars and workflows.",
    summary: "The order to set up a new GHL account, from business profile and A2P registration to calendars, pipelines, integrations and a tested first workflow.",
    published: "2026-11-02",
    updated: "2026-11-02",
    ctaLine: "Rather not work through the checklist yourself? We'll set up your account with you. The first 30-minute call is free.",
    faqs: [
      { q: "What is the first thing to set up in GoHighLevel?", a: "Fill in the business profile under Settings > Business Profile: business name, address, time zone and authorized representative. Phone compliance, calendars and scheduled messages all rely on these details." },
      { q: "Do I need A2P 10DLC registration in GoHighLevel?", a: "Yes, if you text US recipients from a standard 10-digit local number. HighLevel states registration is required to send SMS or MMS to US numbers. Register your brand, then a campaign, in Settings > Phone System > Trust Center." },
      { q: "Should I set up GoHighLevel in the agency account or a sub-account?", a: "Set up the business in a sub-account. The agency account handles billing, branding and the list of sub-accounts, while contacts, calendars, phone, email, funnels and workflows all live in the sub-account." },
      { q: "Does GoHighLevel have a setup checklist?", a: "Some accounts show a LaunchPad item in the sub-account menu with guided setup tasks. HighLevel describes it as a limited rollout, so it does not appear in every account." },
    ],
    related: [
      { href: "/services/ghl-setup", label: "GHL account setup" },
      { href: "/guides/gohighlevel-snapshots", label: "GoHighLevel snapshots: what they are and how to import one" },
      { href: "/guides/ghl-emails-going-to-spam", label: "GHL emails going to spam" },
      { href: "/guides/ghl-workflow-not-triggering", label: "GoHighLevel workflow not triggering" },
      { href: "/glossary/sub-account", label: "What is a sub-account?" },
    ],
  },
  {
    slug: "is-gohighlevel-a-good-crm",
    title: "Is GoHighLevel a good CRM? An honest look",
    metaTitle: "Is GoHighLevel a Good CRM? Strengths, Limits and Setup",
    description:
      "Is GoHighLevel a good CRM? What its contacts, pipelines and custom objects do well, where it falls short, who it suits, and how to set it up properly.",
    summary: "What the GoHighLevel CRM does well, where it falls short, who it suits compared with a dedicated sales CRM, and how to set it up and import data.",
    published: "2026-11-05",
    updated: "2026-11-05",
    ctaLine: "Want your CRM set up right the first time? We'll map your fields, pipelines and imports with you on a free 30-minute call.",
    faqs: [
      { q: "Is GoHighLevel a CRM?", a: "Yes. GoHighLevel includes a full CRM with contacts, companies, opportunities in pipelines, custom fields and custom objects. The same contact record also drives its inbox, calendars, forms and workflows." },
      { q: "Can I import my HubSpot data into GoHighLevel?", a: "Yes. HighLevel has a direct HubSpot importer for contacts, companies, deals, custom properties, pipelines, stages, notes, tasks and emails. Emails arrive read-only, and deals without a contact cannot be imported." },
      { q: "Does GoHighLevel have custom objects?", a: "Yes. HighLevel says every plan, Starter, Unlimited and Pro, can create up to 10 custom objects per sub-account, with up to 300,000 records per object." },
      { q: "How do I stop duplicate contacts in GoHighLevel?", a: "Set Contact Deduplication Preferences in Settings > Business Profile to match on email, phone or both. To clean up existing duplicates, use Manage Duplicates in Contacts, which merges up to 10 records at a time. Merges cannot be undone." },
    ],
    related: [
      { href: "/services/ghl-setup", label: "GHL account setup" },
      { href: "/services/migrations/hubspot-to-ghl", label: "HubSpot to GHL migration" },
      { href: "/guides/is-gohighlevel-worth-it", label: "Is GoHighLevel worth it? An honest review" },
      { href: "/guides/how-to-set-up-gohighlevel", label: "How to set up GoHighLevel: a beginner's checklist" },
      { href: "/glossary/opportunity-pipeline", label: "Opportunities and pipelines in GHL" },
    ],
  },
  {
    slug: "gohighlevel-saas-mode",
    title: "GoHighLevel SaaS mode explained: what it is and how to set it up",
    metaTitle: "GoHighLevel SaaS Mode Explained: Plans, Setup, Rebilling",
    description:
      "What GoHighLevel SaaS mode is, which plan includes it, what to set up first, how to create plans in the SaaS Configurator and how rebilling works.",
    summary: "What GHL SaaS mode does, the $497 plan it needs, the setup steps in the SaaS Configurator, what happens at sign-up and how rebilling works.",
    published: "2026-11-09",
    updated: "2026-11-09",
    ctaLine: "Planning to sell GoHighLevel under your own brand? We'll set up SaaS mode with you. The first 30-minute call is free.",
    faqs: [
      { q: "Which GoHighLevel plan includes SaaS mode?", a: "The $497 plan. It is the only plan that can rebill phone, email and AI usage with a markup. The $297 Unlimited plan can rebill phone and email to clients at cost, without a markup." },
      { q: "Does GoHighLevel SaaS mode work with PayPal?", a: "No, not for Stripe-based SaaS plans. HighLevel says only Stripe works for SaaS products, and a purchase made through PayPal does not create a sub-account. SaaS V2 plans use the payment providers connected to your agency sub-account." },
      { q: "How many SaaS plans can I create in GoHighLevel?", a: "HighLevel's SaaS mode setup guide says you can create up to 20 SaaS plans per agency account. Plans can be grouped into categories that set the upgrade and downgrade paths." },
      { q: "Can I put an existing client on a SaaS plan?", a: "Yes. In Agency View, go to Sub-Accounts, open Manage Client, then SaaS and Add a SaaS Subscription. You can set a special price for that client." },
    ],
    related: [
      { href: "/services/saas-white-label", label: "SaaS mode and white-label setup" },
      { href: "/glossary/saas-mode", label: "What is SaaS mode?" },
      { href: "/guides/how-much-does-gohighlevel-cost", label: "How much does GoHighLevel cost per month?" },
      { href: "/guides/gohighlevel-snapshots", label: "GoHighLevel snapshots: what they are and how to import one" },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
