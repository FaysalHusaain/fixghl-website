// Builds ONE self-contained HTML preview of the whole site from the production build.
// Every page lives in a <template>; a small inline router swaps pages, scrolls to the top,
// and re-implements the interactive parts (search finder, mobile menu, booking tabs, mobile bar).
import { writeFileSync } from "node:fs";

const [out] = process.argv.slice(2);
const base = "http://localhost:3100";
const sm = await (await fetch(base + "/sitemap.xml")).text();
const paths = [...sm.matchAll(/<loc>https:\/\/fixghl\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
paths.push("/book/thanks", "/case-studies");

const idOf = (p) => (p === "/" ? "home" : p.slice(1).replace(/\//g, "-"));
const strip = (h) =>
  h
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<link[^>]*>/g, "")
    .replace(/href="(\/[^"#?]*)(#([^"]*))?"/g, (m, p, _h, frag) => {
      if (!paths.includes(p)) return m;
      if (p === "/book" && frag === "describe") return 'href="#book-describe"';
      return `href="#${idOf(p)}"`;
    })
    .replace(/href="#describe"/g, 'href="#book-describe"');

const styles = new Set();
const pages = [];
let shell;
for (const p of paths) {
  const html = await (await fetch(base + p)).text();
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) styles.add(m[1].replace(/@font-face\{[^}]*\}/g, ""));
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "FixGHL";
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
  pages.push({ id: idOf(p), path: p, title, main: strip(main) });
  if (p === "/") {
    const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
    shell = strip(body.replace(/<main id="main">[\s\S]*?<\/main>/, '<main id="main"></main>'));
    shell = shell.replace(/<a href="#main"[\s\S]*?<\/a>/, "");
  }
}

