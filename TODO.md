# SkyGraph — TODO

> Реальные хвосты после round 1..9 + 9.1 closeout + round 11 + round 12 + round 13.
> Каждая запись — кандидат в будущий стрим или мини-стрим.
>
> Статус на 2026-05-09: round 13 закрыт 19 коммитами на master двумя
> фазами (Vue full port + side-quests UX/демо/деплой). Подробности —
> в `CHANGELOG.md` секция "Round 13".
>
> Главное:
> - `@skygraph/vue` доехал до полного API/CSS-паритета с React-адаптером:
>   14 composables (включая `useChartSize`/`useFocusTrap`/`useRovingTabIndex`/
>   `useListNavigation`/`useHistory`/`useVirtualScroll`), 52 ui SFCs,
>   14 complex SFCs (Form/SchemaForm/SchemaFormEditor/Table/DataGrid/Tree/
>   List/VirtualList/Diagram/Charts/Dashboard/Gantt/Timeline/ResourceCalendar)
>   + print utility. Контракт держится тестом
>   `packages/vue/src/__tests__/styling-contract.parity.test.ts` (≈725
>   строк, 30+ component snapshots vs React DOM/classes).
> - Бенчмарки: новая страница `/#/benchmarks` в demo (Form vs RHF, Table vs
>   AntD, LineChart vs Recharts) — mount/per-change/submit-bytes под
>   одинаковой нагрузкой, медиана 5 прогонов с warm-up.
> - Showcases дедуп: `project-tracker` влит в `crm`, `analytics` — в
>   `dashboard`. Было 14 → стало 12. Все шоукейсы модернизированы под
>   round-11/12 фичи (ResourceCalendar в CRM, hover toolbar в Dashboard,
>   GraphEngine routing в Workflow Editor, и т.д.).
> - Deploy: `deploy/{Caddyfile,Dockerfile,build-all.mjs,stubs/}` —
>   multi-framework subdir (`/`, `/vue/`, `/angular/`) под Caddy.
>   `deploy/output/` gitignored, билд локально.
> - Demo SEO + FrameworkSwitcher в хедере React demo (jumps `/` →
>   `/vue/` → `/angular/`).
> - Demo-vue: ant-style shell + 23 компонент-страницы.
> - Visual polish: `diagram.css` (+149 строк новых семантических токенов),
>   `charts.css` (tooltip/crosshair/brush refinement), `dashboard.css`
>   (+editor mode affordances), `gantt.css`/`timeline.css`/
>   `resource-calendar.css`/`event-timeline.css` — secondary viz polish.
> - Architecture drift audit: `_audit/architecture-drift-2026-05-09.md`
>   зафиксировал 9 findings (2 warn / 7 note). Документационный дрейф
>   между ARCHITECTURE.md и реальностью кода (validation-engine ghost,
>   calendar/graph не упомянуты в namespaces/file-structure) починен в
>   docs sync (этот коммит). engines/virtual/ структура и DOM-aware
>   defaults (`requestAnimationFrame`, `localStorage`) — оставлены как
>   есть, не блокеры.
>
> Все гейты зелёные на момент закрытия round 13:
>  - `pnpm exec eslint packages/` 0 errors / 0 warnings.
>  - `pnpm lint:examples` 0 errors / 27 warnings (baseline).
>  - `pnpm check:styles` OK (91 tokens, 70 файлов; 71 файл без
>    unjustified `!important`).
>  - `pnpm -r test` — **388 + 1 skipped** (core, bench-gated) +
>    **625** (react) + **659** (vue) = **1672 active** tests.
>  - `pnpm -r build` — все четыре пакета (`core`, `react`, `vue`,
>    `styles`) + demo + demo-vue + showcases собираются.
>  - `pnpm exec tsc --noEmit` clean в `core` / `react` / `styles`,
>    `pnpm --filter @skygraph/vue exec vue-tsc --noEmit` clean для
>    portированной поверхности (pre-existing type-debt в Form/Checkbox/
>    list/virtual-list/table тестах остаётся вне scope round 13).
>
> ---
>
> Статус на 2026-05-08: round 12 — три коммита на master:
> 1) `13a695e` infra(css): extract `@skygraph/styles` package — CSS
>    вынесен из `packages/react/styles/` → `packages/styles/` через
>    `git mv` (history сохранена). `@skygraph/react` тянет CSS через
>    `dependencies`, examples переключены на `import '@skygraph/styles'`,
>    scripts (audit/check-tokens/check-no-important) обновлены.
> 2) `c3489b4` feat(vue): `@skygraph/vue` MVP adapter — 5 composables,
>    4 components, examples/demo-vue. Класс-имена `.sg-*` идентичны
>    React-адаптеру, общий CSS-контракт через `@skygraph/styles`.
> 3) `e9888e1` infra(round-12 tab-A): finalisation + multi-framework
>    arch + TS lib bump + dead CSS cleanup —
>    `packages/react/styles/` удалена целиком (без shim);
>    `packages/react/package.json` exports/files почищены от
>    `./styles*`. `tsconfig.base.json` `target/lib` подняты до ES2022 +
>    DOM/DOM.Iterable; `packages/{core,styles}/tsconfig.json`
>    синхронизированы. Корневой script `pnpm typecheck`
>    (`pnpm -r exec tsc --noEmit`) и step `pnpm typecheck` в CI после
>    `pnpm lint` — добавлены. `docs/multi-framework.md` фиксирует
>    стратегию React → Vue → Angular (контракт адаптеров, CSS
>    contract, demo strategy, semver). `ARCHITECTURE.md` §7 + §8 +
>    `docs/README.md` обновлены под новую реальность. Dead-CSS audit
>    снижен 57 → 20 через фикс false-positive в `audit-styles.mjs`
>    regex (camelCase placement classes сохранены — они
>    runtime-генерируются через `sg-${placement}` template literal).
>    Round-11 наплодил `.sg-context-menu*` / `.sg-datagrid-context-menu*`
>    в TSX без CSS — создан `packages/styles/components/context-menu.css`
>    через токены, inline `style={...}` вырезаны (кроме
>    runtime-координат `top`/`left`).
>
> Migration / breaking: `import '@skygraph/react/styles'` и любые его
> subpath'ы больше не работают. Замена строго механическая —
> `@skygraph/styles` (или `@skygraph/styles/components/<name>`,
> `@skygraph/styles/themes/dark`, …). `@skygraph/styles` сам идёт
> транзитивно через `dependencies` `@skygraph/react`, ставить
> отдельно не нужно.
>
> Foundation для `@skygraph/angular` (опциональный позже) — ничего
> в core / styles делать не надо, всё уже framework-agnostic.
>
> Статус до round 12: round 11 закрыт 15 коммитами на master (две волны):
>  - первая волна (3 больших фичи + Tree fix + i18n batch):
>    `158da10` print pipeline → закрыл 1.3,
>    `f9b7af2` `ResourceCalendar` (шестой движок) → закрыл хвост 1.1,
>    `111dfe8` visual `SchemaFormEditor` → закрыл 1.2,
>    `668c45b` Tree virtualization fix,
>    `b655c4a`/`ceea720`/`0d10478`/`9008db1`/`4b71626` — i18n на page-level
>    `ComponentDoc` (~46 страниц).
>  - вторая волна (5 параллельных табов A/B/C/D/F UX-полишинг + demo expansion):
>    `6bad1f9` Charts UX (responsive `useChartSize`, `ChartHoverToolbar`,
>    `chartExport`, `chartContextMenu`),
>    `cee9b9a` чистка дублирующих type-импортов,
>    `ef617a6` Diagram UX (context menu, hover actions, multi-select / lasso,
>    +10 demos),
>    `6e0c15f` Dashboard UX (widget hover actions, context menu, +6 demos),
>    `8e7b8ad` Charts demo expansion (11 demos),
>    `9289acc` Table demo (5 pro-feature демо).
>
> Все гейты зелёные: `pnpm exec eslint packages/` 0 errors / 0 warnings,
> `pnpm lint:examples` 0 errors / 27 warnings, `pnpm check:styles` OK
> (91 tokens, 69 файлов; 70 файлов без unjustified `!important`, теперь
> относительно `packages/styles/`), `pnpm -r test` — 388 + 1 skipped
> (core, bench-gated) + 625 (react) = **1013 active**, `pnpm -r build` —
> все пакеты (`core`, `react`, `styles`) + demo + showcases собираются,
> `pnpm exec tsc --noEmit` clean в `core` / `react` / `styles`.

