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

export const faqPage = (faqs: QA[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs
    .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\s*\[\[VERIFY[^\]]*\]\]/g, "") } })),
});

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
