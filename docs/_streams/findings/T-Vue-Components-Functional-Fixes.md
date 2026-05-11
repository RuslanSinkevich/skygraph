# T-Vue-Components-Functional-Fixes — findings

> Stream: T-Vue-Components-Functional-Fixes (Wave 3.5).
> Append-only журнал расхождений / отложенных пунктов.

## Шаг 0. Repro / расхождения с React-эталоном (статический анализ)

Сравнение делалось по исходникам React vs Vue. Прокликивание dev-серверов
не использовалось (CLI-режим автономного агента), но воспроизведение
багов нашлось в коде и расхождениях с CSS, что объясняет жалобы
пользователя.

### ⭐ КОРНЕВАЯ ПРИЧИНА «попап не открывается» — Vue 3 boolean coercion

Все три P0-компонента (ColorPicker / DatePicker / TimePicker) имели
один и тот же баг: декларация `open?: boolean` без `default: undefined`
в `withDefaults`. В Vue 3 у Boolean-пропа без default значение
**коэрсится в `false`**, даже если родитель ничего не передал.

В коде используется:
```ts
const isOpen = computed(() => props.open ?? internalOpen.value)
```

Из-за коэрсии `props.open === false` (а не `undefined`), и тогда
`false ?? internalOpen.value === false` — **всегда**. internal-state
никогда не «всплывает». Это причина, по которой пользователь видит,
что попап «не открывается».

**Фикс:** добавить `open: undefined` в `withDefaults` для всех трёх
компонентов:

```ts
const props = withDefaults(defineProps<Props>(), {
  // ...
  open: undefined,
})
```

После этого `props.open === undefined` пока родитель не передал
`:open="..."`, и `?? internalOpen.value` работает.

Подтверждено: 726/726 тестов зелёные после фикса.

### P0. ColorPicker (`packages/vue/src/components/ui/ColorPicker.vue`)

- ❌ Нет saturation-panel (`.sg-colorpicker-saturation`) и hue-bar
  (`.sg-colorpicker-hue`) — в React и CSS эти секции есть, в Vue
  отсутствуют. Открытый «попап» без видимой палитры → пользователь
  считает, что попап не открылся.
- ❌ Нет HSV-state, нет SaturationPanel-drag и Hue-drag.
- ❌ Outside-click слушатель висит постоянно (`onMounted`) вместо
  `if (isOpen)` — лишние эмиты, но не блокирует открытие.
- ❌ Нет закрытия по `Escape`.
- ❌ Нет hover-trigger handler (если `trigger="hover"` — попап не
  откроется, в React есть `onMouseEnter`).

### P0. DatePicker (`packages/vue/src/components/ui/DatePicker.vue`)

- ❌ Реализован только базовый date-режим. Нет: TimePanel (showTime
  игнорируется), MonthPanel/YearPanel (picker='month'/'year' выводят
  всё ту же date-сетку), PresetsSidebar, RangePicker, header-`select`,
  inputReadOnly, placement, calendar-icon.
- ❌ `<button class="sg-dp-nav-btn" @click="viewYear--">` — нет
  `type="button"`, `aria-label`, `title`. У React всё есть.
- ❌ Нет Escape (в React: `keyDown === 'Escape'` → close).
- ❌ Текст не вводится (Vue использует `<span>`, React — `<input>` для
  ручного ввода).
- ❌ Outside-click слушатель висит постоянно.
- ❌ Нет icon-svg / clear-x → в Vue только `×` для clear.

### P0. TimePicker (`packages/vue/src/components/ui/TimePicker.vue`)

- ❌ Trigger — `<div>`, нет input.
- ❌ Outside-click слушатель висит постоянно.
- ❌ Нет Escape.
- ❌ Нет clock-icon в suffix.
- ❌ Колонки времени без `data-active` отображения и `scrollIntoView`
  (есть `data-active` но нет use-effect для scroll).

### P1. Calendar (`packages/vue/src/components/ui/Calendar.vue`)

- ❌ React Calendar — это complex-компонент (`complex/Calendar/`) с
  большим API: `fullscreen`, year mode, month/year select, range/multi,
  keyboard, headerRender/cellRender, week numbers, footer с
  Today/Clear. Vue Calendar — только базовый month-grid.
