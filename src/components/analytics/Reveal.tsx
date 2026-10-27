"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Adds entrance motion to [data-reveal] elements. Content is visible without JS.
// Reads every position first, then writes classes in one pass, so the browser lays the page out once.
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
      const fold = window.innerHeight * 0.92;
      const tops = els.map((el) => el.getBoundingClientRect().top); // read
      const later: HTMLElement[] = [];
      els.forEach((el, i) => (tops[i] < fold ? el.classList.add("is-in") : later.push(el))); // write
      document.documentElement.classList.add("js-reveal");
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("is-in");
            io?.unobserve(e.target);
          }),
        { rootMargin: "0px 0px -8% 0px" }
      );
      later.forEach((el) => io!.observe(el));
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);
  return null;
}
