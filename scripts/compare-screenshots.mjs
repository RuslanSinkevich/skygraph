#!/usr/bin/env node
// scripts/compare-screenshots.mjs
//
// Pairwise compare PNG screenshots in <out>/vue and <out>/react.
// Uses headless Chromium + canvas (no extra deps).
//
// For each <name>: load both PNGs to <canvas>, getImageData, compare.
// Report diff% (mismatched pixels / total pixels), with a ~10/255 tolerance
// per channel to absorb font-AA / sub-pixel differences.
//
// Output: <out>/compare-log.json + console summary sorted by diff% desc.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
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

const args = parseArgs(process.argv)
const OUT = resolve(args.out ?? 'docs/_streams/audit/screenshots')
const ROUTES_FILE = resolve(args.routes ?? join(OUT, '..', 'screenshots', 'routes.json'))
const TOLERANCE = Number.parseInt(args.tolerance ?? '10', 10) // per-channel
const TOP = Number.parseInt(args.top ?? '20', 10)

const cfg = JSON.parse(readFileSync(ROUTES_FILE, 'utf8'))
const routes = cfg.routes ?? []

function toDataUrl(file) {
  const buf = readFileSync(file)
  return `data:image/png;base64,${buf.toString('base64')}`
}

const compareScript = `
window.__compare = async (vueDataUrl, reactDataUrl, tolerance) => {
  const load = (src) => new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });
  const a = await load(vueDataUrl);
  const b = await load(reactDataUrl);
  const w = Math.max(a.width, b.width);
  const h = Math.max(a.height, b.height);
  const minH = Math.min(a.height, b.height);
  const minW = Math.min(a.width, b.width);
  const ca = document.createElement('canvas'); ca.width = w; ca.height = h;
  const cb = document.createElement('canvas'); cb.width = w; cb.height = h;
  const xa = ca.getContext('2d'); const xb = cb.getContext('2d');
  xa.fillStyle = '#ffffff'; xa.fillRect(0,0,w,h); xa.drawImage(a, 0, 0);
  xb.fillStyle = '#ffffff'; xb.fillRect(0,0,w,h); xb.drawImage(b, 0, 0);
  const da = xa.getImageData(0,0,w,h).data;
  const db = xb.getImageData(0,0,w,h).data;
  let diff = 0; let common = 0;
  // Limit to overlap area for diff%, count outside as "extra" only.
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (x < minW && y < minH) {
        common++;
        const dr = Math.abs(da[idx] - db[idx]);
        const dg = Math.abs(da[idx+1] - db[idx+1]);
        const dbb = Math.abs(da[idx+2] - db[idx+2]);
        if (dr > tolerance || dg > tolerance || dbb > tolerance) diff++;
      }
    }
  }
  return {
    vueW: a.width, vueH: a.height,
    reactW: b.width, reactH: b.height,
    overlapW: minW, overlapH: minH,
    canvasW: w, canvasH: h,
    diffPixels: diff,
    commonPixels: common,
    diffPct: common > 0 ? (diff / common) * 100 : 0,
  };
};
`

async function main() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 800, height: 600 } })
  const page = await ctx.newPage()
  await page.setContent('<!doctype html><html><body></body></html>')
  await page.evaluate(compareScript)

  const results = []
  for (const r of routes) {
    const vueFile = join(OUT, 'vue', `${r.name}.png`)
    const reactFile = join(OUT, 'react', `${r.name}.png`)
    if (!existsSync(vueFile) || !existsSync(reactFile)) {
      console.log(`[cmp] SKIP ${r.name}: missing png`)
      continue
    }
    const v = toDataUrl(vueFile)
    const re = toDataUrl(reactFile)
    const stats = await page.evaluate(
      ({ v, re, t }) => window.__compare(v, re, t),
      { v, re, t: TOLERANCE },
    )
    results.push({ name: r.name, path: r.path, ...stats })
    const heightDelta = stats.vueH - stats.reactH
    console.log(
      `[cmp] ${r.name.padEnd(22)} diff=${stats.diffPct.toFixed(1).padStart(5)}%  v=${stats.vueW}x${stats.vueH}  r=${stats.reactW}x${stats.reactH}  Δh=${heightDelta}`,
    )
  }

  await ctx.close()
  await browser.close()

  // Sort by diff%
  results.sort((a, b) => b.diffPct - a.diffPct)

  writeFileSync(
    join(OUT, 'compare-log.json'),
    JSON.stringify({ when: new Date().toISOString(), tolerance: TOLERANCE, results }, null, 2),
    'utf8',
  )
  console.log(`\n[cmp] TOP ${TOP} by diff%:`)
  for (const r of results.slice(0, TOP)) {
    console.log(`  ${r.name.padEnd(22)} ${r.diffPct.toFixed(1).padStart(5)}%  Δh=${r.vueH - r.reactH}`)
  }
}

main().catch((e) => {
  console.error('[cmp] fatal:', e)
  process.exit(2)
})
