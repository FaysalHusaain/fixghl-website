import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

// The hero is the hook: what we do, for whom, one action, and the proof that backs it.

export function Hero() {
  return (
    <section data-hero className="on-dark relative overflow-hidden bg-ink-950 text-ink-50" aria-labelledby="hero-title">
      <div className="frame pb-[clamp(3rem,8vh,6.5rem)] pt-[clamp(2.5rem,8vh,6.5rem)]">
        <div>
          <p className="mb-5 text-small font-semibold text-gold-500 md:mb-7">GoHighLevel expert studio</p>
          <h1 id="hero-title" className="h-display">
            <span className="block">GoHighLevel, fixed</span> <span className="block">and built right.</span>
          </h1>

          <div className="mt-6 grid gap-7 md:mt-10 md:grid-cols-12 md:items-end md:gap-8">
            <p className="t-lead max-w-[44ch] text-ink-200 md:col-span-6">
              We set up GoHighLevel accounts, build the automations and funnels that run them, move businesses over from ClickFunnels,
              Wix, Kajabi and HubSpot, and fix accounts that have stopped working. FixGHL is the specialist GHL studio for coaches,
              agencies and local businesses.
            </p>
            <div className="flex flex-col gap-4 md:col-span-6 md:items-end">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/book" data-track="book_call_click" data-track-location="hero" className="btn btn-gold">
                  Book a free 30-minute GHL call <Icon name="arrow" className="size-4" />
                </Link>
                <Link href="/book#describe" className="btn btn-outline-dark">Describe your project</Link>
              </div>
              <p className="text-small font-medium text-ink-200">Free · 30 minutes · No obligation</p>
              <p className="-mt-2 text-small text-ink-400">
                <span className="whitespace-nowrap">7+ years in GHL</span> · <span className="whitespace-nowrap">100+ projects</span> ·{" "}
                <span className="whitespace-nowrap">US, UK, EU, Middle East</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
