import { site, absoluteUrl } from "@/lib/site";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { comparisons } from "@/content/compare";
import { terms } from "@/content/glossary";

// Follows the llms.txt proposal (llmstxt.org): H1, blockquote summary, details, H2 link lists, then an Optional section.
const clean = (s: string) => s.replace(/\s*\[\[(TODO|VERIFY)[^\]]*\]\]/g, "").trim();

export function GET() {
  const body = `# ${site.name}

> ${site.oneLine}

- Experience: working in GoHighLevel since 2019 (7+ years), with 100+ GHL projects delivered.
- Clients: coaches, agencies and local businesses in the United States, the United Kingdom, the European Union and the Middle East.
- How to start: a free 30-minute call at ${absoluteUrl("/book")}. Every project is quoted in writing after the call and fixed for the agreed scope.
- FixGHL is an independent studio and is not affiliated with or endorsed by HighLevel Inc.

## Services

${services.map((s) => `- [${s.h1}](${absoluteUrl(s.path)}): ${clean(s.answer).split(". ")[0]}.`).join("\n")}

## Guides

${guides.map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}`)}): ${g.summary}`).join("\n")}

## Comparisons

${comparisons.map((c) => `- [${c.title}](${absoluteUrl(`/compare/${c.slug}`)}): ${c.summary}`).join("\n")}

## Key pages

- [How we work](${absoluteUrl("/how-it-works")}): A free 30-minute call, a written scoped quote, the build or fix, and a handover with notes.
- [Pricing](${absoluteUrl("/pricing")}): Custom quote after a 30-minute call, fixed for the agreed scope.
- [FAQ](${absoluteUrl("/faq")}): Answers about working with FixGHL and about GoHighLevel.
- [Book a call](${absoluteUrl("/book")}): Book a free 30-minute GHL call or send details in writing.

## Optional

${terms.map((t) => `- [${t.term}](${absoluteUrl(`/glossary/${t.slug}`)}): ${clean(t.definition).split(". ")[0]}.`).join("\n")}
- [About FixGHL](${absoluteUrl("/about")}): The studio, who it works with and how.
- [Privacy policy](${absoluteUrl("/privacy")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
