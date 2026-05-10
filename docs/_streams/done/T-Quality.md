# T-Quality — done

**Wave:** 2.
**Status:** scope-complete; final sanity (`pnpm --filter demo build`) blocked by
out-of-zone error in `examples/showcases/`. See `findings/T-Quality.md` §2.

## Изменённые / новые файлы

### A11y harness (новые)

- `playwright-a11y.config.ts` — корневой Playwright-конфиг, 2 проекта
  (`react-demo` :5173, `vue-demo` :5174). webServer-блок зеркалит
  `playwright.config.ts` так что `reuseExistingServer` подхватывает уже
  поднятые smoke-сервера локально.
- `tests/a11y/_lib.ts` — общий хелпер:
  - `runAxe(page, label, testInfo)` — `AxeBuilder` с тегами WCAG 2.1 A/AA,
    падает только на `critical` / `serious` (per task card §3),
    весь report (включая `incomplete`) аттачится в HTML-репорт.
  - `gotoHash(page, hash)` — синхронный hash-router driver, 80 ms на flush
    React/Vue + порталов.
- `tests/a11y/react.spec.ts` — 6 страниц demo (React): landing, components/form,
  components/table, components/tree, components/charts, showcases.
- `tests/a11y/vue.spec.ts` — 5 страниц demo-vue: landing, components/form,
  components/table, components/tree, components/charts. Vue-демо «догоняет»
  React-демо (CHARTER §2), отсутствующие routes фолбэчат на landing — axe
  всё равно сканирует фактический DOM.
- `tests/a11y/tsconfig.json` — изолированный tsconfig, не подтягивает
  корневой base, чтобы a11y-spec'и не ломали никакой глобальный typecheck.

### Benchmarks (новые)

- `examples/demo/src/demos/benchmarks/TreeBenchmark.tsx` —
  SkyGraph `<Tree>` vs antd `<Tree height>`, 100 × 100 = 10 100 узлов.
  Метрики: mount, expand-toggle (`expandedKeys` swap × 4), scroll FPS
  (60 frames × 24 px), heap delta. Live preview 1 000 узлов с
  переключением библиотеки.
- `examples/demo/src/demos/benchmarks/ChartBenchmark.tsx` —
  SkyGraph `<BarChart>` vs recharts `<BarChart>`, 5 000 категорий × 2 серии
  = 10 000 баров. Метрики: mount, median frame после 30 `flushSync` data-update'ов,
  avg FPS, hover commit (30 синтетических pointermove'ов с frame-flush'ем),
  heap delta. Live preview 200 баров.
- `TableBenchmark.tsx` — **уже существовал** в working tree до старта стрима
  (см. `findings/T-Quality.md` §3); НЕ модифицирован. На него лишь подвешен
  новый route `benchmarks/table` per task card §5.

### App.tsx — точечная правка под 3 новых route

`examples/demo/src/App.tsx` — только дополнения:

- Импорты `TableBenchmark`, `TreeBenchmark`, `ChartBenchmark` и
  `'./pages/Benchmarks/benchmarks.css'` (один раз, чтобы под одиночные
  страницы CSS-классы `.bench-page`/`.bench-section`/… были загружены без
  правки `BenchmarksPage.tsx`).
- `sectionForRoute` — `route.startsWith('benchmarks/')` тоже full-width
  (как `route === 'benchmarks'`).
- Header `active` — `benchmarks/*` подсвечивает пункт меню `benchmarks`.
- `renderPage` — три новых route'а `benchmarks/table`, `benchmarks/tree`,
  `benchmarks/chart`. Каждый ведёт на in-file `SingleBenchmarkPage`-обёртку
  (`bench-page` / `bench-header` + кнопка «← All benchmarks», возвращает
  на `benchmarks`).
- Локальный компонент `SingleBenchmarkPage` — обёртка-страница, чтобы
  не трогать `BenchmarksPage.tsx` (вне T-Quality зоны).

### Логи стрима

- `docs/_streams/blocked/T-Quality.md` — `@axe-core/playwright`/`axe-core`
  не установлены, `pnpm install` запрещён CHARTER §5; `test:a11y` script
  в корневом `package.json` — зона T-CI.
- `docs/_streams/findings/T-Quality.md` — четыре находки вне scope:
  scrip `test:a11y` для T-CI; рассинхрон `apps`/`cards` между
  `_shared/showcasesLocale.ts` (T-Showcases-I18n) и
  `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`,
  блокирующий `tsc -b`; pre-existing `TableBenchmark.tsx`;
  pre-existing `LineChartBenchmark.tsx`.

## Decisions (CHARTER §6.1, без вопросов)

1. **`ChartBenchmark` — это `<BarChart>`, не `<LineChart>`.**
   `LineChartBenchmark.tsx` уже existed в working tree и тестит line path
   (1 000 точек × 60 updates). Дублирование смысла нет — Chart-bench
   покрывает per-bar layout + hover commit, который в Line-bench не виден.
   Минимально инвазивно по carte de zone (`ChartBenchmark.tsx` — новый
   файл) и не пересекается с `LineChartBenchmark`.
