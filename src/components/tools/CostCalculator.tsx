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
  presets,
  usd,
  voiceAi,
  type A2pId,
  type AddonId,
  type AiPlanId,
  type Inputs,
  type PlanId,
} from "@/lib/ghl-pricing";

/* ---------- URL state: every choice lives in the link, so a result can be shared or bookmarked ---------- */

const keys: [keyof Inputs, string][] = [
  ["plan", "p"], ["subAccounts", "s"], ["localNumbers", "ln"], ["tollFreeNumbers", "tf"], ["sms", "sms"], ["carrierFees", "cf"],
  ["mms", "mms"], ["callOutMin", "co"], ["callInMin", "ci"], ["recording", "rec"], ["transcription", "tr"], ["a2p", "a2p"],
  ["emails", "em"], ["validations", "ev"], ["aiPlan", "ai"], ["aiSubAccounts", "ais"], ["voiceMin", "vm"], ["voiceRate", "vr"], ["premiumActions", "pa"],
];

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
    else if (typeof d === "number") { const num = Number(raw); if (Number.isFinite(num) && num >= 0) rec[k] = Math.min(num, 10_000_000); }
    else rec[k] = raw;
  }
  if (!(out.plan in plans)) out.plan = defaults.plan;
  if (!(out.a2p in a2p)) out.a2p = defaults.a2p;
  if (!(out.aiPlan in aiPlans)) out.aiPlan = defaults.aiPlan;
  if (out.voiceRate !== "low" && out.voiceRate !== "high") out.voiceRate = "low";
  for (const pair of (q.get("ad") ?? "").split("-")) {
    const [k, v] = pair.split(".");
    if (k in addons && Number(v) > 0) out.addons[k as AddonId] = Math.min(Number(v), 999);
  }
  return out;
}

/* ---------- Small controls ---------- */

