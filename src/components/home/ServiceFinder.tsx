"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type FinderItem = { href: string; name: string; symptom: string; keywords: string };

const STOP = new Set(["the", "and", "not", "our", "my", "for", "from", "with", "want", "need", "help", "ghl", "gohighlevel", "can", "how", "are", "isn", "doesn", "don", "won", "into"]);

const examples = ["workflow not firing", "emails in spam", "moving from ClickFunnels", "SaaS mode", "Stripe not syncing"];

// Type a problem in your own words and the list narrows to the service that handles it. Each row opens that service's page.
export function ServiceFinder({ items }: { items: FinderItem[] }) {
  const [q, setQ] = useState("");
  const inputId = useId();
  const helpId = useId();
  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w));
    if (!words.length) return items;
    return items
      .map((it) => {
        const hay = `${it.name} ${it.symptom} ${it.keywords}`.toLowerCase();
        return { it, score: words.filter((w) => hay.includes(w) || hay.includes(w.replace(/(ing|s)$/, ""))).length };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.it);
  }, [items, q]);

  return (
    <div data-ui data-finder>
      <label htmlFor={inputId} className="font-semibold text-ink-50">What is going wrong, or what do you need?</label>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-ink-900 px-4 md:px-6">
        <Icon name="search" className="size-6 shrink-0 text-ink-400" />
        <input
          id={inputId}
          data-finder-input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Describe it in your own words"
          aria-describedby={helpId}
          autoComplete="off"
          className="h-16 w-full bg-transparent text-[1.125rem] text-ink-50 outline-none placeholder:text-ink-500 md:h-20 md:text-[1.5rem]"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} className="shrink-0 text-small text-ink-300 hover:text-ink-50">Clear</button>
        )}
      </div>
      <div id={helpId} className="mt-4 flex flex-wrap items-center gap-2 text-small text-ink-400">
        <span>Try:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            data-finder-chip={ex}
            onClick={() => setQ(ex)}
            className="min-h-10 rounded-full bg-ink-900 px-4 text-ink-200 transition-colors hover:bg-ink-800 hover:text-ink-50"
          >
            {ex}
          </button>
        ))}
      </div>
      <p data-finder-count className="mt-8 text-small text-ink-400" aria-live="polite">
        {q ? `${shown.length} matching ${shown.length === 1 ? "service" : "services"}. Tap one to open its page.` : "All services. Tap one to open its page."}
      </p>
      <ul className="mt-2 flex flex-col">
        {shown.map((it) => (
          <li key={it.href} data-finder-item={`${it.name} ${it.symptom} ${it.keywords}`.toLowerCase()}>
            <Link
              href={it.href}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-2xl px-4 py-5 transition-colors hover:bg-gold-500 hover:text-ink-950 focus-visible:bg-gold-500 focus-visible:text-ink-950 md:px-6 md:py-6"
            >
              <span className="font-display text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] font-semibold leading-none tracking-[-0.035em]">{it.name}</span>
              <span className="row-span-2 flex items-center gap-2 text-small font-medium text-ink-400 group-hover:text-ink-950">
                <span className="hidden md:inline">Open page</span>
                <Icon name="arrow" className="size-6 transition-transform group-hover:translate-x-1 md:size-7" />
              </span>
              <span className="text-ink-400 group-hover:text-ink-800 group-focus-visible:text-ink-800">{it.symptom}</span>
            </Link>
          </li>
        ))}
        {shown.length === 0 && (
          <li data-finder-empty className="px-4 py-6 text-ink-300 md:px-6">
            Nothing matches that yet. <Link href="/book#describe" className="link text-ink-50">Describe it to us</Link> and we will tell you which service fits.
          </li>
        )}
      </ul>
    </div>
  );
}
