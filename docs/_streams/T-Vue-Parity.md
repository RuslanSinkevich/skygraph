# Stream T-Vue-Parity — Visual & API parity demo-vue ↔ demo (React)

> Один стрим, отдельная вкладка. Цель — `examples/demo-vue` должен по
> составу demo-блоков и DOM-структуре совпадать с `examples/demo`
> (React) во всех «основных» компонентах. Angular не трогаем — отдельный
> стрим позже.

---

## 0. Контекст и установки от владельца

- Три demo-приложения хостятся как **отдельные поддомены**
  (`react.demo`, `vue.demo`, `angular.demo`). Никакого «общего React-хаба
  с табами фреймворков». Каждое приложение полное и автономное.
- Benchmarks — **уже подготовлены к встраиванию Vue**, реализация Vue-варианта
  для `examples/benchmarks` уже спроектирована в коде. Этот стрим только
  включает Vue-бенчмарки в основной BenchmarksPage (если потребуется
  правка) — увидишь по месту.
- Angular из этого стрима исключён.
- В конце стрима, если останется контекст, — портировать **DemoTOC** в
  Vue 1-в-1 с React, со следующими правками относительно текущей
  React-реализации:
  1. **TOC должен прилипать к верху и не уезжать со скроллом.** Сейчас в
     React визуально едет — починить и в React, и сразу правильно в
     Vue. Причина в существующей React-разметке (см. §6.2 ниже).
  2. **В конце карты — ссылки на блоки PropsTable и CssVarsTable**
     текущей страницы (отдельная секция «API» в TOC).

---

## 1. Текущее расхождение (по фактам)

Подсчёт `*.demo.{tsx,vue}` (12 мая 2026, рабочая копия):

| Компонент | React | Vue | Δ | Приоритет |
|---|---|---|---|---|
| **table** | 29 | 18 | **+11** | P0 |
| **calendar** | 14 | 9 | +5 | P0 |
| **datepicker** | 11 | 8 | +3 | P1 |
| **form** | 22 | 19 | +3 | P0 |
| **cascader** | 12 | 10 | +2 | P1 |
| **timepicker** | 9 | 7 | +2 | P1 |
| **timeline** | 12 | 10 | +2 | P1 |
| **breadcrumb** | 7 | 5 | +2 | P1 |
| **charts** | 15 | 14 | +1 | P2 |
| **tooltip** | 7 | 6 | +1 | P2 |
| **menu** | 10 | 9 | +1 | P2 |
| **dropdown** | 8 | 7 | +1 | P2 |
| **steps** | 9 | 8 | +1 | P2 |
| **segmented** | 8 | 7 | +1 | P2 |
| diagram | 11 | 13 | −2 | P3 (Vue впереди — выровнять React в другом стриме) |
| tree | 12 | 13 | −1 | P3 (то же) |
| event-timeline | 0 | 3 | −3 | P3 (то же) |
| resource-calendar | 2 | 3 | −1 | P3 |
| gantt | 2 | 3 | −1 | P3 |

Δ < 0 (Vue впереди) — **не в этом стриме**. Это исходящие задачи для
React-паритета, оформляются отдельно.

### Дельта по страницам (не demo-блоки, а целые страницы)

Vue **полностью отсутствуют**:
- Все guide-страницы: `GettingStarted`, `StylingShowcase`, `Theming`,
  `DesignTokens`, `CoreApi`, `ConfigProvider` (последняя у Vue есть как
  отдельный demo, но не как guide). У React есть в
  `examples/demo/src/demos/*Page.tsx`.
- `pages/Showcases/ShowcasesPage` (хаб шоукейсов).
- `pages/Benchmarks/BenchmarksPage` (хаб бенчмарков).

Поскольку владелец сказал «отдельные поддомены, у каждого приложения
своё всё» — guide-страницы и хабы должны появиться и в Vue. Они
лежат в P0/P1 ниже (см. §3.4).

---

## 2. Зона стрима

**Можно**:
- `examples/demo-vue/**`
- `examples/demo/**` — только §6 (DemoTOC sticky + API-секция) и в
  части где видны расхождения в React-демо после порта в Vue.
- `examples/_shared-vue/**` — если нужны общие компоненты layout.
- `examples/_shared/**` — только новые константы/locale-ключи, никаких
  правок существующих.
- `packages/vue/**` — расширение Vue Table API до уровня React (см. §3.1).
  Тесты — обязательно (`packages/vue/__tests__/Table/*`).
- `packages/styles/**` — только если найдётся явная регрессия по слоту
  стиля; иначе **не трогать**.

