/**
 * English source of truth for ResourceCalendar doc page strings.
 * Mirrors React `examples/demo/src/demos/ResourceCalendarDemo.tsx`. Vue is
 * wider than React (3 demos vs 2; carta §D, «Vue шире»).
 */
export const resourceCalendarDocEn = {
  pageTitle: 'Resource Calendar',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbResourceCalendar: 'ResourceCalendar',
  pageLead:
    'Per-resource lane planner with drag, resize, and live conflict detection (overlap, capacity, availability). Domain logic lives in `@skygraph/core/calendar`; this is the Vue adapter.',
  pageWhen1: 'Schedule shifts, bookings, or appointments per resource (people, rooms, machines).',
  pageWhen2: 'Surface scheduling conflicts visually without building bespoke clash logic.',
  pageWhen3: 'Pair with availability rules to prevent off-hours work.',

  demoWeekTitle: 'Week scale',
  demoWeekDesc:
    'Default `scale="week"` — daily columns over a single week, three resources, five assignments.',
  demoDayTitle: 'Day scale',
  demoDayDesc:
    'Hour-level columns with `scale="day"`. Useful for shift planning inside a single day.',
  demoInteractiveTitle: 'Interactive — drag and resize',
  demoInteractiveDesc:
    'Bars become click-and-drag (move) and edge-drag (resize). `@assignmentChange` fires after every committed change so you can patch state.',

  tableCalendarApi: 'ResourceCalendar API',
  tableCssVars: 'CSS Variables',

  propResources: 'Lanes rendered along the left rail (one row each)',
  propAssignments: 'Time-anchored bookings positioned inside the lanes',
  propRules: 'Optional availability windows (HH:MM, optional dayOfWeek)',
  propScale: 'Time-axis granularity. Drives header ticks AND drag/resize snap',
  propRange: 'Visible window. Auto-derived from min(start)/max(end) when omitted',
  propColumnWidth: 'Pixel width of one scale step',
  propRowHeight: 'Lane height in pixels',
  propSidebarWidth: 'Width of the left rail',
  propDraggable: 'Enable click-and-drag to move blocks along the time axis',
  propResizable: 'Enable left/right edge handles to resize blocks',
  propEmitAssignmentChange: 'Fires after a move or resize with the patched assignment',
  propEmitConflict: 'Fires whenever the detected Conflict[] changes',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',

  cssHint:
    'All locals live on `.sg-rcal` and route through `--sg-color-*` global tokens. Override the conflict / tentative colours per-instance to rebrand.',

  cssSgRcalAvailabilityOffBg: 'Background colour of "outside availability" stripe bands',
  cssSgRcalConflictColor: 'Border + hatch colour for conflict blocks',
  cssSgRcalConflictBg: 'Background colour for conflict blocks',
  cssSgRcalTentativeBg: 'Background of tentative (default) assignment blocks',
  cssSgRcalTentativeBorder: 'Dashed border of tentative blocks',
  cssSgRcalConfirmedBg: 'Solid background of confirmed blocks',
  cssSgRcalConfirmedText: 'Text colour inside confirmed blocks',
  cssSgRcalMarkerSize: 'Diameter of the colour dot next to each resource label',
} as const

export type ResourceCalendarDocStrings = {
  -readonly [K in keyof typeof resourceCalendarDocEn]: string
}
