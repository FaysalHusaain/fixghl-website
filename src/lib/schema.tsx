// JSON-LD builders. Organization is the only author and publisher: no individuals anywhere.
import { site, absoluteUrl } from "./site";
import type { QA } from "@/content/services";

const orgId = `${site.url}/#organization`;
const webId = `${site.url}/#website`;

export const organization = () => ({
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 512, height: 512 },
  description: site.oneLine,
  email: site.email,
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: site.email, availableLanguage: ["English"] },
  foundingDate: String(site.proof.since),
  areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  knowsAbout: ["GoHighLevel", "HighLevel CRM", "Marketing automation", "Email deliverability", "Sales funnels", "CRM migration"],
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
});

export const website = () => ({
  "@type": "WebSite",
  "@id": webId,
  url: site.url,
  name: site.name,
  description: site.oneLine,
  publisher: { "@id": orgId },
  inLanguage: "en",
});

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

// Answers may hold [label](/path) links for the page; schema gets the plain text.
const plain = (s: string) => s.replace(/\s*\[\[VERIFY[^\]]*\]\]/g, "").replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

export const faqPage = (faqs: QA[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
});

// A priced service on /pricing. Starting prices use minPrice; a monthly plan uses a unit price per month.
export const pricedService = (p: { id: string; name: string; description: string; minPrice?: number; monthly?: number }) => {
  const url = absoluteUrl("/pricing");
  const priceSpecification = p.monthly
    ? { "@type": "UnitPriceSpecification", price: p.monthly, priceCurrency: "USD", billingDuration: 1, unitCode: "MON" }
    : { "@type": "PriceSpecification", minPrice: p.minPrice, priceCurrency: "USD" };
  return {
    "@type": "Service",
    "@id": `${url}#${p.id}`,
    name: p.name,
    description: p.description,
    url,
    provider: { "@id": orgId },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    offers: { "@type": "Offer", url, priceCurrency: "USD", ...(p.monthly ? { price: p.monthly } : {}), priceSpecification },
  };
};

export const service = (s: { name: string; description: string; path: string; serviceType: string }) => ({
  "@type": "Service",
  "@id": `${absoluteUrl(s.path)}#service`,
  name: s.name,
  serviceType: s.serviceType,
  description: s.description,
  url: absoluteUrl(s.path),
  provider: { "@id": orgId },
  areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  audience: { "@type": "BusinessAudience", audienceType: "Coaches, agencies and local businesses" },
});

export const article = (a: { title: string; description: string; path: string; published: string; updated: string; type?: "Article" | "TechArticle" }) => ({
  "@type": a.type ?? "Article",
  headline: a.title,
  description: a.description,
  url: absoluteUrl(a.path),
  mainEntityOfPage: absoluteUrl(a.path),
  datePublished: a.published,
  dateModified: a.updated,
  author: { "@id": orgId },
  publisher: { "@id": orgId },
  image: absoluteUrl(`/og${a.path}`),
  inLanguage: "en",
});

export const definedTerm = (t: { term: string; definition: string; path: string }) => ({
  "@type": "DefinedTerm",
  name: t.term,
  description: t.definition.replace(/\s*\[\[VERIFY[^\]]*\]\]/g, ""),
  url: absoluteUrl(t.path),
  inDefinedTermSet: { "@type": "DefinedTermSet", "@id": absoluteUrl("/glossary#set"), name: "FixGHL GoHighLevel glossary", url: absoluteUrl("/glossary") },
});

export function JsonLd({ data }: { data: object | object[] }) {
  const graph = { "@context": "https://schema.org", "@graph": Array.isArray(data) ? data : [data] };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
  );
}
