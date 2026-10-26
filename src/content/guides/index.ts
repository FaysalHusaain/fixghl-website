import type { ArticleMeta } from "../types";

export const guides: ArticleMeta[] = [
  {
    slug: "ghl-workflow-not-triggering",
    title: "GoHighLevel workflow not triggering: how to fix it",
    metaTitle: "GoHighLevel Workflow Not Triggering? How to Fix It",
    description:
      "Why a GoHighLevel workflow stops triggering and how to fix it: draft status, trigger filters, re-entry, wrong trigger type and how to read execution logs.",
    summary: "A step-by-step check for GHL workflows that enrol nobody, enrol the wrong contacts or stop part way.",
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
      { q: "Does GoHighLevel set up DMARC for me?", a: "GHL's dedicated sending domain setup covers the SPF and DKIM records. A DMARC record is published separately at _dmarc on your domain. [[VERIFY: current GHL setup screens]]" },
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
      { q: "Can I import ClickFunnels funnels into GoHighLevel?", a: "GHL can import ClickFunnels pages by URL, one page at a time. Results vary, and some pages need rebuilding. [[VERIFY: importer support for ClickFunnels 2.0]]" },
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
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
