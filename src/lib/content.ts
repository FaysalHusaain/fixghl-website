import { readFileSync } from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

// Extracts H2 headings from an MDX file for the table of contents. Slugs match rehype-slug.
export function getToc(dir: "guides" | "compare" | "glossary", slug: string) {
  const file = path.join(process.cwd(), "src/content", dir, `${slug}.mdx`);
  const src = readFileSync(file, "utf8");
  const slugger = new GithubSlugger();
  const toc: { id: string; text: string }[] = [];
  for (const line of src.split("\n")) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/[*_`]/g, "");
    const id = slugger.slug(text);
    if (m[1] === "##") toc.push({ id, text });
  }
  return toc;
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
