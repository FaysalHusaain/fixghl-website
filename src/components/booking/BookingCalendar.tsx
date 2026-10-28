"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type KeyboardEvent } from "react";
import { callNeedOptions } from "@/content/lead";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import { field, fieldLabel } from "./fieldStyles";

// Three steps in one card: day -> time -> details. Availability comes from /api/slots (GHL free slots,
// server-side), the booking goes to /api/book. Everything is shown in the visitor's time zone.

type Step = 1 | 2 | 3;
type Month = { status: "ready"; days: Record<string, string[]>; demo?: boolean } | { status: "error" | "offline" };

const MONTHS_AHEAD = 3;
const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6].map((d) => Date.UTC(2023, 0, 1 + d)); // 1 Jan 2023 was a Sunday

const noop = () => () => {};
const detectZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const utc = (day: string) => Date.parse(`${day}T12:00:00Z`);
const fmt = (opts: Intl.DateTimeFormatOptions, at: number | Date, tz = "UTC") => new Intl.DateTimeFormat(undefined, { ...opts, timeZone: tz }).format(at);
const todayIn = (tz: string) => new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const addDays = (day: string, n: number) => new Date(utc(day) + n * 86_400_000).toISOString().slice(0, 10);

function zoneLabel(tz: string) {
  const city = tz.split("/").pop()!.replace(/_/g, " ");
  const offset = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" }).formatToParts(new Date()).find((p) => p.type === "timeZoneName")?.value;
  return { city, offset: offset ?? "" };
}

