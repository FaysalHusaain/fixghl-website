"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import {
  a2p,
  addons,
  aiPlans,
  calculate,
  defaults,
  plans,
  usd,
  voiceAi,
  type A2pId,
  type AddonId,
  type Inputs,
  type PlanId,
} from "@/lib/ghl-pricing";

/* ---------- URL state: every choice lives in the link, so a result can be shared or bookmarked ---------- */

const keys: [keyof Inputs, string][] = [
  ["who", "w"], ["plan", "p"], ["subAccounts", "s"], ["localNumbers", "ln"], ["tollFreeNumbers", "tf"], ["sms", "sms"], ["carrierFees", "cf"],
  ["mms", "mms"], ["callOutMin", "co"], ["callInMin", "ci"], ["recording", "rec"], ["transcription", "tr"], ["a2p", "a2p"],
  ["emails", "em"], ["validations", "ev"], ["aiPlan", "ai"], ["aiSubAccounts", "ais"], ["voiceMin", "vm"], ["voiceRate", "vr"], ["premiumActions", "pa"],
];
const MAX = 10_000_000;

function toQuery(i: Inputs) {
  const q = new URLSearchParams();
  for (const [k, short] of keys) {
    const v = i[k];
    if (v === defaults[k]) continue;
    q.set(short, typeof v === "boolean" ? (v ? "1" : "0") : String(v));
  }
  const ad = Object.entries(i.addons).filter(([, v]) => v && v > 0).map(([k, v]) => `${k}.${v}`).join("-");
  if (ad) q.set("ad", ad);
  return q.toString();
}

function fromQuery(search: string): Inputs {
  const q = new URLSearchParams(search);
  const out: Inputs = { ...defaults, addons: {} };
  const rec = out as unknown as Record<string, unknown>;
  for (const [k, short] of keys) {
    const raw = q.get(short);
    if (raw === null) continue;
    const d = defaults[k];
    if (typeof d === "boolean") rec[k] = raw === "1";
    else if (typeof d === "number") { const num = Math.round(Number(raw)); if (Number.isFinite(num) && num >= 0) rec[k] = Math.min(num, MAX); }
    else rec[k] = raw;
  }
  if (out.who !== "own" && out.who !== "agency") out.who = defaults.who;
  if (!(out.plan in plans)) out.plan = defaults.plan;
  if (!(out.a2p in a2p)) out.a2p = defaults.a2p;
  if (!(out.aiPlan in aiPlans)) out.aiPlan = defaults.aiPlan;
  if (out.voiceRate !== "low" && out.voiceRate !== "high") out.voiceRate = "low";
  out.subAccounts = Math.max(1, out.subAccounts);
  for (const pair of (q.get("ad") ?? "").split("-")) {
    const [k, v] = pair.split(".");
    if (k in addons && Number(v) > 0) out.addons[k as AddonId] = Math.min(Math.round(Number(v)), 999);
  }
  return out;
}

/* ---------- Controls ---------- */

