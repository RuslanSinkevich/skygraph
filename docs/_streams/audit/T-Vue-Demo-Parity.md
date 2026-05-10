# T-Vue-Demo-Parity — аудит разрывов

> Стрим: `T-Vue-Demo-Foundation` (Волна 3.1).
> Источник:
> - React: `examples/demo/src/demos/<Comp>Demo.tsx` (количество `<DemoBox`,
>   `<PropsTable`, `<CssVarsTable` через `rg`).
> - Vue: `examples/demo-vue/src/pages/<Comp>Page.vue` (то же).
>
> Считается **верхняя оценка** — `<DemoBox …>` встречается в шаблоне ровно
> один раз на пример. Где у React и Vue число совпадает по DemoBox, но в
> Vue нет `CssVarsTable`, разрыв считается по vars.

## 1. Сводная таблица (все React-компоненты)

| Component | React DemoBox | React CSS-vars | React PropsTable | Vue DemoBox (now) | Vue CSS-vars (now) | Vue PropsTable (now) | Gap (DemoBox / CSS-vars) |
|---|---:|---:|---:|---:|---:|---:|---|
| AutoComplete       |  7 | 1 | 2 | 4 | 0 | 2 | −3 / −1 |
| Avatar             |  8 | 1 | 1 | 3 | 0 | 1 | −5 / −1 |
| Badge              |  8 | 1 | 1 | 3 | 0 | 1 | −5 / −1 |
| Breadcrumb         |  7 | 1 | 2 | 3 | 0 | 2 | −4 / −1 |
| Button             |  8 | 1 | 1 | 5 | 0 | 1 | −3 / −1 |
| Calendar           | 14 | 1 | 2 | 5 | 0 | 1 | −9 / −1 |
| Carousel           |  7 | 1 | 1 | 3 | 0 | 1 | −4 / −1 |
| Cascader           | 12 | 1 | 2 | 6 | 0 | 1 | −6 / −1 |
| Charts             | 15 | 0 | 5 | 5 | 0 | 1 | −10 /  0 |
| Checkbox           |  7 | 1 | 1 | 2 | 0 | 1 | −5 / −1 |
| Collapse           | 12 | 1 | 2 | 4 | 0 | 2 | −8 / −1 |
| ColorPicker        |  9 | 1 | 1 | 5 | 0 | 1 | −4 / −1 |
| ConfigProvider     |  7 | 0 | 4 | 3 | 0 | 1 | −4 /  0 |
| Dashboard          |  7 | 0 | 4 | 2 | 0 | 2 | −5 /  0 |
| DatePicker         | 11 | 1 | 3 | 4 | 0 | 1 | −7 / −1 |
| Descriptions       |  9 | 1 | 2 | 4 | 0 | 2 | −5 / −1 |
| Diagram            | 11 | 0 | 2 | 2 | 0 | 1 | −9 /  0 |
| Drawer             |  7 | 1 | 1 | 2 | 0 | 1 | −5 / −1 |
| Dropdown           |  8 | 1 | 2 | 4 | 0 | 2 | −4 / −1 |
| Empty              |  8 | 1 | 1 | 4 | 0 | 1 | −4 / −1 |
| EventTimeline      |  2 | 1 | 2 | 3 | 0 | 1 |  +1 / −1 |
| Form               | 22 | 1 | 4 | 5 | 0 | 2 | −17 / −1 |
| Gantt              |  2 | 1 | 3 | 3 | 0 | 1 |  +1 / −1 |
| Input              | 11 | 1 | 2 | 5 | 0 | 1 | −6 / −1 |
| InputNumber        |  8 | 1 | 1 | 4 | 0 | 1 | −4 / −1 |
| List               | 14 | 1 | 3 | 6 | 0 | 1 | −8 / −1 |
| Menu               | 10 | 1 | 2 | 2 | 0 | 1 | −8 / −1 |
| Modal              |  7 | 1 | 1 | 2 | 0 | 1 | −5 / −1 |
| Notification       |  9 | 1 | 3 | 4 | 0 | 1 | −5 / −1 |
| Pagination         |  8 | 1 | 1 | 3 | 0 | 1 | −5 / −1 |
| Popconfirm         |  7 | 1 | 1 | 4 | 0 | 1 | −3 / −1 |
| Progress           |  9 | 1 | 1 | 3 | 0 | 1 | −6 / −1 |
| Radio              |  6 | 1 | 2 | 3 | 0 | 1 | −3 / −1 |
| Rate               |  8 | 1 | 1 | 5 | 0 | 1 | −3 / −1 |
| ResourceCalendar   |  2 | 1 | 1 | 3 | 0 | 1 |  +1 / −1 |
| Result             |  8 | 1 | 1 | 5 | 0 | 1 | −3 / −1 |
| SchemaFormEditor   |  2 | 0 | 2 | 2 | 0 | 1 |   0 /  0 |
| Segmented          |  8 | 1 | 1 | 4 | 0 | 1 | −4 / −1 |
| Select             |  8 | 1 | 2 | 4 | 0 | 1 | −4 / −1 |
| Skeleton           |  9 | 1 | 1 | 3 | 0 | 1 | −6 / −1 |
| Slider             |  7 | 1 | 1 | 3 | 0 | 1 | −4 / −1 |
| Spin               | 10 | 1 | 1 | 3 | 0 | 1 | −7 / −1 |
| Steps              |  9 | 1 | 2 | 4 | 0 | 2 | −5 / −1 |
| Switch             |  8 | 1 | 1 | 3 | 0 | 1 | −5 / −1 |
| Table              | 29 | 1 | 2 | 6 | 0 | 1 | −23 / −1 |
| Tabs               |  7 | 1 | 2 | 3 | 0 | 1 | −4 / −1 |
| Tag                |  8 | 1 | 1 | 3 | 0 | 1 | −5 / −1 |
| Textarea           |  — |  — | — | 4 | 0 | 1 | n/a — Vue-only, нет React-аналога |
| Timeline           | 10 | 1 | 2 | 4 | 0 | 2 | −6 / −1 |
| TimePicker         |  9 | 1 | 2 | 5 | 0 | 1 | −4 / −1 |
| Tooltip            |  7 | 1 | 1 | 2 | 0 | 1 | −5 / −1 |
| Transfer           |  7 | 1 | 2 | 5 | 0 | 1 | −2 / −1 |
| Tree               | 12 | 1 | 2 | 5 | 0 | 1 | −7 / −1 |
| TreeSelect         |  7 | 1 | 2 | 6 | 0 | 1 |  −1 / −1 |
| Upload             |  9 | 1 | 2 | 5 | 0 | 1 | −4 / −1 |

