import { Wordmark } from "@/components/brand/Wordmark";
import { WorkflowCanvas } from "@/components/ui-fragments/WorkflowCanvas";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/services/migrations", label: "Migrations" },
  { href: "/guides", label: "Guides" },
];

export function Hero() {
  return (
    <section className="on-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-ink-50">
      <header className="frame flex h-18 items-center justify-between">
        <a href="/" aria-label="FixGHL home" className="text-[1.375rem]">
          <Wordmark />
        </a>
        <nav aria-label="Main" className="flex items-center gap-7 text-small text-ink-300">
          <ul className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-ink-50">{n.label}</a>
              </li>
            ))}
          </ul>
          <a href="/book" className="text-ink-50 underline decoration-gold-500 decoration-2 underline-offset-[6px]">
            Book a call
          </a>
        </nav>
      </header>

      <div className="frame flex flex-1 flex-col pt-[clamp(3rem,9vh,7rem)]">
        <h1 className="text-display font-semibold leading-[0.95] tracking-[-0.045em]">
          <span className="block">GoHighLevel, fixed</span> <span className="block">and built right.</span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-[40ch] text-lead leading-[1.4] text-ink-200 md:col-span-6">
            FixGHL is a specialist GHL studio for coaches, agencies and local businesses. We fix, set up, migrate and
            automate GoHighLevel accounts.
          </p>
          <div className="flex flex-col gap-4 md:col-span-6 md:items-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/book" className="btn btn-gold">Book a free 20-minute GHL call</a>
              <a href="#describe" className="btn btn-ghost-dark">Describe your issue</a>
            </div>
            <p className="text-small text-ink-400">7+ years in GHL · 100+ projects · US, UK, EU, Middle East</p>
          </div>
        </div>

        <div className="mt-[clamp(3rem,8vh,6rem)] -mr-[var(--gutter)] md:mr-0">
          <WorkflowCanvas />
        </div>
      </div>
    </section>
  );
}
