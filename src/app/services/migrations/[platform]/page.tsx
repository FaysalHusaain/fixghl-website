import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { migrationServices } from "@/content/services";
import { ServicePage } from "@/components/services/ServicePage";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return migrationServices.map((s) => ({ platform: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/migrations/[platform]">): Promise<Metadata> {
  const { platform } = await params;
  const s = migrationServices.find((p) => p.slug === platform);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: s.path });
}

export default async function Page({ params }: PageProps<"/services/migrations/[platform]">) {
  const { platform } = await params;
  const s = migrationServices.find((p) => p.slug === platform);
  if (!s) notFound();
  return <ServicePage s={s} />;
}
