import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { Analytics } from "@/components/analytics/Analytics";
import { Reveal } from "@/components/analytics/Reveal";
import { JsonLd, organization, website } from "@/lib/schema";
import { site } from "@/lib/site";
import { topServices, migrationServices } from "@/content/services";

const navServices = topServices.filter((s) => s.slug !== "migrations").map((s) => ({ href: s.path, label: s.name }));
const navMigrations = migrationServices.map((s) => ({ href: s.path, label: s.name }));
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "optional" });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "FixGHL | GoHighLevel Fixes, Setups & Migrations", template: "%s | FixGHL" },
  description: site.oneLine,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-gold-500 px-5 py-3 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header services={navServices} migrations={navMigrations} />
        <main id="main">{children}</main>
        <Footer />
        <MobileBookBar />
        <Analytics />
        <Reveal />
        {process.env.VERCEL && (
          <>
            <VercelAnalytics />
            <SpeedInsights />
          </>
        )}
        <JsonLd data={[organization(), website()]} />
      </body>
    </html>
  );
}
