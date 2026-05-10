#!/usr/bin/env node
// @ts-check
/**
 * Bundle budget guard — keeps the React `examples/demo` total JS payload under
 * a hard ceiling (raw, unminified-by-gzip bytes). Complements `.size-limit.json`
 * which only watches the main entry chunk (`assets/index-*.js`). The demo
 * code-splits a dozen lazy showcase apps (`AdminApp-*.js`, `WorkflowEditorApp-*.js`,
 * etc.) that collectively dwarf the entry — without a guard, every new lazy
 * route silently inflates the user's first-paint network cost.
 *
 * Strategy:
 *   1. Sum the byte size of every `examples/demo/dist/assets/*.js` file.
 *   2. Compare against `TOTAL_BUDGET_BYTES`.
 *   3. Print a sorted table + headroom; exit 1 on overshoot.
 *
 * Updating the limit: see `scripts/README.md` ("Bundle budget").
 */

import { readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

/**
 * Hard ceiling for the sum of every JS asset shipped by `examples/demo`.
 * At time of writing, baseline is ~3.5 MB (one ~2.9 MB main chunk + ~600 KB
 * across ~14 lazy showcase apps). 5 MB gives ~1.5 MB headroom for new
 * showcases / vendor bumps before the gate trips.
 */
const TOTAL_BUDGET_BYTES = 5_000_000

const TARGETS = [
  {
    name: 'examples/demo',
    dir: join(ROOT, 'examples', 'demo', 'dist', 'assets'),
  },
]

/**
 * @param {string} dir
 * @returns {Promise<Array<{ path: string, bytes: number }>>}
 */
async function listJsFiles(dir) {
  if (!existsSync(dir)) {
    console.error(
      `[bundle:check] missing directory: ${relative(ROOT, dir)}\n` +
        '              run `pnpm --filter demo build` first.',
    )
    process.exit(1)
  }
  const entries = await readdir(dir)
  const out = []
  for (const name of entries) {
    if (!name.endsWith('.js')) continue
    const p = join(dir, name)
    const s = await stat(p)
    if (!s.isFile()) continue
    out.push({ path: p, bytes: s.size })
  }
  return out
}

/** @param {number} bytes */
function fmtBytes(bytes) {
  const sign = bytes < 0 ? '-' : ''
  const n = Math.abs(bytes)
  if (n >= 1_000_000) return `${sign}${(n / 1_000_000).toFixed(2)} MB`
  if (n >= 1_000) return `${sign}${(n / 1_000).toFixed(1)} KB`
  return `${sign}${n} B`
}

/** @param {string} p */
function basename(p) {
  return p.split(/[\\/]/).pop() ?? p
}

async function main() {
  let grandTotal = 0
  let allFiles = []
  for (const target of TARGETS) {
    const files = await listJsFiles(target.dir)
    allFiles = allFiles.concat(
      files.map((f) => ({ ...f, target: target.name })),
    )
    grandTotal += files.reduce((acc, f) => acc + f.bytes, 0)
  }

  allFiles.sort((a, b) => b.bytes - a.bytes)

  // Column widths chosen so the table reads cleanly in CI logs.
  const NAME_W = 50
  const SIZE_W = 12

  console.log('')
  console.log('Bundle budget — raw bytes of all JS assets')
  console.log('─'.repeat(NAME_W + SIZE_W + 2))
  console.log(`${'chunk'.padEnd(NAME_W)}  ${'size'.padStart(SIZE_W)}`)
  console.log('─'.repeat(NAME_W + SIZE_W + 2))
  for (const f of allFiles) {
    const name = `${f.target}/assets/${basename(f.path)}`
    const display = name.length > NAME_W ? '…' + name.slice(-(NAME_W - 1)) : name
    console.log(`${display.padEnd(NAME_W)}  ${fmtBytes(f.bytes).padStart(SIZE_W)}`)
  }
  console.log('─'.repeat(NAME_W + SIZE_W + 2))
  console.log(
    `${'TOTAL'.padEnd(NAME_W)}  ${fmtBytes(grandTotal).padStart(SIZE_W)}`,
  )
  console.log(
    `${'BUDGET'.padEnd(NAME_W)}  ${fmtBytes(TOTAL_BUDGET_BYTES).padStart(SIZE_W)}`,
  )
  const headroom = TOTAL_BUDGET_BYTES - grandTotal
  const headroomPct = ((headroom / TOTAL_BUDGET_BYTES) * 100).toFixed(1)
  console.log(
    `${'HEADROOM'.padEnd(NAME_W)}  ${fmtBytes(headroom).padStart(SIZE_W)}  (${headroomPct}%)`,
  )
  console.log('')

  if (grandTotal > TOTAL_BUDGET_BYTES) {
    // stderr after the table so CI logs read top-to-bottom: numbers, then verdict.
    console.log('')
    console.error(
      `[bundle:check] FAIL — total JS payload (${fmtBytes(grandTotal)}) exceeds ` +
        `budget (${fmtBytes(TOTAL_BUDGET_BYTES)}) by ${fmtBytes(grandTotal - TOTAL_BUDGET_BYTES)}.\n` +
        '              See scripts/README.md ("Bundle budget") for how to react.',
    )
    process.exit(1)
  }
  console.log(`[bundle:check] OK — ${headroomPct}% headroom remaining.`)
}

main().catch((err) => {
  console.error('[bundle:check] crashed:', err)
  process.exit(1)
})
