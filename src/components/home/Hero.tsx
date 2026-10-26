import Link from "next/link";
import { WorkflowCanvas } from "@/components/ui-fragments/WorkflowCanvas";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-950 text-ink-50" aria-labelledby="hero-title">
      <div className="frame flex min-h-[calc(100svh-var(--header-h))] flex-col pt-[clamp(2.5rem,8vh,7rem)]">
        <h1 id="hero-title" className="h-display">
          <span className="block">GoHighLevel, fixed</span> <span className="block">and built right.</span>
        </h1>

        <div className="mt-6 grid gap-7 md:mt-10 md:grid-cols-12 md:items-end md:gap-8">
          <p className="t-lead max-w-[40ch] text-ink-200 md:col-span-6">
            FixGHL is a specialist GHL studio for coaches, agencies and local businesses. We fix, set up, migrate and automate
            GoHighLevel accounts.
          </p>
          <div className="flex flex-col gap-4 md:col-span-6 md:items-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/book" data-track="book_call_click" data-track-location="hero" className="btn btn-gold">
                Book a free 30-minute GHL call <Icon name="arrow" className="size-4" />
              </Link>
              <Link href="#describe" className="btn btn-outline-dark">Describe your issue</Link>
            </div>
            <p className="text-small text-ink-400">
              <span className="whitespace-nowrap">7+ years in GHL</span> · <span className="whitespace-nowrap">100+ projects</span> ·{" "}
              <span className="whitespace-nowrap">US, UK, EU, Middle East</span>
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-auto md:pt-[clamp(3rem,8vh,6rem)]">
          <WorkflowCanvas />
        </div>
      </div>
    </section>
  );
}
