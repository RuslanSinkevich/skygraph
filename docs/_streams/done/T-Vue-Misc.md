# T-Vue-Misc — done

**Wave:** 2.
**Status:** done.

## Цель

Добить три точечных пробела в Vue-паритете: zod-адаптер форм,
HistoryPanel devtool и публичный ref API у Diagram.

## Изменённые / новые файлы

### Новые

- `packages/vue/src/adapters/zodAdapter.ts` — 1:1 порт React-аналога
  (`zodRule`, `zodRules`, `zodDefaults`, `zodToJsonSchema` + типы
  `ZodLikeSchema`, `ZodObjectLikeSchema`, `ZodAdapterOptions`). Без
  Vue-runtime, чистые функции.
- `packages/vue/src/adapters/index.ts` — barrel: `jsonSchemaAdapter` +
  новый `zodAdapter`.
- `packages/vue/src/components/devtools/HistoryPanel.vue` — Vue-порт
  React `HistoryPanel`. DOM-структура и inline-styles 1:1; обработчики
  `undo/redo/clear/jumpTo` идут через `props.history` (`UseHistoryReturn`).
- `packages/vue/src/components/devtools/index.ts` — экспорт
  `SgHistoryPanel` + `HistoryPanelProps`.
- `packages/vue/src/__tests__/zodAdapter.test.ts` — happy-path и
  граничные кейсы для всех четырёх функций.
- `packages/vue/src/__tests__/HistoryPanel.test.ts` — рендер пустого
  состояния, рост списка после `core.set()`, состояния кнопок,
  `clear()` сбрасывает панель, singularisation `1 write` vs
  `N writes`.

### Правки

- `packages/vue/src/components/complex/Diagram/Diagram.vue` —
  `defineExpose` сужен до `print: (opts?: PrintOptions) => void`
  (паритет с React `DiagramRef`). Удалены `getSelectedIds` /
  `setSelectedIds` (Vue-only добавки). Импорт `PrintOptions`
  добавлен.
- `packages/vue/src/components/complex/Diagram/types.ts` —
  `DiagramExpose` сужен до `{ print: (opts?: PrintOptions) => void }`,
  импорт `PrintOptions`.
- `packages/vue/src/index.ts` — append-only добавлены: блок Zod
  adapter (4 функции + 3 типа) и блок Devtools (`SgHistoryPanel`,
  `HistoryPanelProps`).
- `packages/vue/src/__tests__/components/diagram.test.ts` — единственный
  тест-кейс который проверял удалённый `setSelectedIds`/`getSelectedIds`
  переписан на проверку `print` + явное отсутствие удалённых методов.
  Остальные 6 тестов диаграммы не тронуты.

## Что НЕ менялось

- `packages/vue/src/locales/` — не правил (зона T-Docs-Locales).
  Локализация HistoryPanel хардкодом, см. decisions/T-Vue-Misc D2.
- `packages/react/**`, `examples/**`, `packages/styles/**` — вне зоны.
- 6 SFC из T-Vue-Cleanup — не тронуты.
- Чарты из T-Vue-Charts — не тронуты.
- `packages/vue/src/types.ts` — `SgLocale` оставлен как есть; `devtools`
  namespace **не добавлен** (см. `findings/T-Vue-Misc.md` F1).

## Acceptance criteria

- [x] `zodAdapter` есть, экспортирован из `@skygraph/vue`, тест зелёный
      (8 кейсов).
- [x] `HistoryPanel.vue` есть, экспортирован, тест зелёный (5 кейсов).
- [x] `Diagram.vue` через `defineExpose` отдаёт **те же** публичные
      методы, что React-аналог (`{ print: (opts?: PrintOptions) =>
      void }`).
- [x] `pnpm --filter @skygraph/vue build` зелёный (`dist/index.js` →
      394 kB / 84 kB gzip; rollup d.ts ОК).

## Decisions (см. `decisions/T-Vue-Misc.md`)

1. D1 — `Diagram.defineExpose` сужен до React-паритета (только `print`).
2. D2 — `HistoryPanel.vue` хардкодит строки точно как React (без
   `useConfig` на пустой namespace).
3. D3 — `zodAdapter` экспортирует 4 функции и 3 типа, повторяя React.

## Findings (см. `findings/T-Vue-Misc.md`)

- F1 — `SgLocale` не имеет `devtools.historyPanel` (зона T-Docs-Locales).
- F2 — `vue-tsc` warnings в `List.vue` / `Table.vue` (вне зоны, перенос
  из T-Vue-Cleanup F1).
- F3 — `examples/_shared` не реэкспортирует Vue `useHistory` (зона
  T-VueLayout / T-VueDemo-Pages).

## Sanity-команды

```
pnpm --filter @skygraph/vue typecheck   # ✅
pnpm --filter @skygraph/vue test        # ✅ 682/682
pnpm --filter @skygraph/vue build       # ✅ 394 kB / 84 kB gzip
```
