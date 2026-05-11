# Findings — T-Vue-Demo-Wrappers-Parity

> Пропуски, корни в пакетах и кандидаты для следующих итераций,
> найденные в ходе стрима `T-Vue-Demo-Wrappers-Parity` (Волна 3.3a).

## 1. `legacy-wrappers-untouched`

**Где**: `examples/demo-vue/src/components/{ComponentDoc,DemoBox,PropsTable}.vue`.

**Что**: pre-Wave-3 обёртки, оставшиеся от `T-Vue-Demo-Foundation`.
Используют префикс `.dv-*` и i18n-ключи `t.componentDoc.{propsTitle,
copy,copied,showCode,hideCode}`. Грепом по `import` в `examples/demo-vue/
src/**/*.vue|ts` импортов не найдено — файлы не используются ни одной
страницей, но TypeScript включает их в проверку (`tsconfig.app.json`
`include: ["src/**/*.vue"]`).

**Почему не удалены здесь**: карта `T-Vue-Demo-Wrappers-Parity.md`
ограничивает зону `examples/demo-vue/src/demos/components/*` и
`style.css`/`i18n/*`. Папка `src/components/*` — вне зоны.

**Кандидат для следующей итерации**: удалить `src/components/*.vue`
вместе с устаревшими ключами `componentDoc.{propsTitle,copy,copied,
showCode,hideCode}` в `i18n/types.ts`/`dict-en.ts`/`dict-ru.ts`. Если
после удаления `pnpm --filter demo-vue build` зелёный — finding закрыт.

## 2. `dv-namespace-cleanup`

**Где**: `examples/demo-vue/src/style.css` (правила `.dv-doc*`,
`.dv-demo*`, `.dv-props-*`, `.dv-doc-table`, `.dv-css-vars-hint`).

**Что**: после переименования обёрток в `src/demos/components/*` под
React-namespace (`.demo-box*` / `.doc-*` / `.demo-props-*`) старые
`.dv-*` правила остаются используемыми **только** legacy-обёртками из
finding #1. После их удаления `.dv-*` блоки в `style.css` становятся
мёртвым кодом.

**Карта говорит**: «если в `style.css` есть мёртвые `.dv-*` правила,
которые больше не используются (после переименования всех мест) — в
этом стриме не удалять, finding для следующей итерации».

**Кандидат для следующей итерации**: после закрытия finding #1
удалить `.dv-doc*` / `.dv-demo*` / `.dv-props-*` / `.dv-doc-table`
блоки из `style.css`. `.dv-landing*` правила оставить — они
используются `pages/Landing.vue` (вне зоны Wave 3.3a; в карте
`landing` исключён из «можно править»).

## 3. `vue-pre-class-injection`

**Где**: `examples/demo-vue/src/demos/components/SourceCode.vue`.

**Что**: после упрощения шаблона до `<pre><code>{{ source }}</code></pre>`
без классов, скоупов `<style>` не осталось — компонент чистый.
Если Vite/Volar в каком-то edge-case всё ещё добавляет `data-v-…`
атрибут к `<pre>` (scoped-styles не используются), `.demo-box-code pre`
селектор продолжит работать (атрибут не влияет на класс).

**Почему finding, а не decision**: не зафиксировано отклонения; нужен
визуальный аудит на одной странице (например, `/components/button`),
чтобы убедиться что код-блок выглядит идентично React. Скриншот-аудит
закладывается в стрим `T-Vue-Demo-PostMigration-Audit` (3.3).

## 4. `requiredLabel-ru-shift`

**Где**: `examples/demo-vue/src/i18n/dict-ru.ts` — `propsTable.requiredLabel`.

**Что**: значение сдвинулось `'обязательно'` → `'обязательное'` для
паритета с React (`dict-ru.ts` в `examples/demo/src/i18n`). Это
**намеренный** sync; финдинг — на случай, если кто-то ищет в репо
строку `обязательно` как aria-label.

**Корень в пакете**: нет. Чистый i18n-data shift.

## 5. `notes-slot-no-consumers-yet`

**Где**: `examples/demo-vue/src/demos/components/ComponentDoc.vue` —
новый `#notes` named slot.

**Что**: ни одна страница `examples/demo-vue/src/demos/*Demo.vue` пока
не передаёт `<template #notes>`. React-страницы тоже редко используют
`notes` prop, но он есть в API. Слот добавлен «на вырост», DOM не
ломается (если `$slots.notes` пуст — `<div class="doc-notes">` не
рендерится).

**Кандидат для следующей итерации**: при появлении первой страницы с
заметками (например, миграционные ссылки или редкие токены) — добавить
`<template #notes>` в соответствующий `*Demo.vue`.
