"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

// Phones only: a booking bar that appears once the first screen has scrolled away.
export function MobileBookBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const hidden = pathname.startsWith("/book");

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;
  return (
    <div
      className={`on-dark fixed inset-x-0 bottom-0 z-40 bg-ink-950 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <Link
          href="/book"
          tabIndex={show ? 0 : -1}
          data-track="book_call_click"
          data-track-location="mobile_bar"
          className="btn btn-gold flex-1"
        >
          Book a free 30-minute call
          <Icon name="arrow" className="size-4" />
        </Link>
        <Link
          href="/book#describe"
          tabIndex={show ? 0 : -1}
          className="grid size-[3.25rem] shrink-0 place-items-center rounded-full text-ink-50 shadow-[inset_0_0_0_1.5px_var(--color-ink-700)]"
          aria-label="Describe your issue instead"
        >
          <Icon name="pen" className="size-5" />
        </Link>
      </div>
    </div>
  );
}
