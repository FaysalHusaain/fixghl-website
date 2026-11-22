// Native checkboxes, ticked client-side only: nothing is saved or sent.
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="not-prose mt-6 flex list-none flex-col gap-1 pl-0">
      {items.map((t) => (
        <li key={t}>
          <label className="flex min-h-11 cursor-pointer items-start gap-3.5 py-1.5 leading-relaxed text-ink-900">
            <input type="checkbox" className="checklist-box mt-[0.2em] shrink-0" />
            <span>{t}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
