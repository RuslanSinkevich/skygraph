# Findings — T-Vue-Demo-Complex

> Append-only. Каждая запись — что нашли вне scope или что пропустили.
> Wave 3.2 / Tab D — complex компоненты (Form/Table/Tree/Charts/...)

## form-components-page-no-vue (наследовано из 3.1)

`form-components` — meta-демо (компоненты внутри Form). По карте §A
**не делаем** (см. также `findings/T-Vue-Demo-Foundation.md` →
`form-components-page-no-vue`). В `router/index.ts` записи для
`/components/form-components` **нет** изначально — ничего не правим.

## charts-no-css-vars (карта §C)

В Charts/Diagram/Dashboard/SchemaFormEditor **не зарождаем** `CssVarsTable`
— React-аналог его не имеет. Паритет «снизу вверх» (см. карту 3.1
`charts-no-css-vars-react`). Если в будущем захочется описать токены
для этих компонентов — отдельная карта T-Vue-Cleanup-2 или
T-React-Cleanup-2 (контракт документации `sg-*` лучше зарождать на
React-стороне первой).

## form-deferred-examples

Form в React — 22 DemoBox, в Vue после миграции — **11** (≥ N/2 по карте §E,
порог 11 пройден). Перенесены: Basic, ValidationRules, LayoutVertical,
LayoutHorizontal, LayoutInline, RequiredMark, FormSizes, Disabled,
NestedFields, Controls (галерея), DistributedComposition.

Не перенесены 11 примеров (deferred to next round):

- `form/AsyncValidation.demo.tsx` — Vue не имеет встроенного
  `validateTrigger="blur"` на async-rules через тот же синтаксис что
  React; перенос требует ручной обвязки `setTimeout` + установка
  `validateStatus="validating"`. Возможно но трудозатратно — deferred.
- `form/DependentFields.demo.tsx` — `dependencies` API в Vue `SgField`
  работает, но синхронизация перерасчёта другая. Deferred.
- `form/FieldStatus.demo.tsx` — нужен `validateStatus` на SgField,
  есть в API, но не покрыт примером в этом раунде. Deferred.
- `form/FormListDynamic.demo.tsx` — `SgFormList` существует, но
  scope-переменные слотов отличаются от React. Deferred.
- `form/LiveWatch.demo.tsx` — `useWatch` есть, но синтаксис другой.
  Deferred.
- `form/LoginCard.demo.tsx` — стилевая обёртка, не unique-API.
  Deferred.
- `form/ProfileSettings.demo.tsx` — большой пример, не unique-API.
  Deferred.
- `form/ProgrammaticControl.demo.tsx` — `useForm` API есть, пример
  большой. Deferred.
- `form/SearchBar.demo.tsx` — стилевая обёртка. Deferred.
- `form/SchemaFormBasic.demo.tsx` — `SgSchemaForm` есть, но JSON-schema
  адаптер настройка большая. Deferred.
- `form/SchemaFormLayout.demo.tsx` — то же. Deferred.

## table-deferred-examples

Table в React — 29 DemoBox, в Vue после миграции — **17** (≥ N/2 по карте §E,
порог 15 пройден). Перенесены: Basic, Sortable, Sizes, Bordered,
Sticky, Pagination, Selection, SelectionRadio, SearchFilter,
ColumnFilters, CustomCell (через слот `#cell` — заменяет
React-`column.render`), ConditionalRows, StyledSlots, EmptyState,
Unstyled, TokensOverride, LargeDataset, Realtime.

Не перенесены 12 примеров (Vue Table API уже React и не поддерживает
эти возможности):

- `Resizable.demo.tsx` — нет `column.resizable` во Vue.
- `Expandable.demo.tsx` — нет `expandable` props.
- `ColumnGroups.demo.tsx` — нет `column.children` (multi-level header).
- `FixedColumns.demo.tsx` — нет `column.fixed`.
- `Editable.demo.tsx` — нет `column.editable` / `onCellEdit`.
- `TreeData.demo.tsx` — нет `treeData` / `childrenColumnName`.
- `Grouping.demo.tsx` — нет `groupBy` / `column.aggregate`.
- `Summary.demo.tsx` — нет render-prop `summary`; есть только `footer`-slot
  ключ в `TableSlot`, но он не разводит summary-row.
- `Virtual.demo.tsx` / `VirtualDynamic.demo.tsx` — нет встроенного
  виртуального скроллера (используем `pageSize` в `LargeDataset`).
