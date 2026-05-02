# SkyGraph — TODO

> Реальные хвосты, оставшиеся после серии стримов (round 1..8 + 8.1 regression sweep).
> Каждая запись — кандидат в будущий стрим или мини-стрим.
>
> Финальные числа: **779 active + 2 todo тестов**, `tsc --noEmit` ✅, `eslint` ✅, `check:styles` ✅.

---

## 1. Большие задачи (отдельные стримы)

### 1.1 Gantt / Timeline / Resource Calendar
Новые complex-компоненты. Не запускалась.

### 1.2 SchemaForm визуальный редактор
Drag-drop конструктор форм над `SchemaForm`. Базовые блоки — `GraphEngine` (готов), `useForm` (готов), `Diagram` (drag/zoom/snap — готовы). Сам редактор не сделан.

### 1.3 Print / PDF
Пользователь явно отложил.

---

## 2. Функциональные расширения

### 2.1 TableEngine — оставшиеся пункты pro
- ✅ ~~Расширенные фильтры~~ (round 8 Tab C).
- ✅ ~~Группировка строк + агрегации~~ (round 8 Tab C).
- **Virtualization с динамической высотой** строк (есть с фиксированной).

### 2.2 Charts — оставшиеся пункты pro
- ✅ ~~Animations~~ (round 8 Tab D, pure-CSS, prefers-reduced-motion-aware).
- ✅ ~~Interactive crosshair~~ (round 8 Tab D, новый `<ChartCrosshair>`).
- **Brushing** (выбор диапазона по drag для zoom).

### 2.3 GraphEngine — закрыто, дополнительных пунктов нет
- ✅ ~~Orthogonal routing с препятствиями~~ (round 8 Tab B, `routeOrthogonal(start, end, { obstacles })` — A* по сетке с fallback на L-route).
- ✅ ~~OBB (rotated bounds)~~ (round 8 Tab B, `getNodeOBB`, `aabbFromOBB`, `obbCorners`, `obbContainsPoint`).
- ✅ ~~Zoom / pan~~ в `<Diagram>` (round 8 Tab B, Ctrl+wheel + middle-button drag).
- ✅ ~~Snap-to-grid~~ при drag (round 8 Tab B).

### 2.4 a11y — расширить axe-coverage
Расширить `a11y-axe.test.tsx` на компоненты, которые сейчас не проверены автоматически: `Carousel`, `Mentions`, `Cascader`, `VirtualList`, `Rate`, `ColorPicker`, `TimePicker`. Один из этих находится в активном `it.todo`.

### 2.5 ✅ Select styled — accessible name
Закрыто round 8 Tab D: `aria-label?` / `aria-labelledby?` пробрасываются в `role="combobox"`.

---

## 3. Технический долг

### 3.1 Локализация demo
- ~480 файлов в `examples/demo/src/demos/<comp>/Variant.demo.tsx` с английским хардкодом.
- `StylingShowcasePage.tsx` (884 строки) — последний `*Page` без локализации.

### 3.2 CSS audit
- 53 действительно-dead CSS classes (после allowlist) — после round 8 нужно перегенерировать `_audit/styling-audit.md` (`pnpm audit:styles`).
- 111 DOM unstyled классов — добавить стили или удалить из JSX.
- Перепроверить новые классы round 8: `sg-chart-*-animate`, `sg-chart-crosshair*`, `sg-diagram-grid`, `sg-table-group-row`, `sg-filter-advanced-*`.

### 3.3 Удаление deprecated файлов
- `ui/TreeSelect.tsx` / `ui/Transfer.tsx` помечены `@deprecated`. Физическое удаление требует переписать ~11 тестов под complex API.

### 3.4 ✅ TS strictness
Закрыто round 8.1: `tsc --noEmit` для react чисто. Pre-existing ошибки в `Table/TableHeader.tsx` ушли вместе с обновлёнными типами в round 8 Tab C, а `useTableState.ts` починен подключением `persistColumnWidth`.

---

## 4. Инфраструктура

### 4.1 ESLint для examples
- `examples-eslint.config.js` + npm-скрипт `lint:examples`. Сейчас `examples/` исключён из основного ESLint конфига с комментарием.

### 4.2 CI шаги
- `audit:styles` — добавить как шаг проверки (фейлить если `_audit/styling-audit.md` изменился).
- Coverage step (config готов, dev-deps установлены — нужно подключить в workflow).

### 4.3 Slow tests
- `table.test.ts > scalability > 100k rows` (~7–13 секунд) — кандидат в отдельный slow-set (`*.bench.test.ts` с условным skip / флагом `RUN_BENCH=1`).

### 4.4 Subpaths в core
- `@skygraph/core/table` / `@skygraph/core/tree` / `@skygraph/core/virtual` / `@skygraph/core/graph` — отсутствуют как entrypoints в `core/tsup.config.ts`.

---

## 5. Mini-fixes — все закрыты

- ✅ `SchemaForm.tsx` — `useConfig` вызван условно. Закрыто Стрим 1.
- ✅ `Table/Table.tsx` — `rowNumConfig` conditional → `useMemo`. Закрыто round 8.1.
- ✅ `Tree/Tree.tsx` — `handleKeyDown` missing deps. Закрыто Tab D.
- ✅ `DatePicker.tsx` — unused eslint-disable. Закрыто Tab D.
- ✅ `useFieldArray.ts` — `genKey` missing in deps двух callbacks. Закрыто round 8.1.
- ✅ `SubmitButton` — `sg-btn` → `sg-button`. Закрыто ранее.

---

## История стрима

Полный лог стримов и решения по развилкам — в git history (`git log --oneline`). Эфемерные стрим-файлы (`STREAM-CHAT.md`, `STREAM-PLAN.md`, `CYCLE-LOG.md`, `AUDIT.md`, `TODO-cycle.md`) удалены после завершения цикла; их содержимое отражено в коммитах + `AUDIT-POST.md`.
