"use client";

import Link from "next/link";
import { ScrollTopLink } from "@/components/layout/ScrollTopLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/lib/site";

type NavLink = { href: string; label: string };

export function Header({ services, migrations }: { services: NavLink[]; migrations: NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);

  // Close the menu on navigation (state adjusted during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // The mobile menu is a modal <dialog>: showModal() makes the rest of the page inert, moves focus into the menu,
  // closes on Escape and returns focus to the menu button on close.
  useEffect(() => {
    const dialog = menu.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector("[data-menu-scroll]")?.scrollTo(0, 0); // the dialog stays mounted across pages; start at the top
    }
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    // At desktop width the dialog is display:none, so close it rather than leave an inert page behind it.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onWide = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", onWide);
    return () => desktop.removeEventListener("change", onWide);
  }, [open]);

  const isActive = (href: string) => (href === "/services" ? pathname === href : pathname.startsWith(href));

  return (
    // Fixed header over a constant-height spacer: the compact state on scroll never moves the page (no layout shift).
    // Compact mode slides the header up 0.5rem (4.25rem to a visible 3.75rem) and nudges the bar down 0.25rem to stay
    // centred. Both are transforms, so the browser composites them instead of re-laying out the header every frame.
    <div className="h-[var(--header-h)] bg-ink-950">
      <header
        className={`on-dark fixed inset-x-0 top-0 z-50 bg-ink-950 text-ink-50 transition-[translate] duration-200 ${compact ? "-translate-y-2" : ""}`}
      >
        <div
          className={`frame pointer-events-none flex h-[var(--header-h)] items-center justify-between transition-[translate] duration-200 *:pointer-events-auto ${compact ? "translate-y-1" : ""}`}
        >
          <ScrollTopLink label="FixGHL home" className="inline-flex min-h-11 items-center">
            <Logo className="w-[9.25rem] md:w-[10.25rem]" title={null} />
          </ScrollTopLink>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-7 text-small">
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center transition-colors hover:text-ink-50 ${isActive(n.href) ? "text-ink-50" : "text-ink-300"}`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/book" data-track="book_call_click" data-track-location="header" className="btn btn-gold min-h-11 px-5">
              Book a call
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/book" data-track="book_call_click" data-track-location="header_mobile" className="btn btn-gold min-h-11 px-4">
              Book a call
            </Link>
            <button
              type="button"
              className="-mr-2 grid size-11 place-items-center rounded-full text-ink-50"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: the header's transform would otherwise anchor this fixed panel to the header box. The dialog
          sits in the top layer over the whole screen, so it repeats the header bar (logo, Book a call, close) in the same
          place, sized to match the header's current state. */}
      <dialog
        ref={menu}
        id="mobile-menu"
        aria-label="Menu"
        onClose={() => setOpen(false)}
        onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        className="on-dark fixed inset-0 m-0 size-full max-h-none max-w-none flex-col overflow-hidden border-0 bg-ink-950 p-0 text-ink-50 backdrop:bg-transparent open:flex lg:hidden"
      >
        <div className={`frame flex shrink-0 items-center justify-between ${compact ? "h-15" : "h-[var(--header-h)]"}`}>
          <ScrollTopLink label="FixGHL home" className="inline-flex min-h-11 items-center">
            <Logo className="w-[9.25rem] md:w-[10.25rem]" title={null} />
          </ScrollTopLink>
          <div className="flex items-center gap-2">
            <Link href="/book" data-track="book_call_click" data-track-location="header_mobile" className="btn btn-gold min-h-11 px-4">
              Book a call
            </Link>
            <button
              type="button"
              autoFocus
              className="-mr-2 grid size-11 place-items-center rounded-full text-ink-50"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" className="size-6" />
            </button>
          </div>
        </div>
        <div data-menu-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <nav aria-label="Mobile" className="frame flex min-h-full flex-col gap-10 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6">
          <ul className="flex flex-col">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="font-display block py-2.5 text-[2rem] font-semibold tracking-[-0.03em]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-8 text-ink-300 sm:grid-cols-2">
            <div>
              <p className="text-small text-ink-400">Services</p>
              <ul className="mt-3 flex flex-col">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="block py-2 text-ink-100">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-small text-ink-400">Migrations</p>
              <ul className="mt-3 flex flex-col">
                {migrations.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="block py-2 text-ink-100">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <Link href="/book" data-track="book_call_click" data-track-location="mobile_menu" className="btn btn-gold w-full">
              Book a free 30-minute GHL call
            </Link>
            <Link href="/book#describe" className="btn btn-outline-dark w-full">Describe your project</Link>
          </div>
        </nav>
        </div>
      </dialog>
    </div>
  );
}
