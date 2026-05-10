# T-Table-Perf — Профайлинг и оптимизация SkyGraph Table

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-Table-Perf
- **Волна:** 2

## Контекст

Бенчмарк `examples/demo/src/demos/benchmarks/...` (или его эквивалент в showcases) показал на 100k rows, 7 columns, virtualized scroll container 480px:

| Variant | Median Mount | Scroll FPS | Heap Δ |
|---|---|---|---|
| SkyGraph `<Table>` | **2842.60 ms** | — (нет числа) | **113.36 MB** |
| antd `<Table virtual>` | 231.40 ms | 59.5 fps | 28.69 MB |

**SkyGraph в ~12 раз медленнее на mount и в ~4 раза тяжелее по памяти.** Scroll FPS не отображается — возможно scroll-обработчик не успевает завершиться за время окна замера, либо тест не его запускает.

## Цель

Цель **этого** стрима — **диагностика и быстрые wins**, а **не** перепись engine'а. Если корень проблемы окажется фундаментальным (требует архитектурных изменений в `core/engines/table/`) — это **записывается в `findings/`** и НЕ чинится в рамках стрима.

Конкретно:

1. Профилировать mount и scroll на 100k rows.
2. Идентифицировать топ-3 горячих точек.
3. Починить те, что укладываются в **3 рабочих часа** агента (low-hanging fruits).
4. Всё остальное — `findings/T-Table-Perf.md` со списком гипотез и предложений.

## Зона файлов (можно трогать)

### Runtime (правки)

- `packages/core/src/engines/table/**/*.ts` — engine, runtime hot path.
- `packages/react/src/components/complex/Table/Table.tsx`.
- `packages/react/src/components/complex/Table/TableBody.tsx`.
- `packages/react/src/components/complex/Table/VirtualTableBody.tsx`.
- `packages/react/src/components/complex/Table/TableHeader.tsx`.
- `packages/react/src/components/complex/Table/TableGroupRow.tsx`.
- `packages/react/src/components/complex/Table/useTableState.ts`.
- `packages/react/src/components/complex/Table/helpers.ts`.

### Профайлинг и тесты

- `packages/react/src/__tests__/table-perf.test.tsx` (новый или append к существующему `table-virtual.test.tsx`).
- `examples/demo/src/demos/benchmarks/TablePerfProbe.tsx` (новый, временный) — изолированный профайлинг-апп. Удалить в конце или перенести в чистом виде в общую benchmark-инфру.

### Запрещено трогать

- `packages/react/src/components/complex/Table/types.ts` — публичный API типов. Если нужно расширить — добавлять свойства в существующие типы, **никогда не убирать**.
- `packages/react/src/components/complex/Table/index.ts` — публичные экспорты. Не убирай и не переименовывай.
- `packages/react/src/components/complex/Table/ContextMenu.tsx`, `FilterDropdown.tsx`, `export.ts` — UI feature, не runtime hot path.
- `packages/styles/**` — CSS не трогаем (perf эффект CSS — отдельная задача).
- Любые файлы вне зоны выше.

## Чек-лист

### Часть 1 — Профайлинг (60 минут)

1. Найти существующий бенчмарк Table:
   - `rg "Table.*100" examples/demo/src/demos/benchmarks/`
   - Если есть `TableBenchmark.tsx` (T-Quality его планировал создать; может уже быть, может нет) — использовать.
   - Если нет — создать `examples/demo/src/demos/benchmarks/TablePerfProbe.tsx`. 100k rows × 7 cols, virtualized, fixed height ~480px.
2. Запустить `pnpm --filter demo build && pnpm --filter demo exec vite preview` (или dev) → открыть страницу с бенчмарком в Chrome.
3. Профилировать:
   - **Performance tab** → запись 5 сек после mount → найти flame graph пиков.
   - Сохранить .cpuprofile или скриншот flame graph в `docs/_streams/findings/T-Table-Perf-flame-mount.txt` (текстовое описание топ функций; .cpuprofile в репо НЕ коммитим — слишком большой).
   - **Memory tab** → snapshot после mount → топ объекты по retained size.