function useTween(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (t: number) => {
      const k = reduce ? 1 : Math.min(1, (t - start) / 380);
      const v = k === 1 ? value : a + (value - a) * (1 - Math.pow(1 - k, 3));
      setShown(v);
      from.current = v;
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return shown;
}

const fmt = (v: number) => v.toLocaleString("en-US");

/** A number with a minus/plus stepper. Typing is free; the value is cleaned on every change. */
function Stepper({ label, value, onChange, step = 1, min = 0, max = MAX, id }: { label: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number; id?: string }) {
  const clamp = (v: number) => Math.max(min, Math.min(Number.isFinite(v) ? Math.round(v) : min, max));
  return (
    <div className="calc-stepper">
      <button type="button" aria-label={`Fewer ${label}`} onClick={() => onChange(clamp(value - step))} disabled={value <= min}>
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden><path d="M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
      </button>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        aria-label={id ? undefined : label}
        value={fmt(value)}
        onChange={(e) => onChange(clamp(Number(e.target.value.replace(/[^\d]/g, "") || 0)))}
        onFocus={(e) => e.target.select()}
      />
      <button type="button" aria-label={`More ${label}`} onClick={() => onChange(clamp(value + step))} disabled={value >= max}>
        <Icon name="plus" className="size-4" />
      </button>
    </div>
  );
}

/** A labelled row: question on the left, stepper on the right (stacks on narrow screens). */
function NumberRow({ label, hint, value, onChange, step, min, max }: { label: string; hint?: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number }) {
  const id = useId();
  return (
    <div className="calc-row">
      <label htmlFor={id} className="min-w-0 flex-1 basis-[12rem]">
        <span className="block text-[1rem] font-medium text-ink-950">{label}</span>
        {hint && <span className="mt-0.5 block text-small text-ink-600">{hint}</span>}
      </label>
      <Stepper id={id} label={label} value={value} onChange={onChange} step={step} min={min} max={max} />
    </div>
  );
}

/** Quick picks for an amount, plus "Other" to type an exact number. */
function Amount({ label, hint, value, choices, onChange, step, unit }: { label: string; hint?: string; value: number; choices: number[]; onChange: (v: number) => void; step: number; unit: string }) {
  const name = useId();
  const [custom, setCustom] = useState(!choices.includes(value));
  const isCustom = custom || !choices.includes(value);
  return (
    <fieldset className="min-w-0">
      <legend className="text-[1rem] font-medium text-ink-950">{label}</legend>
      {hint && <p className="mt-0.5 text-small text-ink-600">{hint}</p>}
      <div className="calc-chips mt-3">
        {choices.map((c) => (
          <label key={c} className="calc-chip">
            <input type="radio" name={name} checked={!isCustom && value === c} onChange={() => { setCustom(false); onChange(c); }} className="sr-only" />
            <span>{c === 0 ? "None" : fmt(c)}</span>
          </label>
        ))}
        <label className="calc-chip">
          <input type="radio" name={name} checked={isCustom} onChange={() => setCustom(true)} className="sr-only" />
          <span>Other</span>
        </label>
      </div>
      {isCustom && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Stepper label={unit} value={value} onChange={onChange} step={step} />
          <span className="text-small text-ink-600">{unit} a month</span>
        </div>
      )}
    </fieldset>
  );
}