---

## 1. Большие задачи (отдельные стримы)

### 1.1 ✅ Gantt / EventTimeline / ResourceCalendar
- Tab A round 9: `Gantt` (drag/resize/dependencies/resources) и `EventTimeline`
  (groupBy day/month/year, horizontal/vertical). +38 тестов, 4 demo.
- Round 11 (`f9b7af2`): `ResourceCalendar` — шестой движок в семействе
  `form/table/tree/virtual/graph/calendar`. Engine
  `packages/core/src/engines/calendar/` (availability + conflicts +
  capacity, subpath `@skygraph/core/calendar`) + React-адаптер
  `packages/react/src/components/complex/ResourceCalendar/` (lane-grid,
  drag/resize/keyboard nudge, conflict overlay). +35 core / +2 subpath /
  +18 react тестов, 2 demo.

### 1.2 ✅ SchemaForm визуальный редактор
Закрыто round 11 (`111dfe8`): `SchemaFormEditor` — palette + canvas +
inspector + Preview/Schema toggle поверх `SchemaForm`. `useSchemaEditor()`
hook-store с bounded undo/redo (HISTORY_LIMIT=100), round-trip адаптеры
`jsonSchemaToEditorSchema` / `editorSchemaToJsonSchema`. Native HTML5 DnD
с custom MIME (no external libs). +27 тестов, 2 demo.

