/**
 * English source of truth for Timeline doc page strings.
 * Keep keys aligned with `ru.ts`.
 */
export const timelineDocEn = {
  pageTitle: 'Timeline',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbTimeline: 'Timeline',
  pageLead:
    'Vertical sequence of dot + connector + content rows. Variants for left / right / alternate axis, pending tail and per-item colour / dot.',
  pageWhen1: 'Changelogs and release histories.',
  pageWhen2: 'Step-by-step process flows (deploy, onboarding).',
  pageWhen3: 'Audit logs and incident timelines.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default left-axis layout.',
  demoReverseTitle: 'Reverse',
  demoReverseDesc: '`reverse` flips visual order in-place.',
  demoRightModeTitle: 'Right mode',
  demoRightModeDesc: '`mode="right"` flips the axis.',
  demoAlternateTitle: 'Alternate',
  demoAlternateDesc: 'Alternating sides — odd left, even right.',
  demoWithLabelTitle: 'With label',
  demoWithLabelDesc: '`label` is a side column — visible in `alternate` mode.',
  demoCustomColorTitle: 'Custom color',
  demoCustomColorDesc: '`color` tints the default ring.',
  demoCustomDotTitle: 'Custom dot',
  demoCustomDotDesc:
    '`dot` replaces the ring (Vue: string only — emoji works).',
  demoPendingTitle: 'Pending',
  demoPendingDesc: '`pending` adds a muted tail (Vue: no `pendingDot` — see findings).',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope global colour tokens to repaint a whole timeline.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: '`unstyled` renders a plain `<ul>` — no axis / connector.',

  tableTimelineApi: 'Timeline API',
  tableTimelineItemApi: 'TimelineItem',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Timeline reads `--sg-color-primary` for the default ring, `--sg-color-border-secondary` for the connector, `--sg-color-text-tertiary` for pending content. Override them on a wrapper to rebrand.',

  propItems: 'Ordered timeline steps',
  propMode: 'Layout — `left` / `right` / `alternate`',
  propPending: 'Pending tail — `string` for custom copy, `true` for empty',
  propReverse: 'Reverse visual order',
  propUnstyled: 'Drop sg-timeline-* classes — render a plain `<ul>`',

  itemContent: 'Main body text',
  itemLabel: 'Optional label text (visible in `alternate` mode)',
  itemColor: 'Border / text colour for the default ring',
  itemDot: 'Custom marker text (Vue: string only — see findings)',
  itemPosition: 'Force this item to one side (`left` / `right`)',

  cssPrimary: 'Default ring colour',
  cssBorderSecondary: 'Connector line colour',
  cssTextTertiary: 'Pending content colour',
  cssText: 'Body text colour',
  cssTextSecondary: 'Label text colour',
  cssBg: 'Background',
} as const

export type TimelineDocStrings = { -readonly [K in keyof typeof timelineDocEn]: string }
