"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

// GA4 loads on the visitor's first interaction, or 4s after the page has loaded, whichever comes first, so the
// tag never competes with first paint or input. Consent defaults are already set (root layout) and events queue in
// dataLayer until the tag arrives, so page_view and generate_lead are still recorded.
const EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

export function DeferredGA({ gaId }: { gaId: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let timer = 0;
    const go = () => setOn(true);
    const afterLoad = () => (timer = window.setTimeout(go, 4000));
    EVENTS.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", afterLoad);
      EVENTS.forEach((e) => window.removeEventListener(e, go));
    };
  }, []);
  return on ? <GoogleAnalytics gaId={gaId} /> : null;
}
