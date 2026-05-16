import { chromium } from 'playwright'
import { mkdir, rm } from 'node:fs/promises'

const REACT = 'http://localhost:5173/react/'
const VUE = 'http://localhost:5174/vue/'

await rm('./screenshots/focused', { recursive: true, force: true })
await mkdir('./screenshots/focused', { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } })

const KEY_PAGES = [
  'form',
  'charts',
  'timeline',
  'gantt',
  'descriptions',
  'tabs',
  'menu',
  'breadcrumb',
  'collapse',
  'pagination',
  'steps',
  'segmented',
  'dropdown',
  'modal',
  'drawer',
  'notification',
  'popconfirm',
  'tooltip',
  'dashboard',
  'list',
  'tree',
  'diagram',
  'resource-calendar',
]

async function capture(page, baseUrl, slug, label) {
  const errors = []
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`)
  })
  await page.goto(`${baseUrl}#/components/${slug}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000) // explicit wait for hash routing
  await page.screenshot({ path: `./screenshots/focused/${label}-${slug}.png`, fullPage: true })
  const info = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent ?? '',
    sg: document.querySelectorAll('[class*="sg-"]').length,
    demoBoxes: document.querySelectorAll('.sg-demo-box, .demo-box').length,
  }))
  return { ...info, errors }
}

for (const slug of KEY_PAGES) {
  const reactPage = await ctx.newPage()
  const vuePage = await ctx.newPage()
  const r = await capture(reactPage, REACT, slug, 'react')
  const v = await capture(vuePage, VUE, slug, 'vue')
  console.log(
    `${slug.padEnd(20)} R: h1="${r.h1.slice(0, 18).padEnd(18)}" boxes=${String(r.demoBoxes).padStart(3)} sg=${String(r.sg).padStart(5)} err=${r.errors.length} | V: h1="${v.h1.slice(0, 18).padEnd(18)}" boxes=${String(v.demoBoxes).padStart(3)} sg=${String(v.sg).padStart(5)} err=${v.errors.length}`,
  )
  if (v.errors.length > 0) {
    for (const e of v.errors.slice(0, 3)) console.log(`    Vue: ${e}`)
  }
  await reactPage.close()
  await vuePage.close()
}

await browser.close()
console.log('\nDone.')
