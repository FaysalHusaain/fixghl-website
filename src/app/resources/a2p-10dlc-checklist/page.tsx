import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { Checklist } from "@/components/content/Checklist";
import { CopyBlock } from "@/components/content/CopyBlock";
import { PrintButton } from "@/components/content/PrintButton";
import { getResource } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

const slug = "a2p-10dlc-checklist";
const path = `/resources/${slug}`;

export function generateMetadata(): Metadata {
  const r = getResource(slug)!;
  return pageMetadata({ title: r.metaTitle, description: r.description, path, type: "article", published: r.published, updated: r.updated });
}

const brand = [
  "Pick the right brand type. Standard if the business has an EIN or tax ID. Sole Proprietor only if it has no tax ID. An LLC or Inc can't register as Sole Proprietor.",
  "Copy the legal business name and EIN exactly as they appear on the IRS CP-575 or 147C letter. One missing letter or a missing \"LLC\" is enough for a rejection.",
  "If the EIN is less than 15 days old, wait. HighLevel says new EINs may be rejected.",
  "Use a street address, not a P.O. box.",
  "Standard brands: use an email on your own domain. Free email addresses can slow approval.",
  "Sole Proprietor brands: use a public email (Gmail, Hotmail or Yahoo) and a US or Canada mobile number that can receive a code. VoIP and LeadConnector numbers aren't accepted.",
  "Don't reuse a phone number or email across too many brands. A Sole Proprietor mobile number can cover up to three brands; for Standard brands, keep the same contact phone or email to five brands or fewer.",
];

const website = [
  "The website loads, is the main business site (not just a form page) and has more than one page.",
  "It shows the registered business name, a clear description of what you do, and contact details. No placeholder text.",
  "The Privacy Policy and Terms are live pages on your own domain with direct links. Pop-ups don't count.",
  "The Privacy Policy names the registered business and includes the mobile-information sentence (template below).",
  "The Terms page covers your business name, message frequency, message and data rates, how to opt out, how to get help, and links to the Privacy Policy.",
  "Every Privacy Policy link on the site opens the same policy. Same for Terms.",
];

const optIn = [
  "The form has a phone number field.",
  "There's a separate checkbox for text messages only. It is unticked by default and not combined with email sign-up or \"I agree to the Terms\".",
  "The consent text sits right next to the checkbox and names the business, the type of messages, how often, \"Message and data rates may apply\", how to stop (STOP) and how to get help (HELP).",
  "Privacy Policy and Terms links sit on the same page, visible under the submit button, not hidden in the footer only.",
  "If the campaign uses the chat widget, the widget loads on the exact website URL you registered, and no other form on that page collects phone numbers.",
  "If the form is behind a login, upload screenshots of it instead of a link.",
];

const campaign = [
  "The campaign description names the registered business and matches what the texts actually say.",
  "The campaign type fits the texts. Marketing texts need a campaign type that allows marketing.",
  "The message flow lists every way people opt in (website form, chat widget, paper form, text-to-join, phone) with a link or screenshot for each.",
  "Sample messages look like real messages, use [brackets] for variable fields, and at least one includes the business name.",
  "No public link shorteners (bit.ly, tinyurl). A link on your own domain is fine.",
  "The STOP reply confirms the opt-out, says no more texts will be sent and names the business. The HELP reply names the business and gives a phone number or email.",
];

const templates = [
  {
    title: "Consent text (next to the checkbox)",
    text: "I agree to receive text messages from [Business name] about [appointment reminders, booking updates and offers]. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for help. Consent is not a condition of purchase. See our [Privacy Policy] and [Terms].",
  },
  {
    title: "Privacy Policy, SMS section",
    text: "Text messaging. [Business legal name] collects mobile numbers only from people who opt in to receive text messages. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
  },
  {
    title: "Terms, SMS section",
    text: "SMS terms. By opting in, you agree to receive text messages from [Business name] about [message types]. Message frequency varies. Message and data rates may apply. Reply STOP at any time to unsubscribe, or HELP for help. You can also contact us at [support email] or [phone]. Carriers are not liable for delayed or undelivered messages. See our Privacy Policy at [privacy URL].",
  },
  {
    title: "Campaign description",
    text: "[Business legal name] is a [type of business] that sends [appointment reminders, booking confirmations and follow-ups] to customers who opt in through the form at [website URL]. Messages relate to [service], are sent [how often], and every message includes how to opt out.",
  },
  {
    title: "Message flow",
    text: "Customers opt in on [form URL] by entering their phone number and ticking an unticked checkbox for text messages. The checkbox text names [Business name], the message type, frequency, that message and data rates may apply, and how to reply STOP or HELP. Links to the Privacy Policy ([URL]) and Terms ([URL]) appear under the submit button.",
  },
  {
    title: "Sample message 1",
    text: "Hi [First name], this is [Business name]. Your [service] appointment is confirmed for [date] at [time]. Reply STOP to opt out.",
  },
  {
    title: "Sample message 2",
    text: "[Business name]: Hi [First name], just a reminder about your call tomorrow at [time]. Need to reschedule? [link on your domain]. Reply STOP to opt out.",
  },
  {
    title: "STOP reply",
    text: "[Business name]: You've been unsubscribed and won't receive any more texts from us. Reply START to resubscribe.",
  },
  {
    title: "HELP reply",
    text: "[Business name]: For help, email [support email] or call [phone]. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe.",
  },
];

