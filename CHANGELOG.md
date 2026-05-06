# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Round 9.1 — closeout sweep (ESLint type-aware roots, Slider/Rate fixes, doc i18n primer)

After all four round-9 tabs (A/B/C/D) and the i18n batches landed, a small
follow-up sweep was needed:

#### Infra — ESLint type-aware lint roots

- `eslint.config.js`, `examples-eslint.config.js`,
  `examples/demo/eslint.config.js` — switched to `defineConfig` from
  `eslint/config` and pinned `parserOptions.tsconfigRootDir` +
  `project: './tsconfig.json'` (or `./tsconfig.app.json` for the demo
  apps) per package / per app. Without this the parser auto-detected
  the closest `tsconfig.json` and got confused between the repo root
  and `examples/*/`.
- Added `**/vitest.config.ts` and `**/tsup.config.ts` to the root
  `ignores` list — those files live next to `package.json`, not under
  `src/`, so type-aware parsing was failing on them.
- Result: `pnpm exec eslint packages/` is 0 errors, `pnpm lint:examples`
  is 0 errors / 27 warnings (the warnings are the relaxed
  `no-console` and intentionally-unused vars in demo code).

#### UI fixes

- **`Slider`** — `.sg-slider` now declares `box-sizing: border-box`,
  `width: 100%` and `min-inline-size: var(--sg-slider-min-inline-size)`
  (default `calc(8 * var(--sg-font-size))`); the inner
  `.sg-slider-track` also gets `width: 100%`. Without these the rail
  collapsed to its intrinsic width inside flex/grid containers. New
  component-local CSS variable `--sg-slider-min-inline-size`
  documented in `SliderDemo.tsx`. The `slider/TokensOverride.demo.tsx`
  no longer caps the wrapper to 360px so the new responsive width is
  visible by default.
- **`Rate`** — `.sg-rate` now declares
  `--sg-rate-symbol-empty-opacity: 0.42` (component-local). Inactive
  `.sg-rate-star` applies `opacity: var(...)` and
  `.sg-rate-star-full` resets it to `1`. Rationale: when `character`
  is a colour emoji (e.g. ❤️), CSS `color` has no visual effect; the
  opacity signal is the only way to distinguish active from inactive.
  Override to `1` for monochrome glyphs to get the previous flat look.

#### Demo polish

- **`ButtonDemo`** — first ComponentDoc page migrated off English
  hardcode. New `examples/demo/src/demos/button-doc/{en,ru}.ts` declare
  the `ButtonDocStrings` shape, new hook `useButtonDocStrings.ts`
  returns the active-locale dictionary. `buttonProps` and
  `buttonCssVars` are derived via `useMemo` from the hook. Sets the
  pattern for the remaining ComponentDoc pages.
- **Form** — new `form/DistributedComposition.demo.tsx` showing three
  nested components composing one form (root holds `<Form>`, middle
  adds section chrome, leaf only registers `<Field>` nodes — same
  store throughout, no value prop-drilling). Mounted into `FormDemo`
  after `NestedFieldsForm`. New `.demo-distributed-panel*` and
  `.demo-form-grid-2` classes in `form/styles.css` (token-only).

### Tab D round 9 — core subpaths + examples-eslint + slow-tests bench + audit drift CI

Note: Tab D round 9 commit (`a5c72b7`) landed before round 9.1 and
already documented elsewhere in this file. Summary for completeness:

- `@skygraph/core/{table,tree,virtual,graph}` subpaths advertised in
  `tsup.config.ts` + `package.json#exports`. New
  `subpath-exports.test.ts` (9 tests) guards each barrel's factory +
  helpers can be imported and instantiated.
- `examples-eslint.config.js` companion with `react-hooks/exhaustive-deps`
  → warn, `no-console` → warn, `no-unused-vars` → warn-with-`_`-ignore.
  New `pnpm lint:examples` script.
- `table.test.ts > scalability > 100k rows` (~7s on dev hw) gated behind
  `describe.runIf(process.env.RUN_BENCH === '1')`. Default
  `pnpm --filter @skygraph/core test` now runs in ~2s. New
  `pnpm --filter @skygraph/core test:bench` via `cross-env`.
- `pnpm audit:styles` regenerated; magical-color cleanup in `form.css`
  (three `var(--sg-color-error, #ff4d4f)` fallbacks dropped).
- `.github/workflows/ci.yml` — `audit:styles drift check` step (fails
  if `_audit/styling-audit.md` is stale) + opt-in coverage step
  (`continue-on-error: true`, node 22 matrix slot only).

### i18n batches — per-demo `useDemoStrings` migration

Two commits landed during round 9 to start migrating the ~480 demo
`Variant.demo.tsx` files off the English hardcode using the
`useDemoStrings` helper (added in round 8.1):

- `009747f` — first batch, ~37 demos across `autocomplete/`, `badge/`,
  `breadcrumb/`, `button/`, `radio/`, `tag/` plus the legacy
  `TableDemo.tsx` / `TreeSelectDemo.tsx`.
