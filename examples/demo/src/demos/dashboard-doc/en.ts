/**
 * English source of truth for Dashboard doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const dashboardDocEn = {
  pageTitle: 'Dashboard',
  pageLead:
    'Static-layout grid for widgets, with optional per-widget hover actions, right-click menus, and drag/resize editing via `DashboardEditor`. Compose with Charts, Table, Diagram, custom widgets — anything fits inside a cell.',
  pageWhen1: 'Build a read-only KPI / analytics page with a fixed widget layout.',
  pageWhen2: 'Render the visual layer of a dashboard editor (drag/resize via `DashboardEditor`).',
  pageWhen3: 'Compose with Charts, Table, Diagram, custom widgets — anything fits inside a cell.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'A 12-column grid: line chart, KPI tile, bar chart, and an activity feed.',

  demoEditorTitle: 'Editor — drag & resize',
  demoEditorDesc: 'Drag widgets by their header, resize from the bottom-right corner. Layout snaps to the grid; `onLayoutChange` is logged below the canvas.',

  demoActionsTitle: 'Per-widget actions',
  demoActionsDesc: 'Each widget exposes its own `⋯` menu via `actions`. Hover a card to reveal the trigger; click an item to fire the callback.',

  demoMixedTitle: 'Mixed content',
  demoMixedDesc: 'Realistic mix: KPI tiles, multi-series line + bar charts, a mini table, and a map placeholder — all driven by the same `Dashboard` primitive.',

  demoResponsiveTitle: 'Responsive grids',
  demoResponsiveDesc: 'Switch between mobile / tablet / desktop presets to see how widget spans collapse as `cols` shrinks.',

  demoRealtimeTitle: 'Realtime monitoring',
  demoRealtimeDesc: 'A `setInterval` pumps fresh values into the chart every 2s — the surrounding `Dashboard` is unchanged. Pause to freeze the stream.',

  demoLargeGridTitle: 'Large grid',
  demoLargeGridDesc: '12 widgets pinned to a 6×6 grid: KPIs, tables, mini-charts, and a heartbeat — exercise of layout density.',

  tableDashboardApi: 'Dashboard API',
  tableDashboardWidget: 'DashboardWidget',
  tableWidgetAction: 'WidgetAction',
  tableEditorApi: 'DashboardEditor API',

  propWidgets: 'Widgets pinned to grid cells',
  propColumns: 'Total grid columns',
  propRowHeight: 'Uniform row height in pixels',
  propGap: 'Gap between cells in pixels',
  propUnstyled: 'Drop default sg-dashboard classes',
  propClassName: 'Root className',
  propStyle: 'Root inline style',
  propOnWidgetContextMenu: 'Right-click on a widget. preventDefault() runs only when the prop is set.',
  propOnDashboardContextMenu: 'Right-click on the dashboard background. preventDefault() runs only when the prop is set.',

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
  widgetActions: 'Hover-menu actions for this widget. Empty array opts out; undefined falls back to editor defaults.',

  actionId: 'Stable action id',
  actionLabel: 'Visible row label',
  actionIcon: 'Optional leading icon',
  actionOnClick: 'Click handler — receives the widget',
  actionVariant: '"default" or "danger" (paints the row red)',
  actionHidden: 'Predicate: when true, the row is omitted',

  editorOnLayoutChange: 'Called with the patched widgets array after a drag / resize / default-Remove',
  editorEditable: 'Disable drag / resize without removing the editor chrome',
  editorOnWidgetRefresh: 'Wires the default Refresh action',
  editorOnWidgetSettings: 'Wires the default Settings action',
  editorOnWidgetRemove: 'Override the default Remove action (defaults to filtering out the widget via onLayoutChange)',
} as const

/** Writable string map — use for props / table builders (same keys as `dashboardDocEn`). */
export type DashboardDocStrings = { -readonly [K in keyof typeof dashboardDocEn]: string }
