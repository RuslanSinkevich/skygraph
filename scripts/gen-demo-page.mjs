#!/usr/bin/env node
/**
 * gen-demo-page — scaffolds a new demo page for `examples/demo` (React)
 * and/or `examples/demo-vue` (Vue) from the templates in
 * `scripts/templates/`.
 *
 * The script intentionally does NOT mutate `App.tsx`, `App.vue`, locale
 * dictionaries, or root `package.json`. Wiring up routes / i18n keys is
 * left to the developer to keep collisions with parallel work streams to
 * a minimum (see `docs/_streams/CHARTER.md`).
 *
 * Runs on plain Node 18+ (ESM). No new dev-dependencies. See
 * `docs/_streams/decisions/T-Codegen.md` for why this is `.mjs` rather
 * than `.ts`.
 *
 * Usage:
 *   node scripts/gen-demo-page.mjs --name <kebab-case> [options]
 *
 * Options:
 *   --name <kebab-case>          Required. Page id, e.g. `color-picker`.
 *   --framework react|vue|both   Optional. Default: both.
 *   --locale-key <camelCase>     Optional. Default: derived from --name.
 *   --dry-run                    Optional. Print actions, write nothing.
 *   --force                      Optional. Overwrite existing files.
 *   --help, -h                   Print this help and exit.
 */

import { parseArgs } from 'node:util'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = resolve(__dirname, '..')
const TEMPLATES_DIR = join(__dirname, 'templates')

const FRAMEWORKS = new Set(['react', 'vue', 'both'])
const KEBAB_RE = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/
const CAMEL_RE = /^[a-z][a-zA-Z0-9]*$/

const HELP = `gen-demo-page — scaffold a new demo page

Usage:
  node scripts/gen-demo-page.mjs --name <kebab-case> [options]

Options:
  --name <kebab-case>          Required. Page id, e.g. \`color-picker\`.
  --framework react|vue|both   Optional. Default: both.
  --locale-key <camelCase>     Optional. Default: derived from --name.
  --dry-run                    Print actions, write nothing.
  --force                      Overwrite existing files.
  -h, --help                   Print this help and exit.

Examples:
  node scripts/gen-demo-page.mjs --name color-picker
  node scripts/gen-demo-page.mjs --name color-picker --framework vue
  node scripts/gen-demo-page.mjs --name color-picker --locale-key colorPicker --dry-run
`

/* ─── helpers ────────────────────────────────────────────────────────── */

