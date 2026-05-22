// Fast screenshot capture for Diagram demo boxes.
// Runs against the already running `pnpm --filter demo-vue dev` server.
//
// Usage: node scripts/diagram-screenshots.mjs

import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = path.resolve(process.cwd(), '_audit/edge-routing-v2')
const BASE = process.env.BASE ?? 'http://localhost:5174/vue/'

await mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

console.log(`opening ${BASE}#/components/diagram`)
await page.goto(`${BASE}#/components/diagram`, { waitUntil: 'networkidle' })
await page.waitForSelector('.sg-diagram', { timeout: 30000 })
// Wait for LargeGraph to settle and for layout / async demos to mount.
await page.waitForTimeout(2500)

// Group each diagram with its nearest preceding heading. The demo
// uses `<DemoBox :title="..."><Diagram /></DemoBox>`, which puts the
// title in an h3 / h4 inside the same parent — we walk up the DOM to
// find that ancestor.
const diagrams = await page.locator('.sg-diagram').all()
console.log(`found ${diagrams.length} .sg-diagram elements`)

let i = 0
for (const diagram of diagrams) {
  // Resolve title via the closest box ancestor that has a heading.
  const meta = await diagram.evaluate((el) => {
    let cur = el.parentElement
    while (cur) {
      const h = cur.querySelector('h2, h3, h4, .sg-demo-box-title')
      if (h && h.textContent && h.textContent.trim().length > 0) {
        return { title: h.textContent.trim() }
      }
      cur = cur.parentElement
    }
    return { title: '' }
  })
  const slug = (meta.title || `diagram-${i}`)
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  const file = path.join(OUT_DIR, `${String(i).padStart(2, '0')}-${slug || `box-${i}`}.png`)
  await diagram.scrollIntoViewIfNeeded()
  await page.waitForTimeout(120)
  await diagram.screenshot({ path: file })
  console.log(`  ${i.toString().padStart(2, '0')} ${meta.title || '(no title)'} → ${path.basename(file)}`)
  i++
}

console.log(`\ndone — ${i} screenshots in ${OUT_DIR}`)
await browser.close()
