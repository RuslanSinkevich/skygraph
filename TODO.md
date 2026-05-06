# SkyGraph — TODO

> Реальные хвосты, оставшиеся после серии стримов (round 1..9 + 9.1 closeout sweep).
> Каждая запись — кандидат в будущий стрим или мини-стрим.
>
> Статус на 2026-05-06: 4 параллельных таба round 9 (A/B/C/D) закоммичены, плюс:
>  - две волны i18n-миграции demo (`009747f`, `e38a678`),
>  - round 9.1 closeout (`cecf266` infra eslint, `3a4a342` Slider/Rate fixes, `95d4aea` ButtonDemo i18n + DistributedComposition).
>
> Все гейты зелёные: `pnpm exec eslint packages/` 0 errors, `pnpm lint:examples` 0 errors,
> `pnpm check:styles` OK, `pnpm -r test` — 351 + 1 skipped (core, bench-gated) +
> 509 (react) = **860 active**, `pnpm -r build` — все пакеты + demo + showcases
> собираются.

---

## 1. Большие задачи (отдельные стримы)

### 1.1 ✅ Gantt / EventTimeline
Закрыто tab A round 9: `Gantt` (drag/resize/dependencies/resources) и `EventTimeline` (groupBy day/month/year, horizontal/vertical) — новые complex-компоненты в `packages/react/src/components/complex/{Gantt,Timeline}/`. +38 тестов, 4 demo.

> Resource Calendar (отдельный конструктор смен/расписаний) — отдельный
> кандидат, требует своей доменной модели (assignments, shifts, conflicts).
> Не запускалась.

### 1.2 SchemaForm визуальный редактор
Drag-drop конструктор форм над `SchemaForm`. Базовые блоки готовы: `GraphEngine`, `useForm`, `Diagram` (drag/zoom/snap). Сам редактор не сделан.

### 1.3 Print / PDF
Пользователь явно отложил.

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

### 2.3 GraphEngine — закрыто, дополнительных pro-пунктов нет
- ✅ Orthogonal routing с препятствиями (round 8 Tab B).
- ✅ OBB / rotated bounds (round 8 Tab B).
- ✅ Zoom / pan в `<Diagram>` (round 8 Tab B).
- ✅ Snap-to-grid при drag (round 8 Tab B).
- ✅ Undo/redo (round 7 Tab C).

### 2.4 ✅ a11y axe-coverage
Закрыто tab C round 9: оба `it.todo` (`ColorPicker`, `TimePicker`) переведены в активные тесты после добавления `aria-label` / `aria-labelledby` (в `ColorPicker` триггер дополнительно перешёл с `<div>` на `<button>` ради `aria-allowed-attr`). Добавлены тесты для `Cascader (open)` и `VirtualList`. Все 7 ранее непокрытых компонентов из исходного списка теперь проверяются (`Carousel`, `Mentions`, `Cascader`, `VirtualList`, `Rate`, `ColorPicker`, `TimePicker`).

### 2.5 ✅ Select styled — accessible name
Закрыто round 8 Tab D: `aria-label?` / `aria-labelledby?` пробрасываются в `role="combobox"`.

---

## 3. Технический долг

### 3.1 Локализация demo (в работе, ~85% осталось)
- Шаблон: `examples/demo/src/i18n/useDemoStrings.ts` (батч-1) и
  `examples/demo/src/demos/<comp>-doc/{en,ru}.ts` + `use<Comp>DocStrings.ts`
  (round 9.1 ButtonDemo — для page-level ComponentDoc).
- Сделано:
  - Round 9 — 37 файлов `<comp>/Variant.demo.tsx` через `useDemoStrings` (`009747f`).
  - Round 9 — ещё ~25 файлов (dropdown/select/switch/segmented/rate, `e38a678`).
  - Round 9.1 — `ButtonDemo.tsx` page (props + cssVars descriptions, `95d4aea`).
- Осталось:
  - ~400 файлов `examples/demo/src/demos/<comp>/Variant.demo.tsx` с английским хардкодом.
  - Page-level ComponentDoc для остальных компонентов: повторить паттерн `button-doc/`.
  - `StylingShowcasePage.tsx` (884 строки) — последний `*Page` без локализации.

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
импортируется и инстанциируется через subpath.

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
