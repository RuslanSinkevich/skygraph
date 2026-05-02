# SkyGraph — Post-Audit (финал после round 8: GraphEngine pro + TableEngine pro + Charts pro + showcases decomposition)

> Дата: 2026-05-02
> Метод: ручная ревизия после двух раундов параллельных табов (round 7 + round 8) и финальной чистки регрессий.
> Цель: зафиксировать финальное состояние, что закрыто, какие хвосты остаются.

---

## 1. Финальные числа

### Тесты

```
core:    332 (vs 217 на старте — +115)
react:   447 active + 2 todo (vs 282 на старте — +165 active)
ИТОГО:   779 активных тестов в 27 файлах, все зелёные. +2 a11y TODO (Select aria-name → закрыто; Carousel/Mentions/Cascader axe coverage → отложено).
```

Прогресс по итерациям:

| Итерация | Что | Тесты в конце |
|----------|-----|---------------|
| 1 (Аудит + i18n + GraphEngine + audit-fixes) | 11 задач, 17 коммитов | 519 |
| 2 (no-todo директива — Charts, Coverage configs, Docs, GettingStartedPage) | +20 коммитов | 567 |
| 3 (a11y hooks, ChartLegend, audit-styles improvement, DesignTokensPage) | +5 коммитов | 584 |
| 4 (orthogonal routing, table pinning, ui-deprecated, styling docs) | +5 коммитов | 603 |
| 5 (Diagram drag, useTable hook, Dashboard, Charts tooltips) | +5 коммитов | 617 |
| 6 (Workflow Editor, Form `onFinish`/`initialValues`, R19 совместимость) | +1 коммит | 617 |
| 7 (parallel-tabs round 1: A/B/C/D — UI props, Charts axes, Dashboard.Editor, GraphEngine undo/redo, TableEngine widths, infra) | +5 коммитов | 695 + 1 todo |
| **8 (parallel-tabs round 2: A/B/C/D — showcases decomposition, GraphEngine pro, TableEngine pro, Charts pro)** | **+4 коммита** | **779 + 2 todo** |
| **8.1 (regression sweep — local tokens, !important allowlist, persistColumnWidth wiring, lint cleanup)** | **+1 коммит** | **779 + 2 todo** |

### Компоненты

```
49 ui компонентов (Button.danger/block, Input.readOnly, Select.multiple, Select.aria-label/aria-labelledby, ...)
30+ complex компонентов:
  Form / Field / FormList / FormProvider / SchemaForm / AutoField / SubmitButton (7 form)
  Table / DataGrid / Tree / List / TreeSelect / Cascader / Calendar / Transfer / VirtualList (9 data)
  Diagram (GraphEngine view, draggable, orthogonal routing с препятствиями, undo/redo, zoom/pan, snap-to-grid)
  LineChart / BarChart / AreaChart / PieChart / ChartLegend / ChartAxes / ChartCrosshair (7 charts)
  Dashboard + DashboardEditor (drag/resize widgets)
  TableGroupRow (grouped row aggregates)
~80+ компонентов суммарно
```

### Движки в core

```
@skygraph/core (0 deps):
  Form / Table (+ pinning + widths + advanced filters + grouping/aggregations)
  Tree / Virtual
  Graph (+ undo/redo + OBB + obstacle-aware ortho routing)
```

### Стилевой контракт

```
91 token, 64 component CSS files, 0 magic colors (modulo intentional fallbacks)
audit-styles: 894+ CSS classes
check:tokens         ✅ (91 tokens, 64 files)
check:no-important   ✅ (65 files; charts.css/table.css whitelisted only inside @media print / prefers-reduced-motion)
```

### Качество

```
tsc --noEmit (react)  ✅ чисто (включая Table/TableHeader.tsx)
eslint packages/      ✅ 0 errors, 0 warnings
pnpm -r test          ✅ 779 + 2 todo
pnpm -r build         ✅ core, react, demo, showcases собираются
```

---

## 2. Что закрыто полностью

### Задача 1 — Аудит ✅

### Задача 2 — Локализация demo (i18n) ✅ (минимум + 5 *Page)
- `examples/demo/src/i18n/`, App shell + system components.
- 5 *Page: GettingStarted, Theming, CoreApi, DesignTokens, ConfigProvider.

