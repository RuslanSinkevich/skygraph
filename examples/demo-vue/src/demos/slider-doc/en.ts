/**
 * English source of truth for Slider doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/slider-doc/en.ts`. Vue side has full
 * parity (no missing props), so all React keys are preserved.
 */
export const sliderDocEn = {
  pageTitle: 'Slider',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbSlider: 'Slider',
  pageLead:
    'Horizontal numeric slider with full keyboard support (arrow keys respect `step`). Emits a `number`, always within `[min, max]`.',
  pageWhen1: 'Pick a number where approximate is fine: volume, brightness, opacity.',
  pageWhen2: 'Any bounded setting with a visual "fill" that helps users feel the scale.',
  pageWhen3: 'Paired with an `SgInputNumber` when precise typing matters.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled slider with v-model and live readout.',
  demoMinMaxStepTitle: 'Min / Max / Step',
  demoMinMaxStepDesc: 'Custom ranges and step sizes.',
  demoWithValueTitle: 'Slider + number input',
  demoWithValueDesc: 'Two controls sharing one state.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Greyed out, no interaction.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: 'Slider plugged into `<SgField>` via the scoped slot.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Three scopes built from Slider tokens: green brand, dark surface and glass pick (fill, handle, rail).',
  tableSliderApi: 'Slider API',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model bound numeric value',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial value when uncontrolled',
  propMin: 'Lower bound',
  propMax: 'Upper bound',
  propStep: 'Increment between valid values (pointer + keyboard)',
  propDisabled: 'Block pointer and keyboard input',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',
  emitUpdateModelValue: 'Fires on every committed value change (used by `v-model`)',
  emitChange: 'Mirror of `update:modelValue`',

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