- ❌ Header: React — `header-left | header-center | header-right` с
  селектами month/year и mode-switch. Vue — единый header с двумя prev/next.
- ❌ Класс `sg-calendar-fullscreen` / `sg-calendar-mini` — нет в Vue.
- ❌ Нет footer с Today button.
- ❌ Нет prev-year / next-year навигации.
- ❌ События отображаются как `<ul><li>{text}</li></ul>`, React — как
  цветные dots + `+N` more. CSS под React-вариант.
- ❌ Prop `showWeekNumbers` (Vue) vs `showWeekNumber` (React) — несовпадение
  имени (но опциональный, в API оставить).
- ❌ Native `<button class="sg-calendar-nav">` — должно быть
  `<button class="sg-calendar-nav-btn">` (React-имя класса).

### P1. Upload (`packages/vue/src/components/ui/Upload.vue`)

- ❌ Класс `.sg-upload-list-item` (Vue) vs `.sg-upload-item` (React и
  `packages/styles/components/upload.css`). CSS использует
  `sg-upload-item-*`, Vue называет их `sg-upload-list-item-*` → стили
  не применяются.
- ❌ `<button class="sg-upload-button">Upload</button>` — нативная,
  должна быть `<SgButton>` (как в React).
- ❌ Vue имеет drag-area и `listType` (text/picture/picture-card) —
  React этого нет. Сохраняем как Vue-only расширение (additive),
  но обеспечиваем что в режиме `drag=false` DOM соответствует React.

### P1. Transfer (`packages/vue/src/components/ui/Transfer.vue`)

- ❌ Класс `.sg-transfer-list-content-item` (Vue) vs
  `.sg-transfer-list-item` (React).
- ❌ Класс `.sg-transfer-list-content-item-checked` (Vue) vs
  `.sg-transfer-list-item-selected` (React).
- ❌ Класс `.sg-transfer-operation` (Vue) vs `.sg-transfer-operations`
  (React, множ. число).
- ❌ Search input — нативный `<input>` без обёртки. React: div+SgInput.
- ❌ Нет `sg-transfer-list-body` обёртки, нет `sg-transfer-list-empty`.
- ❌ Native `<input type="checkbox">` вместо `<SgCheckbox>`.
- ❌ Native `<button class="sg-transfer-operation-btn">›</button>`
  вместо `<SgButton type="primary" size="small">→</SgButton>`.
- ❌ Нет `select-all` checkbox в header.
- ❌ Нет count-text `(N/M items)` в header.

### P1. Steps (`packages/vue/src/components/ui/Steps.vue`)

- ⚠️ В Vue `hasOnChange = computed(() => true)` — всегда `clickable=true`.
  В React clickable определяется по `!!onChange`. В Vue идиоматически
  на эмит подписаны через template, узнать программно «есть ли
  подписчик» нельзя. **Решение** (decision): добавить optional prop
  `clickable?: boolean` (default `true` для совместимости) + поведение
  не меняется. Не сломает API.
- ❌ Нет поддержки `item.icon` — у React в `StepItem` есть `icon?`.
  Добавим (additive).

### P1. Segmented (`packages/vue/src/components/ui/Segmented.vue`)

- ❌ Нет рендера `opt.icon` — у React `SegmentedOption.icon`.
- ⚠️ Нет emit `update:value` / `update:modelValue`. Сейчас compatible
  только через `@change`. **Решение** (decision): добавить emit
  `update:value` (additive) — `v-model:value` начнёт работать.
- ❌ Использует `defineProps` без TypeScript-only — должно быть
  `withDefaults(defineProps<Props>(), {...})` как в остальных. Это
  идиоматика, не функционально баг (но сделаем заодно для парности).

### P2. Table (`packages/vue/src/components/complex/Table/Table.vue`)

- ⚠️ Архитектурная разница: React использует `<table>/<thead>/<tbody>`,
  Vue — CSS Grid с `display: contents`. Это намеренный выбор,
  переписывать не будем (карта: «без переписывания engine»).
- ❌ Хардкод: search input — нативный `<input class="sg-input">`.
  Должен быть `<SgInput type="search">`.
