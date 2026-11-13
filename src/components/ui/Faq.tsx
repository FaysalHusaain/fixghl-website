import type { QA } from "@/content/services";
import { Txt } from "./Txt";
import { FaqItem } from "./FaqItem";
import { JsonLd, faqPage } from "@/lib/schema";

// FAQ accordion with a heading per question (see FaqItem). Answers render on the server and stay in the HTML for search
// and AI crawlers.
export function Faq({ items, schema = true, openFirst = false }: { items: (QA & { id?: string })[]; schema?: boolean; openFirst?: boolean }) {
  return (
    <>
      <div className="flex flex-col">
        {items.map((f, i) => (
          <FaqItem key={f.q} q={f.q} id={f.id} defaultOpen={openFirst && i === 0}>
            <Txt>{f.a}</Txt>
          </FaqItem>
        ))}
      </div>
      {schema && <JsonLd data={faqPage(items)} />}
    </>
  );
}
