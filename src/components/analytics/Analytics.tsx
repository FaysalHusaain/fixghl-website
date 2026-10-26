"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "fixghl-consent";
// Hosts that identify AI assistants in document.referrer. Sent as a GA4 event parameter (ai_source).
const AI_REFERRERS = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "gemini.google.com", "copilot.microsoft.com", "claude.ai"];

const noop = () => () => {};

function readConsent(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

export function Analytics() {
  const stored = useSyncExternalStore(noop, readConsent, () => "pending");
  const [choice, setChoice] = useState<string | null>(null);
  const consent = choice ?? stored;

  // Delegated click tracking for any element with data-track.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track!, { location: el.dataset.trackLocation, link_url: (el as HTMLAnchorElement).href });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const decide = (value: "granted" | "denied") => {
    try { localStorage.setItem(KEY, value); } catch {}
    window.gtag?.("consent", "update", { analytics_storage: value });
    setChoice(value);
  };

  if (!GA_ID) return null;

  const aiSource = typeof document !== "undefined" ? AI_REFERRERS.find((h) => document.referrer.includes(h)) : undefined;

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{analytics_storage:${JSON.stringify(readConsent() === "granted" ? "granted" : "denied")},ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true${aiSource ? `,ai_source:'${aiSource}'` : ""}});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      {consent === null && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 rounded-2xl bg-ink-900 p-5 text-small text-ink-200 shadow-2xl md:bottom-6 md:left-6 md:right-auto md:max-w-sm"
        >
          <p>
            We use Google Analytics cookies to see which pages help people. Nothing is used for ads.{" "}
            <Link href="/privacy" className="text-ink-50 underline underline-offset-4">Privacy policy</Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" className="btn btn-gold min-h-11 flex-1" onClick={() => decide("granted")}>Allow analytics</button>
            <button type="button" className="btn btn-outline-dark min-h-11 flex-1" onClick={() => decide("denied")}>Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
