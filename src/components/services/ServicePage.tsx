import Link from "next/link";
import type { Service } from "@/content/services";
import { getService, migrationServices } from "@/content/services";
import { getGuide } from "@/content/guides";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FragmentFor } from "@/components/ui-fragments/Panels";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/ui/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { Icon } from "@/components/ui/Icon";
import { Txt } from "@/components/ui/Txt";
import { JsonLd, service as serviceSchema } from "@/lib/schema";
import { testimonialFor } from "@/content/testimonials";
import { QuoteCard } from "@/components/ui/Testimonials";

const lower = (s: string) => (s.startsWith("GHL") || s.startsWith("SaaS") ? s : s.charAt(0).toLowerCase() + s.slice(1));

export function ServicePage({ s }: { s: Service }) {
  const crumbs = [{ name: "Services", path: "/services" }];
  if (s.parent) crumbs.push({ name: "Migrations", path: "/services/migrations" });
  crumbs.push({ name: s.name, path: s.path });

  const related = [
    ...s.relatedGuides.map((g) => getGuide(g)).filter(Boolean).map((g) => ({ href: `/guides/${g!.slug}`, label: g!.title, note: "Guide" })),
    ...s.related.map((r) => getService(r)).map((r) => ({ href: r.path, label: r.h1, note: "Service" })),
  ].slice(0, 4);

  const review = testimonialFor(s.slug);

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.h1, description: s.answer, path: s.path, serviceType: s.name })} />

      {/* What it is and who it is for */}
      <section aria-labelledby="svc-title" className="pt-10 md:pt-16">
        <div className="frame grid gap-12 pb-[var(--section)] lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Breadcrumbs items={crumbs} />
            <h1 id="svc-title" className="h-title mt-8 max-w-[18ch] md:mt-12">{s.h1}</h1>
            <p className="t-lead mt-6 max-w-[54ch] text-ink-800"><Txt>{s.answer}</Txt></p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" data-track="book_call_click" data-track-location={`service_${s.slug}`} className="btn btn-ink">
                Book a free 30-minute GHL call <Icon name="arrow" className="size-4" />
              </Link>
              <Link href="/book#describe" className="btn btn-outline-light">Describe your project</Link>
            </div>
            <p className="mt-6 text-small text-ink-600">7+ years in GHL · 100+ projects · US, UK, EU, Middle East</p>
          </div>
          <div className="lg:col-span-5 lg:pt-20" data-reveal>
            <FragmentFor kind={s.fragment} />
          </div>
        </div>
      </section>

      {/* Problems */}
      <section aria-labelledby="problems-title" className="on-dark bg-ink-950 text-ink-50">
        <div className="frame section grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="problems-title" className="h-title" data-reveal>What problems does this solve?</h2>
            <p className="mt-5 max-w-[40ch] text-ink-300" data-reveal style={{ ["--i" as string]: 1 }}>
              These are the situations people describe when they come to us for {lower(s.name)}.
            </p>
          </div>
          <ul className="flex flex-col gap-1 lg:col-span-7">
            {s.problems.map((p, i) => (
              <li key={p} data-reveal style={{ ["--i" as string]: i % 4 }} className="rounded-2xl bg-ink-900 p-5 text-[1.125rem] leading-snug md:p-6 md:text-[1.25rem]">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Included */}
      <section aria-labelledby="included-title" className="section">
        <div className="frame">
          <h2 id="included-title" className="h-title max-w-[20ch]" data-reveal>What is included?</h2>
          <p className="t-lead mt-5 max-w-[54ch] text-ink-700" data-reveal style={{ ["--i" as string]: 1 }}>
            The exact scope is written into your quote. These are the parts most {lower(s.name)} projects include.
          </p>
          <dl className="mt-8 grid gap-2 md:mt-12 md:grid-cols-2">
            {s.included.map((it, i) => (
              <div key={it.title} data-reveal style={{ ["--i" as string]: i % 2 }} className="rounded-2xl bg-ink-100 p-6 md:p-8">
                <dt className="h-sub">{it.title}</dt>
                <dd className="mt-3 max-w-[48ch] text-ink-700"><Txt>{it.body}</Txt></dd>
              </div>
            ))}
          </dl>

          <div className="on-dark mt-10 flex flex-col gap-5 rounded-[1.5rem] bg-ink-950 p-6 text-ink-50 md:flex-row md:items-center md:justify-between md:p-8" data-reveal>
            <p className="max-w-[48ch] text-[1.125rem] leading-snug">
              Want to know what this would involve for your account? A free 30-minute call gets you the likely scope and a written quote.
            </p>
            <Link href="/book" data-track="book_call_click" data-track-location={`service_${s.slug}_included`} className="btn btn-gold shrink-0">
              Get my scope and quote <Icon name="arrow" className="size-4" />
            </Link>
          </div>

          {s.moves && (
            <div className="mt-12 md:mt-16">
              <h2 className="h-sub" data-reveal>What moves, and how?</h2>
              <div className="table-wrap" role="region" aria-label="What moves and how" tabIndex={0}>
                <table>
                  <thead><tr><th scope="col">What you have today</th><th scope="col">How it gets into GoHighLevel</th></tr></thead>
                  <tbody>
                    {s.moves.map((m) => (
                      <tr key={m.item}><td className="font-medium">{m.item}</td><td><Txt>{m.how}</Txt></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {s.slug === "migrations" && (
            <div className="mt-12 md:mt-16">
              <h2 className="h-sub" data-reveal>Which platform are you moving from?</h2>
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {migrationServices.map((m) => (
                  <li key={m.slug}>
                    <Link href={m.path} className="group flex items-center justify-between gap-4 rounded-2xl bg-ink-950 p-6 text-ink-50 transition-colors hover:bg-ink-800 md:p-8">
                      <span className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-semibold leading-none tracking-[-0.03em]">
                        {m.h1.replace(" migration", "")}
                      </span>
                      <Icon name="arrow" className="size-6 shrink-0 text-gold-500 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="bg-ink-100">
        <div className="frame section">
          <h2 id="process-title" className="h-title max-w-[20ch]" data-reveal>How does the project run?</h2>
          <p className="t-lead mt-5 max-w-[54ch] text-ink-700" data-reveal style={{ ["--i" as string]: 1 }}>
            Four stages, from a free call to a documented handover. Your timeline is set in the written quote, once we have seen the account.
          </p>
          <ol className="mt-8 grid gap-1.5 md:mt-12 md:grid-cols-4">
            {s.process.map((p, i) => (
              <li key={p.stage} data-reveal style={{ ["--i" as string]: i }} className={`flex flex-col gap-4 rounded-2xl p-6 ${i === 0 ? "on-dark bg-ink-950 text-ink-50" : "bg-ink-50"}`}>
                <span className="font-display text-[1.5rem] font-semibold tracking-[-0.025em]">{p.stage}</span>
                <span className={i === 0 ? "text-ink-300" : "text-ink-700"}>{p.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions to ask before hiring */}
      <section aria-labelledby="ask-title" className="section">
        <div className="frame grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="ask-title" className="h-title" data-reveal>What should you ask before hiring anyone?</h2>
            <p className="mt-5 max-w-[40ch] text-ink-700" data-reveal style={{ ["--i" as string]: 1 }}>
              Ask these of any GHL provider, including us. Here is how we answer them.
            </p>
          </div>
          <dl className="flex flex-col gap-10 lg:col-span-7">
            {review && (
              <div data-reveal>
                <dt className="sr-only">What a client said</dt>
                <dd><QuoteCard t={review} /></dd>
              </div>
            )}
            {s.questions.map((q, i) => (
              <div key={q.q} data-reveal style={{ ["--i" as string]: i }}>
                <dt className="font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] font-semibold leading-tight tracking-[-0.025em]">{q.q}</dt>
                <dd className="mt-3 max-w-[58ch] text-ink-700"><Txt>{q.a}</Txt></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="svc-faq-title" className="bg-ink-100">
        <div className="frame section grid gap-10 lg:grid-cols-12">
          <h2 id="svc-faq-title" className="h-title lg:col-span-4" data-reveal>Common questions</h2>
          <div className="lg:col-span-8">
            <Faq items={s.faqs} />
          </div>
        </div>
      </section>

      <RelatedLinks title="Read next" links={related} />
      <CtaBand location={`service_${s.slug}_footer`} />
    </>
  );
}
