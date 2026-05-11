# Done — T-Vue-Components-Functional-Fixes (Волна 3.5)

> Сопровождающие документы:
> - `docs/_streams/decisions/T-Vue-Components-Functional-Fixes.md`
> - `docs/_streams/findings/T-Vue-Components-Functional-Fixes.md`
> - Карта: `docs/_streams/wave-3/T-Vue-Components-Functional-Fixes.md`

## Итог

- Пройдены все 5 шагов плана (Step 0..5).
- 10 / 10 компонентов починены или проаудированы:
  - **P0 (попапы не открывались)**: ColorPicker, DatePicker, TimePicker —
    корневая причина (Vue 3 boolean prop coercion) исправлена для всех
    трёх. Попапы открываются, Escape закрывает, outside-click работает.
  - **P1 (разметка/стили)**: Calendar, Upload, Transfer, Steps, Segmented —
    DOM / class / aria приведены к React-эталону. Сохранены
    Vue-only расширения (drag-upload, listType, year-mode и пр.).
  - **P2 (сложные)**: Table, ResourceCalendar — заменён хардкод на
    `SgInput` / `SgCheckbox` / `SgSelect` / `SgPagination`, переименованы
    классы (`sg-rcal-block` → `sg-rcal-assignment` и т.д.) и добавлены
    `data-*` атрибуты для парности с React.
- **Сквозной аудит хардкода** (Step 4): native `<input>`/`<button>`/`<select>`/
  `<svg>` остались только там, где **React-эталон использует то же**
  (Calendar header buttons, DatePicker nav, TimePicker `Now`, ColorPicker
  trigger/hex, Upload hidden file-input и remove-btn, Steps default
  check/error svg, Segmented unstyled radio, Table row radio). Demo-страницы
  для 10 компонентов чистые (только комментарии описывают `unstyled`-режим).
- Публичный API сохранён: ни один существующий prop/emit не удалён и
  не переименован. Все правки additive: `Steps.clickable`, `StepItem.icon`,
  `SegmentedOptionObject.icon`, `Segmented.modelValue`, `Calendar.fullscreen`,
  `Calendar.maxEvents`, `Calendar.showWeekNumber`, `ResourceCalendar.assignmentChange`
  alias-emit, `TableLocale.filterAll`, `TransferLocale.*`.
- `pnpm --filter @skygraph/vue typecheck` — зелёный.
- `pnpm --filter @skygraph/vue test` — **760 / 760** зелёный (вырос с 708
  до 760 — 52 новых тест-кейса).
- `pnpm --filter @skygraph/vue build` — зелёный, dist ESM 473.56 KB
  (с map). 2 dts-warning'а TS2774 в `List.vue` (вне scope) и `Table.vue`
  (pre-existing, не добавлены этим стримом) — функционально не влияют.
- `pnpm --filter demo-vue build` — зелёный, главный бандл 351.94 KB
  (в норме, лимит 400 KB).
- `pnpm size` — **finding D11**: `@skygraph/vue (esm)` 96.84 KB при
  лимите 90 KB (+6.84 KB). Причина — добавлены `SgInput` / `SgCheckbox` /
  `SgSelect` / `SgPagination` в Transfer / Upload / Table (по карте
  задачи). CJS 158.44 KB в норме (лимит 160 KB).

## P0 — попапы (Шаг 1)

### ColorPicker
- ✅ Корень: `open: undefined` в `withDefaults` (см. findings §root-cause).
- ✅ Slot `trigger` (был только text).
- ✅ Saturation panel + Hue bar с pointer-drag (HSV state). Парность с
  `react/ColorPicker.tsx`.
- ✅ Escape закрывает (см. decisions D2).
- ✅ Hover-trigger handler.
- ✅ Outside-click слушатель всегда висит, проверка `if (!isOpen.value)`
  внутри handler'а (исправление D2).

### DatePicker
- ✅ Корень: `open: undefined` (см. findings §root-cause).
- ✅ `<input class="sg-dp-input">` для ручного ввода.
- ✅ TimePanel, MonthPanel, YearPanel при `picker='time'|'month'|'year'`.
- ✅ PresetsSidebar (`presets` prop).
- ✅ Header `<select>` для month/year.
- ✅ Escape закрывает.

