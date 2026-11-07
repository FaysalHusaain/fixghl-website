import type { Metadata } from "next";
import Image from "next/image";
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

      <section id="founder" aria-labelledby="founder-title" className="scroll-mt-28 pb-[var(--section)]">
        <div className="frame">
          <div className="grid items-center gap-8 rounded-[1.75rem] bg-ink-100 p-6 sm:grid-cols-[auto_1fr] sm:gap-10 md:p-10 lg:gap-14 lg:p-14">
            <Image
              src={site.founder.photo}
              alt={site.founder.alt}
              width={800}
              height={800}
              sizes="(min-width: 1024px) 224px, (min-width: 640px) 176px, 144px"
              className="size-36 rounded-full bg-ink-200 object-cover sm:size-44 lg:size-56"
            />
            <div>
              <h2 id="founder-title" className="h-sub">Who you&apos;ll work with</h2>
              <p className="mt-6 font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.02em]">{site.founder.name}</p>
              <p className="mt-1 text-small text-ink-600">Founder, FixGHL</p>
              <div className="mt-6 flex max-w-[62ch] flex-col gap-4 text-ink-800">
                <p>
                  FixGHL is run by Faysal Husaain. He has been building inside GoHighLevel since 2019 and has delivered more than 100 GHL
                  projects for coaches, agencies and local businesses. Before FixGHL, he spent three years building funnels, websites and
                  automations at Conversion Elevation.
                </p>
                <p>Every job runs through him. He scopes it with you on the free call and checks the work before it comes back to you.</p>
              </div>
              <a href={site.founder.linkedin} target="_blank" rel="me noopener" className="link mt-6 inline-flex min-h-11 items-center font-medium">
                Faysal Husaain on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

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
              every day, and we may earn a commission if you sign up through <a href="/try-ghl" rel="sponsored nofollow" data-track="affiliate_click" data-track-location="about">our trial link</a>.
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
