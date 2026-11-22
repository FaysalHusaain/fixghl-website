"use client";

import { useId, useRef } from "react";

// A copy-ready template: plain visible text plus a Copy button. Nothing is stored or sent; the text goes to the clipboard.
// The status bubble sits outside the button (a button's children aren't reliably announced) and doubles as the live region.
let lastMessage = "";

export function CopyBlock({ title, text }: { title: string; text: string }) {
  const id = useId();
  const status = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const report = (ok: boolean) => {
    const tip = status.current;
    const btn = button.current;
    if (!tip || !btn) return;
    clearTimeout(timer.current);
    btn.removeAttribute("data-copied");
    btn.removeAttribute("data-failed");
    let message = ok ? "Copied" : "Copy failed";
    if (message === lastMessage) message += " "; // VoiceOver skips a repeat of the same message
    lastMessage = message;
    tip.textContent = "";
    btn.setAttribute(ok ? "data-copied" : "data-failed", "");
    requestAnimationFrame(() => (tip.textContent = message));
    timer.current = setTimeout(() => {
      btn.removeAttribute("data-copied");
      btn.removeAttribute("data-failed");
      tip.textContent = "";
    }, 2000);
  };

  const copy = async () => {
    const value = document.getElementById(id)?.innerText.trim();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      report(true);
    } catch {
      report(false);
    }
  };

  return (
    <div className="not-prose mt-6 print:break-inside-avoid">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-ink-950">{title}</h3>
        <span className="relative inline-flex items-center gap-3 print:hidden">
          <span ref={status} role="status" className="text-small text-ink-600" />
          <button ref={button} type="button" onClick={copy} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink-300 px-4 text-small font-semibold text-ink-950 transition-colors hover:border-ink-950">
            Copy<span className="sr-only"> {title.toLowerCase()}</span>
          </button>
        </span>
      </div>
      <p id={id} className="template mt-3 whitespace-pre-line rounded-2xl bg-ink-100 p-5 text-[0.9375rem] leading-relaxed text-ink-900">
        {text}
      </p>
    </div>
  );
}
