// Submit every sitemap URL to IndexNow (Bing, Yandex and others). Run after a production deploy:
//   INDEXNOW_KEY=... NEXT_PUBLIC_SITE_URL=https://fixghl.com node scripts/indexnow.mjs
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://fixghl.com").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY;
if (!key) throw new Error("Set INDEXNOW_KEY");
const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
