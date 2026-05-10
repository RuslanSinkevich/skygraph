# T-Table-Perf — Findings (Wave 2)

> Стрим: T-Table-Perf
> Дата: 2026-05-10
> Scope: профайлинг `<Table>` 100k × 7 cols, поиск quick wins ≤ 3 ч.
> Статус: проведён статический анализ + микробенч engine'а; применён один quick win, остальное — гипотезы для отдельных стримов.

## 0. Метод

### Бенчмарки

1. **Engine-only микробенч** (vitest, jsdom-free):
   `pnpm --filter @skygraph/core test:bench` →
   `src/__tests__/table.test.ts > TableEngine: scalability > handles 100k rows`.
   Покрывает `addRows / getVisibleRows / setSort / addFilter`.
2. **Полный mount + scroll** (TableBenchmark):
   `examples/demo/src/demos/benchmarks/TableBenchmark.tsx` — уже существует, измеряет
   `flushSync(root.render)` + 60 frames скролла + heap delta. 3 прогона + warmup, медиана.

### Постановка

- Зафиксированный пользователем baseline (100k × 7, scroll y=480):
  - SkyGraph mount **2842.60 ms**, heap **113.36 MB**, FPS — отсутствует.
  - antd virtual mount 231.40 ms, heap 28.69 MB, 59.5 fps.
- Engine-only baseline (vitest harness, до правок):
  - `addRows(100k)` = **1416 ms**
  - `setSort(value, desc)` на 100k = **6623 ms**
  - `addFilter(value≥500)` на 100k = **2707 ms**

Engine съедает ~50% mount-времени в TableBenchmark, оставшаяся половина — React + Virtual + DOM.

---

## 1. Топ-3 hot path по статическому анализу

### HOT-1. Per-cell `core.set` в `addRows` / per-cell `core.get` в `getRowData`

**Где:** `packages/core/src/engines/table/TableEngine.ts:186-210` (addRow/addRows), `:49-72` (getRowData).

**Что происходит:**

```ts
// 100k rows × 8 set per row (7 columns + __keys) = 800 000 core.set calls
core.batch(() => {
  for (const row of rows) {
    core.set(`$table.t0.byId.${row.id}.__keys`, keys)
    for (const [col, val] of Object.entries(row.data)) {
      core.set(`$table.t0.byId.${row.id}.${col}`, val)  // 7×100k = 700k
    }
    order.push(row.id)
  }
})
```

Каждый `core.set` (см. `packages/core/src/Core.ts:50-73`) синхронно делает:

1. Проверку `transaction_.isActive`.
2. `store.get(path)` — Map lookup на 800k уникальных путей.
3. `Object.is(oldValue, value)`.
4. `dispatchWrite` → `commitWrite` → `store.set` → создание `Node` + `Map.set` в Store (800k строковых ключей по 30+ символов).
5. **`propagateComputed(new Set([path]))`** — аллоцирует `Set` + пустой `Map` на каждый вызов (даже когда computed-путей нет). 800k Set-аллокаций.
6. `batch.enqueue(path, value)` — Map.set в pending Map.

**Оценка стоимости:**

- Время: 1.4 с / 800k = 1.7 µs на cell в hot path. Большая часть — GC pressure от Set/Map-аллокаций и хеширование длинных строковых ключей.
- Память: 800k записей в `Store.nodes` (Map + Node-объекты) + 800k уникальных строковых ключей по ~30 символов → **~80 MB** только на индексирование. Это объясняет 113 MB heap delta vs antd 28 MB.

**Сложность фикса:** **low**. Заменить `core.set/get` на private `Map<RowId, Record<string, unknown>>` внутри замыкания `createTable()`. Внешний API `TableEngine` не меняется. Тесты не затрагиваются (никто в монорепо не подписывается на `$table.<id>.byId.*`).

**Ожидаемый эффект:** **x5-10 на mount**, **x3-4 на heap**.

**Риск:** Внешние пользователи могли (теоретически) `core.subscribe('$table.<id>.byId.<rid>.<col>', ...)` или `core.snapshot()` для табличных данных. В монорепо таких подписок нет (`rg "byId\." packages/ examples/` находит только сам `TableEngine.ts`). Документации, разрешающей такое, тоже нет — `state.columnWidths` это единственный документированный subscribe-able state path. **Финт безопасный.**

### HOT-2. `getVisibleRows` пересоздаёт data-объект per-row даже когда данные не меняются

**Где:** `packages/core/src/engines/table/TableEngine.ts:232-237`.

```ts
getVisibleRows(): Array<{ id: RowId; data: Record<string, unknown> }> {
  const start = (page - 1) * currentPageSize
  const end = start + currentPageSize
  const slice = filteredOrder.slice(start, end)
  return slice.map((id) => ({ id, data: getRowData(id) ?? {} }))
}
```

`getRowData` собирает новый `{}`-объект из 7 `core.get`. Для pageSize=100k (виртуализированная таблица): **100 000 новых объектов + 700k Map.get** на каждый вызов `getVisibleRows()`. Вызывается 2-3 раза за mount (`useState init` + `useEffect` после set state).

