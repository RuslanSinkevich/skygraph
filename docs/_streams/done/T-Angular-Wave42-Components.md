# T-Angular-Wave42-Components — Done report

> Стрим: **Wave 4.2** — порт компонентов из `@skygraph/react` в
> `@skygraph/angular` + расширение `examples/demo-angular`.
>
> Базируется на 4.1 (`SgButton`, `SgSpin`, `SgConfigProvider`,
> `provideSgConfig`, `injectSgConfig`, локали en/ru, demo-angular
> shell).

## Итог

Зелёное:

```
pnpm --filter @skygraph/angular typecheck   # OK
pnpm --filter @skygraph/angular test        # 70/70 pass (vitest run)
pnpm --filter @skygraph/angular build       # FESM + DTS
pnpm --filter demo-angular build            # initial 145.86 kB transfer
```

Размер `@skygraph/angular` FESM остаётся под лимитом 4.1 (никаких
правок `.size-limit.json`). Demo-angular initial transfer — 145 KB,
ниже лимита 600 KB.

## Что сделано

Портировано 49 SFC + 1 структурная директива + 1 service по 5
батчам. Все компоненты — standalone, `ChangeDetection.OnPush`,
control flow `@if/@for/@switch`, без NgModules.

### Батч A — UI primitives (14 SFC)

| React | Angular | Селектор |
| --- | --- | --- |
| `Tag` | `SgTagComponent` | `[sg-tag]` |
| `Badge` | `SgBadgeComponent` | `[sg-badge]` |
| `Avatar` | `SgAvatarComponent` | `[sg-avatar]` |
| `Tooltip` | `SgTooltipComponent` | `[sg-tooltip]` |
| `Skeleton` | `SgSkeletonComponent` | `[sg-skeleton]` |
| `Progress` | `SgProgressComponent` | `[sg-progress]` |
| `Empty` | `SgEmptyComponent` | `[sg-empty]` |
| `Result` | `SgResultComponent` | `[sg-result]` |
| `Switch` | `SgSwitchComponent` | `button[sg-switch]` |
| `Checkbox` | `SgCheckboxComponent` | `label[sg-checkbox]` |
| `Radio` | `SgRadioGroupComponent` | `[sg-radio-group]` |
| `Slider` | `SgSliderComponent` | `[sg-slider]` |
| `Rate` | `SgRateComponent` | `[sg-rate]` |
| `ColorPicker` | `SgColorPickerComponent` | `[sg-color-picker]` |

### Батч B — UI inputs (10 SFC)

| React | Angular | Селектор |
| --- | --- | --- |
| `Input` | `SgInputComponent` | `[sg-input]` |
| `InputNumber` | `SgInputNumberComponent` | `[sg-input-number]` |
| `Textarea` | `SgTextareaComponent` | `textarea[sg-textarea]` |
| `InputPassword` | `SgInputPasswordComponent` | `[sg-input-password]` |
| `SearchInput` | `SgSearchInputComponent` | `[sg-search-input]` |
| `PinInput` | `SgPinInputComponent` | `[sg-pin-input]` |
| `TagInput` | `SgTagInputComponent` | `[sg-tag-input]` |
| `Mentions` | `SgMentionsComponent` | `textarea[sg-mentions]` |
| `InlineEdit` | `SgInlineEditComponent` | `[sg-inline-edit]` |
| `InputGroup` | `SgInputGroupComponent` | `[sg-input-group]` |

### Батч C — UI nav + feedback (14 SFC + 1 service)

| React | Angular | Селектор |
| --- | --- | --- |
| `Tabs` | `SgTabsComponent` | `div[sg-tabs]` |
| `Menu` | `SgMenuComponent` | `ul[sg-menu]` |
| `Breadcrumb` | `SgBreadcrumbComponent` | `nav[sg-breadcrumb]` |
| `Dropdown` | `SgDropdownComponent` | `sg-dropdown` |
| `Pagination` | `SgPaginationComponent` | `nav[sg-pagination]` |
| `Steps` | `SgStepsComponent` | `[sg-steps]` |
| `Segmented` | `SgSegmentedComponent` | `[sg-segmented]` |
| `Modal` | `SgModalComponent` | `sg-modal` |
| `Drawer` | `SgDrawerComponent` | `sg-drawer` |
| `Popconfirm` | `SgPopconfirmComponent` | `sg-popconfirm` |
| `Notification` | `SgNotificationContainerComponent` + `SgNotificationService` | `sg-notification-container` |
| `Carousel` | `SgCarouselComponent` + `SgCarouselSlideDirective` | `div[sg-carousel]` |
| `Collapse` | `SgCollapseComponent` | `div[sg-collapse]` |
| `Descriptions` | `SgDescriptionsComponent` | `div[sg-descriptions]` |

