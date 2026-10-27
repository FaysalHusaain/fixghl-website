import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { homeFaqs, studioFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqPage } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "FixGHL FAQ: Working With a GoHighLevel Studio",
  description: "Answers about FixGHL: what we do, pricing, the 30-minute call, account access, migrations, SaaS mode and what happens after a project.",
  path: "/faq",
});

const serviceFaqs = ["ghl-fixes", "migrations", "automation", "saas-white-label"].flatMap((slug) => services.find((s) => s.slug === slug)!.faqs.slice(0, 2));

const groups = [
  { id: "about", title: "About FixGHL", items: homeFaqs },
  { id: "projects", title: "Projects and pricing", items: studioFaqs },
  { id: "ghl", title: "GoHighLevel questions", items: serviceFaqs },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        title="Frequently asked questions"
        lead="Straight answers about working with FixGHL and about GoHighLevel itself. If your question is not here, ask it on a free 30-minute call."
      />
      <div className="pb-[var(--section)]">
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`faq-${g.id}`} className="frame grid gap-8 pb-12 lg:grid-cols-12 md:pb-16">
            <h2 id={`faq-${g.id}`} className="h-sub lg:col-span-4">{g.title}</h2>
            <div className="lg:col-span-8"><Faq items={g.items} schema={false} openFirst={false} /></div>
          </section>
        ))}
      </div>
      <JsonLd data={faqPage(groups.flatMap((g) => g.items))} />
      <CtaBand location="faq" />
    </>
  );
}
