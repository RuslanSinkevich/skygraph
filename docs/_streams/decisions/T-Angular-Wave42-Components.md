# T-Angular-Wave42-Components — Decisions

Стрим: Wave 4.2 — порт компонентов в `@skygraph/angular`.
Базируется на 4.1 (`SgButton`, `SgSpin`, `SgConfigProvider`).

## D1 — Атрибутные селекторы для каждого компонента батчей A–C

В карте сказано «атрибутный для host-element компонентов (Button, Input,
Tag, Badge, Tooltip-host, Switch, Checkbox, Radio), обычный — для
компонентов с собственным DOM (Modal, Drawer, Tabs, Menu, …)».

**Решение 4.2:** атрибутный селектор используется **для каждого**
компонента, у которого React рендерит **один корневой тег с
`sg-…`-классом** (Tag, Badge, Avatar, Tooltip-wrapper, Skeleton,
Progress, Empty, Result, Switch, Checkbox, Radio-group, Slider, Rate,
ColorPicker, Input, InputNumber, Textarea, …, Pagination, Steps,
Segmented, Carousel, Collapse, Descriptions, Breadcrumb, Tabs, Menu,
Dropdown-trigger, Timeline). Это даёт DOM 1:1 c React: `<span sg-tag
class="sg-tag …">` вместо `<sg-tag><span class="sg-tag">…</span></sg-tag>`.

Обычный селектор (`sg-…`) — только там, где React сам рендерит свой
корневой элемент через портал/overlay (Modal, Drawer, Notification,
Popconfirm-content, Mentions-suggestions). На уровне 4.2 их minimal
overlay-форма всё равно завернута в собственный корневой `div`, поэтому
формально такие компоненты используют обычный селектор `sg-modal`,
`sg-drawer`, `sg-notification`, `sg-popconfirm`, …

## D2 — `checkedChildren` / `unCheckedChildren` у Switch — строки, не ReactNode

React-параметры `checkedChildren?: ReactNode` /
`unCheckedChildren?: ReactNode` поддерживают любой узел. Angular в
этом стриме принимает их как `string | undefined`. Если потребуется
богатый контент (иконка), консьюмер делает unstyled-версию или
оборачивает свой шаблон. Богатый Slot-API через `<ng-template>`
оставлен на 4.3.

То же ограничение — для props `text` (Badge, Switch), `title`
(Tooltip), `description` (Empty), `image` (Empty), `extra` / `subTitle` /
`title` (Result), `icon` (Avatar/Result). Всё, что в React `ReactNode`,
в Angular — `string` либо контентная проекция через `<ng-content
select="…">` для составных кейсов.

## D3 — `value`/`onChange` (controlled) → `[(value)]`

Везде, где React имеет controlled+uncontrolled пары
`value`+`defaultValue`+`onChange`, Angular получает:
- `@Input() value` — controlled,
- `@Input() defaultValue` — uncontrolled initial,
- `@Output() valueChange = new EventEmitter()` — для banana-box
  `[(value)]`,
- логика «если `value` задан — controlled, иначе internal signal»
  совпадает с React.

Дублирующий `@Output() change` для совместимости с React-`onChange`
именованием **не вводим** (одна точка истины — `valueChange`),
так как `[(…)]` — каноничная Angular-форма.

## D4 — Один файл компонента, без `.html`/`.css`

Шаблон и стили — `template:`/`styles:` инлайн прямо в
`@Component`-декораторе. Это совпадает с 4.1 (`sg-button`, `sg-spin`)
и снижает шум в репо. Исключение — `<comp>-page.component` в demo,
где HTML вынесен в `*.component.html` (унаследовано от 4.1
`button-page.component.html`).

## D5 — Spin inline без импорта `SgSpinComponent`

`SgSpinComponent` остаётся standalone-компонентом, но в loading-aware
компонентах (Switch, Checkbox, RadioGroup, Tag, Pagination, Tabs) мы
**не** импортируем `SgSpinComponent`, а инлайним
`<span class="sg-spin sg-spin-small" role="status"></span>` — точно как
делает Vue (см. 4.1 finding F1 / Vue D-1) для экономии бандла.

## D6 — Pagination / Tabs / Menu — без runtime-`Spin` в текущей реализации

В React эти компоненты в loading-режиме инлайнят `<Spin>` маленьким.
В Angular 4.2 они получают `[loading]` input, но визуально только
добавляют класс `sg-…-loading` на хост — без spinner внутри. Это
оставит DOM немного беднее, но не ломает CSS-контракт. Закроем в 4.3,
если будет время. (Зафиксировано как F-Pagination-Loading в findings.)

## D7 — Modal / Drawer / Notification / Popconfirm — inline, без портала

В React/Vue эти компоненты телепортируются в `document.body` через
React-портал / Vue `<Teleport>`. В Angular 4.2 они рендерятся **inline**
в том месте дерева, где их объявил консьюмер. CDK Overlay не подключаем
(нет в стриме). DOM при `[open]=true` — точно тот же, что в React
(один корневой `<div class="sg-modal-mask">` + `<div
class="sg-modal-wrap">`), но визуально может перекрываться родительским
`overflow: hidden`. Финдинг F-Overlay-Inline.

## D8 — Locales — append-only

Локали `en_US` / `ru_RU` (4.1) уже содержат все ключи `SgLocale`
(см. `packages/angular/src/lib/locales/en_US.ts`). Никаких новых ключей
4.2 не добавляет. `locale.types.ts` тоже не правится — все интерфейсы
уже есть.

## D9 — Парность-тест

В `__tests__/styling-contract.parity.test.ts` (один файл, как в 4.1)
расширяем кейсами на каждый компонент A–D. Один тест = одна `host`-
страница + один `it()` с проверкой класса/aria/тэга. Глубокое сравнение
полного DOM-shape — только для самых критичных (Switch / Checkbox /
RadioGroup / Slider / Rate, Modal, Tabs).

## D10 — Demo-страницы — копия `examples/demo/<comp>` для шапки

Каждая страница — `<h1>Name</h1>` + `<p class="lead">…</p>` + 2–4
`<section class="demo-section">` с примерами. CSS общий между
страницами — переиспользуем `:host` блок из `button-page.component`,
скопированный inline (мини-шаблон, без выноса в shared, чтобы не
расширять зону файлов).

## D11 — TimePicker / DatePicker / Calendar — без сторонних дат-либ

React/Vue компоненты используют только нативные `Date` без
`dayjs`/`luxon`. Angular делает то же.

## D12 — Carousel — без авто-проигрывания таймером в Wave 4.2

Авто-перелистывание (`autoplay`/`interval`) реализовано как no-op
input + finding. Ручное перелистывание (стрелки + индикаторы) — есть.

## D13 — Complex (List, Tree, Form) — best-effort

`List` и `Tree` портируем как простые рекурсивные компоненты. `Form` —
если `@skygraph/core` `FormEngine` имеет совместимый API — оборачиваем,
иначе finding и пропуск. Charts/Diagram/Gantt/Dashboard/ResourceCalendar/
SchemaFormEditor — отложены на Wave 4.3 как отдельная карта.
