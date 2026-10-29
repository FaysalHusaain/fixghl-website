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
  title: "FixGHL | GoHighLevel Setup, Automation & Migrations",
  description:
    "Specialist GoHighLevel studio. We set up GHL accounts, build automations and funnels, migrate you from ClickFunnels, Wix, Kajabi or HubSpot, and fix what broke.",
  path: "/",
});

// Funnel order: hero, the problem in the visitor's words, services, why a specialist, process, proof, booking, FAQ.

const pains = [
  {
    quote: "Our workflow worked last week. Now it enrolls nobody.",
    line: "Usually a draft status, a filter no contact meets, or re-entry switched off. We find it, fix it and test with a fresh contact.",
    href: "/guides/ghl-workflow-not-triggering",
    cta: "Read the step-by-step guide",
  },
  {
    quote: "We bought GoHighLevel months ago and still haven't set it up.",
    line: "We build it in the right order: domains, email, calendars, pipeline and follow-up. Then we walk your team through it.",
    href: "/services/ghl-setup",
    cta: "See our GHL setup service",
  },
  {
    quote: "Our follow-up still happens by hand, when someone remembers.",
    line: "We turn new leads, bookings and no-shows into workflows that reply on their own, and test every branch.",
    href: "/services/automation",
    cta: "See our automation service",
  },
  {
    quote: "We want to leave ClickFunnels, but our funnels are live and earning.",
    line: "We rebuild and test everything in GHL while the old platform stays live, then switch on a date you pick.",
    href: "/services/migrations",
    cta: "See our migration service",
  },
];

// Done-for-you work first, fixes after.
const serviceItems: ServiceItem[] = [
  { href: "/services/ghl-setup", name: "GHL setup", symptom: "A new account built properly: domains, email, calendars, pipelines" },
  { href: "/services/automation", name: "Workflows & automation", symptom: "Follow-up, reminders and pipeline moves that run without you" },
  { href: "/services/funnels-websites", name: "Funnels & websites", symptom: "Pages that work on phones and feed your CRM" },
  {
    href: "/services/migrations",
    name: "Migrations",
    symptom: "Moving from ClickFunnels, Wix, Kajabi or HubSpot",
    links: migrationServices.map((m) => ({ href: m.path, label: m.name })),
  },
  { href: "/services/ghl-fixes", name: "GHL fixes", symptom: "Workflows not firing, emails in spam, missed bookings, failed syncs" },
  { href: "/services/saas-white-label", name: "SaaS mode & white-label", symptom: "Resell GHL under your brand with plans and rebilling" },
  { href: "/services/integrations", name: "Integrations", symptom: "Stripe, Zapier, Make, n8n, ManyChat, webhooks and APIs" },
];

const reasons = [
  { title: "GoHighLevel is all we do", body: "Every project we have taken on since 2019 has been a GHL project. After more than 100 of them, we have usually seen your problem before." },
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
        <div className="frame">
          <div className="grid gap-4 md:grid-cols-12 md:items-end">
            <h2 id="pains-title" className="h-title md:col-span-7" data-reveal>Sound familiar?</h2>
            <p className="t-lead text-ink-600 md:col-span-5" data-reveal style={{ ["--i" as string]: 1 }}>
              Most of our calls start with one of these.
            </p>
          </div>
          <ul className="mt-8 grid gap-2 md:mt-12 md:grid-cols-2">
            {pains.map((p, i) => (
              <li key={p.quote} data-reveal style={{ ["--i" as string]: i % 2 }} className="flex flex-col rounded-[1.5rem] bg-ink-100 p-5 md:p-8">
                <p className="font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
                  “{p.quote}”
                </p>
                <p className="mt-3 text-ink-700 md:mt-4">{p.line}</p>
                <Link href={p.href} className="mt-3 inline-flex min-h-11 items-center gap-2 self-start font-medium text-ink-700 hover:text-ink-950 md:mt-auto md:pt-4">
                  {p.cta} <Icon name="arrow" className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:mt-10" data-reveal>
            <Link href="/book" data-track="book_call_click" data-track-location="home_pains" className="btn btn-ink shrink-0">
              Book a free 30-minute call <Icon name="arrow" className="size-4" />
            </Link>
            <p className="max-w-[46ch] text-ink-600">We&apos;ll tell you what we&apos;d do and what it costs, whether or not you hire us.</p>
          </div>
        </div>
      </section>

      {/* Services, with the migration platforms under Migrations */}
      <section aria-labelledby="services-title" className="on-dark bg-ink-950 text-ink-50">
        <div className="frame section">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="services-title" className="h-title md:col-span-7" data-reveal>What do you need done in GHL?</h2>
            <p className="text-ink-300 md:col-span-5" data-reveal style={{ ["--i" as string]: 1 }}>
              Each service page covers what is included, how the work runs and what to ask before you hire anyone.
            </p>
          </div>
          <div className="mt-10 md:mt-14">
            <ServiceList items={serviceItems} />
          </div>
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

      <ProofStrip />

      {/* Booking */}
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
            <div className="mt-10 flex flex-col gap-4 rounded-[1.5rem] bg-ink-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <p className="h-sub max-w-[26ch]">Didn&apos;t see your question? Ask it on the call.</p>
              <Link href="/book" data-track="book_call_click" data-track-location="home_faq" className="btn btn-ink shrink-0">
                Book the free call <Icon name="arrow" className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
