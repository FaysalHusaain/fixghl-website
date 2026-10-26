import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { HandoverPanel } from "@/components/ui-fragments/Panels";
import { Icon } from "@/components/ui/Icon";
import { Txt } from "@/components/ui/Txt";
import { studioFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How We Work: From Call to Handover | FixGHL",
  description: "How a FixGHL project runs: a free 30-minute call, a written scoped quote, the build or fix in your GHL account, and a handover with written notes.",
  path: "/how-it-works",
});

const stages = [
  {
    q: "What happens on the 30-minute call?",
    a: "You show us the GHL account, or describe it, and tell us what it should be doing. We ask the questions that decide the scope and tell you what we think is causing the problem.",
    points: ["Screen-share the account if you can", "We point out the likely cause on the call", "No preparation needed beyond knowing the goal"],
  },
  {
    q: "What is in the scoped quote?",
    a: "A written document listing what we will change, what we will not touch, the order of work, what we need from you, and a fixed price for that scope. Nothing starts until you approve it.",
    points: ["Fixed price for the agreed scope", "Access we need, listed exactly", "Anything out of scope is named"],
  },
  {
    q: "How do you work inside my account?",
    a: "We work with the access you grant, usually a user on the affected sub-account. We test changes with test contacts and test data before they touch real leads, and we keep a log of every change.",
    points: ["Narrowest access that does the job", "Test contacts before live contacts", "A change log as we go"],
  },
  {
    q: "What do I get at handover?",
    a: "A walkthrough of what changed and written notes your team can keep: what was wrong, what we changed, how to edit it, and what to watch. Everything we built stays in your account.",
    points: ["Live walkthrough", "Written notes in plain English", "You can remove our access the same day"],
  },
];

const needs = [
  "Access to the GHL sub-account, or the agency account for SaaS work",
  "Access to your domain's DNS if email or domains are involved",
  "Logins or exports for the platform you are leaving, for migrations",
  "Someone who can answer questions about how you sell",
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "How it works", path: "/how-it-works" }]}
        title="How we work"
        lead="Every FixGHL project follows four stages: a free 30-minute call, a written scoped quote, the build or fix inside your account, and a handover with written notes. You know the scope and the price before any work starts."
      />

      <section aria-label="The four stages" className="pb-[var(--section)]">
        <ol className="frame flex flex-col gap-2">
          {stages.map((s, i) => (
            <li key={s.q} data-reveal className={`grid gap-8 rounded-[1.75rem] p-6 md:grid-cols-12 md:p-10 ${i === 0 ? "on-dark bg-ink-950 text-ink-50" : "bg-ink-100"}`}>
              <h2 className="font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] md:col-span-6">{s.q}</h2>
              <div className="md:col-span-6">
                <p className={i === 0 ? "text-ink-200" : "text-ink-800"}>{s.a}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Icon name="check" className={`mt-1 size-5 shrink-0 ${i === 0 ? "text-gold-500" : "text-ink-950"}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="need-title" className="bg-ink-100">
        <div className="frame section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="need-title" className="h-title" data-reveal>What do we need from you?</h2>
            <p className="t-lead mt-5 text-ink-700">Four things, and the quote lists exactly which apply to your project.</p>
            <ul className="mt-10 flex flex-col gap-2">
              {needs.map((n) => (
                <li key={n} className="flex gap-4 rounded-2xl bg-ink-50 p-5">
                  <Icon name="check" className="mt-0.5 size-5 shrink-0" />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-ink-700">
              How long does it take? <Txt>{"[[TODO: typical project timelines by service]]"}</Txt>
            </p>
          </div>
          <div className="lg:col-span-6">
            <HandoverPanel />
            <p className="mt-4 text-small text-ink-600">An example of the handover notes from a workflow fix.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="hiw-faq" className="section">
        <div className="frame grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="hiw-faq" className="h-title">Questions about the process</h2>
            <p className="mt-5 text-ink-700">See also <Link href="/pricing" className="link">pricing</Link> and the <Link href="/faq" className="link">full FAQ</Link>.</p>
          </div>
          <div className="lg:col-span-8"><Faq items={studioFaqs} /></div>
        </div>
      </section>
      <CtaBand location="how_it_works" />
    </>
  );
}
