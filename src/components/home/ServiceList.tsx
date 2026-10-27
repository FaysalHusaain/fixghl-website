import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export type ServiceItem = { href: string; name: string; symptom: string };

// Clean list of services: each row is one tap to that service's page.
export function ServiceList({ items }: { items: ServiceItem[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((it, i) => (
        <li key={it.href} data-reveal style={{ ["--i" as string]: i % 4 }}>
          <Link
            href={it.href}
            className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1.5 rounded-2xl px-4 py-5 transition-colors hover:bg-gold-500 hover:text-ink-950 focus-visible:bg-gold-500 focus-visible:text-ink-950 md:px-6 md:py-6"
          >
            <span className="font-display text-[clamp(1.625rem,1.1rem+2.4vw,3.25rem)] font-semibold leading-none tracking-[-0.035em]">{it.name}</span>
            <Icon name="arrow" className="row-span-2 size-6 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-ink-950 md:size-7" />
            <span className="text-ink-400 group-hover:text-ink-800 group-focus-visible:text-ink-800">{it.symptom}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
