/**
 * English source of truth for Timeline doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const timelineDocEn = {
  pageTitle: 'Timeline',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbTimeline: 'Timeline',
  pageLead: 'Chronological vertical list with axis, dots, optional labels and a pending tail.',
  pageWhen1:
    'When a series of events needs to be ordered in time (audit logs, changelogs, delivery tracking).',
  pageWhen2: 'When you want to connect events visually rather than stacking them as a plain list.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default left axis with per-item colour tint.',
  demoRightModeTitle: 'Right mode',
  demoRightModeDesc: 'Push the axis to the right side of the container.',
  demoAlternateTitle: 'Alternate',
  demoAlternateDesc: 'Events alternate on either side of a central axis.',
  demoWithLabelTitle: 'With label',
  demoWithLabelDesc: 'Label column renders in `alternate` mode.',
  demoPendingTitle: 'Pending',
  demoPendingDesc: 'Append a muted tail for work still in flight.',
  demoReverseTitle: 'Reverse',
  demoReverseDesc: 'Flip the order without touching the source array.',
  demoCustomDotTitle: 'Custom dot',
  demoCustomDotDesc: 'Replace the ring with any icon or emoji.',
  demoCustomColorTitle: 'Custom colour',
  demoCustomColorDesc: 'Tint the default ring via the `color` prop.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tableTimelineApi: 'Timeline API',
  tableTimelineItem: 'TimelineItem',
  tableCssVars: 'CSS Variables',

  propItems: 'Ordered timeline steps',
  propMode: 'Axis placement — fixed left / right, or alternating',
  propPending: 'Append a muted pending row. Pass a node for custom copy, `true` for a placeholder',
  propPendingDot: 'Marker for the synthetic pending row',
  propReverse: 'Reverse the visual order (including pending)',
  propClassName: 'Extra class on the root `<ul>`',
  propStyle: 'Inline style on the root `<ul>`',
  propUnstyled: 'Drop axis / connector — render a bare list',

  itemChildren: 'Row body content',
  itemColor: 'CSS colour applied to the default ring (border + text)',
  itemDot: 'Replace the ring with any node (icon, emoji, letter badge)',
  itemLabel: 'Secondary label rendered beside the marker (alternate mode only)',
  itemPosition: 'Force left / right for this item (overrides the list `mode`)',

  cssHint:
    'Timeline has no component-local tokens. Rebrand via the global palette: `--sg-color-primary` (rings), `--sg-color-border-secondary` (connector), and the `--sg-color-text*` family (body / label).',

  cssSgColorPrimary: 'Default ring colour (overridable per-item via `color`)',
  cssSgColorBg: 'Ring fill (shows inside the 2px border)',
  cssSgColorBorderSecondary: 'Connector between items',
  cssSgColorText: 'Row body colour',
  cssSgColorTextSecondary: '`label` column text',
  cssSgColorTextTertiary: 'Pending row body colour',
  cssSgColorTextDisabled: 'Pending row ring colour',
  cssSgFontSize: 'Body font size',
  cssSgFontSizeSm: 'Label column font size',
  cssSgFontSizeLg: 'Font size for custom `dot` nodes',
  cssSgLineHeight: 'Content line-height',
  cssSgPaddingMd: 'Horizontal padding between axis and content / label',
  cssSgPaddingXl: 'Vertical gap between items',
  cssSgMarginXs: 'Top margin of the connector line',
} as const

/** Writable string map — use for props / table builders (same keys as `timelineDocEn`). */
export type TimelineDocStrings = { -readonly [K in keyof typeof timelineDocEn]: string }