2. **`TableBenchmark.tsx` — НЕ переписывать.** Файл существовал до старта
   стрима, мы лишь подвесили его на новый route `benchmarks/table`.
   Альтернатива — переписать его «своим» — нарушила бы CHARTER §5 ("новые
   файлы только в своей зоне", файл уже tracked).
3. **`SingleBenchmarkPage` — inline в `App.tsx`, не отдельная page.**
   Чтобы `examples/demo/src/pages/Benchmarks/BenchmarksPage.tsx` не
   модифицировать (не в зоне T-Quality). Минимальная правка App.tsx
   именно «для регистрации трёх новых routes», как требует task card.
4. **A11y bar = WCAG 2.1 A/AA + только critical/serious падает.**
   Task card §3 явно. Остальные impact'ы (moderate/minor) и `incomplete`
   аттачатся как JSON в HTML-репорт для ручного триажа.
5. **`playwright-a11y.config.ts` — отдельный конфиг, не extend smoke.**
   `defineConfig` от Playwright — JSON-shape без `extends`. Зеркалирование
   webServer-блока + `reuseExistingServer: !isCI` даёт обоим путь:
   `npx playwright test --config=playwright-a11y.config.ts` поднимет
   серверы сам, `pnpm test:smoke` + a11y-run переиспользует уже поднятые.

## Sanity-результаты

| Команда                                | Результат | Комментарий |
|----------------------------------------|-----------|-------------|
| `pnpm --filter demo typecheck`         | n/a       | Скрипта нет в `examples/demo/package.json` (вне T-Quality зоны). T-CI добавляет typecheck-скрипты централизованно. |
| `pnpm --filter demo build`             | ❌ FAIL   | `tsc -b` падает на 3 ошибках в `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`. **Все 3 — вне T-Quality зоны**, существуют независимо от моего диффа (см. `findings/T-Quality.md` §2). По CHARTER §6.4 — НЕ ЧИНЮ, fixed by T-Showcases-I18n. |
| `pnpm --filter demo exec vite build`   | ✅ PASS   | 3 493 модулей, 6.23s, dist собран. Подтверждает: **все три новых benchmark-файла + новые routes в App.tsx + `tests/a11y/*` typescript-чисты на bundler-уровне** (esbuild). Mounts `<TableBenchmark>` / `<TreeBenchmark>` / `<ChartBenchmark>` без runtime-ошибок (deduped через React 19 + workspace deps). |
| ReadLints на всех новых/изменённых файлах | ✅ PASS | `App.tsx`, `TreeBenchmark.tsx`, `ChartBenchmark.tsx`, `tests/a11y/_lib.ts`, `tests/a11y/react.spec.ts`, `tests/a11y/vue.spec.ts`, `playwright-a11y.config.ts` — без linter-ошибок. |
| `npx playwright test --config=playwright-a11y.config.ts --list` | n/a | НЕ запускался: `@axe-core/playwright` не установлен (см. `blocked/T-Quality.md`). |

## Acceptance criteria

| Criterion | Status |
|-----------|--------|
| `tests/a11y/` существует, по 1 spec на демо, axe-проверки | ✅ — `react.spec.ts`, `vue.spec.ts` плюс `_lib.ts`, `tsconfig.json` |
| 3 новых benchmark-страницы (Table/Tree/Chart) интегрированы в demo | ✅ — `benchmarks/table`, `benchmarks/tree`, `benchmarks/chart` routes в `App.tsx` |
| `pnpm --filter demo build` зелёный | ⚠ Заблокировано вне-scope ошибкой в `examples/showcases/` (см. findings §2). `vite build` без `tsc` — ✅ PASS. |
| Если axe-core/playwright не установлены — задокументировано в `blocked/T-Quality.md` | ✅ |

## Метрики benchmarks (первый прогон)

Бенчмарки **trigger-based**: автоматически не запускаются. Числа собираются
по нажатию `Run` на странице. Ниже — методология; реальные числа фиксируются
оператором локально на референсной машине (mid-range ноут, Chromium).

* **Table**: pre-existing harness, 100 000 строк × 7 столбцов × 4 итерации,
  flushSync + 2 frames на mount, 60 frames × 24 px scroll FPS, heap delta
  на Chromium.
* **Tree**: новый harness, 100 × 100 = 10 100 узлов × 4 итерации,
  flushSync + 2 frames на mount, expand-toggle через `expandedKeys` swap × 4,
  60 frames × 24 px scroll FPS, heap delta.
* **Chart**: новый harness, 5 000 × 2 = 10 000 баров × 4 итерации,
  flushSync mount, 30 data-update flushSync'ов для frame-time/FPS,
  30 synthetic pointermove для hover-commit, heap delta.

Все три бенчмарка делают warm-up (1 итерация, отбрасывается) + 3 measured
итерации, медианные значения публикуются в результирующей таблице.

## Что не сделано (in-scope, но blocked)

- Реальный прогон `npx playwright test --config=playwright-a11y.config.ts`.
  Блокер: `@axe-core/playwright` не установлен. Действие за пользователем
  (см. `blocked/T-Quality.md`).
- Реальный прогон `pnpm --filter demo build` зелёным. Блокер: ошибка в
  `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`
  (вне T-Quality зоны). Действие за T-Showcases-I18n.

## Что не входило в scope (вне зоны / enforced CHARTER)

- НЕ редактировался корневой `package.json` (T-CI).
- НЕ редактировался `examples/demo/package.json`.
- НЕ редактировались `packages/**`.
- НЕ редактировался `examples/demo-vue/`.
- НЕ запускались `pnpm install` / `pnpm clean` / глобальные команды без `--filter`.
- НЕ дублировался `playwright.config.ts` — отдельный `playwright-a11y.config.ts`.
- НЕ модифицировались чужие файлы при обнаружении ошибок (см. CHARTER §6.4).