> Дополнительные React-демо без отдельной Vue-страницы:
> - `FormComponentsDemo.tsx` (10 / 0 / 4) — это сводная страница «компоненты внутри Form»,
>   а не таблица для одного компонента; в Vue не предполагается.
> - `GettingStartedPage` — гайд, не компонент.

## 2. Итог по volume

- **Всего пар «React vs Vue» с разрывом**: 53 (все компоненты, кроме `SchemaFormEditor`).
- **CSS-vars не реализованы** в Vue **во всех** случаях (нет `CssVarsTable.vue`
  на момент написания этого аудита; создаётся в Шаге 3 этого стрима).
- **Самые большие разрывы по DemoBox**: Table −23, Form −17, Charts −10,
  Calendar −9, Diagram −9, Collapse −8, Menu −8, List −8, Tree −7, Spin −7,
  DatePicker −7.
- Vue обгоняет React по количеству только в нишевых случаях: `EventTimeline`,
  `Gantt`, `ResourceCalendar` (+1 каждый) — эти 3 демо в React были упрощены
  как «черновик с 2 примерами», Vue был написан позже и сразу шире.
- `SchemaFormEditor` — паритет.

## 3. Распределение разрывов по табам Волны 3.2

Списки компонентов берутся из `docs/_streams/wave-3/CHARTER.md` §3.2.

