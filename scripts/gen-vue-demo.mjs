#!/usr/bin/env node
/**
 * gen-vue-demo — scaffolds a new Vue demo aggregator following the
 * Wave-3 architecture:
 *
 *   examples/demo-vue/src/demos/<comp-kebab>/<Example>.demo.vue
 *   examples/demo-vue/src/demos/<comp-kebab>-doc/{en,ru,useStrings}.ts
 *   examples/demo-vue/src/demos/<Comp>Demo.vue   (aggregator)
 *
 * It deliberately does NOT touch `router/index.ts`, `nav.ts`, or any
 * locale dictionary — those are shared with parallel work streams in
 * Wave 3.2 (see `docs/_streams/wave-3/CHARTER.md`). Wiring is left to
 * the developer; the script prints next-step instructions on stdout.
 *
 * Usage:
 *   node scripts/gen-vue-demo.mjs <comp-kebab> [--examples=N] [--with-css-vars]
 *
 * Examples:
 *   node scripts/gen-vue-demo.mjs color-picker
 *   node scripts/gen-vue-demo.mjs date-picker --examples=3
 *   node scripts/gen-vue-demo.mjs charts --with-css-vars
 *
 * Implementation: pure Node 18+ ESM, no extra dev-deps. Templates live
 * in `scripts/templates/vue-demo-*.tmpl` (see `T-Vue-Demo-Foundation`).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = resolve(__dirname, '..')
const TEMPLATES_DIR = join(__dirname, 'templates')

const KEBAB_RE = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/

const HELP = `gen-vue-demo — scaffold a Vue demo aggregator

Usage:
  node scripts/gen-vue-demo.mjs <comp-kebab> [options]

Options:
  --examples=N          Number of \`Default<i>.demo.vue\` files (default: 1).
                        With N=1 the file is just \`Default.demo.vue\`;
                        with N>1 they are numbered \`Default1.demo.vue\` …
  --with-css-vars       Emit a non-empty \`cssVarsData\` skeleton in the
                        aggregator and a hint text in the doc.
  -h, --help            Print this help and exit.

Examples:
  node scripts/gen-vue-demo.mjs color-picker
  node scripts/gen-vue-demo.mjs date-picker --examples=3
  node scripts/gen-vue-demo.mjs charts --with-css-vars

The generator does NOT touch:
  - examples/demo-vue/src/router/index.ts
  - examples/demo-vue/src/nav.ts
  - examples/demo-vue/src/i18n/dict-{en,ru}.ts
Wire those up by hand — instructions are printed after generation.
`

/* ─── helpers ────────────────────────────────────────────────────────── */

