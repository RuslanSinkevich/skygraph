// Lightweight standalone Playwright script — runs against the already
// running `pnpm --filter demo-vue dev` server on :5174/vue/. No
// `playwright.config.ts` involvement, no spinning React.
//
// Usage:
//   node scripts/diagram-screenshots.mjs
//
// Output: `_audit/edge-routing-screenshots/*.png`

import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = path.resolve(process.cwd(), '_audit/edge-routing-screenshots')
const BASE = process.env.BASE ?? 'http://localhost:5174/vue/'

await mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

console.log(`opening ${BASE}#/components/diagram`)
await page.goto(`${BASE}#/components/diagram`, { waitUntil: 'networkidle' })
await page.waitForSelector('.sg-diagram', { timeout: 30000 })
await page.waitForTimeout(2000)

const boxes = await page
  .locator('section, .sg-demo-box, [class*="DemoBox"], [class*="demo-box"]')
  .all()
console.log(`found ${boxes.length} potential demo boxes`)

let i = 0
const seen = new Set()
for (const box of boxes) {
  const has = (await box.locator('.sg-diagram').count()) > 0
  if (!has) continue
  const title =
    (await box.locator('h2, h3, .sg-demo-box-title').first().textContent().catch(() => '')) ?? ''
  const slug =
    title
      .trim()
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || `box-${i}`
  if (seen.has(slug)) continue
  seen.add(slug)
  const file = path.join(OUT_DIR, `${String(i).padStart(2, '0')}-${slug}.png`)
  await box.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  try {
    await box.locator('.sg-diagram').first().screenshot({ path: file })
    console.log(`  saved ${file}`)
    i++
  } catch (err) {
    console.warn(`  skip ${slug}: ${err.message}`)
  }
}

console.log(`done — ${i} screenshots saved to ${OUT_DIR}`)
await browser.close()
