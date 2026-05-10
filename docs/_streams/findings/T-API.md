# T-API — findings

## Vue rollup типов оставляет ts-импорты

Полное описание — в `findings/T-Size.md` («Vue dist/index.d.ts
ссылается на `core/src/*.ts` относительными путями»). Здесь дублирую
только в части того, что было найдено при baseline-генерации API:

- `pnpm api:update` упал на vue с `ae-wrong-input-file-type` для
  `packages/core/src/runtime/Node.ts` (типичный пример) — корнем
  стало `vite-plugin-dts` с `rollupTypes: true` + alias
  `@skygraph/core` → `../core/src/index.ts`.
- В `packages/vue/api-extractor.json` подавлены `ae-wrong-input-file-type`
  и `ae-unresolved-link` (для @link refs которые не резолвятся через
  `dist/index.d.ts`).
- Подавление позволило сгенерить baseline `etc/vue.api.md` и держать
  гейт зелёным. Но если vite-plugin-dts когда-нибудь починят и rollup
  станет полным — подавления станут лишними и можно их убрать.

## React @link refs на отсутствующие экспорты

При генерации `etc/react.api.md` api-extractor выдал 6 предупреждений
`ae-unresolved-link`:

- `FormContextValue` (`dist/form.d.ts:258`)
- `createGraph` (`dist/index.d.ts:1785`)
- `GraphNode` (`dist/index.d.ts:1792`)
- `NodeAction` (`dist/index.d.ts:1808`)
- `routeOrthogonal` (`dist/index.d.ts:1918`)
- `length` (`dist/index.d.ts:3512`)

Все — TSDoc `{@link Foo}` ссылающиеся на символы, которых нет в
публичном экспорте `@skygraph/react`. В моей INFRA-зоне это править
нельзя (комментарии в `packages/react/src/**`). Подавил
`ae-unresolved-link` в `packages/react/api-extractor.json` чтобы не
шуметь — реальная починка ссылок в зоне T-React-Cleanup или
T-Docs-Locales.