const routes = Object.fromEntries(pages.map((p) => [p.id, p.title]));
const page = `<title>FixGHL Site Preview</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600&display=swap">
${[...styles].map((s) => `<style>${s}</style>`).join("\n")}
<style>
:root{--font-inter:Inter,"Inter Fallback";--font-inter-tight:"Inter Tight","Inter Tight Fallback";scroll-behavior:auto!important}
html,body{background:#faf9f8}
[data-reveal]{opacity:1!important;transform:none!important}
</style>
<div id="top" class="antialiased" style="min-height:100%">${shell}</div>
${pages.map((p) => `<template id="tpl-${p.id}" data-title="${p.title.replace(/"/g, "&quot;")}">${p.main}</template>`).join("\n")}
<script>
(function () {
  var ROUTES = ${JSON.stringify(routes)};
  var main = document.getElementById("main");
  var menu = document.getElementById("mobile-menu");
  var menuBtn = document.querySelector('[aria-controls="mobile-menu"]');

  function toTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    var t = document.getElementById("top");
    if (t && t.scrollIntoView) t.scrollIntoView({ block: "start" });
  }

  function closeMenu() {
    if (menu) menu.hidden = true;
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
  }

  function render(id) {
    var describe = id === "book-describe";
    if (describe) id = "book";
    if (!ROUTES[id]) id = "home";
    var tpl = document.getElementById("tpl-" + id);
    main.innerHTML = "";
    main.appendChild(tpl.content.cloneNode(true));
    document.title = tpl.getAttribute("data-title");
    closeMenu();
    document.querySelectorAll('nav[aria-label="Main"] a').forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id || (id.indexOf(a.getAttribute("href").slice(1) + "-") === 0 && a.getAttribute("href") !== "#services");
      a.classList.toggle("text-ink-50", on);
    });
    wire();
    if (describe) {
      var tab = main.querySelector('[role="tab"][id$="-tab-write"]');
      if (tab) tab.click();
      var panel = main.querySelector('[id$="-panel-write"]');
      if (panel) { panel.scrollIntoView({ block: "start" }); return; }
    }
    toTop();
  }

  function go(id) {
    if (location.hash !== "#" + id) {
      try { history.pushState(null, "", "#" + id); } catch (e) {}
    }
    render(id);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.charAt(0) !== "#") return;
    e.preventDefault();
    var id = href.slice(1);
    if (ROUTES[id] || id === "book-describe") return go(id);
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
  });
  window.addEventListener("popstate", function () { render(location.hash.slice(1) || "home"); });

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var open = menu.hidden;
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", String(open));
      document.documentElement.style.overflow = open ? "hidden" : "";
    });
  }

  // Phone booking bar: appears after the first screen.
  var bar = document.querySelector('[data-track-location="mobile_bar"]');
  bar = bar && bar.closest(".fixed");
  window.addEventListener("scroll", function () {
    if (!bar) return;
    var show = window.scrollY > window.innerHeight * 0.7 && !/^#book/.test(location.hash);
    bar.classList.toggle("translate-y-full", !show);
    bar.classList.toggle("translate-y-0", show);
  }, { passive: true });

  var STOP = ["the","and","not","our","my","for","from","with","want","need","help","ghl","gohighlevel","can","how","are","into"];
  function wire() {
    // Booking tabs
    main.querySelectorAll('[role="tablist"]').forEach(function (list) {
      var tabs = list.querySelectorAll('[role="tab"]');
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          tabs.forEach(function (t) {
            var on = t === tab;
            t.setAttribute("aria-selected", String(on));
            t.className = t.className.replace(on ? "text-ink-700 hover:text-ink-950" : "bg-ink-950 text-ink-50", on ? "bg-ink-950 text-ink-50" : "text-ink-700 hover:text-ink-950");
            var panel = document.getElementById(t.getAttribute("aria-controls"));
            if (panel) panel.hidden = !on;
          });
        });
      });
    });
    // Demo form: show the thanks page instead of posting anywhere.
    main.querySelectorAll("form").forEach(function (f) {
      f.addEventListener("submit", function (e) { e.preventDefault(); go("book-thanks"); });
    });
    // Client stories
    main.querySelectorAll("[data-stories]").forEach(function (root) {
      var tabs = root.querySelectorAll("[data-story-tab]");
      var panels = root.querySelectorAll("[data-story-panel]");
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      function show(i) {
        tabs.forEach(function (t, k) {
          var on = k === i;
          t.setAttribute("data-active", String(on)); t.setAttribute("aria-selected", String(on));
          var fill = t.querySelector(".story-fill");
          var clone = fill.cloneNode(true); fill.parentNode.replaceChild(clone, fill);
          clone.addEventListener("animationend", function () { if (!reduce) show((i + 1) % tabs.length); });
        });
        panels.forEach(function (p, k) { p.setAttribute("data-active", String(k === i)); p.setAttribute("aria-hidden", String(k !== i)); });
      }
      tabs.forEach(function (t, k) { t.addEventListener("click", function () { show(k); }); });
      show(0);
    });
    // Service finder
    var finder = main.querySelector("[data-finder]");
    if (!finder) return;
    var input = finder.querySelector("[data-finder-input]");
    var items = finder.querySelectorAll("[data-finder-item]");
    var count = finder.querySelector("[data-finder-count]");
    var list = items.length ? items[0].parentNode : null;
    var empty = document.createElement("li");
    empty.className = "px-4 py-6 text-ink-300 md:px-6";
    empty.innerHTML = 'Nothing matches that yet. <a href="#book-describe" class="link text-ink-50">Describe it to us</a> and we will tell you which service fits.';
    function filter() {
      var words = input.value.toLowerCase().split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2 && STOP.indexOf(w) < 0; });
      var scored = [];
      items.forEach(function (li) {
        var hay = li.getAttribute("data-finder-item");
        var s = words.filter(function (w) { return hay.indexOf(w) > -1 || hay.indexOf(w.replace(/(ing|s)$/, "")) > -1; }).length;
        scored.push([li, words.length ? s : 1]);
      });
      scored.sort(function (a, b) { return b[1] - a[1]; });
      var n = 0;
      scored.forEach(function (x) { x[0].hidden = x[1] === 0; if (x[1] > 0) { n++; list.appendChild(x[0]); } });
      if (n === 0) list.appendChild(empty); else if (empty.parentNode) empty.remove();
      count.textContent = input.value ? n + " matching " + (n === 1 ? "service" : "services") + ". Tap one to open its page." : "All services. Tap one to open its page.";
    }
    input.addEventListener("input", filter);
    finder.querySelectorAll("[data-finder-chip]").forEach(function (chip) {
      chip.addEventListener("click", function () { input.value = chip.getAttribute("data-finder-chip"); filter(); });
    });
  }

  render(location.hash.slice(1) || "home");
})();
</script>`;
writeFileSync(out, page);
console.log(pages.length, "pages,", (page.length / 1024 / 1024).toFixed(2), "MB");
