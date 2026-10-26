const { chromium } = require('playwright');
const URL = 'file:///tmp/claude-0/spa.html';
(async () => {
  const b = await chromium.launch();
  const fails = [];
  for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    const p = await b.newPage({ viewport: vp });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL, { waitUntil: 'networkidle' });
    const ids = await p.evaluate(() => [...document.querySelectorAll('template')].map(t => t.id.slice(4)));
    // 1. every page renders with exactly one h1
    for (const id of ids) {
      await p.evaluate(id => { location.hash = id; window.dispatchEvent(new PopStateEvent('popstate')); }, id);
      const h1 = await p.locator('main h1').count();
      if (h1 !== 1) fails.push(`${vp.width} page ${id}: h1 count ${h1}`);
    }
    // 2. every unique link: click it from a scrolled page, expect right page + top of page
    const seen = new Set();
    for (const id of ids) {
      await p.evaluate(id => { history.pushState(null,'','#'+id); window.dispatchEvent(new PopStateEvent('popstate')); }, id);
      const hrefs = await p.evaluate(() => [...document.querySelectorAll('main a[href^="#"], footer a[href^="#"], header nav[aria-label="Main"] a[href^="#"]')].filter(a => a.offsetParent !== null).map(a => a.getAttribute('href')));
      for (const href of [...new Set(hrefs)]) {
        if (seen.has(href)) continue; seen.add(href);
        await p.evaluate(id => { history.pushState(null,'','#'+id); window.dispatchEvent(new PopStateEvent('popstate')); }, id);
        const a = p.locator(`main a[href="${href}"], footer a[href="${href}"], header nav[aria-label="Main"] a[href="${href}"]`).filter({ visible: true }).first();
        await a.scrollIntoViewIfNeeded();
        await a.click();
        await p.waitForTimeout(80);
        const r = await p.evaluate(() => ({ hash: location.hash, y: Math.round(window.scrollY), h1: document.querySelector('main h1')?.textContent }));
        const target = href.slice(1);
        const isRoute = ids.includes(target) || target === 'book-describe';
        if (isRoute) {
          if (r.hash !== href) fails.push(`${vp.width} ${id} -> ${href}: hash ${r.hash}`);
          if (target !== 'book-describe' && r.y !== 0) fails.push(`${vp.width} ${id} -> ${href}: landed at scrollY ${r.y}`);
          if (target === 'book-describe') {
            const vis = await p.locator('main [id$="-panel-write"]').isVisible();
            if (!vis) fails.push(`${vp.width} ${id} -> describe: form tab not open`);
          }
        } else {
          const ok = await p.evaluate(t => { const el = document.getElementById(t); return !!el; }, target);
          if (!ok) fails.push(`${vp.width} ${id} -> ${href}: in-page anchor missing`);
        }
      }
    }
    console.log(vp.width, 'checked pages', ids.length, 'unique links', seen.size);
    // 3. finder chips
    await p.evaluate(() => { history.pushState(null,'','#home'); window.dispatchEvent(new PopStateEvent('popstate')); });
    const expect = { 'workflow not firing': 'GHL fixes', 'emails in spam': 'GHL fixes', 'moving from ClickFunnels': 'Migrations', 'SaaS mode': 'SaaS mode & white-label', 'Stripe not syncing': 'Integrations' };
    for (const [chip, top] of Object.entries(expect)) {
      await p.locator(`[data-finder-chip="${chip}"]`).click();
      const first = await p.locator('[data-finder-item]:not([hidden]) span.font-display').first().textContent();
      if (first !== top) fails.push(`${vp.width} chip "${chip}": top result ${first}, expected ${top}`);
    }
    console.log('after chips hash', await p.evaluate(() => location.hash), fails);
    await p.locator('[data-finder-input]').fill('zzzz');
    if (!(await p.getByText('Nothing matches that yet').isVisible())) fails.push(`${vp.width} finder empty state missing`);
    await p.locator('[data-finder-input]').fill('');
    await p.locator('[data-finder-input]').type('kajabi');
    const k = await p.locator('[data-finder-item]:not([hidden]) span.font-display').first().textContent();
    if (k !== 'Migrations') fails.push(`${vp.width} typing kajabi -> ${k}`);
    // 4. finder row click goes to page top
    await p.locator('[data-finder-item]:not([hidden]) a').first().click();
    if ((await p.evaluate(() => location.hash)) !== '#services-migrations' || (await p.evaluate(() => scrollY)) !== 0) fails.push(`${vp.width} finder row click wrong`);
    // 5. mobile menu
    if (vp.width < 800) {
      await p.locator('[aria-controls="mobile-menu"]').click();
      if (!(await p.locator('#mobile-menu').isVisible())) fails.push('menu did not open');
      await p.locator('#mobile-menu a[href="#services-integrations"]').click();
      if ((await p.locator('#mobile-menu').isVisible()) || (await p.evaluate(() => location.hash)) !== '#services-integrations') fails.push('menu link failed');
    }
    // 6. booking tabs + demo form
    await p.evaluate(() => { history.pushState(null,'','#book'); window.dispatchEvent(new PopStateEvent('popstate')); });
    await p.locator('main [role=tab]').nth(1).click();
    if (!(await p.locator('main [id$="-panel-write"]').isVisible())) fails.push(`${vp.width} write tab did not open`);
    await p.locator('main [role=tab]').nth(0).click();
    if (!(await p.locator('main [id$="-panel-call"]').isVisible())) fails.push(`${vp.width} call tab did not reopen`);
    // 7. back button
    await p.goBack(); await p.waitForTimeout(100);
    if (errs.length) fails.push(`${vp.width} JS errors: ${errs.join(' | ')}`);
    await p.close();
  }
  console.log(fails.length ? 'FAILURES:\n' + fails.join('\n') : 'ALL CHECKS PASSED');
  await b.close();
})();
