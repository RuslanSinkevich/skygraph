#!/usr/bin/env node
// scripts/publish-public.mjs
//
// Синхронизирует исходник skygraph в публичный mirror-репозиторий
// _publish/skygraph-public.
//
// ВАЖНО: public — это НЕ полное зеркало, а курируемый поднабор.
//   - MIRRORED (копируется автоматически): код пакетов, landing, deploy,
//     LICENSE, CONTRIBUTING.md. Артефакты (node_modules/dist/temp/...) и
//     приватные пакеты (angular) исключаются.
//   - CURATED (НЕ трогаем): README/ARCHITECTURE/CHANGELOG/MIGRATION/docs —
//     это урезанные публичные версии, ведутся вручную. Скрипт только сверяет
//     их с исходником и подсвечивает расхождения для ручной правки.
//
// Использование:
//   node scripts/publish-public.mjs              # синхронизация + git status (без коммита)
//   node scripts/publish-public.mjs --dry-run    # показать план, ничего не копировать
//   node scripts/publish-public.mjs --commit "msg"   # синхронизация + git add -A + commit
//   node scripts/publish-public.mjs --commit "msg" --push   # ещё и git push
//
// Без флага --commit скрипт никогда не коммитит и не пушит.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..');
const DEST = path.resolve(SRC, '..', '_publish', 'skygraph-public');

// --- параметры CLI ---------------------------------------------------------
const argv = process.argv.slice(2);
const DRY_RUN = argv.includes('--dry-run');
const DO_PUSH = argv.includes('--push');
const commitIdx = argv.indexOf('--commit');
const COMMIT_MSG = commitIdx !== -1 ? argv[commitIdx + 1] : null;
if (commitIdx !== -1 && (!COMMIT_MSG || COMMIT_MSG.startsWith('--'))) {
  fail('Флагу --commit нужно передать сообщение: --commit "feat: ..."');
}

// --- что зеркалируем -------------------------------------------------------
const PUBLIC_PACKAGES = ['core', 'react', 'vue', 'styles', 'skygraph-react', 'skygraph-vue'];

// Имена директорий/файлов, которые НИКОГДА не попадают в public.
const EXCLUDE_DIRS = new Set([
  'node_modules',
  'dist',
  'temp',
  'coverage',
  '.turbo',
  '.cache',
  'output', // deploy/output — собранная статика
]);
const EXCLUDE_FILE_RE = /(\.tsbuildinfo$|^\.DS_Store$)/;

// Курируемые вручную пути — только сверяем, не копируем.
const CURATED = ['README.md', 'ARCHITECTURE.md', 'CHANGELOG.md', 'MIGRATION.md', 'docs'];

// --- утилиты ---------------------------------------------------------------
function fail(msg) {
  console.error(`\n[publish-public] ОШИБКА: ${msg}\n`);
  process.exit(1);
}

function rel(p) {
  return path.relative(SRC, p).replace(/\\/g, '/');
}

const stats = { copied: 0, removed: 0 };

function isExcluded(srcPath) {
  const base = path.basename(srcPath);
  if (EXCLUDE_FILE_RE.test(base)) return true;
  if (EXCLUDE_DIRS.has(base) && fs.statSync(srcPath).isDirectory()) return true;
  return false;
}

// Зеркалит каталог srcDir -> destDir с учётом исключений и удаляет
// в destDir то, чего больше нет в источнике.
function mirrorDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) fail(`нет исходной папки: ${srcDir}`);

  const srcEntries = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((e) => !isExcluded(path.join(srcDir, e.name)));
  const keep = new Set(srcEntries.map((e) => e.name));

  // удаляем устаревшее в destDir
  if (fs.existsSync(destDir)) {
    for (const e of fs.readdirSync(destDir, { withFileTypes: true })) {
      if (!keep.has(e.name)) {
        const target = path.join(destDir, e.name);
        if (DRY_RUN) {
          console.log(`  - DEL  ${rel(path.join(srcDir, e.name))}`);
        } else {
          fs.rmSync(target, { recursive: true, force: true });
        }
        stats.removed++;
      }
    }
  } else if (!DRY_RUN) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const e of srcEntries) {
    const s = path.join(srcDir, e.name);
    const d = path.join(destDir, e.name);
    if (e.isDirectory()) {
      mirrorDir(s, d);
    } else {
      copyFile(s, d);
    }
  }
}

