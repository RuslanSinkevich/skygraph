# T-React-Cleanup — decisions

## Удаление мёртвых экспортов из `packages/react/src/index.ts`: deferred

Task требует «`index.ts` пакета `@skygraph/react` не содержит экспортов
без потребителей», но одновременно жёстко запрещает регенерировать
`packages/react/etc/react.api.md` baseline и обязывает держать
`pnpm --filter @skygraph/react api:check` зелёным.

`api-extractor run` сравнивает свежий extract с baseline. Любое удаление
из `index.ts` (даже одного символа) делает api report не равным baseline
→ `api:check` красный. Без `api:update` (запрещено task'ом) согласовать
обе цели нельзя.

### Анализ кандидатов

`scripts/find-dead-exports.mjs` нашёл 187 экспортов без ссылок в
`examples/{demo,showcases,_shared,_shared-react}/**` и
`packages/react/src/__tests__/**`. Из них 0 упоминаются в
`README.md` / `docs/`. Это **звучит** как 187 «мёртвых», но при разборе
по существу:

- ≈ 130 — это `*Props`, `Use*Options`, `Use*Return`, `*Locale`, `*Info`,
  `*Option` типы, парные к экспортированным компонентам / хукам. По
  конвенции `docs/components.md` (раздел «Структура файла») публичный
  компонент = экспорт компонента + экспорт его `Props` типа. Удаление
  ломает внешних консьюмеров TS.
- ≈ 30 — это `Use*`, `Use*Return`, `Use*Options` пары, парные хукам
  (тот же аргумент).
- ≈ 20 — Charts helper-ы (`chartDataKey`, `triggerDownload`,
  `serializeSvg`, `measureSvg`, `colorForSeries`,
  `resolveChartAnimation`, `resolveBrushConfig`, `resolveChartActions`,
  `defaultChartActions`, `make*ContextMenuHandler`, `useChartSize`,
  `DEFAULT_PALETTE`, `DEFAULT_CHART_ANIMATION_MS`). Все явно
  ре-экспортированы в `packages/react/src/components/complex/Charts/index.ts`
  как точки расширения для пользовательских чартов. Документации в
  `docs/` для этих helper-ов нет, но и `@internal` тэга на них нет.
- Несколько legacy-выглядящих (`FormContext`, `useFormProvider`,
  `TransferList`, `RangePicker`, `TimeRangePicker`, `NotificationContainer`,
  `SchemaFormEditorPalette`/`Canvas`/`Inspector`/`SchemaView`,
  `editorSchemaToJsonSchema`, `jsonSchemaToEditorSchema`,
  `createEmptyEditorSchema`, `createFieldFromPaletteType`,
  `DEFAULT_PALETTE_ITEMS`, `PALETTE_DATA_TYPE`,
  `EventTimeline`/`TimelineGroupBy`/`TimelineOrientation`) — на самом
  деле это либо sub-компоненты для advanced-композиции (Antd-style),
  либо публичные React Context / hook, либо палитра-константы
  редактора. Без `@deprecated` тегов трактовать как мёртвые нельзя.

### Решение (Decision Protocol §6.1 — минимально инвазивное)

1. **Не удалять экспорты из `packages/react/src/index.ts`** в этой волне.
   Все 187 кандидатов — либо парные к публичным компонентам / хукам
   (`*Props` / `Use*Return`), либо явные точки расширения charts /
   schema-editor. Удаление любого вызывает разрыв публичного API без
   возможности обновить baseline → красный `api:check`.
2. Acceptance Criterion «`index.ts` не содержит экспортов без
   потребителей» помечен как **deferred** и переходит в волну после
   ревью пользователем (когда разрешено `api:update`). До этого
   baseline `etc/react.api.md` остаётся источником истины public surface.
3. Findings (если в будущем понадобится точечный whitelist для
   удаления) фиксируется через `@deprecated` тег в TSDoc — это не
   ломает api:check (теги пишутся в baseline) и даёт явное намерение
   следующему стриму.
4. Чек-лист, выполненный в полном объёме (Часть 1 → 0 удалений,
   Часть 2 → удаления `.sg-*`, Часть 3 → починка 6 `@link`), описан в
   `docs/_streams/done/T-React-Cleanup.md`.