### 1.3 ✅ Print / PDF
Закрыто round 11 (`158da10`): `printElement(node, opts?)` (popup + native
print dialog, без runtime-deps), `styles/print.css` (`@media print` слой),
`printable?` prop + `ref.print()` на `Table` / `Diagram` / `LineChart` /
`BarChart` / `AreaChart` / `PieChart` через `forwardRef +
useImperativeHandle`. Опции `PrintOptions = { fileName?, orientation?,
pageSize?, customStyles? }`. Атрибутный API `data-sg-page-break` /
`data-sg-page-break-before`. +17 тестов.

---

## 2. Функциональные расширения

### 2.1 ✅ TableEngine — pro закрыт
- ✅ ~~Расширенные фильтры~~ (round 8 Tab C).
- ✅ ~~Группировка строк + агрегации~~ (round 8 Tab C).
- ✅ ~~Virtualization с динамической высотой строк~~ (Tab B round 9, через `MeasureCache` + `ResizeObserver`).

### 2.2 ✅ Charts — pro закрыт
- ✅ ~~Animations~~ (round 8 Tab D).
- ✅ ~~Interactive crosshair~~ (round 8 Tab D).
- ✅ ~~Brushing~~ (Tab B round 9, новый `<ChartBrush>` overlay + `brush?` props на Line/Bar/Area).
- ✅ ~~Responsive SVG~~ (round 11 Tab A, `useChartSize` + `ResizeObserver`,
  `vector-effect="non-scaling-stroke"`).
- ✅ ~~Hover toolbar (print / SVG / PNG / reset brush + custom actions)~~
  (round 11 Tab A, `ChartHoverToolbar` + `chartExport`).
- ✅ ~~Context menu (per-series + plot)~~ (round 11 Tab A,
  `chartContextMenu`).

### 2.3 ✅ GraphEngine / Diagram — pro закрыт
- ✅ Orthogonal routing с препятствиями (round 8 Tab B).
- ✅ OBB / rotated bounds (round 8 Tab B).
- ✅ Zoom / pan в `<Diagram>` (round 8 Tab B).
- ✅ Snap-to-grid при drag (round 8 Tab B).
- ✅ Undo/redo (round 7 Tab C).
- ✅ ~~Context menu (node / edge / canvas)~~ (round 11 Tab B).
- ✅ ~~Hover actions (node / edge mini-toolbars в screen-space)~~
  (round 11 Tab B).
- ✅ ~~Multi-select / lasso~~ (round 11 Tab B, `selectionMode: 'single' |
  'multi' | 'lasso'`, multi-drag в одной transaction).