**Нельзя**:
- `examples/demo-angular/**`, `packages/angular/**`.
- `examples/showcases/**` (legacy React-only).
- `packages/core/**` — изменения API ядра вне scope.
- `packages/react/**` — кроме хирургических фиксов, нужных, чтобы Vue
  смог реализовать demo-блок без проксирования React-only типа. Любая
  правка `@skygraph/react` записывается в `decisions/T-Vue-Parity.md`.

---

## 3. Поэтапный план

Этапы строго последовательны. На каждом — `pnpm --filter demo-vue build`
и `pnpm --filter @skygraph/vue typecheck` зелёные перед переходом к
следующему.

### 3.1. Расширить Vue Table API до уровня React (P0, основной кусок)

Источник истины — `packages/react/src/components/Table/*` и
`packages/vue/src/components/complex/Table/types.ts`.

В Vue API сейчас **нет**: `expandable`, `tree`, `scroll`, `fixed` (на
колонке), `resizable` (на таблице и колонке), `editable`/`onCellEdit`,
`summary`, `virtual`, `loading`, `draggable`/`onColumnOrderChange`,
`filterDropdown`/`filterIcon`/`filterMode='search'`/`filterMultiple`/`filterSearch`/`defaultFilteredValue`,
`children` на колонке (ColumnGroups), `ellipsis`, `headerClassName`,
`onCell`.

**Подзадачи** (каждая — один коммит-ready набор):

1. `loading: boolean` — overlay со Spin поверх tbody.
2. `expandable: { expandedRowRender, defaultExpandedRowKeys?, onExpand? }`
   — кнопка-стрелка в первой колонке, доп. tr под раскрытой строкой.
3. `tree: { defaultExpandAllRows?, indentSize? }` — поддержка
   `children` в данных строки + indent + кнопка-стрелка.
4. `column.fixed: 'left'|'right'` + `scroll: { x?: number }` —
   горизонтальная прокрутка, sticky-колонки, тени.
5. `column.resizable: boolean` — drag-resize между th, persist в
   локальном state.
6. `column.editable` + `onCellEdit(id, key, value)` — inline-редактор
   (input/textarea/select) с двойным кликом / Enter.
7. `summary: (rows) => SummaryCell[][]` — sticky-tfoot.
8. `virtual: boolean | { rowHeight, overscan, height }` — через
   `VirtualEngine` из `@skygraph/core` (он же используется в React).
9. `column.children` — двухуровневые заголовки (ColumnGroups). DOM
   совпадает с React: 2 строки `<th>` с `colspan`.
10. Filter-API расширенный: `filterDropdown` (slot/функция),
    `filterIcon`, `filterMode='search'`, `filterMultiple`,
    `filterSearch`, `defaultFilteredValue`. В Vue — через `<slot
    name="filterDropdown:colKey">` плюс пропы.
11. `draggable: boolean` + `@columnOrderChange` — drag-reorder колонок
    через `pointerdown`-сенсор.
12. `column.ellipsis`, `column.headerClassName`, `column.onCell` —
    мелочёвка, делать одним PR в конце §3.1.

Тесты: `packages/vue/__tests__/Table/<feature>.test.ts` для каждой
новой фичи (минимум — рендер + ключевое поведение).

**Acceptance**:
- `pnpm --filter @skygraph/vue typecheck` зелёный.
- `pnpm --filter @skygraph/vue test` зелёный.
- DOM-структура у каждой новой фичи идентична React (классы `sg-table-*`
  совпадают; проверить через `examples/demo` живьём и через unit-тесты в
  React, если они есть).

### 3.2. Порт недостающих Table demo-блоков в Vue (P0)

После §3.1 портировать **все** 17 deferred demo по списку из шапки
`examples/demo-vue/src/demos/TableDemo.vue`. Имена файлов = имена в
React, но с `.demo.vue`. Соответствие сейчас:

| React (есть) | Vue (нет, добавить) |
|---|---|
| `Expandable.demo.tsx` | `Expandable.demo.vue` |
| `TreeData.demo.tsx` | `TreeData.demo.vue` |
| `FixedColumns.demo.tsx` | `FixedColumns.demo.vue` |
| `Resizable.demo.tsx` | `Resizable.demo.vue` |
| `Editable.demo.tsx` | `Editable.demo.vue` |
| `Summary.demo.tsx` | `Summary.demo.vue` |
| `ColumnGroups.demo.tsx` | `ColumnGroups.demo.vue` |
| `Virtual.demo.tsx` | `Virtual.demo.vue` |
| `VirtualDynamic.demo.tsx` | `VirtualDynamic.demo.vue` |
| `CustomFilterDropdown.demo.tsx` | `CustomFilterDropdown.demo.vue` |
| `AdvancedFilters.demo.tsx` | `AdvancedFilters.demo.vue` |
| `GlobalSearch.demo.tsx` | `GlobalSearch.demo.vue` |
| `Loading.demo.tsx` | `Loading.demo.vue` |
| `ProgressCells.demo.tsx` | `ProgressCells.demo.vue` |
| `FinanceStyle.demo.tsx` | `FinanceStyle.demo.vue` |
| `KitchenSink.demo.tsx` | `KitchenSink.demo.vue` |
| `Grouping.demo.tsx` | `Grouping.demo.vue` |

