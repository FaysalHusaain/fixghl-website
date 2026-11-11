import type { PromiseItem } from "@/content/promises";

// "What you can hold us to": one row per promise, name as a large display line, sentence beside it.
export function Promises({ tone, items }: { tone: "soft" | "dark"; items: PromiseItem[] }) {
  const dark = tone === "dark";
  const nameColor = dark ? "text-gold-500" : "text-ink-950";
  const textColor = dark ? "text-ink-200" : "text-ink-800";

  return (
    <section aria-labelledby="promises-title" className={dark ? "on-dark bg-ink-950 text-ink-50" : "bg-ink-100 text-ink-950"}>
      <div className="frame section">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="promises-title" className="h-title md:col-span-7" data-reveal>What you can hold us to</h2>
          <p className={`t-lead md:col-span-5 ${textColor}`} data-reveal style={{ ["--i" as string]: 1 }}>
            Four promises, written into every quote.
          </p>
        </div>
        <ul className="mt-10 md:mt-14">
          {items.map((p, i) => (
            <li
              key={p.name}
              data-reveal
              style={{ ["--i" as string]: i + 1 }}
              className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline md:gap-10 md:py-[2.125rem]"
            >
              <p className={`font-display text-[clamp(1.875rem,1rem+3.4vw,4.125rem)] font-semibold leading-none tracking-[-0.04em] md:col-span-5 ${nameColor}`}>
                {p.name}
              </p>
              <p className={`t-lead max-w-[46ch] md:col-span-7 ${textColor}`}>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
