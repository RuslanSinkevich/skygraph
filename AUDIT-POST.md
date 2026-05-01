# SkyGraph — Post-Audit (финальная версия после нескольких итераций стрима)

> Дата: 2026-05-01
> Метод: ручная ревизия результатов всех задач стрима.
> Цель: зафиксировать что закрыто, какие фичи добавлены, какие хвосты остаются.

---

## 1. Финальные числа

### Тесты

```
core:    270 (vs 217 на старте — +53)
react:   347 (vs 282 на старте — +65)
ИТОГО:   617 тестов в 24 файлах, все зелёные
```

Прогресс по стриму:
- Старт стрима 1 (заявлено в README): 428
- Конец стрима 1 (после прогона): 497
- После Charts v0 + GraphEngine + i18n: 519
- После расширенных тестов + AreaChart/PieChart: 567
- После a11y hooks + Charts legend: 584
- После routing + pinning + diagram drag tests: 603
- **Финал текущей итерации: 617 тестов** (+189 от изначально заявленного, **+118 фактических за стрим**)

### Компоненты

```
50+ ui компонентов (Button, Input, Modal, ... Tooltip)
20+ complex компонентов:
  Form / Field / FormList / FormProvider / SchemaForm / AutoField / SubmitButton (7 form)
  Table / DataGrid / Tree / List / TreeSelect / Cascader / Calendar / Transfer / VirtualList (9 data)
  Diagram (GraphEngine view, draggable, orthogonal routing)
  LineChart / BarChart / AreaChart / PieChart / ChartLegend (5 charts)
  Dashboard (CSS-grid widget layout)
~75+ компонентов суммарно
```

### Движки в core

```
@skygraph/core (0 deps):
  Form / Table / Tree / Virtual / Graph
```

### Стилевой контракт

```
91 token,  64 component CSS files, 0 magic colors (modulo intentional fallbacks)
audit-styles: 894 CSS classes, 759 in DOM, 652 match, 41 runtime, 148 dynamic, 53 truly-dead, 111 DOM-unstyled
check:tokens   ✅
check:no-important   ✅
```

---

## 2. Что закрыто полностью

### Задача 1 — Аудит ✅

`AUDIT.md` 1356 строк, 10 секций.

### Задача 2 — Локализация demo (i18n) ✅ (минимум + 5 *Page)

- `examples/demo/src/i18n/` (DemoDict, I18nProvider, useI18n, LanguageSwitch).
- App shell + system components (PropsTable / CssVarsTable / DemoBox / ComponentDoc).
- 5 *Page локализованы: GettingStarted, Theming, CoreApi, DesignTokens, ConfigProvider.

### Задача 3 — a11y ✅ (быстрые fixes)

- Switch / Slider / Segmented / Empty подтверждены OK.
- 13 unit-тестов на `useRovingTabIndex` и `useListNavigation`.

### Задача 5 — GraphEngine ✅ (полный)

- Полная модель: Node, Edge, Outline (rect/ellipse/polygon/path), AnchorPolicy, NodeTransform, AABB.
- Операции: addNode/removeNode/updateNode/moveNode/setParent (с проверкой циклов), addEdge/removeEdge.
- Генератор якорей (perEdge/byLength/manual) для всех outline kinds.
- AABB через композицию parentId.
- `geomRevision` инкрементируется только на geom-affecting изменения.
- `subscribe(cb)` для React-адаптера.
- **`routeOrthogonal(start, end)` + `pointsToPath(points)`** — L-роутинг.
- React: `useGraph` хук + `<Diagram>` компонент (DOM узлы + SVG-overlay рёбра, custom renderNode, **draggable nodes**, render по `edge.routing`).
- 46 unit-тестов GraphEngine + 16 тестов Diagram + 13 тестов a11y hooks (всего 75 в graph-области).

### Задача 6 — TableEngine pinning ✅

- `pinColumn(column, side)`, `getPinnedColumns()`, `clearPinned()`.
- State зеркалится в core store под `$table.<id>.state.pinnedLeft|pinnedRight`.
- React `useTable()` exposes `pinColumn` / `clearPinned` / `pinnedColumns`.
- Table.tsx уже имел `column.fixed` prop — два пути работают параллельно.

### Задача 7 — Charts ✅

- LineChart, BarChart, AreaChart (stacked), PieChart (donut).
- ChartLegend компонент + `legend` prop в Line/Bar/Area.
- Native `<title>` tooltips на marker / rect / slice.
- 29 тестов charts + demo страница с 4 карточками.

### Задача 9 — Документация ✅ (дотошно)

- README, CHANGELOG, ARCHITECTURE.md, docs/architecture.md, docs/components.md, docs/conventions.md, docs/quick-start.md, docs/styling.md, docs/styling-plan.md, docs/_audit/styling-audit.md, docs/README.md — все синхронизированы с фактом.

### Задача 10 — Coverage configs ✅

- `vitest.config.ts` в обоих пакетах с провайдером v8, thresholds.
- `npm run test:coverage` доступно в обоих пакетах.
- Установка `@vitest/coverage-v8` остаётся за пользователем.

