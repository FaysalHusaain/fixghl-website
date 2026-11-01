"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// A link that scrolls back to the top instead of reloading when it points at the page you are already on.
// always=true scrolls to the top of the current page from anywhere (footer logo).
export function ScrollTopLink({
  href = "/",
  always = false,
  className,
  label,
  children,
}: {
  href?: string;
  always?: boolean;
  className?: string;
  label: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const toTop = always || pathname === href;
  return (
    <Link
      href={toTop ? pathname || href : href}
      aria-label={toTop ? "Back to top" : label}
      className={className}
      onClick={(e) => {
        if (!toTop) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
      }}
    >
      {children}
    </Link>
  );
}
