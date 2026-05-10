/**
 * English source of truth for Result doc page strings.
 * Keep keys aligned with `ru.ts`.
 */
export const resultDocEn = {
  pageTitle: 'Result',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbResult: 'Result',
  pageLead:
    'Full-page outcome card after a long operation, errored request, or 404 / 403 / 500 fallback.',
  pageWhen1: 'After a multi-step submit or async operation.',
  pageWhen2: 'Empty / error state for a route — Sign-in required, page missing, server crash.',
  pageWhen3: 'Confirmation screens with primary recovery / next-step CTAs.',

  demoSuccessTitle: 'Success',
  demoSuccessDesc: 'Checkmark icon + green tint, primary CTA in `#extra`.',
  demoErrorTitle: 'Error',
  demoErrorDesc: 'Red cross icon, two CTAs (retry + escalate).',
  demoInfoWarningTitle: 'Info & warning',
  demoInfoWarningDesc: '`info` (neutral) and `warning` (amber) variants.',
  demoHttpTitle: 'HTTP errors',
  demoHttpDesc: 'Built-in 404 / 403 / 500 numeric artwork.',
  demoCustomIconTitle: 'Custom icon',
  demoCustomIconDesc: 'Replace preset artwork with `#icon` slot (emoji / SVG / component).',
  demoWithContentTitle: 'With content',
  demoWithContentDesc: 'Default slot renders inside a soft panel below `#extra`.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope success / primary / surface tokens to rebrand.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: '`unstyled` keeps `role="status"` + aria-live, drops every class.',

  tableResultApi: 'Result API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Result has no component-private tokens. Override the global colour palette (success / error / warning / primary) and `--sg-color-bg-secondary` (content panel) to rebrand.',

  propStatus: 'Outcome type — controls default icon and tint',
  propTitle: 'Primary heading',
  propSubTitle: 'Secondary explanatory text',
  propUnstyled: 'Drop sg-result-* classes (keep semantic structure + aria-live)',
  propIconSlot: '`#icon` slot for custom artwork',
  propExtraSlot: '`#extra` slot for primary CTAs (rendered under sub-title)',
  propDefaultSlot: 'Default slot — secondary content panel below `#extra`',

  cssSuccess: 'Success status icon colour',
  cssError: 'Error status icon colour',
  cssInfo: 'Info status icon colour (uses primary)',
  cssWarning: 'Warning status icon colour',
  cssBgSecondary: 'Background of the optional content panel',
  cssText: 'Title text colour',
  cssTextSecondary: 'Sub-title text colour',
  cssBorderRadius: 'Outer corner radius (when wrapped in surface)',
  cssFontSizeXl: 'Title font size',
  cssFontSize: 'Sub-title font size',
} as const

export type ResultDocStrings = { -readonly [K in keyof typeof resultDocEn]: string }
