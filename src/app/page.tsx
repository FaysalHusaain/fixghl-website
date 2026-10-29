import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ServiceList, type ServiceItem } from "@/components/home/ServiceList";
import { HandoverPanel } from "@/components/ui-fragments/Panels";
import { ProofStrip } from "@/components/ui/ProofStrip";
import { Testimonials, QuoteCard } from "@/components/ui/Testimonials";
import { testimonials } from "@/content/testimonials";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { BookingModule } from "@/components/booking/BookingModule";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { migrationServices } from "@/content/services";
import { homeFaqs } from "@/content/faqs";

export const metadata: Metadata = pageMetadata({
  title: "FixGHL | GoHighLevel Fixes, Setups & Migrations",
  description:
    "Specialist GoHighLevel studio. We fix broken workflows and email, set up new accounts, and migrate you from ClickFunnels, Wix, Kajabi or HubSpot.",
  path: "/",
});

const pains = [
  {
    quote: "Our workflow worked last week. Now it enrols nobody.",
    cause: "The workflow is in draft, a trigger filter no contact meets, or re-entry is switched off.",
    fix: "We check each setting in your account, correct the one at fault and test with a fresh contact.",
    href: "/guides/ghl-workflow-not-triggering",
    cta: "Read the step-by-step guide",
  },
  {
    quote: "We bought GoHighLevel months ago and still have not set it up.",
    cause: "Too many settings, no clear order, and the business still runs out of an inbox and a spreadsheet.",
    fix: "We build the account in the right order: domains, email, calendars, pipeline and follow-up, then hand it over.",
    href: "/services/ghl-setup",
    cta: "See our GHL setup service",
  },
  {
    quote: "Half our emails are landing in spam.",
    cause: "Mail goes out from a shared or unauthenticated sending domain.",
    fix: "We set up your own sending domain with SPF, DKIM and DMARC, then warm it up.",
    href: "/guides/ghl-emails-going-to-spam",
    cta: "Read the step-by-step guide",
  },
  {
    quote: "We want to leave ClickFunnels, but our funnels are live and earning.",
    cause: "Contacts, pages, checkout and sequences all move differently, and nothing can go down mid-move.",
    fix: "We map every asset, build and test in GHL while the old platform stays live, then switch on a set date.",
    href: "/services/migrations",
    cta: "See our migration service",
  },
  {
    quote: "Our follow-up still happens by hand, when someone remembers.",
    cause: "Leads, bookings and no-shows are not connected to workflows, so replies depend on a person.",
    fix: "We build follow-up, reminders and pipeline moves as workflows, test every branch and document them.",
    href: "/services/automation",
    cta: "See our automation service",
  },
  {
    quote: "SaaS mode is switched on and we still cannot sell it.",
    cause: "Plans, Stripe rebilling and snapshots were never connected.",
    fix: "We set up the plans, the rebilling and the snapshot each plan loads.",
    href: "/services/saas-white-label",
    cta: "See our SaaS mode service",
  },
];

const serviceItems: ServiceItem[] = [
  { href: "/services/ghl-fixes", name: "GHL fixes", symptom: "Workflows not firing, emails in spam, missed bookings, failed syncs" },
  { href: "/services/ghl-setup", name: "GHL setup", symptom: "A new account built properly: domains, email, calendars, pipelines" },
  { href: "/services/migrations", name: "Migrations", symptom: "Moving from ClickFunnels, Wix, Kajabi or HubSpot" },
  { href: "/services/automation", name: "Workflows & automation", symptom: "Follow-up, reminders and pipeline moves that run without you" },
  { href: "/services/funnels-websites", name: "Funnels & websites", symptom: "Pages that work on phones and feed your CRM" },
  { href: "/services/saas-white-label", name: "SaaS mode & white-label", symptom: "Resell GHL under your brand with plans and rebilling" },
  { href: "/services/integrations", name: "Integrations", symptom: "Stripe, Zapier, Make, n8n, ManyChat, webhooks and APIs" },
];

const reasons = [
  { title: "GoHighLevel is all we do", body: "Every project we have taken on since 2019 has been a GHL project. Across more than 100 of them, we have usually seen your problem before." },
  { title: "We work across the whole account", body: "CRM, pipelines, email deliverability, workflows, funnels, SaaS mode and integrations. A broken reminder is often a calendar problem, and we can follow it there." },
  { title: "You get notes your team can use", body: "Every job ends with a written record of what was wrong, what we changed and what to watch, so your team can run the account without us." },
];

