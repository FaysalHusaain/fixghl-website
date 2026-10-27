import Link from "next/link";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { Icon } from "./Icon";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4" fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

function Byline({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span
        aria-hidden
        className={`grid size-11 shrink-0 place-items-center rounded-full font-display text-[1.125rem] font-semibold uppercase ${
          dark ? "bg-gold-500 text-ink-950" : "bg-ink-950 text-ink-50"
        }`}
      >
        {t.reviewer.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className={`block font-semibold ${dark ? "text-ink-50" : "text-ink-950"}`}>{t.client}</span>
        <span className={`block text-small ${dark ? "text-ink-400" : "text-ink-600"}`}>
          {t.reviewer} · {t.country}
        </span>
      </span>
    </figcaption>
  );
}

function Meta({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <p className={`flex flex-wrap gap-2 text-small ${dark ? "text-ink-200" : "text-ink-700"}`}>
      <span className={`rounded-full px-3 py-1 ${dark ? "bg-ink-800" : "bg-ink-50"}`}>{t.project}</span>
      <span className={`rounded-full px-3 py-1 ${dark ? "bg-ink-800" : "bg-ink-50"}`}>Delivered in {t.duration}</span>
    </p>
  );
}

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);
  return (
    <section aria-labelledby="reviews-title" className="section overflow-hidden">
      <div className="frame">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="reviews-title" className="h-title md:col-span-7" data-reveal>What do clients say about working with us?</h2>
          <div className="md:col-span-5" data-reveal style={{ ["--i" as string]: 1 }}>
            <p className="flex items-center gap-3 font-semibold">
              <Stars className="text-ink-950" /> Five-star reviews
            </p>
            <p className="mt-2 text-ink-600">
              Excerpts from client reviews on Fiverr, left after each order was delivered. Edits are shown in [square brackets].
            </p>
          </div>
        </div>

        {/* Featured quote */}
        <figure data-reveal className="on-dark mt-12 grid gap-10 rounded-[2rem] bg-ink-950 p-7 text-ink-50 md:mt-16 md:grid-cols-12 md:p-14">
          <div className="md:col-span-8">
            <Stars className="text-gold-500" />
            <blockquote className="font-display mt-6 text-[clamp(1.375rem,1rem+1.6vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.025em]">
              “{featured.quote}”
            </blockquote>
          </div>
          <div className="flex flex-col justify-end gap-6 md:col-span-4">
            <Byline t={featured} dark />
            <Meta t={featured} dark />
          </div>
        </figure>

        {/* The rest: swipeable row on phones, grid from md */}
        <ul
          className="scrollbar-none -mx-[var(--gutter)] mt-2 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-2 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4"
          aria-label="More client reviews"
          tabIndex={0}
        >
          {rest.map((t, i) => (
            <li key={t.id} data-reveal style={{ ["--i" as string]: i }} className="w-[85%] shrink-0 snap-start md:w-auto">
              <figure className="flex h-full flex-col justify-between gap-8 rounded-[1.5rem] bg-ink-100 p-6 md:p-7">
                <div>
                  <Stars className="text-ink-950" />
                  <blockquote className="mt-5 text-[1.0625rem] leading-relaxed text-ink-900">“{t.quote}”</blockquote>
                </div>
                <div className="flex flex-col gap-5">
                  <Meta t={t} />
                  <Byline t={t} />
                </div>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-small text-ink-500 md:hidden">Swipe for more reviews</p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-reveal>
          <p className="t-lead max-w-[38ch] text-ink-800">Want the same for your account? It starts with a free 30-minute call.</p>
          <Link href="/book" data-track="book_call_click" data-track-location="reviews" className="btn btn-ink shrink-0">
            Book a free 30-minute GHL call <Icon name="arrow" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// A single quote for service pages and the booking section.
export function QuoteCard({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <figure className={`flex flex-col gap-6 rounded-[1.5rem] p-6 md:p-8 ${dark ? "on-dark bg-ink-900 text-ink-50" : "bg-ink-100"}`}>
      <Stars className={dark ? "text-gold-500" : "text-ink-950"} />
      <blockquote className={`text-[1.125rem] leading-relaxed ${dark ? "text-ink-100" : "text-ink-900"}`}>“{t.quote}”</blockquote>
      <Byline t={t} dark={dark} />
      <Meta t={t} dark={dark} />
    </figure>
  );
}
