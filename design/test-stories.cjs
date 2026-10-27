const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const out = [];
  for (const url of ['file:///tmp/claude-0/spa.html', 'http://localhost:3100/']) {
    for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      const p = await b.newPage({ viewport: vp });
      await p.goto(url, { waitUntil: 'networkidle' });
      const act = () => p.evaluate(() => document.querySelector('[data-story-tab][data-active="true"]').dataset.storyTab);
      await p.waitForTimeout(8000); // sits above the fold: must NOT advance yet
      const before = await act();
      const names = await p.evaluate(() => [...document.querySelectorAll('[data-story-tab] .story-name')].map(n => n.textContent));
      await p.locator('[data-stories]').scrollIntoViewIfNeeded(); await p.mouse.move(1, 1);
      const seq = [await act()];
      for (let k = 0; k < 6; k++) { await p.waitForTimeout(7150); seq.push(await act()); }
      await p.waitForTimeout(7500); const rest = await act();
      const done = await p.evaluate(() => document.querySelector('[data-stories]').dataset.done);
      const faqOpen = await p.evaluate(() => document.querySelectorAll('details[open]').length);
      out.push(`${url.startsWith('file') ? 'preview' : 'site'} ${vp.width}: before scroll=${before}; sequence=${seq.join('>')}; after end rests on=${rest} done=${done}; FAQs open=${faqOpen}; first=${names[0]}`);
      await p.close();
    }
  }
  console.log(out.join('\n')); await b.close();
})();
