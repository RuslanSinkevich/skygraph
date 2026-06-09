/**
 * English source of truth for Switch doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/switch-doc/en.ts`. Vue side has no
 * `loading` prop on `SgSwitch` yet, so the `propLoading` key is dropped
 * and the description rephrases "loading" → "disabled".
 */
export const switchDocEn = {
  pageTitle: 'Switch',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbSwitch: 'Switch',
  pageLead:
    'Boolean selector that commits immediately. Pair it with a label and — for slow networks — a pending state via `disabled`.',
  pageWhen1:
    'Flip a single state that takes effect right away (dark mode, notifications, publish state).',
  pageWhen2:
    'Inline in settings rows where a commit-on-click toggle is more natural than a form submit.',
  pageWhen3: 'Reach for Checkbox instead if the value is submitted later as part of a form.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled on/off with v-model and a live readout.',
  demoTextIconTitle: 'Text & icon',
  demoTextIconDesc: '`#checkedChildren` / `#unCheckedChildren` slots render inside the track.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: '`small` for compact toolbars; default for forms.',
  demoStatesTitle: 'Disabled states',
  demoStatesDesc:
    '`disabled` keeps the visual state but blocks interaction. Vue has no loading state yet.',
  demoAsyncTitle: 'Optimistic async toggle',
  demoAsyncDesc:
    'Flip first, gate clicks via `disabled`, surface progress in the side label, roll back on error.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc:
    'Wrap with `<SgField>` and pipe `:model-value` / `@update:model-value` from the slot.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Three scopes built from Switch tokens: green brand, dark surface and glass pick (track in both states).',
  tableSwitchApi: 'Switch API',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model bound boolean',
  propChecked: 'Compat alias for `modelValue`',
  propDefaultChecked: 'Initial on state when uncontrolled',
  propDisabled: 'Block interaction but keep visual state',
  propSize: 'Size preset (`large` currently renders like default)',
  propUnstyled: 'Drop SkyGraph classes — keep role/aria only',
  emitUpdateModelValue: 'Fires with the new boolean (used by `v-model`)',
  emitChange: 'Mirror of `update:modelValue`',
  slotCheckedChildren: 'Content rendered inside the track when on',
  slotUnCheckedChildren: 'Content rendered inside the track when off',

  cssHint:
    'Switch uses only global tokens. To rebrand, scope `--sg-color-primary` (on), `--sg-color-text-disabled` (off) and `--sg-color-white` (thumb) on a parent.',

  cssSgColorPrimary: 'Track background in the on state',
  cssSgColorTextDisabled: 'Track background in the off state',
  cssSgColorWhite: 'Thumb (handle) color and inner label color',
  cssSgShadowSm: 'Thumb drop-shadow',
  cssSgFontSizeSm: 'Font size of the inner on/off label',
  cssSgTransitionDuration: 'Thumb & background transition duration',
  cssSgTransitionTiming: 'Thumb & background easing',
} as const

/** Writable string map — use for props / table builders (same keys as `switchDocEn`). */
export type SwitchDocStrings = { -readonly [K in keyof typeof switchDocEn]: string }
