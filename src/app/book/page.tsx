import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BookingModule } from "@/components/booking/BookingModule";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a Free 30-Minute GoHighLevel Call | FixGHL",
  description: "Book a free 30-minute call with a GoHighLevel specialist, or send us the details in writing. You get a clear next step and a written quote if you want one.",
  path: "/book",
});

const next = [
  { t: "On the call", b: "You show us the account and the goal. We tell you what we think is wrong and how we would fix it." },
  { t: "After the call", b: "If you want to go ahead, we send a written quote with the scope, the price and what we need from you." },
  { t: "If you write instead", b: "We reply by email with questions, next steps or a time to talk." },
];

export default function Page() {
  return (
    <section className="on-dark bg-ink-950 text-ink-50">
      <div className="frame grid gap-12 pb-[var(--section)] pt-10 md:pt-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Breadcrumbs items={[{ name: "Book a call", path: "/book" }]} dark />
          <h1 className="h-title mt-8 md:mt-12">Book a free 30&#8209;minute GHL call</h1>
          <p className="t-lead mt-6 max-w-[40ch] text-ink-300">
            Talk to a GoHighLevel specialist about what is broken or what you want built. No cost and no obligation.
          </p>
          <ul className="mt-10 flex flex-col gap-6">
            {next.map((n) => (
              <li key={n.t} className="flex gap-4">
                <Icon name="check" className="mt-1 size-5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-semibold">{n.t}</p>
                  <p className="mt-1 text-ink-300">{n.b}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-ink-300">
            Prefer email? Write to <a href="mailto:hello@fixghl.com" className="link font-medium text-ink-50">hello@fixghl.com</a>
          </p>
          <p className="mt-4 text-small text-ink-400">7+ years in GHL · 100+ projects · US, UK, EU, Middle East</p>
        </div>
        <div className="lg:col-span-7" id="describe">
          <BookingModule id="book-page" headingLevel={2} />
        </div>
      </div>
    </section>
  );
}
