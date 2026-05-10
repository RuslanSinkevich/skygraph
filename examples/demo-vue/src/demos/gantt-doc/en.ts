/**
 * English source of truth for Gantt doc page strings.
 * Mirrors `examples/demo/src/demos/gantt-doc/en.ts`. Vue side is wider
 * than React (3 demos vs 2; carta §D — «Vue шире», don't shrink).
 */
export const ganttDocEn = {
  pageTitle: 'Gantt',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbGantt: 'Gantt',
  pageLead:
    'Task bars over a discrete time axis with optional drag, resize, dependency arrows and resource lanes. Time arithmetic, snapping and orthogonal dependency routing live in `@skygraph/core`.',
  pageWhen1:
    'When you need a project schedule view: tasks pinned to dates, dependencies drawn as arrows, lanes for teams or resources.',
  pageWhen2:
    'When users should be able to drag bars to move them on the time axis or extend the deadline by resizing the right edge.',
  pageWhen3:
    'When the same data should be presented in several scales (day / week / month / quarter) without rerendering the source.',

  demoBasicTitle: 'Basic — day scale',
  demoBasicDesc:
    'Five tasks with progress bars on the day axis. Drag bars to move (snap to whole days), resize the right edge to extend the deadline.',
  demoResourcesTitle: 'With resources',
  demoResourcesDesc:
    'Group tasks by resource lane (Anna / Boris / Clara). Use `resourceId` on each task to pin it to a row.',
  demoScaleTitle: 'Week scale',
  demoScaleDesc:
    'Wider columns, fewer ticks. Bars stay anchored to their dates — only the column width and the snap step change.',

  tableGanttApi: 'Gantt API',
  tableTaskApi: 'GanttTask',
  tableResourceApi: 'GanttResource',
  tableCssVars: 'CSS Variables',

  propTasks: 'Tasks rendered as bars',
  propResources: 'Lanes used for vertical grouping. If omitted, every task gets its own row in source order',
  propScale: 'Time-axis granularity. Drives header ticks and the drag/resize snap step',
  propRange: 'Visible time window. If omitted, derived from `min(start)` / `max(end)` with one `scale`-step of padding',
  propRowHeight: 'Row height in pixels',
  propColumnWidth: 'Pixel width of one `scale` step (one day, one week, ...)',
  propSidebarWidth: 'Width of the left rail (task / resource list)',
  propEmitTaskChange:
    'Fires when a task was moved (drag) or resized. The original task is left untouched — patch your state from the returned task',
  propDraggable: 'Enables click-and-drag to move bars along the time axis',
  propResizable: 'Enables drag on the right edge of each bar to extend its `end`',
  propUnstyled: 'Drop default sg-gantt-* classes',

  propTaskId: 'Stable id (used as Vue key + `data-task-id`)',
  propTaskName: 'Label rendered inside the bar and in the left task list',
  propTaskStart: 'Inclusive start of the task. `Date` or epoch milliseconds',
  propTaskEnd: 'Exclusive end of the task. `Date` or epoch milliseconds',
  propTaskProgress: 'Completion `0..1`. Renders an inner progress strip when set',
  propTaskParentId: 'Parent task id (for grouping / hierarchy). Reserved for v1+',
  propTaskDependencies: 'Ids of upstream tasks; renders a dependency arrow into this task',
  propTaskResourceId: 'Lane id (matches `GanttResource.id`) — task pinned to that lane',
  propTaskColor: 'Solid fill colour for this bar. Falls back to a token',

  propResourceId: 'Stable id (matched against `GanttTask.resourceId`)',
  propResourceName: 'Display label for the left rail',

  cssHint:
    'Gantt has no component-local tokens — it composes globals: `--sg-color-primary` (bar fill), `--sg-color-bg*` (sidebar / header / row stripe), `--sg-color-border*` (separators), `--sg-color-text*` (labels), `--sg-font-size-sm` (ticks / sidebar rows), `--sg-shadow-sm` (bar elevation). Drag-grid column width is set inline via `--sg-gantt-column-width`.',

  cssSgColorPrimary: 'Default bar fill (overridable per-task via `color`)',
  cssSgColorPrimaryActive: 'Inner progress strip colour (when `task.progress` is set)',
  cssSgColorWhite: 'Bar label colour',
  cssSgColorBg: 'Outer wrapper background',
  cssSgColorBgContainer: 'Sidebar (left rail) background',
  cssSgColorBgElevated: 'Sidebar header / time axis header background',
  cssSgColorBgSecondary: 'Even-row stripe background',
  cssSgColorBorder: 'Outer border + sidebar / header separators',
  cssSgColorBorderSecondary: 'Row separators, tick separators, resize handle line',
  cssSgColorText: 'Sidebar row text',
  cssSgColorTextSecondary: 'Tick label colour, dependency arrow colour',
  cssSgFontSize: 'Body font size',
  cssSgFontSizeSm: 'Tick label / sidebar row font size',
  cssSgBorderRadius: 'Outer wrapper radius',
  cssSgBorderRadiusSm: 'Bar radius',
  cssSgPaddingMd: 'Sidebar row horizontal padding',
  cssSgPaddingXs: 'Bar / tick horizontal padding',
  cssSgShadowSm: 'Bar elevation',
} as const

/** Writable string map — used by props/table builders. */
export type GanttDocStrings = { -readonly [K in keyof typeof ganttDocEn]: string }
