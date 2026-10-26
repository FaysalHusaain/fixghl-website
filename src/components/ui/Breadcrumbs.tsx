import Link from "next/link";
import { JsonLd, breadcrumbs } from "@/lib/schema";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-small ${dark ? "text-ink-400" : "text-ink-600"}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className={dark ? "text-ink-200" : "text-ink-900"}>{c.name}</span>
              ) : (
                <Link href={c.path} className={`transition-colors ${dark ? "hover:text-ink-50" : "hover:text-ink-950"}`}>{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbs(all)} />
    </>
  );
}
