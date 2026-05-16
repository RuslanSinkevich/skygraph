import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } })
const page = await ctx.newPage()

async function visit(url, name) {
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const { title, h1, sg } = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.textContent ?? '',
    sg: document.querySelectorAll('[class*="sg-"]').length,
  }))
  console.log(`${name.padEnd(20)} title="${title}" h1="${h1.slice(0, 40)}" sg=${sg}`)
}

console.log('--- Vue ---')
await visit('http://localhost:5174/vue/#/components/button', 'button')
await visit('http://localhost:5174/vue/#/components/form', 'form')
await visit('http://localhost:5174/vue/#/components/charts', 'charts')
await visit('http://localhost:5174/vue/#/components/timeline', 'timeline')

console.log('\n--- React ---')
await visit('http://localhost:5173/react/#/components/button', 'button')
await visit('http://localhost:5173/react/#/components/form', 'form')
await visit('http://localhost:5173/react/#/components/charts', 'charts')
await visit('http://localhost:5173/react/#/components/timeline', 'timeline')

await browser.close()