### Задача 11 — Dashboard ✅ (минимум)

- CSS-grid layout с widgets (`x, y, w, h`).
- Header + body slots, custom render callback.
- 9 тестов + demo страница интегрированная с Charts.

### Задача 15 — Релиз prep ✅

- Версии `@skygraph/core@0.4.0` и `@skygraph/react@0.4.0`.
- CHANGELOG dated, расширенный Unreleased с этой итерацией.

### Задача 16 — Audit-fixes ✅ (большой набор)

- TreeSelect / Transfer переключены на complex-версии в публичном API.
- ui/Calendar.tsx реэкспорт удалён.
- ui/TreeSelect.tsx / ui/Transfer.tsx помечены `@deprecated`.
- Lint errors fixed (SchemaForm conditional, TagInput const).
- Existing TS errors в demo починены (PropDef.required, Bordered ids, treeselect migrated).
- audit-styles allowlist для transitions + template literals (228→53 dead).
- camelCase placement aliases для dropdown / notification.
- themes/default.css и dark.css задокументированы.
- ESLint examples — comment-hint в конфиге.
- runtime-internal.ts оставлен как public surface.

### Задача 17 — Post-audit ✅

- Этот файл (несколько итераций).

### Задача 18 — Дотошное обновление документации ✅

- См. Задачу 9.

---

## 3. Что НЕ закрыто (реальные хвосты)

### Большие задачи — отдельные стримы

- **Задача 4 — Рефакторинг examples/showcases.** 12 файлов > 250 строк (forms 1131, ecommerce 1080, table-kitchen-sink 814, и др.) не декомпозированы.
- **Задача 12 — Gantt / Timeline / Resource Calendar.** Не запускалась.
- **Задача 13 — Schema Forms визуальный редактор.** Зависит от Задачи 5 (теперь готова), но сам редактор не сделан.
- **Задача 14 — Print/PDF.** Пользователь явно отложил.

### Технические остатки

- ~480 файлов в `examples/demo/src/demos/<comp>/Variant.demo.tsx` с английским хардкодом.
- `StylingShowcasePage.tsx` (884 строки) — не локализован.
- 53 действительно-dead CSS classes (после allowlist) — требует ручной ревизии.
- 111 DOM unstyled классов — требует проверки.
- Удаление `ui/TreeSelect.tsx` / `ui/Transfer.tsx` (физическое) — требует переписать 11 тестов под complex API.
- `examples-eslint.config.js` + npm-скрипт — отложено.
- `@vitest/coverage-v8` dev-install (configs готовы).
- `@axe-core/react` для автоматических a11y тестов.

### Функциональные расширения

- **GraphEngine: orthogonal routing с препятствиями** (избегание чужих узлов). Текущая `routeOrthogonal` — простая L-route без коллизий.
- **GraphEngine: undo/redo, OBB (rotated bounds), zoom/pan в Diagram, snap-to-grid.**
- **Charts: оси (axes), animations, interactive crosshair, brushing.**
- **Dashboard.Editor** — drag/resize виджетов, авто-pack.
- **TableEngine pro дальше**: column resize/reorder с persist, virtualization с динамической высотой, группировка строк + агрегации, расширенные фильтры.

---

## 4. История правок

| Итерация | Что | Тесты в конце |
|----------|-----|--------------|
| 1 (Аудит + i18n + GraphEngine + audit-fixes) | 11 задач, 17 коммитов | 519 |
| 2 (после «не оставляй TODO» — Charts, Coverage, Docs, GettingStartedPage, AUDIT-POST.md) | +20 коммитов | 567 |
| 3 (после «делай» — a11y hooks, ChartLegend, audit-styles improvement, DesignTokensPage) | +5 коммитов | 584 |
| 4 (после «делаем» — orthogonal routing, table pinning, ui-deprecated, styling docs) | +5 коммитов | 603 |
| 5 (после «продолжай» — Diagram drag, useTable hook, Dashboard, Charts tooltips) | +5 коммитов | **617** |

---

## 5. Финальный вердикт

| Категория | Состояние |
|-----------|-----------|
| Тесты (617 / 617) | ✅ зелёные |
| TS build (core + react + demo) | ✅ чисто |
| check-tokens / check-no-important | ✅ зелёные |
| Архитектурные границы | ✅ соблюдены |
| GraphEngine + Diagram (с drag, ortho) | ✅ |
| Charts (4 типа + legend + tooltip) | ✅ |
| Dashboard (минимум) | ✅ |
| TableEngine pinning (engine + UI hook) | ✅ |
| 5 движков в core | ✅ |
| i18n инфраструктура demo + 5 *Page | ✅ |
| Релиз 0.4.0 готов | ✅ |
| Документация синхронизирована | ✅ |
| Большие задачи 4 / 12 / 13 / 14 | ❌ отдельные стримы |
| Удаление deprecated файлов | ⚠ требует переписывания тестов |

Стрим выполнен в максимальной для нескольких turn-ов полноте. Все хвосты явно перечислены и привязаны к будущим задачам.