/** kebab-case → PascalCase */
function toPascal(kebab) {
  return kebab
    .split('-')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

/** kebab-case → camelCase */
function toCamel(kebab) {
  const parts = kebab.split('-').filter(Boolean)
  if (parts.length === 0) return ''
  const [head, ...tail] = parts
  return (
    head +
    tail.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
  )
}

/** kebab-case → "Title Case" (best effort, only for the page heading) */
function toTitle(kebab) {
  return kebab
    .split('-')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

/** Apply __NAME__ / __PASCAL__ / __LOCALE_KEY__ / __TITLE__ substitutions. */
function render(template, ctx) {
  return template
    .replaceAll('__PASCAL__', ctx.pascal)
    .replaceAll('__LOCALE_KEY__', ctx.localeKey)
    .replaceAll('__TITLE__', ctx.title)
    .replaceAll('__NAME__', ctx.name)
}

function fail(msg, code = 1) {
  process.stderr.write(`gen-demo-page: ${msg}\n`)
  process.exit(code)
}

/* ─── CLI parsing ────────────────────────────────────────────────────── */

let parsed
try {
  parsed = parseArgs({
    args: process.argv.slice(2),
    options: {
      name: { type: 'string' },
      framework: { type: 'string', default: 'both' },
      'locale-key': { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      force: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
    strict: true,
    allowPositionals: false,
  })
} catch (err) {
  fail(`bad arguments: ${err instanceof Error ? err.message : String(err)}\n\n${HELP}`)
}

const { values } = /** @type {{ values: Record<string, string | boolean | undefined> }} */ (parsed)

if (values.help) {
  process.stdout.write(HELP)
  process.exit(0)
}

const name = typeof values.name === 'string' ? values.name : ''
if (!name) {
  fail(`--name is required\n\n${HELP}`)
}
if (!KEBAB_RE.test(name)) {
  fail(`--name must be kebab-case (got "${name}")`)
}

const framework = String(values.framework ?? 'both')
if (!FRAMEWORKS.has(framework)) {
  fail(`--framework must be one of react|vue|both (got "${framework}")`)
}

const localeKey =
  typeof values['locale-key'] === 'string' && values['locale-key']
    ? values['locale-key']
    : toCamel(name)
if (!CAMEL_RE.test(localeKey)) {
  fail(`--locale-key must be camelCase (got "${localeKey}")`)
}

const dryRun = values['dry-run'] === true
const force = values.force === true

const ctx = {
  name,
  pascal: toPascal(name),
  localeKey,
  title: toTitle(name),
}

/* ─── targets ────────────────────────────────────────────────────────── */

/** @typedef {{ id: 'react' | 'vue', template: string, target: string }} Target */
/** @type {Target[]} */
const targets = []

if (framework === 'react' || framework === 'both') {
  targets.push({
    id: 'react',
    template: join(TEMPLATES_DIR, 'demo-page.react.tsx.tmpl'),
    target: join(
      REPO_ROOT,
      'examples',
      'demo',
      'src',
      'demos',
      ctx.name,
      `${ctx.pascal}.tsx`,
    ),
  })
}

if (framework === 'vue' || framework === 'both') {
  targets.push({
    id: 'vue',
    template: join(TEMPLATES_DIR, 'demo-page.vue.vue.tmpl'),
    target: join(
      REPO_ROOT,
      'examples',
      'demo-vue',
      'src',
      'demos',
      ctx.name,
      `${ctx.pascal}.vue`,
    ),
  })
}

/* ─── pre-flight checks ──────────────────────────────────────────────── */

for (const t of targets) {
  if (!existsSync(t.template)) {
    fail(`template missing: ${t.template}`, 2)
  }
  if (existsSync(t.target) && !force) {
    fail(
      `target already exists, refusing to overwrite (pass --force to override): ${t.target}`,
    )
  }
}

/* ─── execute ────────────────────────────────────────────────────────── */

const written = []

for (const t of targets) {
  const tpl = readFileSync(t.template, 'utf8')
  const out = render(tpl, ctx)

  if (dryRun) {
    process.stdout.write(`[dry-run] would write ${t.target} (${out.length} bytes)\n`)
    continue
  }

  mkdirSync(dirname(t.target), { recursive: true })
  writeFileSync(t.target, out, 'utf8')
  written.push(t.target)
}

/* ─── follow-up instructions ─────────────────────────────────────────── */

const lines = []
lines.push('')
lines.push(dryRun ? 'Dry run complete. No files written.' : 'Generated:')
for (const p of written) lines.push(`  + ${p}`)
lines.push('')
lines.push('Next steps (do these by hand to avoid clashing with parallel streams):')
if (framework === 'react' || framework === 'both') {
  lines.push(
    `  1. Register a route for "${ctx.pascal}" in examples/demo/src/App.tsx`,
  )
  lines.push(
    `  2. Add the "${ctx.localeKey}" key to examples/demo/src/i18n/dict-en.ts and dict-ru.ts`,
  )
}
if (framework === 'vue' || framework === 'both') {
  lines.push(
    `  ${framework === 'both' ? '3' : '1'}. Register a route for "${ctx.pascal}" in examples/demo-vue/src/App.vue or src/router/index.ts`,
  )
  lines.push(
    `  ${framework === 'both' ? '4' : '2'}. Add the "${ctx.localeKey}" key to examples/demo-vue/src/i18n/dict-en.ts and dict-ru.ts`,
  )
}
lines.push('')

process.stdout.write(lines.join('\n'))
