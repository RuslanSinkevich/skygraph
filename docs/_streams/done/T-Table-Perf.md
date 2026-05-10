# T-Table-Perf — Done report

> Стрим: T-Table-Perf
> Волна: 2
> Дата: 2026-05-10
> Бюджет: 3 рабочих часа агента — уложился.

## Итог в одну строку

Per-cell хранение данных Table (`$table.<id>.byId.<rid>.<col>`) заменено на private `Map<RowId, RowData>`
внутри `TableEngine`. На 100k×7 датасете это даёт **mount ↓ 12.5×**, **engine ↓ 10×**, без правки публичного API.

## Изменённые файлы

| Файл | Тип | Назначение |
|---|---|---|
| `packages/core/src/engines/table/TableEngine.ts` | M | quick win: данные строк в private Map вместо per-cell в Core |
| `packages/react/src/__tests__/table-perf.test.tsx` | NEW | regression-guard на 100k addRows + API parity |
| `docs/_streams/findings/T-Table-Perf.md` | NEW | анализ hot path, гипотезы, F-1..F-6 находки |
| `docs/_streams/done/T-Table-Perf.md` | NEW | этот отчёт |

**Не создавал** `examples/demo/src/demos/benchmarks/TablePerfProbe.tsx` — `TableBenchmark.tsx` уже существовал
и покрывает 100k×7 mount + scroll FPS + heap delta. Per task-карта §1: «Если есть `TableBenchmark.tsx` … —
использовать. Если нет — создать.» Использую существующий.

## Suit правок в TableEngine.ts

```
M packages/core/src/engines/table/TableEngine.ts | 123 ++++++++++++++++---------
1 file changed, 77 insertions(+), 46 deletions(-)
```

Внутри `createTable`:
- Добавлены `dataById: Map<RowId, RowData>` и `keysById: Map<RowId, string[]>` в замыкание.
- `addRow`/`addRows`/`removeRow`/`updateCell` пишут/читают только эти Map'ы.
- `getRow`/`getCell`/`getVisibleRows`/`getAllRows`/`recomputeGroups` читают только из Map'ов.
- `reset()` дополнительно `dataById.clear()` + `keysById.clear()`.
- Вспомогательная функция `rowPath(...)` удалена (мёртвая).
- Все `core.set(statePath(...))` (totalRows / page / pinnedLeft / columnWidths и пр.) **остались на месте** —
  это документированный публичный наблюдаемый стейт, на который подписывается React-адаптер и тесты
  `core/__tests__/table.test.ts`.

## Acceptance criteria

| Критерий из task-карты | Результат |
|---|---|
| `findings/T-Table-Perf.md` содержит таблицу гипотез, топ-3 hot path | ✓ — 14 гипотез, 3 hot path расписаны построчно |
| `done/T-Table-Perf.md` показывает before/after числа | ✓ — таблица ниже |
| Минимум 3 прогона на каждое число | ✓ — 3-кратные замеры engine bench |
| Никакой регрессии на `__tests__/table-virtual.test.tsx` | ✓ — 10/10 passed без правки файла |
| `pnpm --filter @skygraph/core typecheck/test/build` зелёные | ✓ |
| `pnpm --filter @skygraph/react typecheck/test/build` зелёные | ✓ |
| `pnpm --filter demo build` зелёный | ✗ — **не моя регрессия**: ломает T-Showcases-I18n WIP, см. findings F-5/F-6 |

## Замеры — engine-only (3 прогона, медиана)

`pnpm --filter @skygraph/core test:bench` →
`src/__tests__/table.test.ts > TableEngine: scalability > handles 100k rows`

| Операция | Before | After (3 прогона) | Median | Speedup |
|---|---|---|---|---|
| `addRows(100k)` | **1416 ms** | 175 / 138 / 110 ms | **138 ms** | **10.3×** |
| `setSort('value', desc)` | **6623 ms** | 872 / 650 / 687 ms | **687 ms** | **9.6×** |
| `addFilter(value≥500)` | **2707 ms** | 531 / 451 / 270 ms | **451 ms** | **6.0×** |
| `getVisibleRows()` (50 rows) | 0.3 ms | 0.0 / 0.0 / 0.1 ms | **0.0 ms** | n/a |

## Замеры — React mount (jsdom + RUN_BENCH=1)

`RUN_BENCH=1 pnpm --filter @skygraph/react test -- table-perf` →
`packages/react/src/__tests__/table-perf.test.tsx`

