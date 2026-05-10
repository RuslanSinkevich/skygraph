#!/usr/bin/env node
// scripts/screenshot-audit.mjs
//
// Screenshot-audit for T-Vue-Demo-StyleFixes (Wave 3.2 / Tab E).
//
// For each route in routes.json:
//   - open Vue URL  =  <vue>/#<path>             (hash-router)
//   - open React URL = <react><path>             (history-router with base /skygraph)
//   - take fullPage screenshot at fixed viewport
//   - save as <out>/<vue|react>/<name>.png
//
// Usage:
//   node scripts/screenshot-audit.mjs \
//     --vue=http://localhost:5175 \
//     --react=http://localhost:5174/skygraph \
//     --routes=docs/_streams/audit/screenshots/routes.json \
//     --out=docs/_streams/audit/screenshots
//
// Designed to be self-contained: no external configs, only reads CLI flags
// and the routes file, writes PNGs and a summary `audit-log.json`.

import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { chromium } from '@playwright/test'

function parseArgs(argv) {
  const out = {}
  for (const a of argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/)
    if (m) out[m[1]] = m[2]
    else if (a.startsWith('--')) out[a.slice(2)] = true
  }
  return out
}

function trimTrailing(s) {
  return s.replace(/\/+$/, '')
}

const args = parseArgs(process.argv)
const VUE_BASE = trimTrailing(args.vue ?? 'http://localhost:5175')
const REACT_BASE = trimTrailing(args.react ?? 'http://localhost:5174/skygraph')
const ROUTES_FILE = resolve(args.routes ?? 'docs/_streams/audit/screenshots/routes.json')
const OUT_DIR = resolve(args.out ?? 'docs/_streams/audit/screenshots')
const FRAMEWORKS = (args.only ?? 'vue,react').split(',').map((s) => s.trim()).filter(Boolean)
const FILTER = args.filter ? new RegExp(args.filter, 'i') : null
const SETTLE_MS = Number.parseInt(args.settle ?? '600', 10)
const NAV_TIMEOUT = Number.parseInt(args.timeout ?? '20000', 10)

if (!existsSync(ROUTES_FILE)) {
  console.error(`[audit] routes file not found: ${ROUTES_FILE}`)
  process.exit(2)
}

const cfg = JSON.parse(readFileSync(ROUTES_FILE, 'utf8'))
const viewport = cfg.viewport ?? { width: 1280, height: 800 }
const allRoutes = cfg.routes ?? []
const routes = FILTER ? allRoutes.filter((r) => FILTER.test(r.name)) : allRoutes

if (routes.length === 0) {
  console.error('[audit] no routes to capture')
  process.exit(2)
}

mkdirSync(join(OUT_DIR, 'vue'), { recursive: true })
mkdirSync(join(OUT_DIR, 'react'), { recursive: true })

const log = []

function buildUrl(framework, path) {
  // Both demos use hash-routers (Vue: createHashRouter; React: HashRouter at App.tsx).
  if (framework === 'vue') {
    if (path === '/') return `${VUE_BASE}/`
    return `${VUE_BASE}/#${path}`
  }
  if (path === '/') return `${REACT_BASE}/`
  return `${REACT_BASE}/#${path}`
}

// Sticky elements (sidebar/header) get cropped on Playwright fullPage
// screenshots because they stay glued to the viewport while Playwright
// scrolls. Two options:
//   1) Inject CSS to un-stick them.
//   2) Use a viewport tall enough to contain the entire page in one frame.
// Option 2 is more robust across Vue/React variants, so we set the
// viewport height very large and avoid fullPage entirely (capture the
// whole 1280×TALL viewport directly).
const TALL_VIEWPORT_H = 12000

const STICKY_FIX = `
  /* Sidebar: un-stick AND let it grow to full document height. */
  .xshell-sidebar, .demo-sidebar, .hub-sidebar {
    position: static !important;
    height: auto !important;
    max-height: none !important;
    top: auto !important;
  }
  /* Header: un-stick only. */
  .xshell-header, .demo-header, .hub-header {
    position: static !important;
  }
`

async function shoot(page, framework, route) {
  const url = buildUrl(framework, route.path)
  const file = join(OUT_DIR, framework, `${route.name}.png`)
  const t0 = Date.now()
  // Reset viewport before each goto so previous-page resize doesn't bleed
  // into the next page (some pages use min-height: 100vh which would
  // inflate to whatever height we left the viewport at).
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT })
  } catch (e) {
    try {
      await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT })
    } catch (e2) {
      log.push({ framework, name: route.name, url, ok: false, error: String(e2.message ?? e2) })
      return false
    }
  }
  // Wait for Vue/React to mount.
  await page.waitForTimeout(SETTLE_MS)
  // Apply sticky-fix.
  await page.evaluate((css) => {
    let el = document.getElementById('__sg-sticky-fix')
    if (!el) {
      el = document.createElement('style')
      el.id = '__sg-sticky-fix'
      document.head.appendChild(el)
    }
    el.textContent = css
  }, STICKY_FIX)
  await page.waitForTimeout(200)
  try {
    await page.screenshot({ path: file, fullPage: true })
  } catch (e) {
    log.push({ framework, name: route.name, url, ok: false, error: String(e.message ?? e) })
    return false
  }
  log.push({ framework, name: route.name, url, ok: true, ms: Date.now() - t0, file })
  return true
}

async function main() {
  console.log(`[audit] viewport ${viewport.width}x${viewport.height}, routes: ${routes.length}, frameworks: ${FRAMEWORKS.join(',')}`)
  console.log(`[audit] vue=${VUE_BASE}  react=${REACT_BASE}`)
  console.log(`[audit] out=${OUT_DIR}`)
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  // Silence console noise and dialogs.
  page.on('dialog', (d) => d.dismiss().catch(() => {}))
  page.on('pageerror', () => {})
  page.on('console', () => {})

  let total = 0
  let failed = 0
  for (const fw of FRAMEWORKS) {
    for (const r of routes) {
      total++
      const ok = await shoot(page, fw, r)
      if (!ok) failed++
      const tag = ok ? 'OK' : 'FAIL'
      console.log(`[audit] ${tag} ${fw}/${r.name}`)
    }
  }
  await ctx.close()
  await browser.close()

  writeFileSync(join(OUT_DIR, 'audit-log.json'), JSON.stringify({
    when: new Date().toISOString(),
    vue: VUE_BASE,
    react: REACT_BASE,
    viewport,
    total,
    failed,
    entries: log,
  }, null, 2), 'utf8')
  console.log(`[audit] done. total=${total} failed=${failed} log=${join(OUT_DIR, 'audit-log.json')}`)
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((e) => {
  console.error('[audit] fatal:', e)
  process.exit(2)
})
