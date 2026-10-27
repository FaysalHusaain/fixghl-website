import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Try GoHighLevel: Plans, Trial and Who It Suits | FixGHL",
  description: "Start a GoHighLevel trial, see the plans as listed in October 2026, and decide whether GHL fits your business. Affiliate link disclosed.",
  path: "/try-ghl",
});

const plans = [
  { name: "Starter", price: "$97/month", fit: "A single business, or an agency with up to 3 sub-accounts" },
  { name: "Unlimited", price: "$297/month", fit: "Agencies that need unlimited sub-accounts" },
  { name: "Agency Pro", price: "$497/month", fit: "Agencies that want SaaS mode and rebilling" },
];

export default function Page() {
  const href = site.affiliateUrl;
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Try GoHighLevel", path: "/try-ghl" }]}
        title="Try GoHighLevel"
        lead="GoHighLevel combines a CRM, pipelines, email and SMS, calendars, funnels, websites and automation in one account. If you are deciding whether it fits, start a trial and test it with your own workflow."
      >
        <p className="mt-8 max-w-[62ch] rounded-2xl bg-ink-100 p-5 text-ink-800">
          <strong className="font-semibold">Disclosure:</strong> the button below is an affiliate link. If you sign up through it, FixGHL may
          earn a commission from HighLevel at no extra cost to you. It does not change our advice. <Link href="/affiliate-disclosure" className="link">Read the full disclosure</Link>.
        </p>
        <div className="mt-8">
          {href ? (
            <a href={href} target="_blank" rel="sponsored noopener" data-track="affiliate_click" data-track-location="try_ghl" className="btn btn-ink">
              Start a GoHighLevel trial <Icon name="arrow" className="size-4" />
            </a>
          ) : (
            <Link href="/book" className="btn btn-ink">Ask us about the right plan <Icon name="arrow" className="size-4" /></Link>
          )}
        </div>
      </PageHeader>

      <section aria-labelledby="plans-title" className="pb-[var(--section)]">
        <div className="frame">
          <h2 id="plans-title" className="h-sub">GoHighLevel plans, as listed in October 2026</h2>
          <div className="table-wrap" role="region" aria-label="GoHighLevel plans" tabIndex={0}>
            <table>
              <thead><tr><th scope="col">Plan</th><th scope="col">Monthly price</th><th scope="col">Best for</th></tr></thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.name}><td className="font-medium">{p.name}</td><td>{p.price}</td><td>{p.fit}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="max-w-[68ch] text-small text-ink-600">
            Prices are as reported in October 2026 and exclude usage charges for SMS, calls, email and AI. Check HighLevel&apos;s own pricing page
            before you buy.
          </p>
          <div className="mt-16 grid gap-2 md:grid-cols-2">
            <div className="rounded-2xl bg-ink-100 p-6 md:p-8">
              <h2 className="h-sub">GHL usually fits if you</h2>
              <ul className="mt-5 flex flex-col gap-3 text-ink-800">
                {["Pay for separate CRM, email, SMS, booking and funnel tools", "Need follow-up to happen within minutes of a lead arriving", "Run an agency and want one platform for every client"].map((t) => (
                  <li key={t} className="flex gap-3"><Icon name="check" className="mt-1 size-5 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-ink-100 p-6 md:p-8">
              <h2 className="h-sub">Think twice if you</h2>
              <ul className="mt-5 flex flex-col gap-3 text-ink-800">
                {["Depend on enterprise reporting or a large sales team's CRM", "Only need a simple website with no follow-up", "Have no one to own the account day to day"].map((t) => (
                  <li key={t} className="flex gap-3"><Icon name="close" className="mt-1 size-5 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-10 text-ink-700">
            Comparing platforms? Read <Link href="/compare/gohighlevel-vs-clickfunnels" className="link">GoHighLevel vs ClickFunnels</Link>, or
            see how we handle <Link href="/services/ghl-setup" className="link">account setup</Link>.
          </p>
        </div>
      </section>
      <CtaBand title="Want it set up properly from day one?" body="Book a free 30-minute call and we will tell you how we would set up your account." location="try_ghl" />
    </>
  );
}
