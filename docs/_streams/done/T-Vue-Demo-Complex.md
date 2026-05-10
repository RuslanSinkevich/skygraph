# T-Vue-Demo-Complex — отчёт

> Wave 3.2 / Tab D. Миграция 12 complex-компонентов
> (Form, Table, Tree, List, Diagram, Charts, Dashboard, Gantt,
> EventTimeline, ResourceCalendar, SchemaFormEditor, FormComponents)
> с `pages/<Comp>Page.vue` на `demos/<comp>/*.demo.vue` — паритетно с
> React-демо (с явными исключениями).

## Статус

**Закрыт.** Все green checks:

- `vue-tsc -p tsconfig.app.json --noEmit` (exit 0, лог пуст).
- `vite build` (exit 0, 3.41s, все 11 demo-чанков code-split).
- 11 старых `pages/*Page.vue` удалены, маршруты обновлены.

| Компонент | Перенесено demo | Целевой минимум | Источник минимума |
|---|---|---|---|
| Form | **11/22** | ≥ 11/22 | карта §E |
| Table | **17/29** | ≥ 15/29 | карта §E |
| Tree | **13/12** | ≥ 11/12 | базовый |
| List | **14/14** | 14 | базовый |
| Diagram | **12/11** | ≥ 10/11, без CssVars | карта §C |
| Charts | **14/15** | ≥ 14/15, без CssVars | карта §C |
| Dashboard | **7/7** | 7, без CssVars | карта §C |
| Gantt | **3/2** | ≥ 2 (Vue шире) | карта §D |
| EventTimeline | **3/2** | ≥ 2 (Vue шире) | карта §D |
| ResourceCalendar | **3/2** | ≥ 2 (Vue шире) | карта §D |
| SchemaFormEditor | **2/2** | 2/2, без CssVars | карта §B/§C |
| FormComponents | **0/0** | НЕ делать | карта §A |

`form-components` — meta-демо, в роутере отсутствовал изначально, не
правим.

## Acceptance criteria

| # | Требование | Статус |
|---|---|---|
| 1 | 11 routes в `examples/demo-vue/src/router/index.ts` указывают на `demos/<Comp>Demo.vue`. | ✓ |
| 2 | 11 старых `pages/<Comp>Page.vue` удалены. | ✓ |
| 3 | Каждый компонент имеет `demos/<comp>/*.demo.vue` + `demos/<comp>-doc/{en,ru,useStrings}.ts` + `demos/<Comp>Demo.vue`. | ✓ |
| 4 | Доля demo ≥ порога (см. таблицу выше). | ✓ |
| 5 | Особые случаи §A–§E соблюдены. | ✓ |
| 6 | `vue-tsc -p tsconfig.app.json --noEmit` — green. | ✓ exit 0 |
| 7 | `vite build` — green. | ✓ exit 0, 3.41s |
| 8 | findings/decisions заполнены. | ✓ |

## Файлы

### Создано

