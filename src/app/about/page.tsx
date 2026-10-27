import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProofStrip } from "@/components/ui/ProofStrip";
import { CtaBand } from "@/components/ui/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About FixGHL: A Specialist GoHighLevel Studio",
  description: "FixGHL is an independent studio that works only on GoHighLevel, for coaches, agencies and local businesses in the US, UK, EU and the Middle East.",
  path: "/about",
});

const principles = [
  { t: "We find the cause first", b: "A workflow that fails is a symptom. We trace it to the trigger, filter, record or setting that caused it, and fix that." },
  { t: "We ask for the least access we need", b: "We list the exact access a job needs in the quote, and you can remove it at handover." },
  { t: "We write everything down", b: "Every project ends with notes your team can use, so nothing we build depends on us to keep running." },
  { t: "We tell you when GHL is the wrong tool", b: "If another platform would serve you better, we say so on the call." },
];

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ name: "About", path: "/about" }]} title="A studio that works only on GoHighLevel" lead={site.oneLine} />

      <section aria-labelledby="about-what" className="pb-[var(--section)]">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="prose lg:col-span-7">
            <h2 id="about-what">What is FixGHL?</h2>
            <p>
              FixGHL is an independent studio that has worked in GoHighLevel since 2019 and delivered more than 100 GHL projects. We fix
              accounts that have stopped working, set up new ones, migrate businesses from ClickFunnels, Wix, Kajabi and HubSpot, and build
              automations, funnels, SaaS mode setups and integrations.
            </p>
            <h2>Who do we work with?</h2>
            <p>
              Coaches, agencies and local businesses. Coaches tend to need funnels, bookings and follow-up. Agencies need client sub-accounts, snapshots and SaaS mode that work.
              Local businesses need leads answered quickly and appointments that people turn up to.
            </p>
            <h2>Where are our clients?</h2>
            <p>In the United States, the United Kingdom, the European Union and the Middle East. We work remotely with all of them.</p>
            <h2>Are we part of HighLevel?</h2>
            <p>
              No. FixGHL is independent and is not affiliated with or endorsed by HighLevel Inc. We recommend GoHighLevel because we use it
              every day, and we may earn a commission if you sign up through <Link href="/try-ghl">our trial link</Link>.
            </p>
            <h2>How do I contact FixGHL?</h2>
            <p>
              Book a <Link href="/book">free 30-minute call</Link>, or email <a href="mailto:hello@fixghl.com">hello@fixghl.com</a>.
            </p>
          </div>
          <div className="lg:col-span-5">
            <h2 className="h-sub">How we work</h2>
            <dl className="mt-6 flex flex-col gap-2">
              {principles.map((p) => (
                <div key={p.t} className="rounded-2xl bg-ink-100 p-6">
                  <dt className="font-semibold">{p.t}</dt>
                  <dd className="mt-2 text-ink-700">{p.b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <ProofStrip />
      <CtaBand location="about" />
    </>
  );
}
