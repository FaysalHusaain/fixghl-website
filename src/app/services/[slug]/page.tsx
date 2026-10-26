import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topServices } from "@/content/services";
import { ServicePage } from "@/components/services/ServicePage";
import { pageMetadata } from "@/lib/seo";

const pages = topServices.filter((s) => s.slug !== "migrations");

export function generateStaticParams() {
  return pages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = pages.find((p) => p.slug === slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: s.path });
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = pages.find((p) => p.slug === slug);
  if (!s) notFound();
  return <ServicePage s={s} />;
}