/** kebab-case → PascalCase (`color-picker` → `ColorPicker`) */
function toPascal(kebab) {
  return kebab
    .split('-')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

/** kebab-case → camelCase (`color-picker` → `colorPicker`) */
function toCamel(kebab) {
  const parts = kebab.split('-').filter(Boolean)
  if (parts.length === 0) return ''
  const [head, ...tail] = parts
  return head + tail.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

/** kebab-case → "Title Case" (`color-picker` → `Color Picker`) */
function toTitle(kebab) {
  return kebab
    .split('-')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

function fail(msg, code = 1) {
  process.stderr.write(`gen-vue-demo: ${msg}\n`)
  process.exit(code)
}

function render(template, ctx) {
  return template
    .replaceAll('__PASCAL__', ctx.pascal)
    .replaceAll('__LOCALE_KEY__', ctx.localeKey)
    .replaceAll('__TITLE__', ctx.title)
    .replaceAll('__NAME__', ctx.name)
}

function writeFile(target, contents) {
  if (existsSync(target)) {
    fail(`refusing to overwrite existing file: ${target}`)
  }
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, contents, 'utf8')
}

/* ─── CLI ─────────────────────────────────────────────────────────────── */

const argv = process.argv.slice(2)
if (argv.includes('-h') || argv.includes('--help') || argv.length === 0) {
  process.stdout.write(HELP)
  process.exit(0)
}

let name = ''
let examples = 1
let withCssVars = false

for (const arg of argv) {
  if (arg.startsWith('--examples=')) {
    const n = Number(arg.slice('--examples='.length))
    if (!Number.isInteger(n) || n < 1 || n > 30) {
      fail(`--examples must be an integer in [1, 30], got "${arg.slice('--examples='.length)}"`)
    }
    examples = n
  } else if (arg === '--with-css-vars') {
    withCssVars = true
  } else if (arg.startsWith('--')) {
    fail(`unknown flag: ${arg}\n\n${HELP}`)
  } else if (!name) {
    name = arg
  } else {
    fail(`unexpected positional argument: ${arg}\n\n${HELP}`)
  }
}

if (!name) fail(`<comp-kebab> is required\n\n${HELP}`)
if (!KEBAB_RE.test(name)) fail(`<comp-kebab> must be kebab-case (got "${name}")`)

const ctx = {
  name,
  pascal: toPascal(name),
  localeKey: toCamel(name),
  title: toTitle(name),
}

/* ─── compute targets ─────────────────────────────────────────────────── */

const DEMOS_DIR = join(REPO_ROOT, 'examples', 'demo-vue', 'src', 'demos')
const exampleNames =
  examples === 1
    ? ['Default']
    : Array.from({ length: examples }, (_, i) => `Default${i + 1}`)

const targets = []

// 1. Examples
const exampleTpl = readFileSync(join(TEMPLATES_DIR, 'vue-demo-example.vue.tmpl'), 'utf8')
for (const exName of exampleNames) {
  const target = join(DEMOS_DIR, ctx.name, `${exName}.demo.vue`)
  const out = render(exampleTpl, ctx).replace(
    /Default__PASCAL__/g,
    `${exName}__PASCAL__`,
  )
  targets.push({ target, contents: out })
}

// 2. Doc en / ru / useStrings
const docEnTpl = readFileSync(join(TEMPLATES_DIR, 'vue-demo-doc-en.ts.tmpl'), 'utf8')
const docRuTpl = readFileSync(join(TEMPLATES_DIR, 'vue-demo-doc-ru.ts.tmpl'), 'utf8')
const docHookTpl = readFileSync(join(TEMPLATES_DIR, 'vue-demo-doc-strings.ts.tmpl'), 'utf8')

targets.push({
  target: join(DEMOS_DIR, `${ctx.name}-doc`, 'en.ts'),
  contents: render(docEnTpl, ctx),
})
targets.push({
  target: join(DEMOS_DIR, `${ctx.name}-doc`, 'ru.ts'),
  contents: render(docRuTpl, ctx),
})
targets.push({
  target: join(DEMOS_DIR, `${ctx.name}-doc`, 'useStrings.ts'),
  contents: render(docHookTpl, ctx),
})

// 3. Aggregator
const aggTpl = readFileSync(join(TEMPLATES_DIR, 'vue-demo-aggregator.vue.tmpl'), 'utf8')
let aggOut = render(aggTpl, ctx)

// Adjust per --examples and --with-css-vars
if (examples > 1) {
  // Replace the single Default block with N blocks. The template only has
  // a single Default block, so we generate the rest by copying it.
  // We detect the template's single Default region by the marker comments
  // around the import + DemoBox.
  const importLine = `import Default__PASCAL__ from './__NAME__/Default.demo.vue'\nimport DefaultSource from './__NAME__/Default.demo.vue?raw'`
  const importBlock = render(importLine, ctx)

  const allImports = exampleNames
    .map((ex) => {
      const exImport = `import ${ex}__PASCAL__ from './__NAME__/${ex}.demo.vue'\nimport ${ex}Source from './__NAME__/${ex}.demo.vue?raw'`
      return render(exImport, ctx)
    })
    .join('\n')

  aggOut = aggOut.replace(importBlock, allImports)

  const demoBoxBlock = `    <DemoBox
      :title="t.demoDefaultTitle"
      :description="t.demoDefaultDesc"
      :code="DefaultSource"
    >
      <Default__PASCAL__ />
    </DemoBox>`
  const demoBoxRendered = render(demoBoxBlock, ctx)

  const allBoxes = exampleNames
    .map((ex) => {
      const block = `    <DemoBox
      :title="t.demo${ex}Title"
      :description="t.demo${ex}Desc"
      :code="${ex}Source"
    >
      <${ex}__PASCAL__ />
    </DemoBox>`
      return render(block, ctx)
    })
    .join('\n\n')

  aggOut = aggOut.replace(demoBoxRendered, allBoxes)
}

if (!withCssVars) {
  // Strip the `<CssVarsTable>` block from the aggregator
  aggOut = aggOut.replace(
    /\n\s*<CssVarsTable[\s\S]*?\/>\s*\n/,
    '\n',
  )
}

targets.push({
  target: join(DEMOS_DIR, `${ctx.pascal}Demo.vue`),
  contents: aggOut,
})

/* ─── pre-flight + write ──────────────────────────────────────────────── */

for (const t of targets) {
  if (existsSync(t.target)) {
    fail(`refusing to overwrite existing file: ${t.target}`)
  }
}

const written = []
for (const t of targets) {
  writeFile(t.target, t.contents)
  written.push(t.target)
}

/* ─── follow-up instructions ──────────────────────────────────────────── */

const lines = []
lines.push('')
lines.push('Generated:')
for (const p of written) lines.push(`  + ${p}`)
lines.push('')
lines.push('Next steps (do these by hand to avoid clashing with parallel streams):')
lines.push(`  1. Replace TODO content in each \`*.demo.vue\` with real Vue usage.`)
lines.push(
  `  2. Fill in real strings in \`demos/${ctx.name}-doc/{en,ru}.ts\` (en is the source of truth, ru must match keys).`,
)
lines.push(
  `  3. Set real \`propsData\` / \`cssVarsData\` arrays in \`demos/${ctx.pascal}Demo.vue\`.`,
)
lines.push(
  `  4. Register the route in \`examples/demo-vue/src/router/index.ts\`:`,
)
lines.push(`       const ${ctx.pascal}Demo = () => import('../demos/${ctx.pascal}Demo.vue')`)
lines.push(`       { path: '/components/${ctx.name}', component: ${ctx.pascal}Demo },`)
lines.push(
  `  5. (If old) Delete \`examples/demo-vue/src/pages/${ctx.pascal}Page.vue\` and remove the old route entry.`,
)
lines.push(`  6. Add \`{ key: 'components/${ctx.name}', label: '${ctx.pascal}' }\` to \`examples/demo-vue/src/nav.ts\` (correct section).`)
lines.push('')

process.stdout.write(lines.join('\n'))
