import type { QA } from "@/content/services";
import { Txt } from "./Txt";
import { Icon } from "./Icon";
import { JsonLd, faqPage } from "@/lib/schema";

// Native <details> accordion: keyboard accessible, content stays in the HTML for search and AI crawlers.
export function Faq({ items, schema = true, openFirst = false }: { items: (QA & { id?: string })[]; schema?: boolean; openFirst?: boolean }) {
  return (
    <>
      <div className="flex flex-col">
        {items.map((f, i) => (
          <details key={f.q} id={f.id} open={openFirst && i === 0} className="group scroll-mt-28 border-t border-ink-200 last:border-b">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden md:py-7">
              <h3 className="font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] md:text-[1.5rem]">{f.q}</h3>
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-ink-100 transition-transform duration-200 group-open:rotate-45">
                <Icon name="plus" className="size-4" />
              </span>
            </summary>
            <p className="measure -mt-1 pb-7 pr-12 text-ink-700"><Txt>{f.a}</Txt></p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqPage(items)} />}
    </>
  );
}
