"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials, type Testimonial } from "@/content/testimonials";

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/, "")
    .split(/[\s,]+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

function Avatar({ name, size = "size-12" }: { name: string; size?: string }) {
  return (
    <span aria-hidden className={`grid ${size} shrink-0 place-items-center rounded-full bg-ink-950 font-display text-[1rem] font-semibold text-gold-500`}>
      {initials(name)}
    </span>
  );
}

const stories = testimonials.filter((t, i, all) => all.findIndex((x) => x.name === t.name) === i); // one story per client

// Client stories: one large quote at a time. The list of clients beside it doubles as the control:
// a progress line fills under the active client, then the next story crossfades in. Hover pauses; tap selects.
export function Testimonials() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [done, setDone] = useState(false); // plays once through, then rests on the first story
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (active === stories.length - 1) {
      setActive(0);
      setDone(true);
    } else setActive(active + 1);
  };
  const pick = (i: number) => {
    setActive(i);
    setDone(true); // the visitor has taken control
  };

  return (
    <section aria-labelledby="reviews-title" className="section">
      <div className="frame" data-stories data-playing={inView && !done} data-done={done} ref={root}>
        <h2 id="reviews-title" className="h-title max-w-[16ch]" data-reveal>In our clients’ words</h2>

        <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-12 lg:gap-16">
          <div className="grid lg:col-span-7">
            {stories.map((t, i) => (
              <figure key={t.id} data-story-panel={i} data-active={i === active} aria-hidden={i !== active} className="story-panel flex flex-col justify-start gap-8 md:gap-10">
                <blockquote className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink-950">
                  <span className="-ml-[0.42em] text-ink-300" aria-hidden>“</span>
                  {t.quote}
                  <span className="text-ink-300" aria-hidden>”</span>
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <Avatar name={t.name} size="size-14" />
                  <span>
                    <span className="block text-[1.125rem] font-semibold">{t.name}</span>
                    <span className="mt-0.5 block text-ink-600">
                      {t.role ? `${t.role}, ` : ""}
                      {t.country}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div role="tablist" aria-label="Client stories" aria-orientation="vertical" className="flex flex-col lg:col-span-5">
            {stories.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                data-story-tab={i}
                data-active={i === active}
                aria-selected={i === active}
                onClick={() => pick(i)}
                className="story-tab group py-3 text-left md:py-4"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="story-name font-semibold">{t.name}</span>
                  <span className="story-meta text-small">{t.project}</span>
                </span>
                <span className="mt-2.5 block h-[2px] overflow-hidden rounded-full bg-ink-200 md:mt-3" aria-hidden>
                  <span key={i === active ? `on-${active}` : "off"} className="story-fill block h-full bg-ink-950" onAnimationEnd={next} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// A single quote for service pages and the booking section.
export function QuoteCard({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <figure className={`flex flex-col gap-6 rounded-[1.75rem] p-6 md:p-8 ${dark ? "on-dark bg-ink-900 text-ink-50" : "bg-ink-100 text-ink-950"}`}>
      <blockquote className="font-display text-[1.375rem] font-semibold leading-[1.25] tracking-[-0.02em]">“{t.quote}”</blockquote>
      <figcaption className="flex items-center gap-3.5">
        <Avatar name={t.name} />
        <span>
          <span className="block font-semibold">{t.name}</span>
          <span className={`block text-small ${dark ? "text-ink-400" : "text-ink-600"}`}>
            {t.role ? `${t.role}, ` : ""}
            {t.country}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
