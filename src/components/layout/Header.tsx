"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/lib/site";

type NavLink = { href: string; label: string };

export function Header({ services, migrations }: { services: NavLink[]; migrations: NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

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
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/services" ? pathname === href : pathname.startsWith(href));

  return (
    // Fixed header over a constant-height spacer: the compact state on scroll never moves the page (no layout shift).
    <div className="h-[var(--header-h)] bg-ink-950">
      <header className="on-dark fixed inset-x-0 top-0 z-50 bg-ink-950 text-ink-50">
        <div
          className={`frame flex items-center justify-between transition-[height] duration-200 ${compact ? "h-15" : "h-[var(--header-h)]"}`}
        >
          <Link href="/" aria-label="FixGHL home" className="inline-flex min-h-11 items-center">
            <Logo className="w-[9.25rem] md:w-[10.25rem]" title={null} />
          </Link>

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
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} className="size-6" />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          style={{ top: compact ? "3.75rem" : "var(--header-h)" }}
          className="fixed inset-x-0 bottom-0 overflow-y-auto overscroll-contain bg-ink-950 lg:hidden"
        >
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
      </header>
    </div>
  );
}