### Задача 3 — a11y ✅ (полностью + axe smoke)
- Switch / Slider / Segmented / Empty подтверждены OK.
- 13 unit-тестов на `useRovingTabIndex` и `useListNavigation`.
- **axe-core smoke** для 8 ключевых компонентов (`a11y-axe.test.tsx`).
- **Select aria-label / aria-labelledby** — добавлено в API, передаётся в `role="combobox"`. `it.todo` поднят в активный тест.

### Задача 4 — Showcases ✅ (полная декомпозиция)
- ✅ Workflow Editor (новый) — Diagram + GraphEngine + drag.
- ✅ Analytics декомпозирован.
- ✅ ProjectTracker декомпозирован.
- ✅ Form API расширен: `onFinish` + `initialValues`.
- ✅ TS-сборка showcases чисто.
- ✅ React 19 совместимость.
- ✅ **Round 8 Tab A:** `forms/FormsApp.tsx` (1131) → `BasicTab` / `ValidationTab` / `LayoutsTab` / `DynamicTab` / `SchemaTab` + `styles.ts`.
- ✅ **Round 8 Tab A:** `ecommerce/EcommerceApp.tsx` (1080) → `ProductsTab` / `OrdersTab` / `CustomersTab` / `InventoryTab` / `AnalyticsTab`.
- ✅ **Round 8 Tab A:** `table-kitchen-sink/TableKitchenSinkApp.tsx` (814) → `BasicTab` / `SortingFilteringTab` / `EditingTab` / `VirtualTab` / `PinnedTab` / `GroupedTab` + `common.tsx`.
- ✅ **Round 8 Tab A:** `crm/CrmApp.tsx` (545) → `LeadsTab` / `DealsTab` / уже существующие `ContactsTab` / `ActivityTab` / `PipelineTab`.

### Задача 5 — GraphEngine ✅ (полностью + pro)
- Полная модель: Node, Edge, Outline, AnchorPolicy, NodeTransform, AABB.
- Операции: addNode/removeNode/updateNode/moveNode/setParent (с проверкой циклов), addEdge/removeEdge.
- Якоря (perEdge/byLength/manual), AABB через композицию parentId.
- `pointsToPath(points)` для рендера.
- React: `useGraph` хук + `<Diagram>` (DOM узлы + SVG-overlay рёбра, draggable, render по `edge.routing`).
- **Round 7 Tab C:** `undo/redo/canUndo/canRedo/pushHistory(label?)` + `transaction(fn)` (cap 100 entries).
- **Round 8 Tab B (`router.ts` + `obb.ts`):**
  - **OBB** (rotated bounds) — `getNodeOBB(id)`, `aabbFromOBB`, `obbCorners`, `obbContainsPoint`.
  - **Orthogonal routing с препятствиями** — `routeOrthogonal(start, end, options)` с `options.obstacles?: AABB[]`. A* по сетке. Fallback на L-route.
  - **`<Diagram>` zoom / pan** — `zoomable` / `pannable` props, Ctrl+wheel zoom, middle-button drag pan, SVG transform.
  - **Snap-to-grid** — `snapToGrid={N}` prop, координаты округляются к шагу. CSS hook `.sg-diagram-grid`.

### Задача 6 — TableEngine ✅ (полностью + pro)
- ✅ Pinning: `pinColumn(column, side)`, `getPinnedColumns()`, `clearPinned()`.
- ✅ State зеркалится в core store; React `useTable()` exposes `pinColumn` / `clearPinned` / `pinnedColumns`.
- ✅ **Round 7 Tab C:** `setColumnWidth(key, w)` / `getColumnWidth(key)` + persist в `$table.<id>.state.columnWidths`.
- ✅ **Round 8.1:** `persistColumnWidth` wired в `useTableState.ts` — финальная ширина после resize пишется в engine.
- ✅ **Round 8 Tab C (`filter.ts` + `TableGroupRow`):**
  - **Расширенные фильтры** — операторы `eq` / `neq` / `lt` / `lte` / `gt` / `gte` / `between` / `in` / `notIn` / `contains` / `startsWith` / `endsWith` / `isEmpty` / `isNotEmpty`. `AdvancedFilter = { op, value }`. UI: `<FilterDropdown mode="advanced">`.
  - **Группировка строк + агрегации** — `TableEngine.groupBy(field)`, `getGroups()`, `column.aggregate: 'sum' | 'avg' | 'min' | 'max' | 'count' | (values) => ReactNode`. UI: `<TableGroupRow>` с раскрытием/сворачиванием.
