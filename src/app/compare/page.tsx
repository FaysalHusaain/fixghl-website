import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { HubIntro } from "@/components/content/HubIntro";
import { hubIntros } from "@/content/hubs";
import { HubList } from "@/components/content/HubList";
import { CtaBand } from "@/components/ui/CtaBand";
import { comparisons } from "@/content/compare";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "GoHighLevel Comparisons: GHL vs ClickFunnels and More",
  description: "Dated comparisons of GoHighLevel with the platforms businesses move from, starting with ClickFunnels: features, pricing, fit and when to stay put.",
  path: "/compare",
});

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Compare", path: "/compare" }]} title="GoHighLevel comparisons" lead="GoHighLevel compared with the platforms people move from. Every price and limit is dated, and we say when the other tool is the better fit.">
        <HubIntro paragraphs={hubIntros.compare} />
      </PageHeader>
      <HubList items={comparisons.map((c) => ({ href: `/compare/${c.slug}`, title: c.title, summary: c.summary, updated: c.updated }))} />
      <CtaBand location="compare_hub" />
    </>
  );
}
