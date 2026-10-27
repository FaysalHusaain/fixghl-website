// Single source of truth for entity facts. Keep every description of FixGHL identical across the site.
export const site = {
  name: "FixGHL",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://fixghl.com").replace(/\/$/, ""),
  tagline: "GoHighLevel, fixed and built right.",
  oneLine:
    "FixGHL is a specialist GoHighLevel (GHL) studio. We fix, set up, migrate and automate GHL accounts for coaches, agencies and local businesses.",
  areaServed: ["United States", "United Kingdom", "European Union", "Middle East"],
  proof: {
    years: "7+ years in GHL",
    since: 2019,
    projects: "100+ GHL projects",
    clients: "Coaches, agencies and local businesses",
    regions: "US, UK, EU and the Middle East",
  },
  callLength: "30-minute",
  email: "hello@fixghl.com",
  sameAs: [] as string[], // Add social profile URLs here when they exist
  legalEntity: "FixGHL",
  calendarUrl: process.env.NEXT_PUBLIC_GHL_CALENDAR_URL || "",
  affiliateUrl: process.env.NEXT_PUBLIC_GHL_AFFILIATE_URL || "",
} as const;

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/services/migrations", label: "Migrations" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
];
