import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { ProofStrip } from "@/components/ui/ProofStrip";
import { OpenOnHash } from "@/components/ui/OpenOnHash";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, pricedService } from "@/lib/schema";
import { plans, saasBuild, carePlan } from "@/content/pricing";
import type { QA } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "GoHighLevel Expert Pricing: Fixes from $99 | FixGHL",
  description: "Fixed prices for GoHighLevel fixes, setup and migrations. Fixes from $99, setup from $697, migrations from $997. Price agreed before we start.",
  path: "/pricing",
});

const payment = [
  "You get a fixed price in writing before we start. We don't bill by the hour.",
  "Quick Fix is paid up front. If we can't fix it, we refund it in full.",
  "Setups and migrations are paid 50% to start and 50% once the work is live and you've approved it.",
];

const faqs: (QA & { id?: string })[] = [
  { q: "How much does it cost to hire a GoHighLevel expert?", a: "At FixGHL, single fixes start at $99, full account setups at $697 and migrations to GHL at $997. SaaS and white-label builds start at $1,497. Many GHL agencies charge $1,000 to $5,000 for a full build. We quote every job at a fixed price before work starts." },
  { q: "Why do the prices say \"from\"?", a: "The starting price covers a standard job. If your account needs more, such as extra pipelines, many workflows or a large contact list, we give you the full fixed price on the call before you pay anything." },
  { q: "What if you can't fix my issue?", a: "On a Quick Fix, you get a full refund. On setups and migrations, you pay the second half only after the work is live and you've approved it." },
  { q: "Is the GoHighLevel subscription included?", a: "No. HighLevel bills your subscription directly, with plans from $97/month. You can start with a [30-day free trial](/try-ghl) through our link." },
  { q: "How do you get into my account?", a: "You add us as a user in your GHL account. There's no password sharing, and you can remove us as soon as the job is done." },
  { id: "care-plan", q: "What's included in the GHL Care Plan?", a: "For $297 a month you get up to 5 requests, such as fixing a workflow, editing a form or email, or connecting a calendar. Each request is a task we can finish in under an hour. You also get replies within 1 business day and a monthly check of your workflows, email deliverability and integrations. New builds are quoted separately. Unused requests don't roll over, and you can cancel anytime." },
  { q: "What happens after the 14 days of free fixes?", a: "You can move straight onto the GHL Care Plan at $297/month, or book a Quick Fix whenever something new comes up." },
];

const proof = [
  { figure: "7+", label: "years with GoHighLevel" },
  { figure: "100+", label: "GHL projects" },
  { figure: "4", label: "Clients in the US, UK, EU and Middle East" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          ...plans.map((p) => pricedService({ id: p.id, name: p.name, description: `${p.for} ${p.timeline}.`, minPrice: p.minPrice })),
          pricedService({ id: "saas-white-label", name: saasBuild.name, description: "A SaaS or white-label GoHighLevel offer, quoted on a free call.", minPrice: saasBuild.minPrice }),
          pricedService({ id: "care-plan", name: carePlan.name, description: carePlan.text, monthly: carePlan.amount }),
        ]}
      />
      <OpenOnHash />

      <PageHeader
        crumbs={[{ name: "Pricing", path: "/pricing" }]}
        title="GoHighLevel help at a fixed price"
        lead="Every job gets a fixed quote before we touch your account. Pick the closest match below, or book a free 30-minute call and we'll scope it with you."
      />

      <section aria-labelledby="plans-title" className="pb-[var(--section)]">
        <div className="frame">
          <h2 id="plans-title" className="sr-only">Prices</h2>
          <ul className="grid gap-3 lg:grid-cols-3 lg:items-stretch">
            {plans.map((p) => (
              <li
                key={p.id}
                className={`relative flex flex-col rounded-[1.75rem] p-6 md:p-8 ${
                  p.recommended ? "bg-white shadow-[inset_0_0_0_2px_var(--color-gold-500)]" : "bg-ink-100"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="h-sub">{p.name}</h3>
                  {p.recommended && (
                    <span className="rounded-full bg-gold-500 px-3 py-1 text-[0.8125rem] font-semibold leading-none text-ink-950">Recommended</span>
                  )}
                </div>
                <p className="mt-6 font-display font-semibold tracking-[-0.04em] text-ink-950">
                  <span className="text-[1.25rem] tracking-[-0.02em]">{p.price.split(" ")[0]}</span>{" "}
                  <span className="text-[clamp(3rem,2.4rem+2vw,4rem)] leading-none">{p.price.split(" ")[1]}</span>
                </p>
                <p className="mt-3 text-small font-semibold text-ink-800">{p.timeline}</p>
                <p className="mt-4 text-ink-700">{p.for}</p>
                <ul className="mt-6 flex flex-col gap-3 border-t border-ink-200 pt-6">
                  {p.includes.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-800">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-ink-950" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-small text-ink-600">{p.note}</p>
                <div className="mt-auto pt-8">
                  <Link href="/book" data-track="book_call_click" data-track-location={`pricing_${p.id}`} className="btn btn-ink w-full">
                    Book a free 30-minute call <Icon name="arrow" className="size-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-[60ch] text-center text-small text-ink-600">{saasBuild.line}</p>

          <div className="on-dark mt-8 flex flex-col gap-4 rounded-[1.5rem] bg-ink-950 p-6 text-ink-50 md:flex-row md:items-center md:gap-10 md:p-8">
            <div className="flex shrink-0 items-baseline gap-3 md:flex-col md:gap-1">
              <h3 className="font-semibold">{carePlan.name}</h3>
              <p className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-gold-500">{carePlan.price}</p>
            </div>
            <p className="max-w-[62ch] text-ink-300">{carePlan.text}</p>
            <a href="#care-plan" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-medium text-ink-50 md:ml-auto">
              What&apos;s included <Icon name="arrow" className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="payment-title" className="bg-ink-100">
        <div className="frame section grid gap-10 lg:grid-cols-12">
          <h2 id="payment-title" className="h-title lg:col-span-4">How payment works</h2>
          <ul className="flex flex-col gap-2 lg:col-span-8">
            {payment.map((t) => (
              <li key={t} className="flex gap-4 rounded-2xl bg-ink-50 p-5 text-[1.0625rem] leading-snug md:p-6">
                <Icon name="check" className="mt-1 size-4 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
            <li className="flex gap-4 rounded-2xl bg-ink-50 p-5 text-[1.0625rem] leading-snug md:p-6">
              <Icon name="check" className="mt-1 size-4 shrink-0" />
              <span>
                Your GHL subscription is billed by HighLevel, separate from our fee.{" "}
                <a href="/try-ghl" rel="sponsored nofollow" data-track="affiliate_click" data-track-location="pricing_payment" className="link font-medium">
                  Start a free 30-day trial
                </a>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <ProofStrip stats={proof} />

      <section aria-labelledby="pricing-faq" className="section">
        <div className="frame grid gap-10 lg:grid-cols-12">
          <h2 id="pricing-faq" className="h-title lg:col-span-4">Pricing questions</h2>
          <div className="lg:col-span-8"><Faq items={faqs} /></div>
        </div>
      </section>

      <CtaBand
        title="Not sure which one fits?"
        body="Book a free 30-minute call. We'll look at your account with you and give you a fixed price."
        ctaLabel="Book a free 30-minute call"
        secondary={false}
        location="pricing"
      />
    </>
  );
}
