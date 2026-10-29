// Abstracted GoHighLevel screens drawn in HTML. Illustrative configuration only: no metrics, no people.
import type { ReactNode } from "react";
import type { Fragment } from "@/content/services";
import { Icon } from "@/components/ui/Icon";
import { WorkflowCanvas } from "./WorkflowCanvas";

function Shell({ title, status, children, caption }: { title: string; status?: string; children: ReactNode; caption: string }) {
  return (
    <figure data-ui className="on-dark overflow-hidden rounded-2xl bg-ink-900 text-left text-ink-50">
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-[0.8125rem] text-ink-400 md:px-5">
        <span className="min-w-0 text-ink-200 [overflow-wrap:anywhere]">{title}</span>
        {status && (
          <span className="flex shrink-0 items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-gold-500" />
            {status}
          </span>
        )}
      </div>
      <div className="px-4 pb-5 md:px-5 md:pb-6">{children}</div>
    </figure>
  );
}

const Pass = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-2 py-0.5 text-[0.75rem] font-semibold text-ink-950">
    <Icon name="check" className="size-3" /> Pass
  </span>
);

export function EmailAuthPanel() {
  const rows = [
    { type: "SPF", host: "mail.yourdomain.com", value: "v=spf1 include:mailgun.org ~all" },
    { type: "DKIM", host: "…._domainkey.mail", value: "k=rsa; p=MIGfMA0GCSq…" },
    { type: "DMARC", host: "_dmarc.yourdomain.com", value: "v=DMARC1; p=none; rua=…" },
  ];
  return (
    <Shell title="Email services · Dedicated sending domain" status="Verified" caption="Illustration of a GHL dedicated sending domain with SPF, DKIM and DMARC records passing.">
      <ul className="flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.type} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 rounded-xl bg-ink-800/70 p-3 text-[0.8125rem]">
            <span className="font-semibold text-ink-50">{r.type}</span>
            <span className="min-w-0">
              <span className="block text-ink-200 [overflow-wrap:anywhere]">{r.host}</span>
              <span className="block text-ink-400 [overflow-wrap:anywhere]">{r.value}</span>
            </span>
            <Pass />
          </li>
        ))}
      </ul>
      <p className="mt-3 px-1 text-[0.8125rem] text-gold-500">Mail now sends from your own authenticated subdomain.</p>
    </Shell>
  );
}

