/**
 * English source of truth for Steps doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const stepsDocEn = {
  pageTitle: 'Steps',
  pageBadge: 'Navigation',
  crumbNavigation: 'Navigation',
  crumbSteps: 'Steps',
  pageLead:
    'Guide the user through a linear sequence. Auto-derives `finish / process / wait` from the `current` index; each item can override with its own `status`.',
  pageWhen1: 'When a task is complex and breaks into ordered subtasks.',
  pageWhen2: 'When a long form should be split into navigable stages.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Horizontal steps with auto-derived statuses.',
  demoClickableTitle: 'Clickable',
  demoClickableDesc: 'Passing `onChange` turns steps into buttons.',
  demoVerticalTitle: 'Vertical',
  demoVerticalDesc: 'Stack for sidebars and tall wizards.',
  demoErrorTitle: 'Error status',
  demoErrorDesc: 'Per-item `status` overrides `current`.',
  demoCustomIconTitle: 'Custom icon',
  demoCustomIconDesc: 'Drop in any node; colour still follows the step status.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: '`small` and default icon rings.',
  demoNavigationTitle: 'Navigation',
  demoNavigationDesc: 'Underlined-tab variant without icons.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Finished / process colour follows `--sg-color-primary`.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'No classes — only `data-status` + the items you provide.',

  tableStepsApi: 'Steps API',
  tableStepItem: 'StepItem',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Steps has no component-local tokens — everything is sourced from the global palette. Rebrand by scoping `--sg-color-primary` (finish / process) and `--sg-color-error` on a wrapper.',

  propCurrent: 'Zero-based index of the active step',
  propItems: 'Ordered steps',
  propDirection: 'Layout direction',
  propOnChange: 'Fires when a step is clicked. Presence of the prop also marks steps as clickable',
  propType: 'Visual variant — default (numbered) or navigation (tab-like underline)',
  propSize: 'Icon / font preset — inherits from ConfigProvider',
  propClassName: 'Extra class on the root',
  propStyle: 'Inline style on the root',
  propUnstyled: 'Drop all sg-steps-* styling; keep `data-status` on each row',

  itemTitle: 'Primary step title',
  itemDescription: 'Secondary line below the title',
  itemIcon: 'Custom icon (replaces number / check)',
  itemStatus: 'Force a status (overrides the one derived from `current`)',

  cssPrimary: 'Fill for the current step + finished tail / ring colour',
  cssError: '`status="error"` ring, label, and navigation underline',
  cssText: 'Default title colour',
  cssTextDisabled: '`status="wait"` title + icon text',
  cssTextTertiary: 'Description text colour',
  cssBorder: 'Icon ring for `wait` / default step',
  cssBorderSecondary: 'Tail connector between steps',
  cssWhite: 'Label colour inside the filled `process` ring',
  cssFontSize: 'Title font size',
  cssFontSizeSm: 'Description + `size="small"` title size',
  cssFontSizeLg: 'Custom-icon font size inside the ring',
  cssPaddingSm: 'Gap between icon and content',
  cssPaddingLg: 'Padding for vertical items + navigation-mode items',
  cssMarginXs: 'Gap between title and description',
  cssMarginSm: 'Horizontal tail outer margin',
  cssTransitionDuration: 'Status transitions',
  cssTransitionTiming: 'Shared easing',
} as const

/** Writable string map — use for props / table builders (same keys as `stepsDocEn`). */
export type StepsDocStrings = { -readonly [K in keyof typeof stepsDocEn]: string }
