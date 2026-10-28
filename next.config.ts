import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: { inlineCss: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // GoHighLevel affiliate link. permanent: false answers with a 307.
  async redirects() {
    return [{ source: "/try-ghl", destination: "https://www.gohighlevel.com/highlevel-bootcamp?fp_ref=faisal13&fp_sid=fixghl", permanent: false }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
