# T-Vue-Demo-Forms — Волна 3.2 / Tab A: data-entry компоненты

> Прочитал `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Foundation.md`,
> `docs/_streams/findings/T-Vue-Demo-Foundation.md`,
> `docs/_streams/decisions/T-Vue-Demo-Foundation.md`,
> `docs/_streams/audit/T-Vue-Demo-Parity.md`? Если нет — прочитай сначала.
> Этот таб **строго после** T-Vue-Demo-Foundation.

## ID и волна
- **ID:** T-Vue-Demo-Forms
- **Волна:** 3.2
- **Режим:** один таб, параллельно с 3.2/Tab B/C/D/E.

## ⚠️ Правила автономности стрима — читать первым

**Этот стрим автономный. Никогда не останавливайся, не задавай вопросов
пользователю, не жди подтверждений.** Если поток рассуждений упирается в
неопределённость — решаешь сам по правилам ниже:

1. **Конфликт карты и кода → доверяй коду**, фиксируй запись в
   `docs/_streams/decisions/T-Vue-Demo-Forms.md`.
2. **Нет API в `@skygraph/vue`** для буквального переноса React-примера →
   **пропусти пример**, finding в `docs/_streams/findings/T-Vue-Demo-Forms.md`,
   **в `packages/vue/**` не лезь** (см. CHARTER §2 «Вне рамок»).
3. **Попытка не работает 3 раза** → finding `decision-protocol-N`, идёшь дальше.
4. **Параллельно работают табы B/C/D/E.** Их зоны не пересекаются с твоими.
   Если видишь в `router/index.ts` чужие изменения — оставляй их в покое,
   правишь только свои 18 строк.
5. **Никаких вопросов пользователю.** Если что-то надо «уточнить» —
   принимай решение, документируешь и идёшь дальше.

В конце — отчёт `docs/_streams/done/T-Vue-Demo-Forms.md` обязательно содержит:
- acceptance criteria checklist (✓/✗ по каждому пункту),
- таблицу «N примеров перенесено / N в React» по всем 18 компонентам,
- список созданных/удалённых файлов,
- ссылки на все принятые decisions,
- ссылки на все findings,
- секцию **«Решения вне плана»** — что было сделано не по карте и почему.

**Запрещено:** спрашивать пользователя, останавливаться без отчёта,
блокировать другие табы, делать `git commit`/`git push`/`git stash`/`git rebase`,
запускать `pnpm install`, трогать чужие зоны.

## Контекст

T-Vue-Demo-Foundation создал архитектуру `demos/`, генератор
`scripts/gen-vue-demo.mjs`, общие компоненты `demos/components/*` и
эталонную миграцию Button. Этот таб — content-миграция 18
data-entry компонентов по той же схеме, что Button.

## Зона ответственности — компоненты (18)

| comp-kebab | comp-pascal | React-агрегатор | React-DemoBox / CSS-vars (из аудита 3.1) |
|---|---|---|---:|
| `input` | `Input` | `examples/demo/src/demos/InputDemo.tsx` | 11 / 1 |
| `inputnumber` | `InputNumber` | `InputNumberDemo.tsx` | 8 / 1 |
| `textarea` | `Textarea` | **— (нет в React)**, см. `react-textarea-no-demo` | n/a |
| `select` | `Select` | `SelectDemo.tsx` | 8 / 1 |
| `checkbox` | `Checkbox` | `CheckboxDemo.tsx` | 7 / 1 |
| `radio` | `Radio` | `RadioDemo.tsx` | 6 / 1 |
| `switch` | `Switch` | `SwitchDemo.tsx` | 8 / 1 |
| `slider` | `Slider` | `SliderDemo.tsx` | 7 / 1 |
| `rate` | `Rate` | `RateDemo.tsx` | 8 / 1 |
| `autocomplete` | `AutoComplete` | `AutoCompleteDemo.tsx` | 7 / 1 |
| `cascader` | `Cascader` | `CascaderDemo.tsx` | 12 / 1 |
| `treeselect` | `TreeSelect` | `TreeSelectDemo.tsx` | 7 / 1 |
| `colorpicker` | `ColorPicker` | `ColorPickerDemo.tsx` | 9 / 1 |
| `datepicker` | `DatePicker` | `DatePickerDemo.tsx` | 11 / 1 |
| `timepicker` | `TimePicker` | `TimePickerDemo.tsx` | 9 / 1 |
| `calendar` | `Calendar` | `CalendarDemo.tsx` | **14 / 1 — самый тяжёлый** |
| `upload` | `Upload` | `UploadDemo.tsx` | 9 / 1 |
| `transfer` | `Transfer` | `TransferDemo.tsx` | 7 / 1 |