function useTween(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (t: number) => {
      const k = reduce ? 1 : Math.min(1, (t - start) / 420);
      const e = 1 - Math.pow(1 - k, 3);
      const v = a + (value - a) * e;
      setShown(v);
      from.current = v;
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return shown;
}

function Segmented<T extends string>({ label, value, options, onChange, hint }: { label: string; value: T; options: { value: T; label: string; disabled?: boolean }[]; onChange: (v: T) => void; hint?: string }) {
  const id = useId();
  return (
    <fieldset className="min-w-0">
      <legend className="text-[0.9375rem] font-medium text-ink-950">{label}</legend>
      <div className="calc-seg mt-3" role="radiogroup" aria-describedby={hint ? `${id}-h` : undefined}>
        {options.map((o) => (
          <label key={o.value} className="calc-seg-item" data-disabled={o.disabled || undefined}>
            <input type="radio" name={id} value={o.value} checked={value === o.value} disabled={o.disabled} onChange={() => onChange(o.value)} className="sr-only" />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {hint && <p id={`${id}-h`} className="mt-2 text-small text-ink-600">{hint}</p>}
    </fieldset>
  );
}

function Switch({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  const id = useId();
  return (
    <div className="flex min-h-11 items-center justify-between gap-6">
      <label htmlFor={id} className="min-w-0 cursor-pointer">
        <span className="block text-[0.9375rem] font-medium text-ink-950">{label}</span>
        {hint && <span className="mt-0.5 block text-small text-ink-600">{hint}</span>}
      </label>
      <input id={id} type="checkbox" role="switch" className="calc-switch shrink-0" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </div>
  );
}

const SLIDER_MAX = { sms: 100_000, emails: 500_000, minutes: 20_000, small: 50, voice: 5_000, validations: 100_000, actions: 100_000 } as const;

function NumberField({ label, value, onChange, hint, max, step = 1, slider, unit }: { label: string; value: number; onChange: (v: number) => void; hint?: string; max: number; step?: number; slider?: boolean; unit?: string }) {
  const id = useId();
  const clamp = (v: number) => Math.max(0, Math.min(Number.isFinite(v) ? v : 0, 10_000_000));
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <label htmlFor={id} className="min-w-0 flex-1 basis-[13rem]">
          <span className="block text-[0.9375rem] font-medium text-ink-950">{label}</span>
          {hint && <span className="mt-0.5 block text-small text-ink-600">{hint}</span>}
        </label>
        <div className="calc-stepper shrink-0">
          <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(clamp(value - step))} disabled={value <= 0}>
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden><path d="M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
          </button>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            value={value.toLocaleString("en-US")}
            onChange={(e) => onChange(clamp(Number(e.target.value.replace(/[^\d]/g, ""))))}
            onFocus={(e) => e.target.select()}
            aria-describedby={unit ? `${id}-u` : undefined}
          />
          <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(clamp(value + step))}>
            <Icon name="plus" className="size-4" />
          </button>
        </div>
      </div>
      {unit && <span id={`${id}-u`} className="sr-only">{unit}</span>}
      {slider && (
        <input
          type="range"
          className="calc-range mt-4 w-full"
          min={0}
          max={max}
          step={step}
          value={Math.min(value, max)}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${label} slider`}
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
        />
      )}
    </div>
  );
}

function Step({ title, subtotal, children, id }: { title: string; subtotal?: number; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="rounded-[1.75rem] bg-white p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h3 id={id} className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink-950 md:text-[1.5rem]">{title}</h3>
        {subtotal !== undefined && <p className="shrink-0 text-[0.9375rem] tabular-nums text-ink-600"><span className="sr-only">Subtotal </span>{usd(subtotal)}<span className="text-ink-500">/mo</span></p>}
      </div>
      <div className="mt-6 flex flex-col gap-7">{children}</div>
    </section>
  );
}

/* ---------- The calculator ---------- */

export function CostCalculator() {
  const [i, setI] = useState<Inputs>(defaults);
  const [preset, setPreset] = useState<string | null>("solo");
  const [copied, setCopied] = useState<string>("");
  const used = useRef(false);
  const hydrated = useRef(false);
  const r = useMemo(() => calculate(i), [i]);
  const monthly = useTween(r.monthly);

  useEffect(() => {
    // Restore a shared link's choices after hydration (the server renders the defaults).
    const raf = requestAnimationFrame(() => {
      if (window.location.search) {
        const fromUrl = fromQuery(window.location.search);
        setI(fromUrl);
        setPreset(presets.find((p) => toQuery(p.inputs) === toQuery(fromUrl))?.id ?? null);
      }
      hydrated.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const t = setTimeout(() => {
      const q = toQuery(i);
      window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
    }, 250);
    return () => clearTimeout(t);
  }, [i]);

  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => {
    setI((prev) => {
      const next = { ...prev, [k]: v };
      if (k === "plan" && v !== "founder" && next.aiPlan === "starter") next.aiPlan = "none";
      return next;
    });
    setPreset(null);
    if (!used.current) { used.current = true; track("calculator_used", { tool: "ghl_cost" }); }
  };
  const setAddon = (id: AddonId, q: number) => set("addons", { ...i.addons, [id]: q });

  const applyPreset = (id: string) => {
    const p = presets.find((x) => x.id === id);
    if (!p) return;
    setI({ ...p.inputs, addons: { ...p.inputs.addons } });
    setPreset(id);
    track("calculator_preset", { tool: "ghl_cost", preset: id });
  };

  const flash = (what: string) => { setCopied(what); setTimeout(() => setCopied(""), 2000); };
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); flash("link"); track("calculator_share", { tool: "ghl_cost" }); } catch { flash("fail"); }
  };
  const copyBreakdown = async () => {
    const lines = [
      `GoHighLevel cost estimate (fixghl.com/resources/gohighlevel-cost-calculator)`,
      `Monthly: ${usd(r.monthly)}`,
      r.oneTime ? `One-time A2P registration: ${usd(r.oneTime)}` : "",
      `Per year: ${usd(r.yearly)}`,
      "",
      ...r.groups.filter((g) => g.lines.length).flatMap((g) => [`${g.name}: ${usd(g.total)}`, ...g.lines.map((l) => `  ${l.label} (${l.detail}): ${usd(l.amount)}`)]),
      "",
      "Estimate from HighLevel's published US prices. Taxes and WhatsApp conversation fees not included.",
      `Open it: ${window.location.href}`,
    ].filter((l, idx, arr) => l !== "" || arr[idx - 1] !== "");
    try { await navigator.clipboard.writeText(lines.join("\n")); flash("breakdown"); track("calculator_copy", { tool: "ghl_cost" }); } catch { flash("fail"); }
  };
  const reset = () => { setI({ ...defaults, addons: {} }); setPreset("solo"); };

  const g = (id: string) => r.groups.find((x) => x.id === id)!.total;
  const voicePaid = i.aiPlan === "none" || i.aiPlan === "starter";
  const subs = Math.max(1, i.subAccounts);
  const totalCents = Math.round(monthly * 100);
  const dollars = Math.floor(totalCents / 100);
  const cents = String(totalCents % 100).padStart(2, "0");

  const addonOrder: AddonId[] = ["whatsapp", "seo", "listings", "prospecting", "clientPortal", "wordpress", "dedicatedIp", "whiteLabelApp", "hipaa", "premiumSupport"];

  return (
    <div className="calc" data-calculator>
      {/* Phone: the running total stays in view while you change things */}
      <a href="#calc-summary" className="calc-mobile-total on-dark lg:hidden">
        <span className="text-small text-ink-300">Estimated monthly</span>
        <span className="font-display text-[1.25rem] font-semibold tabular-nums text-gold-500">{usd(r.monthly)}</span>
      </a>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-7 md:gap-5">
          <section aria-labelledby="calc-start" className="rounded-[1.75rem] bg-white p-6 md:p-8">
            <h3 id="calc-start" className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] md:text-[1.5rem]">Start from a typical setup</h3>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-3" role="radiogroup" aria-label="Typical setups">
              {presets.map((p) => (
                <button key={p.id} type="button" role="radio" aria-checked={preset === p.id} onClick={() => applyPreset(p.id)} className="calc-preset">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="mt-1 block text-small leading-snug opacity-75">{p.line}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-small text-ink-600">Then change anything below. The total updates as you go.</p>
          </section>

          <Step id="calc-plan" title="Plan" subtotal={g("plan")}>
            <div className="grid gap-2.5 sm:grid-cols-3" role="radiogroup" aria-label="GoHighLevel plan">
              {(Object.keys(plans) as PlanId[]).map((id) => (
                <button key={id} type="button" role="radio" aria-checked={i.plan === id} onClick={() => set("plan", id)} className="calc-plan">
                  <span className="block font-semibold">{plans[id].name}</span>
                  <span className="calc-plan-price mt-3 block font-display text-[1.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">${plans[id].price}<span className="text-[0.9375rem] font-medium tracking-normal opacity-70">/mo</span></span>
                  <span className="mt-3 block text-small leading-snug opacity-75">{plans[id].note}</span>
                </button>
              ))}
            </div>
            <NumberField label="Sub-accounts" hint="One per business or client you run in GoHighLevel" value={i.subAccounts} onChange={(v) => set("subAccounts", Math.max(1, v))} max={SLIDER_MAX.small} />
          </Step>

          <Step id="calc-phone" title="Phone and texting" subtotal={g("phone")}>
            <div className="grid gap-7 sm:grid-cols-2">
              <NumberField label="Local numbers" hint="$1.15 a month each" value={i.localNumbers} onChange={(v) => set("localNumbers", v)} max={SLIDER_MAX.small} />
              <NumberField label="Toll-free numbers" hint="$2.15 a month each" value={i.tollFreeNumbers} onChange={(v) => set("tollFreeNumbers", v)} max={SLIDER_MAX.small} />
            </div>
            <NumberField label="Text messages a month" hint="Segments sent and received, across all sub-accounts. A long text can be 2 or 3 segments." value={i.sms} onChange={(v) => set("sms", v)} max={SLIDER_MAX.sms} step={500} slider unit="segments" />
            <Switch label="Include carrier fees" hint="US carriers add about half a cent per text. We use $0.0045 as an average." checked={i.carrierFees} onChange={(v) => set("carrierFees", v)} />
            <NumberField label="Picture messages (MMS) sent" hint="$0.022 each" value={i.mms} onChange={(v) => set("mms", v)} max={SLIDER_MAX.sms} step={100} />
            <div className="grid gap-7 sm:grid-cols-2">
              <NumberField label="Outbound call minutes" hint="$0.0166 a minute" value={i.callOutMin} onChange={(v) => set("callOutMin", v)} max={SLIDER_MAX.minutes} step={100} slider unit="minutes" />
              <NumberField label="Inbound call minutes" hint="$0.01165 a minute" value={i.callInMin} onChange={(v) => set("callInMin", v)} max={SLIDER_MAX.minutes} step={100} slider unit="minutes" />
            </div>
            <Switch label="Record calls" hint="$0.0025 a minute" checked={i.recording} onChange={(v) => set("recording", v)} />
            <Switch label="Transcribe calls" hint="$0.024 a minute" checked={i.transcription} onChange={(v) => set("transcription", v)} />
            <Segmented<A2pId>
              label="A2P 10DLC registration"
              value={i.a2p}
              onChange={(v) => set("a2p", v)}
              options={[
                { value: "none", label: "None" },
                { value: "sole", label: "Sole Prop" },
                { value: "lowvolume", label: "Low Volume" },
                { value: "standard", label: "High Volume" },
              ]}
              hint={i.a2p === "none" ? "Needed to text US numbers from a local number." : `${usd(a2p[i.a2p].oneTime)} once, then ${usd(a2p[i.a2p].monthly)} a month for the campaign.`}
            />
          </Step>

          <Step id="calc-email" title="Email" subtotal={g("email")}>
            <NumberField label="Emails sent a month" hint="$0.675 per 1,000 on every plan" value={i.emails} onChange={(v) => set("emails", v)} max={SLIDER_MAX.emails} step={1000} slider unit="emails" />
            <NumberField label="Email addresses validated" hint="$2.50 per 1,000 checks" value={i.validations} onChange={(v) => set("validations", v)} max={SLIDER_MAX.validations} step={1000} />
          </Step>

          <Step id="calc-ai" title="AI" subtotal={g("ai")}>
            <Segmented<AiPlanId>
              label="AI Employee plan"
              value={i.aiPlan}
              onChange={(v) => set("aiPlan", v)}
              options={[
                { value: "none", label: "None" },
                { value: "starter", label: "$20", disabled: i.plan !== "founder" },
                { value: "growth", label: "$50" },
                { value: "unlimited", label: "$97" },
              ]}
              hint={`${aiPlans[i.aiPlan].name === "None" ? "No AI plan" : aiPlans[i.aiPlan].name}: ${aiPlans[i.aiPlan].note}${i.plan !== "founder" ? " The $20 plan needs the Founder plan." : ""} Content AI and the AI builders are free on every plan.`}
            />
            {i.aiPlan !== "none" && (
              <NumberField label="Sub-accounts with the AI plan" hint={`Up to ${subs}`} value={Math.min(i.aiSubAccounts, subs)} onChange={(v) => set("aiSubAccounts", Math.min(v, subs))} max={SLIDER_MAX.small} />
            )}
            {voicePaid ? (
              <>
                <NumberField label="Voice AI minutes a month" hint="Paid per minute without the $50 or $97 plan. Phone minutes are charged as well." value={i.voiceMin} onChange={(v) => set("voiceMin", v)} max={SLIDER_MAX.voice} step={50} slider unit="minutes" />
                {i.voiceMin > 0 && (
                  <Segmented<"low" | "high">
                    label="Voice AI model"
                    value={i.voiceRate}
                    onChange={(v) => set("voiceRate", v)}
                    options={[
                      { value: "low", label: `Gemini Live, $${voiceAi.low.toFixed(2)}/min` },
                      { value: "high", label: `GPT Realtime, $${voiceAi.high.toFixed(2)}/min` },
                    ]}
                  />
                )}
              </>
            ) : (
              <p className="rounded-2xl bg-ink-100 p-4 text-small leading-relaxed text-ink-800">
                {i.aiPlan === "growth" ? "Includes 100 Voice AI minutes and 1,000 Conversation AI replies a month per sub-account." : "Voice AI and Conversation AI are unlimited, subject to fair use."} Voice AI calls still use phone minutes, so add them under Phone and texting.
              </p>
            )}
          </Step>

          <Step id="calc-addons" title="Add-ons" subtotal={g("addons")}>
            <ul className="-my-2 flex flex-col">
              {addonOrder.map((id) => {
                const ad = addons[id];
                const qty = i.addons[id] ?? 0;
                const on = qty > 0;
                const blocked = id === "dedicatedIp" && i.plan === "starter";
                return (
                  <li key={id} className="calc-addon" data-on={on || undefined}>
                    <Switch
                      label={ad.name}
                      hint={`$${ad.price}${ad.per === "account" ? " a month" : ` a month per ${ad.per}`}${ad.note ? `. ${ad.note}` : ""}${blocked ? ". Not on Starter" : ""}`}
                      checked={on}
                      onChange={(v) => setAddon(id, v ? 1 : 0)}
                    />
                    {on && ad.per !== "account" && (
                      <div className="mt-3 pb-1">
                        <NumberField label={`${ad.per === "site" ? "Sites" : ad.per === "IP" ? "IPs" : "Sub-accounts"}`} value={qty} onChange={(v) => setAddon(id, Math.max(1, v))} max={SLIDER_MAX.small} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <NumberField label="Workflow premium actions a month" hint="$0.01 each, such as AI decision and summarize steps" value={i.premiumActions} onChange={(v) => set("premiumActions", v)} max={SLIDER_MAX.actions} step={500} />
          </Step>
        </div>

        {/* Summary */}
        <aside id="calc-summary" className="lg:col-span-5" aria-labelledby="calc-total-label">
          <div className="on-dark rounded-[1.75rem] bg-ink-950 p-6 text-ink-50 md:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <p id="calc-total-label" className="text-[0.9375rem] text-ink-300">Your estimated monthly cost</p>
            <p className="mt-2 font-display font-semibold leading-none tracking-[-0.045em] tabular-nums text-gold-500" aria-live="polite" aria-atomic="true">
              <span className="sr-only">{usd(r.monthly)} a month</span>
              <span aria-hidden className="text-[clamp(3.25rem,2rem+5vw,5.25rem)]">${dollars.toLocaleString("en-US")}</span>
              <span aria-hidden className="align-top text-[1.5rem] tracking-[-0.02em]">.{cents}</span>
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-small">
              <div>
                <dt className="text-ink-400">Per year</dt>
                <dd className="mt-1 text-[1.0625rem] font-medium tabular-nums text-ink-50">{usd(r.yearly, 0)}</dd>
              </div>
              <div>
                <dt className="text-ink-400">First month</dt>
                <dd className="mt-1 text-[1.0625rem] font-medium tabular-nums text-ink-50">{usd(r.firstMonth)}</dd>
              </div>
              {subs > 1 && (
                <div>
                  <dt className="text-ink-400">Per sub-account</dt>
                  <dd className="mt-1 text-[1.0625rem] font-medium tabular-nums text-ink-50">{usd(r.perSubAccount)}</dd>
                </div>
              )}
              {r.rebillable > 0 && (
                <div>
                  <dt className="text-ink-400">You can rebill</dt>
                  <dd className="mt-1 text-[1.0625rem] font-medium tabular-nums text-ink-50">{usd(r.rebillable)}</dd>
                </div>
              )}
            </dl>

            <div className="mt-7 flex flex-col">
              {r.groups.map((grp) => (
                <details key={grp.id} className="calc-group group" open={grp.id === "phone" || undefined}>
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2.5">
                      <Icon name="plus" className="size-3.5 text-ink-500 transition-transform duration-200 group-open:rotate-45" />
                      {grp.name}
                    </span>
                    <span className="tabular-nums text-ink-200">{usd(grp.total)}</span>
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
                    <p className="pb-3 pl-6 text-small text-ink-500">Nothing selected</p>
                  )}
                </details>
              ))}
              {r.oneTime > 0 && (
                <p className="flex justify-between gap-4 pt-3 text-small text-ink-300">
                  <span>One-time A2P registration</span>
                  <span className="tabular-nums text-ink-200">{usd(r.oneTime)}</span>
                </p>
              )}
            </div>

            {r.warnings.length > 0 && (
              <ul className="mt-5 flex flex-col gap-2" role="status">
                {r.warnings.map((w) => (
                  <li key={w} className="rounded-2xl bg-gold-500/12 px-4 py-3 text-small leading-snug text-gold-400">{w}</li>
                ))}
              </ul>
            )}

            <Link href="/book" data-track="book_call_click" data-track-location="calculator_summary" className="btn btn-gold mt-7 w-full">
              Get it set up for you
              <Icon name="arrow" className="size-4" />
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <button type="button" onClick={copyLink} className="btn btn-outline-dark min-h-11 px-3">{copied === "link" ? "Link copied" : "Copy link"}</button>
              <button type="button" onClick={copyBreakdown} className="btn btn-outline-dark min-h-11 px-3">{copied === "breakdown" ? "Copied" : "Copy breakdown"}</button>
            </div>
            <span className="sr-only" role="status">{copied === "link" ? "Link copied" : copied === "breakdown" ? "Breakdown copied" : copied === "fail" ? "Copy failed" : ""}</span>
            <button type="button" onClick={reset} className="mt-4 min-h-11 w-full text-small text-ink-400 transition-colors hover:text-ink-50">Reset</button>
            <p className="mt-2 text-small leading-relaxed text-ink-500">
              Estimate from HighLevel&apos;s published US and Canada prices, checked 25 November 2026. Excludes taxes, WhatsApp conversation fees and Conversation AI pay-per-use, which is billed by tokens.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
