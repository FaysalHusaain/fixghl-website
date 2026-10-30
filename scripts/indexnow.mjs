// Submit every sitemap URL to IndexNow (Bing, Yandex and others). Runs after each production deploy
// (.github/workflows/indexnow.yml) and can be run by hand: node scripts/indexnow.mjs
// The key is public by design: it is served at https://fixghl.com/<key>.txt from public/.
import { readdirSync } from "node:fs";

const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://fixghl.com").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY || readdirSync(new URL("../public", import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4);
if (!key) throw new Error("No IndexNow key: set INDEXNOW_KEY or add public/<key>.txt");

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("Sitemap has no URLs");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok) process.exit(1);
