import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { HubList } from "@/components/content/HubList";
import { CtaBand } from "@/components/ui/CtaBand";
import { comparisons } from "@/content/compare";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "GoHighLevel Comparisons: GHL vs ClickFunnels and More",
  description: "Fair, dated comparisons of GoHighLevel with the platforms people move from, starting with ClickFunnels.",
  path: "/compare",
});

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Compare", path: "/compare" }]} title="GoHighLevel comparisons" lead="GoHighLevel compared with the platforms people move from. Every price and limit is dated, and we say when the other tool is the better fit." />
      <HubList items={comparisons.map((c) => ({ href: `/compare/${c.slug}`, title: c.title, summary: c.summary, updated: c.updated }))} />
      <CtaBand location="compare_hub" />
    </>
  );
}
