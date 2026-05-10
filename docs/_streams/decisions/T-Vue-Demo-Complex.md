# Decisions — T-Vue-Demo-Complex

> Принятые архитектурные решения (Волна 3.2 / Tab D), отклоняющиеся от
> буквы карты или CHARTER §6.1.

## 1. Источник примеров — существующие `pages/<Comp>Page.vue`

**Карта говорит**: переносим React `<comp>/*.demo.tsx` → Vue `<comp>/*.demo.vue`.

**Реальность**: у Vue API сильно отличается от React (`useForm` vs `Form`-контекст,
`SgField` слот-проп `{ value, onChange }` vs React `Form.Item`, события Vue
эмиты vs React-коллбэки). Буквальный 1:1 перенос React-примеров требует
~×2 объёма по сравнению с разрезанием уже работающих Vue-демо из
`pages/<Comp>Page.vue` на атомные `*.demo.vue`.

**Решение**: для каждого из 11 компонентов **источник истины — текущий
`pages/<Comp>Page.vue`**. Каждый `<DemoBox>` из него вырезается в отдельный
`*.demo.vue`. Если у React-агрегатора есть пример, которого нет в Vue
(особенно Form 22 vs 5, Table 29 vs 6), — добавляется новый Vue-пример,
смоделированный по идиоме React-аналога, но с Vue API.

Это даёт паритет «по объёму примеров» с минимальными затратами и без риска
сломать визуал работающих компонентов.

## 2. Doc-словари: один файл на компонент, en — источник истины

Карта (через образец Button) предполагает `<comp>-doc/{en,ru,useStrings}.ts`
с раздельными en/ru. Так и делаем для всех 11 компонентов. **English**
содержит `as const` объект — источник ключей; **Russian** обязан match
через `{ [K in keyof typeof <name>DocEn]: string }`.

`useStrings.ts` всегда `useI18n()` + `computed()` → `ComputedRef<<Comp>DocStrings>`.
Локально внутри `*.demo.vue` мелкие подписи через `useDemoStrings({en,ru})`.

## 3. CssVarsTable пропускается для 4 компонентов

Согласно карте (§Особые случаи):
- `charts` — без CssVarsTable (React тоже без, finding `charts-no-css-vars-react`).
- `diagram` — без CssVarsTable (React тоже без).
- `dashboard` — без CssVarsTable (React тоже без).
- `schema-form-editor` — без CssVarsTable (React тоже без).

Для остальных 7 компонентов (form / table / tree / list / gantt /
event-timeline / resource-calendar) CssVarsTable есть в React → есть в Vue,
с теми же 1:1 переменными.

## 4. `Gantt`/`EventTimeline`/`ResourceCalendar` — Vue шире React (3 vs 2)

Карта прямо указывает: **не сокращаем** Vue до 2 примеров. Берём 3
существующих Vue-примера из `pages/<Comp>Page.vue` как есть.

В отчёте в таблице «N Vue / N React» помечаем «Vue шире».

## 5. `Form` — порог 11/22, `Table` — 15/29 (карта §E)

- Form: 5 существующих Vue-примеров + 6 новых (~`Required`, `Sizes`,
  `Layout` уже есть; добавим `LiveWatch`, `DependentFields`, `AsyncValidation`,
  `LoginCard`, `NestedFields`, `FormListDynamic` — всего ~11). Остаток (11)
  → finding `form-deferred-N`.
- Table: 6 существующих + 9 новых (`Sortable`, `Filters`, `Search`,
  `Pagination`, `Sizes`, `Selection`, `Expandable`, `Resizable`,
  `Grouping`, `Virtual`, `EmptyState`, `RowClassName`, `Realtime`,
  `KitchenSink` — всего ≥15). Остаток (~14) → finding `table-deferred-N`.

## 6. `schema-form-editor` — миграция архитектурная

Паритет 2/2. Берём 2 существующих Vue-примера (`Basic` + `WithInitialSchema`)
из `pages/SchemaFormEditorPage.vue` и адаптируем имена под React-аналог
(`Builder` + `Prefilled`). **Без `--with-css-vars`**.

## 7. Названия файлов и роутов

Vue имеет роуты:
- `/components/event-timeline` (с дефисом)
- `/components/resource-calendar` (с дефисом)
- `/components/schema-form-editor` (с дефисом)
- `/components/gantt`
- `/components/form`, `/components/table`, и т.д.

PascalCase агрегаторы:
- `EventTimelineDemo.vue`, `ResourceCalendarDemo.vue`,
  `SchemaFormEditorDemo.vue`, `GanttDemo.vue` и т.д.

Папки демо: `event-timeline/`, `resource-calendar/`, `schema-form-editor/`,
`gantt/`, `form/`, `table/`, `tree/`, `list/`, `diagram/`, `charts/`,
`dashboard/`.

Doc: `event-timeline-doc/`, `resource-calendar-doc/`,
`schema-form-editor-doc/`, и т.д.

## 8. Таблица CSS-vars берётся 1:1 из React-`<Comp>Demo.tsx`

Где у React `CssVarsTable` есть, переменные **полностью** копируются (имя,
default, описание). Описания — из React-`<comp>-doc/en.ts`; русский — из
`ru.ts` если есть, иначе перевод вручную ключ-в-ключ.

## 9. Не используется `scripts/gen-vue-demo.mjs`

Шаблон генератора рассчитан на 1 пустой пример с placeholder-копией. Для
компонентов из этого таба (где у нас уже есть готовые рабочие примеры в
`pages/<Comp>Page.vue`) проще создать файлы вручную. Это не отклонение
от карты — карта оговаривает «генератор → быстрый старт», но не запрещает
ручную миграцию. Запись здесь, чтобы не было сюрпризов при ревью.

## 10. PropsTable показывает только реальные Vue-props

Аналогично решению 3.1 №4 (Button): `className`, `style`, `unstyled`
(если нет в Vue), React-only коллбэки → не указываем. Только то, что
действительно в `@skygraph/vue` пропсах + `@change`/`@click`/etc эмиты.

## 11. `unstyled` проп: где есть — указываем, где нет — finding

Vue-страницы документировали `unstyled` для всех визуализационных
компонентов. Проверяем по `packages/vue/src/components/complex/<Comp>/<Comp>.vue`:
если проп есть — указываем; нет — finding `<comp>-unstyled-not-in-vue`.

## 12. Большие словари с 30+ ключами генерируем по типу React

Образец React `*-doc/en.ts` уже хорошо структурирован: `pageTitle`,
`crumb*`, `pageWhen*`, `demo*Title/Desc`, `prop*`, `cssHint`, `cssSg*`.
Vue-словарь повторяет ключ-в-ключ. Если у React пример которого нет в
Vue — ключи остаются (документация валидна), но `*Title/Desc` для
несуществующих в Vue примеров **не используются** в агрегаторе.