4. Параллельно — проанализировать код **статически**:
   - `useTableState.ts` — сколько `useState` / `useMemo` / `useEffect`. Зависимости массивов корректны?
   - `Table.tsx` — где вызывается `useSyncExternalStore`/`useWatch` для core engine. Сколько подписок на 100k rows?
   - `TableBody.tsx` vs `VirtualTableBody.tsx` — какой используется при `virtualScroll` пропе? Все ли rows проходят через виртуализацию?
   - `core/engines/table` — на каждый row engine создаёт node? есть ли pooling?

### Часть 2 — Гипотезы и приоритизация

Заполнить таблицу в `findings/T-Table-Perf.md`:

| # | Гипотеза | Где | Сложность фикса | Ожидаемый эффект |
|---|---|---|---|---|
| 1 | ... | путь:строка | low / med / high | x2 / x5 / x10 |

Если sub-3-часовой фикс существует и effect ≥ x2 — **берём в работу** (Часть 3).
Если все фиксы ≥ med сложности — **только записываем**, ничего не трогаем в runtime.

### Часть 3 — Исправление (только low-hanging, до 3 часов кода)

Типичные кандидаты на быстрый win (но не делать вслепую — только после профайлинга подтвердило):

- Убрать `useState`/`useReducer` per-row, заменить на ref + manual notify.
- `React.memo` на TableRow с правильным `arePropsEqual`.
- `useMemo` для derived rows массива.
- Заменить spread `{...row}` на keyed access.
- В core engine: батчинг notify для table operations.
- Убрать subscription per-cell, оставить subscription per-row.
- `requestIdleCallback` для derive-операций.

После каждого фикса — **обязательно** перезамерять (мин. 3 прогона, медиана). Числа писать в отчёт.

### Часть 4 — Финал

```bash
pnpm --filter @skygraph/core typecheck
pnpm --filter @skygraph/core test
pnpm --filter @skygraph/core build
pnpm --filter @skygraph/react typecheck
pnpm --filter @skygraph/react test
pnpm --filter @skygraph/react build
pnpm --filter demo build
```

Все зелёные. Существующий `__tests__/table-virtual.test.tsx` должен продолжать работать без правок.

## Acceptance criteria

- `findings/T-Table-Perf.md` содержит таблицу гипотез, топ-3 hot path, и `.cpuprofile`-описание.
- Если был фикс — `done/T-Table-Perf.md` показывает before/after числа: median mount, scroll FPS (если получилось измерить), heap Δ. Минимум 3 прогона на каждое число.
- Build все 7 команд из Части 4 — зелёные.
- Никакой регрессии на `__tests__/table-virtual.test.tsx`.
- Если фундаментальный фикс невозможен в рамках 3 часов — это **тоже acceptance**: чёткое описание корня в `findings/`.

## Стоп-лист

- НЕ переписывать `core/engines/table/` с нуля.
- НЕ менять публичный API `Table` (пропы, типы, экспорты).
- НЕ трогать CSS.
- НЕ трогать `packages/vue/**`.
- НЕ запускать `pnpm install`.
- НЕ менять зависимости (`tsup`, `vitest` версии и т. д.).
- НЕ удалять и не править существующие тесты, кроме как добавить новый файл `table-perf.test.tsx`.

## Зависимости

- Зона **пересекается** с T-React-Cleanup и T-React-I18n-Styles по `packages/react/src/components/complex/Table/`. Решение: эти стримы **НЕ трогают** Table компоненты (см. их обновлённые стоп-листы). T-Table-Perf — единственный владелец Table runtime в Волне 2.
- Не зависит от T-Quality (T-Quality добавляет benchmark-страницы; T-Table-Perf при необходимости создаёт свой `TablePerfProbe.tsx` сам).

## Финал
Отчёт: `docs/_streams/done/T-Table-Perf.md` с before/after числами или объяснением почему фикс невозможен в scope.
