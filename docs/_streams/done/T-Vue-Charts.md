# T-Vue-Charts — done

**Wave:** 2.
**Status:** done.

## Цель

Догнать Vue-чарты до React: Crosshair / Brush / HoverToolbar SFC + чистые
утилиты `download` и `contextMenu`. Public API (пропы / эмиты / `sg-*`
классы) идентичен React-аналогу.

## Изменённые / новые файлы

### Новые

- `packages/vue/src/components/complex/Charts/ChartCrosshair.vue` —
  pure-presentational SFC, 1:1 с React `ChartCrosshair`. Рисует
  вертикальную линию + точки серий + tooltip; формат значений
  настраивается через `valueFormatter`. Все `sg-chart-crosshair-*`
  классы и `data-sg-chart-crosshair*`-атрибуты совпадают с React.
- `packages/vue/src/components/complex/Charts/ChartBrush.vue` — порт
  React `ChartBrush` с pointer-event-API. Управляет временным
  drag-стейтом, публикует финальный диапазон через `update:range`
  (v-model) и `change`. DOM (`g.sg-chart-brush > rect.sg-chart-brush-
  overlay + rect.sg-chart-brush-selection`) и dblclick-reset парят с
  React. Типы (`ChartBrushRange`, `ChartBrushConfig`) и хелпер
  `resolveBrushConfig` живут в том же файле через двойной `<script>` —
  см. `decisions/T-Vue-Charts.md` D2.
- `packages/vue/src/components/complex/Charts/ChartHoverToolbar.vue` —
  плавающий toolbar, рендерит `ChartAction[]` как `<button>` с
  `<component :is="a.icon" />`. Обёртка `data-sg-toolbar="visible|
  hidden"`, `pointer-events: none` (кнопки сами включают `auto`).
  Скрывает `hidden`-actions, не рендерится при пустом списке.
- `packages/vue/src/components/complex/Charts/chartActions.ts` — типы
  `ChartAction` / `ChartActionContext` / `ChartActionsProp`, фабрика
  `defaultChartActions` (id-ы `print`, `downloadSvg`, `downloadPng`,
  опциональный `resetBrush`) и `resolveChartActions`. Иконки —
  Vue `VNode` через `h(...)`, см. `decisions/T-Vue-Charts.md` D1.
- `packages/vue/src/components/complex/Charts/download.ts` — pure DOM
  утилиты: `serializeSvg`, `triggerDownload`, `measureSvg`,
  `downloadSvg`, `downloadSvgAsPng` + типы `PngSize`,
  `DownloadPngOptions`. Без Vue / React, только `XMLSerializer`,
  `URL.createObjectURL`, `Image`, `<canvas>`. 1:1 с React
  `chartExport.ts`.
- `packages/vue/src/components/complex/Charts/contextMenu.ts` — фабрики
  `makeChartContextMenuHandler`, `makeSeriesContextMenuHandler` +
  payload-типы. Native DOM `MouseEvent`, без React-synthetic. 1:1 с
  React `chartContextMenu.ts`.
- `packages/vue/src/__tests__/chartCrosshair.test.ts` — 3 кейса: рендер
  корня + line + dots + tooltip, custom `valueFormatter`, `unstyled`
  отключает классы.
- `packages/vue/src/__tests__/chartBrush.test.ts` — 5 кейсов: overlay /
  selection rendering, `resolveBrushConfig`, dblclick-reset
  (`update:range` / `change` оба emit `null`), v-model:range
  интеграция.
- `packages/vue/src/__tests__/chartHoverToolbar.test.ts` — 7 кейсов:
  `sg-chart-toolbar` + per-action button, hidden actions, пустой
  список, проброс svg + fileName в onClick, корректность
  `defaultChartActions` / `resolveChartActions`.
- `packages/vue/src/__tests__/chartDownload.test.ts` — 6 кейсов:
  `serializeSvg` (immutability + namespaces), `measureSvg` fallback,
  `triggerDownload`/`downloadSvg` через mock `<a>` + `URL.createObjectURL`.
- `packages/vue/src/__tests__/chartContextMenu.test.ts` — 5 кейсов:
  series handler + suppression, viewBox-mapping (с подменой
  `svg.viewBox.baseVal` под jsdom — см. `findings/T-Vue-Charts.md` F3),
  fallback на CSS-pixels.

### Правки

- `packages/vue/src/components/complex/Charts/index.ts` — append-only:
  `SgChartCrosshair`, `SgChartBrush` (+ `resolveBrushConfig`),
  `SgChartHoverToolbar`, `defaultChartActions`, `resolveChartActions`,
  `downloadSvg` / `downloadSvgAsPng` / `serializeSvg` / `measureSvg` /
  `triggerDownload`, `makeChartContextMenuHandler` /
  `makeSeriesContextMenuHandler` + соответствующие type-экспорты.
