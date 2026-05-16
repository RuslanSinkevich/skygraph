/**
 * English source of truth for Dashboard doc page strings.
 * Mirrors `examples/demo/src/demos/dashboard-doc/en.ts`. Vue Dashboard
 * has no `actions` array on widgets (no `WidgetAction` type).
 * No CssVarsTable for Dashboard (parity with React; carta §C).
 */
export const dashboardDocEn = {
  pageTitle: 'Dashboard',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbDashboard: 'Dashboard',
  pageLead:
    'Static-layout grid for widgets, with optional drag/resize editing via `SgDashboardEditor`. Compose with Charts, Table, Diagram, custom widgets — anything fits inside the `#widget` slot.',
  pageWhen1: 'Build a read-only KPI / analytics page with a fixed widget layout.',
  pageWhen2: 'Render the visual layer of a dashboard editor (drag/resize via `SgDashboardEditor`).',
  pageWhen3: 'Compose with Charts, Table, Diagram, custom widgets — anything fits inside a cell.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'A 12-column grid: line chart, KPI tile, bar chart, and an activity feed.',

  demoEditorTitle: 'Editor — drag & resize',
  demoEditorDesc:
    'Drag widgets by their header, resize from the bottom-right corner. Layout snaps to the grid; `@layout-change` is logged below the canvas.',

  demoActionsTitle: 'Per-widget actions',
  demoActionsDesc:
    'Vue Dashboard has no `WidgetAction` API — inline buttons inside the `#widget` slot give the same UX. Click an action to fire the local handler.',

  demoMixedTitle: 'Mixed content',
  demoMixedDesc:
    'Realistic mix: KPI tiles, multi-series line + bar charts, a mini table, and a map placeholder — all driven by the same `SgDashboard` primitive.',

  demoResponsiveTitle: 'Responsive grids',
  demoResponsiveDesc:
    'Switch between mobile / tablet / desktop presets to see how widget spans collapse as `columns` shrinks.',

  demoRealtimeTitle: 'Realtime monitoring',
  demoRealtimeDesc:
    'A `setInterval` pumps fresh values into the chart every 2 s — the surrounding `SgDashboard` is unchanged. Pause to freeze the stream.',

  demoLargeGridTitle: 'Large grid',
  demoLargeGridDesc:
    '12 widgets pinned to a 6×6 grid: KPIs, jobs, mini-charts, and a heartbeat — exercise of layout density.',

  tableDashboardApi: 'SgDashboard API',
  tableDashboardWidget: 'DashboardWidget',
  tableEditorApi: 'SgDashboardEditor API',

  propWidgets: 'Widgets pinned to grid cells',
  propColumns: 'Total grid columns',
  propRowHeight: 'Uniform row height in pixels',
  propGap: 'Gap between cells in pixels',
  propUnstyled: 'Drop default sg-dashboard classes',

  widgetId: 'Stable widget id',
  widgetTitle: 'Header text (omitted when undefined)',
  widgetX: '1-based column start',
  widgetY: '1-based row start',
  widgetW: 'Column span',
  widgetH: 'Row span',
  widgetClassName: 'Widget className',
  widgetStyle: 'Widget inline style',

  editorEmitLayoutChange: 'Emitted with the patched widgets array after a drag / resize commit',
  editorDraggable: 'Disable header drag without removing the editor chrome',
  editorResizable: 'Disable the bottom-right resize handle',
  editorMinW: 'Minimum widget width in columns',
  editorMinH: 'Minimum widget height in rows',
} as const

/** Writable string map — used by props/table builders. */
export type DashboardDocStrings = { -readonly [K in keyof typeof dashboardDocEn]: string }