- `e38a678` — second batch covering `dropdown/`, `select/`, `switch/`,
  `segmented/`, `rate/`.
- Round 9.1 ButtonDemo migration (above) extends the same pattern to
  the page-level ComponentDoc strings (props/cssVars descriptions),
  not just the in-demo English copy.

Roughly 60–70 demos out of ~480 are now bilingual. The remaining bulk
is mechanical and can be migrated incrementally without coordination
(each demo is self-contained — copy its `STRINGS` block alongside the
component code).

### Tab B round 9 — TableEngine virtual rows + Charts brushing

#### VirtualEngine — динамическая высота строк

- **`packages/core/src/engines/virtual/measure.ts`** — новый модуль `MeasureCache` с `Map<index, number>` поверх эстимейта. Префикс-сумма offsets пересобирается лениво при первом запросе после инвалидации. API: `setMeasuredHeight`, `clearMeasured`, `reset`, `getItemSize`, `getItemOffset`, `getItemAtOffset`, `getTotalHeight`, `subscribe`. События — `'measure' | 'reset' | 'resize'`.
- **`VirtualEngine`** расширен: `setMeasuredHeight(index, height)`, `clearMeasuredHeight(index)`, `resetMeasurements()`, `hasMeasured(index)`, `getEstimatedSize(index)`, `getItemSize(index)`, `subscribe(listener)`, `measuredCount`. Кэш создаётся лениво — пока никто не записал измерение, сохраняем O(1) арифметику для миллионов строк (тест на 1M items < 5ms по-прежнему проходит).
- **`createMeasureCache`** экспортируется наружу через `@skygraph/core` и `@skygraph/react`.
- **`TableEngine.getEstimatedRowHeight(id)`** + `TableOptions.estimateRowHeight: (row, id) => number` — пробрасывает callback в core, чтобы React-адаптер мог инициализировать движок без дублирования сигнатуры.

#### React — VirtualTableBody с ResizeObserver

- **`<Table virtual={{ rowHeight: 40 | (row, id) => h, estimateRowHeight?: (row, id) => h, overscan?, height? }}>`** — теперь принимает функцию для высоты. Динамика включается, если хоть один из `rowHeight` / `estimateRowHeight` — функция.
- **`VirtualTableBody`** переехал на `createVirtual()` под капотом. Скролл-listener + `ResizeObserver` на родительском `.sg-table-scroll`; на каждой видимой строке — RO на первой ячейке (CSS Grid: высота ячейки == высота строки), которая через `data-sg-virtual-row-index` репортит размер обратно в движок. `subscribe` поднимает re-render. В средах без `ResizeObserver` (jsdom без полифилла) — фоллбэк на одноразовое измерение через `getBoundingClientRect`.
- **`TableBody`** теперь принимает `rowIndexOffset?: number` и пишет `data-sg-virtual-row-index` на row-контейнер. Атрибут отсутствует, если виртуализация не активна.

#### Charts — brushing

- **`<ChartBrush>`** (`packages/react/src/components/complex/Charts/ChartBrush.tsx`) — общий overlay для drag-выбора диапазона по X. Полностью на React pointer events + `setPointerCapture`, без window-listeners. Двойной клик по overlay → reset (`onRangeChange(null)`). API: `plotX/Y/W/H`, `categoryCount`, `range`, `onRangeChange`, `unstyled?`, `fill?`, `disabled?`. Selection-rect — `pointer-events: none`, чтобы не блокировать pointerdown на overlay.
- **`brush?: boolean | ChartBrushConfig`** — добавлен в `LineChart`, `BarChart`, `AreaChart`. Конфиг поддерживает controlled (`range`) и uncontrolled (`defaultRange`) режимы, плюс `onRangeChange`, `fill`, `disabled`. `resolveBrushConfig` нормализует `boolean | object | undefined`.
- **`ChartBrush` + `resolveBrushConfig`** + типы `ChartBrushProps`, `ChartBrushConfig`, `ChartBrushRange` экспортируются из `@skygraph/react`.
- **`packages/react/styles/components/charts.css`** — секция `.sg-chart-brush*` (overlay, selection). Цвета остаются inline через токены, чтобы re-theme работал без правки CSS.

#### Round totals

- **+30 тестов:** core `virtual.test.ts` (+11, dynamic measured heights / measure cache invariants / subscribe events), react `table-virtual.test.tsx` (+10, новый файл — virtual={true} regression, dynamic height callback, controlled vs uncontrolled, ResizeObserver fallback), react `charts.test.tsx` (+9, brush block — drag/release, controlled range, double-click reset, disabled, BarChart/AreaChart parity).
- TypeScript на `packages/core` чисто, ESLint `packages/core packages/react` — 0 errors / 0 warnings, `check:styles` (tokens + no-important) — OK.

> Известный pre-existing TS-error в `packages/react/src/components/complex/Table/useTableState.ts:163` (`expandable?.defaultExpandedRowKeys` — поле отсутствует в `ExpandableConfig`) пришёл из round-8.1 / round-2 и не относится к этому стриму. Закроется чистым 1-line патчем в `ExpandableConfig` в следующем спринте.

