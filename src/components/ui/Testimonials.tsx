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

// One compact review: a single quoted line, then who said it and what we did.
function Card({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col justify-between gap-7 rounded-[1.5rem] p-6 md:gap-10 md:p-7 ${
        dark ? "on-dark bg-ink-900 text-ink-50" : "bg-white text-ink-950"
      }`}
    >
      <div>
        <Stars className={dark ? "text-gold-500" : "text-ink-950"} />
        <blockquote className="font-display mt-5 text-[1.25rem] font-medium leading-[1.35] tracking-[-0.015em]">
          {t.quote}
        </blockquote>
      </div>
      <figcaption className="text-small">
        <span className="block font-semibold">{t.client ?? t.project}</span>
        <span className={`mt-0.5 block ${dark ? "text-ink-400" : "text-ink-600"}`}>
          {t.country} · {t.client ? `${t.project} · ` : ""}
          {t.duration}
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden bg-ink-100">
      <div className="frame section">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="reviews-title" className="h-title" data-reveal>What clients say</h2>
          <p className="flex items-center gap-3 text-small text-ink-700 md:text-body" data-reveal style={{ ["--i" as string]: 1 }}>
            <Stars className="text-ink-950" />
            Five-star reviews from Fiverr clients
          </p>
        </div>
        <ul
          aria-label="Client reviews"
          tabIndex={0}
          className="scrollbar-none -mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] pb-1 md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <li key={t.id} data-reveal style={{ ["--i" as string]: i % 3 }} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <Card t={t} />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-small text-ink-600 md:hidden" aria-hidden>Swipe for more</p>
      </div>
    </section>
  );
}

// A single review for service pages and the booking section.
export function QuoteCard({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return <Card t={t} dark={dark} />;
}
