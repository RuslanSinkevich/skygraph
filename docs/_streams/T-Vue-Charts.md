# T-Vue-Charts — Vue: Crosshair / Brush / HoverToolbar / downloads / contextMenu

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-Vue-Charts
- **Волна:** 2

## Цель
Догнать Vue-чарты до React: Crosshair, Brush, HoverToolbar и утилиты download/contextMenu.

## Зона файлов (можно трогать)

- `packages/vue/src/components/complex/Charts/ChartCrosshair.vue` (новый)
- `packages/vue/src/components/complex/Charts/ChartBrush.vue` (новый)
- `packages/vue/src/components/complex/Charts/ChartHoverToolbar.vue` (новый)
- `packages/vue/src/components/complex/Charts/download.ts` (новый)
- `packages/vue/src/components/complex/Charts/contextMenu.ts` (новый)
- `packages/vue/src/components/complex/Charts/index.ts` — **только** добавление новых экспортов
- `packages/vue/src/index.ts` — **только** добавление новых экспортов
- `packages/vue/src/__tests__/` — новые тесты для добавленного

## Чек-лист

1. Для каждого SFC по очереди:
   - Открыть React-аналог: `packages/react/src/components/complex/Charts/<Name>.tsx`.
   - Зафиксировать публичный API: пропы, эмиты, слоты-эквиваленты.
   - Создать Vue-версию идиоматично: `<script setup>`, `defineProps` + `withDefaults`, `defineEmits`, `defineSlots` если есть.
   - DOM и `sg-*` классы — как в React, без отклонений.
   - Локали — через `useConfig()`. Если ключей нет в `SgLocale` — `findings/T-Vue-Charts.md`, **не добавлять** ключи (это зона T-Docs-Locales).
2. `download.ts` и `contextMenu.ts`:
   - Чистые TS-функции / композаблы, без React.
   - Сигнатуры — те же, что в React-аналогах.
   - Если в React есть React-хук версии — Vue делает композабл `useChartDownload` / `useChartContextMenu` с `Ref`-возвратами.
3. Тесты:
   - По одному smoke-тесту на каждый SFC: монтирование без ошибок, проверка `sg-*` классов на корне.
   - Юнит-тесты для `download` / `contextMenu` (мокать DOM-API через `happy-dom`/`jsdom` — что уже стоит в проекте).
4. Прогон:
   ```bash
   pnpm --filter @skygraph/vue typecheck
   pnpm --filter @skygraph/vue test
   pnpm --filter @skygraph/vue build
   ```

## Acceptance criteria

- 3 SFC + 2 утилиты созданы и экспортируются.
- Парные сигнатуры пропов/эмитов с React (по `etc/skygraph-react.api.md`, если уже есть после T-API; иначе — по исходникам).
- Тесты зелёные.
- Build зелёный.

## Стоп-лист

- Не трогать существующие чарты (Bar/Line/Area/Pie/Scatter/Heatmap/Sparkline и т. д.). Их за пределами scope.
- Не трогать локали (зона T-Docs-Locales).
- Не трогать `packages/vue/src/index.ts` сверх добавления **своих** экспортов.

## Зависимости
Нет блокирующих. Возможный конфликт по `packages/vue/src/index.ts` и `Charts/index.ts` — только append своих строк.

## Финал
Отчёт: `docs/_streams/done/T-Vue-Charts.md`.