export function PipelinePanel() {
  const stages = [
    { name: "New inquiry", cards: ["Form · Free consult", "Facebook lead ad"] },
    { name: "Booked", cards: ["Calendar · Discovery call"] },
    { name: "Proposal sent", cards: ["Imported from HubSpot"] },
    { name: "Won", cards: ["Stripe · Paid"] },
  ];
  return (
    <Shell title="Opportunities · Sales pipeline" status="Imported" caption="Illustration of a GHL pipeline with stages from new inquiry to won.">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {stages.map((s) => (
          <div key={s.name} className="rounded-xl bg-ink-800/50 p-2.5">
            <p className="px-1 pb-2 text-[0.8125rem] font-medium text-ink-200">{s.name}</p>
            <ul className="flex flex-col gap-2">
              {s.cards.map((c) => (
                <li key={c} className="rounded-lg bg-ink-800 p-2.5 text-[0.8125rem] leading-snug text-ink-100">
                  <span aria-hidden className="mb-2 block h-1.5 w-10 rounded-full bg-ink-600" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function CalendarPanel() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["9:00", "10:30", "13:00", "15:30"];
  const booked = new Set(["Tue-10:30", "Thu-13:00"]);
  return (
    <Shell title="Calendars · Discovery call" status="Reminders on" caption="Illustration of a GHL booking calendar with confirmed slots and reminders.">
      <div className="grid grid-cols-5 gap-1.5 text-center text-[0.75rem]">
        {days.map((d) => (
          <div key={d} className="flex flex-col gap-1.5">
            <span className="py-1 text-ink-400">{d}</span>
            {slots.map((t) => {
              const b = booked.has(`${d}-${t}`);
              return (
                <span key={t} className={`rounded-md py-2 ${b ? "bg-gold-500 font-semibold text-ink-950" : "bg-ink-800/70 text-ink-300"}`}>
                  {b ? "Booked" : t}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-3 px-1 text-[0.8125rem] text-ink-300">Confirmation by SMS and email · Reminder the day before</p>
    </Shell>
  );
}

export function SaasPanel() {
  const plans = [
    { name: "Starter plan", snap: "Loads: Core CRM snapshot" },
    { name: "Growth plan", snap: "Loads: CRM + automation snapshot" },
    { name: "Pro plan", snap: "Loads: Full build + Conversation AI" },
  ];
  return (
    <Shell title="SaaS configurator · Plans" status="Stripe connected" caption="Illustration of GHL SaaS mode plans, each loading a snapshot.">
      <ul className="flex flex-col gap-2">
        {plans.map((p) => (
          <li key={p.name} className="flex items-center justify-between gap-3 rounded-xl bg-ink-800/70 p-3 text-[0.8125rem]">
            <span>
              <span className="block font-medium text-ink-50">{p.name}</span>
              <span className="block text-ink-400">{p.snap}</span>
            </span>
            <span className="rounded-full bg-ink-700 px-2.5 py-1 text-ink-100">Rebilling on</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 px-1 text-[0.8125rem] text-ink-300">App domain: app.youragency.com</p>
    </Shell>
  );
}

export function IntegrationsPanel() {
  const rows = [
    { from: "Stripe", event: "payment_intent.succeeded", to: "Contact tagged: Paid" },
    { from: "ManyChat", event: "New subscriber", to: "Opportunity created" },
    { from: "Webhook", event: "Order received", to: "Workflow: Fulfilment" },
  ];
  return (
    <Shell title="Integrations · Event log" status="Alerts on" caption="Illustration of GHL integration events from Stripe, ManyChat and a webhook.">
      <ul className="flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.event} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl bg-ink-800/70 p-3 text-[0.8125rem]">
            <span className="min-w-0">
              <span className="block font-medium text-ink-50">{r.from}</span>
              <span className="block text-ink-400 [overflow-wrap:anywhere]">{r.event}</span>
            </span>
            <span className="flex items-center gap-2 text-ink-200">
              <Icon name="arrow" className="size-4 text-gold-500" />
              {r.to}
            </span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function SetupPanel() {
  const items = ["Domain connected", "Sending domain verified", "Calendar and reminders", "Pipeline stages", "Contacts imported", "Lead follow-up workflow"];
  return (
    <Shell title="Account setup · Checklist" status="Ready for handover" caption="Illustration of a GHL setup checklist with every item complete.">
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-3 rounded-xl bg-ink-800/70 p-3 text-[0.8125rem] text-ink-100">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold-500 text-ink-950">
              <Icon name="check" className="size-3" />
            </span>
            {it}
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function FunnelPanel() {
  const steps = ["Opt-in page", "Booking page", "Order form", "Upsell", "Thank-you page"];
  return (
    <Shell title="Funnel · Consult offer" status="Published" caption="Illustration of a GHL funnel with five connected steps.">
      <div className="grid gap-4 md:grid-cols-[1fr_8.5rem]">
        <ol className="flex flex-col gap-2">
          {steps.map((s) => (
            <li key={s} className="flex items-center justify-between rounded-xl bg-ink-800/70 p-3 text-[0.8125rem]">
              <span className="text-ink-100">{s}</span>
              <span className="text-ink-400">Mobile checked</span>
            </li>
          ))}
        </ol>
        <div aria-hidden className="hidden flex-col gap-2 rounded-2xl bg-ink-50 p-3 md:flex">
          <span className="h-2 w-12 rounded-full bg-ink-950" />
          <span className="mt-2 h-3 w-full rounded bg-ink-300" />
          <span className="h-3 w-4/5 rounded bg-ink-300" />
          <span className="mt-1 h-14 w-full rounded-lg bg-ink-200" />
          <span className="mt-auto h-7 w-full rounded-full bg-gold-500" />
        </div>
      </div>
    </Shell>
  );
}

export function HandoverPanel() {
  const notes = [
    { t: "Fixed", d: "Form trigger pointed at a deleted form. Re-pointed and tested with three test contacts." },
    { t: "Changed", d: "Merged two duplicate reminder workflows into one. Old version archived, not deleted." },
    { t: "Watch", d: "If you rename the consult form, update the trigger filter in 'New inquiry to booked call'." },
  ];
  return (
    <Shell title="Handover notes · Sub-account" status="Shared with your team" caption="Illustration of FixGHL handover notes describing what was fixed and changed.">
      <ul className="flex flex-col gap-2">
        {notes.map((n) => (
          <li key={n.t} className="rounded-xl bg-ink-800/70 p-3 text-[0.8125rem] leading-snug">
            <span className="block font-semibold text-gold-500">{n.t}</span>
            <span className="mt-1 block text-ink-200">{n.d}</span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function FragmentFor({ kind }: { kind: Fragment }) {
  switch (kind) {
    case "workflow": return <WorkflowCanvas compact />;
    case "email": return <EmailAuthPanel />;
    case "pipeline": return <PipelinePanel />;
    case "calendar": return <CalendarPanel />;
    case "saas": return <SaasPanel />;
    case "integrations": return <IntegrationsPanel />;
    case "setup": return <SetupPanel />;
    case "funnel": return <FunnelPanel />;
  }
}
