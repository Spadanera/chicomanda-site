// Generates public/og.png (1200×630), the social sharing image, from the logo and the Federo wordmark.
// Run again only when the logo or the tagline change, then commit the PNG:
//   npx -y -p playwright@1 node scripts/og-image.mjs
// (needs a Chromium for Playwright: `npx playwright install chromium` the first time)
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright').catch(() => require('playwright'))

const logo = await readFile(new URL('../src/assets/logo/maitre-light.svg', import.meta.url), 'utf8')
const font = await readFile(require.resolve('@fontsource/federo/files/federo-latin-400-normal.woff2'))

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Federo; src: url(data:font/woff2;base64,${font.toString('base64')}) format('woff2'); }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: #EFE5D2; color: #2A2522; font-family: Federo, sans-serif;
  display: flex; align-items: center; gap: 72px; padding: 0 96px; position: relative; overflow: hidden; }
body::before { content: ""; position: absolute; inset: 22px; border: 2px solid #2A2522; border-radius: 6px; }
body::after { content: ""; position: absolute; inset: 32px; border: 1px solid rgba(42,37,34,.35); border-radius: 4px; }
.logo { position: relative; width: 380px; height: 380px; flex: none; }
.logo::before { content: ""; position: absolute; inset: -60px; border-radius: 50%;
  background: repeating-conic-gradient(rgba(210,154,60,.55) 0 1.2deg, transparent 1.2deg 10deg);
  -webkit-mask: radial-gradient(circle, transparent 0 45%, #000 46% 62%, transparent 72%); }
.logo svg { position: relative; width: 100%; height: 100%; }
h1 { font-size: 84px; font-weight: 400; letter-spacing: .14em; text-transform: uppercase; line-height: 1; }
.rule { display: flex; align-items: center; gap: 14px; width: 260px; margin: 28px 0; }
.rule::before, .rule::after { content: ""; flex: 1; height: 2px; background: rgba(42,37,34,.4); }
.rule span { width: 12px; height: 12px; background: #D29A3C; transform: rotate(45deg); }
p { font-size: 40px; line-height: 1.25; color: #22427A; }
</style></head><body>
<div class="logo">${logo}</div>
<div><h1>Chi Comanda</h1><div class="rule"><span></span></div><p>Le comande del tuo locale,<br>dal tavolo al bancone.</p></div>
</body></html>`

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: new URL('../public/og.png', import.meta.url).pathname, type: 'png' })
await browser.close()
console.log('public/og.png written')
