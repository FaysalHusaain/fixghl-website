import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/content/guides";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getToc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMetadata({ title: g.metaTitle, description: g.description, path: `/guides/${slug}`, type: "article", published: g.published, updated: g.updated });
}

export default async function Page({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const { default: Body } = await import(`@/content/guides/${slug}.mdx`);
  return (
    <ArticleLayout meta={g} path={`/guides/${slug}`} crumbs={[{ name: "Guides", path: "/guides" }, { name: g.title, path: `/guides/${slug}` }]} toc={getToc("guides", slug)}>
      <Body />
    </ArticleLayout>
  );
}
