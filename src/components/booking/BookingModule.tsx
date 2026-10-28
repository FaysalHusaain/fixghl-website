"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { needOptions, urgencyOptions, platformOptions } from "@/content/lead";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import { BookingCalendar } from "./BookingCalendar";
import { field, fieldLabel as label } from "./fieldStyles";

type Tab = "call" | "write";

export function BookingModule({ id = "book", headingLevel = 2 }: { id?: string; headingLevel?: 2 | 3 }) {
  const [tab, setTab] = useState<Tab>("call");
  const H = headingLevel === 2 ? "h2" : "h3";

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#describe") {
        setTab("write");
        document.getElementById(`${id}-panel-write`)?.scrollIntoView({ block: "start" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [id]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "call", label: "Book a call" },
    { key: "write", label: "Prefer to write? Send details" },
  ];

  return (
    <div id={id} className="rounded-[1.75rem] bg-ink-50 p-2 text-ink-950 md:p-3">
      <div role="tablist" aria-label="How would you like to start?" className="grid grid-cols-2 gap-1 rounded-[1.25rem] bg-ink-100 p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            id={`${id}-tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls={`${id}-panel-${t.key}`}
            tabIndex={tab === t.key ? 0 : -1}
            onClick={() => setTab(t.key)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const next = tab === "call" ? "write" : "call";
                setTab(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }
            }}
            className={`min-h-12 rounded-[1rem] px-3 text-small font-semibold leading-tight transition-colors ${
              tab === t.key ? "bg-ink-950 text-ink-50" : "text-ink-700 hover:text-ink-950"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id={`${id}-panel-call`} role="tabpanel" aria-labelledby={`${id}-tab-call`} hidden={tab !== "call"} className="p-3 pt-6 md:p-6">
        <H className="h-sub">Pick a time for a free 30-minute call</H>
        <p className="mt-2 max-w-[60ch] text-ink-700">Choose a day, then a time. The call runs on Google Meet.</p>
        <div className="mt-6">
          <BookingCalendar />
        </div>
      </div>

      <div id={`${id}-panel-write`} role="tabpanel" aria-labelledby={`${id}-tab-write`} hidden={tab !== "write"} className="p-3 pt-6 md:p-6">
        <H className="h-sub">Send us the details</H>
        <p className="mt-2 max-w-[60ch] text-ink-700">Tell us what is happening. We reply by email with next steps or a time to talk.</p>
        <LeadForm />
      </div>
    </div>
  );
}

function LeadForm() {
  const router = useRouter();
  const [need, setNeed] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (res.ok && json.ok) {
        track("form_submit", { need: String(data.need), urgency: String(data.urgency) });
        router.push("/book/thanks?via=form");
        return;
      }
      setErrors(json.errors ?? {});
      setMessage(json.message ?? "Check the highlighted fields and try again.");
      setStatus("error");
      const first = Object.keys(json.errors ?? {})[0];
      if (first) document.getElementById(`lead-${first}`)?.focus();
    } catch {
      setMessage("Your message did not go through. Check your connection and try again.");
      setStatus("error");
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`lead-${k}-error`} className="mt-2 text-small text-[#b42318]">{errors[k]}</p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5 md:grid-cols-2">
      <div>
        <label htmlFor="lead-name" className={label}>Name</label>
        <input id="lead-name" name="name" autoComplete="name" required className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "lead-name-error" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="lead-email" className={label}>Email</label>
        <input id="lead-email" name="email" type="email" inputMode="email" autoComplete="email" required className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "lead-email-error" : undefined} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="lead-need" className={label}>What do you need?</label>
        <select id="lead-need" name="need" required value={need} onChange={(e) => setNeed(e.target.value)} className={field} aria-invalid={!!errors.need}>
          <option value="" disabled>Choose one</option>
          {needOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
        {err("need")}
      </div>
      {need === "Migration" ? (
        <div>
          <label htmlFor="lead-platform" className={label}>Moving from</label>
          <select id="lead-platform" name="platform" defaultValue="" className={field}>
            <option value="" disabled>Choose a platform</option>
            {platformOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor="lead-website" className={label}>Website or GHL account URL <span className="font-normal text-ink-600">(optional)</span></label>
          <input id="lead-website" name="website" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" className={field} aria-invalid={!!errors.website} />
          {err("website")}
        </div>
      )}
      <fieldset className="md:col-span-2">
        <legend className={label}>How urgent is it?</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {urgencyOptions.map((o) => (
            <label key={o} className="relative">
              <input type="radio" name="urgency" value={o} required className="peer sr-only" id={o === urgencyOptions[0] ? "lead-urgency" : undefined} />
              <span className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-white px-2 text-center text-small font-medium shadow-[inset_0_0_0_1.5px_var(--color-ink-200)] transition-colors peer-checked:bg-ink-950 peer-checked:text-ink-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink-950">
                {o}
              </span>
            </label>
          ))}
        </div>
        {err("urgency")}
      </fieldset>
      <div className="md:col-span-2">
        <label htmlFor="lead-details" className={label}>What is happening?</label>
        <textarea
          id="lead-details"
          name="details"
          rows={5}
          required
          placeholder="For example: our booking reminder workflow stopped sending after we changed the form."
          className={`${field} resize-y`}
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? "lead-details-error" : undefined}
        />
        {err("details")}
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="lead-company-site">Leave this field empty</label>
        <input id="lead-company-site" name="company_site" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="text-small text-ink-600">We use your details only to reply. See our <a href="/privacy" className="link">privacy policy</a>.</p>
        <button type="submit" disabled={status === "sending"} className="btn btn-ink w-full md:w-auto disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send details"}
          <Icon name="arrow" className="size-4" />
        </button>
      </div>
      <p role="status" aria-live="polite" className="text-small text-[#b42318] md:col-span-2">{status === "error" ? message : ""}</p>
    </form>
  );
}
