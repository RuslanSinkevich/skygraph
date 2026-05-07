/**
 * English source of truth for Dashboard doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const dashboardDocEn = {
  pageTitle: 'Dashboard',
  pageLead:
    'Static-layout grid for widgets. v0 — fixed (x, y, w, h) per widget; no drag, no resize, no auto-pack. Use as a primitive for read-only dashboards or as the rendering layer for a richer editor.',
  pageWhen1: 'Build a read-only KPI / analytics page with a fixed widget layout.',
  pageWhen2: 'Render the visual layer of a dashboard editor (drag/resize lives in your app).',
  pageWhen3: 'Compose with Charts, Table, Diagram, custom widgets — anything fits inside a cell.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'A 12-column grid: line chart, KPI tile, bar chart, and an activity feed.',

  tableDashboardApi: 'Dashboard API',
  tableDashboardWidget: 'DashboardWidget',

  propWidgets: 'Widgets pinned to grid cells',
  propColumns: 'Total grid columns',
  propRowHeight: 'Uniform row height in pixels',
  propGap: 'Gap between cells in pixels',
  propUnstyled: 'Drop default sg-dashboard classes',
  propClassName: 'Root className',
  propStyle: 'Root inline style',

  widgetId: 'Stable widget id',
  widgetTitle: 'Header text (omitted when undefined)',
  widgetX: '1-based column start',
  widgetY: '1-based row start',
  widgetW: 'Column span',
  widgetH: 'Row span',
  widgetChildren: 'Widget body',
  widgetRender: 'Alternative to children — render callback',
  widgetClassName: 'Widget className',
  widgetStyle: 'Widget inline style',
} as const

/** Writable string map — use for props / table builders (same keys as `dashboardDocEn`). */
export type DashboardDocStrings = { -readonly [K in keyof typeof dashboardDocEn]: string }
