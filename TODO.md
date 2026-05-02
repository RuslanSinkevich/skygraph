# SkyGraph — TODO

> Реальные хвосты, оставшиеся после серии стримов.
> Каждая запись — кандидат в будущий стрим или мини-стрим.

---

## 1. Большие задачи (отдельные стримы)

### 1.1 Декомпозиция крупных showcases
- `examples/showcases/src/showcases/forms/FormsApp.tsx` (1131 строк)
- `examples/showcases/src/showcases/ecommerce/EcommerceApp.tsx` (1080)
- `examples/showcases/src/showcases/table-kitchen-sink/TableKitchenSinkApp.tsx` (814)
- `examples/showcases/src/showcases/crm/CrmApp.tsx` (545)

Файлы работают и компилируются — рефакторинг косметический, разбить на табы по категориям как уже сделано для `analytics` / `project-tracker`.

### 1.2 Gantt / Timeline / Resource Calendar
Новые complex-компоненты. Не запускалась.

### 1.3 SchemaForm визуальный редактор
Drag-drop конструктор форм над `SchemaForm`. Зависит от `GraphEngine` (готов), но сам редактор не сделан.

### 1.4 Print / PDF
Пользователь явно отложил.

---

## 2. Функциональные расширения

### 2.1 GraphEngine
- **Orthogonal routing с препятствиями** (избегание чужих узлов). Текущий `routeOrthogonal` — простая L-route без коллизий.
- **OBB** (rotated bounds) — сейчас только AABB.
- **Zoom / pan** в `<Diagram>`.
- **Snap-to-grid** при drag.

### 2.2 TableEngine pro
- **Virtualization с динамической высотой** строк.
- **Группировка строк + агрегации** (sum/avg/count поверх grouped row).
- **Расширенные фильтры** — date range, числовые between, множественный select.

### 2.3 Charts
- Animations (path interpolation).
- Interactive crosshair / brushing.

### 2.4 a11y — полное покрытие axe
Расширить `a11y-axe.test.tsx` на компоненты, которые сейчас не проверены автоматически: `Carousel`, `Mentions`, `Cascader`, `VirtualList`, `Rate`, `ColorPicker`, `TimePicker`.

### 2.5 Select styled — accessible name
`Select` (styled, не `unstyled`) рендерит `role="combobox"` на `<div>` без `aria-label` / `aria-labelledby`. `<label>` обёртка не помогает. Прокинуть `aria-label` / `aria-labelledby` через `BaseComponentProps` в DOM. Тест `it.todo('Select (styled) — name via aria-label / aria-labelledby')` в `a11y-axe.test.tsx` поднимется автоматически после фикса.

---

## 3. Технический долг

### 3.1 Локализация demo
- ~480 файлов в `examples/demo/src/demos/<comp>/Variant.demo.tsx` с английским хардкодом.
- `StylingShowcasePage.tsx` (884 строки) — последний `*Page` без локализации.

### 3.2 CSS audit
- 53 действительно-dead CSS classes (после allowlist) — требует ручной ревизии.
- 111 DOM unstyled классов — добавить стили или удалить из JSX.

### 3.3 Удаление deprecated файлов
- `ui/TreeSelect.tsx` / `ui/Transfer.tsx` помечены `@deprecated`. Физическое удаление требует переписать ~11 тестов под complex API.

### 3.4 TS strictness
`pnpm --filter @skygraph/react exec tsc --noEmit` показывает pre-existing ошибки в `Table/TableHeader.tsx` (`RefObject<HTMLDivElement | null>` vs `RefObject<HTMLDivElement>` после React 19). Не блокирует билд (`tsup` расслабляет `noUnused*` для DTS), но хорошо бы починить.

---

## 4. Инфраструктура

### 4.1 ESLint для examples
- `examples-eslint.config.js` + npm-скрипт `lint:examples`. Сейчас `examples/` исключён из основного ESLint конфига с комментарием.

### 4.2 CI шаги
- `audit:styles` — добавить как шаг проверки (фейлить если `_audit/styling-audit.md` изменился).
- Coverage step (config готов, dev-deps установлены — нужно подключить в workflow).

### 4.3 Slow tests
- `table.test.ts > scalability > 100k rows` (~7 секунд) — кандидат в отдельный slow-set (`*.bench.test.ts` с условным skip / флагом `RUN_BENCH=1`).

### 4.4 Subpaths в core
- `@skygraph/core/table` / `@skygraph/core/tree` / `@skygraph/core/virtual` / `@skygraph/core/graph` — отсутствуют как entrypoints в `core/tsup.config.ts`. Если нужен паритет с `@skygraph/react` subpaths — добавить.

---

## 5. Mini-fixes (сделать одним коммитом)

- **`SchemaForm.tsx:75`** — `react-hooks/rules-of-hooks` ошибка: `useConfig` вызван условно (✅ уже починен в Стриме 1, но проверить актуально ли).
- **`Table/Table.tsx:87`** — warning `react-hooks/exhaustive-deps` про `rowNumConfig`.
- **`Tree/Tree.tsx:420`** — warning про missing deps в useCallback.
- **`DatePicker.tsx:980`** — warning unused eslint-disable directive.
- **`SubmitButton`** в `SchemaForm.tsx` — ранее использовал `sg-btn sg-btn-primary` (не существуют), исправлено на `sg-button-*`. Проверить нет ли подобного в других местах.

---

## История стрима

Полный лог стримов и решения по развилкам — в git history (`git log --oneline`). Эфемерные стрим-файлы (`STREAM-CHAT.md`, `STREAM-PLAN.md`, `CYCLE-LOG.md`, `AUDIT.md`) удалены после завершения цикла; их содержимое отражено в коммитах + `AUDIT-POST.md`.
