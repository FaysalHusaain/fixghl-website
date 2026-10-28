"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

// GA4 conversion: fires once each time /book/thanks loads.
export function LeadEvent() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    const via = new URLSearchParams(window.location.search).get("via") ?? "unknown";
    sendGAEvent("event", "generate_lead", { method: via });
  }, []);
  return null;
}
