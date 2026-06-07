/**
 * English source of truth for Progress doc page strings.
 * Keep keys aligned with `ru.ts`.
 */
export const progressDocEn = {
  pageTitle: 'Progress',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbProgress: 'Progress',
  pageLead:
    'Determinate completion meter — line bar or circular ring. Includes built-in `success` / `error` / `active` states.',
  pageWhen1: 'Uploads, downloads, multi-step forms.',
  pageWhen2: 'Quota / limit indicators (storage, plan usage).',
  pageWhen3: 'Compact dashboard tiles where space matters (`type="circle"`).',

  demoLineTitle: 'Line bar',
  demoLineDesc: 'Default horizontal layout — `success` auto-applies at 100%.',
  demoCircleTitle: 'Circle',
  demoCircleDesc: '`type="circle"` renders an SVG ring; `width` / `strokeWidth` tune size.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: '`size="small"` thins the bar; `strokeWidth` overrides any preset.',
  demoNoInfoTitle: 'No info',
  demoNoInfoDesc: '`:show-info="false"` hides the percentage label.',
  demoActiveTitle: 'Active',
  demoActiveDesc: '`status="active"` sweeps a shimmer across the filled region.',
  demoCustomColorTitle: 'Custom color',
  demoCustomColorDesc: '`strokeColor` overrides the theme for the filled portion.',
  demoDynamicTitle: 'Dynamic',
  demoDynamicDesc: 'Drive `percent` from state — clamped into [0, 100].',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Three scopes built from Progress tokens: green brand, dark surface and glass pick (every bar / ring).',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: '`unstyled` keeps `role="progressbar"`, drops every class.',

  tableProgressApi: 'Progress API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Progress has no component-private tokens. Override `--sg-color-primary` (default fill), `--sg-color-bg-hover` (trail), `--sg-color-success` / `--sg-color-error` (status fills) to rebrand.',

  propPercent: 'Completion value [0..100] — clamped',
  propType: '`line` (horizontal bar) or `circle` (SVG ring)',
  propStatus: 'Visual state — `normal` becomes `success` at 100%',
  propShowInfo: 'Show the percentage label / inner text',
  propStrokeWidth: 'Bar height or ring stroke thickness (px)',
  propStrokeColor: 'Custom colour for the filled portion',
  propSize: 'Compact preset for line bars',
  propWidth: 'Outer SVG size for `type="circle"`',
  propUnstyled: 'Drop sg-progress-* classes (keep aria + percent rendering)',

  cssPrimary: 'Default fill colour',
  cssBgHover: 'Trail (unfilled) colour',
  cssSuccess: 'Fill colour at 100% / explicit success',
  cssError: 'Fill colour for status="error"',
  cssMotionDuration: 'Width-transition duration on percent change',
  cssMotionDurationActive: 'Shimmer duration for status="active"',
} as const

export type ProgressDocStrings = { -readonly [K in keyof typeof progressDocEn]: string }