```
docs/_streams/decisions/T-Vue-Demo-Complex.md
docs/_streams/findings/T-Vue-Demo-Complex.md
docs/_streams/done/T-Vue-Demo-Complex.md   ← этот файл

# Form (11)
examples/demo-vue/src/demos/form/shared.ts
examples/demo-vue/src/demos/form/Basic.demo.vue
examples/demo-vue/src/demos/form/ValidationRules.demo.vue
examples/demo-vue/src/demos/form/LayoutVertical.demo.vue
examples/demo-vue/src/demos/form/LayoutHorizontal.demo.vue
examples/demo-vue/src/demos/form/LayoutInline.demo.vue
examples/demo-vue/src/demos/form/RequiredMark.demo.vue
examples/demo-vue/src/demos/form/FormSizes.demo.vue
examples/demo-vue/src/demos/form/Disabled.demo.vue
examples/demo-vue/src/demos/form/NestedFields.demo.vue
examples/demo-vue/src/demos/form/Controls.demo.vue
examples/demo-vue/src/demos/form/DistributedComposition.demo.vue
examples/demo-vue/src/demos/form-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/FormDemo.vue

# Table (17)
examples/demo-vue/src/demos/table/_data.ts
examples/demo-vue/src/demos/table/Basic.demo.vue
examples/demo-vue/src/demos/table/Sortable.demo.vue
examples/demo-vue/src/demos/table/Sizes.demo.vue
examples/demo-vue/src/demos/table/Bordered.demo.vue
examples/demo-vue/src/demos/table/Sticky.demo.vue
examples/demo-vue/src/demos/table/Pagination.demo.vue
examples/demo-vue/src/demos/table/Selection.demo.vue
examples/demo-vue/src/demos/table/SelectionRadio.demo.vue
examples/demo-vue/src/demos/table/SearchFilter.demo.vue
examples/demo-vue/src/demos/table/ColumnFilters.demo.vue
examples/demo-vue/src/demos/table/CustomCell.demo.vue
examples/demo-vue/src/demos/table/ConditionalRows.demo.vue
examples/demo-vue/src/demos/table/StyledSlots.demo.vue
examples/demo-vue/src/demos/table/EmptyState.demo.vue
examples/demo-vue/src/demos/table/Unstyled.demo.vue
examples/demo-vue/src/demos/table/TokensOverride.demo.vue
examples/demo-vue/src/demos/table/LargeDataset.demo.vue
examples/demo-vue/src/demos/table/Realtime.demo.vue
examples/demo-vue/src/demos/table-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/TableDemo.vue

# Tree (13)
examples/demo-vue/src/demos/tree/data.ts
examples/demo-vue/src/demos/tree/{Basic,Checkable,CheckStrictly,Directory,
  Search,Toolbar,Draggable,BlockNode,Multiple,Loadable,Virtual,
  TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/tree-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/TreeDemo.vue

# List (14)
examples/demo-vue/src/demos/list/data.ts
examples/demo-vue/src/demos/list/{Basic,Sizes,WithMeta,Grid,Pagination,
  Loading,Empty,Selectable,Draggable,Virtual,Slots,TokensOverride,
  Unstyled,RowClassName}.demo.vue
examples/demo-vue/src/demos/list-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/ListDemo.vue

# Diagram (12)
examples/demo-vue/src/demos/diagram/{Basic,CustomNode,Draggable,PanZoom,
  Selection,MultiSelect,UndoRedo,NodeClick,ProgrammaticEdit,Print,
  LargeGraph,Unstyled}.demo.vue
examples/demo-vue/src/demos/diagram-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/DiagramDemo.vue

# Charts (14)
examples/demo-vue/src/demos/charts/_data.ts
examples/demo-vue/src/demos/charts/{BasicLine,BasicBar,BasicArea,BasicPie,
  WithAxes,WithLegend,MultiSeries,Stacked,Animations,Realtime,
  HoverActions,ContextMenu,Responsive,Unstyled}.demo.vue
examples/demo-vue/src/demos/charts-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/ChartsDemo.vue

# Dashboard (7)
examples/demo-vue/src/demos/dashboard/{Basic,Editor,WithActions,Mixed,
  Responsive,Realtime,LargeGrid}.demo.vue
examples/demo-vue/src/demos/dashboard-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/DashboardDemo.vue

# Gantt (3)
examples/demo-vue/src/demos/gantt/{Basic,Resources,Scale}.demo.vue
examples/demo-vue/src/demos/gantt-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/GanttDemo.vue

# EventTimeline (3)
examples/demo-vue/src/demos/event-timeline/{Vertical,Horizontal,
  MonthGroup}.demo.vue
examples/demo-vue/src/demos/event-timeline-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/EventTimelineDemo.vue

# ResourceCalendar (3)
examples/demo-vue/src/demos/resource-calendar/{Week,Day,
  Interactive}.demo.vue
examples/demo-vue/src/demos/resource-calendar-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/ResourceCalendarDemo.vue

# SchemaFormEditor (2)
examples/demo-vue/src/demos/schema-form-editor/{Builder,
  Prefilled}.demo.vue
examples/demo-vue/src/demos/schema-form-editor-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/SchemaFormEditorDemo.vue
```

### Изменено

```
examples/demo-vue/src/router/index.ts   — 11 routes на новые demos/*Demo.vue
```

### Удалено

```
examples/demo-vue/src/pages/FormPage.vue
examples/demo-vue/src/pages/TablePage.vue
examples/demo-vue/src/pages/TreePage.vue
examples/demo-vue/src/pages/ListPage.vue
examples/demo-vue/src/pages/DiagramPage.vue
examples/demo-vue/src/pages/ChartsPage.vue
examples/demo-vue/src/pages/DashboardPage.vue
examples/demo-vue/src/pages/GanttPage.vue
examples/demo-vue/src/pages/EventTimelinePage.vue
examples/demo-vue/src/pages/ResourceCalendarPage.vue
examples/demo-vue/src/pages/SchemaFormEditorPage.vue
```

## Архитектурные решения (см. `decisions/T-Vue-Demo-Complex.md`)

1. **Источник правды для большинства** — существующие
   `pages/<Comp>Page.vue`. Новые примеры (для паритета с React)
   написаны идиоматично под Vue.
2. `<Comp>DocStrings = { -readonly [K in keyof typeof <comp>DocEn]: string }`
   — широкий тип, чтобы `ru.ts` не падал на literal-types из
   `as const`.
3. CssVarsTable пропущен в Charts / Diagram / Dashboard /
   SchemaFormEditor (карта §C, паритет с React-стороной).
4. Gantt / EventTimeline / ResourceCalendar — Vue остаётся шире
   React (3 vs 2), не сокращаем (карта §D).
