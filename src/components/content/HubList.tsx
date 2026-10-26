import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/content";

export function HubList({ items }: { items: { href: string; title: string; summary: string; updated?: string }[] }) {
  return (
    <ul className="frame flex flex-col gap-2 pb-[var(--section)]">
      {items.map((it, i) => (
        <li key={it.href} data-reveal style={{ ["--i" as string]: i % 3 }}>
          <Link href={it.href} className="group grid gap-6 rounded-2xl bg-ink-100 p-6 transition-colors hover:bg-ink-200 md:grid-cols-12 md:items-end md:p-8">
            <span className="md:col-span-8">
              <span className="font-display block text-[clamp(1.5rem,1.15rem+1.4vw,2.375rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{it.title}</span>
              <span className="mt-3 block max-w-[62ch] text-ink-700">{it.summary}</span>
            </span>
            <span className="flex items-center justify-between gap-4 text-small text-ink-600 md:col-span-4 md:justify-end">
              {it.updated && <span>Updated {formatDate(it.updated)}</span>}
              <Icon name="arrow" className="size-6 text-ink-950 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
