import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { Txt } from "@/components/ui/Txt";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ title: "Terms of Service | FixGHL", description: "Terms for using fixghl.com and for GoHighLevel services provided by FixGHL.", path: "/terms" });

export default function Page() {
  return (
    <LegalPage title="Terms of service" path="/terms" updated="2026-10-26">
      <p>
        These terms cover your use of fixghl.com and the services provided by <Txt>{site.legalEntity}</Txt> (&ldquo;FixGHL&rdquo;,
        &ldquo;we&rdquo;). Each project is also governed by the written quote you approve, which takes priority over these terms where they differ.
      </p>
      <h2>Using this website</h2>
      <p>
        The guides, comparisons and glossary on this site are general information about GoHighLevel. They are accurate to the best of our
        knowledge on the date shown, but GoHighLevel changes often. Check important details against HighLevel&apos;s own documentation before
        relying on them.
      </p>
      <h2>Quotes and scope</h2>
      <p>
        We quote each project in writing after a free call. The quote sets out the scope, the price and what we need from you. Work outside the
        agreed scope is quoted separately before we do it.
      </p>
      <h2>Access to your accounts</h2>
      <p>
        You grant us the access a project needs. You remain the owner of your GoHighLevel account, data and anything we build in it, and you
        can remove our access at any time.
      </p>
      <h2>Payment</h2>
      <p>Payment terms, including any deposit and refund terms, are set out in your written quote.</p>
      <h2>Third-party platforms</h2>
      <p>
        GoHighLevel, Stripe, Zapier, Make, n8n, ManyChat and other platforms are run by their own companies. We are not responsible for their
        outages, pricing or policy changes. FixGHL is not affiliated with or endorsed by HighLevel Inc.
      </p>
      <h2>Liability</h2>
      <p>To the extent the law allows, our total liability for a project is limited to the fees you paid for that project. Nothing in these terms limits any liability that cannot be limited by law.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <Txt>{site.email}</Txt>. See also our <Link href="/privacy">privacy policy</Link>.</p>
    </LegalPage>
  );
}
