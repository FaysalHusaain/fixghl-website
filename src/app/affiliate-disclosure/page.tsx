import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Affiliate Disclosure | FixGHL", description: "FixGHL may earn a commission when you sign up for GoHighLevel through our link. How it works and how it affects our advice.", path: "/affiliate-disclosure" });

export default function Page() {
  return (
    <LegalPage title="Affiliate disclosure" path="/affiliate-disclosure" updated="2026-10-31">
      <p>
        FixGHL is a member of the HighLevel affiliate program. If you sign up for GoHighLevel through a link on this site, such as our{" "}
        <a href="/try-ghl" rel="sponsored nofollow" data-track="affiliate_click" data-track-location="affiliate_disclosure">Try GoHighLevel</a> link, we may earn a commission from HighLevel. You pay the same price either way.
      </p>
      <h2>What do you get through our link?</h2>
      <p>
        Our link takes you to HighLevel&apos;s own sign-up page, which currently offers a 30-day free trial. HighLevel&apos;s standard trial is
        14 days. HighLevel sets the plans, prices and trial terms, and bills you directly. You can also sign up at gohighlevel.com without our
        link. We help you the same way whichever you choose.
      </p>
      <h2>How does it affect our advice?</h2>
      <p>
        It does not. We recommend GoHighLevel because we work in it every day, and we tell you when another platform suits you better. Our
        comparisons state prices and limits with the date they were checked. Our fees for fixes, setups and migrations are separate and are
        paid by you, never by HighLevel.
      </p>
      <h2>Which links are affiliate links?</h2>
      <p>
        Links that start a GoHighLevel trial or purchase are affiliate links and are marked as sponsored in the page code. Links to HighLevel&apos;s
        help center and documentation are not.
      </p>
      <h2>Are we part of HighLevel?</h2>
      <p>No. FixGHL is an independent studio and is not affiliated with or endorsed by HighLevel Inc.</p>
    </LegalPage>
  );
}
