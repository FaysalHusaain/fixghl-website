import type { Metadata } from "next";
import { site } from "./site";

type Args = { title: string; description: string; path: string; noindex?: boolean; type?: "website" | "article"; published?: string; updated?: string };

const ogPath = (path: string) => `/og${path === "/" ? "/home" : path}`;

export function pageMetadata({ title, description, path, noindex, type = "website", published, updated }: Args): Metadata {
  const image = { url: ogPath(path), width: 1200, height: 630, alt: title };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
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
