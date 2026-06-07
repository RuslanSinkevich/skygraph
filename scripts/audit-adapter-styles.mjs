#!/usr/bin/env node
// scripts/audit-adapter-styles.mjs
//
// Сравнивает СТИЛЕВУЮ часть React- и Vue-адаптеров, чтобы поймать
// расхождения в визуале при общем @skygraph/styles.
//
// CSS общий, поэтому единственный источник расхождений — то, что адаптер
// задаёт сам в разметке: inline-стили (`style={{}}` / `:style`), CSS-переменные,
// выставляемые из JS (`--sg-*`), и хардкод (литеральные px/hex/rgba вместо токенов).
//
// Что считает:
//  1. Множество `--sg-*` токенов, на которые ссылается React-адаптер и Vue-адаптер.
//     Симметрическая разность = один адаптер трогает переменную, другой нет.
//  2. То же по компонентам (сопоставление по базовому имени файла).
//  3. Хардкод в inline-стилях: hex-цвета и числовые px-литералы в `style=`/`:style`.
//
// Только отчёт, ничего не падает. Запуск: node scripts/audit-adapter-styles.mjs

import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const reactDir = path.resolve(repoRoot, 'packages/react/src')
const vueDir = path.resolve(repoRoot, 'packages/vue/src')

const VAR_RE = /(--sg-[a-zA-Z0-9-]+)/g
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/

async function walk(dir, exts) {
  const out = []
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(p, exts)))
    else if (entry.isFile() && exts.some((e) => entry.name.endsWith(e))) out.push(p)
  }
  return out
}

function rel(p) {
  return path.relative(repoRoot, p).replace(/\\/g, '/')
}

function isTest(p) {
  return /(__tests__|\.test\.|\.spec\.)/.test(p)
}

// Убираем комментарии, чтобы не считать токены/хардкод, упомянутые в доках.
// Грубо, но достаточно: блочные /* */ и строчные // ... (вне строк не различаем,
// для нашей цели это приемлемо — ложноположительных классов это не плодит).
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}

function collect(src, re, group = 1) {
  const set = new Set()
  let m
  re.lastIndex = 0
  while ((m = re.exec(src)) !== null) set.add(m[group])
  return set
}

// Базовое имя компонента: имя файла без расширения. index.* отбрасываем.
function baseName(p) {
  const b = path.basename(p).replace(/\.(tsx?|vue)$/, '')
  return b
}

async function loadAdapter(dir, exts) {
  const files = (await walk(dir, exts)).filter((p) => !isTest(p))
  const tokensGlobal = new Set()
  const byComponent = new Map() // base -> Set<token>
  const tokenFiles = new Map() // token -> Set<relfile>
  for (const file of files) {
    const src = stripComments(await fs.readFile(file, 'utf8'))
    const tokens = collect(src, VAR_RE, 1)
    if (tokens.size === 0) continue
    const base = baseName(file)
    if (!byComponent.has(base)) byComponent.set(base, new Set())
    for (const t of tokens) {
      tokensGlobal.add(t)
      byComponent.get(base).add(t)
      if (!tokenFiles.has(t)) tokenFiles.set(t, new Set())
      tokenFiles.get(t).add(rel(file))
    }
  }
  return { files, tokensGlobal, byComponent, tokenFiles }
}

