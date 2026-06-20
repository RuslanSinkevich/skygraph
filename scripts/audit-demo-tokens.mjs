#!/usr/bin/env node
// scripts/audit-demo-tokens.mjs
//
// Аудит TokensOverride-демок: сверяет CSS-переменные, которые демка ЗАДАЁТ,
// с переменными, которые реально ЧИТАЕТ (`var(--sg-...)`) CSS компонента.
//
// Находит три класса багов:
//   [DEAD]  — демка задаёт компонент-локальный токен (--sg-btn-*, --sg-switch-* …),
//             которого нет в CSS этого компонента (копипаст из чужой демки).
//   [BG]    — CSS компонента красит фон токеном (--sg-color-bg* / --sg-input-bg),
//             а демка его не переопределяет → светлая «дыра» на тёмном фоне.
//   [FG]    — CSS компонента красит ТЕКСТ токеном, который в светлой теме чёрный
//             (rgba(0,0,0,…): text-secondary/tertiary/quaternary/disabled/
//             placeholder), а демка его не переопределяет → тёмный текст на
//             тёмном фоне (невидимо).
//
// Запуск:  node scripts/audit-demo-tokens.mjs [react|vue|all]

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '..');
const cssDir = path.join(repo, 'packages/styles/components');
const tokensCss = fs.readFileSync(path.join(repo, 'packages/styles/tokens.css'), 'utf8');

const args = process.argv.slice(2);
const FIX = args.includes('--fix');
const COVER = args.includes('--cover');
const target = args.find((a) => !a.startsWith('--')) || 'all';

// Единая slate-палитра тёмной демки. Это slate-эквиваленты уровней официальной
// тёмной темы (tokens.css [data-sg-theme='dark']): bg-уровни от тёмного к светлому,
// текст-шкала по убыванию контраста, рамки и subtle-fill. Применяется СПЛОШНЫМ
// покрытием — для каждого структурного токена, который реально читает CSS
// компонента (включая цепочки алиасов), демка получает тёмное значение.
const SLATE = {
  '--sg-color-bg': '#0f172a',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-quaternary': '#64748b',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-placeholder': '#94a3b8',
  '--sg-color-border': '#475569',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-fill': 'rgba(255, 255, 255, 0.16)',
  '--sg-color-fill-secondary': 'rgba(255, 255, 255, 0.1)',
  '--sg-color-fill-tertiary': 'rgba(255, 255, 255, 0.08)',
  '--sg-color-fill-quaternary': 'rgba(255, 255, 255, 0.05)',
  '--sg-skeleton-bg': 'rgba(255, 255, 255, 0.1)',
  '--sg-skeleton-shimmer': 'rgba(255, 255, 255, 0.2)',
  // Акцентные *-bg: в светлой теме это бледные тинты (blue-1/green-1/red-1/
  // orange-1) и используются как фон выделения (selected/active option),
  // фокус-ринги, status-плашки. На тёмном дефолт = почти белое пятно. Тут —
  // полупрозрачные тёмные тинты под цвет демо-акцентов (primary #60a5fa и т.д.).
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-success-bg': 'rgba(52, 211, 153, 0.16)',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.16)',
};
const STRUCTURAL = new Set(Object.keys(SLATE));

// Тёмные значения для токенов, которые чинит --fix. Подобраны под фон обёртки
// #0f172a (slate-900): поверхности — slate-800/700, текст — slate-100…500.
const DARK_VALUE = {
  '--sg-color-bg': '#1e293b',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#334155',
  '--sg-color-bg-elevated': '#1f2937',
  '--sg-input-bg': '#1e293b',
  '--sg-radio-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-btn-color': '#e2e8f0',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-quaternary': '#64748b',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-placeholder': '#94a3b8',
  '--sg-rate-symbol-empty-color': '#475569',
};

// Токены, объявленные глобально в tokens.css (семантические + input-family + star/skeleton).
const globalTokens = new Set();
for (const m of tokensCss.matchAll(/(--sg-[a-z0-9-]+)\s*:/gi)) globalTokens.add(m[1]);

