/**
 * English source of truth for Spin doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const spinDocEn = {
  pageTitle: 'Spin',
  pageLead:
    'Loading indicator — inline, inside a container (with overlay), or fullscreen. Supports delay, custom indicators, and a single-token color override.',
  pageWhen1: 'Async sections that will render real content shortly.',
  pageWhen2: 'Buttons + forms that need a loading mask to block duplicate submits.',
  pageWhen3: 'Route / page transitions — paired with `fullscreen`.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'A standalone spinner.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small / middle / large.',
  demoContainerTitle: 'Wrapping children',
  demoContainerDesc: 'Blur + mask the wrapped content while `spinning`.',
  demoTipTitle: 'Tip',
  demoTipDesc: 'Short status line under the spinner.',
  demoDelayTitle: 'Delay',
  demoDelayDesc: 'Skip the spinner entirely for fast requests.',
  demoCustomColorTitle: 'Custom color',
  demoCustomColorDesc: 'Override `--sg-spin-color` per scope — no class wrangling.',
  demoCustomIndicatorTitle: 'Custom indicator',
  demoCustomIndicatorDesc: 'Swap the ring for any ReactNode.',
  demoFullscreenTitle: 'Fullscreen',
  demoFullscreenDesc: 'Viewport-level overlay at z-modal.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Tune ring + overlay background via CSS vars.',

  tableSpinApi: 'Spin API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Spin exposes two component-local tokens: `--sg-spin-color` for the ring and `--sg-spin-overlay-bg` for the container / fullscreen backdrop. Scope them on a wrapper to tint a single section without touching the global primary.',

  propSpinning: 'Whether the spinner is visible',
  propSize: 'Ring size — 12 / 24 / 36px for small / middle / large',
  propDelay: 'Defer showing the spinner by N ms (prevents flicker)',
  propTip: 'Caption rendered below the spinner',
  propFullscreen: 'Cover the viewport with a dimmed backdrop at z-modal',
  propIndicator: 'Replace the ring with a custom node',
  propChildren: 'Content to overlay with the spinner',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop every sg-spin-* class (headless mode)',

  cssSpinColor: 'Ring colour — Spin-local, defaults to the global primary',
  cssSpinOverlayBg: 'Backdrop colour for container / fullscreen overlay',
  cssPrimary: 'Default ring colour (read through `--sg-spin-color`) + tip text',
  cssFontSizeSm: 'Tip text size',
  cssMarginSm: 'Gap between spinner and tip (standalone / overlay / fullscreen)',
  cssRadius: 'Overlay corner radius (matches the wrapped block)',
  cssZLoading: 'z-index of the container overlay',
  cssZModal: 'z-index of the fullscreen backdrop',
} as const

/** Writable string map — use for props / table builders (same keys as `spinDocEn`). */
export type SpinDocStrings = { -readonly [K in keyof typeof spinDocEn]: string }
