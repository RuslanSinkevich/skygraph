# T-Angular-Wave42-Components — Findings

Сюда складываются пропуски и ограничения, не закрытые в этом стриме.
В порядке возникновения.

## F-Overlay-Inline — Modal/Drawer/Notification/Popconfirm не телепортируются

В React/Vue эти компоненты используют React-портал / Vue `<Teleport>`,
рендерясь в `document.body`. Angular 4.2 рендерит их inline (там, где
объявлены), CDK Overlay не подключён. DOM-классы и aria — те же,
визуально может перекрываться `overflow: hidden` родителя. Закроем в
Wave 4.3 при подключении CDK Overlay.

## F-Pagination-Loading — нет inline-Spin внутри в loading-режиме

React `<Pagination loading>` инлайнит маленький `<Spin>` рядом с
кнопками. Angular 4.2 только добавляет класс
`sg-pagination-loading` на хост, без spinner внутри. Точно так же —
для Tabs/Menu в loading-режиме. Закрытие — Wave 4.3.

## F-Carousel-Autoplay — `autoplay` / `interval` пока no-op

Свойства приняты для парности API, таймер не запускается. Ручное
перелистывание стрелками + индикаторами работает.

## F-Mentions-Suggestions — без auto-suggest dropdown

Минимальный variant — `<textarea>` + onChange. Подсказок при `@`-вводе
нет (требует overlay/popper, которого мы избегаем). Закрытие — Wave 4.3.

## F-Tooltip-Placement — placement через CSS-классы, без позиционирования

DOM 1:1 с React (`sg-tooltip-top`/`-bottom`/`-left`/`-right`), но
координаты берутся CSS-only без runtime measure. React делает то же
самое — позиционирование чисто декларативное.

## F-Cascader-Limited — single-select без `loadData`/`showSearch`/`changeOnSelect`

`SgCascaderComponent` поддерживает только single-select c
click-to-expand колонками. Multi-select, ленивая подгрузка
(`loadData`), фильтр (`showSearch`) и `changeOnSelect` отложены на
Wave 4.3.

## F-TreeSelect-Limited — single-select без чекбоксов и поиска

`SgTreeSelectComponent` ships single-select с expand/collapse
строк. `treeCheckable` (multi-select c чекбоксами и halfChecked)
и `showSearch` отложены на Wave 4.3.

## F-DatePicker-Limited — без time-panel / presets / range / disabled-date

`SgDatePickerComponent` — только выбор одной даты с
month/year-навигацией и кнопкой "Today". Время, пресеты,
range-picker и предикат `disabledDate` — Wave 4.3.

## F-TimePicker-Limited — только 24-часовой формат, без disabled-slot

`SgTimePickerComponent` — 24-часовой режим с hour/minute/second
колонками. 12-часовой режим (`use12Hours`) и предикаты
`disabledHours/Minutes/Seconds` — Wave 4.3.

## F-Calendar-Limited — month-view, без year-mode/range/event-markers

`SgCalendarComponent` — month-view одиночного выбора с prev/next/today.
Year-mode, range-selection, multi-select, event markers, week numbers,
keyboard-навигация и `cellRender` — Wave 4.3.

## F-Transfer-Limited — без search / pagination / oneWay

`SgTransferComponent` — двухколоночный shuttle с select-all и bulk
move-стрелками. Search-инпут в каждой колонке, пагинация и режим
`oneWay` — Wave 4.3.

## F-List-Limited — без pagination/virtual/grid/drag-and-drop/multi-select

`SgListComponent` ships header / footer / split / bordered / size /
hover / row click / single-select. Pagination (нужен встроенный
`SgPagination` внутри), virtual scroll, grid breakpoints, DnD
reorder, multi-select c Ctrl/Cmd и `loadMore` slot — Wave 4.3.

## F-Tree-Limited — без checkable/draggable/loadData/search/edit/virtual

`SgTreeComponent` ships expand/collapse, single-select, directory
mode, `showLine`/`showIcon`. Checkable nodes (с halfChecked),
draggable rows, async `loadData`, search-bar c подсветкой, inline
edit, virtual scroll, keyboard-навигация и action-кнопки — Wave 4.3.

## F-Form-Skipped — Form/FormItem/FormProvider/FormList не портированы

React `Form` (179 строк) + `FormList` (161) + `FormProvider` (85)
напрямую завязаны на `@skygraph/core` `FormEngine`/контекст React.
Для Angular нужен переходный слой `provideSgForm()` (DI-токен,
рассчитанный на signal-форму) и порт `FormItem` (валидаторы,
ошибки, layout). Это сравнимо с отдельным batch-ом по объёму
(оценка: 600-800 строк нового Angular-кода + интеграция с
`@skygraph/core`). Перенесено целиком в Wave 4.3.

## F-Table-Skipped — Table/TableHeader/TableBody/TableGroupRow не портированы

React `Table` (854 строки) — большой компонент с виртуальным скролом,
sticky-колонками, sorter/filter UI, expandable rows, group rows,
selection, resizable columns. Объём не вписывается в волну 4.2 даже
в "best-effort"-режиме. Wave 4.3.
