import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

// Static routes can carry their own `updated` date in src/lib/routes.ts; the rest fall back to BUILD_DATE.
const BUILD_DATE = "2026-10-26";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.updated ?? BUILD_DATE,
    changeFrequency: r.section === "Guide" || r.section === "Comparison" ? "monthly" : "yearly",
    priority: r.path === "/" ? 1 : r.path.startsWith("/services") ? 0.9 : r.section === "Legal" ? 0.2 : 0.7,
  }));
}
