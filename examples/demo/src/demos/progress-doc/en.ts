/**
 * English source of truth for Progress doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const progressDocEn = {
  pageTitle: 'Progress',
  pageLead:
    'Line or circular progress indicator with success/error/active states and a built-in shimmer animation for long-running operations.',
  pageWhen1: 'Uploads, file processing, syncs — any task with a measurable percentage.',
  pageWhen2: 'Dashboards that track KPI completion against a target.',
  pageWhen3: 'Wizards / onboarding flows that show how far the user has progressed.',

  demoLineTitle: 'Line',
  demoLineDesc: 'Standard horizontal bar with status colours.',
  demoCircleTitle: 'Circle',
  demoCircleDesc: 'SVG ring for compact dashboards and cards.',
  demoActiveTitle: 'Active shimmer',
  demoActiveDesc: '`status="active"` sweeps a highlight across the fill.',
  demoDynamicTitle: 'Dynamic',
  demoDynamicDesc: 'Drive `percent` from React state; clamping is built-in.',
  demoCustomColorTitle: 'Custom color',
  demoCustomColorDesc: '`strokeColor` overrides the status-based theme colour.',
  demoSizesTitle: 'Sizes & strokeWidth',
  demoSizesDesc:
    '`size="small"` thins the bar; `strokeWidth` wins if you need an exact pixel value.',
  demoNoInfoTitle: 'Hide label',
  demoNoInfoDesc: '`showInfo={false}` drops the trailing / inner percentage text.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope the theme primitives to rebrand every bar inside a container.',

  tableProgressApi: 'Progress API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Progress has no component-private tokens. The fill follows `--sg-color-primary` / `--sg-color-success` / `--sg-color-error` depending on `status`; the track is `--sg-color-bg-hover`. Override those globals on a wrapper (or on `:root`) to rebrand.',

  propPercent: 'Completion value from 0–100 (clamped)',
  propType: 'Horizontal bar vs circular ring',
  propStatus: 'Visual state — `normal` auto-flips to `success` at 100%',
  propShowInfo: 'Render the percentage label',
  propStrokeWidth: 'Bar height (line) or ring thickness (circle), in px',
  propStrokeColor: 'Custom fill colour that overrides the status colour',
  propWidth: 'SVG outer size for `type="circle"`',
  propSize: 'Picks up size from ConfigProvider; `small` thins the line bar to 6px',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop every sg-progress-* class (headless mode)',

  cssPrimary: 'Filled bar / ring colour for `status="normal" | "active"`',
  cssSuccess: 'Filled colour + label tint for `status="success"`',
  cssError: 'Filled colour + label tint for `status="error"`',
  cssBgHover: 'Line track background + circle trail stroke',
  cssText: 'Ring centre label colour',
  cssTextSecondary: 'Line percentage label colour',
  cssFontSizeSm: 'Line percentage label size',
  cssFontSizeXl: 'Ring percentage label size',
  cssPaddingSm: 'Gap between bar and trailing label',
  cssTransitionDuration: 'Fill width / stroke-dashoffset transition',
  cssTransitionTiming: 'Shared easing',
} as const

/** Writable string map — use for props / table builders (same keys as `progressDocEn`). */
export type ProgressDocStrings = { -readonly [K in keyof typeof progressDocEn]: string }
