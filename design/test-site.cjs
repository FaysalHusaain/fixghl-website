const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const fails = []; let n = 0;
  for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    const p = await b.newPage({ viewport: vp });
    for (const start of ['/', '/services/ghl-fixes', '/guides/ghl-workflow-not-triggering']) {
      await p.goto('http://localhost:3100' + start, { waitUntil: 'networkidle' });
      const hrefs = [...new Set(await p.evaluate(() => [...document.querySelectorAll('main a[href^="/"]')].filter(a => a.offsetParent).map(a => a.getAttribute('href'))))];
      for (const href of hrefs) {
        await p.goto('http://localhost:3100' + start, { waitUntil: 'networkidle' });
        const a = p.locator(`main a[href="${href}"]`).filter({ visible: true }).first();
        await a.scrollIntoViewIfNeeded(); await a.click();
        await p.waitForURL(u => u.pathname === href.split('#')[0], { timeout: 10000 }).catch(() => fails.push(`${start} -> ${href}: no navigation`));
        await p.waitForTimeout(900);
        const y = await p.evaluate(() => scrollY); n++;
        if (!href.includes('#') && y !== 0) fails.push(`${vp.width} ${start} -> ${href}: scrollY ${y}`);
        if (href.includes('#describe') && !(await p.locator('#book-page-panel-write').isVisible())) fails.push(`${vp.width} ${start} -> ${href}: form tab closed`);
      }
    }
    await p.goto('http://localhost:3100/', { waitUntil: 'networkidle' });
    for (const [chip, top] of [['moving from ClickFunnels', 'Migrations'], ['SaaS mode', 'SaaS mode & white-label'], ['Stripe not syncing', 'Integrations'], ['workflow not firing', 'GHL fixes']]) {
      await p.locator(`[data-finder-chip="${chip}"]`).click(); await p.waitForTimeout(100);
      const first = await p.locator('[data-finder-item] span.font-display').first().textContent();
      if (first !== top) fails.push(`${vp.width} chip ${chip}: ${first}`);
    }
    await p.close();
  }
  console.log('clicked', n, fails.length ? 'FAILURES:\n' + fails.join('\n') : 'ALL REAL-SITE CHECKS PASSED');
  await b.close();
})();
