import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { TryGhl } from "@/components/content/TryGhl";
import { CostCalculator } from "@/components/tools/CostCalculator";
import { getResource } from "@/content/resources";
import { a2p, addons, aiPlans, calculate, email, phone, plans, presets, usd, voiceAi } from "@/lib/ghl-pricing";
import { JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const slug = "gohighlevel-cost-calculator";
const path = `/resources/${slug}`;

export function generateMetadata(): Metadata {
  const r = getResource(slug)!;
  return pageMetadata({ title: r.metaTitle, description: r.description, path, type: "article", published: r.published, updated: r.updated });
}

const toc = [
  { id: "calculator", text: "The calculator" },
  { id: "typical-costs", text: "Typical monthly costs" },
  { id: "rates", text: "Every rate we use" },
  { id: "rebilling", text: "What you can rebill" },
  { id: "not-included", text: "What isn't included" },
  { id: "what-we-see", text: "What we see in real accounts" },
  { id: "sources", text: "Sources" },
];

const sources = [
  { label: "HighLevel pricing page", href: "https://www.gohighlevel.com/pricing", note: "plans, add-ons and the 14-day trial" },
  { label: "HighLevel Pricing Guide", href: "https://help.gohighlevel.com/support/solutions/articles/155000001156-highlevel-pricing-guide", note: "help center, modified 29 October 2026: wallet, email, rebilling and add-on prices" },
  { label: "LC Phone Pricing & Billing Guide", href: "https://help.gohighlevel.com/support/solutions/articles/48001223556", note: "help center, modified 12 October 2026: numbers, SMS, MMS, calls and carrier fees" },
  { label: "A2P 10DLC Messaging Fees", href: "https://help.gohighlevel.com/support/solutions/articles/155000005200-a2p-10dlc-messaging-fees-registration-monthly-and-carrier-costs", note: "help center, modified 10 November 2026: registration and campaign fees" },
  { label: "HighLevel AI Products Pricing", href: "https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing", note: "help center, modified 23 November 2026: AI Employee plans and Voice AI rates" },
];

export default function Page() {
  const r = getResource(slug);
  if (!r) notFound();
  const examples = presets.map((p) => ({ p, res: calculate(p.inputs) }));

  const rates: [string, string, string][] = [
    ["Starter / Unlimited / Founder plan", `$${plans.starter.price} / $${plans.unlimited.price} / $${plans.founder.price} a month`, "Once per agency account"],
    ["Local / toll-free number", `$${phone.localNumber} / $${phone.tollFreeNumber} a month`, "Per number"],
    ["SMS", `$${phone.sms} per segment`, "Sent and received count the same"],
    ["Carrier fee", `about $${phone.carrierEstimate} per segment`, "Our average of HighLevel's carrier table; optional"],
    ["MMS sent", `$${phone.mmsOut} per segment`, "Picture messages"],
    ["Outbound / inbound call", `$${phone.callOut} / $${phone.callIn} a minute`, "Billed in whole minutes"],
    ["Call recording / transcription", `$${phone.recording} / $${phone.transcription} a minute`, "On all call minutes when switched on"],
    ["A2P 10DLC", `$${a2p.sole.oneTime} to $${a2p.standard.oneTime} once, $${a2p.lowvolume.monthly} to $${a2p.standard.monthly} a month`, "By brand type"],
    ["LC Email", `$${email.per1000} per 1,000 emails`, "Every plan"],
    ["Email validation", `$${email.validationPer1000} per 1,000 checks`, "Optional"],
    ["AI Employee plan", `$${aiPlans.starter.price} / $${aiPlans.growth.price} / $${aiPlans.unlimited.price} a month`, "Per sub-account that uses it"],
    ["Voice AI, pay per use", `$${voiceAi.low.toFixed(2)} to $${voiceAi.high.toFixed(2)} a minute`, "Speech-to-speech models, plus phone minutes"],
    ["Add-ons", `$${addons.wordpress.price} to $${addons.premiumSupport.price} a month`, "Per sub-account, site or account"],
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "GoHighLevel cost calculator",
          url: absoluteUrl(path),
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
          publisher: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <ArticleLayout
        meta={r}
        path={path}
        crumbs={[{ name: "GoHighLevel cost calculator", path }]}
        toc={toc}
        schemaType="Article"
        sidebarDesktopOnly
        lead={
          <p className="mt-8 max-w-[62ch] text-[var(--text-lead)] leading-[1.45] text-ink-900">
            GoHighLevel costs $97, $297 or $497 a month for the plan, and usage comes on top: phone numbers, texts, calls, email, AI and add-ons. Set
            your numbers below to see the real monthly bill at HighLevel&apos;s published prices. A single business with typical texting and email
            pays about {usd(examples[0].res.monthly, 0)} a month on Starter.
          </p>
        }
        wide={
          <section id="calculator" aria-label="Calculator" className="bg-ink-100 py-[var(--section)]">
            <div className="frame">
              <h2 className="h-sub sr-only">Calculator</h2>
              <CostCalculator />
            </div>
          </section>
        }
      >
        <h2 id="typical-costs">What does GoHighLevel cost for a typical account?</h2>
        <p>
          A single business on Starter pays about {usd(examples[0].res.monthly, 0)} a month. An agency with five clients on Unlimited, with AI Growth on
          two of them, pays about {usd(examples[1].res.monthly, 0)}. A 20-client SaaS agency on Founder with heavy texting and AI Unlimited pays about{" "}
          {usd(examples[2].res.monthly, 0)}, most of which it can rebill to clients.
        </p>
        <div className="table-wrap not-prose" role="region" aria-label="Typical monthly GoHighLevel costs" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Setup</th>
                <th scope="col">Plan</th>
                <th scope="col">Phone and SMS</th>
                <th scope="col">Email</th>
                <th scope="col">AI and add-ons</th>
                <th scope="col">Monthly total</th>
              </tr>
            </thead>
            <tbody>
              {examples.map(({ p, res }) => {
                const g = (id: string) => res.groups.find((x) => x.id === id)!.total;
                return (
                  <tr key={p.id}>
                    <th scope="row" className="!bg-transparent border-t border-ink-200 align-top font-medium">
                      {p.name}
                      <span className="block font-normal text-ink-600">{p.line}</span>
                    </th>
                    <td>{usd(g("plan"), 0)}</td>
                    <td>{usd(g("phone"))}</td>
                    <td>{usd(g("email"))}</td>
                    <td>{usd(g("ai") + g("addons"))}</td>
                    <td className="font-semibold">{usd(res.monthly)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-small text-ink-600">
          The one business example assumes one local number, 2,000 text segments, 300 minutes of calls each way, 10,000 emails and a Low Volume A2P
          campaign. Pick any of the three in the calculator to see every line.
        </p>

        <h2 id="rates">Which prices does the calculator use?</h2>
        <p>
          Every rate comes from HighLevel&apos;s own pricing page and help center, checked on 25 November 2026. Usage rates are for the US and Canada
          in US dollars. The only figure that is ours is the carrier fee, an average of the per-carrier fees HighLevel lists, and you can switch it
          off.
        </p>
        <div className="table-wrap not-prose" role="region" aria-label="GoHighLevel prices used by the calculator" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">How it&apos;s counted</th>
              </tr>
            </thead>
            <tbody>
              {rates.map(([item, price, how]) => (
                <tr key={item}>
                  <td className="font-medium">{item}</td>
                  <td className="whitespace-nowrap">{price}</td>
                  <td>{how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="rebilling">Which GoHighLevel costs can you rebill to clients?</h2>
        <p>
          On Unlimited you can pass each client&apos;s phone and email costs on to that client at cost. On Founder you can add your own markup and
          rebill AI usage too. Starter can&apos;t rebill. The calculator shows the amount you could pass on as &ldquo;You can rebill&rdquo;.
        </p>
        <ul>
          <li><strong>Starter, $97:</strong> you pay all usage yourself.</li>
          <li><strong>Unlimited, $297:</strong> phone and email rebilled at cost, per sub-account.</li>
          <li><strong>Founder, $497:</strong> phone, email and AI rebilled, with a markup you set. HighLevel adds 5% to A2P and carrier pass-through fees when rebilling is on.</li>
        </ul>
        <p>
          Rebilling has to be switched on for each client. Our{" "}
          <Link href="/guides/gohighlevel-saas-mode">SaaS mode guide</Link> explains how the Founder plan resells GoHighLevel under your brand.
        </p>

        <h2 id="not-included">What does the estimate leave out?</h2>
        <p>
          The estimate covers the plan, LC Phone, LC Email, AI Employee plans, Voice AI and the paid add-ons. It leaves out sales tax, WhatsApp&apos;s own
          conversation fees, Conversation AI pay-per-use (billed by tokens, so it depends on the model and message length) and one-off services such
          as HighLevel&apos;s $1,000 advanced account setup.
        </p>
        <ul>
          <li>Prices outside the US and Canada differ, especially for phone numbers and texts.</li>
          <li>Long texts are split into segments of 160 characters (70 with emoji), and each segment is charged.</li>
          <li>Usage fees can apply during the 14-day free trial, so texts and calls sent while testing are charged.</li>
        </ul>
        <p>
          For what each plan includes, see our <Link href="/guides/how-much-does-gohighlevel-cost">GoHighLevel pricing guide</Link>. If you will text
          US contacts, our <Link href="/resources/a2p-10dlc-checklist">A2P 10DLC checklist</Link> helps you get the registration approved the first
          time, and our <Link href="/guides/connect-twilio-lc-phone-gohighlevel">LC Phone and Twilio guide</Link> covers the phone setup.
        </p>

        <TryGhl location="resource_cost_calculator" />

        <h2 id="what-we-see">What we see in real accounts</h2>
        <p>
          Newer agency owners often skip rebilling and don&apos;t watch usage. Phone, SMS, AI agents and email add up fast when clients use them
          heavily: some run cold outreach and send thousands of emails a day, others use Voice AI and SMS every day. We have seen clients leave after
          one month while the agency owner was still left paying their usage bill.
        </p>

        <h2 id="sources">Sources (checked 25 November 2026)</h2>
        <ul>
          {sources.map((s) => (
            <li key={s.href}>
              <a href={s.href} rel="noopener">{s.label}</a>, {s.note}.
            </li>
          ))}
        </ul>
      </ArticleLayout>
    </>
  );
}