const stages = [
  { label: "A free call", when: "30 minutes", body: "You show us the account and the goal." },
  { label: "A scoped quote", when: "In writing", body: "What we will change, the price and the order of work." },
  { label: "The build or fix", when: "In your account", body: "Tested with test contacts before anything goes live." },
  { label: "Handover", when: "With notes", body: "A walkthrough and written notes for your team." },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Problem recognition */}
      <section aria-labelledby="pains-title" className="section">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <h2 id="pains-title" className="h-title" data-reveal>Sound familiar?</h2>
              <p className="mt-5 max-w-[30ch] text-ink-600" data-reveal style={{ ["--i" as string]: 1 }}>
                Whether the account is broken, unfinished or still on another platform, this is usually why, and what we do about it.
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-2 md:col-span-8">
            {pains.map((p, i) => (
              <li key={p.quote} data-reveal style={{ ["--i" as string]: i % 3 }} className="rounded-[1.5rem] bg-ink-100 p-6 md:p-8">
                <p className="font-display text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
                  “{p.quote}”
                </p>
                <dl className="mt-5 grid gap-4 md:grid-cols-2 md:gap-8">
                  <div>
                    <dt className="text-small font-semibold text-ink-600">Why it happens</dt>
                    <dd className="mt-1 text-ink-800">{p.cause}</dd>
                  </div>
                  <div>
                    <dt className="text-small font-semibold text-ink-600">What we do</dt>
                    <dd className="mt-1 text-ink-800">{p.fix}</dd>
                  </div>
                </dl>
                <Link href={p.href} className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-ink-700 hover:text-ink-950">
                  {p.cta} <Icon name="arrow" className="size-4" />
                </Link>
              </li>
            ))}
            <li data-reveal className="on-dark flex flex-col gap-6 rounded-[1.5rem] bg-ink-950 p-6 text-ink-50 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="font-display text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
                  Recognise one of these?
                </p>
                <p className="mt-2 max-w-[44ch] text-ink-300">
                  Book a free 30-minute call. We look at where you are, tell you what we would do and what it involves, whether or not you hire us.
                </p>
              </div>
              <Link href="/book" data-track="book_call_click" data-track-location="home_pains" className="btn btn-gold shrink-0">
                Talk it through on a free call <Icon name="arrow" className="size-4" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="on-dark bg-ink-950 text-ink-50">
        <div className="frame section">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="services-title" className="h-title md:col-span-7" data-reveal>What do you need done in GHL?</h2>
            <p className="text-ink-300 md:col-span-5" data-reveal style={{ ["--i" as string]: 1 }}>
              Pick what you need. Each page covers what is included, how the work runs and what to ask before hiring anyone.
            </p>
          </div>
          <div className="mt-10 md:mt-14">
            <ServiceList items={serviceItems} />
          </div>
        </div>
      </section>

      {/* Migrations */}
      <section aria-labelledby="mig-title" className="section bg-ink-100">
        <div className="frame">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="mig-title" className="h-title md:col-span-7" data-reveal>Moving from ClickFunnels, Wix, Kajabi or HubSpot?</h2>
            <p className="text-ink-700 md:col-span-5" data-reveal style={{ ["--i" as string]: 1 }}>
              We move contacts, pages, funnels and automations into GHL in a set order, test before the switch, and keep your old platform
              live until the new account is proven.
            </p>
          </div>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 md:mt-12">
            {migrationServices.map((m, i) => (
              <li key={m.slug} data-reveal style={{ ["--i" as string]: i }}>
                <Link href={m.path} className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-6 transition-colors hover:bg-ink-950 hover:text-ink-50 md:p-8">
                  <span className="font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-none tracking-[-0.035em]">
                    {m.name.replace(" to GHL", "")}
                    <span className="text-ink-500 group-hover:text-gold-500"> to GHL</span>
                    <span className="mt-3 block font-sans text-small font-medium tracking-normal text-ink-600 group-hover:text-ink-300">
                      See what moves, how and in what order
                    </span>
                  </span>
                  <Icon name="arrow" className="size-7 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-600">
            Moving from somewhere else? <Link href="/services/migrations" className="link font-medium text-ink-950">See how migrations work</Link>.
          </p>
        </div>
      </section>

      {/* Why a specialist */}
      <section aria-labelledby="why-title" className="section">
        <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 id="why-title" className="h-title" data-reveal>Why hire a GHL specialist?</h2>
            <p className="t-lead mt-6 max-w-[46ch] text-ink-700" data-reveal style={{ ["--i" as string]: 1 }}>
              A generalist agency treats GoHighLevel as one tool among many. We work only in GHL, so we already know where workflows fail,
              how LC Email authenticates and what a migration loses on the way in.
            </p>
            <dl className="mt-12 flex flex-col gap-9">
              {reasons.map((r, i) => (
                <div key={r.title} data-reveal style={{ ["--i" as string]: i + 2 }}>
                  <dt className="h-sub">{r.title}</dt>
                  <dd className="mt-2 max-w-[54ch] text-ink-700">{r.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6 lg:pt-4" data-reveal style={{ ["--i" as string]: 2 }}>
            <div className="lg:sticky lg:top-28">
              <HandoverPanel />
              <p className="mt-4 text-small text-ink-600">An example of the notes we leave after a fix.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-title" className="bg-ink-100">
        <div className="frame section">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="how-title" className="h-title max-w-[16ch]" data-reveal>How does working with us go?</h2>
            <Link href="/how-it-works" className="link inline-flex min-h-11 items-center font-medium" data-reveal>Read the full process</Link>
          </div>
          <ol data-ui className="mt-8 grid gap-1.5 md:mt-12 md:grid-cols-4">
            {stages.map((s, i) => (
              <li
                key={s.label}
                data-reveal
                style={{ ["--i" as string]: i }}
                className={`flex min-h-44 flex-col justify-between gap-8 rounded-2xl p-5 md:min-h-64 md:p-6 ${
                  i === 0 ? "on-dark bg-ink-950 text-ink-50" : i === 3 ? "bg-gold-500 text-ink-950" : "bg-ink-50"
                }`}
              >
                <span className={`text-small font-medium ${i === 0 ? "text-gold-500" : i === 3 ? "text-ink-800" : "text-ink-600"}`}>{s.when}</span>
                <span>
                  <span className="font-display block text-[1.625rem] font-semibold leading-tight tracking-[-0.025em]">{s.label}</span>
                  <span className={`mt-2 block ${i === 0 ? "text-ink-300" : "text-ink-700"}`}>{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-reveal>
            <p className="t-lead max-w-[40ch] text-ink-800">The first step is free, takes 30 minutes and commits you to nothing.</p>
            <Link href="/book" data-track="book_call_click" data-track-location="home_process" className="btn btn-ink shrink-0">
              Book the free call <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <ProofStrip cta />

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="bg-ink-100">
        <div className="frame section grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="h-title lg:sticky lg:top-28" data-reveal>Questions before you book</h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={homeFaqs} />
            <p className="mt-8 text-ink-600">
              More answers on the <Link href="/faq" className="link font-medium text-ink-950">full FAQ page</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA with booking */}
      <section aria-labelledby="final-title" className="on-dark bg-ink-950 text-ink-50" id="describe">
        <div className="frame section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="final-title" className="h-title" data-reveal>Book a free 30‑minute GHL call</h2>
            <p className="t-lead mt-6 max-w-[38ch] text-ink-300" data-reveal style={{ ["--i" as string]: 1 }}>
              Show us the account and what it should be doing. You leave the call knowing the cause, the fix and what it would cost.
            </p>
            <ul className="mt-10 flex flex-col gap-4 text-ink-200" data-reveal style={{ ["--i" as string]: 2 }}>
              {[
                "You leave with the likely cause and how we would fix it, even if you never hire us",
                "If you want us to do it, a written quote follows, fixed for the agreed scope",
                "You speak with a GHL specialist who can read your account",
                "No obligation to hire us",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Icon name="check" className="mt-1 size-5 shrink-0 text-gold-500" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-small text-ink-400">{site.proof.years} · {site.proof.projects} · {site.proof.regions}</p>
            <div className="mt-10 hidden lg:block">
              <QuoteCard t={testimonials.find((t) => t.id === "kerry-wix-migration")!} dark />
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal style={{ ["--i" as string]: 1 }}>
            <BookingModule id="home-book" />
          </div>
        </div>
      </section>
    </>
  );
}
