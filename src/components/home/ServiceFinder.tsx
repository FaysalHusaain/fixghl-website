"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type FinderItem = { href: string; name: string; symptom: string; keywords: string };

// The site's live element: type a problem in your own words and the list narrows to the service that fixes it.
export function ServiceFinder({ items }: { items: FinderItem[] }) {
  const [q, setQ] = useState("");
  const inputId = useId();
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = useMemo(
    () => items.filter((it) => words.every((w) => `${it.name} ${it.symptom} ${it.keywords}`.toLowerCase().includes(w))),
    [items, words]
  );

  return (
    <div data-ui>
      <label htmlFor={inputId} className="sr-only">Describe your problem to find the right service</label>
      <div className="flex items-center gap-3 rounded-2xl bg-ink-900 px-4 md:px-6">
        <Icon name="search" className="size-6 shrink-0 text-ink-400" />
        <input
          id={inputId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “emails in spam”"
          autoComplete="off"
          className="h-16 w-full bg-transparent text-[1.125rem] text-ink-50 outline-none placeholder:text-ink-500 md:h-20 md:text-[1.5rem]"
        />
      </div>
      <ul className="mt-4 flex flex-col" aria-live="polite">
        {shown.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-2xl px-4 py-5 transition-colors hover:bg-gold-500 hover:text-ink-950 focus-visible:bg-gold-500 focus-visible:text-ink-950 md:px-6 md:py-6"
            >
              <span className="font-display text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] font-semibold leading-none tracking-[-0.035em]">{it.name}</span>
              <Icon name="arrow" className="row-span-2 size-6 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-ink-950 md:size-8" />
              <span className="text-ink-400 group-hover:text-ink-800 group-focus-visible:text-ink-800">{it.symptom}</span>
            </Link>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="px-4 py-6 text-ink-300 md:px-6">
            Nothing matches that yet. <Link href="/book#describe" className="link text-ink-50">Describe it to us</Link> and we will tell you where it fits.
          </li>
        )}
      </ul>
    </div>
  );
}
