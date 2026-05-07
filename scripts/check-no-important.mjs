#!/usr/bin/env node
// scripts/check-no-important.mjs
//
// В packages/react/styles/**/*.css запрещён !important.
// Исключения (при острой необходимости) — через ALLOWLIST ниже.
//
// Падает (exit 1) при любом находке вне allowlist.

import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const stylesDir = path.resolve(repoRoot, 'packages/react/styles');

/**
 * Относительные пути файлов (с прямыми слэшами), где !important осознанно разрешён.
 * Каждая запись должна быть задокументирована прямо здесь.
 */
const ALLOWLIST = [
  // prefers-reduced-motion + @media print перекрывают inline-стили анимаций,
  // а inline-style имеет наивысшую специфичность кроме !important. Это стандартный
  // a11y-паттерн, а не хак стилизации компонентов.
  'packages/react/styles/transitions.css',
];

/**
 * Дополнительно: массив регексов вида {file, re} — разрешить !important только
 * внутри конкретных @media-блоков. Проверка «линия принадлежит блоку» — грубая,
 * но для @media print / prefers-reduced-motion достаточно: проверяем, находится
 * ли линия внутри соответствующего @media-блока.
 */
const MEDIA_ALLOWLIST = [
  { file: 'packages/react/styles/components/table.css', media: /@media\s+print/ },
  // `prefers-reduced-motion: reduce` is the canonical a11y override —
  // inline-styled animations (set by JS for crosshair / chart entry-anim)
  // can only be cancelled with `!important` from a media query, since
  // inline styles otherwise win specificity.
  { file: 'packages/react/styles/components/charts.css', media: /prefers-reduced-motion/ },
  // Общие правила @media print (Tab L1: print export для Table / Diagram /
  // Charts). Inline-стили компонентов (transform для pan/zoom, overflow
  // для скрол-контейнеров, тени) можно перебить только !important из
  // media-блока — это стандартный print-CSS паттерн.
  { file: 'packages/react/styles/print.css', media: /@media\s+print/ },
];

const RE = /!important/g;

/**
 * Удаляет /* ... *\/ комментарии (включая многострочные), чтобы грубая
 * построчная проверка не спотыкалась о `!important` в пояснениях.
 */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.isFile() && entry.name.endsWith('.css')) out.push(p);
  }
  return out;
}

/**
 * Для media-allowlist'а нужно определить, внутри какого @media-блока находится
 * строка. Считаем глубину фигурных скобок и запоминаем активный @media.
 */
function mediaContextFor(src) {
  const lines = src.split(/\r?\n/);
  const ctx = new Array(lines.length).fill(null);
  const stack = []; // { media, depth }
  let depth = 0;
  let pendingMedia = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const mediaMatch = line.match(/@media[^{]*/);
    if (mediaMatch && line.includes('{')) {
      stack.push({ media: mediaMatch[0].trim(), depth });
      depth++;
    } else if (mediaMatch) {
      pendingMedia = mediaMatch[0].trim();
    } else if (line.includes('{')) {
      if (pendingMedia) {
        stack.push({ media: pendingMedia, depth });
        pendingMedia = null;
      }
      depth++;
    }
    if (line.includes('}')) {
      depth = Math.max(0, depth - 1);
      while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    }
    ctx[i] = stack.length ? stack[stack.length - 1].media : null;
  }
  return ctx;
}

async function main() {
  const files = await walk(stylesDir);
  const hits = [];
  for (const file of files) {
    const rel = path.relative(repoRoot, file).replace(/\\/g, '/');
    if (ALLOWLIST.includes(rel)) continue;
    const raw = await fs.readFile(file, 'utf8');
    const src = stripComments(raw);
    const lines = src.split(/\r?\n/);
    const ctx = mediaContextFor(src);
    const mediaRules = MEDIA_ALLOWLIST.filter((r) => r.file === rel);
    lines.forEach((line, i) => {
      if (RE.test(line)) {
        const media = ctx[i];
        const allowedByMedia = media && mediaRules.some((r) => r.media.test(media));
        if (!allowedByMedia) hits.push({ file: rel, line: i + 1, text: line.trim() });
      }
      RE.lastIndex = 0;
    });
  }
  if (hits.length === 0) {
    console.log(`check-no-important: OK (${files.length} files)`);
    process.exit(0);
  }
  console.error('check-no-important: FAILED — найдены !important:');
  for (const h of hits) {
    console.error(`  ${h.file}:${h.line}  ${h.text}`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error('check-no-important: crashed', err);
  process.exit(2);
});
