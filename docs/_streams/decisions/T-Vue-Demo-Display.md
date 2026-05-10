# Decisions — T-Vue-Demo-Display

> Принятые архитектурные решения по `T-Vue-Demo-Display` (Волна 3.2 / Tab B),
> которые отклоняются от буквы task-карты или требуют пояснения.

## 1. `data.ts` мигрирует с `children` → `content` (Collapse / Timeline)

В React `examples/demo/src/demos/{collapse,timeline}/data.ts` поле
называется `children`. В Vue компонент `SgCollapse` / `SgTimeline`
ожидает `content` (`packages/vue/src/components/ui/Collapse.vue`,
`Timeline.vue`).

**Решение**: переписываем `data.ts` 1:1 по структуре, но переименовываем
`children` → `content`. То же для `descriptions/data.ts` —
`children` → `value` (это поле в `SgDescriptions`).

## 2. Богатый контент (`ReactNode`) → string + finding

`SgTooltip.title`, `SgCollapse.extra`, `SgDescriptions.value`,
`SgEmpty.description`, `SgTimeline.dot`, `SgTimeline.pendingDot` —
во всех случаях React-аналог принимает `ReactNode`, а Vue —
только `string`.

**Решение**:

1. Создаём демо с **plain-string** заменой (`'Up to date'` вместо
   `<Tag color="success">Up to date</Tag>`, emoji-строка вместо
   `<span aria-hidden>🧑</span>` и т.д.).
2. В JSDoc-комментарии демо оставляем явное указание на гэп и ссылку
   на `findings/`.
3. В `<comp>-doc/{en,ru}.ts` рядом с описанием поля пишем
   `(Vue: string only — see findings)`.
4. Пишем findings c пометкой «зона ремонта = `packages/vue/**`,
   вне зоны Волны 3».

Это сохраняет визуальный паритет N React-примеров (≥ N-1) **и**
честно фиксирует пробел API в `@skygraph/vue`.

## 3. `unstyled` стили — глобальный `<style>` без `scoped`

В Vue SFC `<style scoped>` добавляет уникальный `data-v-*` к корневому
элементу. У `unstyled`-вариантов мы дальше стилизуем потомков
(`<button>`, `<li>`, `<table>` и т.д.), которые лежат внутри shadow
template-а компонента.

**Проблема со scoped**:
- `:deep(button)` работает только если **корень** компонента имеет
  `data-v-*`-атрибут. У `unstyled`-вариантов корень — это часто пустой
  fragment-template (`<template v-if="unstyled">...`), и Vue не всегда
  пробрасывает `data-v-*` на потомков.
- В итоге стили либо не применяются, либо наоборот «протекают» в
  соседние демо.

**Решение**: для всех `Unstyled.demo.vue` в этом стриме (`carousel`,
`collapse`, `descriptions`, `empty`, `skeleton`, `timeline`)
используем **глобальный** `<style>` блок (без `scoped`) с уникальным
именем класса `demo-raw-<comp>-vue`. Это:
- надёжно красит всех потомков,
- не конфликтует с другими демо (имя префиксировано `demo-raw-` +
  `-vue`-суффикс),
- сохраняет паритет с React (`<style>{...}</style>` inline-блок там).

## 4. Timeline: 10 примеров (вместо 12 React-демо)

В React-папке `examples/demo/src/demos/timeline/` 12 файлов, но
2 из них (`Events.demo.tsx` и `Horizontal.demo.tsx`) используют
`EventTimeline` — это **другой** компонент (`@skygraph/react/EventTimeline`),
который мигрируется в Tab D (`T-Vue-Demo-Complex`).

**Решение**: переносим только 10 «настоящих» Timeline-демо
(`Basic`, `Reverse`, `RightMode`, `Alternate`, `WithLabel`,
`CustomColor`, `CustomDot`, `Pending`, `TokensOverride`,
`Unstyled`). `audit/T-Vue-Demo-Parity.md §1` подтверждает цифру **10**.

## 5. `Description.demo.tsx` (Empty) — две карточки заменены на одинаковую строку

React `Description.demo.tsx` показывает две карточки: первая со строкой,
вторая со `<span>No invoices matching <code>status=paid</code></span>`.
В Vue вторая стала plain-string `'No invoices matching status=paid'`.

**Решение**: оставляем 2 карточки в гриде (визуальный паритет layout-а)
с одинаковым типом контента. Альтернатива — сжать в один пример —
ломает grid-layout. Это упоминается в finding
`empty-rich-description-no-vue`.

## 6. router/index.ts — точечные правки одних 13 строк

`wave-3/CHARTER.md` §2 + `T-Vue-Demo-Display.md` явно говорят: трогаем
только свои 13 импортов и 13 routes. Остальные импорты (Tab A — 9 form-
components, Tab C — 12 nav/feedback, Tab D — 12 complex) остаются как есть.

**Решение**: выполнено. Diff в `examples/demo-vue/src/router/index.ts`:
- 13 `const XxxPage = () => import('../pages/XxxPage.vue')` →
  `const XxxDemo = () => import('../demos/XxxDemo.vue')`.
- 13 `{ path: ..., component: XxxPage }` →
  `{ path: ..., component: XxxDemo }`.

Не трогаем порядок строк (чтобы git-diff был минимальный) и не
перетасовываем `// T-VueDemo-Pages additions` блок.

## 7. typecheck/build verification scope

`pnpm --filter demo-vue build` падает на `popconfirm/InTable.demo.vue`
(зона Tab C). Это **не** наш зон ответственности.

**Решение**:
1. Запускаем `vue-tsc -p examples/demo-vue/tsconfig.app.json --noEmit`
   и фильтруем ошибки **только** по `demos/{avatar,badge,...}/`,
   `Avatar/Badge/.../Demo`-агрегаторам. Все 0.
2. Запускаем `pnpm --filter demo-vue exec vite build` (без vue-tsc) —
   проходит чисто, размеры в норме.

Полный `pnpm build` зелёным станет после фикса Tab C — это вне нашего
скоупа.

## 8. CSS-переменные — наш собственный список (не из `audit`)

`audit/T-Vue-Demo-Parity.md` фиксирует «нужны CSS-vars», но не
перечисляет какие именно. Используем подход React-демо: для каждого
компонента берём CssVars из соответствующего React `<Comp>Demo.tsx`,
пропускаем те, которые в Vue реально не используются (компонент
читает другие токены), и добиваем теми, что в Vue реально влияют на
вид.

Например, у `SgSpin` есть **собственный** токен `--sg-spin-color`
(не входит в стандартный set) — добавляем в `CssVarsTable`. У
`SgCollapse` собственных токенов нет — берём 7 surface/border-токенов,
которые компонент реально читает.
