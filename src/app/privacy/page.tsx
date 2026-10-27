import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { Txt } from "@/components/ui/Txt";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy | FixGHL", description: "How FixGHL collects, uses and protects personal data from this website, our booking calendar, contact form and analytics.", path: "/privacy" });

export default function Page() {
  return (
    <LegalPage title="Privacy policy" path="/privacy" updated="2026-10-26">
      <p>
        This policy explains what personal data FixGHL collects through fixghl.com, why, and what you can do about it. The data controller is{" "}
        <Txt>{site.legalEntity}</Txt>. You can contact us about privacy at <Txt>{site.email}</Txt>.
      </p>
      <h2>What data do we collect?</h2>
      <ul>
        <li><strong>When you book a call:</strong> your name, email, phone number if you give it, and your answers to the booking questions (what you need, your current platform, urgency and your website or GHL account URL).</li>
        <li><strong>When you send the contact form:</strong> your name, email, what you need, urgency, an optional website address and your description of the problem.</li>
        <li><strong>When you browse the site:</strong> if you allow analytics cookies, Google Analytics 4 records pages viewed, approximate location, device and browser, and the site that referred you. Vercel Web Analytics and Speed Insights record page views and performance without cookies.</li>
      </ul>
      <h2>How do we use it?</h2>
      <ul>
        <li>To reply to you, run the call you booked and send a quote you asked for.</li>
        <li>To deliver and support a project you hire us for.</li>
        <li>To understand which pages help visitors, so we can improve the site.</li>
      </ul>
      <p>We do not sell personal data and we do not use it for advertising.</p>
      <h2>What is our legal basis?</h2>
      <p>
        For enquiries and projects, we rely on steps taken at your request before entering a contract, and on the contract itself. For
        analytics cookies, we rely on your consent, which you can withdraw at any time by clearing this site&apos;s cookies and choosing Decline.
      </p>
      <h2>Who processes it for us?</h2>
      <ul>
        <li><strong>HighLevel (LeadConnector)</strong> hosts our booking calendar, form submissions and client records in our CRM.</li>
        <li><strong>Google</strong> provides Google Analytics 4, with IP anonymisation and advertising features turned off.</li>
        <li><strong>Vercel</strong> hosts this website and provides cookie-free analytics and performance monitoring.</li>
      </ul>
      <p>Some of these providers process data outside your country, including in the United States, under their own safeguards such as standard contractual clauses.</p>
      <h2>How long do we keep it?</h2>
      <p>
        We keep enquiry details for as long as we need them to reply and follow up. We keep client project records for as long as we need
        them to deliver the service and to meet legal and accounting obligations. Google Analytics data is kept for the retention period set
        in our Google Analytics account. You can ask us to delete your data at any time.
      </p>
      <h2>What are your rights?</h2>
      <p>
        Depending on where you live, including under the UK GDPR, the EU GDPR and US state privacy laws such as the CCPA, you can ask to access,
        correct, delete or export your data, object to or restrict its use, and withdraw consent. Write to <Txt>{site.email}</Txt>. You can
        also complain to your local data protection authority.
      </p>
      <h2>Cookies</h2>
      <p>
        Google Analytics cookies are set only after you choose Allow analytics in the banner. We store your choice in your browser&apos;s
        local storage. The booking calendar is embedded from HighLevel and may set its own cookies when it loads.
      </p>
      <h2>Changes</h2>
      <p>We will update this page when our practices change and show the date at the top. See also our <Link href="/terms">terms</Link>.</p>
    </LegalPage>
  );
}