Точные числа CSS-vars и DemoBox по каждому — в
`docs/_streams/audit/T-Vue-Demo-Parity.md` (раздел 1).

Если для какого-то из 18 в React **нет** агрегатора — finding, пропуск.

### Особый случай — Textarea (Vue-only)

В React **нет** `TextareaDemo.tsx` (см. `findings/T-Vue-Demo-Foundation.md`
запись `react-textarea-no-demo`). Поэтому:

- **Не ищи** React-шаблон.
- Существующая `examples/demo-vue/src/pages/TextareaPage.vue` — **источник
  истины**. Перенести 4 примера из `pages/TextareaPage.vue` в
  `demos/textarea/*.demo.vue` без изменений по содержанию.
- `demos/textarea-doc/{en,ru}.ts` — взять словарь из текущей `TextareaPage.vue`
  как есть.
- `CssVarsTable` для Textarea **не делать** (паритет с React = «нет
  React-аналога → не зарождаем новый контракт документации»).
- Если хочется добавить `CssVarsTable` — finding `textarea-css-vars-vue-only`,
  не делаем в этом стриме.

## Зона файлов (можно трогать)

### Создание (новые)
Для каждого компонента из списка выше:
- `examples/demo-vue/src/demos/<comp-kebab>/<Example>.demo.vue` (несколько примеров).
- `examples/demo-vue/src/demos/<comp-kebab>-doc/{en,ru,useStrings}.ts`.
- `examples/demo-vue/src/demos/<Comp>Demo.vue` — агрегатор.

### Правки существующих
- `examples/demo-vue/src/router/index.ts` — для каждого компонента из
  списка переключить `/components/<kebab>` с `pages/<Comp>Page.vue` на
  `demos/<Comp>Demo.vue`. **Только свои 18 строк.**

### Удаление
- `examples/demo-vue/src/pages/<Comp>Page.vue` для каждого компонента из
  списка после миграции. **Только свои 18 файлов.**

### НЕЛЬЗЯ трогать
- `packages/**` — целиком read-only.
- `examples/demo/**` — read-only.
- `examples/showcases/**`, `examples/_shared/**`,
  `examples/_shared-react/**`, `examples/_shared-vue/**` — read-only.
- `examples/demo-vue/src/demos/components/**` — зафиксирован T-Vue-Demo-Foundation.
- `examples/demo-vue/src/pages/Landing.vue` — зафиксирован T-Vue-Demo-Foundation.
- `examples/demo-vue/src/demos/button*` — собственность T-Vue-Demo-Foundation,
  не модифицировать (можно использовать как **образец**).
- Чужие маршруты в `router/index.ts` (display/nav/complex/style-fixes).
- `examples/demo-vue/src/nav.ts` — структурно не трогать. Если в
  React-сайдбаре раздел изменился — finding, без правок.
- `.size-limit.json` — лимит зафиксирован, не повышать.
- `examples/demo-vue/package.json` — не добавлять зависимости.

## Чек-лист (повторить для каждого из 18 компонентов)

### Шаг 0. Прочитать обязательное (для всего таба, ~20 мин)

**В этом порядке:**

1. `docs/_streams/CHARTER.md` — главные правила работы стримов.
2. `docs/_streams/wave-3/CHARTER.md` — конституция Волны 3.
3. `docs/_streams/done/T-Vue-Demo-Foundation.md` — итоги 3.1, что и где создано.
4. `docs/_streams/findings/T-Vue-Demo-Foundation.md` — неочевидности
   (Charts/Diagram/Dashboard без `CssVarsTable`, Button-Unstyled пропущен,
   Textarea без React-шаблона, и т.д.).
5. `docs/_streams/decisions/T-Vue-Demo-Foundation.md` — архитектурные
   решения 3.1 (две обёртки строк, `?raw` через `vite-env.d.ts`,
   PropsTable показывает только реальные props и т.д.).
6. `docs/_streams/audit/T-Vue-Demo-Parity.md` — точные числа DemoBox /
   CSS-vars / PropsTable по всем компонентам.
7. `examples/demo-vue/src/demos/ButtonDemo.vue` + `button/*.demo.vue` +
   `button-doc/{en,ru,useStrings}.ts` — **эталон**, на который равняться.
8. `examples/demo-vue/src/demos/components/index.ts` — что экспортируют
   общие обёртки и какие у них пропсы.

