/**
 * English source of truth for Charts doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const chartsDocEn = {
  pageTitle: 'Charts',
  pageLead:
    'Minimal SVG charts (v0): LineChart and BarChart. No axes, tooltip, animation in this version — just clean primitives that respect SkyGraph CSS tokens.',
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

  tableCommonApi: 'Common Chart API',
  tableLineExtras: 'LineChart Extras',
  tableBarExtras: 'BarChart Extras',

  propCategories: 'X-axis categories (string[] or number[])',
  propSeries: 'Data series (id, label, values, optional color)',
  propWidth: 'CSS width',
  propHeight: 'Pixel height',
  propPadding: 'Plot padding (single number or [t,r,b,l])',
  propUnstyled: 'Drop sg-chart classes',
  propClassName: 'Root SVG className',
  propStyle: 'Root SVG inline style',

  propMarkers: 'Show dot markers at each point',
  propStrokeWidth: 'Line stroke width in pixels',

  propGroupGap: 'Gap between groups (0..1 of category step)',
  propBarGap: 'Gap between bars within a group (0..1 of slot)',
} as const

/** Writable string map — use for props / table builders (same keys as `chartsDocEn`). */
export type ChartsDocStrings = { -readonly [K in keyof typeof chartsDocEn]: string }
