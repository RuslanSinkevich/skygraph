/**
 * English source of truth for Dropdown doc page strings.
 * Other locales must provide the same keys (see `ru.ts`). 1:1 with React's
 * DropdownDemo (8 demos). Rich rows use the `#item` scoped slot.
 */
export const dropdownDocEn = {
  pageTitle: 'Dropdown',
  pageBadge: 'Navigation',
  crumbCategory: 'Navigation',
  crumbDropdown: 'Dropdown',
  pageLead:
    'Anchored action menu. Opens on click or hover, fully keyboard-accessible, and supports danger / disabled / divider rows.',
  pageWhen1: 'Row-level actions or kebab menus that would be noisy as inline buttons.',
  pageWhen2: 'File / edit / view-style menus where items share semantic grouping.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Hover to open; @select gets the item.key.',
  demoTriggerTitle: 'Trigger',
  demoTriggerDesc: 'Click for action menus, hover for chrome.',
  demoPlacementTitle: 'Placement',
  demoPlacementDesc: 'Four corners — pick what fits the viewport.',
  demoRichItemsTitle: 'Rich items',
  demoRichItemsDesc:
    'Render any VNode per row via the `#item` slot — icon + title + shortcut, dividers between sections.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: "Menu can't open; @select is suppressed.",
  demoKeyboardTitle: 'Keyboard',
  demoKeyboardDesc: 'Space / Enter open, ↑ / ↓ move, Esc closes.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Retint surface, hover, and danger tokens on a wrapper.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Keep behaviour + keyboard handling, bring your own paint.',

  tableDropdownApi: 'Dropdown API',
  tableDropdownItem: 'DropdownItem',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Dropdown has no dedicated tokens — it composes the elevated surface palette and the hover background. `danger` rows use `--sg-color-error` + `--sg-color-error-bg`. Tune `--sg-border-radius-lg` for rounder menus.',

  propItems: 'Menu rows and dividers',
  propTrigger: 'Open the menu on click or hover',
  propPlacement: 'Corner the menu anchors to',
  propDisabled: 'Block opening and selection',
  propUnstyled: 'Drop every sg-dropdown-* class (headless mode)',
  emitSelect: 'Emitted with the selected item.key',
  slotDefault: 'Element that acts as the trigger',

  itemKey: 'Stable identifier passed to @select',
  itemLabel: 'Row text (string)',
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

/** Writable string map — used by table builders. */
export type DropdownDocStrings = { -readonly [K in keyof typeof dropdownDocEn]: string }
