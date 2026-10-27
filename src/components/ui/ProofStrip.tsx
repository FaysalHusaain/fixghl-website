import Link from "next/link";
import { Icon } from "./Icon";

// Approved claims only. Client reviews live in src/content/testimonials.ts.
const stats = [
  { figure: "7+", label: "years working in GoHighLevel, since 2019" },
  { figure: "100+", label: "GHL projects delivered" },
  { figure: "4", label: "regions: the US, the UK, the EU and the Middle East" },
];

export function ProofStrip({ cta = false }: { cta?: boolean }) {
  return (
    <section className="on-dark bg-ink-950 text-ink-50" aria-labelledby="proof-title">
      <div className="frame section">
        <h2 id="proof-title" className="h-sub max-w-[30ch] text-ink-200" data-reveal>
          The GHL studio coaches, agencies and local businesses call when the account has to work.
        </h2>
        <dl className="mt-14 grid gap-y-12 sm:grid-cols-3 md:mt-20">
          {stats.map((s, i) => (
            <div key={s.figure} data-reveal style={{ ["--i" as string]: i + 1 }} className="flex flex-col gap-3 sm:pr-8">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[clamp(4.5rem,3rem+7vw,9.5rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-gold-500">
                {s.figure}
              </dd>
              <dd className="max-w-[24ch] text-ink-300">{s.label}</dd>
            </div>
          ))}
        </dl>
        {cta && (
          <div className="mt-14 md:mt-20" data-reveal>
            <Link href="/book" data-track="book_call_click" data-track-location="proof" className="btn btn-gold">
              Get a GHL specialist on your account <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
