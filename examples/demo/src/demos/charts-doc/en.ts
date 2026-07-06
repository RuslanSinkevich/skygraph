/**
 * English source of truth for Charts doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const chartsDocEn = {
  pageTitle: 'Charts',
  pageLead:
    'SVG charts (LineChart / BarChart / AreaChart / PieChart) with optional axes, legend, animations, hover crosshair, brushing and printing. Theming via SkyGraph CSS tokens.',
  pageWhen1:
    'Render light data visualisations (KPIs, sparklines, simple comparisons) without pulling in a third-party charting library.',
  pageWhen2:
    'Build the visual layer of a dashboard where richer interactivity (selection, drill-down) lives in your app.',
  pageWhen3:
    'Theme charts together with the rest of the UI by overriding `--sg-color-primary`, `--sg-color-success`, etc.',

  demoLineTitle: 'Line chart',
  demoLineDesc: 'Two series of weekly traffic. Series colours follow the default SkyGraph palette.',
  demoBarTitle: 'Bar chart',
  demoBarDesc:
    'Grouped bars per quarter. Bars rest on a zero baseline so negative values would extend below.',
  demoAreaTitle: 'Area chart (stacked)',
  demoAreaDesc:
    'Stacked daily traffic by device. Top stroke + filled body share the series colour at 25% opacity.',
  demoPieTitle: 'Pie / donut chart',
  demoPieDesc:
    "Slices clockwise from 12 o'clock. Set innerRadius > 0 for a donut (right). Negative values are clamped to zero.",

  demoAxesTitle: 'Axes (xAxis / yAxis)',
  demoAxesDesc:
    'Configurable tick count, tick formatter, axis label and horizontal grid lines. Off by default — opt in by passing the prop.',
  demoLegendTitle: 'Legend placement',
  demoLegendDesc:
    'Built-in `legend` prop renders below the SVG; for top / right / left composes `<ChartLegend>` outside the chart with flexbox.',
  demoAnimationsTitle: 'Animations + Replay',
  demoAnimationsDesc:
    'Pure-CSS mount / data-change animation with a custom duration. Replay button re-mounts the chart subtree to play from the start.',
  demoCrosshairTitle: 'Crosshair tooltip',
  demoCrosshairDesc:
    'Vertical hover guide with a per-series tooltip. `valueFormatter` formats numbers as currency.',
  demoBrushTitle: 'Brush (range selection)',
  demoBrushDesc:
    'Controlled brushing — drag inside the plot to select an X range, double-click or use Reset to clear.',
  demoStackedTitle: 'Stacked vs pre-aggregated',
  demoStackedDesc:
    '`stacked` prop on AreaChart, plus the same data manually pre-aggregated (cumulative sums) — visually identical, both stay composable.',
  demoMultiSeriesTitle: 'Multi-series palette',
  demoMultiSeriesDesc:
    'Five series share the default palette tokens — re-theme by overriding `--sg-color-*` instead of editing the chart.',
  demoRealtimeTitle: 'Realtime sliding window',
  demoRealtimeDesc:
    'A 30-point window slides one tick every 500ms. Animation is disabled to avoid re-running the draw-in on every update.',
  demoHoverActionsTitle: 'Hover toolbar (Print / PNG / custom)',
  demoHoverActionsDesc:
    'Compose a toolbar around the chart — Print is wired to `ref.print()`, PNG export serializes the SVG via canvas. Custom actions on the right.',
  demoContextMenuTitle: 'Context menu on series',
  demoContextMenuDesc:
    'Right-click a series chip to hide it from the chart or copy its values as CSV. Composed at the demo level — chart stays a primitive.',
  demoResponsiveTitle: 'Responsive container',
  demoResponsiveDesc:
    'Drag the bottom-right corner to resize the box. The SVG sizing fix keeps points pinned to the grid at any width.',

  tableCommonApi: 'Common Chart API',
  tableLineExtras: 'LineChart Extras',
  tableBarExtras: 'BarChart Extras',
  tableAreaExtras: 'AreaChart Extras',
  tableAxisApi: 'Axis Options',

  propCategories: 'X-axis categories (string[] or number[])',
  propSeries: 'Data series (id, label, values, optional color)',
  propWidth: 'CSS width',
  propHeight: 'Pixel height',
  propPadding: 'Plot padding (single number or [t,r,b,l])',
  propUnstyled: 'Drop sg-chart classes',
  propClassName: 'Root SVG className',
  propStyle: 'Root SVG inline style',
  propLegend: 'Render the built-in legend below the SVG',
  propAnimate: 'Mount / data-change animation. `false` to disable, `{ duration }` to override.',
  propXAxis: 'X axis options object — off when omitted',
  propYAxis: 'Y axis options object — off when omitted',
  propPrintable: 'Enable `ref.print()` and tweak popup options',
  propActions: 'Hover toolbar with actions (`true` for defaults or `ChartAction[]`)',
  propFileName: 'Base file name (no extension) for SVG / PNG / print exports',
  propOnSeriesContextMenu: 'Right-click handler on a series element (blocks the native menu)',
  propOnChartContextMenu: 'Right-click handler on the plot area (blocks the native menu)',

  propMarkers: 'Show dot markers at each point',
  propStrokeWidth: 'Line stroke width in pixels',
  propCrosshair: 'Hover crosshair (`true` or `{ valueFormatter }`)',
  propBrush: 'Brushing (`true` or `ChartBrushConfig` for controlled mode)',

  propGroupGap: 'Gap between groups (0..1 of category step)',
  propBarGap: 'Gap between bars within a group (0..1 of slot)',

  propStacked: 'Stack series on top of each other (cumulative)',
  propFillOpacity: 'Fill opacity in 0..1 (default 0.25)',

  propAxisTickCount: 'Number of ticks to render',
  propAxisTickFormatter: 'Formatter for tick labels',
  propAxisLabel: 'Optional axis title',
  propAxisGridLines: 'Draw horizontal gridlines (Y axis only)',
} as const

/** Writable string map — use for props / table builders (same keys as `chartsDocEn`). */
export type ChartsDocStrings = { -readonly [K in keyof typeof chartsDocEn]: string }
