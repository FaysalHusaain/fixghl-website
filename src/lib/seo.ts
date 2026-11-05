import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

type Args = { title: string; description: string; path: string; noindex?: boolean; type?: "website" | "article"; published?: string; updated?: string };

const ogPath = (path: string) => `/og${path === "/" ? "/home" : path}`;

export function pageMetadata({ title, description, path, noindex, type = "website", published, updated }: Args): Metadata {
  const image = { url: ogPath(path), width: 1200, height: 630, alt: title };
  return {
    title: { absolute: title },
    description,
    // Next's metadata always drops the slash from a bare-domain URL, so the homepage writes its canonical and og:url
    // itself (HomeCanonical) as https://fixghl.com/, matching the sitemap and internal links.
    alternates: path === "/" ? undefined : { canonical: absoluteUrl(path) },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      ...(path === "/" ? {} : { url: absoluteUrl(path) }),
      siteName: site.name,
      title,
      description,
      locale: "en_US",
      images: [image],
      ...(type === "article" ? { publishedTime: published, modifiedTime: updated } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
