// Tell IndexNow (Bing, Yandex and others) about pages that actually changed.
// IndexNow asks sites to submit only added, updated or deleted URLs and not to resubmit unchanged ones
// (indexnow.org/faq, checked Nov 2026: "Do not resubmit unchanged URLs"; every submission counts toward the
// site's crawl quota). So it sends a URL only when it is new or its sitemap <lastmod> changed since the last
// submission. "lastmod" comes from each page's `updated` date, which only moves when the content really
// changes. The last submitted lastmod per URL is kept in INDEXNOW_STATE (a JSON file the workflow caches).
// With no state file yet, it falls back to URLs whose lastmod is within the last INDEXNOW_DAYS days (default 2).
//
// Runs after each production deploy (.github/workflows/indexnow.yml) and by hand: npm run indexnow
//   INDEXNOW_URLS="https://fixghl.com/a https://fixghl.com/b"  submit exactly these URLs
//   INDEXNOW_ALL=1                                              submit every sitemap URL (only after a site-wide change)
//   SITEMAP_FILE=path/to/sitemap.xml                            read a local sitemap instead of the live one (testing)
//   INDEXNOW_DRY_RUN=1                                          print what would be sent, send nothing
// The key is public by design: it is served at https://fixghl.com/<key>.txt from public/.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://fixghl.com").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY || readdirSync(new URL("../public", import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4);
if (!key) throw new Error("No IndexNow key: set INDEXNOW_KEY or add public/<key>.txt");

const days = Number(process.env.INDEXNOW_DAYS || 2);
const manual = (process.env.INDEXNOW_URLS || "").split(/[\s,]+/).filter(Boolean);

const statePath = process.env.INDEXNOW_STATE;
const state = statePath && existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : null;
let entries = [];
let urlList;
if (manual.length) {
  urlList = manual;
} else {
  const xml = process.env.SITEMAP_FILE ? readFileSync(process.env.SITEMAP_FILE, "utf8") : await (await fetch(`${site}/sitemap.xml`)).text();
  entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
    lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  })).filter((e) => e.loc);
  if (!entries.length) throw new Error("Sitemap has no URLs");
  if (process.env.INDEXNOW_ALL === "1") {
    urlList = entries.map((e) => e.loc);
  } else if (state) {
    urlList = entries.filter((e) => state[e.loc] !== (e.lastmod || "")).map((e) => e.loc);
  } else {
    const cutoff = Date.now() - days * 86_400_000;
    urlList = entries.filter((e) => e.lastmod && Date.parse(e.lastmod) >= cutoff).map((e) => e.loc);
  }
}

const saveState = () => {
  if (!statePath || !entries.length) return;
  writeFileSync(statePath, JSON.stringify(Object.fromEntries(entries.map((e) => [e.loc, e.lastmod || ""])), null, 1));
};

if (!urlList.length) {
  console.log("IndexNow: no new or changed pages, nothing to submit.");
  if (!state) saveState();
  process.exit(0);
}

console.log(`IndexNow: ${urlList.length} URL(s)\n${urlList.join("\n")}`);
if (process.env.INDEXNOW_DRY_RUN === "1") process.exit(0);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText}`);
if (!res.ok) process.exit(1);
saveState();
