import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { guides } from "@/content/guides";
import { Icon } from "@/components/ui/Icon";
import { Txt } from "@/components/ui/Txt";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Thanks, We Have Your Details | FixGHL",
  description: "Your booking or message reached FixGHL. Here is what happens next.",
  path: "/book/thanks",
  noindex: true,
});

export default function Page() {
  return (
    <>
      <section className="on-dark bg-ink-950 text-ink-50">
        <div className="frame section">
          <span className="grid size-14 place-items-center rounded-full bg-gold-500 text-ink-950"><Icon name="check" className="size-7" /></span>
          <h1 className="h-title mt-8 max-w-[18ch]">Thanks. We have your details.</h1>
          <div className="mt-10 grid gap-2 md:grid-cols-2">
            <div className="rounded-2xl bg-ink-900 p-6 md:p-8">
              <h2 className="h-sub">If you booked a call</h2>
              <p className="mt-3 text-ink-300">A confirmation with the time and the call link is on its way to your email. Reminders come before the call.</p>
            </div>
            <div className="rounded-2xl bg-ink-900 p-6 md:p-8">
              <h2 className="h-sub">If you sent details</h2>
              <p className="mt-3 text-ink-300">We read every message and reply by email within <Txt>{site.replyTime}</Txt>.</p>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="meanwhile" className="section">
        <div className="frame">
          <h2 id="meanwhile" className="h-sub">Worth reading before the call</h2>
          <ul className="mt-8 grid gap-2 md:grid-cols-2">
            {guides.slice(0, 2).map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col justify-between gap-8 rounded-2xl bg-ink-100 p-6 hover:bg-ink-200 md:p-8">
                  <span className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.025em]">{g.title}</span>
                  <span className="flex items-center gap-2 font-medium">Read the guide <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
