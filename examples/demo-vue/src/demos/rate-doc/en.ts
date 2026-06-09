/**
 * English source of truth for Rate doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/rate-doc/en.ts`. Vue side accepts
 * `character` only as a string (no slot/VNode).
 */
export const rateDocEn = {
  pageTitle: 'Rate',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbRate: 'Rate',
  pageLead:
    'Star-rating control with hover preview, optional half-steps and any glyph as the symbol. Clicking the already-selected value clears it back to 0.',
  pageWhen1: 'Collect quick sentiment on reviews, surveys, or products.',
  pageWhen2: 'Read-only "social proof" display next to an author or place.',
  pageWhen3: 'Anywhere a slider would feel heavier than "pick a discrete 1–5".',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled 5-star rating, click to clear.',
  demoAllowHalfTitle: 'Half-steps',
  demoAllowHalfDesc: '`allow-half` uses pointer position to pick N − 0.5 vs N.',
  demoCountTitle: 'Custom count',
  demoCountDesc: '3 for sentiment, 10 for NPS-like scales.',
  demoCustomCharacterTitle: 'Custom character',
  demoCustomCharacterDesc:
    'Vue accepts a string (emoji or glyph). React supports any node — Vue is glyph-only here.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Read-only display mode.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: "Validator for 'must rate'.",
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc:
    'Three scopes built from Rate tokens: green brand, dark surface and glass pick (`--sg-color-star` + border).',
  tableRateApi: 'Rate API',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model bound rating value',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial rating when uncontrolled',
  propCount: 'Number of rating symbols',
  propAllowHalf: 'Enable 0.5 steps (clicking the left half of a star)',
  propCharacter: 'Custom symbol for each star (string)',
  propDisabled: 'Lock the control (read-only)',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',
  emitUpdateModelValue: 'Fires with the next rating (used by `v-model`)',
  emitChange: 'Mirror of `update:modelValue`',

  cssHint:
    'Filled colour: `--sg-color-star`. Empty: `--sg-color-border` plus `--sg-rate-symbol-empty-opacity` (needed when `character` is a colour emoji). Size: `--sg-font-size-xl`.',

  cssSgColorStar: 'Fill colour of a selected / half star',
  cssSgColorBorder: 'Colour of an empty star',
  cssSgRateSymbolEmptyOpacity:
    'Inactive symbols are faded so colour emoji still read as empty vs full (monochrome glyphs can use 1)',
  cssSgFontSizeXl: 'Size of each rating symbol',
  cssSgPaddingXs: 'Gap between stars',
  cssSgTransitionDuration: 'Hover color + scale transition duration',
} as const

/** Writable string map — use for props / table builders (same keys as `rateDocEn`). */
export type RateDocStrings = { -readonly [K in keyof typeof rateDocEn]: string }