### Tab A round 9 — Gantt + EventTimeline (new complex components)

#### Components

- **`Gantt`** (`packages/react/src/components/complex/Gantt/`) — task-as-bar chart over a discrete time axis. Props: `tasks`, `resources?`, `scale?: 'day' | 'week' | 'month' | 'quarter'`, `range?`, `rowHeight?`, `columnWidth?`, `sidebarWidth?`, `draggable?`, `resizable?`, `onTaskChange?`, `unstyled?`. Tasks may declare `progress`, `parentId`, `dependencies`, `resourceId`, `color`. CSS-grid sidebar + scrollable timeline grid. Header ticks generated from `range` × `scale`. Default range is derived from `min(start)` / `max(end)` with one `scale`-step of padding.
- **`EventTimeline`** (`packages/react/src/components/complex/Timeline/`) — chronological event stream. Props: `events`, `orientation?: 'horizontal' | 'vertical'`, `groupBy?: 'day' | 'month' | 'year'`, `renderMarker?`, `renderEvent?`, `unstyled?`. Events sorted by date; optional dividers per UTC bucket. Distinct from the simpler step-based `Timeline` in `components/ui/Timeline.tsx` (which stays as-is, used by 7+ demos and showcases) — this one is for date-anchored items where each entry has a `Date`.

#### Drag / resize

- **`Gantt draggable`** — left-click on a bar moves it horizontally; pixel delta divided by `columnWidth`, rounded to whole `scale` steps, applied to both `start` and `end`. `onTaskChange` fires once per snap step (no callbacks while the pointer stays inside the same cell).
- **`Gantt resizable`** — drag the right edge of a bar to extend `end`; `start` is preserved. End is clamped to `start + step` minimum.

#### Dependencies

- **Dependency arrows** — for every `task.dependencies` entry, an SVG path is routed from the upstream task's right edge to the dependent task's left edge using `routeOrthogonal(...)` from `@skygraph/core`. Arrowheads via SVG `<marker>`, color via `currentColor` on `.sg-gantt-deps`.

#### Resources

- **Resource lanes** — when `resources` is provided, every row in the chart corresponds to one resource and tasks are placed in the row matching their `resourceId`. Without `resources`, every task gets its own row in declaration order.

#### Tests

- **+38 tests** (target was +25): `gantt.test.tsx` (21 cases — render / scale switching / drag-move / resize-end / dependency arrows / resource lane placement) and `timeline.test.tsx` (17 cases — render / orientation / sort / groupBy day-month-year / unstyled / `renderMarker` + `renderEvent` overrides). Total: **523** active tests in `@skygraph/react` (+ pre-existing core tests).

#### Styles

- `packages/react/styles/components/gantt.css` (new) — `.sg-gantt`, `.sg-gantt-sidebar*`, `.sg-gantt-header`, `.sg-gantt-tick`, `.sg-gantt-grid`, `.sg-gantt-row`, `.sg-gantt-bar*`, `.sg-gantt-deps`, `.sg-gantt-dep`. Token-only.
- `packages/react/styles/components/event-timeline.css` (new) — `.sg-event-timeline`, `.sg-event-timeline-vertical/-horizontal`, `.sg-event-timeline-group`, `.sg-event-timeline-item`, `.sg-event-timeline-marker`, `.sg-event-timeline-dot`, `.sg-event-timeline-content`, `.sg-event-timeline-title`, `.sg-event-timeline-description`. Token-only.
- `packages/react/styles/index.css` — two new `@import` lines.

#### Demos

- `examples/demo/src/demos/Gantt/Basic.demo.tsx` — three resource lanes with progress, color and an arrow chain `spec → mocks → core → qa-pass`. Drag + resize both enabled.
- `examples/demo/src/demos/Gantt/Scale.demo.tsx` — runtime scale switcher (`day` / `week` / `month` / `quarter`) over a 9-month plan.
- `examples/demo/src/demos/timeline/Events.demo.tsx` — vertical event stream grouped by month.
- `examples/demo/src/demos/timeline/Horizontal.demo.tsx` — horizontal release timeline with custom card body via `renderEvent`.

#### Public API

- `@skygraph/react` exports: `Gantt`, `GanttProps`, `GanttTask`, `GanttResource`, `GanttScale`, `GanttRange`, `EventTimeline`, `EventTimelineProps`, `TimelineEvent`, `TimelineOrientation`, `TimelineGroupBy`. Existing `Timeline` (step-based) remains exported from `components/ui/Timeline` unchanged.

### Tab C round 9 — a11y axe coverage + deprecated cleanup

#### a11y (closes 2 `it.todo` from round 2)

