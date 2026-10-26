// Builds a self-contained design-review page from the real production build (hero markup + compiled CSS).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const out = process.argv[2];
const html = await (await fetch("http://localhost:3100/")).text();
const main = html.match(/<main[\s\S]*<\/main>/)[0];
const cssFile = readdirSync(".next/static/chunks").find((f) => f.endsWith(".css"));
let css = readFileSync(`.next/static/chunks/${cssFile}`, "utf8");
css = css
  .replace(/@font-face\{[^}]*url\([^}]*\}/g, "")
  .replace(/@media \(min-width:(40|48)rem\)/g, "@container (min-width:$1rem)")
  .replace(/\{([^{}]*)\}/g, (m, body) =>
    "{" + body.replace(/([\d.]+)s?vh/g, "calc($1 * var(--pv-vh))").replace(/([\d.]+)vw/g, "$1cqw") + "}")
  .replace(/(^|[}\s,])(html|body|:root|:host)(?=[\s,{:])/g, "$1.pv-doc")
  .replace(/\.pv-doc,\.pv-doc/g, ".pv-doc");
const page = readFileSync("design/preview.template.html", "utf8")
  .replace("/*__CSS__*/", () => css)
  .replaceAll("<!--__HERO__-->", () => main.replace(/<main/, '<div class="pv-main"').replace(/<\/main>$/, "</div>"));
writeFileSync(out, page);
console.log("wrote", out, (page.length / 1024).toFixed(0) + "KB");