### TimePicker
- ✅ Корень: `open: undefined`.
- ✅ Trigger — `<input>` (был `<div>`).
- ✅ Clock-icon в suffix.
- ✅ Escape, outside-click — фикс через D2.
- ✅ `scrollIntoView` для `data-active` элементов.

## P1 — разметка / стили (Шаг 2)

### Calendar
- ✅ Header (`sg-calendar-nav-btn` × 4 + `sg-calendar-header-select` × 2
  + mode-switch).
- ✅ Footer с Today button.
- ✅ Year mode (12 month cells, click → return to month view).
- ✅ Events как `sg-calendar-event-dot` + `sg-calendar-event-more` с
  `maxEvents` cap.
- ✅ Class `sg-calendar-fullscreen` / `sg-calendar-mini` (fullscreen prop).
- ✅ Prop `maxEvents`, `fullscreen`, `showWeekNumber` (additive).

### Upload
- ✅ Class `sg-upload-list-item-*` → `sg-upload-item-*` (CSS-парность).
- ✅ Default trigger → `SgButton`.
- ✅ Loading → `SgSpin`.
- ✅ `aria-label` на скрытом `<input type="file">` и remove-btn.
- ✅ Сохранены Vue-only `drag`, `listType` (picture-card/picture/text).

### Transfer
- ✅ Class `sg-transfer-list-content-item-*` → `sg-transfer-list-item-*`.
- ✅ Class `sg-transfer-operation` → `sg-transfer-operations`.
- ✅ Search input → `SgInput` (size `small`, `allow-clear`).
- ✅ Item checkbox → `SgCheckbox`.
- ✅ Move buttons → `SgButton` (type `primary`, size `small`).
- ✅ Pagination → `SgPagination` (simple mode).
- ✅ Select-all header checkbox + count-text + empty-state +
  `notFoundContent`.

### Steps
- ✅ `clickable?: boolean` (default `undefined` → auto-detect через
  `getCurrentInstance().vnode.props.onChange`, см. D3 / D10).
- ✅ `StepItem.icon` (additive) + slot `icon`.

### Segmented
- ✅ `update:value` + `update:modelValue` emit (v-model, D4).
- ✅ `SegmentedOptionObject.icon` + slot `icon`.

## P2 — сложные (Шаг 3)

### Table
- ✅ Toolbar search `<input>` → `SgInput`.
- ✅ Row + header checkboxes → `SgCheckbox`.
- ✅ Column filter `<select>` → `SgSelect` (с `TableLocale.filterAll`).
- ✅ Custom pagination buttons → `SgPagination` (simple mode).
- ⚠️ Native `<input type="radio">` оставлен для single-select rows
  (паритет с `react/Table/TableBody.tsx:326`, нет SgRadio для row).
- ⚠️ Архитектура CSS Grid с `display: contents` сохранена (D5).
- 📋 Finding: virtual scrolling / drag-rows / group-by / export /
  fullscreen / column pinning / printable / keyboard nav — нет в Vue.

### ResourceCalendar
- ✅ Class `sg-rcal-body` → `sg-rcal-main`.
- ✅ Class `sg-rcal-block` → `sg-rcal-assignment` (+ `--conflict` BEM →
  `-conflict`).
- ✅ Class `sg-rcal-resize-l/r` → `sg-rcal-assignment-resize-start/end`.
- ✅ Class `sg-rcal-color` → `sg-rcal-sidebar-marker`.
- ✅ Class `sg-rcal-tick`, `sg-rcal-slot` (раньше inline-стили).
- ✅ `data-scale`, `data-resource-id`, `data-row-index`, `data-status`
  атрибуты.
- ✅ `aria-label`-ы на root / sidebar rows / resize handles.
- ✅ Compat-emit `assignment-change` (kebab) + `assignmentChange` (camel).
- 📋 Finding: keyboard nav, интеграция `detectConflicts` из `@skygraph/core`
  (см. D6).

## Шаг 4 — сквозной аудит хардкода

