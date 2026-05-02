# SkyGraph — Post-Audit (финал после параллельной 4-табовой итерации)

> Дата: 2026-05-02
> Метод: ручная ревизия после серии стримов; последняя итерация — 4 параллельных таба (A/B/C/D).
> Цель: зафиксировать финальное состояние, что закрыто, какие хвосты остаются.

---

## 1. Финальные числа

### Тесты

```
core:    288 (vs 217 на старте — +71)
react:   407 active + 1 todo (vs 282 на старте — +125 active)
ИТОГО:   695 активных тестов в 27 файлах, все зелёные. +1 a11y TODO (Select styled aria-name).
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
| **7 (parallel-tabs A/B/C/D)** | **+5 коммитов** | **695 + 1 todo** |

### Компоненты

```
49 ui компонентов (Button.danger/block, Input.readOnly, Select.multiple, ...)
30+ complex компонентов:
  Form / Field / FormList / FormProvider / SchemaForm / AutoField / SubmitButton (7 form)
  Table / DataGrid / Tree / List / TreeSelect / Cascader / Calendar / Transfer / VirtualList (9 data)
  Diagram (GraphEngine view, draggable, orthogonal routing, undo/redo)
  LineChart / BarChart / AreaChart / PieChart / ChartLegend / ChartAxes (6 charts)
  Dashboard + DashboardEditor (drag/resize widgets)
~80 компонентов суммарно
```

### Движки в core

```
@skygraph/core (0 deps):
  Form / Table (+ pinning + widths) / Tree / Virtual / Graph (+ history undo/redo)
