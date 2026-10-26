import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons, getComparison } from "@/content/compare";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getToc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return comparisons.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getComparison(slug);
  if (!g) return {};
  return pageMetadata({ title: g.metaTitle, description: g.description, path: `/compare/${slug}`, type: "article", published: g.published, updated: g.updated });
}

export default async function Page({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  const g = getComparison(slug);
  if (!g) notFound();
  const { default: Body } = await import(`@/content/compare/${slug}.mdx`);
  return (
    <ArticleLayout meta={g} path={`/compare/${slug}`} crumbs={[{ name: "Compare", path: "/compare" }, { name: g.title, path: `/compare/${slug}` }]} toc={getToc("compare", slug)}>
      <Body />
    </ArticleLayout>
  );
}
