/**
 * English source of truth for EventTimeline doc page strings.
 * Mirrors `examples/demo/src/demos/event-timeline-doc/en.ts`. Vue side has
 * 3 demos vs React 2 (carta §D, «Vue шире»; not shrunk).
 */
export const eventTimelineDocEn = {
  pageTitle: 'EventTimeline',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbEventTimeline: 'EventTimeline',
  pageLead:
    'Chronological event stream with optional grouping (day / month / year) and horizontal or vertical orientation. Events are sorted by `date`; markers and content are fully customisable.',
  pageWhen1:
    'When events have a real `Date` and you want them positioned in time (release history, project milestones, audit log).',
  pageWhen2:
    'When you need a horizontal track for compact release / changelog views, or a vertical feed grouped by month / year.',
  pageWhen3:
    'For step-by-step ordered lists without dates, use `Timeline` (the simpler primitive) instead.',

  demoVerticalTitle: 'Vertical, default grouping',
  demoVerticalDesc:
    'Events sorted by date, dividers mark new day buckets. Dots inherit `color` per event; default colour comes from `--sg-color-primary`.',
  demoHorizontalTitle: 'Horizontal',
  demoHorizontalDesc:
    'Track flows left-to-right; useful for release notes / changelog views.',
  demoMonthTitle: 'Group by month',
  demoMonthDesc:
    'Coarser grouping for long ranges. Set `group-by="month"` to bucket consecutive events by month boundary.',

  tableEventTimelineApi: 'EventTimeline API',
  tableEventApi: 'TimelineEvent',
  tableCssVars: 'CSS Variables',

  propEvents: 'Events to render (sorted internally by `date`)',
  propOrientation: 'Track orientation',
  propGroupBy: 'Group consecutive events sharing the same bucket; renders a divider between groups (UTC boundary)',
  propUnstyled: 'Drop default sg-event-timeline-* classes',

  propEventId: 'Stable id (used as Vue key + `data-event-id`)',
  propEventDate: 'Event date — `Date` or epoch ms. Drives positioning AND grouping',
  propEventTitle: 'Marker title (typically a short heading)',
  propEventDescription: 'Optional secondary description rendered below the title',
  propEventColor: 'Optional dot fill colour (overrides the token)',

  cssHint:
    'EventTimeline has no component-local tokens — it composes globals: `--sg-color-primary` (default dot), `--sg-color-text*` (title / description), `--sg-color-border-secondary` (group dividers), spacing (`--sg-margin-*`, `--sg-padding-*`).',

  cssSgColorPrimary: 'Default dot fill (override per-event via `color`)',
  cssSgColorBg: 'Outer ring around the dot (creates the contrast halo)',
  cssSgColorBorderSecondary: 'Group divider line (between buckets)',
  cssSgColorText: 'Event title colour',
  cssSgColorTextSecondary: 'Event description colour',
  cssSgColorTextTertiary: 'Group label colour (uppercase header above each bucket)',
  cssSgFontSize: 'Body font size',
  cssSgFontSizeSm: 'Group label and description font size',
  cssSgLineHeight: 'Title and description line-height',
  cssSgMarginMd: 'Gap between events',
  cssSgMarginSm: 'Gap between marker and content',
  cssSgMarginXs: 'Gap between title and description',
  cssSgPaddingMd: 'Horizontal padding for grouped horizontal layout',
  cssSgPaddingXs: 'Vertical padding for the group label',
  cssSgPaddingSm: 'Vertical padding for each item',
} as const

export type EventTimelineDocStrings = {
  -readonly [K in keyof typeof eventTimelineDocEn]: string
}
