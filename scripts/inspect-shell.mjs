#!/usr/bin/env node
// scripts/inspect-shell.mjs
//
// Compare shell-level styles (Header / Sidebar / Footer / Main padding)
// between Vue and React demos via DOM measurements. Bypasses screenshot
// quirks; reports raw computed-style values for a fixed sample of routes.

import { writeFileSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { chromium } from '@playwright/test'

const VUE_BASE = (process.argv.find((a) => a.startsWith('--vue=')) ?? '--vue=http://localhost:5175').slice(6).replace(/\/+$/, '')
const REACT_BASE = (process.argv.find((a) => a.startsWith('--react=')) ?? '--react=http://localhost:5174/skygraph').slice(8).replace(/\/+$/, '')
const OUT_RAW = (process.argv.find((a) => a.startsWith('--out=')) ?? '--out=docs/_streams/audit/screenshots').slice(6)
const OUT = resolve(OUT_RAW || 'docs/_streams/audit/screenshots')

mkdirSync(OUT, { recursive: true })

const SAMPLE_ROUTES = [
  { name: 'landing', path: '/' },
  { name: 'button', path: '/components/button' },
  { name: 'input', path: '/components/input' },
  { name: 'configprovider', path: '/components/configprovider' },
]

function buildUrl(framework, path) {
  if (framework === 'vue') {
    if (path === '/') return `${VUE_BASE}/`
    return `${VUE_BASE}/#${path}`
  }
  if (path === '/') return `${REACT_BASE}/`
  return `${REACT_BASE}/#${path}`
}

const SHELL_QUERY = `(() => {
  function pick(el, props) {
    if (!el) return null
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    const out = { x: r.x, y: r.y, w: r.width, h: r.height }
    for (const p of props) out[p] = cs[p]
    return out
  }
  function tokenColor(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  }
  // Try Vue (xshell-*) classes first, fall back to React (demo-* / hub-*).
  const header =
    document.querySelector('.xshell-header, .demo-header, .hub-header, [role="banner"]') ?? null
  const sidebar =
    document.querySelector('.xshell-sidebar, .demo-sidebar, .hub-sidebar, [aria-label*="ection"]') ?? null
  const footer =
    document.querySelector('.xshell-footer, .demo-footer, .hub-footer, [role="contentinfo"]') ?? null
  const main =
    document.querySelector('.xshell-main, .demo-main, .hub-main, main') ?? null
  const mainInner =
    document.querySelector('.xshell-main-inner, .demo-main-inner') ?? null
  const body = document.querySelector('.xshell-body, .demo-body, .hub-body') ?? null

  const sidebarSections = sidebar ? sidebar.querySelectorAll('.xshell-sidebar-section, .demo-sidebar-section, .hub-sidebar-section').length : 0
  const sidebarItems = sidebar ? sidebar.querySelectorAll('.xshell-sidebar-item, .demo-sidebar-item, .hub-sidebar-item, a[href^="#/"]').length : 0
  const navItems = header ? header.querySelectorAll('.xshell-nav-item, .demo-header-nav-item, [role="navigation"] a, [role="navigation"] button, nav a, nav button').length : 0
  const footerCols = footer ? footer.querySelectorAll('[class*="footer-col"], [class*="-col"]:not([class*="title"]):not([class*="bottom"])').length : 0

  return {
    docHeight: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
    viewportW: innerWidth,
    viewportH: innerHeight,
    rootSection: (document.querySelector('.xshell, .demo-shell, .hub-shell')?.getAttribute('data-section')) ?? null,
    bodyClass: body?.className ?? null,
    bodyGrid: body ? getComputedStyle(body).gridTemplateColumns : null,
    header: header ? { ...pick(header, ['position','height','padding','backgroundColor','borderBottom','zIndex','gap']), navItems } : null,
    sidebar: sidebar
      ? { ...pick(sidebar, ['position','width','height','padding','backgroundColor','borderRight','top']), sidebarSections, sidebarItems }
      : { missing: true },
    main: main ? pick(main, ['padding','width','maxWidth','justifyContent','display']) : null,
    mainInner: mainInner ? pick(mainInner, ['width','maxWidth']) : null,
    footer: footer ? { ...pick(footer, ['padding','marginTop','backgroundColor','borderTop']), footerCols } : null,
    tokens: {
      bg: tokenColor('--sg-color-bg'),
      bgHover: tokenColor('--sg-color-bg-hover'),
      bgSecondary: tokenColor('--sg-color-bg-secondary'),
      border: tokenColor('--sg-color-border'),
      text: tokenColor('--sg-color-text'),
      textSecondary: tokenColor('--sg-color-text-secondary'),
      primary: tokenColor('--sg-color-primary'),
    },
  }
})()`

async function main() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()

  const results = {}
  for (const route of SAMPLE_ROUTES) {
    results[route.name] = {}
    for (const fw of ['vue', 'react']) {
      const url = buildUrl(fw, route.path)
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(600)
      const data = await page.evaluate(SHELL_QUERY)
      results[route.name][fw] = { url, data }
      console.log(`[shell] ${fw}/${route.name}`, JSON.stringify({ section: data.rootSection, sb: data.sidebar?.missing ? 'NONE' : `${data.sidebar.sidebarItems}items @ ${data.sidebar.width}`, header: `${data.header?.height} pad ${data.header?.padding}` }))
    }
  }

  writeFileSync(join(OUT, 'shell-inspect.json'), JSON.stringify(results, null, 2), 'utf8')
  console.log(`\n[shell] saved ${join(OUT, 'shell-inspect.json')}`)

  await browser.close()
}

main().catch((e) => {
  console.error('[shell] fatal:', e)
  process.exit(2)
})