### 2.6 ✅ Dashboard — pro закрыт
- ✅ ~~Drag/resize widgets~~ (round 8 Tab B, `<DashboardEditor>`).
- ✅ ~~Hover actions + context menu~~ (round 11 Tab D).

### 2.4 ✅ a11y axe-coverage
Закрыто tab C round 9: оба `it.todo` (`ColorPicker`, `TimePicker`) переведены в активные тесты после добавления `aria-label` / `aria-labelledby` (в `ColorPicker` триггер дополнительно перешёл с `<div>` на `<button>` ради `aria-allowed-attr`). Добавлены тесты для `Cascader (open)` и `VirtualList`. Все 7 ранее непокрытых компонентов из исходного списка теперь проверяются (`Carousel`, `Mentions`, `Cascader`, `VirtualList`, `Rate`, `ColorPicker`, `TimePicker`).

### 2.5 ✅ Select styled — accessible name
Закрыто round 8 Tab D: `aria-label?` / `aria-labelledby?` пробрасываются в `role="combobox"`.

---

## 3. Технический долг

### 3.1 Локализация demo (в работе)
- Шаблон: `examples/demo/src/i18n/useDemoStrings.ts` (батч-1) и
  `examples/demo/src/demos/<comp>-doc/{en,ru}.ts` + `use<Comp>DocStrings.ts`
  (round 9.1 ButtonDemo — для page-level ComponentDoc).
- Сделано на уровне in-demo строк:
  - Round 9 — 37 файлов `<comp>/Variant.demo.tsx` (`009747f`).
  - Round 9 — ещё ~25 файлов (`e38a678`).
  - Round 11 Tab F (`8e7b8ad`) — 11 charts demo с en/ru.
  - Round 11 Tab B (`ef617a6`) — 10 diagram demo с en/ru.
- Сделано на уровне page-level `ComponentDoc` (props + cssVars descriptions):
  - Round 9.1 — `ButtonDemo.tsx` (`95d4aea`) — паттерн.
  - Round 11 — form controls × 10 (`b655c4a`), data display × 10
    (`ceea720`), form helpers × 10 (`9008db1`), Diagram + Gantt +
    EventTimeline + `StylingShowcasePage` (`0d10478`), Breadcrumb + Tabs +
    SchemaFormEditor (`4b71626`). Итого ~46 страниц.
- Осталось:
  - ~400 файлов `examples/demo/src/demos/<comp>/Variant.demo.tsx` с
    английским хардкодом — мигрируется батчами через `useDemoStrings`.
  - Несколько `*Page.tsx` без локализации (Dashboard, ResourceCalendar,
    Print) — по паттерну `<comp>-doc/{en,ru}.ts`.

### 3.2 CSS audit
- `pnpm audit:styles` теперь часть CI (Tab D round 9): фейлится если
  `_audit/styling-audit.md` устарел, поэтому артефакт всегда свежий.
- Дохлые/не-задействованные классы периодически появляются после refactor —
  не блокер, разбирается батчами через `audit-styles.mjs` + ручная проверка.

### 3.3 ✅ Удаление deprecated файлов
Закрыто tab C round 9: `ui/TreeSelect.tsx` и `ui/Transfer.tsx` физически удалены. Тесты `Transfer` / `TreeSelect` в `__tests__/new-components.test.tsx` (10 кейсов) переписаны под complex API. `TreeSelectNode` re-export убран.

### 3.4 ✅ TS strictness
Закрыто round 8.1 + Tab B round 9 (`ExpandableConfig.defaultExpandedRowKeys` додобавлено). `tsc --noEmit` чисто на core и react.

---

## 4. Инфраструктура

### 4.1 ✅ ESLint для examples
Закрыто round 9.1: `examples-eslint.config.js` + npm-скрипт `lint:examples`. Все три конфига (`eslint.config.js`, `examples-eslint.config.js`, `examples/demo/eslint.config.js`) теперь явно пинят `tsconfigRootDir` + `project` per-package / per-app — иначе typescript-eslint падал на ambiguous `tsconfig.json` detection.

