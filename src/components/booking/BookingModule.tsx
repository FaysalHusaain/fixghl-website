"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
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
  const root = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  // Load both widgets as the module nears the viewport.
  useEffect(() => {
    if (!root.current) return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && (setLoad(true), io.disconnect()), {
      rootMargin: "600px 0px",
    });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

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
    <div id={id} ref={root} className="rounded-[1.75rem] bg-ink-50 p-2 text-ink-950 md:p-3">
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
        <p className="mt-2 max-w-[60ch] text-ink-700">Pick a day and a time, then tell us briefly what you need.</p>
        <div className="mt-6">
          {load ? (
            <iframe
              src={`${GHL_HOST}/widget/booking/${CALENDAR_ID}`}
              id={`${CALENDAR_ID}_1793230740499`}
              title="Book a free 30-minute GHL call with FixGHL"
              allow="payment"
              scrolling="no"
              style={{ width: "100%", border: "none", overflow: "hidden" }}
            />
          ) : (
            <div aria-hidden className="min-h-[36rem] animate-pulse rounded-[20px] bg-ink-100 md:min-h-[44rem]" />
          )}
        </div>
      </div>

      <div id={`${id}-panel-write`} role="tabpanel" aria-labelledby={`${id}-tab-write`} hidden={tab !== "write"} className="p-3 pt-6 md:p-6">
        <H className="h-sub">Send us the details</H>
        <p className="mt-2 max-w-[60ch] text-ink-700">Tell us what is happening. We reply by email with next steps or a time to talk.</p>
        <div className="mt-4">
          {load && (
            <iframe
              src={`${GHL_HOST}/widget/form/${FORM_ID}`}
              id={`inline-${FORM_ID}`}
              title="fixGHL"
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
        </div>
      </div>
      {load && <Script src={`${GHL_HOST}/js/form_embed.js`} strategy="afterInteractive" />}
    </div>
  );
}
