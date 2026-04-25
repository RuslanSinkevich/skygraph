#!/usr/bin/env node
// scripts/check-tokens.mjs
//
// Проверяет, что все использованные в packages/react/styles/**/*.css
// CSS-переменные вида var(--sg-...) объявлены либо в tokens.css (глобально),
// либо в CSS самого компонента (локальная компонентная переменная).
//
// Падает (exit 1), если найдены неизвестные имена.

import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const stylesDir = path.resolve(repoRoot, 'packages/react/styles');

const TOKENS_FILE = path.join(stylesDir, 'tokens.css');
const VAR_RE = /var\(\s*(--sg-[a-zA-Z0-9-]+)/g;
const DECL_RE = /(^|[^a-zA-Z0-9-])(--sg-[a-zA-Z0-9-]+)\s*:/g;

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

function collectDeclared(source) {
  const set = new Set();
  let m;
  DECL_RE.lastIndex = 0;
  while ((m = DECL_RE.exec(source)) !== null) set.add(m[2]);
  return set;
}

function collectUsed(source) {
  const set = new Set();
  let m;
  VAR_RE.lastIndex = 0;
  while ((m = VAR_RE.exec(source)) !== null) set.add(m[1]);
  return set;
}

async function main() {
  const tokensSrc = await fs.readFile(TOKENS_FILE, 'utf8');
  const tokens = collectDeclared(tokensSrc);

  const files = (await walk(stylesDir)).filter((p) => p !== TOKENS_FILE);

  const unknown = [];
  for (const file of files) {
    const src = await fs.readFile(file, 'utf8');
    const declared = collectDeclared(src); // локальные (--sg-btn-* и т.п.)
    const used = collectUsed(src);
    for (const name of used) {
      if (tokens.has(name)) continue;
      if (declared.has(name)) continue;
      unknown.push({ name, file: path.relative(repoRoot, file) });
    }
  }

  if (unknown.length === 0) {
    console.log(`check-tokens: OK (${tokens.size} tokens, ${files.length} files)`);
    process.exit(0);
  }

  console.error('check-tokens: FAILED — найдены неизвестные CSS-переменные:');
  const byName = new Map();
  for (const u of unknown) {
    if (!byName.has(u.name)) byName.set(u.name, new Set());
    byName.get(u.name).add(u.file);
  }
  for (const [name, files] of [...byName.entries()].sort()) {
    console.error(`  ${name}`);
    for (const f of files) console.error(`      ${f}`);
  }
  console.error('\nИсправьте: переименуйте под tokens.css либо объявите в компонентном CSS.');
  process.exit(1);
}

main().catch((err) => {
  console.error('check-tokens: crashed', err);
  process.exit(2);
});