### 4.2 ✅ CI шаги
Закрыто Tab D round 9: `.github/workflows/ci.yml` получил
`audit:styles drift check` (фейлит при изменении `_audit/styling-audit.md`)
и opt-in `coverage (core + react)` шаг на Node 22 (`continue-on-error: true`).

### 4.3 ✅ Slow tests
Закрыто Tab D round 9: `table.test.ts > scalability > 100k rows`
завёрнут в `describe.runIf(process.env.RUN_BENCH === '1')`. Дефолтный
`pnpm --filter @skygraph/core test` — ~3s, отдельный
`pnpm --filter @skygraph/core test:bench` — для бенча.

### 4.4 ✅ Subpaths в core
Закрыто Tab D round 9: `@skygraph/core/{table,tree,virtual,graph}` —
entrypoints в `core/tsup.config.ts` + `package.json#exports`. Smoke-test
`subpath-exports.test.ts` (9 кейсов) гарантирует, что каждая фабрика
импортируется и инстанциируется через subpath. Round 11 (`f9b7af2`)
добавил `@skygraph/core/calendar` (+2 кейса → итого 11).

### 4.5 ✅ Multi-framework foundation — `@skygraph/styles`
Закрыто round 12 (`13a695e`): CSS вынесен в отдельный workspace-пакет
`@skygraph/styles` (`packages/styles/`, 70 файлов, ≈234 KB raw / ≈25 KB
gzip), `git mv` сохранил историю для 69 из 70 файлов. `@skygraph/react`
теперь зависит от `@skygraph/styles` через `dependencies` (транзитивно
тащится при установке). Тонкий 2-строчный shim
`packages/react/styles/index.css` оставлен ради backward-compat для
главного entrypoint `import '@skygraph/react/styles'` — per-component
subpaths под `@skygraph/react/styles/<...>` удалены из
`package.json#exports` (мигрируют на `@skygraph/styles/<...>`).
`scripts/{audit-styles,check-tokens,check-no-important}.mjs` обновлены
под новый путь.

### 4.6 ✅ Multi-framework — закрыто round 12 + round 13
- ✅ `@skygraph/vue` adapter — round 12 закрыл MVP (5 composables + 4
  components), round 13 (`e504766` … `0507750`) добил до полного
  паритета: 14 composables, 52 ui SFCs, 14 complex SFCs, print utility,
  styling-contract.parity test (≈725 строк) против React DOM/classes.
- ✅ Hard remove shim `packages/react/styles/` — закрыто round 12
  (`e9888e1`) одновременно со стилевой extraction'ом, без миграционного
  окна (изменение строго механическое).
- ✅ `docs/multi-framework.md` — закрыто round 12 (`e9888e1`),
  обновлено round 13 (`b20dddc` documented Vue DOM-contract
  exceptions, `11e2c2e` align Vue row, текущий docs sync обновляет
  таблицу composables-паритета).
- ✅ Shared examples workspaces — закрыто round 12 / 13:
  `examples/_shared/` (vanilla TS — parsers, constants, showcasesLocale),
  `examples/_shared-react/` (AppShell, Header, Footer, Sidebar, theme/
  language switchers). Используются и `examples/demo`, и `examples/
  showcases` (через embed); demo-vue имеет свой shell в `examples/
  demo-vue/src/components/`.

### 4.7 ✅ Multi-framework deploy — закрыто round 13
Закрыто `11e2c2e`: `deploy/{Caddyfile,Dockerfile,build-all.mjs,stubs/}`
— Caddy serve `/` (React demo) + `/vue/` + `/angular/` (Coming-Soon
stubs пока demo-vue/demo-angular не склеены в общий билд). Корневой
`.dockerignore` тримит docker context. `deploy/output/` gitignored,
собирается через `node deploy/build-all.mjs`. README — в
`deploy/README.md`.

### 4.8 ✅ Benchmarks page — закрыто round 13
Закрыто `b7fc719` + `687afde`: новая страница `/#/benchmarks` в
`examples/demo` с тремя бенчмарками — `FormBenchmark` (SkyGraph vs
react-hook-form, 100 полей × 6 запусков, mount + per-change + submit
bytes), `TableBenchmark` (SkyGraph vs AntD `Table`), `LineChartBenchmark`
(SkyGraph vs Recharts). Helper `benchUtils.ts` — нормализованный
runner (warmup + median of N + min/max + extras). Live-preview под
бенчмарком позволяет визуально сверить рендер.

