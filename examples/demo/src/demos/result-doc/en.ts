/**
 * English source of truth for Result doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const resultDocEn = {
  pageTitle: 'Result',
  pageLead:
    'Feedback page layout with preset icons for success / error / info / warning and the classic 404 / 403 / 500 screens.',
  pageWhen1: 'After a destructive or long-running action, when a toast is not enough.',
  pageWhen2: 'Full-screen error pages (404 / 403 / 500 etc.).',
  pageWhen3: 'Guided flows (checkout, onboarding) that finish with a confirmation screen.',

  demoSuccessTitle: 'Success',
  demoSuccessDesc: 'The happy path with a primary CTA.',
  demoErrorTitle: 'Error',
  demoErrorDesc: 'Negative outcome with a recovery CTA.',
  demoInfoTitle: 'Info & warning',
  demoInfoDesc: 'Softer variants for neutral or attention-needed states.',
  demoHttpTitle: 'HTTP errors',
  demoHttpDesc: 'Built-in 404 / 403 / 500 artwork.',
  demoIconTitle: 'Custom icon',
  demoIconDesc: 'Swap the preset artwork for emoji / SVG / library icon.',
  demoContentTitle: 'With content',
  demoContentDesc: '`children` render inside a soft panel for diagnostics.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Rebrand via CSS variables — status tints + content panel.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Keep aria + structure, bring your own paint.',

  tableResultApi: 'Result API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Result has no component-private tokens — it reads the global status palette (`--sg-color-success/error/warning/primary`) for icon tints and the standard text + spacing tokens for the layout. Scope those on a wrapper to rebrand locally.',

  propStatus: 'Outcome preset — decides default icon and tint',
  propTitle: 'Primary heading',
  propSubTitle: 'Explanatory text under the title',
  propIcon: 'Override the preset icon — emoji / SVG / any node',
  propExtra: 'Action buttons row, centred under the subtitle',
  propChildren: 'Optional content panel rendered below `extra`',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop every sg-result-* class (headless mode)',

  cssSuccess: 'Icon colour for `status="success"`',
  cssError: 'Icon colour for `status="error"`',
  cssWarning: 'Icon colour for `status="warning"`',
  cssPrimary: 'Icon colour for `status="info"`',
  cssTextTertiary: 'Icon colour for 404 / 403 / 500 and faded text',
  cssText: 'Title colour',
  cssTextSecondary: 'Subtitle colour',
  cssBgSecondary: 'Background for the `children` content panel',
  cssFontSize: 'Subtitle size',
  cssFontSizeXl: 'Title size',
  cssLineHeight: 'Paragraph line-height',
  cssPaddingLg: 'Wrapper h-padding + `children` panel padding',
  cssPaddingXl: 'Wrapper v-padding',
  cssPaddingSm: 'Gap between `extra` buttons',
  cssMarginSm: 'Gap title → subtitle',
  cssMarginLg: 'Gap icon / subtitle / extra blocks',
  cssRadius: '`children` panel corner radius',
} as const

/** Writable string map — use for props / table builders (same keys as `resultDocEn`). */
export type ResultDocStrings = { -readonly [K in keyof typeof resultDocEn]: string }
