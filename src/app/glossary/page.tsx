import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Txt } from "@/components/ui/Txt";
import { terms } from "@/content/glossary";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "GoHighLevel Glossary: GHL Terms Explained | FixGHL",
  description: "Plain-English definitions of GoHighLevel terms: sub-account, snapshot, workflow, trigger, SaaS mode, LC Email, custom values and more.",
  path: "/glossary",
});

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Glossary", path: "/glossary" }]} title="GoHighLevel glossary" lead="The GHL terms that come up most on our calls, defined in plain English with the problems each one tends to cause." />
      <section className="pb-[var(--section)]">
        <dl className="frame grid gap-2 md:grid-cols-2">
          {terms.map((t, i) => (
            <div key={t.slug} data-reveal style={{ ["--i" as string]: i % 2 }} className="flex flex-col justify-between gap-6 rounded-2xl bg-ink-100 p-6 md:p-8">
              <div>
                <dt className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">
                  <Link href={`/glossary/${t.slug}`} className="hover:underline hover:underline-offset-4">{t.term}</Link>
                </dt>
                <dd className="mt-3 text-ink-700"><Txt>{t.definition}</Txt></dd>
              </div>
              <Link href={`/glossary/${t.slug}`} className="link self-start text-small font-medium" aria-label={`Read more about ${t.term}`}>Read more</Link>
            </div>
          ))}
        </dl>
      </section>
      <JsonLd
        data={{
          "@type": "DefinedTermSet",
          "@id": absoluteUrl("/glossary#set"),
          name: "FixGHL GoHighLevel glossary",
          url: absoluteUrl("/glossary"),
          hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, url: absoluteUrl(`/glossary/${t.slug}`) })),
        }}
      />
      <CtaBand location="glossary_hub" />
    </>
  );
}
