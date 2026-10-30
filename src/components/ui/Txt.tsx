import { Fragment } from "react";
import Link from "next/link";

// Renders plain copy. [label](/path) becomes a link (/try-ghl gets the affiliate attributes), and
// [[TODO: ...]] / [[VERIFY: ...]] markers are highlighted so they are caught before launch.
export function Txt({ children }: { children: string }) {
  const parts = children.split(/(\[\[(?:TODO|VERIFY)[^\]]*\]\]|\[[^\]]+\]\([^)\s]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("[[")) return <mark key={i} className="todo text-inherit">{p}</mark>;
        const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(p);
        if (!m) return <Fragment key={i}>{p}</Fragment>;
        const [, label, href] = m;
        if (href === "/try-ghl")
          return <a key={i} href={href} rel="sponsored nofollow" data-track="affiliate_click" data-track-location="faq" className="link">{label}</a>;
        return <Link key={i} href={href} className="link">{label}</Link>;
      })}
    </>
  );
}