---

## 5. Mini-fixes — все закрыты

- ✅ `SchemaForm.tsx` — `useConfig` вызван условно. Закрыто Стрим 1.
- ✅ `Table/Table.tsx` — `rowNumConfig` conditional → `useMemo`. Закрыто round 8.1.
- ✅ `Tree/Tree.tsx` — `handleKeyDown` missing deps. Закрыто Tab D.
- ✅ `DatePicker.tsx` — unused eslint-disable. Закрыто Tab D.
- ✅ `useFieldArray.ts` — `genKey` missing in deps двух callbacks. Закрыто round 8.1.
- ✅ `SubmitButton` — `sg-btn` → `sg-button`. Закрыто ранее.
- ✅ `Slider` — collapse в flex/grid, исправлено round 9.1 (см. CHANGELOG).
- ✅ `Rate` — colour emoji не различались, исправлено round 9.1
  (новый `--sg-rate-symbol-empty-opacity`).
- ✅ `ExpandableConfig.defaultExpandedRowKeys` — pre-existing TS-error из
  round 8 вылечен Tab B round 9.
- ✅ `Tree.tsx` — virtualization показывала scrollbar только для видимого
  диапазона. Закрыто round 11 (`668c45b`): top/bottom inserts перешли с
  `position: absolute` на `padding-*` родителя.
- ✅ `Charts/types.ts` — дублирующиеся type-импорты после параллельного
  редактирования табов A/F. Закрыто round 11 (`cee9b9a`).
- ✅ `packages/react/tsconfig.json` `target` / `lib` — ES2020 → ES2022.
  `Array.prototype.at(-1)` падал на `tsc --noEmit` в
  `diagram.test.tsx` / `resource-calendar.test.tsx`. Закрыто round 12
  (`13a695e`) одним коммитом со styles extraction.

---

## История стрима

Полный лог стримов и решения по развилкам — в git history (`git log --oneline`).
Эфемерные стрим-файлы (`STREAM-CHAT.md`, `STREAM-PLAN.md`, `CYCLE-LOG.md`,
`AUDIT.md`, `AUDIT-POST.md`, `PLAN.md`, `TODO-cycle.md`) удалены после
завершения цикла; их содержимое отражено в коммитах + `CHANGELOG.md`.

Round 9 — 7 коммитов (A, B, C, D + 2× i18n batch + closeout):

| sha7 | scope | summary |
|------|-------|---------|
| `a5c72b7` | tab D | core subpaths, examples-eslint, slow-tests bench, audit:styles regen + CI |
| `c81cfd6` | tab A | Gantt + EventTimeline (new complex components) |
| `2aafd06` | tab C | a11y axe coverage closes both round-2 todos + ui/{TreeSelect,Transfer} deleted |
| `009747f` | i18n  | per-demo helper + en/ru strings (batch 1: 37 demos) |
| `5391883` | tab B | Table virtual rows (dynamic height) + Chart brush + docs sync |
| `e38a678` | i18n  | per-demo en/ru for dropdown/select/switch/segmented/rate (batch 2) |
| `cecf266` | infra | eslint type-aware roots + ignore vitest/tsup configs (round 9.1) |
| `3a4a342` | fix   | Slider stretches in flex/grid; Rate dims inactive symbols (round 9.1) |
| `95d4aea` | demo  | ButtonDemo i18n + DistributedComposition (round 9.1) |

Round 13 — 19 коммитов в две фазы (Vue full port + side-quests):

Фаза 1 — Vue full port (7 коммитов):