- `AdvancedFilters.demo.tsx` / `CustomFilterDropdown.demo.tsx` — нет
  `column.filterMode='advanced'`, `column.filterDropdown`.
- `GlobalSearch.demo.tsx` — встроенный `searchable` уже покрыт
  отдельным демо `SearchFilter`; повторять как «GlobalSearch»
  избыточно.
- `Loading.demo.tsx` — нет `loading` props.
- `KitchenSink.demo.tsx` / `FinanceStyle.demo.tsx` — стилевые
  композиции, требуют сначала восстановить отсутствующие props выше
  (Resizable / Expandable / ColumnGroups / Fixed / Editable).
- `ProgressCells.demo.tsx` (как самостоятельный демо) — покрыт в
  `CustomCell.demo.vue` совместно с status-pill.

Если потребуется паритет «вверх» (resizable / expandable / treeData /
groupBy / virtual / advanced filters / loading) — отдельная карта
**T-Vue-Table-Parity**: расширение `packages/vue/src/components/complex/Table/`
+ новые демо.

## charts-vue-no-crosshair-brush-prop

Vue `SgLineChart` / `SgBarChart` / `SgAreaChart` / `SgPieChart` **не
имеют** `crosshair` и `brush` props (которые есть у React-аналогов).
Вместо этого экспортируются отдельные компоненты `SgChartCrosshair` и
`SgChartBrush` — но они требуют plot-geometry (plotX/plotY/plotW/plotH),
а основные Vue-чарты её **не отдают** наружу (нет публичного
`exposeGeometry`). Соответственно отдельные Crosshair/Brush demos в этом
раунде не покрыты — для полного паритета нужен `T-Vue-Charts-Geometry`:
расширение API основных чартов (slot для overlay + expose plot rect)
+ ре-композиция демо.

В Vue реализовано **14** из 15 React-демо: BasicLine / BasicBar /
BasicArea / BasicPie / WithAxes / WithLegend / MultiSeries / Stacked /
Animations / Realtime / HoverActions / ContextMenu / Responsive /
Unstyled. Не перенесены `Crosshair.demo.tsx` и `Brush.demo.tsx` — см.
finding `charts-vue-no-crosshair-brush-prop`. PieChart использует
`categories + series` вместо `data: [{id,label,value}]` — см.
`pie-categories-vs-data`.

## charts-no-context-menu-prop

`SgBarChart` / другие Vue-чарты не экспонируют `onSeriesContextMenu`
prop (как и React). В React-демо `ContextMenu.demo.tsx` он собирается
снаружи через chips + `onContextMenu`. В Vue — то же самое
(`@contextmenu.prevent`). Это **идиома demo-уровня**, а не отсутствие
API.

## pie-categories-vs-data

Vue `SgPieChart` принимает `categories: string[]` + `series: [{ id,
label, values: number[] }]` (где values — значения секторов). React
`PieChart` принимает `data: [{ id, label, value }]` (плоский массив).
Это расхождение **в API на уровне packages**, не в демо. Демо
`BasicPie.demo.vue` показывает Vue-форму. Унификация (если нужна) —
отдельная карта `T-Vue-Charts-PieData`.

## diagram-vue-narrower-than-react

Vue `SgDiagram` (см. `packages/vue/src/components/complex/Diagram/Diagram.vue`)
по API **уже** React-аналога — это закреплено в самом компоненте
(`Trims advanced features (lasso, HoverActions, multi-anchor edges) compared
to the React source`).

Не покрыты в Vue (компонент не поддерживает — НЕ ошибка демо-стрима):

- `snapToGrid={N}` — нет проп.
- `routeAroundNodes` + `routingOptions` (orthogonal A* routing) — нет.
- `selectionMode="lasso"` — только `single` / `multi` (Ctrl+click).
- `onNodeContextMenu` / `onEdgeContextMenu` / `onCanvasContextMenu` — нет
  callback-ов; контекст-меню эмулируется через внешние кнопки или
  собственный @contextmenu-обработчик в слоте.
- `nodeActions` / `edgeActions` (HoverActions mini-toolbar) — нет.
- OBB rotated nodes — `transform.rot` не используется в проекции.
- React `panable` / `zoomable` раздельные → Vue объединил в `panZoom`.

