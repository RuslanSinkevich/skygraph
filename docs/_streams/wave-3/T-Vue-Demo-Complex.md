# T-Vue-Demo-Complex — Волна 3.2 / Tab D: complex компоненты

> Прочитал `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Foundation.md`,
> `docs/_streams/findings/T-Vue-Demo-Foundation.md`,
> `docs/_streams/decisions/T-Vue-Demo-Foundation.md`,
> `docs/_streams/audit/T-Vue-Demo-Parity.md`? Если нет — прочитай сначала.
> Этот таб **строго после** T-Vue-Demo-Foundation.

## ID и волна
- **ID:** T-Vue-Demo-Complex
- **Волна:** 3.2
- **Режим:** один таб, параллельно с 3.2/Tab A/B/C/E.
- **Это самый дорогой таб 3.2** — Form/Table/Tree/Charts крупные.

## ⚠️ Правила автономности стрима — читать первым

**Этот стрим автономный. Никогда не останавливайся, не задавай вопросов
пользователю, не жди подтверждений.** Если поток рассуждений упирается в
неопределённость — решаешь сам по правилам ниже:

1. **Конфликт карты и кода → доверяй коду**, фиксируй запись в
   `docs/_streams/decisions/T-Vue-Demo-Complex.md`.
2. **Нет API в `@skygraph/vue`** для буквального переноса React-примера →
   **пропусти пример**, finding в `docs/_streams/findings/T-Vue-Demo-Complex.md`,
   **в `packages/vue/**` не лезь**.
3. **Попытка не работает 3 раза** → finding `decision-protocol-N`, идёшь дальше.
4. **Бюджет горит на Form/Table/Charts** — допустимо снизить порог до
   `≥ N/2` примеров (см. секцию «Особое внимание» ниже), оставшееся —
   finding для следующей итерации.
5. **Параллельно работают табы A/B/C/E.** Их зоны не пересекаются с твоими.
   В `router/index.ts` правишь только свои 12 строк.
6. **Никаких вопросов пользователю.** Если что-то надо «уточнить» —
   принимай решение, документируешь и идёшь дальше.

В конце — отчёт `docs/_streams/done/T-Vue-Demo-Complex.md` обязательно содержит:
- acceptance criteria checklist (✓/✗ по каждому пункту),
- таблицу «N примеров перенесено / N в React» по всем 12 компонентам,
- список созданных/удалённых файлов,
- ссылки на все decisions и findings,
- секцию **«Решения вне плана»** — что сделал не по карте и почему.

**Запрещено:** спрашивать пользователя, останавливаться без отчёта,
блокировать другие табы, делать `git commit`/`git push`/`git stash`/`git rebase`,
запускать `pnpm install`, трогать чужие зоны.

## Контекст
Тот же что в `T-Vue-Demo-Forms.md` §«Контекст». Этот таб занимается
сложными компонентами (Form, Table, Tree, виджеты визуализации).
Бюджет выше потому что у каждого больше примеров и крупнее агрегатор
в React (Table 16 KB, Form 14 KB, FormComponents 13 KB).

## Зона ответственности — компоненты (12)

### Form & Schema

| comp-kebab | comp-pascal | React-агрегатор | React-DemoBox / CSS-vars | Особенность |
|---|---|---|---:|---|
| `form` | `Form` | `examples/demo/src/demos/FormDemo.tsx` | **22 / 1** | очень тяжёлый, см. ниже |
| `form-components` | `FormComponents` | `FormComponentsDemo.tsx` | 10 / 0 | **НЕ зарождаем в Vue** — meta-демо, см. finding `form-components-page-no-vue` |
| `schema-form-editor` | `SchemaFormEditor` | `SchemaFormEditorDemo.tsx` | **2 / 0 — паритет** | миграция только архитектурная, см. ниже |

В нав-сайдбаре `form-components` отдельной строки **нет**, в React-демо
он включён внутрь страницы Form. В Vue делаем так же: `FormComponents`
это часть `FormDemo.vue`, **не** отдельный маршрут.

### Data-display complex

| comp-kebab | comp-pascal | React-агрегатор | React-DemoBox / CSS-vars | Особенность |
|---|---|---|---:|---|
| `table` | `Table` | `TableDemo.tsx` | **29 / 1** | **самый тяжёлый**, см. ниже |
| `tree` | `Tree` | `TreeDemo.tsx` | 12 / 1 | |
| `list` | `List` | `ListDemo.tsx` | 14 / 1 | |

### Visualization

