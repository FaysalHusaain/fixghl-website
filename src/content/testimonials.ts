// Client reviews supplied by the studio, with permission to name clients.
// Every quote is a verbatim sentence or clause from a five-star review, chosen so that no studio member is named.
// Do not add reviews without the original source.

export type Testimonial = {
  id: string;
  quote: string;
  name: string; // client name as approved by the studio
  role?: string; // what the client does
  reviewer: string; // public Fiverr username, kept for reference
  country: string;
  project: string;
  duration: string; // delivery time shown on the review
  services: string[]; // service slugs where this quote is most relevant
};

export const testimonials: Testimonial[] = [
  {
    id: "colt-ghl-funnel",
    quote: "The funnel he delivered exceeded my expectations in every way.",
    name: "Colt Blumenthal",
    role: "Multi-platinum mix engineer",
    reviewer: "coltblumenthalm",
    country: "United States",
    project: "GoHighLevel funnel",
    duration: "7 days",
    services: ["funnels-websites"],
  },
  {
    id: "kerry-wix-migration",
    quote: "Professional, great communication and very proactive. Definitely recommend.",
    name: "Kerry Moore",
    role: "Founder, Cambridgeshire Wellness Clinic",
    reviewer: "kerrycwc",
    country: "United Kingdom",
    project: "Wix to GHL migration",
    duration: "2 weeks",
    services: ["wix-to-ghl", "ghl-setup", "kajabi-to-ghl"],
  },
  {
    id: "eric-cf-migration",
    quote: "This is my second job I had him do and again he exceeded my expectations.",
    name: "Eric Thompson",
    role: "Solar business owner",
    reviewer: "ericthompson578",
    country: "United States",
    project: "GHL migration and AI bot",
    duration: "10 days",
    services: ["migrations", "clickfunnels-to-ghl", "hubspot-to-ghl"],
  },
  {
    id: "chris-team",
    quote: "Great team to work with. Will use again.",
    name: "Dr. Chris Simon",
    role: "Cybersecurity professor",
    reviewer: "cbs007",
    country: "United States",
    project: "Funnels and automation",
    duration: "2 weeks",
    services: ["automation", "ghl-fixes"],
  },
  {
    id: "matthew-website",
    quote: "Really good work, better than expected.",
    name: "Matthew White",
    role: "High-ticket coach",
    reviewer: "imattywhite",
    country: "Australia",
    project: "Website development",
    duration: "11 days",
    services: [],
  },
  {
    id: "landpro-funnel",
    quote: "The funnel was delivered on time and with meticulous attention to detail.",
    name: "Tanner Tinsley",
    role: "Founder, LandproConnect",
    reviewer: "landproconnect",
    country: "United States",
    project: "Funnel build",
    duration: "1 day",
    services: [],
  },
  {
    id: "colt-advanced-funnel",
    quote: "I super recommend him if you are building an advanced funnel.",
    name: "Colt Blumenthal",
    role: "Multi-platinum mix engineer",
    reviewer: "coltblumenthalm",
    country: "United States",
    project: "Advanced funnel",
    duration: "12 days",
    services: [],
  },
];

export const testimonialFor = (slug: string) => testimonials.find((t) => t.services.includes(slug));