- **`ColorPicker`** — trigger is now a `<button type="button">` (was a `<div tabIndex=0>` with `aria-haspopup` / `aria-expanded`, which axe flagged as `aria-allowed-attr` critical). New props `aria-label` / `aria-labelledby` are forwarded to the trigger so the control gets a programmatic name (axe `button-name`).
- **`TimePicker`** — accepts `aria-label` / `aria-labelledby`, forwarded to the `role="combobox"` element. Closes axe `aria-input-field-name` (serious) — the styled trigger is not a form element so a wrapping `<label>` cannot associate.
- **`a11y-axe.test.tsx`** — both round-2 `it.todo` placeholders replaced with active assertions: `ColorPicker` (closed) × `aria-label` / `aria-labelledby`, `TimePicker` (closed) × `aria-label` / `aria-labelledby`. Added `Cascader (open)` (panel mounted on click) and `VirtualList` (generic scroll container with custom `renderItem`) cases.
- CSS: `.sg-colorpicker-trigger` now resets `color`, `font` and styles `:disabled`; `.sg-colorpicker-trigger` markup change from `<div>` to `<button>` keeps the same selector / focus-visible behaviour.

#### Deprecated UI removal

- **`packages/react/src/components/ui/TreeSelect.tsx`** deleted. The complex (`@skygraph/core`-backed) `TreeSelect` is the only export from `@skygraph/react`.
- **`packages/react/src/components/ui/Transfer.tsx`** deleted. The complex `Transfer` (pagination, sortable, locale, footer) is the only export.
- **`packages/react/src/index.ts`** — removed `TreeSelectNode` re-export (`@deprecated` since round 6) and the legacy comment blocks.
- **`packages/react/styles/components/treeselect.css`** — removed `~110` lines of dead CSS that backed the flat ui/TreeSelect rows (`.sg-treeselect-tree`, `.sg-treeselect-node*`, `.sg-treeselect-switcher*`, `.sg-treeselect-title`, `.sg-treeselect-checkbox`, `.sg-treeselect-search` wrapper). The complex variant uses the embedded `<Tree>` and reuses `.sg-tree-*` selectors.
- **`__tests__/new-components.test.tsx`** rewritten: 5 `Transfer` + 5 `TreeSelect` cases now use the complex API. Test count preserved (20 cases in the file). API differences captured in inline notes (`targetKeys` is required for `Transfer`; default `placeholder` for `TreeSelect` is `'Please select'`; `onChange(value, labels, extra)`).
- **`examples/demo/src/demos/TreeSelectDemo.tsx`** — props table updated from `TreeSelectNode` to `TreeNodeData`, `value` type from `string | string[]` to `TreeKey | TreeKey[]`, default placeholder `'Select...'` → `'Please select'`. The demo `treeselect/*.demo.tsx` files already used the complex API.
- **`docs/conventions.md`** — new section *ui/ vs complex/* documents the split and the removed shims.

#### Notes

- No SemVer bump implied: both files were marked `@deprecated` since round 6 and the public exports already pointed at the complex implementations. The `TreeSelectNode` type alias is the only removed export; consumers move to `TreeNodeData` from `@skygraph/core` (re-exported by `@skygraph/react`).

### Added — parallel-tabs round 2 (Tab A / B / C / D) + regression sweep

#### Tab A round 2 — Showcases decomposition

- **`forms/FormsApp.tsx` (1131 lines)** split into `BasicTab`, `ValidationTab`, `LayoutsTab`, `DynamicTab`, `SchemaTab` + shared `styles.ts`. Top-level component is a thin tab container.
- **`ecommerce/EcommerceApp.tsx` (1080 lines)** split into `ProductsTab`, `OrdersTab`, `CustomersTab`, `InventoryTab`, `AnalyticsTab`.
- **`table-kitchen-sink/TableKitchenSinkApp.tsx` (814 lines)** split into `BasicTab`, `SortingFilteringTab`, `EditingTab`, `VirtualTab`, `PinnedTab`, `GroupedTab` + `common.tsx`.
- **`crm/CrmApp.tsx` (545 lines)** split into `LeadsTab`, `DealsTab` (joining the existing `ContactsTab`, `ActivityTab`, `PipelineTab`).

#### Tab B round 2 — GraphEngine pro

- **`routeOrthogonal(start, end, options)`** now accepts `options.obstacles?: AABB[]`. A* over a 5px grid avoids obstacle bounds; falls back to the simple L-route when no path is found within `options.maxNodes` (default 5000).
- **OBB (oriented bounding box)** — new module `engines/graph/obb.ts`. `getNodeOBB(id)`, `aabbFromOBB(obb)`, `obbCorners(obb)`, `obbContainsPoint(obb, p)`. Used by `Diagram` for hit-testing rotated nodes and by routing to derive obstacle AABBs.
- **`<Diagram zoomable pannable>`** — Ctrl+wheel zooms (clamped 0.1× — 5×), middle-mouse-button drag pans. The internal `.sg-diagram-canvas` carries the SVG transform so nodes and edges move as one.
- **`<Diagram snapToGrid={N}>`** — drag positions round to the nearest multiple of `N`. CSS hook `.sg-diagram-grid` shows the corresponding grid pattern; the step is exposed via the `--sg-grid-size` component-local CSS variable.
- Refactor: routing helpers moved out of `GraphEngine.ts` into `engines/graph/router.ts`. History helpers extracted into `engines/graph/history.ts`. No public-API changes.

#### Tab C round 2 — TableEngine pro

- **Advanced filters** — new `filter.ts` module. `AdvancedFilter = { op, value }` with operators `eq | neq | lt | lte | gt | gte | between | in | notIn | contains | startsWith | endsWith | isEmpty | isNotEmpty`. `TableEngine.setColumnFilter(key, filter)` accepts both legacy plain values and the new `AdvancedFilter` shape. UI: `<FilterDropdown mode="advanced">` with operator picker.
- **Row grouping + aggregations** — `TableEngine.groupBy(field)`, `getGroups()`. Columns may declare `aggregate: 'sum' | 'avg' | 'min' | 'max' | 'count' | (values, rows) => ReactNode`. New `<TableGroupRow>` component renders the group header with expand / collapse and aggregate cells.

#### Tab D round 2 — Charts pro + a11y

- **Chart animations** — `animate?: boolean | { duration?: number }` on `LineChart`, `BarChart`, `AreaChart`, `PieChart`. Pure-CSS `@keyframes` (no rAF loops). Picks up `--sg-chart-anim-duration` (default 600ms). Honours `prefers-reduced-motion: reduce` (no animation, no transform).
- **Interactive crosshair** — `<LineChart crosshair />` activates `<ChartCrosshair>`: vertical hover line + per-series value labels at the nearest data X. Pointer-events on a transparent overlay rect.
- **`Select` accessible name** — `aria-label?` and `aria-labelledby?` props in `SelectPropsBase` are now forwarded to the `role="combobox"` element. Fixes the styled-Select axe gap; `it.todo` was removed and replaced with an active assertion.
- **`Tree.handleKeyDown`** — `scrollToFocused` and `isNodeEditable` now wrapped in `useCallback`, full deps in the `useCallback` array.
- **`DatePicker.tsx`** — removed unused `eslint-disable` directive.
- **`packages/core` and `packages/react`** — public `index.ts` updated to re-export new types: `OBB`, `RouteOrthogonalOptions`, `AdvancedFilter`, `FilterOperator`, `AggregateFn`, `ColumnAggregate`, `TableGroup`, chart `ChartAnimation`, `ChartCrosshairProps`, `DashboardEditor` (carry-over).

#### Round 8.1 — regression sweep after the round 2 commits

- Local CSS variables `--sg-grid-size` (in `.sg-diagram`) and `--sg-chart-anim-duration` (in `.sg-chart`) declared with defaults so `var()` always resolves. Required by `check:tokens`.
- `MEDIA_ALLOWLIST` in `scripts/check-no-important.mjs` extended for `prefers-reduced-motion` blocks in `charts.css`. Same a11y pattern as `@media print` in `table.css`.
- `useTableState.ts` — `persistColumnWidth` now actually invoked from `handleResizeStart.onUp`. Fixes the `tsc --noEmit` "declared but never read" error introduced by Tab C round 1.
- Lint cleanup: `prefer-const` errors in `diagram.test.tsx`, `react-hooks/exhaustive-deps` warnings in `Table/Table.tsx` (`rowNumConfig` → `useMemo`) and `useFieldArray.ts` (`genKey` in deps). `eslint packages/` is now 0 errors / 0 warnings.

#### Round totals

- **+84 tests** in round 2: TableEngine advanced-filter operators (+24), grouping/aggregates (+10), GraphEngine OBB / routing-with-obstacles (+12), Charts crosshair / animations / axes (+8), Diagram zoom/pan/snap/grid (+8), `a11y-axe` Carousel/Cascader/Mentions/Rate/ColorPicker/TimePicker partial (+8 with 2 todo), plus showcase decomposition test fixes. **779** active (332 core + 447 react) + 2 todo.
- `tsc --noEmit` — clean (was 1 error in `useTableState.ts` after round 1).
- `eslint packages/` — 0 errors, 0 warnings.
- `check:tokens` — 91 tokens, 64 files.
- `check:no-important` — 65 files OK.

### Added — parallel-tabs round 1 (Tab A / B / C / D)

#### Tab A — UI props finalization

- **`Button.danger`** — destructive variant. Combines with `type` (e.g. `danger primary` → solid red, `danger text` → red link). Adds `sg-button-danger` modifier.
- **`Button.block`** — stretches the button to its container width (`sg-button-block`).
- **`Input.readOnly`** — explicit read-only mode with HTML `readonly` + `aria-readonly`. Distinct from `disabled` (focusable, copyable). New `sg-input-readonly` modifier.
- **`Select.multiple`** — multi-select mode. `value: (string | number)[]`, `onChange: (vals: (string | number)[]) => void`, chips inside the trigger, dropdown stays open while picking.

#### Tab B — Charts axes + Dashboard.Editor

- **Charts axes (X / Y)** — opt-in `xAxis` / `yAxis` props on `LineChart`, `BarChart`, `AreaChart`. Configurable: `tickCount`, `tickFormatter`, `label`, `gridLines`. New shared `<ChartAxes>` SVG component renders ticks + labels + gridlines inside the plot area. Off by default (backward-compat).
- **`<DashboardEditor>`** — editable Dashboard with drag (header) and resize (corner handle) for widgets. `onLayoutChange(widgets)` fires on drop. Snaps to the column / row grid. CSS hooks: `sg-dashboard-editor`, `sg-dashboard-widget-dragging`, `sg-dashboard-widget-resizing`.

#### Tab C — Engine history & persistence

- **`GraphEngine.undo / redo / canUndo / canRedo / pushHistory(label?)`** — full mutation history (add / remove / move / setParent / addEdge / removeEdge). New `transaction(fn)` groups multiple mutations into one history entry. History capped at 100 entries.
- **`TableEngine.setColumnWidth(key, width)` + `getColumnWidth(key)`** — column-width persistence in the Core store under `$table.<id>.state.columnWidths`. React `useTable()` exposes `columnWidths` (reactive `Record`) and `setColumnWidth`. `Table` resize handles automatically read / write this state, so resized widths survive page reloads when the store is persisted.

#### Tab D — Infra + a11y + locale unification

- **Automated a11y smoke tests** — `packages/react/src/__tests__/a11y-axe.test.tsx`. Covers Button, Input, Checkbox, Switch, RadioGroup, Select(unstyled), Modal, Tabs via `axe-core`. Color-contrast / region-only rules disabled in jsdom. 8 passing + 1 `it.todo` for the styled `Select` aria-name gap (tracked in TODO).
- **`@vitest/coverage-v8`** dev-dep installed in `@skygraph/core` and `@skygraph/react`. `pnpm -F @skygraph/core test:coverage` and the react equivalent now run end-to-end.
- **`@axe-core/react` + `axe-core`** dev-deps in `@skygraph/react`.
- **`pnpm-workspace.yaml`** extended with `examples/*`. `examples/demo` and `examples/showcases` now use `@skygraph/core: workspace:*` and `@skygraph/react: workspace:*` (was `file:../../packages/...`).
- **Lockfile cleanup** — deleted `examples/demo/package-lock.json` and `examples/showcases/package-lock.json`. Only `pnpm-lock.yaml` remains.
- **`TableLocale` unified** — single canonical declaration in `packages/react/src/types/locale.ts`. The `complex/Table/types.ts` declaration is now a re-export of the same type. Both import paths still work; previous duplicate-with-different-keys split is gone.

#### Round totals (round 1)

- **+78 tests** across all four tabs in round 1: Tab A `ui-extended.test.tsx` (+30), Tab B `charts.test.tsx` axes (+10) and `dashboard.test.tsx` editor (+10), Tab C `graph.test.ts` undo/redo (+10) and `table.test.ts` widths (+5), Tab D `a11y-axe.test.tsx` (+8 + 1 todo) plus smaller additions in `diagram.test.tsx`. Total at end of round 1: **695** active (288 core + 407 react) + 1 todo.

### Added — earlier this cycle (pre-tabs)

- **Dashboard component** — minimal CSS-grid widget layout. `<Dashboard widgets={...} columns={12} rowHeight={80} gap={16}>`. Each widget pins to `(x, y, w, h)` cells; supports `title`, `children`/`render`, `unstyled`. (Tab B added the editable counterpart, see above.) +9 tests, demo with Charts integration.
- **Diagram draggable nodes** — `<Diagram draggable />` enables click-and-drag to move nodes (calls `graph.moveNode`). Pass a function for custom drag handlers. CSS hooks: `sg-diagram-node-draggable`, `:hover` raises shadow, `:active` switches cursor to grabbing.
- **Charts native tooltips** — `<title>` elements on Line markers, Bar rects, Pie slices. Tooltip text: `"<series> · <category>: <value>"` (Pie: `"<label>: <value>"`).
- **`useTable` pinning hook** — exposes `pinColumn(column, side)`, `clearPinned()`, and `pinnedColumns: { left, right }` state from `useTable()`. Reactive bridge over the `TableEngine.pinColumn` API.
- **GraphEngine orthogonal routing** — new `routeOrthogonal(start, end)` and `pointsToPath(points)` helpers exported from `@skygraph/core`. `<Diagram>` now renders edges differently based on `edge.routing` (`'straight' | 'orthogonal' | 'manual'`); manual mode uses the edge's `waypoints`.
- **TableEngine column pinning** — `pinColumn(column, side)`, `getPinnedColumns()`, `clearPinned()`. State mirrored into the Core store under `$table.<id>.state.pinnedLeft|pinnedRight`.
- **Diagram component** + **useGraph** hook in `@skygraph/react` — visual layer for `GraphEngine` (DOM nodes + SVG-overlay edges, custom renderNode, outline-kind modifier classes).
- **GraphEngine.subscribe(cb)** — public engine-level subscription used by the React adapter to avoid path-prefix lookups.
- **AreaChart** — stacked / non-stacked SVG area chart with strokeWidth + fillOpacity props.
- **PieChart** — pie / donut chart (innerRadius), clockwise from 12 o'clock, `<title>` for accessibility, palette color resolution.
- **ChartLegend** — shared component, opt-in via `legend` prop on Line/Bar/Area charts.
- **+65 tests** in this round: GraphEngine edge cases (+15), Diagram + useGraph integration (+11), Charts incl. Area/Pie/legend (+26), a11y hooks (+13). Total now **584** (254 + 330).
- Localized in demo (en/ru): App shell, system components (PropsTable, CssVarsTable, DemoBox, ComponentDoc), and 4 *Page.tsx (GettingStarted, Theming, CoreApi, **DesignTokens**).
- `docs/conventions.md` updated: modern demo pattern (DemoBox + raw imports), i18n schema, stream artifacts, commit prefixes.

### Changed

- `audit-styles.mjs` — detects template-literal classes (`` `sg-X-${var}` ``) and excludes them from the dead-code count. Result: 201 → **53** possibly-dead classes (3.8x more accurate).
- `useGraph` snapshot caching via `useRef` + `graph.subscribe()` — fixes infinite-loop with `useSyncExternalStore`.
- `charts.css` — replaced unknown `var(--sg-font-family, inherit)` with plain `inherit`.

### Changed

- `useGraph` now caches snapshot via `useRef` and subscribes through the new `graph.subscribe()` API — fixes infinite-loop issue with `useSyncExternalStore`.
- `charts.css` — replaced unknown `var(--sg-font-family, inherit)` with plain `inherit` (token wasn't declared in `tokens.css`, broke `check:tokens`).

## [0.4.0] - 2026-05-01

### Added — GraphEngine (diagram domain engine)

- `@skygraph/core` — **GraphEngine** as the fourth member of the `form / table / tree / graph` family. Models a directed graph with parent-child hierarchy, outline-based geometry (rect / ellipse / polygon / flattened path), stable anchor IDs, and AABB bounds. Operations: `addNode`, `removeNode`, `updateNode`, `moveNode`, `setParent`, `addEdge`, `removeEdge`. State mirror under `$graph.snapshot.<engineId>`.
- `@skygraph/core` — `GRAPH_PREFIX = '$graph.'` reserved in `engines/namespaces.ts`.
- `@skygraph/react` — `useGraph()` hook + `<Diagram>` component (DOM nodes + SVG-overlay edges) for visualising a `GraphEngine`.
- `@skygraph/react/styles/components/diagram.css` — default styling for `Diagram` (token-only, dark-theme aware).
- 22 new unit tests for `GraphEngine` (now **497 → 519** total tests across both packages).

### Changed — public API consolidations

- `TreeSelect` main export now points to `components/complex/TreeSelect` (uses `@skygraph/core` types `TreeNodeData` / `TreeKey` / `TreeFieldNames`). The legacy `components/ui/TreeSelect` is still on disk for tests; type alias `TreeSelectNode` is kept as `@deprecated` for migration.
- `Transfer` main export now points to `components/complex/Transfer` (richer surface — pagination, sortable, locale, footer, operations, custom search).
- `Calendar` main export now comes directly from `components/complex/Calendar` (the `components/ui/Calendar.tsx` re-export shim was removed — it violated the "ui has no core" boundary).
- `package.json` — removed legacy npm `workspaces` field (pnpm workspace already declared in `pnpm-workspace.yaml`).
- `package-lock.json` — removed; only `pnpm-lock.yaml` remains. Both `package-lock.json` and `yarn.lock` added to `.gitignore`.

### Fixed

- `SchemaForm.tsx` — `useConfig()` was being called conditionally, violating `react-hooks/rules-of-hooks`. Hoisted to top of the function.
- `SchemaForm.tsx` — submit button used `sg-btn sg-btn-primary` which had no styles (CSS only declares `sg-button-*`). Changed to `sg-button sg-button-primary`.
- `TagInput.tsx` — replaced `let next = [...tags]` with `const` (`prefer-const`).
- Demo: `PropDef` now accepts `required?: boolean` (was missing, caused TS errors in CollapseDemo / ProgressDemo / ResultDemo).
- Demo: `treeselect/*.demo.tsx` migrated from `TreeSelectNode` to `TreeNodeData` after the public API change.
- Demo: `Bordered.demo.tsx` row ids switched from `number` to `string` to match Table's contract.
- Demo: `transfer/CustomRender.demo.tsx` — `listStyle` prop dropped (not on the new complex `Transfer`); replaced with `listHeight`.

### Tooling

- `scripts/audit-styles.mjs` — added allowlist for runtime-generated transition classes (`sg-fade-*`, `sg-slide-*`, `sg-zoom-*`, `sg-collapse-*`). Reduces "possibly dead" CSS class count by 41 false positives.
- `eslint.config.js` — clarified the rationale for ignoring `examples/` (oversized demo set) and pointed at a targeted `npx eslint examples/...` workflow.
- `themes/default.css` and `themes/dark.css` — clarified in JSDoc that both are convenience re-exports of the full `tokens.css`; theme activation is via `data-sg-theme` attribute, not via importing one or the other.
- `STREAM-PLAN.md` v1 — terminology corrected: "stream" = entire continuous turn, "task" = individual unit of work (was conflated in v0).

### Added — Public styling contract established

- [`docs/styling-contract.md`](docs/styling-contract.md) — публичный стилевой контракт: стабильные токены, корневые классы `.sg-*`, перечень слотов, `classNames` / `styles` API, политика версий.
- [`docs/styling-recipes.md`](docs/styling-recipes.md) — практические рецепты для пользователя: бренд, тёмная тема, стилизация одной таблицы, условный цвет строк/ячеек, `unstyled`.
- `classNames` / `styles` API (слоты) для `Table` и `List`. Ключи слотов перечислены в `styling-contract.md` §4.
- `TableColumn.headerClassName` — паритет с `cellClassName`.
- Общие утилиты `SlotClassNames` / `SlotStyles` / `slotClass` / `slotStyle` в `@skygraph/react` для будущих компонентов.
- CI: `scripts/check-tokens.mjs` — проверка, что все `var(--sg-*)` задекларированы в `tokens.css` или локально в компонентной CSS.
- CI: `scripts/check-no-important.mjs` — запрет `!important` в компонентных CSS (с явным allowlist для accessibility и print).
- CI: `scripts/audit-styles.mjs` — разовый аудит `var(--sg-*)`, `.sg-*` классов и «магических» hex-цветов.
- Npm-скрипты `audit:styles`, `check:tokens`, `check:no-important`, `check:styles`; `check:styles` подключён в GitHub Actions.

### Changed

- Нормализованы токены в `mentions.css`, `spin.css`, `input.css`, `table.css`, `tree.css` — убраны «чужие» имена, все ссылки идут через `tokens.css` или локальные `--sg-<component>-*`.
- Убраны все `!important` из компонентных CSS, где они были неоправданы: `input-password.css`, `search-input.css`, `table.css` (fullscreen, group cell), `tree.css`, `list.css` (responsive grid через каскад CSS-переменных).
- `SgConfig.prefixCls` убран из публичного API до корректной реализации (вариант A из `styling-plan.md`, фаза 4). Для изоляции классов — изолированный скоуп на хосте.

## [0.3.0] - 2026-04-14

### Added

- **Demo Documentation** — Ant-style interactive docs for all 40+ components
  - `DemoBox` — live preview + collapsible source code
  - `PropsTable` — API reference tables for every component
  - `ComponentDoc` — page layout with title, description, "When To Use", examples
- All 40 demo pages converted to documentation format

## [0.2.0] - 2026-04-13

### Added

- **Tests** — 282 new tests across UI components, hooks, and adapters (428 total)
- **Accessibility** — ARIA attributes on 24+ components, keyboard navigation for Select, Dropdown, AutoComplete, Menu, Tabs, Rate, Slider
- **A11y hooks** — `useFocusTrap`, `useRovingTabIndex`, `useListNavigation`
- **New components** — Transfer, Calendar, TreeSelect, Mentions, Transition
- **Animations** — `Transition` component with CSS class-based transitions (fade, slide-up/down/left/right, zoom, collapse)
- **Transition integration** — Modal, Drawer, Dropdown, Tooltip, Popconfirm, Notification, Select use `Transition`
- **ConfigProvider completion** — full integration across all UI and complex components (size, disabled, locale)
- **Form Super Universal** — `scrollToFirstError`, `onValuesChange`, `preserve`, `warningRules`, `feedbackIcons`, `FormProvider` (multi-form coordination), `SchemaForm`, expanded `AutoField` (10 new types), `jsonSchemaAdapter`, `zodToJsonSchema`
- **Table Ant-killer** — multi-sort UI, row drag & drop, context menus, column visibility, column pinning, virtual scroll, CSV/clipboard export, selection summary, zebra striping, advanced pagination
- **DataGrid** — Excel-like component with inline editing, selection, formulas
- **Middleware pipeline** — pluggable middleware for core store
- **Time-travel debugging** — `useHistory` hook with undo/redo

## [0.1.0] - 2026-04-13

### Added

- `@skygraph/core` — reactive runtime (Store, Batch, Transaction, Computed, Scheduler)
- `@skygraph/core` — FormEngine (fields, validation, submit, reset, dependencies)
- `@skygraph/core` — TableEngine (CRUD, sorting, filtering, pagination)
- `@skygraph/core` — TreeEngine (expand, check, select, drag, async load, filter)
- `@skygraph/core` — TypedCore wrapper for type-safe paths
- `@skygraph/react` — hooks: useForm, useField, useWatch, useComputed, useTable, useTree
- `@skygraph/react` — 11 complex components (Form, Field, Table, Tree, List, Transfer, etc.)
- `@skygraph/react` — 39 UI components (Button, Input, Modal, Select, etc.)
- `@skygraph/react` — CSS design tokens, light/dark themes, per-component styles
- Demo application with 41 interactive examples
- CI pipeline (GitHub Actions)
- ESLint + Prettier configuration
