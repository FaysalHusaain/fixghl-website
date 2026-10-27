"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Guarantees every forward navigation opens at the top of the page.
// Back/forward (popstate) is left alone so the browser restores the previous position.
export function ScrollTop() {
  const pathname = usePathname();
  const fromHistory = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => (fromHistory.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (fromHistory.current) { fromHistory.current = false; return; }
    if (window.location.hash) return;
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    top();
    const raf = requestAnimationFrame(top);
    const t = setTimeout(top, 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [pathname]);

  return null;
}
