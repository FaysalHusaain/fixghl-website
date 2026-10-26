import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  const links = [
    { href: "/services/ghl-fixes", label: "GHL fixes and troubleshooting" },
    { href: "/services/migrations", label: "Migrations to GHL" },
    { href: "/guides", label: "GoHighLevel guides" },
    { href: "/book", label: "Book a free 30-minute call" },
  ];
  return (
    <section className="on-dark bg-ink-950 text-ink-50">
      <div className="frame section">
        <p className="font-display text-[clamp(5rem,3rem+12vw,14rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-gold-500">404</p>
        <h1 className="h-title mt-8 max-w-[18ch]">We could not find that page.</h1>
        <p className="t-lead mt-6 max-w-[48ch] text-ink-300">The page you asked for does not exist or has moved. These are the pages people usually want.</p>
        <ul className="mt-10 grid gap-2 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex items-center justify-between gap-4 rounded-2xl bg-ink-900 p-5 hover:bg-ink-800 md:p-6">
                {l.label}
                <Icon name="arrow" className="size-5 text-gold-500 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
