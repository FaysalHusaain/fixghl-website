import Link from "next/link";
import { Icon } from "./Icon";

export function CtaBand({
  title = "Tell us what is broken. We will tell you how we would fix it.",
  body = "A free 30-minute call with a GHL specialist. You leave with a clear next step, whether or not you hire us.",
  location = "cta_band",
  ctaLabel = "Book a free 30-minute GHL call",
  secondary = true,
}: { title?: string; body?: string; location?: string; ctaLabel?: string; secondary?: boolean }) {
  return (
    <section className="on-dark bg-ink-950 text-ink-50" aria-labelledby={`cta-${location}`}>
      <div className="frame section grid gap-10 md:grid-cols-12 md:items-end">
        <h2 id={`cta-${location}`} className="h-title md:col-span-7" data-reveal>{title}</h2>
        <div className="flex flex-col gap-6 md:col-span-5 md:items-end md:text-right" data-reveal style={{ ["--i" as string]: 1 }}>
          <p className="max-w-[42ch] text-ink-300">{body}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/book" data-track="book_call_click" data-track-location={location} className="btn btn-gold">
              {ctaLabel} <Icon name="arrow" className="size-4" />
            </Link>
            {secondary && <Link href="/book#describe" className="btn btn-outline-dark">Describe your project</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