const codes: [string, string, string][] = [
  ["30977", "Campaign description doesn't name the registered business", "Add the exact legal name to the description"],
  ["30986", "Campaign type doesn't match the texts described", "Pick the type that fits, or change the samples"],
  ["30985", "Marketing content in a campaign type that doesn't allow it", "Use a marketing-capable campaign type"],
  ["30984", "Template text left unfilled", "Replace every [placeholder]"],
  ["30980", "Website sign-up form has no phone number field", "Add a phone field to the form"],
  ["30988", "Chat widget named in the message flow isn't on the site", "Install the widget on the registered URL"],
  ["30987", "Sign-up consent doesn't match the texts sent", "Make the checkbox text match your message types"],
  ["30569", "Missing \"Message and data rates may apply\"", "Add it next to the checkbox"],
  ["30973 / 30975", "Privacy Policy / Terms page didn't load", "Fix the link; use a live page on your domain"],
  ["30974 / 30976", "Privacy Policy / Terms too short", "Add the SMS sections above"],
  ["30981", "Privacy Policy doesn't name the registered business", "Add the legal name"],
  ["30967 / 30968", "Two links open different Privacy Policies / Terms", "Point every link to one page"],
];

const sources = [
  { label: "HighLevel: Registering your A2P brand", href: "https://help.gohighlevel.com/support/solutions/articles/155000008140-registering-your-a2p-brand" },
  { label: "HighLevel: Campaign rejection reasons and resolutions", href: "https://help.gohighlevel.com/support/solutions/articles/155000004746-campaign-rejection-reasons-and-resolutions" },
  { label: "Twilio error 30924 (consent language)", href: "https://www.twilio.com/docs/api/errors/30924" },
  { label: "Twilio error 30925 (unticked checkbox)", href: "https://www.twilio.com/docs/api/errors/30925" },
  { label: "Twilio changelog, 13 November 2026 (new rejection codes)", href: "https://www.twilio.com/en-us/changelog/new-a2p-10dlc-campaign-rejection-error-codes" },
];

const toc = [
  { id: "brand-checks", text: "Brand checks" },
  { id: "website-checks", text: "Website checks" },
  { id: "opt-in-form-checks", text: "Opt-in form checks" },
  { id: "campaign-checks", text: "Campaign checks" },
  { id: "templates", text: "Copy-ready templates" },
  { id: "what-we-see", text: "What we see in real accounts" },
  { id: "rejection-codes", text: "New rejection codes" },
  { id: "sources", text: "Sources" },
];

export default function Page() {
  const r = getResource(slug);
  if (!r) notFound();
  return (
    <ArticleLayout meta={r} path={path} crumbs={[{ name: "A2P 10DLC checklist", path }]} toc={toc} schemaType="Article" sidebarDesktopOnly>
      <p className="answer">
        Most A2P 10DLC rejections in GoHighLevel come from a few fixable things: a business name that doesn&apos;t match the tax papers, a consent
        checkbox that&apos;s missing or bundled with the terms, or privacy and terms links the reviewer can&apos;t find. Work through the four checks
        below before you submit, then use the templates to fill the gaps.
      </p>
      <div className="not-prose mt-6">
        <PrintButton />
      </div>
      <div role="note" className="not-prose mt-8 rounded-2xl bg-ink-100 p-5 text-[0.9375rem] leading-relaxed text-ink-900 print:border print:border-black">
        From 9 December 2026, Twilio plans to return more specific rejection codes for A2P campaigns. HighLevel&apos;s rejection codes use the same
        numbers, so the table at the end shows what the new ones mean.
      </div>

      <h2 id="brand-checks">1. Brand checks (before you register)</h2>
      <Checklist items={brand} />

      <h2 id="website-checks">2. Website checks</h2>
      <Checklist items={website} />

      <h2 id="opt-in-form-checks">3. Opt-in form checks</h2>
      <Checklist items={optIn} />

      <h2 id="campaign-checks">4. Campaign checks</h2>
      <Checklist items={campaign} />

      <h2 id="templates">Copy-ready templates</h2>
      <p className="text-small text-ink-600">
        Replace everything in [brackets]. These follow the published Twilio and HighLevel requirements; they don&apos;t guarantee approval.
      </p>
      {templates.map((t) => (
        <CopyBlock key={t.title} title={t.title} text={t.text} />
      ))}

      <h2 id="what-we-see">What we see in real accounts</h2>
      <p>
        Most rejections we fix come down to three things. The privacy and terms links are missing, or hidden where a reviewer won&apos;t find them,
        instead of sitting right under the opt-in button. The consent checkbox is missing, or it&apos;s tied to accepting the terms. And the business
        details don&apos;t match the LLC papers exactly. We&apos;ve seen one missing letter in the business name get a campaign rejected.
      </p>

      <h2 id="rejection-codes">New rejection codes from 9 December 2026</h2>
      <div className="table-wrap not-prose" role="region" aria-label="New A2P campaign rejection codes" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">What it means</th>
              <th scope="col">Fix</th>
            </tr>
          </thead>
          <tbody>
            {codes.map(([code, means, fix]) => (
              <tr key={code}>
                <td className="whitespace-nowrap font-medium">{code}</td>
                <td>{means}</td>
                <td>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-small text-ink-600">Some fixes need a new campaign of the right type instead of a resubmission (Twilio).</p>

      <h2 id="sources">Sources (checked 22 November 2026)</h2>
      <ul>
        {sources.map((s) => (
          <li key={s.href}>
            <a href={s.href} rel="noopener">{s.label}</a>
          </li>
        ))}
      </ul>
    </ArticleLayout>
  );
}