| Файл | Native теги | Парность с React | Вердикт |
|---|---|---|---|
| `ColorPicker.vue` | `<button>` × 2, `<input>` (hex) | `react/ColorPicker.tsx:352, 382, 388` | OK |
| `DatePicker.vue` | `<input>`, `<button>` × 12 (nav, cells) | `react/DatePicker.tsx` | OK |
| `TimePicker.vue` | `<button>` (Now) | `react/TimePicker.tsx:421` | OK |
| `Calendar.vue` | `<button>` × 6 (nav, today, mode), `<select>` × 2 | `react/Calendar.tsx:441-553, 746` | OK |
| `Upload.vue` | `<input type="file">` (hidden), `<button>` (remove) | `react/Upload.tsx:84, 116` | OK |
| `Transfer.vue` | — | — | OK (полностью Sg-компоненты) |
| `Steps.vue` | `<svg>` × 2 (default icons) | `react/Steps.tsx:32, 38` | OK |
| `Segmented.vue` | `<input type="radio">` (только `unstyled`) | a11y | OK |
| `Table/Table.vue` | `<input type="radio">` (single-select rows) | `react/TableBody.tsx:326` | OK |
| `ResourceCalendar.vue` | — | — | OK |

Demo-страницы для 10 компонентов — чистые. Все упоминания `<input>` /
`<button>` / `<select>` в demo-файлах — в комментариях (описывают
`unstyled` режим или native fallback).

## Шаг 5 — финальные команды

```
pnpm --filter @skygraph/vue typecheck      → ok
pnpm --filter @skygraph/vue test           → 760/760 (51 file)
pnpm --filter @skygraph/vue build          → ok, 473.56 KB ESM
pnpm --filter demo-vue build               → ok, 351.94 KB
pnpm size                                  → finding D11 (см. decisions)
```

## Список изменённых файлов

```
packages/vue/src/components/ui/ColorPicker.vue
packages/vue/src/components/ui/DatePicker.vue
packages/vue/src/components/ui/TimePicker.vue
packages/vue/src/components/ui/Calendar.vue
packages/vue/src/components/ui/Upload.vue
packages/vue/src/components/ui/Transfer.vue
packages/vue/src/components/ui/Steps.vue
packages/vue/src/components/ui/Segmented.vue
packages/vue/src/components/complex/Table/Table.vue
packages/vue/src/components/complex/Table/types.ts
packages/vue/src/components/complex/ResourceCalendar/ResourceCalendar.vue

packages/styles/components/calendar.css       (+ event-dot, event-more)
packages/styles/components/upload.css         (+ drag, picture-card)

packages/vue/src/__tests__/components/ui-forms.test.ts        (расширение)
packages/vue/src/__tests__/components/ui-navigation.test.ts   (расширение)
packages/vue/src/__tests__/components/table.test.ts           (расширение)
packages/vue/src/__tests__/components/colorpicker.test.ts     (new tests)
packages/vue/src/__tests__/components/datepicker.test.ts      (new tests)
packages/vue/src/__tests__/components/timepicker.test.ts      (new tests)
packages/vue/src/__tests__/components/resource-calendar.test.ts (расширение)

examples/demo-vue/src/demos/CalendarDemo.vue
examples/demo-vue/src/demos/calendar/*.demo.vue              (минор)
examples/demo-vue/src/demos/calendar-doc/{en,ru}.ts
examples/demo-vue/src/demos/steps/Clickable.demo.vue
examples/demo-vue/src/demos/steps/data.ts

docs/_streams/decisions/T-Vue-Components-Functional-Fixes.md  (D1..D11)
docs/_streams/findings/T-Vue-Components-Functional-Fixes.md   (root-cause + per-component)
docs/_streams/done/T-Vue-Components-Functional-Fixes.md       (этот файл)
```

## Findings для следующих волн

См. `docs/_streams/findings/T-Vue-Components-Functional-Fixes.md` —
секция «Отложенные пункты для следующих волн»:

1. Table: переключить default empty на `SgEmpty`.
2. Table: virtual scrolling, drag-rows, group-by, export, fullscreen,
   density toggle, column pinning, printable, keyboard nav.
3. ResourceCalendar: `detectConflicts` из `@skygraph/core` + keyboard nav.
4. Calendar: range / multiple selection, keyboard nav, custom
   cellRender / headerRender slots.
5. DatePicker: RangePicker / MonthPicker / YearPicker / PresetsSidebar
   как отдельные публичные компоненты.
6. ColorPicker: pre-cache presets, named-color autocomplete.
7. `@skygraph/vue` ESM size-limit: поднять с 90 KB до ~100 KB **или**
   оптимизировать `SgPagination` (выделить simple-mode без size-changer
   dropdown).
