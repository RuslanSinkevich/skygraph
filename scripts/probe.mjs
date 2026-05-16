import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } })
const page = await ctx.newPage()

for (const url of ['http://localhost:5173/react/', 'http://localhost:5174/vue/']) {
  console.log(`\n=== ${url} ===`)
  // try common URLs
  for (const path of ['#/components/table', '#/table', '?id=table', '#table']) {
    const target = `${url}${path}`
    await page.goto(target, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    const has = await page.locator('.sg-table-wrapper').count()
    console.log(`  ${path}: tables=${has}`)
    if (has > 0) break
  }
}

await browser.close()
