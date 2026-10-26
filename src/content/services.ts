// Service page content. Copy rules: answer first, "we" voice, no invented numbers or names.
// Unknown facts stay as [[TODO: ...]] and are listed in TODO.md.

export type QA = { q: string; a: string };
export type Fragment = "workflow" | "email" | "pipeline" | "calendar" | "saas" | "integrations" | "setup" | "funnel";

export type Service = {
  slug: string;
  path: string;
  name: string; // short label for nav and cards
  symptom: string; // the problem in the customer's words, used by the symptom finder
  h1: string;
  metaTitle: string; // <= 60 chars incl. brand suffix added by layout? No: full title, no suffix added.
  metaDescription: string; // <= 155 chars
  answer: string; // 40-60 words: what it is and who it is for
  fragment: Fragment;
  problems: string[];
  included: { title: string; body: string }[];
  process: { stage: string; body: string }[];
  timeline: string;
  questions: QA[]; // questions to ask before hiring, answered from our side
  faqs: QA[];
  moves?: { item: string; how: string }[]; // migrations only
  relatedGuides: string[];
  related: string[];
  parent?: string;
};

const commonProcess = (build: string): Service["process"] => [
  { stage: "Call", body: "A free 30-minute call. You show us the account and the goal, and we ask the questions that decide the scope." },
  { stage: "Scoped quote", body: "You get a written scope: what we will change, what we will not touch, the price and the order of work." },
  { stage: build, body: "We work inside your account with the access you grant, and we test every change against real contacts and test data." },
  { stage: "Handover", body: "We walk you through what changed and leave written notes, so your team can run and edit it without us." },
];