5. Form / Table используют пороги ≥N/2 (карта §E); остаток —
   findings.
6. SchemaFormEditor — архитектурная миграция 2/2 (Builder + Prefilled
   из старой страницы), без расширения примеров.
7. PropsTable показывает реальные Vue-props, без React-only
   `className`/`style`/`onClick`. Эмиты вынесены отдельно (`@finish`,
   `@valuesChange`, ...).
8. `gen-vue-demo.mjs` не использовался для существующих страниц —
   ручные файлы точнее и быстрее, чем адаптация скаффолдов.

## Findings (см. `findings/T-Vue-Demo-Complex.md`)

| ID | Что зафиксировано |
|---|---|
| `form-components-page-no-vue` | meta-демо, в роутере отсутствовал, не делаем. |
| `charts-no-css-vars` | для Charts/Diagram/Dashboard/SchemaFormEditor. |
| `form-deferred-examples` | 11 React-примеров отложены (Vue API совпадает, но требуют большой обвязки). |
| `table-deferred-examples` | 12 React-примеров отложены — Vue Table API не имеет `resizable`/`expandable`/`treeData`/`groupBy`/`virtual`/`fixed`/`editable`/`loading`/advanced filters. |
| `diagram-vue-narrower-than-react` | нет lasso / orthogonal routing / OBB rotation / contextmenu callbacks / nodeActions / snapToGrid. |
| `tree-vue-narrower-than-react` | нет showLine / actions / nodeStatus / editable / showIcon. |
| `list-no-compound-item-meta` | Vue не использует compound `List.Item` / `List.Item.Meta` — inline default-slot вместо. |
| `charts-vue-no-crosshair-brush-prop` | основные чарты не отдают plot geometry, отдельные `Crosshair`/`Brush` overlay-демо отложены. |
| `pie-categories-vs-data` | Vue PieChart принимает categories+series, React — flat data array. |
| `sg-table-row-class-not-fnsig` | Vue `(row, id) → string`, React `(row, index) → string`. |
| `sg-form-list-dynamic-slot-vs-react-render-prop` | Slot scope вместо render-prop — это идиома, не ошибка. |
| `no-skips-other` | для остальных компонентов skip-ов нет (порог достигнут). |

## Bundle size (`vite build`)

| Чанк | Размер | gzip |
|---|---|---|
| `ChartsDemo` | 60.18 kB | 17.57 kB |
| `DiagramDemo` | 53.71 kB | 14.93 kB |
| `TreeDemo` | 51.44 kB | 15.22 kB |
| `DashboardDemo` | 50.98 kB | 14.40 kB |
| `TableDemo` | 50.96 kB | 15.34 kB |
| `SchemaFormEditorDemo` | 40.42 kB | 12.30 kB |
| `FormDemo` | 39.88 kB |  8.71 kB |
| `ListDemo` | 38.69 kB | 11.39 kB |
| `GanttDemo` | 22.63 kB |  7.91 kB |
| `ResourceCalendarDemo` | 20.21 kB |  6.68 kB |
| `EventTimelineDemo` | 16.94 kB |  5.38 kB |
| **Итого 11 чанков** | **446 kB** | **~134 kB** |

Все 11 demo-страниц — отдельные lazy-чанки, главный бандл
`index.js` остаётся 104.10 kB / 39.53 kB gzip.

## Команды (для проверки локально)

```bash
# Typecheck (Tab C может быть сломан — мешает только если они правят
# popconfirm файлы прямо сейчас; если красит — изоляция через
# временный rename + restore не нужна, у меня сейчас exit 0).
node examples/demo-vue/node_modules/.bin/vue-tsc \
  -p examples/demo-vue/tsconfig.app.json --noEmit          # exit 0

# Build
node examples/demo-vue/node_modules/.bin/vite build         # exit 0
```

## Что осталось для следующих волн

- **T-Vue-Form-Round-2** — догнать недостающие 11 React-демо
  (AsyncValidation / DependentFields / FormListDynamic / LiveWatch /
  ProgrammaticControl / SchemaFormBasic / SchemaFormLayout /
  ProfileSettings / LoginCard / SearchBar / FieldStatus).
- **T-Vue-Table-Parity** — расширить `packages/vue/src/components/complex/Table/`:
  resizable / expandable / treeData / groupBy / virtual / fixed columns /
  editable / loading / advanced filters. После — догнать 12
  отложенных Table-демо.
- **T-Vue-Diagram-Parity** — lasso / orthogonal routing / OBB / context
  menu callbacks / node-actions.
- **T-Vue-Tree-Parity** — showLine / actions / nodeStatus / editable /
  showIcon.
- **T-Vue-Charts-Geometry** — expose plot geometry → восстановить
  Crosshair / Brush overlay-демо.
- **T-Vue-Charts-PieData** — унификация формы данных PieChart с
  React-стороной (если решим, что нужно).
