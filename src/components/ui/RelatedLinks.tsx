import Link from "next/link";
import { Icon } from "./Icon";

export function RelatedLinks({ title = "Related", links }: { title?: string; links: { href: string; label: string; note?: string }[] }) {
  return (
    <section aria-labelledby="related-title" className="bg-ink-100">
      <div className="frame py-16 md:py-24">
        <h2 id="related-title" className="h-sub">{title}</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-ink-50 p-5 transition-colors hover:bg-white md:p-6">
                <span className="font-medium leading-snug">{l.label}</span>
                {l.note && <span className="text-small text-ink-600">{l.note}</span>}
                <Icon name="arrow" className="size-5 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-ink-950" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
