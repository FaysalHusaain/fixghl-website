import type { Metadata } from "next";
import { getService } from "@/content/services";
import { ServicePage } from "@/components/services/ServicePage";
import { pageMetadata } from "@/lib/seo";

const s = getService("migrations");
export const metadata: Metadata = pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: s.path });

export default function Page() {
  return <ServicePage s={s} />;
}
