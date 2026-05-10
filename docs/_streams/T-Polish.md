# T-Polish — Vue dts rollup + Bundle budget guard + sideEffects

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-Polish
- **Волна:** 2 (рабочие, дополнительный стрим из открытых finding'ов Волны 1)

## Цель
Закрыть 3 открытых улучшения упаковки:
1. `vite-plugin-dts` в `packages/vue/` оставляет относительные импорты на `core/src/*.ts` в rolled `dist/index.d.ts`. api-extractor вынужденно подавляет 2 правила. Починить корень — убрать подавления.
2. `examples/demo` lazy-чанки (`AdminApp-*.js`, `WorkflowEditorApp-*.js`, ~13 штук) не покрыты `.size-limit.json`. Добавить отдельный bundle budget guard.
3. В `package.json` пакетов `core`/`react`/`vue` нет `"sideEffects": false`. Без этого bundlers потребителей не tree-shake'ают unused-экспорты. Quick win по bundle size у пользователей.

## Зона файлов (можно трогать)

### Часть 1 — Vue dts rollup
- `packages/vue/vite.config.ts`
- `packages/vue/api-extractor.json` — **только** убрать подавления `ae-wrong-input-file-type` и `ae-unresolved-link` после починки.
- `packages/vue/tsconfig.json` (если потребуется правка путей `paths` для типов).

### Часть 2 — Bundle budget guard
- `scripts/check-bundle-budget.mjs` (новый)
- `scripts/README.md` — append описания (если файл существует от T-Codegen — append; если нет — создать).
- `package.json` (root) — **только** добавить script `"bundle:check": "node scripts/check-bundle-budget.mjs"`.
- `.github/workflows/ci.yml` — **только** добавить step `pnpm bundle:check` после `pnpm build`, в job `build-and-test`, на ячейке `ubuntu-latest × node 22`.

### Часть 3 — sideEffects
- `packages/core/package.json` — **только** добавить поле `"sideEffects": false`.
- `packages/react/package.json` — **только** добавить поле `"sideEffects": false`.
- `packages/vue/package.json` — **только** добавить поле `"sideEffects": false`.
- (Если в любом пакете обнаружится side effect через CSS-импорт в `src/index.ts` или подобное — оставить как массив `["*.css", "**/*.css"]` вместо `false`. Записать решение в `decisions/T-Polish.md`.)

### Запрет
- **НЕ перегенерировать** `etc/vue.api.md` baseline. Это делает пользователь руками после Волны 2 (или отдельным sanity-чеком). Иначе baseline уйдёт rough из-за параллельных Vue-стримов.
- **НЕ трогать** `etc/react.api.md`, `etc/core.api.md`.
- **НЕ трогать** `.size-limit.json` — bundle budget живёт отдельным скриптом, не как size-limit entry (карта T-Size явно ограничила glob, дублировать там нет смысла).

## Чек-лист

### Часть 1 — Vue dts rollup

1. Прочитать `packages/vue/vite.config.ts`. Найти секцию `vite-plugin-dts`.
2. Понять текущую конфигурацию: `rollupTypes`, `bundledPackages`, alias resolutions для `@skygraph/core`.
3. Воспроизвести симптом: `pnpm --filter @skygraph/vue build` → `rg "from '\.\./\.\./core/src" packages/vue/dist/index.d.ts` должен показать N штук относительных импортов.
4. Починка — попробовать варианты в порядке возрастающей инвазивности:
   - **A.** Добавить `bundledPackages: ['@skygraph/core']` в опции `dts()`. Возможный эффект — все типы core инлайнятся в `dist/index.d.ts`. Стоимость: размер `.d.ts` вырастет.
   - **B.** Если A не работает (потому что импорты относительные, а не по имени пакета) — настроить `compilerOptions.paths` в `tsconfig.json` для `@skygraph/core`, чтобы плагин корректно резолвил.
   - **C.** Если B не работает — переключить `rollupTypes` на `false` и оставить тонкие `.d.ts` файлы (несколько штук). api-extractor поддерживает оба режима.
5. После починки проверить:
   - `pnpm --filter @skygraph/vue build` зелёный.
   - `rg "from '\.\./\.\./core/src" packages/vue/dist/index.d.ts` — 0 совпадений.
   - `pnpm --filter @skygraph/vue api:check` зелёный (с подавлениями ещё в силе).
6. Убрать из `packages/vue/api-extractor.json` подавления `ae-wrong-input-file-type` и `ae-unresolved-link`.
7. Запустить `pnpm --filter @skygraph/vue api:check` — зелёный без подавлений.
8. Если api-extractor выдаёт **новые** ошибки после удаления подавлений (не относящиеся к dts rollup) — записать в `findings/T-Polish.md` и **вернуть** соответствующее подавление, чтобы не блокировать gate. Чинить новые ошибки за рамками scope.
9. Если ни один из вариантов A/B/C не сработал — `decisions/T-Polish.md` с описанием попыток, оставить подавления как есть, идти к Части 2.

### Часть 2 — Bundle budget guard

1. Создать `scripts/check-bundle-budget.mjs`:
   ```js
   // Псевдокод:
   // 1. Прочитать examples/demo/dist/assets/*.js — все файлы.
   // 2. Просуммировать raw size (без brotli/gzip).
   // 3. Сравнить с лимитом TOTAL_BUDGET_BYTES (initial = 5_000_000, ~5 MB raw).
   // 4. Если > лимит — process.exit(1) с понятным сообщением.
   // 5. Если ≤ — печатать таблицу chunks по убыванию + total + headroom + exit 0.
   ```
2. Лимит подобрать так: текущая сумма всех `dist/assets/*.js` для demo ≈ 4 MB raw (по данным sanity-чека T-Size: главный 3275 KB + ~14 lazy-чанков). Округлить вверх до удобного числа (5 MB / 5_000_000 байт).
3. Запустить локально:
   ```bash
   pnpm bundle:check
   ```
   Должен пройти и показать табличку.
4. Искусственный регресс-тест: добавить временно в `examples/demo/src/App.tsx` `import * as everything from 'lodash-es'` — `pnpm --filter demo build && pnpm bundle:check` должен **упасть**. Откатить изменение `App.tsx`.
5. Добавить в корневой `package.json`:
   ```json
   "bundle:check": "node scripts/check-bundle-budget.mjs"
   ```
6. Расширить `.github/workflows/ci.yml`: после step `pnpm build` (в job `build-and-test`, ячейка `ubuntu-latest × node 22`) добавить step:
   ```yaml
   - name: Bundle budget
     if: matrix.os == 'ubuntu-latest' && matrix.node == '22'
     run: pnpm bundle:check
   ```
7. Записать в `scripts/README.md` (или создать) описание скрипта и как обновлять лимит.

### Часть 3 — проверка sideEffects

1. По каждому из 3 пакетов:
   - Открыть `src/index.ts`.
   - Поискать импорты с побочными эффектами: `import './foo.css'`, `import './polyfill'` без присваивания, любые императивные вызовы на верхнем уровне.
   - Если **нет** — `"sideEffects": false` безопасно.
   - Если **есть** — `"sideEffects": ["**/*.css", "<конкретные файлы>"]`.
2. Добавить поле в `package.json` (где удобно — рядом с `"files"`).
3. Sanity:
   ```bash
   pnpm --filter @skygraph/core build
   pnpm --filter @skygraph/react build
   pnpm --filter @skygraph/vue build
   pnpm --filter demo build
   pnpm size
   ```
   `pnpm size` числа должны остаться **на том же уровне** или уменьшиться. Не должно вырасти.
4. Записать в отчёт текущие vs новые размеры из `pnpm size --json`.

### Финал

```bash
pnpm --filter @skygraph/vue build       # должен пройти
pnpm --filter @skygraph/vue api:check   # без подавлений (если получилось)
pnpm --filter demo build                # уже зелёный
pnpm bundle:check                       # новый, зелёный
pnpm size                               # уже зелёный, числа сравнить с baseline
```

## Acceptance criteria

- В `packages/vue/dist/index.d.ts` нет относительных импортов на `core/src/*.ts` (rg-проверка) **или** в `decisions/T-Polish.md` описано почему не получилось и подавления оставлены.
- Если починка успешна: `packages/vue/api-extractor.json` без подавлений `ae-wrong-input-file-type` / `ae-unresolved-link`.
- `scripts/check-bundle-budget.mjs` существует и работает.
- `pnpm bundle:check` зелёный с текущим состоянием demo.
- В `.github/workflows/ci.yml` есть step `Bundle budget`.
- Корневой `package.json` имеет script `bundle:check`.
- В `package.json` каждого из core/react/vue есть поле `sideEffects` (значение `false` или массив).
- `pnpm size` после правок не вырос относительно baseline.

## Стоп-лист

- НЕ перегенерировать `etc/*.api.md` (никаких пакетов).
- НЕ трогать `.size-limit.json`.
- НЕ менять existing CSS / SFC / TSX компонентов.
- НЕ трогать другие vite.config'и (только Vue).
- НЕ запускать `pnpm install`.
- НЕ запускать глобальные команды без `--filter` (исключение: `pnpm bundle:check` — это уже фильтрованный скрипт).

## Зависимости
Никаких. Запускается параллельно с любыми табами Волны 2.

Возможный конфликт по корневому `package.json`: T-CI закрыт, T-Quality / T-Codegen в стоп-листе имеют запрет на корневой `package.json`. Поэтому для `bundle:check` script — единственный кандидат на запись.

## Финал
Отчёт: `docs/_streams/done/T-Polish.md`. В отчёте — список вариантов A/B/C для Vue dts (что сработало) и табличка bundle:check на момент финиша.
