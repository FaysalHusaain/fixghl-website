import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";

// The hero is the hook: what we do, for whom, one action, and four doors straight into the main services.
const doors: { href: string; label: string; title: string; icon: IconName }[] = [
  { href: "/services/ghl-fixes", label: "Something is broken", title: "Fix my GHL", icon: "wrench" },
  { href: "/services/migrations", label: "Moving platforms", title: "Migrate to GHL", icon: "move" },
  { href: "/services/ghl-setup", label: "Starting fresh", title: "Set up GHL right", icon: "layers" },
  { href: "/services/automation", label: "Doing it by hand", title: "Automate follow-up", icon: "flow" },
];

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-950 text-ink-50" aria-labelledby="hero-title">
      <div className="frame flex min-h-[calc(100svh-var(--header-h))] flex-col justify-between gap-12 pb-8 pt-[clamp(2.5rem,9vh,7.5rem)] md:pb-10">
        <div>
          <h1 id="hero-title" className="h-display">
            <span className="block">GoHighLevel, fixed</span> <span className="block">and built right.</span>
          </h1>

          <div className="mt-6 grid gap-7 md:mt-10 md:grid-cols-12 md:items-end md:gap-8">
            <p className="t-lead max-w-[40ch] text-ink-200 md:col-span-6">
              Every day a workflow stays broken, leads go unanswered. FixGHL is a specialist GHL studio that fixes, sets up, migrates and
              automates GoHighLevel for coaches, agencies and local businesses.
            </p>
            <div className="flex flex-col gap-4 md:col-span-6 md:items-end">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/book" data-track="book_call_click" data-track-location="hero" className="btn btn-gold">
                  Book a free 30-minute GHL call <Icon name="arrow" className="size-4" />
                </Link>
                <Link href="/book#describe" className="btn btn-outline-dark">Describe your issue</Link>
              </div>
              <p className="text-small font-medium text-ink-200">Free · 30 minutes · No obligation</p>
              <p className="-mt-2 text-small text-ink-400">
                <span className="whitespace-nowrap">7+ years in GHL</span> · <span className="whitespace-nowrap">100+ projects</span> ·{" "}
                <span className="whitespace-nowrap">US, UK, EU, Middle East</span>
              </p>
            </div>
          </div>
        </div>

        <nav aria-label="Start with what you need">
          <p className="text-small text-ink-400">Start with what you need</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {doors.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-ink-900 p-4 transition-colors hover:bg-gold-500 hover:text-ink-950 md:gap-10 md:p-6"
                >
                  <span className="flex items-center justify-between gap-3">
                    <Icon name={d.icon} className="size-6 text-gold-500 group-hover:text-ink-950" />
                    <Icon name="arrow" className="size-5 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-ink-950" />
                  </span>
                  <span>
                    <span className="block text-small text-ink-400 group-hover:text-ink-800">{d.label}</span>
                    <span className="font-display mt-1 block text-[1.25rem] font-semibold leading-tight tracking-[-0.02em] md:text-[1.625rem]">
                      {d.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