export const services: Service[] = [
  {
    slug: "ghl-fixes",
    path: "/services/ghl-fixes",
    name: "GHL fixes",
    symptom: "Something in GHL is broken",
    h1: "GoHighLevel fixes and troubleshooting",
    metaTitle: "GoHighLevel Fixes & Troubleshooting | FixGHL",
    metaDescription:
      "Workflows not firing, emails in spam, bookings missed? FixGHL finds the cause in your GoHighLevel account and fixes it. Book a free 30-minute call.",
    answer:
      "GHL fixes is our troubleshooting service for GoHighLevel accounts that have stopped doing what they should. We find the cause of broken workflows, missed bookings, email deliverability problems and failed integrations, fix it at the source, and document what changed. It suits coaches, agencies and local businesses already running on GHL.",
    fragment: "workflow",
    problems: [
      "A workflow that worked last month now enrols nobody, or enrols the same contact twice.",
      "Emails reach Promotions or spam, or stop sending after a domain change.",
      "Calendar bookings come in, but confirmations and reminders never go out.",
      "Leads from a form, Facebook lead ad or website never appear as contacts or opportunities.",
      "A Stripe, Zapier or webhook connection fails without telling anyone.",
      "Nobody on the team knows which workflows are still in use.",
    ],
    included: [
      { title: "Diagnosis in your account", body: "We trace the problem from the trigger to the last action, using execution logs, contact history and test contacts, until we can show you the cause." },
      { title: "The fix, done at the source", body: "We correct the trigger, filter, field mapping, DNS record or integration that caused it, rather than adding another workflow on top." },
      { title: "A regression check", body: "We test the paths around the fix so the change does not break a neighbouring automation." },
      { title: "Written notes", body: "A short record of what was wrong, what we changed and how to spot it next time." },
    ],
    process: commonProcess("Fix and test"),
    timeline: "[[TODO: typical turnaround for a single fix]]",
    questions: [
      { q: "Will you need full access to my account?", a: "We ask for the narrowest access that lets us do the work, usually a user on the affected sub-account. We list exactly what we need in the quote." },
      { q: "Do you fix the cause or patch the symptom?", a: "We fix the cause. If the right fix is a rebuild, we say so in the quote and explain why before doing anything." },
      { q: "What happens if the fix breaks something else?", a: "We test the surrounding workflows before handover, and anything we changed is written down so it can be traced." },
    ],
    faqs: [
      { q: "Can you fix a GoHighLevel workflow that is not triggering?", a: "Yes. Most cases come down to the workflow being in draft, a trigger filter that no contact can meet, re-entry settings, or the wrong trigger type. We check each one in your account and fix the cause." },
      { q: "Do you fix GHL email deliverability?", a: "Yes. We check the sending domain, SPF, DKIM and DMARC records, list hygiene and sending patterns, then fix what is wrong and set up a sensible warm-up." },
      { q: "How quickly can you start?", a: "[[TODO: typical start time for urgent fixes]]" },
      { q: "What does a fix cost?", a: "Fixes are quoted after a free 30-minute call, once we have seen the account. The quote is fixed for the agreed scope." },
    ],
    relatedGuides: ["ghl-workflow-not-triggering", "ghl-emails-going-to-spam"],
    related: ["automation", "integrations", "ghl-setup"],
  },
  {
    slug: "ghl-setup",
    path: "/services/ghl-setup",
    name: "GHL setup",
    symptom: "Starting on GHL and want it set up right",
    h1: "GoHighLevel account setup and onboarding",
    metaTitle: "GoHighLevel Setup & Onboarding Service | FixGHL",
    metaDescription:
      "A GoHighLevel account built properly from day one: domains, email, calendars, pipelines, forms and core workflows. Book a free 30-minute call with FixGHL.",
    answer:
      "GHL setup is our service for getting a new GoHighLevel account built properly from the first day. We connect your domains and email, set up calendars, pipelines, forms and the core workflows, and hand it over with notes. It suits coaches and local businesses starting on GHL and agencies onboarding a new client.",
    fragment: "setup",
    problems: [
      "You signed up for GHL and the number of settings is slowing you down.",
      "Your team is still running leads out of a spreadsheet and an inbox.",
      "You need the account live before a launch or an ad campaign starts.",
      "You want the account built so it can become a snapshot for future clients.",
    ],
    included: [
      { title: "Domains and email", body: "Your website and funnel domains connected, and a dedicated email sending domain with SPF and DKIM, plus a DMARC record." },
      { title: "Calendars and booking", body: "Calendars with availability, buffers, confirmations and reminders by SMS and email." },
      { title: "Pipelines and contacts", body: "A pipeline that matches how you sell, with custom fields, tags and import of your existing contacts." },
      { title: "Core workflows", body: "Lead capture, speed-to-lead follow-up, booking reminders and no-show recovery, built and tested." },
    ],
    process: commonProcess("Build"),
    timeline: "[[TODO: typical timeline for a standard setup]]",
    questions: [
      { q: "Who owns the account after setup?", a: "You do. We build inside your account and hand over full control at the end." },
      { q: "Will the setup work as a snapshot later?", a: "If you ask for it, we build with custom values and clean naming so the account can be saved as a snapshot and reused." },
      { q: "What do you need from me before you start?", a: "Access to your domain's DNS, your brand details, the offers you sell and your existing contact list. We send the full list with the quote." },
    ],
    faqs: [
      { q: "What is included in a GoHighLevel setup?", a: "Domains, email authentication, calendars, a pipeline, forms, contact import and the core follow-up workflows. The exact scope is written into your quote." },
      { q: "Can you set up GHL for an agency client?", a: "Yes. We can build inside a client sub-account under your agency, following your naming and snapshot conventions." },
      { q: "Do I need to buy GoHighLevel first?", a: "You need an active GHL account. If you do not have one yet, our trial page explains the options." },
    ],
    relatedGuides: ["ghl-emails-going-to-spam", "ghl-workflow-not-triggering"],
    related: ["automation", "funnels-websites", "migrations"],
  },
  {
    slug: "migrations",
    path: "/services/migrations",
    name: "Migrations",
    symptom: "Moving to GHL from another platform",
    h1: "Migrations to GoHighLevel",
    metaTitle: "Migrate to GoHighLevel: ClickFunnels, Wix, Kajabi, HubSpot",
    metaDescription:
      "Move to GoHighLevel from ClickFunnels, Wix, Kajabi or HubSpot without losing contacts, pages or automations. Planned, tested and documented by FixGHL.",
    answer:
      "A migration to GoHighLevel moves your contacts, pages, funnels, automations and integrations from another platform into GHL. We plan what moves and what gets rebuilt, migrate in a set order, test before the switch, and keep the old system available until the new one is proven. We handle ClickFunnels, Wix, Kajabi and HubSpot.",
    fragment: "pipeline",
    problems: [
      "You are paying for three tools that GHL could replace, but the move feels risky.",
      "You tried importing contacts and the tags, custom fields or opt-in status did not come across.",
      "Your funnels are live and earning, so they cannot go down during the move.",
      "Automations from the old platform have no direct equivalent in GHL.",
    ],
    included: [
      { title: "A migration map", body: "Every asset listed with how it moves: imported, rebuilt or retired. You approve it before we start." },
      { title: "Contacts and data", body: "Contacts imported with custom fields, tags and source preserved, plus a migration tag on every record for checking." },
      { title: "Pages and funnels", body: "Pages imported where GHL supports it and rebuilt where it does not, matched to the original design and checked on mobile." },
      { title: "Automations and cut-over", body: "Sequences and automations rebuilt as GHL workflows, then a planned switch of domains and forms with a rollback path." },
    ],
    process: commonProcess("Migrate and test"),
    timeline: "[[TODO: typical migration timeline by size]]",
    questions: [
      { q: "What will not come across automatically?", a: "We tell you in the migration map before any work starts. Automations, email sequences and some page types usually need rebuilding." },
      { q: "Will my site go down during the move?", a: "We build and test in GHL while the old platform stays live, then switch domains in a planned window." },
      { q: "How do you check nothing was lost?", a: "We compare record counts and sample contacts between the two systems, and test every form and booking path before cut-over." },
    ],
    faqs: [
      { q: "Which platforms can you migrate to GoHighLevel?", a: "We migrate from ClickFunnels, Wix, Kajabi and HubSpot, and from other CRMs and funnel builders after a scoping call." },
      { q: "Can you migrate contacts without losing tags and custom fields?", a: "Yes. We create the custom fields in GHL first, map every column, and tag each import batch so it can be checked afterwards." },
      { q: "Do I need to cancel my old platform first?", a: "No. Keep it running until the new account is tested and live. We tell you when it is safe to cancel." },
    ],
    relatedGuides: ["migrate-clickfunnels-to-gohighlevel"],
    related: ["ghl-setup", "funnels-websites", "automation"],
  },
  {
    slug: "clickfunnels-to-ghl",
    path: "/services/migrations/clickfunnels-to-ghl",
    parent: "migrations",
    name: "ClickFunnels to GHL",
    symptom: "Moving from ClickFunnels",
    h1: "ClickFunnels to GoHighLevel migration",
    metaTitle: "ClickFunnels to GoHighLevel Migration | FixGHL",
    metaDescription:
      "Move funnels, contacts, products and email sequences from ClickFunnels to GoHighLevel with a tested plan and no downtime. Book a free 30-minute call.",
    answer:
      "A ClickFunnels to GoHighLevel migration moves your funnel pages, contacts, products and follow-up sequences into GHL. Some pages can be imported by URL; the rest, plus automations and checkout, are rebuilt. We plan each asset, keep ClickFunnels live during the build and switch domains once everything is tested.",
    fragment: "funnel",
    problems: [
      "Your ClickFunnels bill has grown and GHL would cover the CRM, email and calendar too.",
      "Your funnels use order bumps and upsells that need rebuilding with care.",
      "Email sequences live in ClickFunnels and would stop when the account closes.",
    ],
    included: [
      { title: "Funnel pages", body: "Pages imported with GHL's ClickFunnels importer where it works, rebuilt where it does not, and checked on mobile." },
      { title: "Checkout and products", body: "Products, order forms, bumps and upsells rebuilt with your Stripe account connected to GHL." },
      { title: "Contacts and sequences", body: "Contacts exported and imported with tags and fields mapped, and email sequences rebuilt as workflows." },
      { title: "Domain cut-over", body: "Your domain moved to GHL in a planned window, with redirects for any changed URLs." },
    ],
    moves: [
      { item: "Funnel pages", how: "Imported page by page by URL where supported, otherwise rebuilt [[VERIFY: importer support for ClickFunnels 2.0 pages]]" },
      { item: "Contacts", how: "CSV export and import with mapped fields and tags" },
      { item: "Products and checkout", how: "Rebuilt in GHL and connected to Stripe" },
      { item: "Email sequences and automations", how: "Rebuilt as GHL workflows" },
      { item: "Membership content", how: "Moved into GHL memberships, with member access re-created" },
    ],
    process: commonProcess("Migrate and test"),
    timeline: "[[TODO: typical ClickFunnels migration timeline]]",
    questions: [
      { q: "Can GHL import my ClickFunnels pages directly?", a: "GHL can import some pages by URL. Results vary by page and ClickFunnels version, so we test the import and rebuild pages that do not come across cleanly." },
      { q: "What happens to my order bumps and upsells?", a: "We rebuild them in GHL's order forms and one-click upsells, then run test purchases before going live." },
    ],
    faqs: [
      { q: "How long does a ClickFunnels to GHL migration take?", a: "It depends on the number of funnels, products and sequences. We give you a timeline in the scoped quote after the call." },
      { q: "Will I lose my ClickFunnels contacts?", a: "No. We export them with their tags and custom fields, import them into GHL and check counts and samples against the original." },
    ],
    relatedGuides: ["migrate-clickfunnels-to-gohighlevel"],
    related: ["migrations", "funnels-websites", "automation"],
  },
  {
    slug: "wix-to-ghl",
    path: "/services/migrations/wix-to-ghl",
    parent: "migrations",
    name: "Wix to GHL",
    symptom: "Moving from Wix",
    h1: "Wix to GoHighLevel migration",
    metaTitle: "Wix to GoHighLevel Migration | FixGHL",
    metaDescription:
      "Rebuild your Wix site in GoHighLevel with forms, bookings and contacts in the CRM, plus redirects that keep your search traffic. Free 30-minute call.",
    answer:
      "A Wix to GoHighLevel migration rebuilds your Wix website in GHL's site builder and connects every form and booking to the CRM. Wix pages cannot be imported directly, so we rebuild them, move your contacts, and set up 301 redirects so pages that rank in search keep their traffic.",
    fragment: "funnel",
    problems: [
      "Your Wix site collects leads, but they sit in a Wix inbox instead of your CRM.",
      "You run bookings in Wix and follow-up in another tool.",
      "You rank in Google for some pages and cannot afford to lose that traffic in the move.",
    ],
    included: [
      { title: "Site rebuild", body: "Your pages rebuilt in GHL, matched to the current design or refreshed, and checked on mobile." },
      { title: "Forms and bookings", body: "Every form and booking connected to GHL contacts, pipelines and workflows." },
      { title: "SEO preservation", body: "Page titles, descriptions and URLs carried over, with 301 redirects for anything that changes." },
      { title: "Contacts", body: "Wix contacts exported and imported with fields and tags mapped." },
    ],
    moves: [
      { item: "Pages", how: "Rebuilt in the GHL site builder" },
      { item: "Blog posts", how: "Moved into GHL blogs, with URLs redirected where they change" },
      { item: "Contacts", how: "CSV export and import with mapped fields" },
      { item: "Bookings", how: "Rebuilt as GHL calendars with reminders" },
      { item: "Search rankings", how: "Kept with matching metadata and 301 redirects" },
    ],
    process: commonProcess("Rebuild and test"),
    timeline: "[[TODO: typical Wix migration timeline]]",
    questions: [
      { q: "Will I lose my Google rankings?", a: "Rankings are protected by keeping URLs where possible, carrying over titles and descriptions, and redirecting every changed URL. We give you the redirect list." },
      { q: "Can my site look the same?", a: "Yes. We can match the current design, or refresh it during the rebuild if you prefer." },
    ],
    faqs: [
      { q: "Can GoHighLevel import a Wix website?", a: "No direct import exists, so we rebuild the pages in GHL. That also lets us connect every form to the CRM properly." },
      { q: "Do you move Wix blog posts?", a: "Yes. We move posts into GHL blogs and redirect old URLs where they change." },
    ],
    relatedGuides: ["ghl-workflow-not-triggering"],
    related: ["migrations", "funnels-websites", "ghl-setup"],
  },
  {
    slug: "kajabi-to-ghl",
    path: "/services/migrations/kajabi-to-ghl",
    parent: "migrations",
    name: "Kajabi to GHL",
    symptom: "Moving from Kajabi",
    h1: "Kajabi to GoHighLevel migration",
    metaTitle: "Kajabi to GoHighLevel Migration | FixGHL",
    metaDescription:
      "Move courses, members, offers and email sequences from Kajabi to GoHighLevel without locking students out. Planned and tested by FixGHL.",
    answer:
      "A Kajabi to GoHighLevel migration moves your courses, members, offers and email sequences into GHL memberships and workflows. We rebuild course structure, re-create member access so students keep what they paid for, connect payments, and switch over on a planned date with members told in advance.",
    fragment: "pipeline",
    problems: [
      "You run courses in Kajabi but your sales follow-up lives elsewhere.",
      "Moving students feels risky because they paid for access.",
      "Kajabi email sequences and pipelines need equivalents in GHL.",
    ],
    included: [
      { title: "Courses and memberships", body: "Course structure, lessons and media moved into GHL memberships." },
      { title: "Member access", body: "Members imported with the right offers granted, and a welcome email with new login steps." },
      { title: "Offers and payments", body: "Offers rebuilt with your payment provider connected, tested with real transactions." },
      { title: "Email and automations", body: "Sequences and automations rebuilt as GHL workflows." },
    ],
    moves: [
      { item: "Courses and lessons", how: "Rebuilt in GHL memberships, with video re-hosted or re-linked" },
      { item: "Members", how: "Imported with offer access granted" },
      { item: "Offers and checkout", how: "Rebuilt and connected to your payment provider" },
      { item: "Email sequences", how: "Rebuilt as GHL workflows" },
      { item: "Active subscriptions", how: "[[VERIFY: subscription transfer options depend on the payment provider]]" },
    ],
    process: commonProcess("Migrate and test"),
    timeline: "[[TODO: typical Kajabi migration timeline]]",
    questions: [
      { q: "Will my students lose access?", a: "No. We grant access in GHL before the switch and send members their new login steps on the date you choose." },
      { q: "What about recurring payments?", a: "That depends on your payment provider and how subscriptions were set up in Kajabi. We check it on the call and plan around it." },
    ],
    faqs: [
      { q: "Can GoHighLevel host online courses like Kajabi?", a: "Yes. GHL memberships support courses, lessons, drip content and member logins." },
      { q: "Do you move course videos?", a: "Yes. We re-host or re-link videos depending on where they are stored today." },
    ],
    relatedGuides: ["migrate-clickfunnels-to-gohighlevel"],
    related: ["migrations", "funnels-websites", "automation"],
  },
  {
    slug: "hubspot-to-ghl",
    path: "/services/migrations/hubspot-to-ghl",
    parent: "migrations",
    name: "HubSpot to GHL",
    symptom: "Moving from HubSpot",
    h1: "HubSpot to GoHighLevel migration",
    metaTitle: "HubSpot to GoHighLevel Migration | FixGHL",
    metaDescription:
      "Move contacts, deals, pipelines and sequences from HubSpot to GoHighLevel with properties mapped and history kept where possible. Free 30-minute call.",
    answer:
      "A HubSpot to GoHighLevel migration moves your contacts, companies, deals and pipelines into GHL, with HubSpot properties mapped to GHL custom fields. We rebuild sequences and workflows in GHL, re-create your pipeline stages, and run both systems side by side until your team is working fully in GHL.",
    fragment: "pipeline",
    problems: [
      "HubSpot pricing has grown with your contact count.",
      "Your team uses a fraction of HubSpot but pays for the tier.",
      "Deals and pipeline stages need to come across without losing their position.",
    ],
    included: [
      { title: "Property mapping", body: "Every HubSpot property you use mapped to a GHL custom field, created before import." },
      { title: "Contacts, companies and deals", body: "Records imported with owners, stages and values, checked against the HubSpot export." },
      { title: "Pipelines", body: "Deal pipelines and stages re-created as GHL pipelines and opportunities." },
      { title: "Sequences and workflows", body: "HubSpot workflows and sequences rebuilt as GHL workflows." },
    ],
    moves: [
      { item: "Contacts and properties", how: "Exported and imported with fields mapped" },
      { item: "Deals", how: "Imported as GHL opportunities in matching stages" },
      { item: "Companies", how: "Mapped to GHL companies or contact fields" },
      { item: "Workflows and sequences", how: "Rebuilt as GHL workflows" },
      { item: "Activity history", how: "[[VERIFY: which HubSpot activity types can be carried into GHL notes]]" },
    ],
    process: commonProcess("Migrate and test"),
    timeline: "[[TODO: typical HubSpot migration timeline]]",
    questions: [
      { q: "Can deal history come across?", a: "Deal stages and values come across. Older activity history is handled case by case; we tell you what is possible before we start." },
      { q: "Will my team need training?", a: "Handover includes a walkthrough of the new pipelines and a written guide for daily use." },
    ],
    faqs: [
      { q: "Is GoHighLevel a replacement for HubSpot?", a: "For many small teams, yes: GHL covers CRM, pipelines, email, SMS, calendars and funnels. Teams that depend on HubSpot's reporting or enterprise features should check fit first." },
      { q: "Do you migrate HubSpot deals?", a: "Yes. Deals become GHL opportunities in matching pipeline stages." },
    ],
    relatedGuides: ["ghl-workflow-not-triggering"],
    related: ["migrations", "automation", "integrations"],
  },
  {
    slug: "automation",
    path: "/services/automation",
    name: "Workflows & automation",
    symptom: "Follow-up and workflows that run on their own",
    h1: "GoHighLevel workflows and automation",
    metaTitle: "GoHighLevel Workflow Automation Service | FixGHL",
    metaDescription:
      "Lead follow-up, booking reminders, no-show recovery and pipeline automation built in GoHighLevel workflows, tested and documented. Free 30-minute call.",
    answer:
      "GHL automation is our service for designing and building GoHighLevel workflows that follow up with leads, confirm and remind bookings, recover no-shows and move opportunities through your pipeline. We map the logic with you first, build it with clean naming, and test every branch with real contacts before it goes live.",
    fragment: "workflow",
    problems: [
      "New leads wait hours for a reply because follow-up is manual.",
      "Booked calls do not show up, and nobody follows up with them.",
      "Workflows have grown into a tangle that nobody wants to touch.",
      "Opportunities sit in the wrong stage because moves are manual.",
    ],
    included: [
      { title: "Logic mapping", body: "Each automation written out as trigger, conditions and actions before we build, so you approve what it will do." },
      { title: "Workflow build", body: "Workflows built with clear names, folders and notes, using If/Else, waits and goal events where they fit." },
      { title: "Testing", body: "Every branch tested with test contacts, including the edge cases: missing phone, duplicate contact, reschedules." },
      { title: "Clean-up", body: "Old or duplicate workflows found, documented and retired, if you want the account tidied." },
    ],
    process: commonProcess("Build and test"),
    timeline: "[[TODO: typical automation project timeline]]",
    questions: [
      { q: "Will I be able to edit the workflows myself?", a: "Yes. We name and document every workflow so your team can change copy, timings and branches safely." },
      { q: "Do you use AI features?", a: "Where they fit. We can set up Conversation AI for replies and qualification, with guardrails and a handoff to a person." },
    ],
    faqs: [
      { q: "What can GoHighLevel workflows automate?", a: "Lead follow-up by SMS and email, booking confirmations and reminders, pipeline moves, task creation, tagging, internal notifications and webhooks to other tools." },
      { q: "Can you clean up an existing mess of workflows?", a: "Yes. We audit what is running, find duplicates and conflicts, and consolidate them into a smaller set that is documented." },
    ],
    relatedGuides: ["ghl-workflow-not-triggering"],
    related: ["ghl-fixes", "integrations", "ghl-setup"],
  },
  {
    slug: "funnels-websites",
    path: "/services/funnels-websites",
    name: "Funnels & websites",
    symptom: "A funnel or website built in GHL",
    h1: "Funnels and websites in GoHighLevel",
    metaTitle: "GoHighLevel Funnels & Website Builds | FixGHL",
    metaDescription:
      "Fast, mobile-first funnels and websites built in GoHighLevel, connected to your CRM, calendar and payments from the first form. Free 30-minute call.",
    answer:
      "Our funnels and websites service builds sales funnels, landing pages and full websites inside GoHighLevel. Every page is designed for phones first, loads quickly, and connects to your CRM so each form, booking and purchase creates a contact and starts the right workflow.",
    fragment: "funnel",
    problems: [
      "Your funnel looks fine on desktop and breaks on a phone.",
      "Form submissions do not create contacts or trigger follow-up.",
      "Pages load slowly because of oversized images and scripts.",
      "Your checkout is on a separate tool from your CRM.",
    ],
    included: [
      { title: "Page design and build", body: "Pages designed for phones first and built in the GHL funnel or website builder." },
      { title: "CRM connection", body: "Every form, survey, calendar and order form mapped to contacts, tags and workflows." },
      { title: "Checkout", body: "Order forms, bumps and upsells connected to your payment provider and tested." },
      { title: "Speed and tracking", body: "Compressed images, minimal scripts, and analytics events on the actions that matter." },
    ],
    process: commonProcess("Design and build"),
    timeline: "[[TODO: typical funnel build timeline]]",
    questions: [
      { q: "Do you write the copy?", a: "We can write it or work from yours. The quote states which." },
      { q: "Will the pages be fast on mobile?", a: "We build for phones first and check every page on a phone before handover." },
    ],
    faqs: [
      { q: "Is GoHighLevel good for websites, or only funnels?", a: "GHL has both a funnel builder and a website builder with blogs. For most service businesses, it can host the whole site." },
      { q: "Can you connect my funnel to Stripe?", a: "Yes. We connect Stripe to GHL and test the checkout with real transactions before launch." },
    ],
    relatedGuides: ["migrate-clickfunnels-to-gohighlevel"],
    related: ["ghl-setup", "migrations", "integrations"],
  },
  {
    slug: "saas-white-label",
    path: "/services/saas-white-label",
    name: "SaaS mode & white-label",
    symptom: "Reselling GHL under your own brand",
    h1: "GoHighLevel SaaS mode and white-label setup",
    metaTitle: "GoHighLevel SaaS Mode & White-Label Setup | FixGHL",
    metaDescription:
      "Set up GoHighLevel SaaS mode: plans, Stripe rebilling, snapshots, a white-label app domain and client onboarding. Built by FixGHL. Free 30-minute call.",
    answer:
      "SaaS mode lets a GoHighLevel agency sell sub-accounts under its own brand, with plans, pricing and Stripe billing handled automatically. We configure SaaS plans and rebilling, build the snapshot each plan loads, white-label the app domain and set up the onboarding a new client goes through.",
    fragment: "saas",
    problems: [
      "You are on the Agency Pro plan but SaaS mode is still switched off.",
      "Plans, trials and rebilling settings are confusing to set up.",
      "New clients get an empty sub-account instead of a ready-built one.",
      "Your clients see the HighLevel brand where you want yours.",
    ],
    included: [
      { title: "SaaS configuration", body: "Plans, prices, trials and feature access set up and connected to your Stripe account." },
      { title: "Rebilling", body: "Phone, email and AI usage rebilling configured with the markup you choose." },
      { title: "Snapshots", body: "The snapshot each plan loads, built with custom values so it adapts to every client." },
      { title: "White-label and onboarding", body: "Your app domain and branding, plus the signup flow and welcome workflow for new clients." },
    ],
    process: commonProcess("Configure and test"),
    timeline: "[[TODO: typical SaaS setup timeline]]",
    questions: [
      { q: "Which GHL plan do I need for SaaS mode?", a: "SaaS mode is part of the Agency Pro plan as of October 2026. [[VERIFY: confirm on HighLevel's official pricing page]]" },
      { q: "Will you build the snapshot too?", a: "Yes, if you want one. A SaaS plan works best when every new sub-account starts with a working build." },
    ],
    faqs: [
      { q: "What is GoHighLevel SaaS mode?", a: "SaaS mode lets an agency sell GHL sub-accounts as its own software, with plans, Stripe billing and usage rebilling managed inside GHL." },
      { q: "Can my clients see that it is GoHighLevel?", a: "With white-labelling, clients log in on your domain with your branding. Some system emails and links may still need configuring." },
    ],
    relatedGuides: ["ghl-emails-going-to-spam"],
    related: ["ghl-setup", "automation", "integrations"],
  },
  {
    slug: "integrations",
    path: "/services/integrations",
    name: "Integrations",
    symptom: "GHL connected to the rest of your tools",
    h1: "GoHighLevel integrations",
    metaTitle: "GoHighLevel Integrations: Stripe, Zapier, Make, n8n | FixGHL",
    metaDescription:
      "Connect GoHighLevel to Stripe, Zapier, Make, n8n, ManyChat and custom APIs with tested, logged webhooks. Book a free 30-minute call with FixGHL.",
    answer:
      "Our integrations service connects GoHighLevel to the rest of your stack: Stripe, Zapier, Make, n8n, ManyChat, webhooks and custom APIs. We choose the simplest reliable connection, map the data both ways, add error handling so failures are visible, and document every connection.",
    fragment: "integrations",
    problems: [
      "Payments in Stripe do not update the contact or opportunity in GHL.",
      "A Zapier or Make scenario fails silently and leads go missing.",
      "ManyChat leads never reach your GHL pipeline.",
      "You need data from GHL in another system through the API.",
    ],
    included: [
      { title: "Connection design", body: "The simplest reliable route for each connection: native integration, webhook, automation platform or API." },
      { title: "Field mapping", body: "Data mapped field by field, with duplicate handling and a test record for each path." },
      { title: "Error handling", body: "Failures logged and alerted, so a broken connection gets noticed the same day." },
      { title: "Documentation", body: "Each connection written up: what triggers it, what it sends and where to check it." },
    ],
    process: commonProcess("Connect and test"),
    timeline: "[[TODO: typical integration timeline]]",
    questions: [
      { q: "Should I use Zapier, Make or n8n?", a: "It depends on volume, budget and who maintains it. We recommend one on the call and explain the trade-off." },
      { q: "Can you build against the GHL API directly?", a: "Yes, when a native integration or webhook is not enough." },
    ],
    faqs: [
      { q: "Can GoHighLevel connect to Stripe?", a: "Yes. GHL has a native Stripe integration for payments, and we can add webhooks for events it does not cover." },
      { q: "Does GoHighLevel work with ManyChat?", a: "Yes, through webhooks or an automation platform. We map ManyChat subscribers to GHL contacts and tags." },
    ],
    relatedGuides: ["ghl-workflow-not-triggering"],
    related: ["automation", "ghl-fixes", "saas-white-label"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
export const topServices = services.filter((s) => !s.parent);
export const migrationServices = services.filter((s) => s.parent === "migrations");