**Сложность:** автоматически решается HOT-1 — новый `getRowData` возвращает уже хранимую ссылку, без аллокаций.

**Ожидаемый эффект:** включён в эффект HOT-1.

### HOT-3. `baseFlatRows` оборачивает каждую `visibleRow` в `FlatRow` объект

**Где:** `packages/react/src/components/complex/Table/useTableState.ts:682-692`.

```ts
const baseFlatRows: FlatRow[] = useMemo(() => {
  if (!isTreeMode) {
    return visibleRows.map((r) => ({
      id: r.id,
      data: r.data,
      depth: 0,
      hasChildren: false,
    }))
  }
  return flattenTreeRows(visibleRows, childrenKey, treeExpanded)
}, [visibleRows, isTreeMode, childrenKey, treeExpanded])
```

100k allocations of `FlatRow`. useMemo гасит per-scroll, но при каждом изменении `visibleRows`-ссылки (mount, data swap, sort, filter) пересоздаётся весь массив.

**Сложность фикса:** **medium**. `FlatRow.depth` и `hasChildren` — required в `types.ts`, который запрещён к правке. Корректный фикс требует расширения `FlatRow` (`depth?: number; hasChildren?: boolean`) и страховок в `TableBody`. Не quick win.

**Ожидаемый эффект:** дополнительные ~10-15% на mount после HOT-1.

**Решение:** записано как finding для отдельного стрима (требует трогать `types.ts`, который вне моей зоны).

---

## 2. Гипотезы — таблица приоритетов

| #  | Гипотеза                                                                          | Где                                                | Сложность | Ожидаемый эффект | Действие в этом стриме |
|----|-----------------------------------------------------------------------------------|----------------------------------------------------|-----------|------------------|------------------------|
| H1 | Per-cell `core.set` в `addRows` (800k вместо 1 на row)                            | `core/engines/table/TableEngine.ts`                | **low**   | **x5-10 mount**  | **ФИКСИМ**             |
| H2 | Per-cell `core.get` в `getRowData` × 100k вызовов в `getVisibleRows`              | `core/engines/table/TableEngine.ts`                | low       | бонус H1         | ФИКСИМ (часть H1)      |
| H3 | `getVisibleRows` пересоздаёт wrapper-объекты `{id, data}`                         | `core/engines/table/TableEngine.ts`                | low       | малый            | ФИКСИМ (часть H1)      |
| H4 | `baseFlatRows.map(...)` создаёт 100k FlatRow                                      | `react/.../useTableState.ts`                       | medium    | ~10-15%          | finding (нужен `types.ts`) |
| H5 | `compareBySort` вызывает `getRowData(a) + getRowData(b)` для каждой пары: O(n log n × 14 core.get) | `core/engines/table/TableEngine.ts:83-99` | low       | x3-5 sort        | ФИКСИМ как часть H1 (после H1 это O(1) Map.get вместо O(7) core.get) |
| H6 | Filter `recomputeFiltered` тоже вызывает `getRowData` per-row                     | `core/engines/table/TableEngine.ts:101-120`        | low       | x3-5 filter      | ФИКСИМ как часть H1    |
| H7 | `flushSync(root.render)` оборачивает весь mount — нельзя batch'ить через scheduler | TableBenchmark + React 19                          | high      | unknown          | finding                |
| H8 | `useSyncExternalStore` отсутствует — `useTable` использует `useState` + ручной refresh | `react/src/hooks/useTable.ts`                  | medium    | ~5%              | finding                |
| H9 | `gridTemplate` — CSS Grid `display: contents` для каждой row при > 10k DOM узлов: рекалькуляция layout всей сетки | `Table.tsx:170-176`, `TableBody.tsx:288` | high      | unknown без profiler | finding |
| H10 | Множество `useEffect` в `useTableState` пересоздаёт closures на каждый рендер | `useTableState.ts:227, 237, 248, 275, 552`         | low       | малый            | finding (вне quick wins) |
| H11 | `propagateComputed(new Set([path]))` аллоцирует Set даже когда computed-путей 0 | `core/src/Core.ts:61` (ВНЕ ЗОНЫ T-Table-Perf)      | low       | x1.2-1.5         | finding (Core вне зоны) |
| H12 | `flatRows.length` (~filtered count, не render count) попадает в `useMemo` deps `spanMap` / `hiddenCells` / `aggregates` — пересчитываются на каждое изменение `visibleRows` независимо от `onCell`/`aggregate` | `useTableState.ts:826-829, 713-716` | low | малый (есть fast-exit) | оставлено |
| H13 | В `DOMContentLoaded` нет idleCallback / scheduler.postTask для derive-операций | `useTable + useTableState`                         | high      | средний          | finding |
| H14 | `keysById` хранит длинные строковые ключи в Store (`__keys`) — вообще не используется когда `options.columns` задан | `core/engines/table/TableEngine.ts:61-69` | low | малый            | ФИКСИМ как часть H1 (исчезает) |