// Карта алиасов из tokens.css: токен -> первая переменная в его значении
// (напр. --sg-input-bg -> --sg-color-bg-container). Нужна, чтобы разворачивать
// цепочку фон-токенов до семантической поверхности.
function collectAliases(src, into) {
  for (const m of src.matchAll(/(--sg-[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    const first = m[2].match(/var\(\s*(--sg-[a-z0-9-]+)/i);
    if (first) into.set(m[1], first[1]);
  }
}
const globalAlias = new Map();
collectAliases(tokensCss, globalAlias);

// Светлые resting-поверхности: семантические фон-токены, чьё значение в светлой
// теме светлое. Если цепочка фон-токена упирается в один из них и демка ничего
// в этой цепочке не переопределяет — будет светлая «дыра».
// NB: --sg-color-white намеренно НЕ здесь — это белая «фишка» (галка чекбокса,
// точка радио, кнопка switch, ручка slider) поверх цветной заливки; она должна
// оставаться белой и в тёмной демке.
const LIGHT_SURFACE = new Set([
  '--sg-color-bg',
  '--sg-color-bg-container',
  '--sg-color-bg-secondary',
  '--sg-color-bg-elevated',
  '--sg-input-bg',
]);

// Тёмные передний-план токены: семантические текст-токены, чьё значение в СВЕТЛОЙ
// теме чёрное (rgba(0, 0, 0, …)). Если компонент красит ими текст, а тёмная демка
// их не переопределяет — будет тёмный текст на тёмном фоне (невидимо). Берём прямо
// из блока светлой темы tokens.css, чтобы список не разъезжался с реальностью.
const DARK_FG = new Set();
{
  const m = tokensCss.match(/\[data-sg-theme='light'\]\s*\{([\s\S]*?)\}/);
  const lightBlock = m ? m[1] : tokensCss;
  for (const d of lightBlock.matchAll(/(--sg-color-[a-z0-9-]+)\s*:\s*rgba\(\s*0\s*,\s*0\s*,\s*0/gi)) {
    DARK_FG.add(d[1]);
  }
}

// Папка демки -> css-файл(ы) компонента (subtree). По умолчанию — одноимённый.
// Композитные компоненты рендерят в своём выводе разметку других компонентов и
// переиспользуют их CSS-классы — анализ должен читать ВСЕ задействованные css,
// иначе токены вложенного компонента (напр. стрелки .sg-tree-switcher у дерева
// внутри TreeSelect) останутся непокрытыми → чёрное на тёмном.
const MAP = {
  inputnumber: ['input-number'],
  autocomplete: ['autocomplete', 'input'],
  mentions: ['mentions', 'input'],
  search: ['search-input', 'input'],
  treeselect: ['tree-select', 'tree'],
  transfer: ['transfer', 'checkbox', 'input'],
};

// Известные исключения: поверхности, которые НЕЛЬЗЯ покрасить токенами обёртки.
// drawer/modal порталятся в document.body (CSS-переменные обёртки до них не
// доходят и оверлей всё равно перекрывает всю страницу); menu bg-elevated —
// это всплывающее подменю (в demo режим inline, поповер не показывается).
const IGNORE = {
  drawer: ['--sg-color-bg-elevated'],
  modal: ['--sg-color-bg-elevated'],
  menu: ['--sg-color-bg-elevated'],
};

function cssFilesFor(folder) {
  const names = MAP[folder] || [folder];
  return names.map((n) => path.join(cssDir, n + '.css')).filter((f) => fs.existsSync(f));
}

function demoTokens(file) {
  const src = fs.readFileSync(file, 'utf8');
  const set = new Set();
  for (const m of src.matchAll(/['"]?(--sg-[a-z0-9-]+)['"]?\s*:/gi)) set.add(m[1]);
  return set;
}

function cssInfo(files) {
  const consumed = new Set();
  const bg = new Set();
  const fg = new Set();
  const alias = new Map(globalAlias); // глобальные + локальные определения компонента
  // Токены, которые компонент ОБЪЯВЛЯЕТ на своём элементе (.sg-input { --sg-input-bg: … }).
  // Такое объявление перебивает наследование, поэтому переопределить этот токен
  // с родительской обёртки НЕЛЬЗЯ — крыть «дыру» нужно токеном ниже по цепочке.
  const localDeclared = new Set();
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    collectAliases(src, alias);
    for (const m of src.matchAll(/(--sg-[a-z0-9-]+)\s*:/gi)) localDeclared.add(m[1]);
  }
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    for (const m of src.matchAll(/var\(\s*(--sg-[a-z0-9-]+)/gi)) consumed.add(m[1]);
    for (const m of src.matchAll(/background(?:-color)?\s*:\s*([^;]+);/gi)) {
      // Только ПЕРВАЯ переменная — это требуемый токен. Остальные внутри
      // var(--x, <fallback>) срабатывают лишь когда первая не задана, поэтому
      // светлой дырой быть не могут, если демка задаёт первую.
      const first = m[1].match(/var\(\s*(--sg-[a-z0-9-]+)/i);
      if (first) bg.add(first[1]);
    }
    // `color:` (включая ::placeholder, ::selection и т.п.) — только первая
    // переменная: остальные внутри var(--x, fallback) играют лишь как запасные.
    for (const m of src.matchAll(/(?<!-)color\s*:\s*([^;]+);/gi)) {
      const first = m[1].match(/var\(\s*(--sg-[a-z0-9-]+)/i);
      if (first) fg.add(first[1]);
    }
  }
  return { consumed, bg, fg, alias, localDeclared };
}

// Цепочка разворачивания токена по алиасам: --sg-checkbox-bg -> --sg-color-bg.
function resolveChain(token, alias) {
  const chain = [token];
  const seen = new Set([token]);
  let cur = token;
  while (alias.has(cur)) {
    cur = alias.get(cur);
    if (seen.has(cur)) break;
    seen.add(cur);
    chain.push(cur);
  }
  return chain;
}

// Возвращает токен, которым РЕАЛЬНО можно закрыть «дыру» с обёртки, либо null
// если дыры нет. Дыра есть, когда цепочка токена упирается в проблемную базу
// (светлая поверхность для bg / чёрный текст для fg) И демка не переопределяет
// ни один эффективный токен цепочки. Токен, объявленный самим компонентом на
// его элементе (localDeclared, напр. `.sg-btn{--sg-btn-color:…}`), переопределить
// с обёртки НЕЛЬЗЯ — поэтому чинить надо первым не-localDeclared токеном цепочки
// (для Button это --sg-color-text, а не мёртвый --sg-btn-color).
function leakFix(token, set, alias, localDeclared, base) {
  const chain = resolveChain(token, alias);
  if (!chain.some((t) => base.has(t))) return null;
  if (chain.some((t) => set.has(t) && !localDeclared.has(t))) return null;
  return chain.find((t) => !localDeclared.has(t)) || null;
}

// Вставляет тёмные значения для leak-токенов сразу после строки `background:`
// в объекте обёртки. Уже присутствующие токены пропускает (идемпотентно).
function applyFix(demoFile, leakTokens) {
  const src = fs.readFileSync(demoFile, 'utf8');
  const lines = src.split('\n');
  const bgIdx = lines.findIndex((l) => /background\s*:\s*['"]#0f172a['"]/.test(l));
  if (bgIdx === -1) return { added: [], skipped: 'нет строки background' };
  const indent = lines[bgIdx].match(/^\s*/)[0];
  const added = [];
  const insert = [];
  for (const tok of leakTokens) {
    if (new RegExp(`['"]${tok}['"]\\s*:`).test(src)) continue; // уже задан
    const val = DARK_VALUE[tok];
    if (!val) {
      console.log(`      ! нет DARK_VALUE для ${tok} (${path.basename(path.dirname(demoFile))})`);
      continue;
    }
    insert.push(`${indent}'${tok}': '${val}',`);
    added.push(tok);
  }
  if (insert.length) {
    lines.splice(bgIdx + 1, 0, ...insert);
    fs.writeFileSync(demoFile, lines.join('\n'));
  }
  return { added };
}

// Сплошное покрытие: (1) нормализует значения всех структурных токенов, уже
// присутствующих в демке, к единой slate-палитре; (2) дозаполняет структурные
// токены, которые компонент реально читает (прямо или по цепочке алиасов), но
// демка не задаёт. Акценты/layout/прочее не трогает.
function coverApply(demoFile, needed) {
  const src = fs.readFileSync(demoFile, 'utf8');
  const lines = src.split('\n');
  const present = new Set();
  const tokenLine = /^(\s*)['"](--sg-[a-z0-9-]+)['"]\s*:\s*(['"])([^'"]*)\3(\s*,?)\s*$/;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(tokenLine);
    if (!m) continue;
    const tok = m[2];
    present.add(tok);
    if (STRUCTURAL.has(tok) && m[4] !== SLATE[tok]) {
      lines[i] = `${m[1]}'${tok}': '${SLATE[tok]}'${m[5] || ','}`;
    }
  }
  const bgIdx = lines.findIndex((l) => /background\s*:\s*['"]#0f172a['"]/.test(l));
  if (bgIdx === -1) return { added: [], normalized: true, skipped: 'нет background' };
  const indent = lines[bgIdx].match(/^\s*/)[0];
  const insert = [];
  const added = [];
  for (const tok of needed) {
    if (present.has(tok)) continue;
    insert.push(`${indent}'${tok}': '${SLATE[tok]}',`);
    added.push(tok);
  }
  if (insert.length) lines.splice(bgIdx + 1, 0, ...insert);
  fs.writeFileSync(demoFile, lines.join('\n'));
  return { added };
}

// Структурные токены, которые компонент реально читает: для каждого var(--sg-*)
// разворачиваем цепочку алиасов и собираем те её звенья, что входят в STRUCTURAL.
function neededStructural(consumed, alias) {
  const need = new Set();
  for (const t of consumed) {
    for (const link of resolveChain(t, alias)) {
      if (STRUCTURAL.has(link)) need.add(link);
    }
  }
  return need;
}

function auditFramework(label, demosDir, ext) {
  if (!fs.existsSync(demosDir)) return { problems: 0 };
  const folders = fs
    .readdirSync(demosDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => fs.existsSync(path.join(demosDir, n, `TokensOverride.demo.${ext}`)))
    .sort();

  let problems = 0;
  console.log(`\n==================== ${label} (${folders.length} демок) ====================`);
  for (const folder of folders) {
    const demoFile = path.join(demosDir, folder, `TokensOverride.demo.${ext}`);
    const files = cssFilesFor(folder);
    if (files.length === 0) {
      console.log(`  ?  ${folder}: нет css (${MAP[folder] || folder})`);
      continue;
    }
    const set = demoTokens(demoFile);
    const { consumed, bg, fg, alias, localDeclared } = cssInfo(files);

    if (COVER) {
      const { added } = coverApply(demoFile, neededStructural(consumed, alias));
      console.log(`  ~ ${folder}${added && added.length ? `  +${added.join(', ')}` : '  (normalized)'}`);
      continue;
    }

    // [DEAD] компонент-локальный токен, не читаемый css компонента
    const dead = [...set].filter((t) => !globalTokens.has(t) && !consumed.has(t));
    const ignore = IGNORE[folder] || [];
    // [BG] фон-поверхность, которую css красит, но демка не покрыла
    const bgLeak = [
      ...new Set(
        [...bg]
          .filter((t) => !ignore.includes(t))
          .map((t) => leakFix(t, set, alias, localDeclared, LIGHT_SURFACE))
          .filter(Boolean),
      ),
    ];
    // [FG] чёрный текст-токен, который css красит, но демка не покрыла
    const fgLeak = [
      ...new Set(
        [...fg]
          .filter((t) => !ignore.includes(t))
          .map((t) => leakFix(t, set, alias, localDeclared, DARK_FG))
          .filter(Boolean),
      ),
    ];

    if (dead.length || bgLeak.length || fgLeak.length) {
      problems++;
      console.log(`  ✗ ${folder}`);
      if (dead.length) console.log(`      DEAD: ${dead.join(', ')}`);
      if (bgLeak.length) console.log(`      BG:   ${bgLeak.join(', ')}`);
      if (fgLeak.length) console.log(`      FG:   ${fgLeak.join(', ')}`);
      if (FIX) {
        // DEAD не чиним автоматически (это копипаст-мусор — отдельный случай).
        const { added } = applyFix(demoFile, [...bgLeak, ...fgLeak]);
        if (added.length) console.log(`      FIX:  +${added.join(', ')}`);
      }
    } else {
      console.log(`  ✓ ${folder}`);
    }
  }
  console.log(`  --- проблемных: ${problems}/${folders.length}`);
  return { problems };
}

let total = 0;
if (target === 'react' || target === 'all') {
  total += auditFramework('REACT', path.join(repo, 'examples/demo/src/demos'), 'tsx').problems;
}
if (target === 'vue' || target === 'all') {
  total += auditFramework('VUE', path.join(repo, 'examples/demo-vue/src/demos'), 'vue').problems;
}
console.log(`\n[audit-demo-tokens] ИТОГО проблемных демок: ${total}`);
process.exit(0);
