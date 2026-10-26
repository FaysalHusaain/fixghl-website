import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHeader crumbs={[{ name: title, path }]} title={title} updated={updated} />
      <section className="pb-[var(--section)]">
        <div className="frame">
          <div className="prose measure">{children}</div>
        </div>
      </section>
    </>
  );
}
