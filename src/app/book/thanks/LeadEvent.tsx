"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

// GA4 conversion: fires once each time /book/thanks loads. gtag() is defined before GA loads (consent defaults in
// the root layout), so the event queues in dataLayer and is sent when the deferred tag arrives.
export function LeadEvent() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track("generate_lead", { method: new URLSearchParams(window.location.search).get("via") ?? "unknown" });
  }, []);
  return null;
}
