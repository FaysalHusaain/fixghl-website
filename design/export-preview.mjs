// Exports the production build as static, script-free HTML pages for a shareable design preview.
import { writeFileSync, mkdirSync } from "node:fs";
const [out] = process.argv.slice(2);
const base = "http://localhost:3100";
const sm = await (await fetch(base + "/sitemap.xml")).text();
const paths = [...sm.matchAll(/<loc>https:\/\/fixghl\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
paths.push("/book/thanks", "/case-studies");
const name = (p) => (p === "/" ? "index.html" : p.slice(1).replace(/\//g, "--") + ".html");
const fonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600&display=swap">';
mkdirSync(out, { recursive: true });
for (const p of paths) {
  let html = await (await fetch(base + p)).text();
  html = html
    .replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<link[^>]+rel="(preload|modulepreload|prefetch)"[^>]*>/g, "")
    .replace(/@font-face\{[^}]*\}/g, "")
    .replace(/href="(\/[^"#?]*)(#[^"]*)?"/g, (m, h, hash = "") => (paths.includes(h) ? `href="${name(h)}${hash}"` : m))
    .replace(/href="#describe"/g, 'href="book.html"')
    .replace("</head>", `${fonts}<style>.js-reveal [data-reveal]{opacity:1!important;transform:none!important}</style></head>`);
  if (p === "/") {
    // The artifact host wraps the main page in its own document skeleton: keep only head styles/title and body content.
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<meta[^>]*>/g, "");
    const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
    const htmlClass = html.match(/<html[^>]*class="([^"]*)"/)[1];
    html = `${head}<style>:root{--font-inter:Inter,"Inter Fallback";--font-inter-tight:"Inter Tight","Inter Tight Fallback"}</style><div class="${htmlClass}" style="min-height:100%">${body}</div>`;
    html = html.replace("<style", '<meta name="claude:viewport-fit-sides" content="cover"><style').replace(/<title>[^<]*<\/title>/, "<title>FixGHL Site Preview</title>");
  }
  writeFileSync(`${out}/${name(p)}`, html);
}
console.log(paths.length, "pages exported");
