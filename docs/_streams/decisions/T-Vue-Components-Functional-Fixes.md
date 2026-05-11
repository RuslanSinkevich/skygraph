# T-Vue-Components-Functional-Fixes — decisions

> Stream: T-Vue-Components-Functional-Fixes (Wave 3.5).
> Append-only журнал принятых решений вне очевидной карты.

## D1. ColorPicker — добавление полной HSV-палитры

Карта говорит «не изобретай, копируй DOM из React». В React-варианте
есть saturation-panel и hue-bar (с pointer drag), которых у Vue нет.
Добавляю их по образцу React, без расширения публичного API
(пропсы те же).

## D2. Outside-click / Escape — единая утилита `useDismiss`

Все три попап-компонента (ColorPicker / DatePicker / TimePicker)
дублируют логику outside-click + Escape. Чтобы не плодить копии и не
расширять публичный API, добавляю **локальную** функцию `useDismiss`
**внутри каждого SFC** (не отдельный композабл-экспорт). Это не
exported API. Логика:

```ts
function useDismiss(wrapperRef, isOpen, onClose) {
  function handleMouseDown(e) { ... }
  function handleKeyDown(e) { if (e.key === 'Escape') onClose() }
  watch(isOpen, (v) => {
    if (v) {
      document.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
  onBeforeUnmount(() => { ...remove all... })
}
```

## D3. Steps — `clickable` поведение

В React Vue не может определить «есть ли слушатель на @change», поэтому
не реплицируем «clickable iff onChange», а вводим **optional prop**
`clickable?: boolean` (default `true` — то же поведение, что сейчас).
Если пользователь хочет non-clickable steps — `clickable={false}`.
Additive, не ломает API.

## D4. Segmented — emit `update:value`

Добавляем эмит `update:value` (Vue 3 v-model:value) дополнительно к
существующему `change`. Это additive — не ломает API.

## D5. Table — не переписываем grid → table

Vue Table использует CSS Grid с `display: contents`. Это **намеренный**
архитектурный выбор; переписывание на `<table>/<thead>/<tbody>` ломает
визуал у пользователей. Карта явно говорит «без переписывания engine».
Фиксим только хардкод: SgInput / SgPagination / SgCheckbox / SgEmpty.

## D6. ResourceCalendar — переименовать классы и атрибуты, но не лезть в core

Vue использует свой local `conflictsByAssignment`. Подключение
`detectConflicts` из `@skygraph/core` потребовало бы трогать packages/core
(чужая зона). Это finding. Переименовываем классы (`sg-rcal-block` →
`sg-rcal-assignment`, BEM `--conflict` → `-conflict`) и добавляем
`data-*` атрибуты — это не ломает API.

## D7. Calendar — расширение API (additive)

Vue Calendar добавляет недостающие фичи минимально:
- `fullscreen?: boolean` (default `true`) — additive.
- footer с Today button — при `fullscreen=true`.
- `cellRender`, `headerRender` — не добавляем (нет слот-API в Vue для
  такого, это finding для следующей волны).
- Класс `sg-calendar-fullscreen` / `sg-calendar-mini` — добавляем.
- Range/multi selection — finding (большая фича).
- Keyboard nav — finding.
- Month/Year mode switch — finding (большая фича).

## D8. Upload — Vue-only расширения сохраняем

Vue Upload имеет `drag`, `listType`, `defaultFileList`, `maxSize`,
`beforeUpload`, `customRequest`, `showUploadList` — это все additive
relative React. Сохраняем (карта: «удалять/переименовывать нельзя»).
Чиним только:
- Класс `sg-upload-list-item-*` → `sg-upload-item-*` (CSS-парность).
- Default trigger button → `<SgButton>`.

## D9. Тесты — расширение в существующих файлах

Карта говорит «расширение/добавление кейсов в `{table,colorpicker,...}.test.ts`».
Этих файлов **нет**, существующие тесты лежат в `ui-extended.test.ts`,
`ui-forms.test.ts`, `ui-navigation.test.ts`. Решение: добавляем
новые кейсы в **существующие** общие файлы, не создаём отдельные —
иначе плодим лишние файлы, что не соответствует структуре пакета.

## D10. Steps — `useSlots()` вместо `$slots.icon` в template

Использование `v-if="$slots.icon"` ломает `vue-tsc/vite-plugin-dts`
(TS2774 — slot is always a function). Решение: завести в setup
`const slots = useSlots(); const hasIconSlot = computed(() => !!slots.icon)`
и использовать `hasIconSlot` в template. Это убирает dts-warning без
изменения runtime-поведения. То же для `Segmented.vue`.

## D11. ESM-size — превышение `size-limit` на 6.84 kB

Пакет `@skygraph/vue (esm)` стал 96.84 kB при лимите 90 kB. Причина —
по карте я заменил native `<input>`/`<button>`/`<select>` на `SgInput`,
`SgCheckbox`, `SgSelect`, `SgPagination`, `SgButton`, `SgSpin` в
Transfer / Upload / Table. Эти Sg-компоненты раньше не подтягивались
треес-шейкингом при компиляции этих компонентов.

Не правил `.size-limit.json` — это вне зоны (`docs/_streams/wave-3/T-Vue-Components-Functional-Fixes.md`
не упоминает size-limit как зону). Зафиксировано как **finding** для
следующей волны: либо поднять лимит до 100 kB, либо
оптимизировать tree-shaking (`Pagination` тянет dropdown-логику для
size-changer, которая в Table/Transfer simple-режиме не нужна).