### Батч D — UI selectors + date (10 SFC)

| React | Angular | Селектор |
| --- | --- | --- |
| `Select` | `SgSelectComponent` | `div[sg-select]` |
| `AutoComplete` | `SgAutoCompleteComponent` | `div[sg-autocomplete]` |
| `Cascader` | `SgCascaderComponent` | `div[sg-cascader]` |
| `TreeSelect` | `SgTreeSelectComponent` | `div[sg-tree-select]` |
| `DatePicker` | `SgDatePickerComponent` | `div[sg-date-picker]` |
| `TimePicker` | `SgTimePickerComponent` | `div[sg-time-picker]` |
| `Calendar` | `SgCalendarComponent` | `div[sg-calendar]` |
| `Upload` | `SgUploadComponent` | `div[sg-upload]` |
| `Transfer` | `SgTransferComponent` | `sg-transfer` |
| `Timeline` | `SgTimelineComponent` | `ul[sg-timeline]` |

### Батч E — Complex (best-effort, 2 SFC + 1 directive + 1 row component)

| React | Angular | Селектор |
| --- | --- | --- |
| `List` | `SgListComponent` + `SgListItemComponent` + `SgListItemTemplateDirective` | `div[sg-list]` / `div[sg-list-item]` / `[sgListItem]` |
| `Tree` | `SgTreeComponent` | `div[sg-tree]` |

### Демо-страницы

В `examples/demo-angular/src/app/pages/components/<name>/<name>-page.component.ts`
лежат страницы для **всех** портированных компонентов 4.2 (40
страниц), плюс `button` от 4.1. Каждая — заголовок + lead + 2-4
секции с примерами, общий стиль из `_shared/page.styles.ts`.
Маршруты добавлены в `app.routes.ts` lazy-load'ом, сайдбар
(`sidebar.component.ts`) уже содержал нужные пункты в нужных
категориях.

## Парность-тест

`packages/angular/__tests__/styling-contract.parity.test.ts`
расширен новыми host-компонентами и `describe`-блоками:

- "CSS contract parity — Wave 4.2 Batch A" (14 it'ов)
- "CSS contract parity — Wave 4.2 Batch B" (10)
- "CSS contract parity — Wave 4.2 Batch C" (14)
- "CSS contract parity — Wave 4.2 Batch D" (10)
- "CSS contract parity — Wave 4.2 Batch E (complex)" (2)

Каждый тест проверяет корневой тег / классы / `aria-*` / структуру
ключевых детей (selector-row, кнопки, dropdown, и т. п.). Итого
70/70 зелёных.

## Решения (см. `decisions/T-Angular-Wave42-Components.md`)

D1-D13 зафиксированы в decisions. Ключевые:

- **D1** — атрибутный селектор для всех host-element компонентов;
  обычный — только там где React рендерит свой корневой `<div>`
  через портал (Modal, Drawer, Notification, Popconfirm, Dropdown,
  Transfer-shell).
- **D2** — `ReactNode`-поля (`title`, `description`, `extra`,
  `dot`, `label`, `content` и т. п.) — это `string` в Angular 4.2;
  rich `<ng-template>`-slot — Wave 4.3.
- **D3** — `value/defaultValue/onChange` → `[(value)]` через
  `@Input() value` + `@Input() defaultValue` + `@Output() valueChange`.
- **D5** — inline `<span class="sg-spin sg-spin-small">` вместо
  импорта `SgSpinComponent` в loading-aware компонентах.
- **D7** — Modal/Drawer/Notification/Popconfirm/Dropdown — inline
  без портала; CDK Overlay не подключён.
- **D8** — locales 4.1 уже содержат все нужные ключи, новые не
  добавлены.
- **D11** — TimePicker/DatePicker/Calendar — нативный `Date`,
  без `dayjs`/`luxon`.
- **D12** — Carousel autoplay — no-op input + finding.
- **D13** — Complex: `List`+`Tree` портированы как простые
  компоненты, `Form`/`Table`/`Charts`/`Diagram`/`Gantt`/`Dashboard`/
  `ResourceCalendar`/`SchemaFormEditor` — finding/перенос на 4.3.

## Findings (см. `findings/T-Angular-Wave42-Components.md`)

12 findings, ни одного blocker'а:

- **F-Overlay-Inline** — Modal/Drawer/Notification/Popconfirm
  рендерятся inline (без портала).
- **F-Pagination-Loading** — нет inline-Spin внутри pagination/
  tabs/menu в `[loading]`-режиме (только класс на хосте).
- **F-Carousel-Autoplay** — `autoplay`/`interval` приняты как
  no-op input.
- **F-Mentions-Suggestions** — без auto-suggest dropdown.
- **F-Tooltip-Placement** — placement через CSS-классы, runtime
  measure не делается (как в React).
- **F-Cascader-Limited**, **F-TreeSelect-Limited**,
  **F-DatePicker-Limited**, **F-TimePicker-Limited**,
  **F-Calendar-Limited**, **F-Transfer-Limited** — single-select /
  24h / month-view / без поиска/range/`loadData`/disabled-slot.
- **F-List-Limited** — без pagination/virtual/grid/DnD/multi-select.
- **F-Tree-Limited** — без checkable/draggable/loadData/search/
  edit/virtual/keyboard/actions.
- **F-Form-Skipped** — Form/FormItem/FormProvider/FormList не
  портированы (нужен Angular-аналог `FormEngine` integration).
- **F-Table-Skipped** — Table слишком большой для best-effort.

Все Charts/Diagram/Gantt/Dashboard/ResourceCalendar/SchemaFormEditor
по карте отложены на Wave 4.3 — отдельный стрим.

## Зоны файлов

Тронуто строго в разрешённых зонах:

```
packages/angular/src/lib/components/ui/<name>/sg-<name>.component.ts (40 файлов)
packages/angular/src/lib/components/ui/<name>/index.ts (40 файлов)
packages/angular/src/lib/components/complex/{list,tree}/sg-*.component.ts (2)
packages/angular/src/lib/components/complex/{list,tree}/index.ts (2)
packages/angular/src/public-api.ts (append)
packages/angular/__tests__/styling-contract.parity.test.ts (расширение)
docs/_streams/decisions/T-Angular-Wave42-Components.md (новый)
docs/_streams/findings/T-Angular-Wave42-Components.md (новый)
docs/_streams/done/T-Angular-Wave42-Components.md (этот файл)
examples/demo-angular/src/app/pages/components/<name>/<name>-page.component.ts (40 страниц)
examples/demo-angular/src/app/app.routes.ts (append маршрутов)
```

`packages/angular/src/lib/locales/**` — не трогали (D8: ключи уже
все есть). `packages/angular/{package.json, ng-package.json,
tsconfig.json, vitest.config.mts}` — не трогали. `packages/{core,
react,vue,styles}/**` — не трогали. `examples/{demo,demo-vue,
_shared*,showcases}/**` — не трогали.
`examples/demo-angular/{package.json, angular.json, tsconfig*.json,
index.html, src/main.ts, src/styles.css, src/app/app.config.ts}` —
не трогали. Корневой `package.json`, `pnpm-lock.yaml`,
`.size-limit.json` — не трогали.

## Acceptance criteria — статус

- ✓ Не менее 4 батчей (A+B+C+D) портированы — 49 SFC.
- ✓ Для каждого портированного компонента есть страница в
  `examples/demo-angular/src/app/pages/components/<name>/`.
- ✓ Сайдбар demo-angular показывает все портированные компоненты.
- ✓ `pnpm --filter @skygraph/angular {typecheck,test,build}` —
  зелёные.
- ✓ `pnpm --filter demo-angular build` — зелёный.
- ✓ Парность-тест расширен (минимум один кейс на каждый
  компонент батчей A-E).
- ✓ Никаких правок в core/react/vue/styles, demo/demo-vue,
  global config.
- ✓ Decisions/findings заполнены, отчёт сдан.

## Не закрыто (для будущих волн)

- **Wave 4.3 — Overlay & complex slots:** CDK Overlay для Modal/
  Drawer/Notification/Popconfirm/Dropdown/Mentions; `<ng-template>`
  slot-API для всех `string`-полей (см. D2).
- **Wave 4.3 — Form / Table:** Angular `provideSgForm()` +
  `SgFormItem`/`SgFormList`/`SgFormProvider`; Angular `SgTable` с
  виртуальным скролом, sticky-колонками, sorter/filter UI,
  expandable rows, group rows, selection, resizable columns.
- **Wave 4.3 — Datepicker stack:** time-panel, presets, range
  picker, disabled-date/disabled-slot предикаты, 12-часовой
  TimePicker, year-mode/range/event markers Calendar.
- **Wave 4.3 — Selection stack:** multi-select Cascader/TreeSelect
  с `treeCheckable` и halfChecked, `loadData`, `showSearch`.
- **Wave 4.3 — Misc enhancements:** List pagination/virtual/grid/
  DnD/multi-select; Tree checkable/draggable/loadData/search/edit/
  virtual/keyboard/actions; Transfer search/pagination/oneWay;
  Carousel autoplay; Mentions auto-suggest; Pagination/Tabs/Menu
  inline-Spin при loading.
- **Wave 4.3 — Charts/Diagram/Gantt/Dashboard/ResourceCalendar/
  SchemaFormEditor:** отдельная карта (по карте 4.2 они изначально
  отложены).