function copyFile(srcFile, destFile) {
  const changed =
    !fs.existsSync(destFile) ||
    fs.readFileSync(srcFile).compare(fs.readFileSync(destFile)) !== 0;
  if (!changed) return;
  if (DRY_RUN) {
    console.log(`  ~ COPY ${rel(srcFile)}`);
  } else {
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.copyFileSync(srcFile, destFile);
  }
  stats.copied++;
}

function git(args) {
  return execFileSync('git', args, { cwd: DEST, encoding: 'utf8' });
}

// --- проверки --------------------------------------------------------------
if (!fs.existsSync(DEST)) fail(`нет public-репозитория: ${DEST}`);
if (!fs.existsSync(path.join(DEST, '.git'))) fail(`${DEST} не git-репозиторий`);

console.log(`[publish-public] SRC : ${SRC}`);
console.log(`[publish-public] DEST: ${DEST}`);
console.log(`[publish-public] режим: ${DRY_RUN ? 'DRY-RUN' : 'APPLY'}\n`);

// --- 1. зеркалим код -------------------------------------------------------
console.log('== Синхронизация (mirrored) ==');
for (const pkg of PUBLIC_PACKAGES) {
  mirrorDir(path.join(SRC, 'packages', pkg), path.join(DEST, 'packages', pkg));
}
mirrorDir(path.join(SRC, 'deploy'), path.join(DEST, 'deploy'));
copyFile(path.join(SRC, 'landing', 'index.html'), path.join(DEST, 'landing', 'index.html'));
copyFile(path.join(SRC, 'LICENSE'), path.join(DEST, 'LICENSE'));
copyFile(path.join(SRC, 'CONTRIBUTING.md'), path.join(DEST, 'CONTRIBUTING.md'));
console.log(`  итог: скопировано ${stats.copied}, удалено ${stats.removed}\n`);

// --- 2. сверяем курируемые файлы -------------------------------------------
console.log('== Курируемые файлы (правятся вручную, НЕ синхронизируются) ==');
function compareCurated(name) {
  const s = path.join(SRC, name);
  const d = path.join(DEST, name);
  if (fs.statSync(s).isDirectory()) {
    for (const e of fs.readdirSync(s)) compareCurated(path.join(name, e));
    return;
  }
  // public — намеренно неполный набор; файлы, которых там нет, пропускаем.
  if (!fs.existsSync(d)) return;
  const same = fs.readFileSync(s).compare(fs.readFileSync(d)) === 0;
  if (!same) console.log(`  [DIFFER]    ${name}`);
}
for (const c of CURATED) {
  if (fs.existsSync(path.join(SRC, c))) compareCurated(c);
}
console.log('  (DIFFER = в исходнике новее; реши вручную, что вынести в public)\n');

// --- 3. git ----------------------------------------------------------------
if (DRY_RUN) {
  console.log('[publish-public] DRY-RUN завершён, изменения не применялись.');
  process.exit(0);
}

console.log('== git status (public) ==');
console.log(git(['status', '--short']) || '  (чисто)\n');

if (COMMIT_MSG) {
  git(['add', '-A']);
  const staged = git(['status', '--short']);
  if (!staged.trim()) {
    console.log('[publish-public] нечего коммитить.');
    process.exit(0);
  }
  git(['commit', '-m', COMMIT_MSG]);
  console.log(`[publish-public] коммит создан: "${COMMIT_MSG}"`);
  if (DO_PUSH) {
    git(['push']);
    console.log('[publish-public] запушено в origin.');
  } else {
    console.log('[publish-public] не запушено (добавь --push или сделай git push вручную).');
  }
} else {
  console.log('[publish-public] файлы синхронизированы. Проверь git diff и закоммить вручную,');
  console.log('                 либо запусти с --commit "msg".');
}