### Шаг 0a. Универсальные правила миграции (применяй к каждому компоненту)

- **Две обёртки строк** (decision 3.1 №2):
  - `<comp>/<Example>.demo.vue` использует **локальный**
    `useDemoStrings({ en: { ... }, ru: { ... } })` — для подписей внутри
    атомного примера.
  - `<comp>-doc/useStrings.ts` использует **`useI18n` + `computed`** и
    возвращает `ComputedRef<<Comp>DocStrings>` — для большого словаря
    страницы (`pageTitle`, `propType`, `cssSg*` и т.д.). Образец —
    `examples/demo-vue/src/demos/button-doc/useStrings.ts`.
- **Нет API в `@skygraph/vue`** для буквального переноса React-примера →
  пропусти пример, finding `<comp>/<Example>: skipped, reason: <api-name>-not-in-vue`,
  **в `packages/vue/**` не лезь**. Аналогично Button/Unstyled в 3.1.
- **PropsTable** показывает **только реальные props** компонента в
  `@skygraph/vue` — не копируем React-only API (`className`, `style`,
  `onClick`-как-prop, `children`-как-prop, `unstyled`).
- **CssVarsTable** — список CSS-vars берётся 1:1 из React-аналога
  (`examples/demo/src/demos/<Comp>Demo.tsx`). Если у React `CssVarsTable`
  нет — у Vue тоже не зарождаем (паритет «снизу вверх»).
- **`?raw`-импорты** работают из коробки (`vite-env.d.ts` создан в 3.1).
  Не правь `vite.config.ts`.
- **Кодировка** doc-словарей — UTF-8 без BOM.

### Шаг 1. Аудит компонента (~3 мин на каждый)
- Открыть `docs/_streams/audit/T-Vue-Demo-Parity.md` — найти строку
  для `<comp>`: React DemoBox / CSS-vars / PropsTable.
- Открыть React-агрегатор `examples/demo/src/demos/<Comp>Demo.tsx`.
- Прочитать список импортов `*.demo.tsx` и `*-doc/`.

### Шаг 2. Сгенерировать скаффолд (~1 мин)

```bash
node scripts/gen-vue-demo.mjs <comp-kebab> --examples=<N> --with-css-vars
```

Где:
- `<N>` — желаемое число примеров (берём из аудит-таблицы как «React DemoBox»;
  скрипт создаст N пустых `.demo.vue` файлов).
- `--with-css-vars` — добавляет шаблон блока CSS-vars в агрегатор и
  файл `<comp>-doc/cssVars.ts`. **Опускать только** для Textarea
  (нет React-аналога CSS-vars).

Это создаст пустые файлы. Не запускаем `pnpm install`. Если генератор
сломан — finding и делать руками по образцу `demos/button/`.

### Шаг 3. Атомные примеры (~3-5 мин на пример)

Для каждого `*.demo.tsx` в React → `*.demo.vue` в Vue:
- Перенести JSX → Vue template.
- React-only API (forwardRef + useImperativeHandle, Suspense, errorBoundary,
  hooks-only patterns) — если не переносится естественно за 5 минут,
  пропустить, в `findings/T-Vue-Demo-Forms.md` запись:
  `<comp>/<Example>: skipped, reason: <react-only-api>`.
- Минимум **N-1** примеров где N = в React (если у React 8 — мы
  стараемся 7+; меньше 5 — finding и обсуждаем).
- Внутри SFC использовать **локальный** `useDemoStrings({en, ru})`,
  глобальный i18n демо для атомного примера **не** использовать.
- DOM/sg-классы кнопок и контролов = как в React. Если расходится —
  finding, не правим компонент.

### Шаг 4. Doc-словари (~3 мин)

`<comp>-doc/en.ts` + `ru.ts` — копия из React-эквивалента
`examples/demo/src/demos/<comp>-doc/{en,ru}.ts`. Кодировка UTF-8 без BOM.

`useStrings.ts` — обёртка `use<Comp>DocStrings()` через
**`useI18n` + `computed`** (см. decision 3.1 №2 + образец
`examples/demo-vue/src/demos/button-doc/useStrings.ts`). Возвращает
`ComputedRef<<Comp>DocStrings>`. **Не путать с локальным
`useDemoStrings()` внутри атомных `.demo.vue`** — это разные хуки.

### Шаг 5. Агрегатор `<Comp>Demo.vue` (~5 мин)