| sha7 | scope | summary |
|------|-------|---------|
| `e504766` | feat   | vue/ui — port 27 ui primitives (feedback + navigation + display + ConfigProvider/Transition), 271 vitest |
| `177e946` | feat   | vue/forms — composables + Form + SchemaForm |
| `4a4d5b7` | feat   | vue/forms — SchemaFormEditor (palette + canvas + inspector) |
| `b1b12b6` | feat   | vue/forms — 19 ui form controls + tests |
| `7f3111f` | feat   | vue/data-display — port table/tree/list/virtual domain (composables + 5 complex components) |
| `0507750` | feat   | vue/visualization — port charts/diagram/dashboard/gantt/timeline/resource-calendar + print utility |
| `b20dddc` | test   | vue — styling-contract.parity (≈725 строк, 30+ component snapshots vs React) + 21 строка doc-exceptions |

Фаза 2 — side-quests (UX полишинг + demo expansion + audit + deploy):

| sha7 | scope | summary |
|------|-------|---------|
| `9d45ab8` | audit  | architecture drift check (core + styles, 9 findings) |
| `dfd02d0` | style  | diagram visual polish + 149 строк новых семантических токенов |
| `54fdd2f` | style  | charts visual polish (tooltip / crosshair / brush refinement) |
| `5f03284` | style  | dashboard visual polish + editor mode affordances |
| `47c8ff1` | refac  | showcases dedup — project-tracker → crm, analytics → dashboard (14 → 12) |
| `b2a2cfc` | style  | viz secondary polish — gantt/timeline/resource-calendar/event-timeline |
| `302e241` | feat   | showcases modernize to round-11+12 features |
| `bfc1505` | feat   | demo-vue — ant-style shell + 22 component pages |
| `b7fc719` | feat   | demo — benchmarks page (vs antd/rhf/recharts), 1713 строк |
| `687afde` | feat   | react-side — showcases dedup+modernize + benchmarks page wiring |
| `11e2c2e` | chore  | demo SEO + FrameworkSwitcher + docs + Docker deploy scaffold |
| `907d89d` | feat   | demo — перенести LanguageSwitcher из футера в хедер |
| (this commit) | docs   | round-13 sync — TODO/CHANGELOG/README/ARCHITECTURE/multi-framework |

Round 12 — 1 single-commit + docs sync:

| sha7 | scope | summary |
|------|-------|---------|
| `13a695e` | infra | extract `@skygraph/styles` package + tsconfig.lib bump ES2022 |
| `b1f6cc8` | docs  | round-12 sync — TODO/CHANGELOG/README backfill + sha7 |

Round 11 — 15 коммитов в две волны:

Волна 1 — фичи + i18n batch:

| sha7 | scope | summary |
|------|-------|---------|
| `b655c4a` | i18n  | page-level ComponentDoc — form controls (10 страниц) |
| `158da10` | feat  | print pipeline (printElement + ref.print() на Table/Diagram/Charts) |
| `ceea720` | i18n  | page-level ComponentDoc — data display (10 страниц) |
| `0d10478` | i18n  | Diagram + Gantt + EventTimeline + StylingShowcasePage |
| `9008db1` | i18n  | page-level ComponentDoc — form helpers (10 страниц) |
| `111dfe8` | feat  | visual SchemaFormEditor (palette + canvas + inspector + undo/redo) |
| `f9b7af2` | feat  | ResourceCalendar engine + React component + conflict detection |
| `4b71626` | i18n  | Breadcrumb + Tabs + подключение SchemaFormEditorDemo в App |
| `668c45b` | fix   | Tree virtualization padding-based inserts (вместо absolute) |

Волна 2 — параллельные табы UX-полишинг + demo expansion:

| sha7 | scope | summary |
|------|-------|---------|
| `8e7b8ad` | tab F | Charts demo expansion (11 demos: axes/legend/animations/crosshair/brush/stacked/realtime/hover/context/responsive) |
| `9289acc` | demo  | Table demo (5 pro-feature: AdvancedFilters/Grouping/VirtualDynamic/LargeDataset/Realtime) |
| `ef617a6` | tab B | Diagram UX (context menu + hover actions + multi-select/lasso + 10 demos, +14 тестов) |
| `6bad1f9` | tab A | Charts UX (responsive useChartSize + ChartHoverToolbar + chartExport + chartContextMenu, +28 тестов) |
| `6e0c15f` | tab D | Dashboard UX (widget hover actions + context menu + 6 demos, +12 тестов) |
| `cee9b9a` | fix   | Charts/types.ts duplicate imports (parallel-merge артефакт) |
