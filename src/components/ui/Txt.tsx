import { Fragment } from "react";

// Renders text and highlights [[TODO: ...]] / [[VERIFY: ...]] markers so they are caught before launch.
export function Txt({ children }: { children: string }) {
  const parts = children.split(/(\[\[(?:TODO|VERIFY)[^\]]*\]\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[[") ? (
          <mark key={i} className="todo text-inherit">{p}</mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}
