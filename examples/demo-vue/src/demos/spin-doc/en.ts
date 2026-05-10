/**
 * English source of truth for Spin doc page strings.
 * Keep keys aligned with `ru.ts`.
 */
export const spinDocEn = {
  pageTitle: 'Spin',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbSpin: 'Spin',
  pageLead:
    'Loading indicator — inline ring, container overlay, or full-page gate. Backed by `aria-live="polite"`.',
  pageWhen1: 'Async fetches that finish in < 1s and don\'t need a skeleton.',
  pageWhen2: 'Wrap a card / form to dim its content while updating.',
  pageWhen3: 'Page-level gates (route hydration, app boot) via `fullscreen`.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Standalone inline ring with no children.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small / default / large rings, scaled stroke.',
  demoTipTitle: 'Tip',
  demoTipDesc: '`tip` adds a caption below the ring.',
  demoContainerTitle: 'Container',
  demoContainerDesc: 'Wrap children — toggle `:spinning` to dim them.',
  demoDelayTitle: 'Delay',
  demoDelayDesc: 'Show the ring only after N ms — avoid flicker on fast requests.',
  demoCustomIndicatorTitle: 'Custom indicator',
  demoCustomIndicatorDesc: 'Replace the ring via the `#indicator` slot.',
  demoFullscreenTitle: 'Fullscreen',
  demoFullscreenDesc: '`fullscreen` covers the viewport with a backdrop.',
  demoCustomColorTitle: 'Custom color',
  demoCustomColorDesc: 'Per-section tints via `--sg-spin-color`.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Re-tint ring + overlay via `--sg-spin-color` / `--sg-spin-overlay-bg`.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Drop classes, keep logic — pair with a custom indicator.',

  tableSpinApi: 'Spin API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Spin ships two private tokens: `--sg-spin-color` for the ring colour, `--sg-spin-overlay-bg` for the wrapped-content backdrop. Layout values come from global motion / size tokens.',

  propSpinning: 'Show the loading state (subject to `delay`)',
  propSize: 'Indicator size — small (12px) / middle (24px) / large (36px)',
  propDelay: 'Wait `delay` ms before showing the spinner — anti-flicker',
  propTip: 'Optional caption below the indicator',
  propFullscreen: 'Cover the viewport with a backdrop',
  propUnstyled: 'Drop sg-spin-* classes (keep `delay` / `spinning` / overlay logic)',
  propIndicatorSlot: '`#indicator` slot for a custom ring',
  propDefaultSlot: 'Default slot — children dimmed via overlay while spinning',

  cssSpinColor: 'Indicator ring colour',
  cssSpinOverlayBg: 'Backdrop tint over wrapped children',
  cssMotionDuration: 'Default rotation speed',
  cssZModal: 'Stacking context for fullscreen',
  cssBorderRadius: 'Spin overlay corner radius',
} as const

export type SpinDocStrings = { -readonly [K in keyof typeof spinDocEn]: string }