### Tab A — `T-Vue-Demo-Forms` (18, data-entry)

`Input`, `InputNumber`, `Textarea`, `Select`, `AutoComplete`, `TreeSelect`,
`Cascader`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Rate`, `ColorPicker`,
`DatePicker`, `TimePicker`, `Calendar`, `Upload`, `Transfer`.

Среднее отставание по DemoBox: **−4.7**. Самые тяжёлые: `Calendar` −9,
`DatePicker` −7. CSS-vars: **18/18 нужно дописать**.

### Tab B — `T-Vue-Demo-Display` (13)

`Avatar`, `Badge`, `Tag`, `Tooltip`, `Carousel`, `Collapse`, `Descriptions`,
`Empty`, `Result`, `Skeleton`, `Spin`, `Progress`, `Timeline`.

Среднее: **−5.0**. Самое тяжёлое: `Collapse` −8. CSS-vars: **13/13**.

### Tab C — `T-Vue-Demo-NavFeedback` (12)

`Tabs`, `Menu`, `Breadcrumb`, `Dropdown`, `Pagination`, `Steps`, `Segmented`,
`Modal`, `Drawer`, `Popconfirm`, `Notification`, `ConfigProvider`.

Среднее: **−4.8**. Самые тяжёлые: `Menu` −8, `DatePicker` −7. CSS-vars:
**11/12** (`ConfigProvider` без CSS-vars и в React).

### Tab D — `T-Vue-Demo-Complex` (12)

`Form`, `Table`, `Tree`, `List`, `Diagram`, `Charts`, `Dashboard`, `Gantt`,
`EventTimeline`, `ResourceCalendar`, `SchemaFormEditor`, `(Button — закрыт в 3.1)`.

Среднее: **−7.5** (без Button, который мигрируется здесь, в 3.1). Самые
тяжёлые: `Table` −23, `Form` −17, `Charts` −10. CSS-vars: **8/12** (Charts,
Dashboard, Diagram, SchemaFormEditor — в React тоже без `CssVarsTable`).

### Tab E — `T-Vue-Demo-StyleFixes`

Не имеет своих компонентов; работает по `vue-broken-styles.md`
(см. соседний документ).

## 4. Замечания по подсчёту

- `<DemoBox` считалось через `rg --type-add 'tsx:*.tsx' -t tsx -c '<DemoBox'`,
  то же для `*.vue`. Подсчёт совпадает с количеством отдельных «карточек»,
  потому что в обоих демо `<DemoBox … />` всегда самозакрывающийся или
  открывающий тег без вложенного дубликата.
- `<CssVarsTable` и `<PropsTable` — то же.
- Если React-демо использует `<DemoBox>` внутри утилитарной обёртки (например
  `FormComponentsDemo` рендерит блоки из общего helper), число всё ещё
  считается по вхождениям тега — **не** по количеству форм. Это даёт
  верхнюю оценку и не занижает gap.

## 5. Что делает дальше каждый таб 3.2

Для каждой строки таблицы со «−N / −M» в `Gap` таб должен:

1. Прочитать React `<Comp>Demo.tsx` + `<comp>/*.demo.tsx` + `<comp>-doc/{en,ru}.ts`.
2. Создать недостающие `<comp>/<Example>.demo.vue` и `<comp>-doc/{en,ru,useStrings}.ts`
   в Vue.
3. Подключить через `<Comp>Demo.vue` агрегатор + `?raw`-импорты.
4. Добавить `CssVarsTable` ровно по тем же CSS-vars, что в React.
5. Удалить `pages/<Comp>Page.vue` и заменить маршрут в `router/index.ts`.

Эталон — миграция Button в этом же стриме.
