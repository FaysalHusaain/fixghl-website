import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/ui/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { Icon } from "@/components/ui/Icon";
import type { ArticleMeta } from "@/content/types";
import { formatDate } from "@/lib/content";
import { JsonLd, article } from "@/lib/schema";

export function ArticleLayout({
  meta,
  crumbs,
  path,
  toc,
  children,
}: {
  meta: ArticleMeta;
  crumbs: Crumb[];
  path: string;
  toc: { id: string; text: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd data={article({ title: meta.title, description: meta.description, path, published: meta.published, updated: meta.updated, type: "TechArticle" })} />
      <article>
        <header className="pt-10 md:pt-16">
          <div className="frame pb-12 md:pb-16">
            <Breadcrumbs items={crumbs} />
            <h1 className="h-title mt-8 max-w-[22ch] md:mt-12">{meta.title}</h1>
            <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-small text-ink-600">
              <span>By FixGHL</span>
              <span>
                Last updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
              </span>
            </p>
          </div>
        </header>

        <div className="frame grid gap-12 pb-[var(--section)] lg:grid-cols-12">
          <aside className="lg:order-2 lg:col-span-3 lg:col-start-10">
            <div className="flex flex-col gap-3 lg:sticky lg:top-24">
            <details className="group rounded-2xl bg-ink-100 p-5" open>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
                On this page
                <Icon name="plus" className="size-4 transition-transform group-open:rotate-45" />
              </summary>
              <ol className="mt-4 flex flex-col gap-2 text-small">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="flex min-h-11 items-center py-1 text-ink-700 hover:text-ink-950">{t.text}</a>
                  </li>
                ))}
                <li><a href="#faq" className="flex min-h-11 items-center py-1 text-ink-700 hover:text-ink-950">Frequently asked questions</a></li>
              </ol>
            </details>
            <div className="on-dark hidden rounded-2xl bg-ink-950 p-5 text-ink-50 lg:block">
              <p className="font-semibold">Rather have it fixed?</p>
              <p className="mt-2 text-small text-ink-300">We fix this in your account. The first 30-minute call is free.</p>
              <Link href="/book" data-track="book_call_click" data-track-location={`article_${meta.slug}_sidebar`} className="btn btn-gold mt-4 min-h-11 w-full">
                Book a free call
              </Link>
            </div>
            </div>
          </aside>
          <div className="prose min-w-0 lg:order-1 lg:col-span-8">
            {children}
            <div className="not-prose on-dark mt-12 flex flex-col gap-5 rounded-[1.5rem] bg-ink-950 p-6 text-ink-50 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-[44ch] text-[1.125rem] leading-snug">
                {meta.ctaLine ?? "Tried these steps and it still is not working? We find the cause in your account on a free 30-minute call."}
              </p>
              <Link href="/book" data-track="book_call_click" data-track-location={`article_${meta.slug}_inline`} className="btn btn-gold shrink-0">
                Book a free 30-minute call
              </Link>
            </div>
            <h2 id="faq">Frequently asked questions</h2>
            <div className="not-prose">
              <Faq items={meta.faqs} openFirst={false} />
            </div>
            <p className="text-small text-ink-600">
              Written by FixGHL, a specialist GoHighLevel studio. GoHighLevel changes often; we check these steps against HighLevel&apos;s help
              center and update this page when they change.
            </p>
          </div>
        </div>
      </article>
      <RelatedLinks title="Related" links={meta.related} />
      <CtaBand title={meta.kind === "setup" ? "Rather have it set up for you?" : "Rather have it fixed for you?"} location={`article_${meta.slug}`} />
    </>
  );
}
