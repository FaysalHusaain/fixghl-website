"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CONSENT_KEY as KEY, track } from "@/lib/analytics";

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

  return (
    <>
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
