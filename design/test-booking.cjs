// Booking calendar flow test. Run against a server started with VERCEL_ENV=preview (sample times).
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const OUT = process.argv[2] || ".";
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); console.log(ok ? "  ok " : "  FAIL", msg); };

(async () => {
  const b = await chromium.launch();
  for (const [name, vp, tz] of [["desk", { width: 1440, height: 1000 }, "America/New_York"], ["mob", { width: 390, height: 844 }, "Europe/London"]]) {
    console.log(name);
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2, timezoneId: tz });
    const p = await ctx.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    p.on("console", (m) => m.type() === "error" && !/422/.test(m.text()) && errors.push(m.text()));
    await p.goto(`${BASE}/book`, { waitUntil: "networkidle" });
    const card = p.locator("#book-page .bk");
    await card.locator(".bk-day").first().waitFor();
    check((await card.textContent()).includes(tz.split("/")[1].replace("_", " ")), `zone shown (${tz})`);
    check(await card.locator("text=Preview · sample times").isVisible(), "preview badge visible");
    await card.scrollIntoViewIfNeeded();
    await card.screenshot({ path: `${OUT}/bk-${name}-1.png` });

    // Keyboard: focus roving day, arrow right, Enter on an open day.
    await card.locator('.bk-day[tabindex="0"]').focus();
    const before = await p.evaluate(() => document.activeElement.dataset.day);
    await p.keyboard.press("ArrowRight");
    const after = await p.evaluate(() => document.activeElement.dataset.day);
    check(before && after && after > before, `arrow key moves focus ${before} -> ${after}`);
    const ring = await p.evaluate(() => getComputedStyle(document.activeElement).outlineColor);
    check(ring === "rgb(255, 222, 89)", `gold focus ring (${ring})`);
    // Closed days do nothing.
    const closed = card.locator('.bk-day[data-state="closed"]').first();
    if (await closed.count()) { await closed.click({ force: true }); check((await card.textContent()).includes("Step 1 of 3"), "closed day not selectable"); }

    await card.locator('.bk-day[data-state="open"]').first().click();
    await p.waitForTimeout(400);
    check((await card.textContent()).includes("Step 2 of 3"), "step 2 after picking day");
    check(await p.evaluate(() => document.activeElement.tagName === "H3"), "focus moved to step heading");
    const pills = card.locator(".bk-pill");
    check((await pills.count()) > 0, `time pills listed (${await pills.count()})`);
    const box = await pills.first().boundingBox();
    check(box.height >= 44, `pill target ${Math.round(box.height)}px`);
    await pills.first().hover();
    await card.screenshot({ path: `${OUT}/bk-${name}-2.png` });
    const firstTime = (await pills.first().textContent()).trim();
    await pills.first().click();
    await p.waitForTimeout(400);
    check((await card.textContent()).includes("Step 3 of 3") && (await card.textContent()).includes(firstTime), `step 3 with time ${firstTime}`);

    // Back to step 2 shows the selected pill in black.
    await card.getByRole("button", { name: "Change time" }).click();
    await p.waitForTimeout(350);
    check((await card.locator('.bk-pill[aria-pressed="true"]').count()) === 1, "selected pill kept");
    await card.locator('.bk-pill[aria-pressed="true"]').click();
    await p.waitForTimeout(350);

    // Validation errors.
    await card.getByRole("button", { name: /Confirm my call/ }).click();
    await p.waitForTimeout(500);
    check(await p.evaluate(() => document.activeElement.id === "bk-name"), "focus to first invalid field");
    check((await card.locator("#bk-name-error").count()) === 1, "name error shown");
    await card.screenshot({ path: `${OUT}/bk-${name}-3-errors.png` });

    await card.locator("#bk-name").fill("Test Person");
    await card.locator("#bk-email").fill("test@example.com");
    await card.locator("#bk-need").selectOption({ index: 1 });
    await card.locator("#bk-details").fill("Our booking reminders stopped sending.");
    await card.screenshot({ path: `${OUT}/bk-${name}-3.png` });
    await Promise.all([p.waitForURL(/\/book\/thanks/), card.getByRole("button", { name: /Confirm my call/ }).click()]);
    check(p.url().includes("/book/thanks?via=calendar"), "redirect to thanks");

    // Time zone change refetches and rerenders.
    await p.goto(`${BASE}/book`, { waitUntil: "networkidle" });
    await card.locator(".bk-day").first().waitFor();
    await card.getByRole("button", { name: "Change time zone" }).click();
    await card.locator("select").selectOption("Asia/Dubai");
    await card.locator('.bk-day[data-state="open"]').first().waitFor();
    check((await card.textContent()).includes("Dubai"), "time zone switch to Dubai");
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    check(!overflow, "no horizontal overflow");
    check(errors.length === 0, `no console errors ${errors.join(" | ")}`);
    await ctx.close();
  }
  await b.close();
  console.log(fails.length ? `\n${fails.length} FAILED` : "\nALL BOOKING CHECKS PASSED");
  process.exit(fails.length ? 1 : 0);
})();