// Хардкод в inline-стилях. Грубо: вытаскиваем содержимое style={{...}} (React)
// и :style="..."/ style="..." (Vue) и ищем hex/px-литералы.
function findInlineStyleHardcode(src, isVue) {
  const findings = []
  const blocks = []
  if (isVue) {
    const re = /(?::style|[^:]\bstyle)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*(?:\{[^}]*\}[^}]*)*)\})/g
    let m
    while ((m = re.exec(src)) !== null) blocks.push(m[1] ?? m[2] ?? m[3] ?? '')
  } else {
    // style={{ ... }} — допускаем один уровень вложенных фигурных скобок
    const re = /style\s*=\s*\{\{([\s\S]*?)\}\}/g
    let m
    while ((m = re.exec(src)) !== null) blocks.push(m[1])
  }
  for (const block of blocks) {
    const hex = block.match(HEX_RE)
    if (hex) findings.push({ kind: 'hex', value: hex[0], block: block.trim().slice(0, 120) })
    // числовой px-литерал в кавычках: '12px', "8px"
    const pxs = block.match(/['"]\d+(?:\.\d+)?px['"]/g)
    if (pxs) for (const px of pxs) findings.push({ kind: 'px', value: px, block: block.trim().slice(0, 120) })
  }
  return findings
}

async function main() {
  const react = await loadAdapter(reactDir, ['.ts', '.tsx'])
  const vue = await loadAdapter(vueDir, ['.ts', '.vue'])

  const onlyReact = [...react.tokensGlobal].filter((t) => !vue.tokensGlobal.has(t)).sort()
  const onlyVue = [...vue.tokensGlobal].filter((t) => !react.tokensGlobal.has(t)).sort()

  const lines = []
  lines.push('# SkyGraph — Adapter Style Divergence Audit (auto)')
  lines.push('')
  lines.push('> Сгенерировано `scripts/audit-adapter-styles.mjs`. CSS общий; здесь — расхождения,')
  lines.push('> которые адаптер вносит сам (inline-стили, CSS-переменные из JS, хардкод).')
  lines.push('')

  lines.push('## 1. CSS-переменные `--sg-*`, выставляемые из адаптера')
  lines.push('')
  lines.push(`- React трогает токенов: **${react.tokensGlobal.size}**`)
  lines.push(`- Vue трогает токенов: **${vue.tokensGlobal.size}**`)
  lines.push(`- Только в React: **${onlyReact.length}**`)
  lines.push(`- Только в Vue: **${onlyVue.length}**`)
  lines.push('')

  lines.push('### Только в React (Vue не выставляет)')
  lines.push('')
  if (onlyReact.length) {
    lines.push('| Токен | Файлы (React) |')
    lines.push('|---|---|')
    for (const t of onlyReact)
      lines.push(`| \`${t}\` | ${[...(react.tokenFiles.get(t) ?? [])].join('<br>')} |`)
  } else lines.push('_нет_')
  lines.push('')

  lines.push('### Только в Vue (React не выставляет)')
  lines.push('')
  if (onlyVue.length) {
    lines.push('| Токен | Файлы (Vue) |')
    lines.push('|---|---|')
    for (const t of onlyVue)
      lines.push(`| \`${t}\` | ${[...(vue.tokenFiles.get(t) ?? [])].join('<br>')} |`)
  } else lines.push('_нет_')
  lines.push('')

  // Per-component diff (по базовому имени).
  lines.push('## 2. Расхождение токенов по компонентам (общее имя файла)')
  lines.push('')
  const allBases = new Set([...react.byComponent.keys(), ...vue.byComponent.keys()])
  const rows = []
  for (const base of [...allBases].sort()) {
    const r = react.byComponent.get(base)
    const v = vue.byComponent.get(base)
    if (!r || !v) continue // компонент есть только в одном адаптере или без токенов
    const rOnly = [...r].filter((t) => !v.has(t)).sort()
    const vOnly = [...v].filter((t) => !r.has(t)).sort()
    if (rOnly.length === 0 && vOnly.length === 0) continue
    rows.push({ base, rOnly, vOnly })
  }
  if (rows.length) {
    lines.push('| Компонент | Только React | Только Vue |')
    lines.push('|---|---|---|')
    for (const { base, rOnly, vOnly } of rows)
      lines.push(
        `| \`${base}\` | ${rOnly.map((t) => `\`${t}\``).join(', ') || '—'} | ${vOnly.map((t) => `\`${t}\``).join(', ') || '—'} |`,
      )
  } else lines.push('_совпадают по сопоставимым компонентам_')
  lines.push('')

  // Hardcode.
  lines.push('## 3. Хардкод в inline-стилях (hex / px-литералы)')
  lines.push('')
  for (const [label, adapter, isVue] of [
    ['React', react, false],
    ['Vue', vue, true],
  ]) {
    lines.push(`### ${label}`)
    lines.push('')
    let any = false
    for (const file of adapter.files) {
      const src = stripComments(await fs.readFile(file, 'utf8'))
      const found = findInlineStyleHardcode(src, isVue)
      if (!found.length) continue
      any = true
      lines.push(`- \`${rel(file)}\``)
      for (const f of found) lines.push(`  - ${f.kind}: \`${f.value}\` — \`${f.block}\``)
    }
    if (!any) lines.push('_не найдено_')
    lines.push('')
  }

  const outFile = path.resolve(repoRoot, 'docs/_audit/adapter-style-divergence.md')
  await fs.mkdir(path.dirname(outFile), { recursive: true })
  await fs.writeFile(outFile, lines.join('\n') + '\n', 'utf8')

  // Короткий вывод в консоль.
  console.log(`React tokens: ${react.tokensGlobal.size}, Vue tokens: ${vue.tokensGlobal.size}`)
  console.log(`Only React: ${onlyReact.length}  ->`, onlyReact.join(', ') || '—')
  console.log(`Only Vue:   ${onlyVue.length}  ->`, onlyVue.join(', ') || '—')
  console.log(`Per-component diffs: ${rows.length}`)
  console.log(`Report: ${rel(outFile)}`)
}

main().catch((err) => {
  console.error('audit-adapter-styles: crashed', err)
  process.exit(1)
})
