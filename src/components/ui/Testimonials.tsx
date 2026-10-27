import { testimonials, type Testimonial } from "@/content/testimonials";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-3.5" fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/, "")
    .split(/[\s,]+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

// One review card: who first (authority), then their words, then the verifiable details.
function Card({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col gap-6 rounded-[1.75rem] p-6 md:p-7 ${
        dark ? "on-dark bg-ink-900 text-ink-50" : "bg-white text-ink-950"
      }`}
    >
      <figcaption className="flex items-center gap-3.5">
        <span
          aria-hidden
          className="grid size-12 shrink-0 place-items-center rounded-full bg-ink-950 font-display text-[1rem] font-semibold tracking-[-0.01em] text-gold-500"
        >
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold leading-tight">{t.name}</span>
          <span className={`mt-1 block text-small ${dark ? "text-ink-400" : "text-ink-600"}`}>{t.role ?? t.country}</span>
        </span>
      </figcaption>
      <blockquote className="font-display flex-1 text-[1.125rem] font-medium leading-[1.35] tracking-[-0.015em] md:text-[1.25rem]">
        “{t.quote}”
      </blockquote>
      <div className={`flex flex-col gap-1.5 text-small ${dark ? "text-ink-300" : "text-ink-600"}`}>
        <span className="flex items-center gap-2 whitespace-nowrap">
          <Stars className={dark ? "text-gold-500" : "text-ink-950"} />
          <span>Verified Fiverr review</span>
        </span>
        <span>
          {t.project} · {t.duration}
          {t.role ? ` · ${t.country}` : ""}
        </span>
      </div>
    </figure>
  );
}

// Continuous, slow moving row (Apple-style). Pauses on hover and touch; static and scrollable with reduced motion.
function Marquee({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const row = (hidden: boolean) =>
    items.map((t) => (
      <li key={`${t.id}-${hidden}`} aria-hidden={hidden || undefined} className="w-[17.5rem] shrink-0 md:w-[22rem]">
        <Card t={t} />
      </li>
    ));
  return (
    <div className="marquee group">
      <ul className={`marquee-track flex w-max gap-4 ${reverse ? "marquee-reverse" : ""}`}>
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden bg-ink-100">
      <div className="frame pb-10 pt-[var(--section)] md:pb-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="reviews-title" className="h-title" data-reveal>Trusted by coaches, creators and business owners</h2>
          </div>
          <div className="flex items-center gap-4" data-reveal style={{ ["--i" as string]: 1 }}>
            <span className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.04em]">5.0</span>
            <span className="text-small leading-snug text-ink-700">
              <Stars className="mb-1.5 text-ink-950" />
              <span className="block whitespace-nowrap">Five-star Fiverr reviews,</span>
              <span className="block whitespace-nowrap">quoted word for word</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pb-[var(--section)]" data-reveal style={{ ["--i" as string]: 2 }}>
        <div className="md:hidden">
          <Marquee items={testimonials} />
        </div>
        <div className="hidden flex-col gap-4 md:flex">
          <Marquee items={testimonials.slice(0, half)} />
          <Marquee items={testimonials.slice(half)} reverse />
        </div>
      </div>
    </section>
  );
}

// A single review for service pages and the booking section.
export function QuoteCard({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return <Card t={t} dark={dark} />;
}
