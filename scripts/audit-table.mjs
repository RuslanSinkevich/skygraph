import { chromium } from 'playwright'
import { mkdir, rm } from 'node:fs/promises'

const REACT = 'http://localhost:5173/react/'
const VUE = 'http://localhost:5174/vue/'

await rm('./screenshots/table', { recursive: true, force: true })
await mkdir('./screenshots/table', { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } })

async function gotoTablePage(page, baseUrl) {
  await page.goto(`${baseUrl}#/components/table`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.waitForSelector('.sg-table-wrapper, .sg-table-grid', { timeout: 5000 }).catch(() => {})
}

async function captureTablePage(page, label, baseUrl) {
  const errors = []
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
  })

  await gotoTablePage(page, baseUrl)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)

  await page.screenshot({ path: `./screenshots/table/${label}-full.png`, fullPage: true })

  return { errors }
}

const reactPage = await ctx.newPage()
const vuePage = await ctx.newPage()

console.log('Capturing React Table page...')
const reactInfo = await captureTablePage(reactPage, 'react', REACT)
console.log('Capturing Vue Table page...')
const vueInfo = await captureTablePage(vuePage, 'vue', VUE)

console.log('React errors:', reactInfo.errors.length, reactInfo.errors.slice(0, 5))
console.log('Vue errors:', vueInfo.errors.length, vueInfo.errors.slice(0, 5))

// Detailed audit of Vue table page
const audit = await vuePage.evaluate(() => {
  const wrappers = Array.from(document.querySelectorAll('.sg-table-wrapper'))
  return {
    totalTables: wrappers.length,
    tables: wrappers.map((w, i) => {
      const grid = w.querySelector('.sg-table-grid')
      const headerCells = w.querySelectorAll('.sg-table-th')
      const bodyCells = w.querySelectorAll('.sg-table-td')
      const rows = w.querySelectorAll('.sg-table-row-clickable')
      const pagination = w.querySelector('.sg-table-pagination')
      const paginationControls = w.querySelector('.sg-pagination')
      const fixedCells = w.querySelectorAll('.sg-table-cell-fixed')
      const expandBtns = w.querySelectorAll('.sg-table-expand-btn')
      const treeBtns = w.querySelectorAll('.sg-table-cell-expand')
      const expandedRows = w.querySelectorAll('.sg-table-expanded-row')
      const summaryRows = w.querySelectorAll('.sg-table-summary-cell')
      const footerCells = w.querySelectorAll('.sg-table-footer-cell')
      const virtualRows = w.querySelectorAll('[data-sg-virtual-row-index]')
      const cssGridTpl = grid ? getComputedStyle(grid).gridTemplateColumns : ''
      const gridDisplay = grid ? getComputedStyle(grid).display : ''
      const scroll = w.querySelector('.sg-table-scroll')
      const overflowY = scroll ? getComputedStyle(scroll).overflowY : ''
      const scrollHeight = scroll?.scrollHeight ?? 0
      const clientHeight = scroll?.clientHeight ?? 0

      return {
        idx: i,
        hasGrid: !!grid,
        gridDisplay,
        cssGridTpl: cssGridTpl.slice(0, 200),
        cols: cssGridTpl.split(' ').length,
        headerCells: headerCells.length,
        bodyCells: bodyCells.length,
        rowCount: rows.length,
        hasPagination: !!pagination,
        hasPaginationControls: !!paginationControls,
        scrollOverflowY: overflowY,
        scrollHeight,
        clientHeight,
        fixedCellsCount: fixedCells.length,
        expandBtns: expandBtns.length,
        treeBtns: treeBtns.length,
        expandedRows: expandedRows.length,
        summaryCells: summaryRows.length,
        footerCells: footerCells.length,
        virtualRowsRendered: virtualRows.length,
      }
    }),
  }
})

console.log(`\n=== Vue Table page: ${audit.totalTables} tables ===`)
audit.tables.forEach((t) => {
  console.log(
    `#${t.idx.toString().padStart(2, '0')}: cols=${t.cols} rows=${t.rowCount} ` +
      `pag=${t.hasPagination ? 'Y' : 'n'} virt=${t.virtualRowsRendered > 0 ? 'Y' : 'n'} ` +
      `fixed=${t.fixedCellsCount} expand=${t.expandBtns} tree=${t.treeBtns} ` +
      `summary=${t.summaryCells} footer=${t.footerCells} ` +
      `scrollH=${t.scrollHeight} clientH=${t.clientHeight}`,
  )
})

// Per-DemoBox screenshots
async function capturePerDemo(page, label) {
  const boxes = page.locator('.sg-demo-box, [class*="DemoBox"], section, .demo-box')
  // Skygraph demo uses Skycode-like .sg-demobox layout
  // Try different selectors
  const candidates = ['.sg-demo-box', '.demo-box', 'section:has(.sg-table-wrapper)']
  let chosen = ''
  for (const sel of candidates) {
    const count = await page.locator(sel).count()
    if (count > 5) {
      chosen = sel
      break
    }
  }
  if (!chosen) return 0
  const els = page.locator(chosen)
  const n = await els.count()
  for (let i = 0; i < n; i++) {
    try {
      const el = els.nth(i)
      await el.scrollIntoViewIfNeeded({ timeout: 500 })
      await el.screenshot({ path: `./screenshots/table/${label}-demo-${i.toString().padStart(2, '0')}.png` })
    } catch {}
  }
  return n
}

const reactDemos = await capturePerDemo(reactPage, 'react')
const vueDemos = await capturePerDemo(vuePage, 'vue')
console.log(`\nReact demo boxes captured: ${reactDemos}`)
console.log(`Vue demo boxes captured: ${vueDemos}`)

await browser.close()
console.log('\nDone. Screenshots in ./screenshots/table/')