function Choice<T extends string>({ label, value, options, onChange, hint }: { label: string; value: T; options: { value: T; title: string; line?: string; disabled?: boolean }[]; onChange: (v: T) => void; hint?: string }) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-[1rem] font-medium text-ink-950">{label}</legend>
      {hint && <p className="mt-0.5 text-small text-ink-600">{hint}</p>}
      <div className={`mt-3 grid gap-2.5 ${options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={value === o.value} disabled={o.disabled} onClick={() => onChange(o.value)} className="calc-option">
            <span className="block font-semibold">{o.title}</span>
            {o.line && <span className="calc-option-line mt-1 block text-small leading-snug">{o.line}</span>}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Switch({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  const id = useId();
  return (
    <div className="calc-row">
      <label htmlFor={id} className="min-w-0 flex-1 basis-[12rem] cursor-pointer">
        <span className="block text-[1rem] font-medium text-ink-950">{label}</span>
        {hint && <span className="mt-0.5 block text-small text-ink-600">{hint}</span>}
      </label>
      <input id={id} type="checkbox" role="switch" className="calc-switch shrink-0" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </div>
  );
}

function Card({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="rounded-[1.75rem] bg-white p-6 md:p-8">
      <h3 id={id} className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink-950 md:text-[1.5rem]">{title}</h3>
      <div className="mt-6 flex flex-col gap-8">{children}</div>
    </section>
  );
}

/* ---------- The calculator ---------- */

const recommendPlan = (who: Inputs["who"], subs: number): PlanId => (who === "own" || subs <= 3 ? "starter" : "unlimited");

export function CostCalculator() {
  const [i, setI] = useState<Inputs>(defaults);
  const [copied, setCopied] = useState("");
  const [inView, setInView] = useState(false);
  const planTouched = useRef(false);
  const used = useRef(false);
  const ready = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const r = useMemo(() => calculate(i), [i]);
  const monthly = useTween(r.monthly);

  // Restore a shared link's choices after hydration (the server renders the defaults).
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (window.location.search) {
        setI(fromQuery(window.location.search));
        planTouched.current = true;
      }
      ready.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keep the link in sync with the choices.
  useEffect(() => {
    if (!ready.current) return;
    const t = setTimeout(() => {
      const q = toQuery(i);
      window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
    }, 250);
    return () => clearTimeout(t);
  }, [i]);

  // Phones: show the total bar while the questions are on screen, and hide it once the summary itself is visible.
  useEffect(() => {
    const el = root.current;
    const summary = document.getElementById("calc-summary");
    if (!el || !summary) return;
    let calcOn = false;
    let summaryOn = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === el) calcOn = e.isIntersecting;
        else summaryOn = e.isIntersecting;
      }
      setInView(calcOn && !summaryOn);
    });
    io.observe(el);
    io.observe(summary);
    return () => io.disconnect();
  }, []);

  const update = (patch: Partial<Inputs>) => {
    setI((prev) => {
      const next = { ...prev, ...patch };
      if ("plan" in patch) planTouched.current = true;
      if (("who" in patch || "subAccounts" in patch) && !planTouched.current) next.plan = recommendPlan(next.who, next.subAccounts);
      if ("who" in patch && patch.who === "own") next.subAccounts = 1;
      if ("subAccounts" in patch && prev.localNumbers === prev.subAccounts) next.localNumbers = next.subAccounts; // numbers follow businesses until changed by hand
      if (next.plan !== "founder" && next.aiPlan === "starter") next.aiPlan = "none";
      next.aiSubAccounts = Math.min(Math.max(1, next.aiSubAccounts), next.subAccounts);
      return next;
    });
    if (!used.current) { used.current = true; track("calculator_used", { tool: "ghl_cost" }); }
  };
  const setAddon = (id: AddonId, q: number) => update({ addons: { ...i.addons, [id]: q } });

  const flash = (what: string) => { setCopied(what); setTimeout(() => setCopied(""), 2000); };
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); flash("link"); track("calculator_share", { tool: "ghl_cost" }); } catch { flash("fail"); }
  };
  const copyBreakdown = async () => {
    const lines = [
      "GoHighLevel cost estimate",
      `Monthly: ${usd(r.monthly)}`,
      r.oneTime ? `One-time A2P registration: ${usd(r.oneTime)}` : "",
      `First year: ${usd(r.yearly)}`,
      "",
      ...r.groups.filter((g) => g.lines.length).flatMap((g) => [`${g.name}: ${usd(g.total)}`, ...g.lines.map((l) => `  ${l.label} (${l.detail}): ${usd(l.amount)}`), ""]),
      "HighLevel's published US prices, checked 25 November 2026. Taxes not included.",
      window.location.href,
    ].filter((l, idx, arr) => !(l === "" && arr[idx - 1] === ""));
    try { await navigator.clipboard.writeText(lines.join("\n")); flash("breakdown"); track("calculator_copy", { tool: "ghl_cost" }); } catch { flash("fail"); }
  };
  const reset = () => { planTouched.current = false; setI({ ...defaults, addons: {} }); };

  const agency = i.who === "agency";
  const subs = i.subAccounts;
  const calls = i.callOutMin + i.callInMin;
  const setCalls = (v: number) => update({ callOutMin: Math.ceil(v / 2), callInMin: Math.floor(v / 2) });
  const recommended = recommendPlan(i.who, subs);
  const cents = Math.round(monthly * 100);
  const addonOrder: AddonId[] = ["whatsapp", "seo", "listings", "prospecting", "clientPortal", "wordpress", "dedicatedIp", "whiteLabelApp", "hipaa", "premiumSupport"];

  return (
    <div ref={root} className="calc" data-calculator>
      <div className="grid items-start gap-5 lg:grid-cols-12 lg:gap-8">
        <div className="flex min-w-0 flex-col gap-4 md:gap-5 lg:col-span-7">
          <Card id="calc-who" title="Who is it for?">
            <Choice
              label="I'm pricing GoHighLevel for"
              value={i.who}
              onChange={(v) => update({ who: v })}
              options={[
                { value: "own", title: "My own business", line: "One business, one account" },
                { value: "agency", title: "My agency's clients", line: "A separate sub-account for each client" },
              ]}
            />
            {agency && <NumberRow label="How many clients?" hint="Each client gets its own sub-account" value={subs} onChange={(v) => update({ subAccounts: v })} min={1} max={1000} />}
            <Choice<PlanId>
              label="Plan"
              hint={`We suggest ${plans[recommended].name} for ${agency ? `${subs} client${subs === 1 ? "" : "s"}` : "one business"}. Change it if you need more.`}
              value={i.plan}
              onChange={(v) => update({ plan: v })}
              options={(Object.keys(plans) as PlanId[]).map((id) => ({ value: id, title: `${plans[id].name}, $${plans[id].price}/mo`, line: plans[id].note }))}
            />
          </Card>

          <Card id="calc-phone" title="Phone and texting">
            <NumberRow label="Phone numbers" hint="$1.15 a month each. Most businesses need one." value={i.localNumbers} onChange={(v) => update({ localNumbers: v })} max={1000} />
            <Amount label="Text messages a month" hint="Sent and received, all businesses together" value={i.sms} choices={[0, 500, 2000, 10000]} onChange={(v) => update({ sms: v })} step={500} unit="texts" />
            <Amount label="Call minutes a month" hint="Calls in and out, all businesses together" value={calls} choices={[0, 300, 600, 2000]} onChange={setCalls} step={100} unit="minutes" />
            <Switch label="I'll text people in the US" hint="Needs A2P registration: $22.50 once, then $1.50 a month" checked={i.a2p !== "none"} onChange={(v) => update({ a2p: v ? (i.a2p === "none" ? "lowvolume" : i.a2p) : "none" })} />
          </Card>

          <Card id="calc-email" title="Email">
            <Amount label="Emails sent a month" hint="Newsletters, follow-ups and automations. $0.675 per 1,000." value={i.emails} choices={[0, 1000, 10000, 50000]} onChange={(v) => update({ emails: v })} step={1000} unit="emails" />
          </Card>

          <Card id="calc-ai" title="AI assistant">
            <Choice
              label="Do you want AI to answer chats and calls?"
              hint="Writing help (Content AI) is free on every plan."
              value={i.aiPlan === "none" ? "none" : i.aiPlan === "unlimited" ? "unlimited" : "growth"}
              onChange={(v) => update({ aiPlan: v as Inputs["aiPlan"] })}
              options={[
                { value: "none", title: "No", line: "Skip AI for now" },
                { value: "growth", title: "Yes, some", line: "$50/mo: 1,000 replies and 100 call minutes" },
                { value: "unlimited", title: "Yes, a lot", line: "$97/mo: unlimited, fair use" },
              ]}
            />
            {agency && i.aiPlan !== "none" && (
              <NumberRow label="How many clients get AI?" hint={`The AI plan is charged per client, up to ${subs}`} value={i.aiSubAccounts} onChange={(v) => update({ aiSubAccounts: v })} min={1} max={subs} />
            )}
          </Card>

          <details className="calc-more group rounded-[1.75rem] bg-white">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 md:px-8 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block font-display text-[1.25rem] font-semibold tracking-[-0.02em]">More options</span>
                <span className="mt-0.5 block text-small text-ink-600">Toll-free numbers, recordings, add-ons and other extras</span>
              </span>
              <Icon name="plus" className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-45" />
            </summary>
            <div className="flex flex-col gap-8 px-6 pb-8 md:px-8">
              <div className="flex flex-col gap-6">
                <h4 className="text-small font-semibold text-ink-950">Phone extras</h4>
                <NumberRow label="Toll-free numbers" hint="$2.15 a month each" value={i.tollFreeNumbers} onChange={(v) => update({ tollFreeNumbers: v })} max={1000} />
                <NumberRow label="Picture messages sent" hint="MMS, $0.022 each" value={i.mms} onChange={(v) => update({ mms: v })} step={100} />
                <Switch label="Record calls" hint="$0.0025 a minute" checked={i.recording} onChange={(v) => update({ recording: v })} />
                <Switch label="Transcribe calls" hint="$0.024 a minute" checked={i.transcription} onChange={(v) => update({ transcription: v })} />
                <Switch label="Include carrier fees" hint="US carriers add about half a cent per text. We use $0.0045 as an average." checked={i.carrierFees} onChange={(v) => update({ carrierFees: v })} />
                {i.a2p !== "none" && (
                  <SelectRow<A2pId>
                    label="A2P brand type"
                    hint={`${usd(a2p[i.a2p].oneTime)} once, then ${usd(a2p[i.a2p].monthly)} a month`}
                    value={i.a2p}
                    onChange={(v) => update({ a2p: v })}
                    options={(["sole", "lowvolume", "standard"] as A2pId[]).map((id) => ({ value: id, label: a2p[id].name }))}
                  />
                )}
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-small font-semibold text-ink-950">Email and AI extras</h4>
                <NumberRow label="Email addresses checked" hint="Email validation, $2.50 per 1,000" value={i.validations} onChange={(v) => update({ validations: v })} step={1000} />
                {i.plan === "founder" && (
                  <Switch label="AI Starter instead" hint="$20 a month per sub-account, Founder plan only. AI assistants only; AI agents are paid per use." checked={i.aiPlan === "starter"} onChange={(v) => update({ aiPlan: v ? "starter" : "none" })} />
                )}
                {(i.aiPlan === "none" || i.aiPlan === "starter") && (
                  <>
                    <NumberRow label="Voice AI minutes, pay per use" hint={`$${voiceAi.low.toFixed(2)} a minute (Gemini Live) without an AI plan, plus phone minutes`} value={i.voiceMin} onChange={(v) => update({ voiceMin: v })} step={50} />
                    {i.voiceMin > 0 && <Switch label="Use GPT Realtime instead" hint={`$${voiceAi.high.toFixed(2)} a minute`} checked={i.voiceRate === "high"} onChange={(v) => update({ voiceRate: v ? "high" : "low" })} />}
                  </>
                )}
                <NumberRow label="Workflow premium actions" hint="$0.01 each, such as AI decision or summary steps" value={i.premiumActions} onChange={(v) => update({ premiumActions: v })} step={500} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-small font-semibold text-ink-950">Add-ons</h4>
                <ul className="flex flex-col">
                  {addonOrder.map((id) => {
                    const ad = addons[id];
                    const qty = i.addons[id] ?? 0;
                    const blocked = id === "dedicatedIp" && i.plan === "starter";
                    return (
                      <li key={id} className="calc-addon">
                        <Switch
                          label={ad.name}
                          hint={blocked ? "Needs the Unlimited or Founder plan" : `$${ad.price} a month${ad.per === "account" ? "" : ` per ${ad.per}`}${ad.note ? `. ${ad.note}` : ""}`}
                          checked={qty > 0}
                          onChange={(v) => setAddon(id, v ? (ad.per === "sub-account" ? subs : 1) : 0)}
                        />
                        {qty > 0 && ad.per !== "account" && (
                          <div className="mt-3">
                            <NumberRow label={ad.per === "site" ? "Sites" : ad.per === "IP" ? "IPs" : "Sub-accounts"} value={qty} onChange={(v) => setAddon(id, v)} min={1} max={1000} />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </details>
        </div>

        {/* Summary */}
        <aside id="calc-summary" className="calc-summary lg:col-span-5" aria-labelledby="calc-total-label">
          <div className="on-dark rounded-[1.75rem] bg-ink-950 p-6 text-ink-50 md:p-8">
            <p id="calc-total-label" className="text-[1rem] text-ink-300">Your monthly cost</p>
            <p className="mt-2 font-display font-semibold leading-none tracking-[-0.045em] tabular-nums text-gold-500">
              <span className="sr-only" aria-live="polite">{usd(r.monthly)} a month</span>
              <span aria-hidden className="text-[clamp(3rem,2rem+4.5vw,4.75rem)]">${fmt(Math.floor(cents / 100))}</span>
              <span aria-hidden className="align-top text-[1.375rem] tracking-[-0.02em]">.{String(cents % 100).padStart(2, "0")}</span>
            </p>
            <p className="mt-3 text-small text-ink-400">
              {r.oneTime > 0 ? `Plus ${usd(r.oneTime)} once for A2P registration. ` : ""}About {usd(r.yearly, 0)} in the first year.
            </p>

            {(agency && subs > 1) || r.rebillable > 0 ? (
              <dl className="mt-6 grid grid-cols-2 gap-4 text-small">
                {agency && subs > 1 && (
                  <div className="rounded-2xl bg-ink-900 p-4">
                    <dt className="text-ink-400">Per client</dt>
                    <dd className="mt-1 text-[1.125rem] font-semibold tabular-nums text-ink-50">{usd(r.perSubAccount)}</dd>
                  </div>
                )}
                {r.rebillable > 0 && (
                  <div className="rounded-2xl bg-ink-900 p-4">
                    <dt className="text-ink-400">You can bill clients</dt>
                    <dd className="mt-1 text-[1.125rem] font-semibold tabular-nums text-ink-50">{usd(r.rebillable)}</dd>
                  </div>
                )}
              </dl>
            ) : null}

            <Link href="/book" data-track="book_call_click" data-track-location="calculator_summary" className="btn btn-gold mt-6 w-full">
              Get it set up for you
              <Icon name="arrow" className="size-4" />
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <button type="button" onClick={copyLink} className="btn btn-outline-dark min-h-11 px-3">{copied === "link" ? "Link copied" : "Copy link"}</button>
              <button type="button" onClick={copyBreakdown} className="btn btn-outline-dark min-h-11 px-3">{copied === "breakdown" ? "Copied" : "Copy breakdown"}</button>
            </div>
            <span className="sr-only" role="status">{copied === "link" ? "Link copied" : copied === "breakdown" ? "Breakdown copied" : copied === "fail" ? "Copy failed" : ""}</span>

            <p className="mt-7 text-small font-semibold text-ink-200">Breakdown</p>
            <div className="mt-1 flex flex-col">
              {r.groups.map((grp) => (
                <details key={grp.id} className="calc-group group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2.5">
                      <Icon name="plus" className="size-3.5 text-ink-500 transition-transform duration-200 group-open:rotate-45" />
                      {grp.name}
                    </span>
                    <span className="tabular-nums text-ink-100">{usd(grp.total)}</span>
                  </summary>
                  {grp.lines.length > 0 ? (
                    <ul className="pb-3 pl-6 text-small">
                      {grp.lines.map((l) => (
                        <li key={l.label} className="flex justify-between gap-4 py-1.5">
                          <span className="min-w-0 text-ink-300">{l.label}<span className="block text-ink-500">{l.detail}</span></span>
                          <span className="shrink-0 tabular-nums text-ink-200">{usd(l.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="pb-3 pl-6 text-small text-ink-500">Nothing added</p>
                  )}
                </details>
              ))}
            </div>

            {r.warnings.length > 0 && (
              <ul className="mt-5 flex flex-col gap-2" role="status">
                {r.warnings.map((w) => (
                  <li key={w} className="rounded-2xl bg-ink-900 px-4 py-3 text-small leading-snug text-gold-400">{w}</li>
                ))}
              </ul>
            )}

            <button type="button" onClick={reset} className="mt-3 min-h-11 w-full text-small text-ink-400 transition-colors hover:text-ink-50">Start again</button>
            <p className="mt-2 text-small leading-relaxed text-ink-500">
              HighLevel&apos;s published US and Canada prices, checked 25 November 2026. Taxes not included.
            </p>
          </div>
        </aside>
      </div>

      {/* Phones: the running total, pinned to the bottom while the calculator is on screen */}
      <a href="#calc-summary" className="calc-mobile-total on-dark lg:hidden" data-show={inView || undefined} tabIndex={inView ? 0 : -1} aria-hidden={!inView}>
        <span>
          <span className="block text-small text-ink-300">Your monthly cost</span>
          <span className="block font-display text-[1.375rem] font-semibold leading-tight tabular-nums text-gold-500">{usd(r.monthly)}</span>
        </span>
        <span className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink-800 px-4 text-small font-semibold text-ink-50">
          See breakdown
          <Icon name="arrowDown" className="size-4" />
        </span>
      </a>
    </div>
  );
}

function SelectRow<T extends string>({ label, hint, value, options, onChange }: { label: string; hint?: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  const id = useId();
  return (
    <div className="calc-row">
      <label htmlFor={id} className="min-w-0 flex-1 basis-[12rem]">
        <span className="block text-[1rem] font-medium text-ink-950">{label}</span>
        {hint && <span className="mt-0.5 block text-small text-ink-600">{hint}</span>}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className="calc-select">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
