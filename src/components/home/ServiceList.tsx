import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export type ServiceItem = { href: string; name: string; symptom: string; price?: string; links?: { href: string; label: string }[] };

// Clean list of services: each row is one tap to that service's page (a stretched link), with an optional starting-price
// link to /pricing under the title. A row can carry a line of sub-links under it.
export function ServiceList({ items }: { items: ServiceItem[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((it, i) => (
        <li key={it.href} data-reveal style={{ ["--i" as string]: i % 4 }}>
          <div className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1.5 rounded-2xl px-4 py-5 transition-colors hover:bg-gold-500 hover:text-ink-950 has-[a:focus-visible]:bg-gold-500 has-[a:focus-visible]:text-ink-950 md:px-6 md:py-6">
            <Link
              href={it.href}
              className="font-display text-[clamp(1.625rem,1.1rem+2.4vw,3.25rem)] font-semibold leading-none tracking-[-0.035em] outline-none after:absolute after:inset-0 after:rounded-2xl"
            >
              {it.name}
            </Link>
            <Icon name="arrow" className={`${it.price ? "row-span-3" : "row-span-2"} size-6 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-ink-950 md:size-7`} />
            {it.price && (
              <Link href="/pricing" className="relative z-10 -my-2.5 inline-flex min-h-11 items-center justify-self-start text-small font-semibold text-gold-500 underline-offset-4 outline-none hover:underline group-hover:text-ink-950 group-has-[a:focus-visible]:text-ink-950">
                {it.price}
              </Link>
            )}
            <span className="text-ink-400 group-hover:text-ink-800 group-has-[a:focus-visible]:text-ink-800">{it.symptom}</span>
          </div>
          {it.links && (
            <ul aria-label={`${it.name} by platform`} className="flex flex-wrap gap-2 px-4 pb-4 md:px-6">
              {it.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-small font-medium text-ink-200 shadow-[inset_0_0_0_1.5px_var(--color-ink-700)] transition-colors hover:bg-gold-500 hover:text-ink-950 hover:shadow-none"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
