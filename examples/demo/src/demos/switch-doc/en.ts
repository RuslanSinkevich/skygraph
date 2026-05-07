/**
 * English source of truth for Switch doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const switchDocEn = {
  pageTitle: 'Switch',
  pageLead:
    'Boolean selector that commits immediately. Pair it with a label and — for slow networks — the `loading` state.',
  pageWhen1: 'Flip a single state that takes effect right away (dark mode, notifications, publish state).',
  pageWhen2: 'Inline in settings rows where a commit-on-click toggle is more natural than a form submit.',
  pageWhen3: 'Reach for Checkbox instead if the value is submitted later as part of a form.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled on/off with live readout.',
  demoTextIconTitle: 'Text & icon',
  demoTextIconDesc: 'checkedChildren / unCheckedChildren render inside the track.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'small for compact toolbars; default for forms.',
  demoStatesTitle: 'States',
  demoStatesDesc: 'Disabled keeps the state; loading blocks interaction.',
  demoAsyncTitle: 'Optimistic async toggle',
  demoAsyncDesc: 'Flip first, show a spinner, roll back on error.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: "Use valuePropName='checked' to bind Switch to a boolean field.",
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope global tokens to rebrand a group.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Semantics only — paint it yourself.',

  tableSwitchApi: 'Switch API',
  tableCssVars: 'CSS Variables',

  propChecked: 'Controlled on state',
  propDefaultChecked: 'Initial on state when uncontrolled',
  propOnChange: 'Fires when the switch is toggled',
  propDisabled: 'Block interaction but keep visual state',
  propLoading: 'Show inline spinner and block interaction',
  propSize: 'Size preset (large currently renders like default)',
  propCheckedChildren: 'Content rendered inside the track when on',
  propUnCheckedChildren: 'Content rendered inside the track when off',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop SkyGraph classes — keep role/aria only',

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
