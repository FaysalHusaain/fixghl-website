// Client reviews from Fiverr orders, supplied by the studio. Every quote is a verbatim sentence or clause from a
// five-star review, chosen so that no individual is named (brand rule). Do not add reviews without the original source.

export type Testimonial = {
  id: string;
  quote: string;
  reviewer: string; // public Fiverr username
  country: string;
  client?: string; // what the client does, as described by the studio
  project: string;
  duration: string; // delivery time shown on the review
  services: string[]; // service slugs where this quote is most relevant
};

export const testimonials: Testimonial[] = [
  {
    id: "colt-ghl-funnel",
    quote: "The funnel he delivered exceeded my expectations in every way.",
    reviewer: "coltblumenthalm",
    country: "United States",
    client: "Music producer",
    project: "GoHighLevel funnel",
    duration: "7 days",
    services: ["funnels-websites"],
  },
  {
    id: "kerry-wix-migration",
    quote: "Professional, great communication and very proactive. Definitely recommend.",
    reviewer: "kerrycwc",
    country: "United Kingdom",
    client: "Course creator",
    project: "Wix to GHL migration",
    duration: "2 weeks",
    services: ["wix-to-ghl", "ghl-setup", "kajabi-to-ghl"],
  },
  {
    id: "eric-cf-migration",
    quote: "This is my second job I had him do and again he exceeded my expectations.",
    reviewer: "ericthompson578",
    country: "United States",
    client: "Solar business",
    project: "GHL migration and AI bot",
    duration: "10 days",
    services: ["migrations", "clickfunnels-to-ghl", "hubspot-to-ghl"],
  },
  {
    id: "landpro-funnel",
    quote: "The funnel was delivered on time and with meticulous attention to detail.",
    reviewer: "landproconnect",
    country: "United States",
    project: "Funnel build",
    duration: "1 day",
    services: [],
  },
  {
    id: "cbs-team",
    quote: "Great team to work with. Will use again.",
    reviewer: "cbs007",
    country: "United States",
    client: "Cybersecurity educator",
    project: "Funnels and automation",
    duration: "2 weeks",
    services: ["automation", "ghl-fixes"],
  },
  {
    id: "matty-website",
    quote: "Really good work, better than expected.",
    reviewer: "imattywhite",
    country: "Australia",
    client: "High-ticket coach",
    project: "Website build",
    duration: "11 days",
    services: [],
  },
];

export const testimonialFor = (slug: string) => testimonials.find((t) => t.services.includes(slug));
