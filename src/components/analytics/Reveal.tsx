"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Adds entrance motion to [data-reveal] elements. Content is visible without JS.
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const vh = window.innerHeight;
    els.forEach((el) => el.getBoundingClientRect().top < vh * 0.92 && el.classList.add("is-in"));
    root.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => !el.classList.contains("is-in") && io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
