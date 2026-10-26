import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { HubList } from "@/components/content/HubList";
import { CtaBand } from "@/components/ui/CtaBand";
import { guides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "GoHighLevel Guides: Fixes and How-Tos | FixGHL",
  description: "Practical GoHighLevel guides from FixGHL: workflows that will not trigger, emails in spam, and migrating from ClickFunnels without losing data.",
  path: "/guides",
});

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Guides", path: "/guides" }]} title="GoHighLevel guides" lead="Step-by-step fixes for the GHL problems we see most, checked against HighLevel's help center and dated so you know they are current." />
      <HubList items={guides.map((g) => ({ href: `/guides/${g.slug}`, title: g.title, summary: g.summary, updated: g.updated }))} />
      <CtaBand location="guides_hub" />
    </>
  );
}
