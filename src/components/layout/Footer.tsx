import Link from "next/link";
import { topServices, migrationServices } from "@/content/services";
import { site } from "@/lib/site";

const copyrightYear = new Date().getFullYear();

const groups = [
  { title: "Services", links: topServices.filter((s) => s.slug !== "migrations").map((s) => ({ href: s.path, label: s.name })) },
  { title: "Migrations", links: [{ href: "/services/migrations", label: "All migrations" }, ...migrationServices.map((s) => ({ href: s.path, label: s.name }))] },
  {
    title: "Learn",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/compare", label: "Comparisons" },
      { href: "/glossary", label: "Glossary" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/about", label: "About" },
      { href: "/book", label: "Book a call" },
      { href: "/try-ghl", label: "Try GoHighLevel" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark overflow-hidden bg-ink-950 pb-24 text-ink-300 md:pb-0">
      <div className="frame pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="max-w-[30ch] text-lead leading-snug text-ink-100">{site.oneLine}</p>
            <p className="mt-6 text-small">{site.proof.years} · {site.proof.projects} · {site.proof.regions}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 md:col-span-8">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="text-small font-semibold text-ink-50">{g.title}</p>
                <ul className="mt-4 flex flex-col gap-1 text-small">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="inline-block py-1.5 transition-colors hover:text-ink-50">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 text-small text-ink-400 md:mt-24 md:flex-row md:items-center md:justify-between">
          <p>
            © {copyrightYear} {site.name}. FixGHL is an independent studio and is not affiliated with or endorsed by HighLevel Inc.
          </p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="hover:text-ink-50">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-ink-50">Terms</Link></li>
            <li><Link href="/affiliate-disclosure" className="hover:text-ink-50">Affiliate disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div aria-hidden className="frame mt-10 select-none md:mt-14">
        <svg viewBox="0 0 1000 232" className="block w-full fill-ink-900" role="presentation">
          <text x="-6" y="262" fontSize="318" fontWeight="600" textLength="1006" lengthAdjust="spacing" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.045em" }}>
            FixGHL
          </text>
        </svg>
      </div>
    </footer>
  );
}