| comp-kebab | comp-pascal | React-агрегатор | React-DemoBox / CSS-vars | Особенность |
|---|---|---|---:|---|
| `diagram` | `Diagram` | `DiagramDemo.tsx` | 11 / **0** | **БЕЗ CssVarsTable** — паритет с React |
| `charts` | `Charts` | `ChartsDemo.tsx` | 15 / **0** | **БЕЗ CssVarsTable** — см. finding `charts-no-css-vars-react` |
| `dashboard` | `Dashboard` | `DashboardDemo.tsx` | 7 / **0** | **БЕЗ CssVarsTable** |
| `gantt` | `Gantt` | `GanttDemo.tsx` | 2 / 1 | Vue **ШИРЕ React** (3 vs 2), не сокращаем |
| `event-timeline` | `EventTimeline` | `EventTimelineDemo.tsx` | 2 / 1 | Vue **ШИРЕ React** (3 vs 2), не сокращаем |
| `resource-calendar` | `ResourceCalendar` | `ResourceCalendarDemo.tsx` | 2 / 1 | Vue **ШИРЕ React** (3 vs 2), не сокращаем |

Точные числа — в `docs/_streams/audit/T-Vue-Demo-Parity.md` §1.

Если для какого-то нет React-агрегатора — finding, пропуск.

### Особые случаи (важно)

#### A. `form-components` — НЕ делаем

Это **meta-демо** (компоненты внутри Form), не самостоятельная страница.
Финдинг 3.1: `form-components-page-no-vue`. **Не зарождаем** маршрут
`/components/form-components` в Vue. Если такая запись уже есть в
`router/index.ts` или `nav.ts` — finding, не правим (это зона
foundation).

#### B. `schema-form-editor` — миграция архитектурная, без расширения

Аудит 3.1 показал паритет `0/0`: 2 DemoBox в React, 2 в Vue, у обоих
нет `CssVarsTable`. Поэтому:

- Миграция **только архитектурная** (`pages/SchemaFormEditorPage.vue` →
  `demos/SchemaFormEditorDemo.vue` + `demos/schema-form-editor/*.demo.vue`).
- **Не увеличиваем** число примеров.
- **Без `--with-css-vars`** в генераторе.
- Если переносить нечего (пара-тройка строк в `pages/<>.vue`) — берём
  как есть, не пытаемся раздуть.

#### C. `charts` / `diagram` / `dashboard` — БЕЗ CssVarsTable

В React **нет** `<CssVarsTable>` для этих трёх компонентов. По правилу
паритета «снизу вверх» (decision 3.1 №5 + finding `charts-no-css-vars-react`)
**в Vue тоже не зарождаем** новый контракт документации CSS-vars.
Генератор вызывать **без** `--with-css-vars`:

```bash
node scripts/gen-vue-demo.mjs charts --examples=15
node scripts/gen-vue-demo.mjs diagram --examples=11
node scripts/gen-vue-demo.mjs dashboard --examples=7
```

Если хочется описать токены сам — finding `<comp>-css-vars-vue-only`,
не делаем в этом стриме (это decision на стороне будущей карты).

#### D. `gantt` / `event-timeline` / `resource-calendar` — Vue уже ШИРЕ React

В этих 3 компонентах Vue имеет **3 примера**, React — только **2**
(React-демо были черновыми, Vue написан позже шире). Поэтому:

- **Не сокращаем** до 2 примеров.
- Переносим **3 существующих примера** из `pages/<Comp>Page.vue` в
  `demos/<comp>/*.demo.vue`.
- В отчёте отметить «Vue 3 / React 2 (Vue шире)».
- Если хочется добавить ещё — finding, не делаем сейчас.

#### E. `form` (22 DemoBox) и `table` (29 DemoBox) — допустим minimum N/2

Это **исключение** из общего правила «≥ N-1 примеров»:

- Минимум — `≥ N/2` (для Form ≥ 11, для Table ≥ 15).
- Каждый пропущенный пример → запись в `findings/T-Vue-Demo-Complex.md`
  с пометкой «deferred to next round».
- Если успеваешь больше — отлично, но не блокируй другие компоненты.

## Зона файлов

Идентична `T-Vue-Demo-Forms.md` §«Зона файлов», но для своих
**12 компонентов**. Свои строки в `router/index.ts`, свои страницы
для удаления, свои папки в `demos/<comp>/`.

### Дополнительно

- Возможны разделяемые `_data/` папки (как у React: `demos/charts/_data/`,
  `demos/table/_data/`). Переносить **только данные, относящиеся к
  своему компоненту**. Создавать `examples/demo-vue/src/demos/<comp>/_data/<file>.ts`.

