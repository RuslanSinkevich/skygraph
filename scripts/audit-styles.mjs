#!/usr/bin/env node
// scripts/audit-styles.mjs
//
// Инвентаризация стилей (фаза 0 из docs/styling-plan.md).
//
// Что делает:
// 1. Парсит все `var(--sg-...)` по packages/react/styles/**/*.css
//    и сверяет с объявлениями в tokens.css + локальными объявлениями
//    в самих компонентных CSS. Пишет списки known/unknown.
// 2. Собирает все CSS-классы (селекторы `.sg-*`) из тех же файлов и
//    из src/components/**/*.{ts,tsx} — классы из DOM разметки
//    (на базе className / clsx-лик строк).
// 3. Ищет «магические» hex-цвета (и rgba()) в компонентных CSS.
// 4. Пишет результат в docs/_audit/styling-audit.md.
//
// Используется разово для фазы 0. В CI живут check-tokens.mjs / check-no-important.mjs.

import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const stylesDir = path.resolve(repoRoot, 'packages/react/styles');
const srcDir = path.resolve(repoRoot, 'packages/react/src');
const outFile = path.resolve(repoRoot, 'docs/_audit/styling-audit.md');

const TOKENS_FILE = path.join(stylesDir, 'tokens.css');
const VAR_RE = /var\(\s*(--sg-[a-zA-Z0-9-]+)/g;
const DECL_RE = /(^|[^a-zA-Z0-9-])(--sg-[a-zA-Z0-9-]+)\s*:/g;
const CLASS_RE = /\.(sg-[a-zA-Z0-9_-]+)/g;
const HEX_RE = /#([0-9a-fA-F]{3,8})\b/g;
const CLASS_IN_TSX_RE = /['"`]([^'"`]*sg-[a-zA-Z0-9_-][^'"`]*)['"`]/g;
// Detect template literals like `sg-button-${type}` or `sg-tooltip-${placement}` —
// the prefix is dynamic-suffixed so we can't enumerate the actual classes from
// source. We instead capture the prefix and treat any class with that prefix
// as "used at runtime" (not dead).
const TEMPLATE_PREFIX_RE = /`(sg-[a-zA-Z0-9_-]*?)-\$\{/g;

// ── Runtime-generated class allowlist ────────────────────────────────────
//
// Some classes are added via `classList.add(...)` at runtime (animations,
// transitions, dynamic placement) and therefore never appear as a literal in
// any TSX file. They are NOT dead code. We exclude them from the
// "only in CSS" list so the report stays signal-heavy.
//
// Known runtime prefixes:
//   - Transition component (`packages/react/src/components/ui/Transition.tsx`)
//     emits `<name>-enter-from`, `<name>-enter-active`, `<name>-enter-to`,
//     `<name>-leave-from`, `<name>-leave-active`, `<name>-leave-to`. Used
//     names: `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`,
//     `zoom`, `collapse`.
const RUNTIME_CLASS_PATTERNS = [
  /^sg-fade-(enter|leave)(-(from|active|to))?$/,
  /^sg-slide-(up|down|left|right)-(enter|leave)(-(from|active|to))?$/,
  /^sg-zoom-(enter|leave)(-(from|active|to))?$/,
  /^sg-collapse-(enter|leave)(-(from|active|to))?$/,
];

function isRuntimeClass(name) {
  return RUNTIME_CLASS_PATTERNS.some((re) => re.test(name));
}

async function walk(dir, exts) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p, exts)));
    else if (entry.isFile() && exts.some((e) => entry.name.endsWith(e))) out.push(p);
  }
  return out;
}

function collectByRegex(src, re, group = 1) {
  const set = new Set();
  let m;
  re.lastIndex = 0;
  while ((m = re.exec(src)) !== null) set.add(m[group]);
  return set;
}

async function main() {
  const tokensSrc = await fs.readFile(TOKENS_FILE, 'utf8');
  const declaredTokens = collectByRegex(tokensSrc, DECL_RE, 2);

  const cssFiles = (await walk(stylesDir, ['.css'])).filter((p) => p !== TOKENS_FILE);
  const srcFiles = await walk(srcDir, ['.ts', '.tsx']);

  // === Tokens ===
  const usedTokensByFile = new Map();
  const localDeclsByFile = new Map();
  for (const file of cssFiles) {
    const src = await fs.readFile(file, 'utf8');
    usedTokensByFile.set(file, collectByRegex(src, VAR_RE, 1));
    localDeclsByFile.set(file, collectByRegex(src, DECL_RE, 2));
  }

  const unknown = new Map(); // name -> files
  for (const [file, used] of usedTokensByFile) {
    const local = localDeclsByFile.get(file);
    for (const n of used) {
      if (declaredTokens.has(n)) continue;
      if (local.has(n)) continue;
      if (!unknown.has(n)) unknown.set(n, new Set());
      unknown.get(n).add(path.relative(repoRoot, file).replace(/\\/g, '/'));
    }
  }

  // === Classes ===
  const classesInCss = new Set();
  for (const file of cssFiles) {
    const src = await fs.readFile(file, 'utf8');
    for (const c of collectByRegex(src, CLASS_RE, 1)) classesInCss.add(c);
  }
  const classesInDom = new Set();
  // Prefixes captured from template literals like `sg-button-${type}`.
  // Any CSS class starting with `<prefix>-` is considered used-at-runtime.
  const dynamicPrefixes = new Set();
  for (const file of srcFiles) {
    const src = await fs.readFile(file, 'utf8');
    CLASS_IN_TSX_RE.lastIndex = 0;
    let m;
    while ((m = CLASS_IN_TSX_RE.exec(src)) !== null) {
      const raw = m[1];
      const parts = raw.split(/\s+/).filter(Boolean);
      for (const p of parts) {
        if (/^sg-[a-zA-Z0-9_-]+$/.test(p)) classesInDom.add(p);
      }
    }
    TEMPLATE_PREFIX_RE.lastIndex = 0;
    while ((m = TEMPLATE_PREFIX_RE.exec(src)) !== null) {
      dynamicPrefixes.add(m[1]);
    }
  }

  function isDynamic(c) {
    for (const prefix of dynamicPrefixes) {
      if (c.startsWith(prefix + '-')) return true;
    }
    return false;
  }

  // === Magic hex / rgba в компонентных CSS ===
  const magicHex = new Map();
  for (const file of cssFiles) {
    const src = await fs.readFile(file, 'utf8');
    const rel = path.relative(repoRoot, file).replace(/\\/g, '/');
    HEX_RE.lastIndex = 0;
    let m;
    while ((m = HEX_RE.exec(src)) !== null) {
      const key = '#' + m[1].toLowerCase();
      if (!magicHex.has(key)) magicHex.set(key, new Set());
      magicHex.get(key).add(rel);
    }
  }

  // === Report ===
  const classesOnlyInCssRaw = [...classesInCss].filter((c) => !classesInDom.has(c));
  const classesOnlyInCssRuntime = classesOnlyInCssRaw.filter(isRuntimeClass).sort();
  const classesOnlyInCssDynamic = classesOnlyInCssRaw
    .filter((c) => !isRuntimeClass(c) && isDynamic(c))
    .sort();
  const classesOnlyInCss = classesOnlyInCssRaw
    .filter((c) => !isRuntimeClass(c) && !isDynamic(c))
    .sort();
  const classesOnlyInDom = [...classesInDom].filter((c) => !classesInCss.has(c)).sort();
  const classesInBoth = [...classesInCss].filter((c) => classesInDom.has(c)).sort();

  const lines = [];
  lines.push('# SkyGraph — Styling Audit (auto)');
  lines.push('');
  lines.push('> Сгенерировано `scripts/audit-styles.mjs`. Не редактировать руками — перегенерировать.');
  lines.push('');

  lines.push('## 1. Токены');
  lines.push('');
  lines.push(`- tokens.css объявляет: **${declaredTokens.size}** имён.`);
  lines.push(`- Компонентные CSS используют «чужие» имена: **${unknown.size}**.`);
  lines.push('');
  if (unknown.size) {
    lines.push('### Неизвестные `var(--sg-*)` (не в tokens.css и не объявлены локально)');
    lines.push('');
    lines.push('| Имя | Файлы |');
    lines.push('|---|---|');
    for (const [name, files] of [...unknown.entries()].sort()) {
      lines.push(`| \`${name}\` | ${[...files].map((f) => `\`${f}\``).join('<br>')} |`);
    }
    lines.push('');
  } else {
    lines.push('Все использованные `var(--sg-*)` объявлены. :white_check_mark:');
    lines.push('');
  }

  lines.push('## 2. Классы `.sg-*`');
  lines.push('');
  lines.push(`- В CSS определено классов: **${classesInCss.size}**.`);
  lines.push(`- В DOM компонентов используется строк-классов: **${classesInDom.size}**.`);
  lines.push(`- Совпадают (есть и в CSS, и в DOM): **${classesInBoth.length}**.`);
  lines.push(`- Только в CSS, runtime-генерируемые (Transition): **${classesOnlyInCssRuntime.length}** (исключены из dead-code).`);
  lines.push(`- Только в CSS, динамически-генерируемые (template literals \`sg-X-\${...}\`): **${classesOnlyInCssDynamic.length}** (исключены из dead-code).`);
  lines.push(`- Только в CSS, **возможно мёртвый код**: **${classesOnlyInCss.length}**.`);
  lines.push(`- Только в DOM (нет стилей): **${classesOnlyInDom.length}**.`);
  lines.push(`- Найденных в коде template-prefix'ов: **${dynamicPrefixes.size}**.`);
  lines.push('');
  lines.push('<details><summary>Только в CSS — возможно мёртвый код</summary>');
  lines.push('');
  for (const c of classesOnlyInCss) lines.push(`- \`.${c}\``);
  lines.push('');
  lines.push('</details>');
  lines.push('');
  if (classesOnlyInCssRuntime.length) {
    lines.push('<details><summary>Только в CSS — runtime-генерируемые transitions (не мёртвый код)</summary>');
    lines.push('');
    for (const c of classesOnlyInCssRuntime) lines.push(`- \`.${c}\``);
    lines.push('');
    lines.push('</details>');
    lines.push('');
  }

  if (classesOnlyInCssDynamic.length) {
    lines.push('<details><summary>Только в CSS — генерируются динамически (template literals в коде)</summary>');
    lines.push('');
    for (const c of classesOnlyInCssDynamic) lines.push(`- \`.${c}\``);
    lines.push('');
    lines.push('</details>');
    lines.push('');
  }
  lines.push('<details><summary>Только в DOM</summary>');
  lines.push('');
  for (const c of classesOnlyInDom) lines.push(`- \`${c}\``);
  lines.push('');
  lines.push('</details>');
  lines.push('');

  lines.push('## 3. «Магические» цвета');
  lines.push('');
  lines.push(`- hex-значений в компонентных CSS: **${magicHex.size}** уникальных.`);
  lines.push('');
  if (magicHex.size) {
    lines.push('| Цвет | Файлы |');
    lines.push('|---|---|');
    for (const [hex, files] of [...magicHex.entries()].sort()) {
      lines.push(`| \`${hex}\` | ${[...files].map((f) => `\`${f}\``).join('<br>')} |`);
    }
    lines.push('');
  }

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, lines.join('\n') + '\n', 'utf8');
  console.log(`audit-styles: written ${path.relative(repoRoot, outFile)}`);
}

main().catch((err) => {
  console.error('audit-styles: crashed', err);
  process.exit(1);
});
