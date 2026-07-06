/**
 * English source of truth for Charts doc page strings (Vue).
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * 1:1 demo parity with React (`crosshair` and `brush` are now first-class
 * props on `SgLineChart` / `SgAreaChart`).
 *
 * No CssVarsTable here (parity with React — see carta §C).
 */
export const chartsDocEn = {
  pageTitle: 'Charts',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbCharts: 'Charts',
  pageLead:
    'Lightweight SVG charts (LineChart / BarChart / AreaChart / PieChart) with axes, legend, animations, print and PNG export. Theming via Skygraph CSS tokens.',
  pageWhen1:
    'Render light KPI / sparkline / time-series visualisations without pulling in a third-party charting library.',
  pageWhen2:
    'Build the visual layer of a dashboard where richer interactivity (selection, drill-down) lives in your app.',
  pageWhen3:
    'Theme charts together with the rest of the UI by overriding `--sg-color-primary`, `--sg-color-success`, etc.',

  demoLineTitle: 'Line chart',
  demoLineDesc: 'Two series with markers and the default Skygraph palette.',
  demoBarTitle: 'Bar chart',
  demoBarDesc: 'Grouped bars per category, zero baseline.',
  demoAreaTitle: 'Area chart (stacked)',
  demoAreaDesc: 'Stacked daily traffic. Top stroke + 25%-opacity fill.',
  demoPieTitle: 'Pie / donut chart',
  demoPieDesc:
    "Slices clockwise from 12 o'clock. `inner-radius > 0` turns the pie into a donut (right).",
  demoAxesTitle: 'Axes (xAxis / yAxis)',
  demoAxesDesc: 'Configurable tick count, tick formatter, label and grid lines.',
  demoLegendTitle: 'Legend placement',
  demoLegendDesc:
    'Built-in `legend` prop renders below; for top / right / left compose `<SgChartLegend>` outside the chart with flexbox.',
  demoMultiSeriesTitle: 'Multi-series palette',
  demoMultiSeriesDesc: 'Five series share the default palette tokens.',
  demoStackedTitle: 'Stacked vs pre-aggregated',
  demoStackedDesc:
    '`stacked` prop on AreaChart vs the same data manually pre-aggregated (cumulative sums).',
  demoAnimationsTitle: 'Animations + Replay',
  demoAnimationsDesc:
    'Pure-CSS mount animation with custom duration. The replay button bumps `:key` to re-mount.',
  demoRealtimeTitle: 'Realtime sliding window',
  demoRealtimeDesc:
    '30-pt window, ticks every 500 ms. Animation off so the draw-in does not replay.',
  demoHoverActionsTitle: 'Hover toolbar (Print / PNG / custom)',
  demoHoverActionsDesc:
    'Toolbar composed around the chart. Print uses `chartRef.print()`; PNG via `downloadSvgAsPng()`.',
  demoContextMenuTitle: 'Context menu on series',
  demoContextMenuDesc:
    'Right-click a series chip to hide / show it or copy its values as CSV. Composed at the demo level.',
  demoResponsiveTitle: 'Responsive container',
  demoResponsiveDesc:
    'Drag the bottom-right corner to resize. SVG sizing keeps points pinned to the grid.',
  demoCrosshairTitle: 'Crosshair tooltip',
  demoCrosshairDesc: 'Vertical guide + per-series tooltip with formatted values.',
  demoBrushTitle: 'Brush selection',
  demoBrushDesc: 'Drag inside the plot to brush a `[from, to]` X range; double-click to reset.',

  tableCommonApi: 'Common Chart API',
  tableLineExtras: 'LineChart Extras',
  tableBarExtras: 'BarChart Extras',
  tableAreaExtras: 'AreaChart Extras',
  tablePieExtras: 'PieChart Extras',
  tableAxisApi: 'Axis Options',
  tableExposeApi: 'ref methods',

  propCategories: 'X-axis categories (string[] or number[])',
  propSeries: 'Data series (id, label, values, optional color)',
  propWidth: 'CSS width',
  propHeight: 'Pixel height',
  propPadding: 'Plot padding (single number or [t,r,b,l])',
  propUnstyled: 'Drop sg-chart classes',
  propClassName: 'Root className',
  propStyle: 'Root inline style',
  propLegend: 'Render the built-in legend below the SVG',
  propAnimate: 'Mount / data-change animation. `false` to disable, `{ duration }` to override.',
  propXAxis: 'X axis options object — off when omitted',
  propYAxis: 'Y axis options object — off when omitted',
  propFileName: 'Base filename used by `ref.print()` and exporters',

  propMarkers: 'Show dot markers at each point (LineChart)',
  propStrokeWidth: 'Line / area stroke width in pixels',
  propCrosshair: 'Hover crosshair with vertical guide and per-series tooltip (LineChart)',
  propBrush: 'Brush selection over X range (`true`, controlled or with config)',

  propCornerRadius: 'Bar corner radius in pixels — BarChart',

  propStacked: 'Stack series on top of each other (cumulative) — Bar / Area',
  propFillOpacity: 'Fill opacity in 0..1 (default 0.3) — AreaChart',

  propInnerRadius: 'Donut inner radius (0..1 fraction of outer)',
  propLabels: 'Render slice labels inside the slice',

  propAxisTickCount: 'Number of ticks to render',
  propAxisTickFormatter: 'Formatter for tick labels',
  propAxisLabel: 'Optional axis title',
  propAxisGridLines: 'Draw horizontal gridlines (Y axis only)',

  exposePrint: 'Open a browser print preview of the chart',
  exposeExportSvg: 'Serialize the SVG to a string',
} as const

/** Writable string map — same keys as `chartsDocEn`. */
export type ChartsDocStrings = { -readonly [K in keyof typeof chartsDocEn]: string }
