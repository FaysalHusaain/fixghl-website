import type { Metadata } from "next";
import Link from "next/link";
import { topServices, migrationServices } from "@/content/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "GoHighLevel Services: Fixes, Setup, Migrations | FixGHL",
  description: "Every GoHighLevel service FixGHL offers: fixes and troubleshooting, setup, migrations, workflows, funnels, SaaS mode and integrations.",
  path: "/services",
});

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", path: "/services" }]}
        title="GoHighLevel services"
        lead="We work only in GoHighLevel. Pick the service that matches what you need, or book a call and we will point you to the right one."
      />
      <section aria-label="All services" className="pb-[var(--section)]">
        <ul className="frame grid gap-2 md:grid-cols-2">
          {topServices.map((s, i) => (
            <li key={s.slug} data-reveal style={{ ["--i" as string]: i % 2 }} className={s.slug === "ghl-fixes" ? "md:col-span-2" : ""}>
              <Link href={s.path} className={`group flex h-full flex-col justify-between gap-10 rounded-2xl p-6 transition-colors md:p-8 ${s.slug === "ghl-fixes" ? "on-dark bg-ink-950 text-ink-50 hover:bg-ink-900" : "bg-ink-100 hover:bg-ink-200"}`}>
                <span>
                  <span className="font-display block text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-none tracking-[-0.035em]">{s.name}</span>
                  <span className={`mt-4 block max-w-[52ch] ${s.slug === "ghl-fixes" ? "text-ink-300" : "text-ink-700"}`}>{s.symptom}.</span>
                </span>
                <span className="flex items-center gap-2 font-medium">
                  See {s.name.toLowerCase().startsWith("ghl") || s.name.startsWith("SaaS") ? s.name : s.name.toLowerCase()}
                  <Icon name="arrow" className={`size-5 transition-transform group-hover:translate-x-1 ${s.slug === "ghl-fixes" ? "text-gold-500" : ""}`} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="frame mt-16">
          <h2 className="h-sub">Migrations by platform</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {migrationServices.map((m) => (
              <li key={m.slug}><Link href={m.path} className="btn btn-outline-light">{m.name}</Link></li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd
        data={{
          "@type": "ItemList",
          name: "FixGHL services",
          itemListElement: [...topServices, ...migrationServices].map((s, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(s.path), name: s.h1 })),
        }}
      />
      <CtaBand location="services_hub" />
    </>
  );
}
