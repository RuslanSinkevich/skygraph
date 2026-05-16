import { chromium } from 'playwright'
import { mkdir, rm, writeFile } from 'node:fs/promises'

const REACT = 'http://localhost:5173/react/'
const VUE = 'http://localhost:5174/vue/'

await rm('./screenshots/all', { recursive: true, force: true })
await mkdir('./screenshots/all', { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } })

const reactPage = await ctx.newPage()

async function discoverPages(page, baseUrl) {
  // navigate to any /components/X first to load sidebar
  await page.goto(`${baseUrl}#/components/button`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const hrefs = await page.evaluate(() => {
    const out = new Set()
    for (const a of document.querySelectorAll('a[href*="#/components/"]')) {
      out.add(a.getAttribute('href'))
    }
    return [...out]
  })
  return hrefs
}

console.log('Discovering pages...')
const pages = await discoverPages(reactPage, REACT)
console.log(`Found ${pages.length} component pages.`)

await reactPage.close()

const reactErrors = {}
const vueErrors = {}
const reactCounts = {}
const vueCounts = {}

async function visitOne(page, baseUrl, href, label) {
  const errors = []
  const handler = (err) => errors.push(`pageerror: ${err.message}`)
  const consoleHandler = (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
  }
  page.on('pageerror', handler)
  page.on('console', consoleHandler)

  await page.goto(`${baseUrl}${href}`, { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(800)

  const counts = await page.evaluate(() => {
    return {
      demoBoxes: document.querySelectorAll('.sg-demo-box, .demo-box, .demo, section[class*="demo"]').length,
      sgElements: document.querySelectorAll('[class*="sg-"]').length,
      anyError: !!document.querySelector('[data-error], .error'),
    }
  })

  const slug = href.replace(/^#\/components\//, '').replace(/[\/?]/g, '_')
  await page.screenshot({ path: `./screenshots/all/${label}-${slug}.png`, fullPage: true }).catch(() => {})

  page.off('pageerror', handler)
  page.off('console', consoleHandler)

  return { errors, counts }
}

const vuePage = await ctx.newPage()
const newReactPage = await ctx.newPage()

for (const href of pages) {
  const slug = href.replace(/^#\/components\//, '')
  const r = await visitOne(newReactPage, REACT, href, 'react')
  const v = await visitOne(vuePage, VUE, href, 'vue')
  reactErrors[slug] = r.errors
  vueErrors[slug] = v.errors
  reactCounts[slug] = r.counts
  vueCounts[slug] = v.counts
  console.log(
    `${slug.padEnd(28)} R: boxes=${r.counts.demoBoxes}, sg=${r.counts.sgElements}, err=${r.errors.length} | V: boxes=${v.counts.demoBoxes}, sg=${v.counts.sgElements}, err=${v.errors.length}`,
  )
}

const summary = {
  pages: pages.length,
  vueErrorsTotal: Object.values(vueErrors).reduce((s, e) => s + e.length, 0),
  reactErrorsTotal: Object.values(reactErrors).reduce((s, e) => s + e.length, 0),
  vueOnlyErrorPages: Object.entries(vueErrors).filter(
    ([k, errs]) => errs.length > 0 && (reactErrors[k]?.length ?? 0) === 0,
  ),
  largeCountDeltas: Object.keys(reactCounts).map((k) => ({
    slug: k,
    reactBoxes: reactCounts[k]?.demoBoxes ?? 0,
    vueBoxes: vueCounts[k]?.demoBoxes ?? 0,
    reactSg: reactCounts[k]?.sgElements ?? 0,
    vueSg: vueCounts[k]?.sgElements ?? 0,
  })),
}

await writeFile('./screenshots/all/_summary.json', JSON.stringify(summary, null, 2))

console.log(`\n=== Summary ===`)
console.log(`Vue errors total: ${summary.vueErrorsTotal}`)
console.log(`React errors total: ${summary.reactErrorsTotal}`)
if (summary.vueOnlyErrorPages.length > 0) {
  console.log(`\nVue-only error pages:`)
  for (const [k, errs] of summary.vueOnlyErrorPages) {
    console.log(`  ${k}:`)
    for (const e of errs.slice(0, 3)) console.log(`    - ${e}`)
  }
}

await browser.close()
console.log('\nDone.')