- `packages/vue/src/index.ts` — append-only top-level reexport новых
  компонентов и утилит (один блок «T-Vue-Charts: Crosshair / Brush /
  HoverToolbar + download / contextMenu»). Существующие экспорты не
  тронуты.

## Что НЕ менялось

- `packages/react/**`, `examples/**`, `packages/styles/**`,
  `packages/core/**` — вне зоны.
- Существующие чарты `LineChart` / `BarChart` / `AreaChart` /
  `PieChart` / `ChartLegend` / `ChartAxes` — за пределами scope.
- Локали Vue (`packages/vue/src/locales/`, `types.ts`) — `SgLocale`
  оставлен как есть, см. `findings/T-Vue-Charts.md` F1.
- `packages/vue/src/index.ts` — только три новых блока append.
- T-Vue-Cleanup и T-Vue-Misc артефакты — не тронуты.

## Acceptance criteria

- [x] 3 SFC + 2 утилиты созданы и экспортируются из
      `@skygraph/vue/components/complex/Charts` и из top-level
      `@skygraph/vue` index.
- [x] Парные сигнатуры пропов / эмитов с React (см. ниже маппинг).
- [x] Тесты зелёные (5 новых файлов, 26 кейсов; общий счёт 708/708).
- [x] Build зелёный (`dist/index.js` → 409.90 kB / 89.33 kB gzip;
      dts собран Rollup'ом).

### React-парность (свод)

| React API | Vue API |
|-----------|---------|
| `<ChartCrosshair x= plotX= plotY= plotH= plotW= category= points= unstyled? valueFormatter? />` | `<SgChartCrosshair :x= :plot-x= :plot-y= :plot-h= :plot-w= :category= :points= :unstyled :value-formatter />` |
| `<ChartBrush plotX= plotY= plotW= plotH= categoryCount= range= onRangeChange? unstyled? fill? disabled? />` | `<SgChartBrush :plot-x= :plot-y= :plot-w= :plot-h= :category-count= :range= @update:range / @change :unstyled :fill :disabled />` |
| `<ChartHoverToolbar visible= actions= fileName? getSvg= brushReset? toggleLegend? unstyled? style? />` | `<SgChartHoverToolbar :visible :actions :file-name :get-svg :brush-reset :toggle-legend :unstyled :style />` |
| `serializeSvg / triggerDownload / measureSvg / downloadSvg / downloadSvgAsPng` | те же экспортируемые функции с теми же сигнатурами |
| `makeChartContextMenuHandler / makeSeriesContextMenuHandler` | те же экспортируемые функции с теми же сигнатурами (DOM `MouseEvent` вместо React `MouseEvent`) |
| `defaultChartActions({ fileName?, brushReset? })` → `ChartAction[]` (icons = `ReactNode`) | `defaultChartActions({ fileName?, brushReset? })` → `ChartAction[]` (icons = `VNode`) |

## Decisions (см. `decisions/T-Vue-Charts.md`)

1. D1 — `ChartAction.icon` типизировано как `VNode`, не string / не
   ReactNode. Default actions строятся через `h('svg', …)`.
2. D2 — `resolveBrushConfig` + brush-типы остаются внутри
   `ChartBrush.vue` через двойной `<script>` (parity с React import path).
3. D3 — `download.ts` / `contextMenu.ts` остаются framework-agnostic;
   Vue-композаблы `useChartDownload` / `useChartContextMenu` не
   создаём, потому что в React их тоже нет.
4. D4 — `ChartBrush.vue` имеет `viewBox`-attribute fallback для jsdom /
   SSR. `contextMenu.ts` остаётся на React-identical пути; его тесты
   мокают `svg.viewBox.baseVal` явно.

## Findings (см. `findings/T-Vue-Charts.md`)

- F1 — `SgLocale` не имеет `chart.toolbar` / `chart.actions` (зона
  T-Docs-Locales). Строки `Print` / `Download SVG` / `Download PNG` /
  `Reset zoom` / `Chart actions` хардкодим как в React.
- F2 — pre-existing `vue-tsc` TS2774 warnings в `List.vue` / `Table.vue`
  переносятся (re-confirmed из T-Vue-Cleanup F1 / T-Vue-Misc F2).
- F3 — jsdom не наполняет `SVGSVGElement.viewBox.baseVal` из атрибута;
  фиксим точечно в `ChartBrush.vue` и в тестах `chartContextMenu`.
- F4 — `defaultChartActions` показывает `resetBrush` через наличие
  `opts.brushReset`, без отдельного `showResetBrush` prop (parity).

## Sanity-команды

```
pnpm --filter @skygraph/vue typecheck   # ✅
pnpm --filter @skygraph/vue test        # ✅ 708/708
pnpm --filter @skygraph/vue build       # ✅ dist/index.js 409.90 kB / 89.33 kB gzip
```