### НЕЛЬЗЯ трогать
То же что в Forms: `packages/**`, `examples/demo/**`,
`examples/showcases/**`, `examples/_shared*/**`,
`examples/demo-vue/src/demos/components/**`,
`examples/demo-vue/src/demos/button*`,
страницы и роуты **чужих** компонентов (forms/display/nav/style-fixes),
`Landing.vue`, `.size-limit.json`, `examples/demo-vue/package.json`,
`pnpm install`.

## Чек-лист

Идентичен `T-Vue-Demo-Forms.md` §«Чек-лист», шаги 0-8 (включая Шаг 0a
«Универсальные правила миграции»). Применять для каждого из 12
компонентов **с учётом особых случаев A-E выше**.

Команда генератора (общая):

```bash
node scripts/gen-vue-demo.mjs <comp-kebab> --examples=<N> --with-css-vars
```

`<N>` — из колонки «React-DemoBox». **Без `--with-css-vars`** для:
`charts`, `diagram`, `dashboard`, `schema-form-editor`.

### Особое внимание
- **Form**. Vue использует `useForm` композабл; React использует `Form`
  + контекст. Структура DemoBox остаётся, **внутри** примера — идиома
  Vue. Если пример React использует `forwardRef` для submit-handle —
  в Vue эквивалент `defineExpose({ submit })`. Не переносим React-only
  паттерны буквально, переносим **намерение** примера.
- **Table**. У React есть `_data/` фикстуры — переносим в
  `demos/table/_data/`. `useTable` композабл в Vue вместо `Table`-only
  пропсов. Если пример завязан на ref API React-Table, который в
  Vue-Table отличается — finding, не править пакет.
- **Charts**. В Volне 2 (T-Vue-Charts) добавлены `SgChartCrosshair`,
  `SgChartBrush`, `SgChartHoverToolbar`, `download/contextMenu`
  утилиты. Используем их для соответствующих примеров.
- **Diagram**. `SgDiagram` экспонирует `print()` через `defineExpose`
  (T-Vue-Misc). Print-демо — портим.
- **Dashboard**. Есть `SgDashboard` и `SgDashboardEditor`. В React-демо
  редактор внутри той же страницы. Делаем так же.
- **SchemaFormEditor**. Большой компонент (canvas + palette + inspector
  + schema view). React-агрегатор может быть короче, чем кажется —
  большая часть логики в самом компоненте. Не пытаемся отделить — берём
  целиком как один пример.

## Acceptance criteria

- Для всех 12 компонентов:
  - `demos/<comp>/*.demo.vue` — порог:
    - **`form`**: ≥ 11 из 22 (≥ N/2),
    - **`table`**: ≥ 15 из 29 (≥ N/2),
    - **`schema-form-editor`**: 2 из 2 (паритет),
    - **`gantt`/`event-timeline`/`resource-calendar`**: ≥ 3 (Vue шире),
    - остальные (charts/diagram/dashboard/tree/list): ≥ N-1 от React,
    - все пропущенные → finding,
  - `demos/<comp>-doc/{en,ru,useStrings}.ts`,
  - `demos/<comp>/_data/` если у React была такая папка,
  - `demos/<Comp>Demo.vue`,
  - **`CssVarsTable`** только если у React-аналога он есть (для charts/
    diagram/dashboard/schema-form-editor — **НЕТ**),
  - роутер указывает на `demos/<Comp>Demo.vue`,
  - старый `pages/<Comp>Page.vue` удалён.
- `pnpm --filter demo-vue typecheck && pnpm --filter demo-vue build && pnpm size` — зелёные.
- `findings/T-Vue-Demo-Complex.md` — skip-ы с причинами или «no skips».
- Отчёт `done/T-Vue-Demo-Complex.md` — таблица «N примеров перенесено / N в React».
- На live demo-vue для каждого тяжёлого компонента — глазами проверить
  что не falls back в `<div>` без содержимого и нет console errors.

## Стоп-лист
То же что в Forms (см. `T-Vue-Demo-Forms.md` §«Стоп-лист»).

## Зависимости
- **СТРОГО ПОСЛЕ** T-Vue-Demo-Foundation (3.1).
- **Параллельно** с T-Vue-Demo-Forms, T-Vue-Demo-Display,
  T-Vue-Demo-NavFeedback, T-Vue-Demo-StyleFixes.

## Конфликты с другими табами 3.2
То же что в Forms (§«Конфликты»).

## Финал
Отчёт: `docs/_streams/done/T-Vue-Demo-Complex.md`.
