import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHeader({ crumbs, title, lead, children, updated }: { crumbs: Crumb[]; title: string; lead?: ReactNode; children?: ReactNode; updated?: string }) {
  return (
    <section className="pt-10 md:pt-16">
      <div className="frame pb-12 md:pb-16">
        <Breadcrumbs items={crumbs} />
        <h1 className="h-title mt-8 max-w-[20ch] md:mt-12">{title}</h1>
        {lead && <div className="t-lead mt-6 max-w-[56ch] text-ink-800">{lead}</div>}
        {updated && (
          <p className="mt-6 text-small text-ink-600">
            Last updated <time dateTime={updated}>{new Date(updated + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