export function BookingCalendar() {
  const router = useRouter();
  const detected = useSyncExternalStore(noop, detectZone, () => "");
  const [zoneOverride, setZoneOverride] = useState("");
  const tz = zoneOverride || detected;

  const [offset, setOffset] = useState(0); // months from the current month
  const [cache, setCache] = useState<Record<string, Month>>({});
  const [step, setStep] = useState<Step>(1);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [focusDay, setFocusDay] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [pickingZone, setPickingZone] = useState(false);

  const today = tz ? todayIn(tz) : "";
  const [ty, tm] = today ? today.split("-").map(Number) : [2000, 1];
  const view = new Date(Date.UTC(ty, tm - 1 + offset, 1));
  const y = view.getUTCFullYear();
  const m = view.getUTCMonth();
  const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const key = `${tz}|${y}-${m}`;
  const month = cache[key];

  // Load the visible month once per zone. State updates happen in the async callback only.
  const requested = useRef(new Set<string>());
  useEffect(() => {
    if (!tz || requested.current.has(key)) return;
    requested.current.add(key);
    const params = new URLSearchParams({ start: iso(y, m, 1), end: iso(y, m, daysInMonth), timezone: tz });
    fetch(`/api/slots?${params}`)
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        const next: Month = res.ok ? { status: "ready", days: json.days ?? {}, demo: json.demo } : { status: json.configured === false ? "offline" : "error" };
        setCache((c) => ({ ...c, [key]: next }));
      })
      .catch(() => setCache((c) => ({ ...c, [key]: { status: "error" } })));
  }, [tz, key, y, m, daysInMonth]);
  const reload = () => {
    requested.current.delete(key);
    setCache((c) => {
      const n = { ...c };
      delete n[key];
      return n;
    });
  };

  // A fully booked current month should not be the first thing people see: move on once, automatically.
  const autoAdvanced = useRef(false);
  useEffect(() => {
    if (autoAdvanced.current || offset !== 0 || month?.status !== "ready") return;
    autoAdvanced.current = true;
    if (Object.keys(month.days).length === 0) queueMicrotask(() => setOffset(1));
  }, [month, offset]);

  const days = month?.status === "ready" ? month.days : {};
  const available = (d: string) => (days[d]?.length ?? 0) > 0;
  const firstOpen = Object.keys(days).sort()[0];

  // Keyboard: roving focus across the grid; arrows move by day/week and cross months.
  const gridRef = useRef<HTMLDivElement>(null);
  const moveFocus = useRef(false);
  const rovingDay = focusDay && focusDay.startsWith(iso(y, m, 1).slice(0, 7)) ? focusDay : day && day.startsWith(iso(y, m, 1).slice(0, 7)) ? day : firstOpen ?? (offset === 0 ? today : iso(y, m, 1));

  useEffect(() => {
    if (!moveFocus.current || !focusDay) return;
    const el = gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay}"]`);
    if (el) {
      el.focus();
      moveFocus.current = false;
    }
  });

  function onGridKey(e: KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (!(e.key in steps) && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const from = rovingDay;
    let next = e.key === "Home" ? addDays(from, -new Date(utc(from)).getUTCDay()) : e.key === "End" ? addDays(from, 6 - new Date(utc(from)).getUTCDay()) : addDays(from, steps[e.key]);
    const last = new Date(Date.UTC(ty, tm + MONTHS_AHEAD, 0)).toISOString().slice(0, 10);
    if (next < iso(ty, tm - 1, 1)) next = iso(ty, tm - 1, 1);
    if (next > last) next = last;
    const [ny, nm] = next.split("-").map(Number);
    setOffset((ny - ty) * 12 + (nm - tm));
    setFocusDay(next);
    moveFocus.current = true;
  }

  // Step changes move focus to the new step's heading and keep the card in view.
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepMoved = useRef(false);
  useEffect(() => {
    if (!stepMoved.current) return;
    stepMoved.current = false;
    headingRef.current?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) cardRef.current?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [step]);
  const go = (s: Step) => {
    stepMoved.current = true;
    setStep(s);
  };

  const pickDay = (d: string) => {
    if (!available(d)) return;
    setDay(d);
    setFocusDay(d);
    if (d !== day) setTime(null);
    setNotice("");
    go(2);
  };
  const pickTime = (t: string) => {
    setTime(t);
    go(3);
  };

  const zone = tz ? zoneLabel(tz) : null;
  const timeFmt = (t: string) => fmt({ hour: "numeric", minute: "2-digit" }, new Date(t), tz);
  const dayLong = (d: string) => fmt({ weekday: "long", month: "long", day: "numeric" }, utc(d));
  const openDays = Object.keys(days).filter((d) => d.startsWith(iso(y, m, 1).slice(0, 7))).length;

  if (month?.status === "offline") return <EmailFallback />;

  const zoneControl = zone && (
    <div className="mt-5 text-small text-ink-600">
      {pickingZone ? (
        <label className="block">
          <span className={fieldLabel}>Time zone</span>
          <select
            autoFocus
            className={field}
            value={tz}
            onChange={(e) => {
              setZoneOverride(e.target.value);
              setPickingZone(false);
              setTime(null);
              if (step !== 1) go(1);
            }}
            onBlur={() => setPickingZone(false)}
          >
            {Intl.supportedValuesOf("timeZone").map((z) => (
              <option key={z} value={z}>{z.replace(/_/g, " ")}</option>
            ))}
          </select>
        </label>
      ) : (
        <p>
          Times in {zone.city} time ({zone.offset}).{" "}
          <button type="button" onClick={() => setPickingZone(true)} className="link font-medium text-ink-950">Change time zone</button>
        </p>
      )}
    </div>
  );

  return (
    <div ref={cardRef} className="bk scroll-mt-24 rounded-2xl border border-line bg-white p-4 sm:p-6 md:p-7">
      <div className="flex items-center justify-between gap-4 text-small text-ink-600">
        <span className="whitespace-nowrap">Step {step} of 3</span>
        {month?.status === "ready" && month.demo && <span className="whitespace-nowrap rounded-full bg-ink-100 px-3 py-1 text-ink-700">Preview · sample times</span>}
      </div>

      <div key={step} className="bk-step mt-4">
        {step === 1 && (
          <>
            <div className="flex items-center justify-between gap-3">
              <h3 ref={headingRef} tabIndex={-1} id="bk-month" className="h-sub outline-none" aria-live="polite">
                {tz ? fmt({ month: "long", year: "numeric" }, Date.UTC(y, m, 1)) : "Pick a day"}
              </h3>
              <div className="flex gap-1">
                <MonthButton label="Previous month" disabled={offset === 0 || !tz} onClick={() => setOffset((o) => o - 1)} flip />
                <MonthButton label="Next month" disabled={offset >= MONTHS_AHEAD || !tz} onClick={() => setOffset((o) => o + 1)} />
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              {month?.status === "ready" ? (openDays ? `${openDays} days with open times. Use arrow keys to move between days.` : "No open times this month.") : ""}
            </p>

            <div role="grid" aria-labelledby="bk-month" ref={gridRef} onKeyDown={onGridKey} className="mt-5">
              <div role="row" className="grid grid-cols-7">
                {WEEKDAYS.map((w) => (
                  <span role="columnheader" key={w} aria-label={fmt({ weekday: "long" }, w)} className="pb-2 text-center text-small font-medium text-ink-600">
                    {fmt({ weekday: "short" }, w)}
                  </span>
                ))}
              </div>
              {!tz || !month ? (
                <div aria-hidden className="grid grid-cols-7 gap-y-1.5">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <span key={i} className="mx-auto size-11 animate-pulse rounded-full bg-ink-100 sm:size-12" />
                  ))}
                </div>
              ) : (
                <MonthGrid
                  y={y}
                  m={m}
                  daysInMonth={daysInMonth}
                  today={today}
                  selected={day}
                  roving={rovingDay}
                  available={available}
                  onPick={pickDay}
                  label={(d) => `${dayLong(d)}${available(d) ? `, ${days[d].length} open times` : ", no open times"}`}
                />
              )}
            </div>

            {month?.status === "error" && (
              <div role="alert" className="mt-5 rounded-xl bg-ink-100 p-4">
                <p className="font-semibold">The calendar did not load.</p>
                <p className="mt-1 text-ink-700">Check your connection and try again, or email <a href="mailto:hello@fixghl.com" className="link text-ink-950">hello@fixghl.com</a>.</p>
                <button type="button" className="btn btn-outline-light mt-4" onClick={reload}>Try again</button>
              </div>
            )}
            {month?.status === "ready" && openDays === 0 && (
              <div className="mt-5 flex flex-col items-start gap-3 rounded-xl bg-ink-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-ink-700">No open times left in {fmt({ month: "long" }, Date.UTC(y, m, 1))}.</p>
                {offset < MONTHS_AHEAD && <button type="button" className="btn btn-ink" onClick={() => setOffset((o) => o + 1)}>See next month <Icon name="arrow" className="size-4" /></button>}
              </div>
            )}
            {zoneControl}
          </>
        )}

        {step === 2 && day && (
          <>
            <BackButton onClick={() => go(1)}>Change day</BackButton>
            <h3 ref={headingRef} tabIndex={-1} className="h-sub mt-4 outline-none">{dayLong(day)}</h3>
            <p className="mt-1 text-ink-600">30-minute call · times in {zone?.city} time</p>
            {notice && <p role="alert" className="mt-4 rounded-xl bg-ink-100 p-4 font-medium">{notice}</p>}
            <ul className="mt-5 flex max-h-[26rem] flex-col gap-2 overflow-y-auto overscroll-contain p-1 -m-1" aria-label={`Open times on ${dayLong(day)}`}>
              {(days[day] ?? []).map((t) => (
                <li key={t}>
                  <button type="button" aria-pressed={t === time} onClick={() => pickTime(t)} className="bk-pill">
                    {timeFmt(t)}
                  </button>
                </li>
              ))}
            </ul>
            {month?.status === "ready" && !available(day) && <p className="mt-5 text-ink-700">No open times left on this day. Pick another day.</p>}
            {zoneControl}
          </>
        )}

        {step === 3 && day && time && (
          <>
            <BackButton onClick={() => go(2)}>Change time</BackButton>
            <h3 ref={headingRef} tabIndex={-1} className="h-sub mt-4 outline-none">Your details</h3>
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-ink-100 p-4">
              <Icon name="calendar" className="mt-0.5 size-5 shrink-0" />
              <p>
                <span className="block font-semibold">{dayLong(day)}</span>
                <span className="block text-ink-700">
                  {timeFmt(time)} to {timeFmt(new Date(Date.parse(time) + 30 * 60_000).toISOString())} · {zone?.city} time ({zone?.offset})
                </span>
              </p>
            </div>
            <DetailsForm
              time={time}
              tz={tz}
              onTaken={(message) => {
                reload();
                setTime(null);
                setNotice(message);
                go(2);
              }}
              onDone={() => {
                track("calendar_booked", { method: "fixghl_calendar" });
                router.push("/book/thanks?via=calendar");
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

function MonthGrid({
  y, m, daysInMonth, today, selected, roving, available, onPick, label,
}: {
  y: number; m: number; daysInMonth: number; today: string; selected: string | null; roving: string;
  available: (d: string) => boolean; onPick: (d: string) => void; label: (d: string) => string;
}) {
  const lead = new Date(Date.UTC(y, m, 1)).getUTCDay();
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => iso(y, m, i + 1))];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));

  return (
    <div className="flex flex-col gap-1.5">
      {weeks.map((w, i) => (
        <div role="row" key={i} className="grid grid-cols-7">
          {w.map((d, j) => {
            if (!d) return <span role="gridcell" key={j} />;
            const open = available(d) && d >= today;
            const isSel = d === selected;
            return (
              <span role="gridcell" key={d} aria-selected={isSel} className="grid place-items-center">
                <button
                  type="button"
                  data-day={d}
                  tabIndex={d === roving ? 0 : -1}
                  aria-disabled={!open}
                  aria-label={label(d)}
                  aria-current={d === today ? "date" : undefined}
                  onClick={() => onPick(d)}
                  className="bk-day"
                  data-state={isSel ? "selected" : open ? "open" : "closed"}
                >
                  {Number(d.slice(8))}
                  {d === today && <span aria-hidden className="bk-today" />}
                </button>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function MonthButton({ label, disabled, onClick, flip = false }: { label: string; disabled: boolean; onClick: () => void; flip?: boolean }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-ink-950 disabled:pointer-events-none disabled:opacity-35">
      <Icon name="arrow" className={`size-4 ${flip ? "rotate-180" : ""}`} />
    </button>
  );
}

function BackButton({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button type="button" onClick={onClick} className="-ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 font-medium text-ink-700 hover:text-ink-950">
      <Icon name="arrow" className="size-4 rotate-180" /> {children}
    </button>
  );
}

function DetailsForm({ time, tz, onTaken, onDone }: { time: string; tz: string; onTaken: (message: string) => void; onDone: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { ...Object.fromEntries(new FormData(e.currentTarget).entries()), startTime: time, timezone: tz };
    setStatus("sending");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) return onDone();
      if (json.code === "slot_taken" || json.errors?.startTime) return onTaken(json.message ?? json.errors.startTime);
      setErrors(json.errors ?? {});
      setMessage(json.message ?? "Check the highlighted fields and try again.");
      setStatus("error");
      const first = Object.keys(json.errors ?? {})[0];
      if (first) document.getElementById(`bk-${first}`)?.focus();
    } catch {
      setMessage("The booking did not go through. Check your connection and try again.");
      setStatus("error");
    }
  }

  const err = (k: string) => (errors[k] ? <p id={`bk-${k}-error`} className="mt-2 text-small text-[#b42318]">{errors[k]}</p> : null);
  const described = (k: string) => (errors[k] ? `bk-${k}-error` : undefined);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mt-6 grid gap-5"
      onChange={(e) => {
        const k = (e.target as unknown as HTMLInputElement).name;
        if (errors[k])
          setErrors((all) => {
            const next = { ...all };
            delete next[k];
            return next;
          });
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className={fieldLabel}>Full name</label>
          <input id="bk-name" name="name" autoComplete="name" required className={field} aria-invalid={!!errors.name} aria-describedby={described("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="bk-email" className={fieldLabel}>Email</label>
          <input id="bk-email" name="email" type="email" inputMode="email" autoComplete="email" required className={field} aria-invalid={!!errors.email} aria-describedby={described("email")} />
          {err("email")}
        </div>
      </div>
      <div>
        <label htmlFor="bk-need" className={fieldLabel}>What do you need?</label>
        <select id="bk-need" name="need" required defaultValue="" className={field} aria-invalid={!!errors.need} aria-describedby={described("need")}>
          <option value="" disabled>Choose one</option>
          {callNeedOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
        {err("need")}
      </div>
      <div>
        <label htmlFor="bk-details" className={fieldLabel}>What&rsquo;s going on? <span className="font-normal text-ink-600">(optional)</span></label>
        <textarea id="bk-details" name="details" rows={4} placeholder="A line or two helps us prepare for the call." className={`${field} resize-y`} />
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="bk-company-site">Leave this field empty</label>
        <input id="bk-company-site" name="company_site" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn btn-ink w-full disabled:opacity-60">
        {status === "sending" ? "Confirming…" : "Confirm my call"}
        {status !== "sending" && <Icon name="arrow" className="size-4" />}
      </button>
      <p role="status" aria-live="polite" className="-mt-2 text-small text-[#b42318] empty:hidden">{status === "error" ? message : ""}</p>
      <p className="-mt-2 text-small text-ink-600">You get a confirmation email with the Google Meet link. We use your details only for this call. See our <a href="/privacy" className="link">privacy policy</a>.</p>
    </form>
  );
}

function EmailFallback() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-6 md:p-8">
      <Icon name="calendar" className="size-8 text-ink-950" />
      <p className="font-semibold">Pick a time by email</p>
      <p className="text-ink-700">
        Email <a href="mailto:hello@fixghl.com?subject=Free%2030-minute%20GHL%20call" className="link font-medium text-ink-950">hello@fixghl.com</a> with two or three
        times that suit you and a line about what you need. We confirm the call by email.
      </p>
    </div>
  );
}