- ❌ Хардкод: pagination кнопки — нативные `<button class="sg-table-toolbar-btn">`.
  Должна быть `<SgPagination>`.
- ❌ Хардкод: native `<input type="checkbox">` / `<input type="radio">`
  в selection cell. Должны быть `<SgCheckbox>` / `<SgRadio>`.
- ❌ Хардкод: filter — нативный `<select>`. У React есть `FilterDropdown`,
  но это сложный sub-компонент. Vue упростил — оставим, но decision.
- ❌ Empty state — слот, но default — просто текст. React имеет
  `emptyContent` prop + `SgEmpty` под ним. Заменим default на
  `<SgEmpty>`.
- ⚠️ Огромное расхождение фич: virtual scrolling, drag-rows, group-by,
  export, fullscreen, density toggle, column auto-resize, column pinning,
  printable, keyboard nav — все есть у React, нет у Vue. Это finding,
  не пытаемся реализовать (карта: «фичи большие → finding»).

### P2. ResourceCalendar (`packages/vue/src/components/complex/ResourceCalendar/`)

- ❌ Внешний контейнер: React — `display: grid` с `gridTemplateColumns`,
  Vue — `display: flex`. CSS под grid в React.
- ❌ Класс `sg-rcal-body` (Vue) vs `sg-rcal-main` (React).
- ❌ Класс `sg-rcal-block` (Vue) vs `sg-rcal-assignment` (React).
- ❌ Класс `sg-rcal-block--conflict` (BEM) vs `sg-rcal-assignment-conflict`.
- ❌ Класс `sg-rcal-resize-l/r` (Vue) vs `sg-rcal-assignment-resize-start/end`.
- ❌ Класс `sg-rcal-color` (Vue) vs `sg-rcal-sidebar-marker` (React).
- ❌ Vue inline-стили на header tick'ах (нет `sg-rcal-tick` класса).
- ❌ Vue inline-стили на slot dividers (нет `sg-rcal-slot` класса).
- ❌ Vue нет `sg-rcal-availability-off` (rules).
- ❌ Vue нет `data-*` атрибутов (`data-row-index`, `data-resource-id`,
  `data-tick-time`, `data-slot-time`, `data-status`, `data-scale`).
- ❌ Vue нет keyboard-handler.
- ❌ Vue использует своё local-conflict-detection вместо
  `detectConflicts` из `@skygraph/core`. **Будет finding** — не лезу в
  core (не моя зона). Но переименование класса с BEM на React-стиль
  делаем.

## Шаг 4 (Сквозной аудит). Hardcode-audit результаты

Прошёл по всем 10 компонентам + их демо-страницам. Для каждого случая
сверял с React-эталоном (`packages/react/src/components/{ui,complex}/...`).

### Native `<input>`/`<button>`/`<select>` — оставлены преднамеренно

Эти native-теги остались в Vue **умышленно** — React-эталон тоже использует
их в этих местах, замена сломала бы парность по DOM:

- `Calendar.vue` — `<button class="sg-calendar-nav-btn">`,
  `<select class="sg-calendar-header-select">`, `<button class="sg-calendar-today-btn">`,
  `<button class="sg-calendar-mode-switch">`. Парность с
  `react/Calendar.tsx:441-448, 537-553, 746`.
- `DatePicker.vue` — навигационные `<button class="sg-dp-nav-btn">`,
  ячейки `<button class="sg-dp-cell">`, инпут `<input class="sg-dp-input">`.
  Парность с `react/DatePicker.tsx:413-448, 927, 1026-1044`.
- `TimePicker.vue` — `<button class="sg-tp-now-btn">Now</button>`. Парность
  с `react/TimePicker.tsx:421`.
- `ColorPicker.vue` — `<button class="sg-colorpicker-trigger">`,
  `<input class="sg-colorpicker-input">` (hex), `<button class="sg-colorpicker-preset-color">`.
  Парность с `react/ColorPicker.tsx:352, 382, 388`.
- `Upload.vue` — `<input type="file" class="sg-upload-input">` (hidden),
  `<button class="sg-upload-item-remove">`. Парность с
  `react/Upload.tsx:84, 116`. Триггер — `SgButton`.