Соответственно из 11 React-примеров полноценно в Vue реализуемы 8:
Basic, Custom node, Draggable, Pan/zoom, Single selection, Multi-select
(без lasso), UndoRedo, NodeClick, Print, LargeGraph + 2 уникальных Vue:
`ProgrammaticEdit` (заменяет ContextMenu) и `Unstyled`. Итого **12**
демо в Vue (≥10 из 11 по карте §C). Если потребуется паритет «вверх» по
API (lasso / contextmenu / orthogonal routing / OBB) — отдельная карта
**T-Vue-Diagram-Parity**: расширение `packages/vue/src/components/complex/Diagram/`
+ новые демо.

## tree-vue-narrower-than-react

Vue `SgTree` уже React по API:

- нет `showLine` (направляющие линии между уровнями)
- нет `actions` (per-row hover-кнопки)
- нет `nodeStatus` (success/warning/error per-node dot)
- нет `editable` + `onEdit` (inline-rename по double-click)
- нет `showIcon` (резерв слота под иконку)

Соответственно из 12 React-примеров напрямую переносимы 8: Basic,
Checkable, Directory, Search, Toolbar, Draggable, Virtual,
TokensOverride. Чтобы достичь ≥11 (карта §) добавлены 4 Vue-уникальных:
`CheckStrictly`, `BlockNode`, `Multiple`, `Loadable` (lazy `loadData`)
и `Unstyled`. Итого **13** демо в Vue.

Если потребуется паритет «вверх» (showLine / actions / nodeStatus /
editable) — отдельная карта **T-Vue-Tree-Parity**: расширение
`packages/vue/src/components/complex/Tree/` + новые демо.

## list-no-compound-item-meta

Vue `SgList` не использует compound API (`List.Item` /
`List.Item.Meta`), которое есть в React. В Vue ту же раскладку
(`avatar + title + description + actions + extra`) собирают inline
внутри default-слота. Это идиома Vue — НЕ ошибка. Демо `WithMeta`
показывает каноничный паттерн.

Все 14 React-примеров перенесены: Basic, Sizes, WithMeta, Grid,
Pagination, Loading, Empty, Selectable, Draggable, Virtual,
RowClassName, Slots, TokensOverride, Unstyled.

## SgUpload, SgTransfer, SgInputNumber и т.д. — внутренние form-control примеры

В React-Form некоторые примеры используют `Upload`/`Transfer`/`DatePicker`
внутри полей. Эти контролы есть в `@skygraph/vue` и используются —
проблем не было.

## diagram-no-context-menu

В Vue `SgDiagram` нет `onNodeContextMenu` / `onEdgeContextMenu` /
`onCanvasContextMenu`. В демо `ProgrammaticEdit.demo.vue` шаблон
«добавить узел через клик правой кнопки на пустой канве» заменён на
явные кнопки «Add» / «Delete». См. также `diagram-vue-narrower-than-react`.

## diagram-no-lasso

`selectionMode` в Vue: `single` / `multi`. Lasso (`drag по пустому
полю`) — React-only фича. В демо `MultiSelect.demo.vue` работает
`Ctrl+click` / `Shift+click`-режим. См. `diagram-vue-narrower-than-react`.

## diagram-no-separate-pan-zoom

Vue `panZoom: boolean` объединяет React `panable` + `zoomable`. В демо
`PanZoom.demo.vue` показан совмещённый режим. Раздельная конфигурация
требует расширения API — см. `diagram-vue-narrower-than-react`.

## no-skips-other

Для следующих компонентов skip-ов нет (порог достигнут):
- `schema-form-editor` — 2/2 (паритет).
- `gantt`, `event-timeline`, `resource-calendar` — Vue 3, React 2.
- `dashboard` — 7/7 (полный паритет).
- `diagram` — 12/11 (Vue добавляет `ProgrammaticEdit` + `Unstyled` поверх
  того что доступно в Vue API).

## sg-table-row-class-not-fnsig

Vue `<SgTable>` принимает `rowClassName` как `string | (row, id) => string`
(см. `pages/TablePage.vue`). React эквивалент — `(row, index) => string`
(индекс). Расхождение **не** правим (зона packages/**), описано в
PropsTable Table (тип `(row, id) => string`).

## sg-form-list-dynamic-slot-vs-react-render-prop

`SgFormList` в Vue использует слот `default` со scope-параметром
`{ fields, add, remove, move }`, React — `<FormList>` с render-prop
`{(fields, ops) => ...}`. Это идиома Vue vs React — НЕ ошибка. Не
исправляем.
