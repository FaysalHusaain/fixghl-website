"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

// Phones only: a slim booking bar that appears once the hero (or the page's first section) has scrolled away, and
// steps aside while a booking module is on screen. Never on /book pages. Taps are tracked as book_call_click.
export function MobileBookBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [bookingInView, setBookingInView] = useState(false);
  const hidden = pathname.startsWith("/book");

  useEffect(() => {
    if (hidden) return;
    const hero = document.querySelector("[data-hero]") ?? document.querySelector("main section");
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (hero) heroIo.observe(hero);
    const visible = new Set<Element>();
    const bookIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setBookingInView(visible.size > 0);
    });
    document.querySelectorAll("[data-booking-module]").forEach((el) => bookIo.observe(el));
    return () => {
      heroIo.disconnect();
      bookIo.disconnect();
    };
  }, [hidden, pathname]);

  if (hidden) return null;
  const show = pastHero && !bookingInView;
  return (
    <div
      className={`on-dark fixed inset-x-0 bottom-0 z-40 border-t border-ink-800 bg-ink-950 pb-[env(safe-area-inset-bottom)] transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
      data-mobile-book-bar
    >
      <Link
        href="/book"
        tabIndex={show ? 0 : -1}
        data-track="book_call_click"
        data-track-location="mobile_bar"
        className="flex min-h-14 items-center justify-center gap-2 px-4 font-semibold text-ink-50"
      >
        Book a free 30-minute call
        <Icon name="arrow" className="size-4" />
      </Link>
    </div>
  );
}
