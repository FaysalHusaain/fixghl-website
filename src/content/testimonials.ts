// Client reviews from Fiverr orders, supplied by the studio. Quotes are verbatim except where marked:
// [square brackets] replace the name of the person who did the work (brand rule: no individuals named), and "…" marks a cut.
// Each is a five-star review. Do not add reviews without the original source.

export type Testimonial = {
  id: string;
  quote: string;
  reviewer: string; // public Fiverr username
  country: string;
  client: string; // what the client does, as described by the studio
  project: string;
  duration: string; // delivery time shown on the review
  services: string[]; // service slugs where this quote is most relevant
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "colt-ghl-funnel",
    quote:
      "I recently hired [FixGHL] to create a funnel for me on GoHighLevel, and I couldn't be happier with the results. [The] expertise in design, CSS, and JavaScript truly impressed me, and the funnel [FixGHL] delivered exceeded my expectations in every way.",
    reviewer: "coltblumenthalm",
    country: "United States",
    client: "Music producer and creator",
    project: "GoHighLevel funnel",
    duration: "7 days",
    services: ["funnels-websites", "ghl-setup"],
    featured: true,
  },
  {
    id: "kerry-wix-migration",
    quote: "Professional, great communication and very proactive. Definitely recommend.",
    reviewer: "kerrycwc",
    country: "United Kingdom",
    client: "Coach selling courses online and in person",
    project: "Wix to GoHighLevel migration",
    duration: "2 weeks",
    services: ["wix-to-ghl", "migrations", "ghl-setup"],
  },
  {
    id: "matty-website",
    quote:
      "Working with [FixGHL] was an outstanding experience! … [The] dedication truly exceeded expectations, even overcoming miscommunications to deliver an impeccable website.",
    reviewer: "imattywhite",
    country: "Australia",
    client: "Coach selling high-ticket offers",
    project: "Website build",
    duration: "4 days",
    services: ["funnels-websites"],
  },
  {
    id: "colt-advanced-funnel",
    quote:
      "[FixGHL] did a really really really good job and made my funnel super insanely good! [FixGHL is] super easy to get a hold of and to communicate with and always goes above and beyond to help you. I super recommend [FixGHL] if you are building an advanced funnel.",
    reviewer: "coltblumenthalm",
    country: "United States",
    client: "Music producer and creator",
    project: "Advanced funnel",
    duration: "12 days",
    services: ["funnels-websites", "automation"],
  },
  {
    id: "matty-website-2",
    quote:
      "An outstanding job in website development, showcasing remarkable attention to details and surpassing all expectations. … Really good work, better than expected. Highly recommend!",
    reviewer: "imattywhite",
    country: "Australia",
    client: "Coach selling high-ticket offers",
    project: "Website development",
    duration: "11 days",
    services: ["funnels-websites"],
  },
];

export const testimonialFor = (slug: string) => testimonials.find((t) => t.services.includes(slug));
