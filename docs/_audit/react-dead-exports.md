# React — мёртвые экспорты (audit)

> Сгенерировано T-React-Cleanup, Wave 2.

## Сводка

`scripts/find-dead-exports.mjs` нашёл **187** именованных экспортов в
`packages/react/src/index.ts`, у которых нет потребителей в:

- `examples/demo/src/**`
- `examples/showcases/src/**`
- `examples/_shared-react/src/**`
- `examples/_shared/src/**`
- `packages/react/src/__tests__/**`
- `README.md`, `docs/**`, `CHANGELOG.md`, `ARCHITECTURE.md`,
  `CONTRIBUTING.md`

## Удалено в этой волне: **0**

Подробное обоснование — `docs/_streams/decisions/T-React-Cleanup.md`.
Кратко: все 187 кандидатов попадают в одну из категорий:

1. **Парные публичные типы** к экспортированным компонентам / хукам
   (`*Props`, `Use*Options`, `Use*Return`, `*Locale`, `*Info`,
   `*Option`). Это документированная конвенция (см.
   `docs/components.md`, раздел «Структура файла»). Удаление ломает
   внешних TS-консьюмеров, у которых нет других способов получить тип
   пропов.
2. **Точки расширения Charts** — `chartDataKey`, `triggerDownload`,
   `serializeSvg`, `measureSvg`, `colorForSeries`,
   `resolveChartAnimation`, `resolveBrushConfig`, `resolveChartActions`,
   `defaultChartActions`, `make*ContextMenuHandler`, `useChartSize`,
   `DEFAULT_PALETTE`, `DEFAULT_CHART_ANIMATION_MS`. Все явно
   ре-экспортированы в
   `packages/react/src/components/complex/Charts/index.ts`. Без `@internal`
   или `@deprecated` тэгов их нельзя считать leak.
3. **Sub-компоненты для advanced-композиции** — `TransferList`,
   `RangePicker`, `TimeRangePicker`, `NotificationContainer`,
   `SchemaFormEditor{Palette,Canvas,Inspector,SchemaView}`,
   `EventTimeline`, `Cascader`-варианты. Antd-style; для пользователей,
   которые собирают свои layouts вручную.
4. **Schema-editor helpers** — `editorSchemaToJsonSchema`,
   `jsonSchemaToEditorSchema`, `createEmptyEditorSchema`,
   `createFieldFromPaletteType`, `DEFAULT_PALETTE_ITEMS`,
   `PALETTE_DATA_TYPE`. Документированы только в TSDoc, не в md, но
   являются явной частью SchemaFormEditor API.
5. **Form context API** — `FormContext`, `useFormProvider`. Публичные
   React Context / hook для advanced-форм.

## Дополнительный жёсткий ограничитель

Task запрещает регенерировать `packages/react/etc/react.api.md` baseline.
`api-extractor run` (в режиме `api:check`) сравнивает свежий extract с
этим baseline и валится при любом расхождении. Любое удаление из
`index.ts` → красный `pnpm --filter @skygraph/react api:check` без
возможности разрешить.

## Что остаётся для пользователя (после Волны 2)

Если по аудиту нужно ужать публичную поверхность (например, перевести
Charts helper-ы в `@skygraph/react/charts` subpath или пометить
`@deprecated`), это делается отдельной волной с возможностью обновить
baseline:

```bash
pnpm --filter @skygraph/react build
pnpm --filter @skygraph/react run api:update
```

Полный список из 187 кандидатов — вывод `node scripts/find-dead-exports.mjs`.