Имена `Basic.demo.vue` / `Filters.demo.vue` / `TokensOverride.demo.vue`
**переименовать** к React-каноничным: `BasicTable.demo.vue`,
`Filters.demo.vue → ColumnFilters.demo.vue` уже есть в Vue, но
React зовёт `Filters.demo.tsx` — выровнять Vue под React →
`Filters.demo.vue`. `TokensOverride.demo.vue → CustomTokens.demo.vue`.
Использовать новые имена в `TableDemo.vue` и удалить пометку «17/29 React
demos covered» из jsdoc.

**Acceptance**:
- `examples/demo-vue/src/demos/table/*.demo.vue` — 29 файлов с теми же
  именами что в React.
- `TableDemo.vue` импортирует все 29 и рендерит в том же порядке что
  `TableDemo.tsx`.
- `pnpm --filter demo-vue build` зелёный.
- Визуально на одном и том же роуте `/components/table` — список секций
  совпадает 1-в-1 (Basic, Sortable, Selection, Expandable, …).

### 3.3. Допортировать остальные компоненты с Δ > 0 (P0/P1)

Порядок:
1. `form` (Δ+3): добавить `SchemaFormBasic.demo.vue` (есть),
   `ProgrammaticControl.demo.vue`, `FormListDynamic.demo.vue`,
   `ProfileSettings.demo.vue`. Имена выровнять: React `BasicForm` ↔
   Vue `Basic` — переименовать в `BasicForm.demo.vue`. React
   `FormControls` ↔ Vue `Controls` — `FormControls.demo.vue`. React
   `DisabledForm` ↔ Vue `Disabled` — `DisabledForm.demo.vue`.
2. `calendar` (Δ+5): добавить `Card`, `CustomCell`, `CustomHeader`,
   `Locale`, `MultipleSelection`, `RangeSelection`. Удалить из Vue
   эксклюзив `WeekStartMonday` (или подтянуть в React — записать в
   findings).
3. `datepicker` (Δ+3): добавить `Presets`, `Range`, `RangePresets`,
   `RussianLocale`. Удалить `Unstyled.demo.vue` (в React нет) или
   добавить в React (`Unstyled.demo.tsx`) — решение по факту, записать
   в decisions.
4. `cascader` (Δ+2): `AsyncLoad`, `Multiple`.
5. `timepicker` (Δ+2): `DisabledSlots`, `Range`.
6. `timeline` (Δ+2): `Events`, `Horizontal`.
7. `breadcrumb` (Δ+2): `Dropdown`, `WithIcons`.
8. `charts` (Δ+1): `Brush`, `Crosshair`, `Animations` уже есть.
   Сверить какой ровно отсутствует — Vue нет, React есть; добавить.
9. `tooltip` (Δ+1): `RichContent`.
10. `menu` (Δ+1): `WithIcons`.
11. `dropdown` (Δ+1): `RichItems`.
12. `steps` (Δ+1): `CustomIcon`.
13. `segmented` (Δ+1): `WithIcons`.

**Acceptance**: после каждого пункта `pnpm --filter demo-vue build`
зелёный; визуальный обход `/components/<comp>` показывает одинаковый
список секций.

### 3.4. Guide / Showcases / Benchmarks страницы в Vue (P0)

В Vue сейчас нет:
- `pages/Showcases/ShowcasesPage.vue` — хаб мини-приложений. В Vue
  отсутствует, в React — `examples/demo/src/pages/Showcases/ShowcasesPage.tsx`.
- `pages/Benchmarks/BenchmarksPage.vue` — хаб бенчмарков. Vue Bench
  «подготовлен к встраиванию» (см. установку владельца), значит
  основная инфраструктура есть — нужно только подключить и сделать
  страницу в demo-vue.
- Guide: `GettingStartedPage.vue`, `ThemingPage.vue`,
  `DesignTokensPage.vue`, `CoreApiPage.vue`, `StylingShowcasePage.vue`.