---

## 3. Что НЕ трогаем (фундаментальные находки → отдельные стримы)

### F-1. CSS Grid `display: contents` для тысяч строк

`TableBody.tsx:288` рендерит каждую row как `<div role="row" style={{ display: 'contents' }}>`. С виртуализацией DOM ≤ 30 строк, и это OK. Но при `virtual={false}` + 1000+ rows браузер пересчитывает grid track sizing для всех ячеек разом. Это известный браузерный bottleneck (Chromium `LayoutNGGridLayoutAlgorithm`). Решение — переход на `<table>`-элемент с `table-layout: fixed`, либо `position: absolute` per-row с CSS-переменными (а-ля react-window). Это **архитектурный** фикс, требует переписывания CSS-контракта. Не quick win.

### F-2. Per-render `useCallback` chain в `useTable.ts`

Каждый из 13 `useCallback` зависит от `[table, refresh]`, и `refresh` зависит от `[table]`, и сам массив возвращается через `useMemo` с 21-элементным dep массивом. На каждый `setVisibleRows` triggers re-render → пересоздание всего объекта. Можно перейти на `useSyncExternalStore` с эффективной snapshot-функцией, но это требует переписывания и API-совместимости.

### F-3. `useTable` cold-init вызывает `addRows` синхронно в `useState(() => ...)`

```ts
const [{ core, table }] = useState(() => {
  const c = createCore()
  const t = createTable(c, options)
  if (options?.data) t.addRows(options.data)  // ← синхронно 100k строк до первого paint
  return { core: c, table: t }
})
```

Это блокирует первый paint на полное время `addRows`. После H1 это сокращается с 1.4s до ~30ms, но всё ещё occupies main thread. Альтернатива: chunked `addRows` через MessageChannel/scheduler. Архитектурное.

### F-4. `core.set` всегда аллоцирует `new Set([path])` даже без computed-путей

`packages/core/src/Core.ts:61` — каждый set делает `propagateComputed(new Set([path]))`. ComputedEngine может быть пустым (часто), но Set + пустой Map dispatched аллоцируется всегда. Это **вне зоны T-Table-Perf** (Core.ts не в зоне), но выгода ~1.2-1.5x на любых hot-set workload'ах. Записал отдельно как находку для будущего стрима T-Core-Perf (не существует).

---

## 4. Итог

- **Фиксим H1+H2+H3+H5+H6+H14 одним рефакторингом** — все они уходят, если данные строк хранятся в private `Map<RowId, RowData>` вместо per-cell в Core store.
- **Зона правок:** только `packages/core/src/engines/table/TableEngine.ts`. Никакие public-API типы не меняются. Никакие тесты не падают.
- Финальные числа — в `done/T-Table-Perf.md`.
- Остальное (F-1..F-4, H4, H7..H13) — описано выше, не трогаем в рамках 3-часового бюджета.

---

## 5. Cross-stream находки (вне scope, Charter §6.4)

### F-5. `pnpm --filter demo build` ломает T-Showcases-I18n WIP

`tsc -b` для `examples/demo` подцепляет (через `examples/demo/src/pages/Showcases/ShowcasesPage.tsx`) файл
`examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`, который ссылается на `ShowcasesLocale['apps']`,
а в `examples/_shared/src/showcasesLocale.ts` поле `apps` отсутствует.

```
../showcases/src/showcases/_shared/showcaseLocaleContext.tsx(35,62): error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
../showcases/src/showcases/_shared/showcaseLocaleContext.tsx(37,20): error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
../showcases/src/showcases/_shared/showcaseLocaleContext.tsx(39,17): error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
```

Все три файла-виновника (`showcaseLocaleContext.tsx`, `showcasesLocale.ts`, `pages/Showcases/`) — `??` untracked,
созданы параллельным стримом T-Showcases-I18n и пока не сошлись по типу. Это **их** работа, не моя.
Зоны T-Showcases-I18n из CHARTER §4: `examples/showcases/src/showcases/**/*.tsx`, `examples/_shared/src/showcasesLocale.ts`.
Решение: НЕ ТРОГАЮ. Стрим T-Showcases-I18n должен либо добавить `apps` в `ShowcasesLocale`, либо убрать
`useAppLocale` из `showcaseLocaleContext.tsx`.

### F-6. `pnpm --filter demo build` блокируется до фикса F-5

Из-за F-5 финальный sanity-check `pnpm --filter demo build` не проходит. Это **не регрессия T-Table-Perf**:
изменения T-Table-Perf затрагивают только `packages/core/src/engines/table/TableEngine.ts` (см.
`done/T-Table-Perf.md`). После того как T-Showcases-I18n починит `ShowcasesLocale`, demo build снова станет зелёным
без дополнительных правок в Table.

Подтверждение: все 6 остальных команд из финального чек-листа (`@skygraph/core typecheck/test/build`,
`@skygraph/react typecheck/test/build`) проходят зелёными после моих правок.