- `Steps.vue` — `<svg viewBox="64 64 896 896">` для check/error дефолтных
  иконок. Парность с `react/Steps.tsx:32, 38`.
- `Segmented.vue` — `<input type="radio">` только в `unstyled`-режиме
  (для a11y). В styled-режиме — div+role=radio.
- `Table.vue` — `<input type="radio">` (single-select rows) — у React
  то же самое в `TableBody.tsx:326`. SgRadio в @skygraph/vue — group-only,
  не подходит для контекста row.

### Sg-компоненты, использованные после фикса (Step 2 / Step 3)

- **Calendar**: нативная разметка (по React) + добавлен `SgPagination` не
  используется (Calendar не имеет пагинации в React).
- **Upload**: `SgButton` (default trigger), `SgSpin` (loading индикатор).
- **Transfer**: `SgInput` (search), `SgCheckbox` (item + select-all),
  `SgButton` (move ops), `SgPagination` simple.
- **Steps**: native `<svg>` icons (parity), `sg-steps-icon-custom` slot.
- **Segmented**: всё нативно, без `Sg*`-обёрток (parity).
- **Table**: `SgInput` (toolbar search), `SgCheckbox` (multi-select rows
  + header), `SgSelect` (column filter), `SgPagination` simple.
- **ResourceCalendar**: всё через CSS-классы (parity, нет inputs/buttons).
- **ColorPicker/DatePicker/TimePicker**: остались native (parity).

### Spinner / Empty / Pagination

- Все три (ColorPicker / DatePicker / TimePicker) используют
  `<span class="sg-spin sg-spin-small">` — это допустимый inline-вариант
  по карте задачи.
- Table — `<SgPagination>` (simple mode).
- Transfer — `<SgPagination>` (simple mode).
- Table empty-state — slot `empty` с локализованным текстом по умолчанию
  (как у React Table — `emptyText` в локали). `<SgEmpty>` намеренно
  не подключал, т.к. React Table тоже не вкладывает SgEmpty внутрь
  body — выводит текст. Это finding для будущих волн (single source of
  truth для empty в Table).

### Demo pages

Прошёл по `examples/demo-vue/src/demos/{colorpicker,datepicker,timepicker,calendar,upload,transfer,steps,segmented,table,resource-calendar}/**`:
- Никаких сырых `<input>`/`<button>`/`<select>`/`<svg>` в template не
  найдено. Все упоминания — в комментариях (`Accept.demo.vue`,
  `CustomTrigger.demo.vue`, `Unstyled.demo.vue`) и они описывают
  семантику Sg-компонента/native fallback (`unstyled` режим).

### API-замечания

Ничего, что бы ломало API. Все замены — внутри компонентов:
- Добавлены опциональные props: `Steps.clickable`, `StepItem.icon`,
  `SegmentedOptionObject.icon`, `Segmented.modelValue`, `Calendar.maxEvents`,
  `Calendar.fullscreen`, `ResourceCalendar.assignmentChange` (alias-emit
  для совместимости).
- Локаль `TableLocale.filterAll` добавлена (для `SgSelect` placeholder).
- Локаль `TransferLocale` дополнена `selectAll` / `deselectAll` /
  `searchPlaceholder` / `itemUnit` / `itemsUnit` / `notFoundContent`.

## Отложенные пункты для следующих волн

- **Table**: переключить default empty на `SgEmpty` после согласования
  с React-эталоном (там тоже нет, но желательно унифицировать).
- **Table**: virtual scrolling, drag-rows, group-by, export, fullscreen,
  density toggle, column pinning, printable, keyboard nav — все есть у
  React, нет у Vue.
- **ResourceCalendar**: интегрировать `detectConflicts` из `@skygraph/core`
  вместо локальной реализации (не лезу в core пакет).
- **ResourceCalendar**: keyboard navigation (нет в Vue).
- **Calendar**: range/multiple selection, keyboard nav, custom
  cell/headerRender slots (есть у React).
- **DatePicker**: RangePicker, MonthPicker, YearPicker, PresetsSidebar
  как отдельные публичные компоненты (есть у React, в Vue только
  внутренние режимы через `picker` prop, и не все).
- **ColorPicker**: кеширование пресетов, named-color autocomplete (есть
  у React).
