/**
 * English source of truth for Slider doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const sliderDocEn = {
  pageTitle: 'Slider',
  pageLead:
    'Horizontal numeric slider with full keyboard support (arrow keys respect `step`). Emits a `number`, always within `[min, max]`.',
  pageWhen1: 'Pick a number where approximate is fine: volume, brightness, opacity.',
  pageWhen2: 'Any bounded setting with a visual "fill" that helps users feel the scale.',
  pageWhen3: 'Paired with an `InputNumber` when precise typing matters.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled slider with live readout.',
  demoMinMaxStepTitle: 'Min / Max / Step',
  demoMinMaxStepDesc: 'Custom ranges and step sizes.',
  demoWithValueTitle: 'Slider + number input',
  demoWithValueDesc: 'Two controls sharing one state.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Greyed out, no interaction.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: 'Slider plugged into `<Field>`.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope global tokens on a wrapper to rebrand.',

  tableSliderApi: 'Slider API',
  tableCssVars: 'CSS Variables',

  propValue: 'Controlled numeric value',
  propDefaultValue: 'Initial value when uncontrolled',
  propMin: 'Lower bound',
  propMax: 'Upper bound',
  propStep: 'Increment between valid values (pointer + keyboard)',
  propOnChange: 'Fires on every committed value change',
  propDisabled: 'Block pointer and keyboard input',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',

  cssHint:
    'The root stretches with `width: 100%` and `--sg-slider-min-inline-size`. `--sg-color-primary` paints the fill and handle border; `--sg-color-border` the rail.',

  cssSgSliderMinInlineSize:
    'Minimum width (flex/grid); derived from `--sg-font-size`, override freely',
  cssSgColorPrimary: 'Fill color and handle border color',
  cssSgColorPrimaryBg: 'Handle focus ring color',
  cssSgColorBorder: 'Track (rail) color',
  cssSgColorWhite: 'Handle background color',
  cssSgPaddingSm: 'Vertical padding above/below the rail (clickable area)',
  cssSgTransitionDuration: 'Handle box-shadow transition on hover',
} as const

/** Writable string map — use for props / table builders (same keys as `sliderDocEn`). */
export type SliderDocStrings = { -readonly [K in keyof typeof sliderDocEn]: string }
