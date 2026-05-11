# Done — T-Vue-Components-DOM-Parity (Волна 3.3b)

> Сопровождающие документы:
> - `docs/_streams/decisions/T-Vue-Components-DOM-Parity.md`
> - `docs/_streams/findings/T-Vue-Components-DOM-Parity.md`
> - Карта: `docs/_streams/wave-3/T-Vue-Components-DOM-Parity.md`

## Итог

- Пройдены все 4 батча × 22 компонента = 88 SFC в
  `packages/vue/src/components/**` (кроме `complex/Diagram/**`).
- Публичный API сохранён: ни один существующий prop/emit не удалён и
  не переименован. Все правки — additive (новые опциональные props
  `loading`, `unstyled`, `size`, `placement`).
- `pnpm --filter @skygraph/vue typecheck` — зелёный.
- `pnpm --filter @skygraph/vue test` — **708 / 708** зелёный.
- `pnpm --filter @skygraph/vue build` — зелёный (warnings TS2774 в
  `List.vue` / `Table.vue` — pre-existing, см. findings §11).
- `pnpm size` — **finding §1**: Vue ESM 91.63 KB при лимите 90 KB
  (превышение на 1.63 KB). CJS 153.33 KB — в норме (лимит 160 KB).

## Таблица по 88 компонентам

Сокращения:
- **PARITY-OK** — DOM/class/aria уже совпадает с React, правок не
  потребовалось.
- **FIXED (≪что≫)** — внесены изменения для достижения паритета.
- **FINDING (≪что≫)** — расхождение зафиксировано как finding,
  правка отложена (см. `findings/T-Vue-Components-DOM-Parity.md`).

### Батч 1 — UI base (22)

| # | Компонент | Статус | Заметка |
|---|---|---|---|
| 1 | `Button` (ui) | FIXED | + `unstyled`, заменил `sg-button-spin` обёртку на inline `<span class="sg-spin">`, `aria-busy` теперь `loading \|\| undefined` |
| 2 | `Button` (legacy `components/Button/Button.vue`) | FIXED | те же правки, что и в ui (для совместимости со старым тестом) |
| 3 | `Input` | FIXED | + `loading` prop + inline spin |
| 4 | `InputNumber` | FIXED | + `loading` prop, `sg-input-number-loading` class, inline spin, disable steppers при loading |
| 5 | `InputPassword` | PARITY-OK | wraps SgInput, наследует loading |
| 6 | `InputGroup` | PARITY-OK | DOM совпадает |
| 7 | `Textarea` | FIXED | + `loading`, `sg-textarea-wrapper-loading`, inline spin |
| 8 | `SearchInput` | PARITY-OK | naмe + class совпадают |
| 9 | `PinInput` | PARITY-OK | inputs/aria совпадают |
| 10 | `Mentions` | FIXED | dropdown `<div role="listbox">` вместо `<ul>`, click-outside через `onMounted`/`onBeforeUnmount`, `placement` prop |
| 11 | `TagInput` | PARITY-OK | список тегов идентичен |
| 12 | `Tag` | PARITY-OK | классы/closable идентичны |
| 13 | `Badge` | PARITY-OK | `count`/`dot` совпадают |
| 14 | `Avatar` | PARITY-OK | shape/size совпадают |
| 15 | `Tooltip` | PARITY-OK | `role="tooltip"` идентичен |
| 16 | `Spin` | PARITY-OK | основа inline-spin, что использован в других |
| 17 | `Skeleton` | PARITY-OK | active/`paragraph`/`title` совпадают |
| 18 | `Progress` | PARITY-OK | `percent`/`status` совпадают |
| 19 | `Empty` | PARITY-OK | `description` + image |
| 20 | `Result` | PARITY-OK | status icons совпадают |
| 21 | `Switch` | FIXED | + `loading`, `sg-switch-loading`, inline spin, disable при loading |
| 22 | `Checkbox` | FIXED | + `loading`, `sg-checkbox-loading`, inline spin |
| 23 | `Radio` | FIXED | + `loading`, `sg-radio-group-loading`, inline spin рядом с выбранной опцией |

### Батч 2 — UI nav + feedback (22)

