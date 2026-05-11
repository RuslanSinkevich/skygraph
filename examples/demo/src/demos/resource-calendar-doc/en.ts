/**
 * English source of truth for ResourceCalendar doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const resourceCalendarDocEn = {
  pageTitle: 'Resource Calendar',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbResourceCalendar: 'Resource Calendar',
  pageLead:
    'Per-resource lane planner with drag, resize, and live conflict detection (overlap, capacity, availability). Domain logic lives in `@skygraph/core/calendar`; this is the React adapter.',
  pageWhen1: 'Schedule shifts, bookings, or appointments per resource (people, rooms, machines).',
  pageWhen2: 'Surface scheduling conflicts visually without building bespoke clash logic.',
  pageWhen3: 'Pair with availability rules to prevent off-hours work.',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Four resources, one week, six bookings — two intentionally overlap on Bob to surface the conflict overlay. Drag to move, edge-drag to resize.',
  demoCapacityTitle: 'Capacity per slot',
  demoCapacityDesc:
    'One room with `capacityPerSlot=2` and three concurrent bookings on day 1 → all three flag as `over-capacity`. The panel below mirrors `onConflict`.',

  tableResourceCalendarApi: 'ResourceCalendar API',
  tableCssVars: 'CSS Variables',

  cssHint:
    'All locals live on `.sg-rcal` and route through `--sg-color-*` global tokens. Override the conflict / tentative colours per-instance to rebrand.',

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
  propOnAssignmentChange: 'Fires after a move or resize with the patched assignment',
  propOnConflict: 'Fires whenever the detected Conflict[] changes',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',

  cssAvailabilityOffBg: 'Background colour of "outside availability" stripe bands',
  cssConflictColor: 'Border + hatch colour for conflict blocks',
  cssConflictBg: 'Background colour for conflict blocks',
  cssTentativeBg: 'Background of tentative (default) assignment blocks',
  cssTentativeBorder: 'Dashed border of tentative blocks',
  cssConfirmedBg: 'Solid background of confirmed blocks',
  cssConfirmedText: 'Text colour inside confirmed blocks',
  cssMarkerSize: 'Diameter of the colour dot next to each resource label',
} as const

/** Writable string map — use for props / table builders (same keys as `resourceCalendarDocEn`). */
export type ResourceCalendarDocStrings = {
  -readonly [K in keyof typeof resourceCalendarDocEn]: string
}
