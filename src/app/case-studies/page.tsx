import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/seo";

// Hidden from navigation and the sitemap, and noindexed, until real case studies with client approval exist.
export const metadata: Metadata = pageMetadata({ title: "Case Studies | FixGHL", description: "GoHighLevel case studies from FixGHL.", path: "/case-studies", noindex: true });

export default function Page() {
  return (
    <PageHeader
      crumbs={[{ name: "Case studies", path: "/case-studies" }]}
      title="Case studies"
      lead={<>We are preparing case studies with our clients&apos; permission. Until then, <Link href="/book" className="link">book a call</Link> and ask us about projects like yours.</>}
    />
  );
}
