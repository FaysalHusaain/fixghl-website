import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { terms, getTerm } from "@/content/glossary";
import { PageHeader } from "@/components/ui/PageHeader";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { CtaBand } from "@/components/ui/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, definedTerm } from "@/lib/schema";

export function generateStaticParams() {
  return terms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/glossary/[term]">): Promise<Metadata> {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) return {};
  return pageMetadata({ title: t.metaTitle, description: t.description, path: `/glossary/${term}` });
}

export default async function Page({ params }: PageProps<"/glossary/[term]">) {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) notFound();
  const { default: Body } = await import(`@/content/glossary/${term}.mdx`);
  const others = terms.filter((x) => x.slug !== t.slug);
  return (
    <>
      <JsonLd data={definedTerm({ term: t.term, definition: t.definition, path: `/glossary/${t.slug}` })} />
      <PageHeader
        crumbs={[{ name: "Glossary", path: "/glossary" }, { name: t.term, path: `/glossary/${t.slug}` }]}
        title={t.term}
        updated={t.updated}
      />
      <section className="pb-[var(--section)]">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="prose min-w-0 lg:col-span-8 [&>h2:first-child]:mt-0">
            <Body />
          </div>
          <nav aria-label="Other glossary terms" className="lg:col-span-3 lg:col-start-10">
            <p className="font-semibold">More GHL terms</p>
            <ul className="mt-4 flex flex-col gap-1 text-small">
              {others.map((o) => (
                <li key={o.slug}><Link href={`/glossary/${o.slug}`} className="flex min-h-11 items-center text-ink-700 hover:text-ink-950">{o.term}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <RelatedLinks links={t.related} />
      <CtaBand location={`glossary_${t.slug}`} />
    </>
  );
}