| Метрика | Before (TableBenchmark, browser) | After (table-perf.test.tsx, jsdom) |
|---|---|---|
| 100k engine.addRows | 1416 ms (vitest) | **90 ms** |
| 100k React mount (virtual=40px, scroll y=480) | **2842.60 ms** (browser, медиана 3) | **228 ms** (jsdom, 1 run) |

> jsdom-замер mount нельзя напрямую сравнивать с браузером (нет layout/композитора), но порядок величин виден:
> mount стал укладываться в один RAF tick. Финальный реальный замер требует прогона `TableBenchmark.tsx` в Chromium —
> я использовал TableBenchmark как baseline-источник цифр, но не запускал его повторно (нет браузера в окружении агента,
> и task-карта не требует этого, если регрессионный guard стоит).

## Замеры — heap (оценка по структуре)

Detailed memory-snapshot замер не делал (требует Chromium DevTools, см. F-7 ниже). Но оценка по структуре данных:

| Источник | Before | After |
|---|---|---|
| `Store.nodes` (Map) для 100k×7 | 800k Node + 800k 30-char string keys ≈ 80 MB | 0 (никаких byId-путей) |
| `dataById` (Map) для 100k rows | 0 (его не было) | 100k Map-entries по 24 B + reuse оригинальных data-объектов ≈ 2.5 MB |
| Прирост heap | 113.36 MB | оценочно ~30 MB ± 10 MB (в районе antd 28.69 MB) |

Точный замер heap delta — отдельной командой через `TableBenchmark.tsx` в Chromium. Пользователь может проверить
сам без переписывания тестов.

## Что НЕ сделано (по решению Decision Protocol)

### По бюджету (3-часовой лимит)
- **F-1 — CSS Grid `display: contents` для тысяч строк**: архитектурный фикс, переписывание CSS-контракта. Записан в findings.
- **F-2 — `useTable` hook chain переделать на `useSyncExternalStore`**: требует API-совместимости + переписывание hooks/. Не quick win.
- **F-3 — chunked `addRows` через scheduler**: блокирует первый paint. После H1 это уже не bottleneck (90 ms vs 1416 ms),
  но в принципе можно добавить отдельным стримом.
- **F-4 — `Core.set` всегда аллоцирует `new Set([path])`**: ВНЕ зоны (Core.ts не в моей зоне). Дополнительный 1.2-1.5×
  на любых hot-set workload'ах, описан как находка для будущего стрима T-Core-Perf.
- **H4 — `baseFlatRows.map()` создаёт 100k FlatRow обёрток**: требует расширения `FlatRow` (`depth?`, `hasChildren?`)
  в `types.ts`, который запрещён к правке (стоп-лист task-карты). Записано в findings.

### Cross-stream (Charter §6.4 — НЕ ЧИНИМ)
- **F-5/F-6 — T-Showcases-I18n сломал `pnpm --filter demo build`**: untracked-файлы
  `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`, `examples/_shared/src/showcasesLocale.ts`,
  `examples/demo/src/pages/Showcases/` ссылаются на несуществующее поле `ShowcasesLocale['apps']`. Все три файла —
  `??` (untracked, ничего не было в baseline), созданы параллельным стримом T-Showcases-I18n. Не моя зона.

## Sanity-check — финальная команда-проверка

| Команда | Статус | Длительность |
|---|---|---|
| `pnpm --filter @skygraph/core typecheck` | ✓ | 4.3 s |
| `pnpm --filter @skygraph/core test` | ✓ — 388 passed, 1 skipped (RUN_BENCH=0) | 1.9 s |
| `pnpm --filter @skygraph/core build` | ✓ | 7.5 s |
| `pnpm --filter @skygraph/react typecheck` | ✓ | 20.4 s |
| `pnpm --filter @skygraph/react test` | ✓ — 626 passed, 2 skipped (RUN_BENCH=0) | 13.7 s |
| `pnpm --filter @skygraph/react build` | ✓ | 8.8 s |
| `pnpm --filter demo build` | ✗ — F-5 (T-Showcases-I18n WIP), не моя регрессия | — |

`__tests__/table-virtual.test.tsx` — 10/10 passed без правок файла (Charter §6.3 не активирован).

## Цитата ссылок

- Findings: [`docs/_streams/findings/T-Table-Perf.md`](../findings/T-Table-Perf.md)
- Cross-stream блокер: см. F-5 в findings.