- ⚠ Не сделано: virtualization с динамической высотой (deferred).

### Задача 7 — Charts ✅ (полностью + pro)
- LineChart / BarChart / AreaChart / PieChart, ChartLegend, native `<title>` tooltips.
- **Round 7 Tab B:** оси X / Y через `xAxis` / `yAxis` props (tickCount, tickFormatter, label, gridLines), `<ChartAxes>`.
- **Round 8 Tab D:**
  - **Animations** — `animate?: boolean | { duration?: number }` props. Реализация — pure CSS (`@keyframes` + `--sg-chart-anim-duration`). Учитывает `prefers-reduced-motion`.
  - **Crosshair** — `<LineChart crosshair />` + новый `<ChartCrosshair>` компонент. Hover показывает вертикальную линию + значения серий по ближайшему X-tick.
- ⚠ Не сделано: brushing (отложено).

### Задача 9 — Документация ✅
- README, CHANGELOG, ARCHITECTURE.md, docs/* — синхронизированы.

### Задача 10 — Coverage ✅
- `vitest.config.ts` в обоих пакетах с провайдером v8.
- `@vitest/coverage-v8` установлен в core+react. `pnpm -F <pkg> test:coverage` работает.

### Задача 11 — Dashboard ✅ (минимум + Editor)
- CSS-grid layout + `<DashboardEditor>` (drag header + resize corner + onLayoutChange + snap).

### Задача 15 — Релиз prep ✅
- Версии `0.4.0` в обоих пакетах.
- CHANGELOG расширен.

### Задача 16 — Audit-fixes ✅
- TreeSelect / Transfer переключены на complex.
- ui/Calendar.tsx удалён.
- ui/TreeSelect.tsx / ui/Transfer.tsx помечены `@deprecated`.
- audit-styles allowlist (228→53 dead).
- camelCase placement aliases.

### Задача 17 — Post-audit ✅ (этот файл)

### Задача 18 — Документация ✅

### parallel-tabs round 1 (round 7) ✅
- Tab A: `Button.danger/block`, `Input.readOnly`, `Select.multiple`.
- Tab B: Charts axes + Dashboard.Editor.
- Tab C: GraphEngine undo/redo + TableEngine column widths.
- Tab D: infra + a11y-axe + TableLocale unify + coverage/axe deps + workspace examples.

### parallel-tabs round 2 (round 8) ✅
- Tab A: showcases decomposition (forms / ecommerce / table-kitchen-sink / crm).
- Tab B: GraphEngine router+OBB refactor, Diagram zoom/pan/snap, obstacle-aware routing.
- Tab C: TableEngine advanced filters & grouping aggregates, Table UI (FilterDropdown.advanced, TableGroupRow).
- Tab D: Charts crosshair + animations, Select aria-labelledby/label, Tree deps fix, DatePicker eslint, exports sync.

### Round 8.1 — regression sweep ✅
- `--sg-grid-size` объявлен локально в `.sg-diagram` для `check:tokens`.
- `--sg-chart-anim-duration` объявлен локально в `.sg-chart`.
- `prefers-reduced-motion` блок в `charts.css` добавлен в `MEDIA_ALLOWLIST` (`check:no-important`) — стандартный a11y паттерн рядом с `@media print`.
- `persistColumnWidth` подключён в `handleResizeStart.onUp` (раньше API был, но wiring отсутствовал — `tsc --noEmit` ругался).
- `prefer-const` errors в `diagram.test.tsx` починены.
- `react-hooks/exhaustive-deps` warnings в `Table/Table.tsx` (rowNumConfig → useMemo) и `useFieldArray.ts` (genKey в deps) — закрыты.

---

## 3. Что НЕ закрыто (хвосты)

### Большие задачи (отдельные стримы)

- **Задача 12 — Gantt / Timeline / Resource Calendar.** Не запускалась.
- **Задача 13 — Schema Forms визуальный редактор.** Зависит от Задачи 5 (готова), но сам редактор не сделан.
- **Задача 14 — Print/PDF.** Пользователь явно отложил.

### Технические остатки

- ~480 файлов в `examples/demo/src/demos/<comp>/Variant.demo.tsx` с английским хардкодом.
- `StylingShowcasePage.tsx` (884 строки) — не локализован.
- 53 действительно-dead CSS classes (после allowlist) — требует ручной ревизии (число снизится после Charts/Diagram round 8 — нужно перепрогнать `audit:styles`).
- 111 DOM unstyled классов — требует проверки.
- Удаление `ui/TreeSelect.tsx` / `ui/Transfer.tsx` (физическое) — требует переписать ~11 тестов под complex API.
- `examples-eslint.config.js` + npm-скрипт — отложено.
- `audit:styles` в CI — не интегрирован.
- CI coverage step — не настроен.
- `table.test.ts > 100k rows` (~7-13s) — кандидат в отдельный slow-set.
- Subpaths `@skygraph/core/{table,tree,virtual,graph}` — нет (только index/form/runtime-internal).

### Функциональные расширения

- **TableEngine:** virtualization с динамической высотой (есть с фиксированной).
- **Charts:** brushing (zoom diapason).
- **a11y axe coverage:** `Carousel`, `Mentions`, `Cascader`, `VirtualList`, `Rate`, `ColorPicker`, `TimePicker`. Сейчас как `it.todo` в `a11y-axe.test.tsx`.

### Локальные warnings/notes

- `audit-styles.mjs`: после round 8 в JS появились новые `sg-chart-*-animate`, `sg-diagram-grid`, `sg-table-group-row`, `sg-chart-crosshair*`, `sg-filter-advanced-*` — нужно перегенерировать `_audit/styling-audit.md` и проверить, не появилось ли новых dead/unstyled.

---

## 4. Финальный вердикт

| Категория | Состояние |
|-----------|-----------|
| Тесты (779 active + 2 todo) | ✅ зелёные |
| TS strict (`tsc --noEmit` для react) | ✅ чисто |
| TS build (core + react + demo + showcases через tsup/vite) | ✅ чисто |
| eslint packages/ | ✅ 0 errors, 0 warnings |
| check-tokens / check-no-important | ✅ зелёные |
| Архитектурные границы | ✅ соблюдены |
| GraphEngine (drag, ortho-with-obstacles, undo/redo, zoom/pan, snap, OBB) | ✅ |
| Charts (4 типа + legend + axes + tooltip + animations + crosshair) | ✅ |
| Dashboard + Editor (drag/resize) | ✅ |
| TableEngine (pinning + width persist + advanced filters + grouping/aggregates) | ✅ |
| 5 движков в core | ✅ |
| i18n инфраструктура demo + 5 *Page | ✅ |
| Workspace через pnpm `workspace:*` | ✅ (тоже на examples) |
| TableLocale унифицирован | ✅ |
| axe-core a11y smoke (8 компонентов + Select.aria-label) | ✅ |
| Showcases декомпозиция (forms/ecommerce/crm/tks) | ✅ |
| Релиз 0.4.0 готов | ✅ |
| Документация синхронизирована | ✅ |
| Большие задачи 12 / 13 / 14 | ❌ отдельные стримы |
| Удаление deprecated файлов | ⚠ требует переписывания тестов |

### Карта коммитов round 7 + round 8 + round 8.1

| Round / Tab | Коммит | Скоуп |
|-------------|--------|-------|
| 7 / D | `8d5a13e` | infra + a11y-axe + TableLocale + coverage/axe deps + workspace examples |
| 7 / A | `026533b`, `ceaffa8` | Button.danger/block + Input.readOnly + Select.multiple |
| 7 / B | `f8368f6` | Charts axes + Dashboard.Editor |
| 7 / C | `de34253` | GraphEngine undo/redo + TableEngine column resize persist |
| docs | `83826dc` | actualize after round 7, remove ephemeral stream artifacts |
| 8 / A | `f53caa8` | decompose large showcases into tab modules |
| 8 / B | `2bf4ff5` | GraphEngine router+OBB refactor, Diagram zoom/pan/snap & obstacle-aware routing |
| 8 / C | `8c5760f` | TableEngine advanced filters & grouping aggregates, Table UI |
| 8 / D | `ab611e0` | Charts crosshair+animations, Select aria, Tree deps, DatePicker eslint, exports |
| 8.1 | (this audit) | regression sweep + AUDIT/TODO refresh |
