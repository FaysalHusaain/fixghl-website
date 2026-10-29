"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

// Live GHL embeds. GHL's embed script (form_embed.js) talks to each widget's built-in resizer, so both iframes
// always match their content: no fixed heights and no inner scrolling. Styling lives in GHL's "Custom code" boxes.
const GHL_HOST = "https://link.codenovahq.com";
const CALENDAR_ID = "EJK8Z8tRUS73r8KUbzFV";
const FORM_ID = "82ZHqKAiWU0WMYKDwZOr";
// Booking and form messages arrive from these hosts.
const GHL_ORIGIN = /(codenovahq\.com|leadconnectorhq\.com|msgsndr\.com|gohighlevel\.com|highlevel\.com)$/i;

type Tab = "call" | "write";

export function BookingModule({ id = "book", headingLevel = 2 }: { id?: string; headingLevel?: 2 | 3 }) {
  const [tab, setTab] = useState<Tab>("call");
  const router = useRouter();
  const H = headingLevel === 2 ? "h2" : "h3";
  const [calendarOn, setCalendarOn] = useState(false); // calendar iframe injected
  const [formOpened, setFormOpened] = useState(false); // the form iframe loads only once "Send details" is opened
  const openTab = (t: Tab) => {
    setTab(t);
    if (t === "write") setFormOpened(true);
  };

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#describe") {
        openTab("write");
        document.getElementById(`${id}-panel-write`)?.scrollIntoView({ block: "start" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [id]);

  // Calendar booking completion from the GHL iframe.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      let host = "";
      try { host = new URL(e.origin).hostname; } catch { return; }
      if (!GHL_ORIGIN.test(host)) return;
      const raw = typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      if (/booking|appointment/i.test(raw) && /complete|confirm|booked|success/i.test(raw)) {
        track("calendar_booked", { method: "ghl_calendar" });
        router.push("/book/thanks?via=calendar");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

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
            onClick={() => openTab(t.key)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const next = tab === "call" ? "write" : "call";
                openTab(next);
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
        <p className="mt-2 max-w-[60ch] text-ink-700">Pick a day and a time, then tell us briefly what you need.</p>
        <GhlFrame kind="calendar" className="mt-6" show={calendarOn} lazy onNear={() => setCalendarOn(true)}>
          {(onReady) => (
            <iframe
              src={`${GHL_HOST}/widget/booking/${CALENDAR_ID}`}
              id={`${CALENDAR_ID}_1793230740499`}
              title="Book a free 30-minute GHL call with FixGHL"
              allow="payment"
              scrolling="no"
              onLoad={onReady}
              style={{ width: "100%", border: "none", overflow: "hidden" }}
            />
          )}
        </GhlFrame>
      </div>

      <div id={`${id}-panel-write`} role="tabpanel" aria-labelledby={`${id}-tab-write`} hidden={tab !== "write"} className="p-3 pt-6 md:p-6">
        <H className="h-sub">Send us the details</H>
        <p className="mt-2 max-w-[60ch] text-ink-700">Tell us what is happening. We reply by email with next steps or a time to talk.</p>
        <GhlFrame kind="form" className="mt-4" show={formOpened}>
          {(onReady) => (
            <iframe
              src={`${GHL_HOST}/widget/form/${FORM_ID}`}
              id={`inline-${FORM_ID}`}
              title="fixGHL"
              onLoad={onReady}
              style={{ width: "100%", height: "100%", border: "none", borderRadius: 8 }}
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="fixGHL"
              data-height="532"
              data-layout-iframe-id={`inline-${FORM_ID}`}
              data-form-id={FORM_ID}
              data-cookie-consent="true"
              data-cookie-consent-provider="auto"
            />
          )}
        </GhlFrame>
      </div>
      {/* GHL's resizer script, once, as soon as the first GHL iframe is on the page. */}
      {(calendarOn || formOpened) && <Script src={`${GHL_HOST}/js/form_embed.js`} strategy="afterInteractive" />}
    </div>
  );
}

// Holds a GHL iframe behind a skeleton the size of the real widget, so there is no blank gap and no jump.
// The widget is drawn when GHL posts "iframeLoaded" (iframe onload is the backstop); the swap waits until the
// resizer has settled the iframe's height.
function GhlFrame({
  kind,
  show,
  lazy = false,
  onNear,
  className = "",
  children,
}: {
  kind: "calendar" | "form";
  show: boolean;
  lazy?: boolean;
  onNear?: () => void;
  className?: string;
  children: (onReady: () => void) => ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);

  // Lazy widgets load when their placeholder comes within 300px of the viewport, or on the visitor's first tap, click
  // or key press, whichever comes first. A placeholder that is already near the screen when the page opens also counts
  // mouse movement, scrolling and focus as that first sign of activity, with a 5s-after-load fallback, so the GHL embed
  // and its third-party cookies never compete with the page's own first load.
  useEffect(() => {
    if (!lazy || show || !onNear || !box.current) return;
    let timer = 0;
    let first = true;
    const near = () => onNear();
    const taps = ["pointerdown", "keydown", "touchstart"] as const;
    const activity = ["pointermove", "wheel", "scroll", "focusin"] as const;
    const arm = () => {
      activity.forEach((e) => window.addEventListener(e, near, { once: true, passive: true }));
      timer = window.setTimeout(near, 5000);
    };
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && !first) near();
        else if (visible) {
          if (document.readyState === "complete") arm();
          else window.addEventListener("load", arm, { once: true });
        }
        first = false;
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(box.current);
    taps.forEach((e) => window.addEventListener(e, near, { once: true, passive: true }));
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("load", arm);
      [...taps, ...activity].forEach((e) => window.removeEventListener(e, near));
    };
  }, [lazy, show, onNear]);
  const [drawn, setDrawn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!show || drawn) return;
    const onMessage = (e: MessageEvent) => {
      const frame = box.current?.querySelector("iframe");
      if (frame && e.source === frame.contentWindow && Array.isArray(e.data) && e.data[0] === "iframeLoaded") setDrawn(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [show, drawn]);

  // Swap once GHL has revealed the iframe and its height has held steady for two checks (or after 6s at most).
  useEffect(() => {
    if (!drawn || ready) return;
    let last = -1;
    let steady = 0;
    const started = Date.now();
    const t = window.setInterval(() => {
      const frame = box.current?.querySelector("iframe");
      const h = frame?.getBoundingClientRect().height ?? 0;
      const revealed = !!frame && frame.style.visibility !== "hidden"; // GHL's form_embed.js has finished its own reveal
      steady = revealed && h > 200 && h === last ? steady + 1 : 0;
      last = h;
      if (steady >= 2 || Date.now() - started > 6000) {
        window.clearInterval(t);
        setReady(true);
      }
    }, 200);
    return () => window.clearInterval(t);
  }, [drawn, ready]);

  const onLoad = () => window.setTimeout(() => setDrawn(true), 1200);

  return (
    <div ref={box} className={className} data-ghl={kind} data-ready={ready}>
      {show && <div className="ghl-stage">{children(onLoad)}</div>}
      <div aria-hidden className={`ghl-skeleton ${kind === "calendar" ? "ghl-skeleton--calendar" : "ghl-skeleton--form"}`}>
        {kind === "calendar" ? <CalendarSkeleton /> : <FormSkeleton />}
      </div>
      {!ready && <span className="sr-only" role="status">Loading the {kind === "calendar" ? "booking calendar" : "form"}</span>}
    </div>
  );
}

const Bar = ({ className }: { className: string }) => <span className={`ghl-shimmer block ${className}`} />;

function CalendarSkeleton() {
  return (
    <div className="rounded-[20px] border border-line bg-white px-5 py-6 sm:px-8">
      <div className="flex items-center justify-center gap-6">
        <Bar className="size-10 rounded-full" />
        <Bar className="h-5 w-32 rounded-full" />
        <Bar className="size-10 rounded-full" />
      </div>
      <div className="mt-6 grid grid-cols-7 justify-items-center gap-y-3">
        {Array.from({ length: 35 }).map((_, i) => (
          <Bar key={i} className={`size-8 rounded-full sm:size-10 ${i < 4 ? "opacity-0" : ""}`} />
        ))}
      </div>
      <Bar className="mt-8 h-4 w-20 rounded-full" />
      <Bar className="mt-3 h-10 w-full max-w-[22rem] rounded-[14px]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="px-1 py-2 sm:px-4">
      {["w-24", "w-16", "w-36"].map((w) => (
        <div key={w} className="mb-6">
          <Bar className={`h-4 rounded-full ${w}`} />
          <Bar className="mt-3 h-[52px] w-full rounded-[14px]" />
        </div>
      ))}
      <Bar className="h-4 w-32 rounded-full" />
      <Bar className="mt-3 h-[110px] w-full rounded-[14px]" />
      <Bar className="mt-8 h-[52px] w-full rounded-full" />
    </div>
  );
}