Шаги:
1. Перенести структуру `pages/{Landing,Roadmap,About}` уже есть в
   demo-vue — расширить аналогами `Benchmarks` и `Showcases`. DOM-
   разметка 1-в-1 c React, тексты — через существующий
   `useDemoStrings`/глобальный i18n.
2. Перенести `demos/{GettingStartedPage,ThemingPage,DesignTokensPage,
   CoreApiPage,StylingShowcasePage}.tsx` в `.vue` с теми же якорями
   (`id="installation"`, `id="dark-mode"` и т.д.), теми же данными
   токенов (`src/tokens/tokens-data.ts` уже общий — переиспользовать
   через импорт).
3. Подключить в роутер `examples/demo-vue/src/App.vue` (или его
   аналог) ровно по тем же ключам, что в React `App.tsx`:
   `guide/getting-started`, `guide/theming`, `guide/design-tokens`,
   `guide/core-api`, `guide/styling-showcase`, `guide/config-provider`,
   `showcases`, `benchmarks`, `benchmarks/table`, `benchmarks/tree`,
   `benchmarks/chart`.
4. `LEGACY_GUIDE_KEYS` тоже воспроизвести — чтобы старые ссылки
   `#/theming` работали и в Vue-демо.

**Acceptance**: список верхней навигации (Header) у demo-vue совпадает
с demo (React); по каждой ссылке открывается своя страница; пустых 404
нет.

### 3.5. (Опционально, если есть контекст) DemoTOC в Vue (P2)

После §3.1–3.4. См. §6 ниже.

---

## 4. Правила локализации (в этом стриме)

- **Не добавлять** новых ключей в глобальный `DemoDict` без необходимости.
  Каждый новый demo-блок имеет свой `*-doc/useStrings.ts` (Vue-паттерн)
  с парой `en.ts` / `ru.ts`. Это уже принятый стандарт.
- Любая новая UI-строка в guide-страницах — обе локали `en/ru`. Если в
  существующих React-страницах строка хардкоженая — не локализуем (это
  работа другого стрима), Vue вставляет такую же хардкоженую.

---

## 5. Контракт API parity

Перед каждым demo проверять:
1. Vue-компонент использует только пропы/слоты, объявленные в
   `packages/vue/src/components/.../types.ts`. Если фичи нет — §3.1
   доделать раньше.
2. Названия пропов в `PropsTable` у Vue и React **совпадают** там, где
   это объективно один и тот же API. Эмиты Vue (`@rowClick`) и
   коллбэки React (`onRowClick`) показываем оба, но описание одинаковое.
3. DOM-классы `sg-*` идентичны. Проверка — `document.querySelectorAll`
   на одном и том же роуте между двумя демо в DevTools.

---

## 6. DemoTOC: фиксы и порт в Vue (хвостовая часть)

### 6.1. Что делать

Создать `examples/demo-vue/src/components/DemoTOC/` 1-в-1 по структуре
`examples/demo/src/components/DemoTOC/`:
- `slugify.ts` — взять как есть, без правок.
- `DemoTOCContext.ts` (Vue: `provide`/`inject` через `InjectionKey<T>`)
  — composable `useDemoTOC()` + `useDemoTOCProvider()`. Регистрация
  через `provide({ register, getIdFor, items, activeId, ... })`.
- `useDemoTOC.ts` → `useDemoTOC.ts` (composable, возвращает `id:
  Ref<string|undefined>` и `ref: Ref<HTMLElement|null>`).
- `intersection.ts` — переписать на `onMounted`/`onBeforeUnmount`,
  IntersectionObserver инстанциируется в `watchEffect`.
- `DemoTOC.vue` — sticky-панель, разметка идентична `DemoTOC.tsx`.
- `strings.ts` — `useDemoStrings` (vue-аналог уже есть в проекте).
- `demo-toc.css` — общий, импортировать из React-папки **нельзя**
  (это другая зона по cross-app); сделать копию в Vue-папке.
- `index.ts` — реэкспорт.

`DemoBox.vue` расширить аналогично React: `useDemoTOC(title)` в setup,
повесить `:id` и `:ref` на корень. Контекст отсутствует — no-op.

`ComponentDoc.vue` обернуть в `<DemoTOCProvider>` + добавить
правую aside-колонку с `<DemoTOC />`.

### 6.2. Sticky-фикс (актуально и для React)