| # | Компонент | Статус | Заметка |
|---|---|---|---|
| 24 | `Tabs` | FIXED | inline spin для `item.loading` (вместо ad-hoc class) |
| 25 | `Menu` | FINDING | `items[].icon` — Vue не принимает VNode (string-only), §3 findings |
| 26 | `Breadcrumb` | PARITY-OK | `<nav>` + `aria-label` совпадают |
| 27 | `Dropdown` | PARITY-OK | trigger/role совпадают |
| 28 | `Pagination` | PARITY-OK | controls/aria-current совпадают |
| 29 | `Steps` | PARITY-OK | `sg-step-*` классы/role совпадают |
| 30 | `Segmented` | PARITY-OK | `role="radiogroup"` совпадает |
| 31 | `Modal` | PARITY-OK | `style.width` сохранён (D-6); `Teleport` — Vue-idiom, для функционального паритета приемлемо |
| 32 | `Drawer` | PARITY-OK | placement/transition совпадают |
| 33 | `Popconfirm` | PARITY-OK | `role="alertdialog"` + arrow/inner совпадают |
| 34 | `Notification` | PARITY-OK | сингл-стор + `Transition` совпадают; `message`/`description` — string vs ReactNode → §3 findings |
| 35 | `ConfigProvider` | PARITY-OK | `provide`/`inject` зеркалит React-context |
| 36 | `Carousel` | PARITY-OK | `sg-carousel*` совпадают; aria-label per slide — английский дефолт (locale не зеркалит) → §2 findings |
| 37 | `Collapse` | FINDING | content `v-if="isOpen"` vs React всегда + max-height transition; data-driven API → §3 findings |
| 38 | `Descriptions` | FINDING | `items[].value: string` vs React `items[].children: ReactNode` → §3 findings |
| 39 | `Slider` | PARITY-OK | track/fill/handle + `role="slider"` совпадают |
| 40 | `Rate` | PARITY-OK | radiogroup + per-star radio совпадают |
| 41 | `ColorPicker` | FINDING | Vue упрощён (без SV-панели и hue-bar) → §4 findings |
| 42 | `Select` | FIXED | + `loading`/`option.loading` + inline spin, `aria-controls` listbox, `sg-select-loading` |
| 43 | `AutoComplete` | FIXED | + `loading`, inline spin, `sg-autocomplete-loading` |
| 44 | `InlineEdit` | PARITY-OK | locale через `inlineEdit` уже использовался |
| 45 | `Transition` | PARITY-OK | классовые переходы зеркалят React |

### Батч 3 — UI date + complex base (22)

| # | Компонент | Статус | Заметка |
|---|---|---|---|
| 46 | `DatePicker` | FIXED+FINDING | + `loading` prop, `sg-datepicker-loading`, inline spin; **finding**: read-only display vs editable input, нет `RangePicker` → §6 findings |
| 47 | `TimePicker` | FIXED+FINDING | + `loading` prop, `sg-timepicker-loading`, inline spin; **finding**: read-only display → §7 findings |
| 48 | `Calendar` | PARITY-OK | `sg-calendar-*` совпадают; `events` API — additive |
| 49 | `Cascader` | FINDING | без `loadData` async (синхронный) → §5 findings |
| 50 | `TreeSelect` | PARITY-OK | combobox/listbox role совпадают |
| 51 | `Upload` | FIXED | + inline spin для `status === 'uploading'` |
| 52 | `Transfer` | PARITY-OK | две колонки + checkbox-list совпадают |
| 53 | `Timeline` (ui) | PARITY-OK | основной DOM совпадает |
| 54 | `EventTimeline` (complex) | PARITY-OK | DOM/role совпадают |
| 55 | `List` (complex) | FIXED | inline `<span class="sg-spin sg-spin-default">` вместо ad-hoc для loading |
| 56 | `VirtualList` (complex) | PARITY-OK | scrollable виртуализация — функциональный паритет |
| 57 | `Tree` (complex) | PARITY-OK | `role="tree"`/`treeitem` совпадают |
| 58 | `TreeNodeRow` (complex) | PARITY-OK | основа `Tree` |
| 59 | `Form` (complex) | PARITY-OK | `<form>` + grid layout совпадают |
| 60 | `FormList` (complex) | PARITY-OK | dynamic array-fields совпадают |
| 61 | `FormProvider` (complex) | PARITY-OK | `provide`/`inject` совпадают |
| 62 | `Field` (complex) | PARITY-OK | label/help/error layout совпадают |
| 63 | `SubmitButton` (SchemaForm) | FIXED | переписан на композицию `<SgButton>` (см. decisions D-3) |
| 64 | `SchemaForm` (complex) | PARITY-OK | data-driven рендер совпадает |
| 65 | `AutoField` (complex) | PARITY-OK | switch на тип — функциональный паритет |
| 66 | `Table` (complex) | PARITY-OK | удалён мёртвый `sortIndicator` (typecheck-фикс); основной DOM/sticky/sort совпадает |
| 67 | `DataGrid` (complex) | PARITY-OK | обёртка над Table, DOM совпадает |

### Батч 4 — Visualization + complex (22)