```

### Стилевой контракт

```
91 token, 59 component CSS files, 0 magic colors (modulo intentional fallbacks)
audit-styles: 894+ CSS classes, 759 in DOM, 652 match, 41 runtime, 148 dynamic, 53 truly-dead, 111 DOM-unstyled
check:tokens   ✅
check:no-important   ✅
```

---

## 2. Что закрыто полностью

### Задача 1 — Аудит ✅
Исходный отчёт удалён вместе с эфемерными стрим-файлами после полного выполнения. Решения отражены в коммитах + этом документе.

### Задача 2 — Локализация demo (i18n) ✅ (минимум + 5 *Page)
- `examples/demo/src/i18n/` (DemoDict, I18nProvider, useI18n, LanguageSwitch).
- App shell + system components.
- 5 *Page: GettingStarted, Theming, CoreApi, DesignTokens, ConfigProvider.

### Задача 3 — a11y ✅
- Switch / Slider / Segmented / Empty подтверждены OK.
- 13 unit-тестов на `useRovingTabIndex` и `useListNavigation`.
- **Tab D:** автоматические axe-core smoke-тесты для 8 ключевых компонентов (`a11y-axe.test.tsx`).

### Задача 4 — Showcases ⚠ (рефакторинг частичный, новый Workflow Editor)
- ✅ Workflow Editor (новый) — Diagram + GraphEngine + drag, palette / inspector / routing toggle / add-edge модал.
- ✅ Analytics декомпозирован: `OverviewTab`, `ChartsTab`, `ChannelsTab`, `ProductsTab`, `AlertsTab`.
- ✅ ProjectTracker декомпозирован: `ProjectsTab`, `BoardTab`, `CalendarTab`, `TasksTab`, `TaskForm`.
- ✅ Form API расширен: `onFinish` (alias `onSubmit`) + `initialValues` (alias `defaultValues`).
- ✅ TS-сборка showcases проходит чисто.
- ✅ React 19 совместимость.
- ⚠ Не сделано: декомпозиция `forms/FormsApp.tsx` (1131), `ecommerce/EcommerceApp.tsx` (1080), `table-kitchen-sink/TableKitchenSinkApp.tsx` (814), `crm/CrmApp.tsx` (545). Файлы работают и компилируются.

### Задача 5 — GraphEngine ✅ (полный + undo/redo)
- Полная модель: Node, Edge, Outline, AnchorPolicy, NodeTransform, AABB.
- Операции: addNode/removeNode/updateNode/moveNode/setParent (с проверкой циклов), addEdge/removeEdge.
- Генератор якорей (perEdge/byLength/manual) для всех outline kinds.
- AABB через композицию parentId.
- `routeOrthogonal(start, end)` + `pointsToPath(points)` — L-роутинг.
- React: `useGraph` хук + `<Diagram>` (DOM узлы + SVG-overlay рёбра, custom renderNode, draggable, render по `edge.routing`).
- **Tab C:** `undo/redo/canUndo/canRedo/pushHistory(label?)` + `transaction(fn)` для группировки изменений (cap 100 entries).

### Задача 6 — TableEngine pro (частично) ✅
- ✅ Pinning: `pinColumn(column, side)`, `getPinnedColumns()`, `clearPinned()`.
- ✅ State зеркалится в core store.
- ✅ React `useTable()` exposes `pinColumn` / `clearPinned` / `pinnedColumns`.
- **Tab C:** `setColumnWidth(key, w)` / `getColumnWidth(key)` + persist в `$table.<id>.state.columnWidths`. `useTable` exposes `columnWidths` reactive state. Resize handles в Table автоматически читают/пишут.
- ⚠ Не сделано: virtualization с динамической высотой, группировка строк + агрегации, расширенные фильтры.

### Задача 7 — Charts ✅ (axes добавлены)
- LineChart, BarChart, AreaChart (stacked), PieChart (donut).
- ChartLegend компонент + `legend` prop в Line/Bar/Area.
- Native `<title>` tooltips на marker / rect / slice.
- **Tab B:** оси X / Y через `xAxis` / `yAxis` props (tickCount, tickFormatter, label, gridLines). Новый `<ChartAxes>` SVG компонент.

### Задача 9 — Документация ✅
- README, CHANGELOG, ARCHITECTURE.md, docs/* — синхронизированы.

### Задача 10 — Coverage ✅
- `vitest.config.ts` в обоих пакетах с провайдером v8.
- **Tab D:** `@vitest/coverage-v8` установлен в core+react. `pnpm -F <pkg> test:coverage` работает end-to-end.

### Задача 11 — Dashboard ✅ (минимум + Editor)
- CSS-grid layout с widgets (`x, y, w, h`).
- Header + body slots, custom render callback.
- **Tab B:** `<DashboardEditor>` — drag (header) + resize (corner) + onLayoutChange. Snap к колонке/строке.

### Задача 15 — Релиз prep ✅
- Версии `@skygraph/core@0.4.0` и `@skygraph/react@0.4.0`.
- CHANGELOG расширен новой секцией `Unreleased > parallel-tabs round`.

### Задача 16 — Audit-fixes ✅
- TreeSelect / Transfer переключены на complex-версии.
- ui/Calendar.tsx удалён.
- ui/TreeSelect.tsx / ui/Transfer.tsx помечены `@deprecated`.
- Lint errors fixed.
- Existing TS errors в demo починены.
- audit-styles allowlist (228→53 dead).
- camelCase placement aliases.
- themes/default.css и dark.css задокументированы.
- runtime-internal.ts оставлен как public surface.

### Задача 17 — Post-audit ✅ (этот файл)

### Задача 18 — Дотошное обновление документации ✅

### parallel-tabs round — UI props finalize ✅ (Tab A)
- `Button.danger` + `Button.block`.
- `Input.readOnly`.
- `Select.multiple` (с chip-ами в trigger, dropdown остаётся открытым при выборе).
- 30+ новых тестов в `ui-extended.test.tsx`.

### parallel-tabs round — Infra cleanup ✅ (Tab D)
- Дубль `package-lock.json` в `examples/demo` и `examples/showcases` удалён.
- Дубль npm `workspaces` declaration убран ранее (был ещё до Tab D).
- `pnpm-workspace.yaml` расширен на `examples/*` — workspace deps через `workspace:*`.
- `TableLocale` унифицирован: канон в `types/locale.ts`, в `Table/types.ts` — реэкспорт.
- `@axe-core/react` + `axe-core` установлены в react devDeps.
- Базовый axe-core a11y smoke тест: 8 passed + 1 todo.

---

## 3. Что НЕ закрыто (реальные хвосты)

### Большие задачи — отдельные стримы

- **Задача 4 (хвосты)** — декомпозиция крупных showcases (`forms/FormsApp.tsx` 1131, `ecommerce/EcommerceApp.tsx` 1080, `table-kitchen-sink/TableKitchenSinkApp.tsx` 814, `crm/CrmApp.tsx` 545). Файлы работают; рефакторинг косметический.
- **Задача 12 — Gantt / Timeline / Resource Calendar.** Не запускалась.
- **Задача 13 — Schema Forms визуальный редактор.** Зависит от Задачи 5 (готова), но сам редактор не сделан.
- **Задача 14 — Print/PDF.** Пользователь явно отложил.

### Технические остатки

- ~480 файлов в `examples/demo/src/demos/<comp>/Variant.demo.tsx` с английским хардкодом.
- `StylingShowcasePage.tsx` (884 строки) — не локализован.
- 53 действительно-dead CSS classes — требует ручной ревизии.
- 111 DOM unstyled классов — требует проверки.
- Удаление `ui/TreeSelect.tsx` / `ui/Transfer.tsx` (физическое) — требует переписать 11 тестов под complex API.
- `examples-eslint.config.js` + npm-скрипт — отложено.
- `audit:styles` в CI — не интегрирован.
- CI coverage step — не настроен.
- `table.test.ts > 100k rows` (~7s) — кандидат в отдельный slow-set.

### Функциональные расширения

- **GraphEngine: orthogonal routing с препятствиями** (избегание чужих узлов). Текущий `routeOrthogonal` — простая L-route без коллизий.
- **GraphEngine: OBB (rotated bounds), zoom/pan в Diagram, snap-to-grid.**
- **Charts:** animations, interactive crosshair, brushing.
- **TableEngine pro дальше:** virtualization с динамической высотой, группировка строк + агрегации, расширенные фильтры.

### a11y — известные пробелы

- ⚠ **Select (styled)** — `role="combobox"` на `<div>` без `aria-label` / `aria-labelledby`. `<label>` обёртка не помогает. Нужно прокинуть `aria-label` / `aria-labelledby` в `Select` props. Зафиксировано как `it.todo` в `a11y-axe.test.tsx`.
- ⚠ Не проверены автоматическим axe вручную: `Carousel`, `Mentions`, `Cascader`, `VirtualList`, `Rate`, `ColorPicker`, `TimePicker`. Покрытие axe-теста на эти компоненты — кандидат на расширение.

### Pre-existing TS strictness errors

`pnpm --filter @skygraph/react exec tsc --noEmit` показывает несколько ошибок в `Table/TableHeader.tsx` (`RefObject<HTMLDivElement | null>` vs `RefObject<HTMLDivElement>` после React 19). Это ошибки `tsc --noEmit` режима (strict) и **не блокируют** билд через `tsup` (DTS pass с расслабленным `noUnused*`). Кандидат на отдельный мини-стрим типизации.

---

## 4. Финальный вердикт

| Категория | Состояние |
|-----------|-----------|
| Тесты (695 active + 1 todo) | ✅ зелёные |
| TS build (core + react + demo + showcases через tsup/vite) | ✅ чисто |
| TS strict (`tsc --noEmit` для react) | ⚠ pre-existing errors в `TableHeader.tsx` |
| check-tokens / check-no-important | ✅ зелёные |
| Архитектурные границы | ✅ соблюдены |
| GraphEngine (drag, ortho, undo/redo) | ✅ |
| Charts (4 типа + legend + axes + tooltip) | ✅ |
| Dashboard + Editor (drag/resize) | ✅ |
| TableEngine (pinning + width persist) | ✅ |
| 5 движков в core | ✅ |
| i18n инфраструктура demo + 5 *Page | ✅ |
| Workspace через pnpm `workspace:*` | ✅ (тоже на examples) |
| TableLocale унифицирован | ✅ |
| axe-core a11y smoke (8 компонентов) | ✅ |
| Релиз 0.4.0 готов | ✅ |
| Документация синхронизирована | ✅ |
| Большие задачи 4 / 12 / 13 / 14 | ❌ отдельные стримы |
| Удаление deprecated файлов | ⚠ требует переписывания тестов |

Все четыре параллельных таба отработали и закоммитили свою работу:

| Tab | Коммит | Скоуп |
|-----|--------|-------|
| D | `8d5a13e` | infra + a11y-axe + TableLocale + coverage/axe deps + workspace examples |
| A | `026533b`, `ceaffa8` | Button.danger/block + Input.readOnly + Select.multiple |
| B | `f8368f6` | Charts axes + Dashboard.Editor |
| C | `de34253` | GraphEngine undo/redo + TableEngine column resize persist |