Текущая проблема в React: `nav.demo-toc` с `position: sticky; top:
72px` лежит внутри `aside.doc-toc-aside`, который лежит в
`.doc-with-toc` (grid). Контейнер sticky — `aside`. `align-self: start`
стоит **на nav**, а должно быть **на aside**. Из-за этого aside может
схлопываться по высоте контента nav, и sticky прокручивается вместе с
гридом.

Чинить так:
1. В `demo-toc.css`: `.doc-toc-aside { position: sticky; top:
   var(--demo-toc-sticky-top); align-self: start; height:
   fit-content; }`. Sticky-контейнер — сам aside.
2. `.demo-toc` — обычный блок внутри aside, без `position: sticky`.
   `max-height: calc(100vh - var(--demo-toc-sticky-top) - 24px)`
   оставить на nav для скроллинга длинного списка.
3. Проверить в Chrome DevTools: `position: sticky` работает только
   если у всех родителей до scroll-контейнера **нет** `overflow:
   hidden|auto|scroll`. У `.xshell-main` и `.xshell-main-inner`
   убедиться что overflow нет; если есть — поправить на `visible`.

В Vue делать **сразу** правильно, без промежуточной стадии бага.

### 6.3. Ссылки на API (PropsTable, CssVarsTable) в конце TOC

Сейчас TOC регистрирует только `DemoBox`. Нужно добавить второй сорт
записей — «API-якори».

Подход:
1. В `PropsTable.vue` (и `.tsx`) принимать необязательный `id` или
   использовать уже существующий `title` через тот же `useDemoTOC`-
   хук. Если контекст есть — регистрировать запись с типом
   `'api'`, с `title = title` (например, "Table API", "Column API",
   "CSS Variables").
2. В `DemoTOCContext` ввести поле `kind: 'demo' | 'api'`. В `DemoTOC.vue`
   разделить список визуально: между demo-секциями и API-блоком —
   тонкая разделительная линия + малый заголовок «API» (локаль:
   en `"API"`, ru `"API"`).
3. В React сделать тот же фикс — раз правится React-CSS под sticky,
   логично сразу выровнять и список TOC. Записать в
   `decisions/T-Vue-Parity.md`.

**Acceptance**:
- На `/components/table` (React и Vue) в TOC после списка demo идёт
  разделитель и три ссылки: "Table API", "Column API", "CSS Variables"
  — все скроллятся к соответствующим таблицам.
- Sticky не уезжает: при прокрутке страницы TOC прижат к
  `var(--demo-toc-sticky-top)` и сам внутри скроллится, если длинный.

---

## 7. Команды

```bash
# Перед стартом — не запускать!
# pnpm install — НЕЛЬЗЯ.

# Точечные:
pnpm --filter @skygraph/vue typecheck
pnpm --filter @skygraph/vue test
pnpm --filter @skygraph/vue build
pnpm --filter demo-vue typecheck   # если есть; иначе:
cd examples/demo-vue && npx vue-tsc --noEmit
pnpm --filter demo-vue build
pnpm --filter demo-vue dev          # для визуальной проверки

# React (для §6 и для diff-проверок):
pnpm --filter demo build
pnpm --filter demo dev
```

Глобальные `pnpm typecheck/build/test/install/clean/lint` — **НЕЛЬЗЯ**
(CHARTER §2.2).

---

## 8. Финал

Стрим заканчивается отчётом в `docs/_streams/done/T-Vue-Parity.md`:
- список изменённых файлов;
- что портировано / что отложено и почему;
- diff-таблица «React demo count ↔ Vue demo count» после стрима (должна
  быть Δ=0 для всех P0/P1 компонентов);
- скриншоты До/После для трёх ключевых страниц: `/components/table`,
  `/components/calendar`, `/components/form`;
- известные баги, если остались.

Все обнаруженные расхождения в React (Δ < 0 в §1) — в
`findings/T-Vue-Parity.md` отдельным списком, чинить в следующем
стриме.

---

## 9. Acceptance (общий)

1. `pnpm --filter @skygraph/vue typecheck && test && build` — зелёные.
2. `pnpm --filter demo-vue build` — зелёный.
3. `/components/<comp>` на demo и demo-vue визуально совпадает по
   составу demo-секций для всех P0/P1 компонентов (см. §1).
4. На demo-vue работают разделы `/guide/*`, `/showcases`, `/benchmarks`,
   `/benchmarks/{table,tree,chart}` — те же ключи что в React.
5. (Если §3.5 выполнено) DemoTOC в demo-vue работает, не уезжает,
   содержит ссылки на API; React-версия тоже не уезжает и содержит
   API-якори.
6. Никаких изменений в `examples/demo-angular/**`, `packages/angular/**`,
   `examples/showcases/**`.