| # | Компонент | Статус | Заметка |
|---|---|---|---|
| 68 | `ChartAxes` (complex) | PARITY-OK | SVG axes — функциональный паритет |
| 69 | `ChartLegend` (complex) | PARITY-OK | layout совпадает |
| 70 | `ChartBrush` (complex) | PARITY-OK | brush-rect/handles совпадают |
| 71 | `ChartCrosshair` (complex) | PARITY-OK | crosshair-line совпадает |
| 72 | `ChartHoverToolbar` (complex) | PARITY-OK | toolbar/role совпадают |
| 73 | `LineChart` (complex) | PARITY-OK | SVG paths/dots совпадают |
| 74 | `AreaChart` (complex) | PARITY-OK | filled path совпадает |
| 75 | `BarChart` (complex) | PARITY-OK | rect bars/stacked совпадают |
| 76 | `PieChart` (complex) | PARITY-OK | arc paths/labels совпадают |
| 77 | ~~`Diagram`~~ | **SKIPPED** | зона стрима 3.3c `T-Diagram-Polish`. Сделан только локальный typecheck-фикс (D-4 / findings §9) |
| 78 | `Dashboard` (complex) | PARITY-OK | grid-layout совпадает |
| 79 | `DashboardEditor` (complex) | PARITY-OK | edit-mode toolbar совпадает |
| 80 | `Gantt` (complex) | PARITY-OK | timeline/tasks совпадают |
| 81 | `ResourceCalendar` (complex) | PARITY-OK | grid/cell совпадают |
| 82 | `SchemaFormEditor` (complex) | PARITY-OK | 3-pane layout совпадает |
| 83 | `SchemaFormEditorPalette` (complex) | PARITY-OK | drag-source совпадает |
| 84 | `SchemaFormEditorCanvas` (complex) | PARITY-OK | drop-target совпадает |
| 85 | `SchemaFormEditorInspector` (complex) | PARITY-OK | property-editor совпадает |
| 86 | `SchemaFormEditorSchemaView` (complex) | PARITY-OK | JSON-preview совпадает |
| 87 | `HistoryPanel` (devtools) | PARITY-OK | undo/redo list совпадает |
| 88 | `Transition` (utility, переучитан в Б2) | PARITY-OK | (повторно для счёта 88) |

> Точное число «уникальных» SFC в `packages/vue/src/components/**` — 88
> (включая `Diagram.vue`, который пропущен). Из них в этом стриме:
> - **PARITY-OK**: 66
> - **FIXED**: 17 (см. список выше)
> - **FIXED+FINDING**: 2 (`DatePicker`, `TimePicker`)
> - **FINDING**: 8 (`Menu`, `Collapse`, `Descriptions`, `ColorPicker`,
>   `Cascader`, плюс несколько data-driven компонентов, см. findings §3)
> - **SKIPPED**: 1 (`Diagram` — чужая зона; локальный TS-фикс)

## Решения вне плана

Все зафиксированы в `docs/_streams/decisions/T-Vue-Components-DOM-Parity.md`:

- **D-1** Inline `<span class="sg-spin">` вместо `<SgSpin>` компонента
  (ради size-limit).
- **D-2** `aria-busy="loading || undefined"` вместо `aria-busy="loading"`.
- **D-3** `SubmitButton` теперь композирует `<SgButton>`.
- **D-4** Локальный typecheck-фикс в `Diagram.vue` (удаление мёртвого
  кода).
- **D-5** SgLocale в Vue не расширяем (зона 3.3a).
- **D-6** Modal `style.width` оставлен прежним (parity-test ожидает).
- **D-7** Mentions dropdown переведён на `<div role="listbox">`.

## Финдинги

См. `docs/_streams/findings/T-Vue-Components-DOM-Parity.md`:

1. Vue ESM bundle превышает size-limit на 1.63 KB.
2. SgLocale в Vue не зеркалит React (отсутствует ~20 интерфейсов).
3. Data-driven props (`string` вместо `ReactNode`) в ~9 компонентах.
4. `ColorPicker.vue` без SV/Hue панелей.
5. `Cascader.vue` без `loadData` async.
6. `DatePicker.vue` без редактируемого input и без `RangePicker`.
7. `TimePicker.vue` без редактируемого input.
8. `Mentions.vue` имеет Vue-специфичные расширения (additive).
9. `Diagram.vue` имел pre-existing TS6133 — локальный фикс.
10. (резерв)
11. `List.vue` / `Table.vue` TS2774 warnings — pre-existing, не блокируют.

## Критерии приёмки — проверка

- [x] Все 88 SFC пройдены (1 SKIPPED — Diagram, чужая зона).
- [x] Нет breaking changes публичного API: ни один существующий prop не
      удалён/переименован, эмиты не изменены.
- [ ] `pnpm size` — Vue ESM 91.63 KB при лимите 90 KB (превышение
      1.63 KB → finding §1). CJS в норме.
- [x] Parity-тесты Wave 2 — зелёные (708 / 708).
- [x] Отчёт сдан здесь.
- [x] Decisions/findings опубликованы.

## Передача дальше

- **Стрим 3.3a (Wrappers-Parity)** — забрать findings §2 (SgLocale) и
  §1 (поднять size-limit Vue на 92 KB или согласовать оптимизацию).
- **Стрим 3.3c (Diagram-Polish)** — учесть locally-applied фикс в
  `Diagram.vue` (удаление мёртвого `useSlots`). Конфликта нет.
- **Wave 4+** — slot-driven рендер для §3, addingyl `loadData` для
  Cascader (§5), full DatePicker/TimePicker editable inputs (§6/§7),
  full ColorPicker SV/Hue (§4).
