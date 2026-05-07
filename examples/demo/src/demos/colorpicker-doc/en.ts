/**
 * English source of truth for ColorPicker doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const colorPickerDocEn = {
  pageTitle: 'ColorPicker',
  pageLead:
    'Popover color picker with saturation square, hue strip, hex / rgb input and optional preset groups. Supports click / hover triggers and controlled open state.',
  pageWhen1: 'Let users pick brand colours — feed the result straight into --sg-color-primary.',
  pageWhen2: 'Design-tool style interactions where a swatch + popover is cleaner than a modal.',
  pageWhen3: 'Surveys or configs that accept an arbitrary colour instead of a fixed palette.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled hex value bound to a live preview swatch.',
  demoFormatsTitle: 'Format',
  demoFormatsDesc: 'Pick between hex and rgb payloads — the trigger label mirrors the chosen format.',
  demoPresetsTitle: 'Presets',
  demoPresetsDesc: 'Grouped preset swatches under the panel for brand palettes.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Trigger height + swatch scale with the size prop.',
  demoTriggerTitle: 'Trigger',
  demoTriggerDesc: 'Click is the default; hover is useful in toolbars.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: "Trigger stays readable but won't open.",
  demoThemeSwapTitle: 'Live theme swap',
  demoThemeSwapDesc: 'Drive --sg-color-primary from the picker and watch every component restyle instantly.',
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc: 'Scope global colour / radius tokens on a wrapper to restyle without a theme file.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Drop every SkyGraph class and bring your own design — behaviour stays.',

  tableColorPickerApi: 'ColorPicker API',
  tableCssVars: 'CSS Variables',

  propValue: 'Controlled colour as hex "#rrggbb" or "rgb(r, g, b)"',
  propDefaultValue: 'Initial colour when uncontrolled',
  propOnChange: 'Fires with the formatted colour string',
  propFormat: 'Display + onChange payload format',
  propPresets: 'Grouped preset swatches',
  propShowText: 'Show formatted text next to the swatch, or render custom node',
  propTrigger: 'How the panel opens',
  propOpen: 'Controlled open state of the panel',
  propOnOpenChange: 'Fires when the panel opens or closes',
  propSize: 'Trigger height + swatch size',
  propDisabled: 'Lock the picker',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop all SkyGraph classes (headless mode)',

  cssHint:
    "ColorPicker has no component-specific tokens — it composes the global form tokens (trigger) and surface tokens (dropdown). Override them on a wrapper with inline style={{ '--sg-...': ... }} to restyle.",

  cssSgColorBorder: 'Trigger border, swatch border, input border inside panel',
  cssSgColorBorderSecondary: 'Dropdown border + swatch outline',
  cssSgColorPrimary: 'Focus ring on trigger and hex/rgb input',
  cssSgColorPrimaryHover: 'Trigger hover border',
  cssSgColorPrimaryBg: 'Focus glow + preset hover halo',
  cssSgColorBgContainer: 'Trigger background + hex input background',
  cssSgColorBgElevated: 'Dropdown panel background',
  cssSgColorText: 'Trigger and input text colour',
  cssSgColorTextSecondary: 'Formatted value label (showText)',
  cssSgColorTextTertiary: 'Preset group label',
  cssSgBorderRadius: 'Trigger border radius',
  cssSgBorderRadiusSm: 'Swatches, preview, hex input radius',
  cssSgBorderRadiusLg: 'Dropdown panel radius',
  cssSgHeightSm: 'Trigger height (size="small") + hex input height',
  cssSgHeightMd: 'Trigger height (size="middle")',
  cssSgHeightLg: 'Trigger height (size="large")',
  cssSgPaddingXs: 'Compact swatch / preset gaps',
  cssSgPaddingSm: 'Trigger inner gap + input row gap',
  cssSgPaddingMd: 'Dropdown padding',
  cssSgFontSize: 'Trigger text size',
  cssSgFontSizeSm: 'Hex input + preset label + showText',
  cssSgShadowLg: 'Dropdown elevation',
  cssSgTransitionDuration: 'Focus / hover / preset transition speed',
  cssSgTransitionTiming: 'Shared easing',
  cssSgZDropdown: 'Stacking layer of the dropdown',
} as const

/** Writable string map — use for props / table builders (same keys as `colorPickerDocEn`). */
export type ColorPickerDocStrings = { -readonly [K in keyof typeof colorPickerDocEn]: string }
