/**
 * English source of truth for Dropdown doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const dropdownDocEn = {
  pageTitle: 'Dropdown',
  pageLead:
    'Anchored action menu. Opens on click or hover, fully keyboard-accessible, and supports danger / disabled / divider rows.',
  pageWhen1: 'Row-level actions or kebab menus that would be noisy as inline buttons.',
  pageWhen2: 'File / edit / view-style menus where items share semantic grouping.',
  pageWhen3: 'Contextual navigation where hover preview is faster than click.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Hover to open; onSelect gets the item.key.',
  demoTriggerTitle: 'Trigger',
  demoTriggerDesc: 'Click for action menus, hover for chrome.',
  demoPlacementTitle: 'Placement',
  demoPlacementDesc: 'Four corners — pick what fits the viewport.',
  demoRichTitle: 'Rich items',
  demoRichDesc: 'label is a full ReactNode — icons, shortcuts, two-line rows.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: "Menu can't open; onSelect is suppressed.",
  demoKeyboardTitle: 'Keyboard',
  demoKeyboardDesc: 'Space / Enter open, ↑ / ↓ move, Esc closes.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Retint surface, hover, and danger tokens on a wrapper.',

  tableDropdownApi: 'Dropdown API',
  tableDropdownItem: 'DropdownItem',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Dropdown has no dedicated tokens — it composes the elevated surface palette and the hover background. `danger` rows use `--sg-color-error` + `--sg-color-error-bg`. Tune `--sg-border-radius-lg` for rounder menus.',

  propItems: 'Menu rows and dividers',
  propOnSelect: 'Fires with the selected item.key',
  propTrigger: 'Open the menu on click or hover',
  propPlacement: 'Corner the menu anchors to',
  propDisabled: 'Block opening and selection',
  propChildren: 'Element that acts as the trigger',
  propClassName: 'Wrapper className',
  propUnstyled: 'Drop every sg-dropdown-* class (headless mode)',

  itemKey: 'Stable identifier passed to onSelect',
  itemLabel: 'Row content (any ReactNode)',
  itemDisabled: 'Lock the row',
  itemDanger: 'Paint the row in error colours',
  itemDivider: 'Render a separator instead of a row (label is ignored)',

  cssBgElevated: 'Menu background',
  cssBorderSecondary: 'Menu border + divider colour',
  cssBgHover: 'Row hover background',
  cssText: 'Row text colour',
  cssTextDisabled: 'Disabled row colour',
  cssError: 'Danger row text',
  cssErrorBg: 'Danger row hover background',
  cssFontSize: 'Row text size',
  cssLineHeight: 'Row line-height',
  cssPaddingXs: 'Row vertical padding + menu vertical padding',
  cssPaddingMd: 'Row horizontal padding',
  cssMarginXs: 'Divider vertical spacing',
  cssBorderRadiusLg: 'Menu corner radius',
  cssShadowLg: 'Menu elevation',
  cssZDropdown: 'Menu stacking layer',
  cssTransitionDuration: 'Row hover + open animation speed',
  cssTransitionTiming: 'Shared easing',
} as const

/** Writable string map — use for props / table builders (same keys as `dropdownDocEn`). */
export type DropdownDocStrings = { -readonly [K in keyof typeof dropdownDocEn]: string }
