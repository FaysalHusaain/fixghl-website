"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

// One FAQ item: the question is a real <h3> with the toggle button inside it, so screen reader users can move between
// questions by heading (JAWS and TalkBack drop headings placed inside <summary>). The closed answer uses
// hidden="until-found": it stays in the HTML for search and AI crawlers, and find-in-page or a #fragment link opens it.
// Where until-found is unsupported (Safari), it acts as plain hidden and the item still toggles.
export function FaqItem({ q, id, defaultOpen = false, children }: { q: string; id?: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const panel = useRef<HTMLDivElement>(null);

  // Find-in-page (and fragment links into the answer) reveal it natively; mirror that into state.
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const reveal = () => setOpen(true);
    el.addEventListener("beforematch", reveal);
    return () => el.removeEventListener("beforematch", reveal);
  }, []);

  // React renders hidden="until-found" as plain hidden, so the attribute is set here. Before this runs, globals.css
  // hides a closed panel that has no hidden attribute yet.
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (open) el.removeAttribute("hidden");
    else el.setAttribute("hidden", "until-found");
  }, [open]);

  // A link to the item itself (e.g. /pricing#care-plan) opens it.
  useEffect(() => {
    if (!id) return;
    const sync = () => window.location.hash === `#${id}` && setOpen(true);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [id]);

  return (
    <div id={id} className="scroll-mt-28 border-t border-ink-200 last:border-b">
      <h3 className="font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] md:text-[1.5rem]">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left md:py-7"
        >
          <span>{q}</span>
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-ink-100 transition-transform duration-200 group-aria-expanded:rotate-45">
            <Icon name="plus" className="size-4" />
          </span>
        </button>
      </h3>
      {/* Padding lives on the child: styles on the until-found element itself would show while it is hidden. */}
      <div ref={panel} data-faq-panel data-open={open}>
        <p className="measure -mt-1 pb-7 pr-12 text-ink-700">{children}</p>
      </div>
    </div>
  );
}
