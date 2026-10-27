import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing: GoHighLevel Fixes, Setups, Migrations | FixGHL",
  description: "How FixGHL prices GoHighLevel work: a free 30-minute call, then a written quote fixed for the agreed scope. What affects the price and what is included.",
  path: "/pricing",
});

// Offer cards are ready for real prices: set `price` when offers are confirmed. [[TODO: offers/pricing]]
const offers = [
  { name: "GHL fix", href: "/services/ghl-fixes", for: "One problem, found and fixed at the cause", price: null as string | null },
  { name: "Account setup", href: "/services/ghl-setup", for: "A new GHL account built properly from day one", price: null },
  { name: "Migration", href: "/services/migrations", for: "Moving from ClickFunnels, Wix, Kajabi or HubSpot", price: null },
  { name: "Automation build", href: "/services/automation", for: "Workflows for follow-up, reminders and pipelines", price: null },
  { name: "SaaS mode setup", href: "/services/saas-white-label", for: "Plans, rebilling, snapshots and white-label", price: null },
  { name: "Integrations", href: "/services/integrations", for: "Stripe, Zapier, Make, n8n, ManyChat, APIs", price: null },
];

const drivers = [
  "How many workflows, funnels, sub-accounts or records are involved",
  "Whether the fix is a correction or needs a rebuild",
  "How many outside tools are connected",
  "How quickly you need it done",
];

const faqs = [
  { q: "Why don't you publish fixed prices?", a: "Because two problems that look the same from outside can be a small filter change or a full rebuild. We would rather see the account and quote the real job than publish a price that is wrong for most people." },
  { q: "Is the 30-minute call really free?", a: "Yes. There is no charge for the call and no obligation to hire us afterwards." },
  { q: "Can the price change after I approve the quote?", a: "Not for the agreed scope. If you ask for something outside it, we quote that separately before doing it." },
  { q: "How do I pay?", a: "Payment terms are set out in your written quote, before any work starts." },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Pricing", path: "/pricing" }]}
        title="How we price GoHighLevel work"
        lead="We quote every project after a free 30-minute call. The quote is written, lists exactly what we will do, and is fixed for that scope. You approve it before any work starts."
      />
      <section aria-labelledby="offers-title" className="pb-[var(--section)]">
        <div className="frame">
          <h2 id="offers-title" className="sr-only">Services and how they are priced</h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o, i) => (
              <li key={o.name} data-reveal style={{ ["--i" as string]: i % 3 }} className="flex flex-col justify-between gap-10 rounded-2xl bg-ink-100 p-6 md:p-8">
                <div>
                  <h3 className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">{o.name}</h3>
                  <p className="mt-2 text-ink-700">{o.for}</p>
                </div>
                <div>
                  <p className="font-display text-[1.25rem] font-semibold tracking-[-0.02em]">{o.price ?? "Custom quote after a 30-minute call"}</p>
                  <Link href={o.href} className="mt-4 inline-flex items-center gap-2 font-medium">
                    What is included <Icon name="arrow" className="size-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="drivers-title" className="on-dark bg-ink-950 text-ink-50">
        <div className="frame section grid gap-10 lg:grid-cols-12">
          <h2 id="drivers-title" className="h-title lg:col-span-5">What affects the price?</h2>
          <ul className="flex flex-col gap-1 lg:col-span-7">
            {drivers.map((d) => (
              <li key={d} className="rounded-2xl bg-ink-900 p-5 text-[1.125rem] md:p-6">{d}</li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="pricing-faq" className="section">
        <div className="frame grid gap-10 lg:grid-cols-12">
          <h2 id="pricing-faq" className="h-title lg:col-span-4">Pricing questions</h2>
          <div className="lg:col-span-8"><Faq items={faqs} /></div>
        </div>
      </section>
      <CtaBand title="Get a real number for your account." body="Book a free 30-minute call. You get a written quote afterwards, fixed for the agreed scope." location="pricing" />
    </>
  );
}
