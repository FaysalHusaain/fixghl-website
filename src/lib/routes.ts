// Registry of every indexable URL. Feeds sitemap.xml, llms.txt and OG images.
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { comparisons } from "@/content/compare";
import { terms } from "@/content/glossary";

export type RouteEntry = { path: string; title: string; description: string; updated?: string; section: string };

export const staticPages: RouteEntry[] = [
  { path: "/", section: "Home", title: "GoHighLevel, fixed and built right.", description: "Specialist GoHighLevel studio for fixes, setups, migrations and automations." },
  { path: "/services", section: "Services", title: "GoHighLevel services", description: "Every GHL service we offer, from fixes to SaaS mode." },
  { path: "/how-it-works", section: "Studio", title: "How we work", description: "From a 30-minute call to a documented handover." },
  { path: "/pricing", section: "Studio", title: "Pricing", description: "How we price GoHighLevel work." },
  { path: "/about", section: "Studio", title: "About FixGHL", description: "A specialist studio that works only on GoHighLevel." },
  { path: "/faq", section: "Studio", title: "Frequently asked questions", description: "Answers about working with FixGHL." },
  { path: "/guides", section: "Guides", title: "GoHighLevel guides", description: "Fixes and how-tos for GHL." },
  { path: "/compare", section: "Compare", title: "GoHighLevel comparisons", description: "GHL compared with the platforms people move from." },
  { path: "/glossary", section: "Glossary", title: "GoHighLevel glossary", description: "GHL terms, defined plainly." },
  { path: "/book", section: "Book", title: "Book a free 30-minute GHL call", description: "Book a call or send us the details." },
  { path: "/try-ghl", section: "Studio", title: "Try GoHighLevel", description: "Start a GoHighLevel trial." },
  { path: "/privacy", section: "Legal", title: "Privacy policy", description: "How FixGHL handles personal data." },
  { path: "/terms", section: "Legal", title: "Terms of service", description: "Terms for using this site and our services." },
  { path: "/affiliate-disclosure", section: "Legal", title: "Affiliate disclosure", description: "How our GoHighLevel affiliate link works." },
];

export const allRoutes = (): RouteEntry[] => [
  ...staticPages,
  ...services.map((s) => ({ path: s.path, section: "Services", title: s.h1, description: s.metaDescription })),
  ...guides.map((g) => ({ path: `/guides/${g.slug}`, section: "Guide", title: g.title, description: g.description, updated: g.updated })),
  ...comparisons.map((c) => ({ path: `/compare/${c.slug}`, section: "Comparison", title: c.title, description: c.description, updated: c.updated })),
  ...terms.map((t) => ({ path: `/glossary/${t.slug}`, section: "Glossary", title: `${t.term} in GoHighLevel`, description: t.description, updated: t.updated })),
];

export const routeByPath = (path: string) => allRoutes().find((r) => r.path === path);