По образцу `examples/demo/src/demos/<Comp>Demo.tsx`:
- `<script setup lang="ts">`.
- `import <Example>Source from './<comp>/<Example>.demo.vue?raw'`.
- `import { <Example> } from './<comp>/<Example>.demo.vue'` —
  СТОП. В Vue SFC `<script setup>` нельзя импортировать сам себя как
  именованный экспорт. Используем `import <Example> from './<comp>/<Example>.demo.vue'`
  (default import самого SFC).
- `useStrings()` для текстов.
- Массив `<comp>Props: PropDef[]` — описания props компонента.
- Массив `<comp>CssVars: CssVarDef[]` — описания CSS-переменных
  (если есть в React-аналоге).
- В template — `<ComponentDoc> + <DemoBox> × N + <PropsTable> + <CssVarsTable>`.

### Шаг 6. Роутер + удаление старой страницы (~1 мин)

`examples/demo-vue/src/router/index.ts`:
- Изменить lazy-импорт: `() => import('../pages/<Comp>Page.vue')` →
  `() => import('../demos/<Comp>Demo.vue')`.
- Удалить ссылку на старый `<Comp>Page.vue` если он больше нигде не используется.

`Delete examples/demo-vue/src/pages/<Comp>Page.vue`.

### Шаг 7. Sanity на каждом компоненте

После каждого скомпилированного компонента (или каждых 5 — на усмотрение):
```bash
pnpm --filter demo-vue typecheck
```
Должен быть зелёным. Если красный — починить **в текущем компоненте**,
не идти дальше.

### Шаг 8. Финал

```bash
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
pnpm size
```

Все три зелёные. **Лимит size не повышать.** Если упирается:
- finding,
- удалить часть тяжёлых примеров (например, все Picker-демо тяжёлые),
- остановиться и записать что не вмещается.

## Acceptance criteria

- Для всех 18 компонентов из списка (или явно меньше с findings):
  - есть `demos/<comp>/*.demo.vue` (≥ N-1 от React),
  - есть `demos/<comp>-doc/{en,ru,useStrings}.ts`,
  - есть `demos/<Comp>Demo.vue`,
  - роутер указывает на `demos/<Comp>Demo.vue`,
  - старый `pages/<Comp>Page.vue` удалён.
- `pnpm --filter demo-vue typecheck && pnpm --filter demo-vue build && pnpm size` — зелёные.
- В `findings/T-Vue-Demo-Forms.md` есть список skip-ов с причинами
  (или явно «no skips»).
- В отчёте `done/T-Vue-Demo-Forms.md` для каждого компонента написано:
  N примеров перенесено / N в React, есть/нет CssVarsTable, есть ли findings.

## Стоп-лист

- НЕ трогать `packages/**`.
- НЕ трогать `examples/demo/**`, `examples/showcases/**`,
  `examples/_shared/**`, `examples/_shared-react/**`, `examples/_shared-vue/**`.
- НЕ трогать `demos/components/**` (зона T-Vue-Demo-Foundation).
- НЕ трогать `demos/button*` (зона T-Vue-Demo-Foundation, можно как образец).
- НЕ трогать `pages/<Comp>Page.vue` для **чужих** компонентов
  (display/nav/complex). Удалять только свои 18.
- НЕ трогать чужие строки в `router/index.ts`.
- НЕ менять `demos/components/*.vue` API.
- НЕ повышать лимит `.size-limit.json`.
- НЕ добавлять зависимости в `examples/demo-vue/package.json`.
- НЕ запускать `pnpm install`.
- НЕ запускать глобальные команды без `--filter`.
- НЕ делать `git commit`/`git push`/`git rebase`/`git stash`.

## Зависимости
- **СТРОГО ПОСЛЕ** T-Vue-Demo-Foundation (3.1).
- **Параллельно** с T-Vue-Demo-Display, T-Vue-Demo-NavFeedback,
  T-Vue-Demo-Complex, T-Vue-Demo-StyleFixes (Волна 3.2).

## Конфликты с другими табами 3.2
- `examples/demo-vue/src/router/index.ts` — каждый таб правит **только
  свои строки**. При локальном конфликте (одну и ту же строку трогают
  два таба): таб E (StyleFixes) роутер не трогает; A/B/C/D трогают
  непересекающиеся компоненты.
- `examples/demo-vue/src/i18n/dict-{en,ru}.ts` — добавлять только
  `componentDoc` и `propsTable` ключи если их не хватает; не править
  чужие.

## Финал
Отчёт: `docs/_streams/done/T-Vue-Demo-Forms.md`.
