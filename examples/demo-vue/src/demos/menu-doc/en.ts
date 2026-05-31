/**
 * English source of truth for Menu doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const menuDocEn = {
  pageTitle: 'Menu',
  pageBadge: 'Navigation',
  crumbCategory: 'Navigation',
  crumbMenu: 'Menu',
  pageLead:
    'Versatile navigation menu — vertical sidebars, horizontal top bars, inline trees, collapsed rails, dark and branded themes.',
  pageWhen1: 'As the primary navigation of an application (sidebar + top bar).',
  pageWhen2: 'When you need nested submenus with predictable open/close behaviour.',

  demoVerticalTitle: 'Vertical',
  demoVerticalDesc: 'Sidebar layout, submenus open in a popover.',
  demoHorizontalTitle: 'Horizontal',
  demoHorizontalDesc: 'Top-nav layout with hover dropdown.',
  demoInlineTitle: 'Inline',
  demoInlineDesc: 'Submenus expand in place — best for deep trees.',
  demoControlledTitle: 'Controlled',
  demoControlledDesc: 'Own selectedKeys/openKeys from the outside.',
  demoIconsTitle: 'With icons',
  demoIconsDesc: 'Every MenuItem accepts an `icon` VNode — produce it with `h()`.',
  demoGroupsTitle: 'Groups, dividers & danger',
  demoGroupsDesc: 'Structured menus with destructive actions.',
  demoCollapsedTitle: 'Collapsed rail',
  demoCollapsedDesc: 'inlineCollapsed → labels hide; popovers on hover.',
  demoDarkTitle: 'Dark theme',
  demoDarkDesc: "theme='dark' for dark surfaces.",
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope globals on a wrapper to re-skin a single menu.',
  demoCustomLauncherTitle: 'Custom: App launcher',
  demoCustomLauncherDesc:
    'SaaS-style sidebar with gradient brand mark, glyph badges and a soft elevated surface — pure token scoping.',
  demoCustomGlassTitle: 'Custom: Glass top nav',
  demoCustomGlassDesc:
    'Frosted floating bar over a colourful hero, with pill CTA. Demonstrates horizontal menu re-skinning via tokens.',
  demoCustomPaletteTitle: 'Custom: Command palette',
  demoCustomPaletteDesc:
    'Dark search-driven palette: keyboard shortcuts, fuzzy search, grouped commands. Items live in the public API; rich nodes via `h()` VNodes in `label`.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'ARIA semantics only — bring your own CSS.',

  tableMenuApi: 'Menu API',
  tableMenuItem: 'MenuItem',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Menu has no component-scoped tokens — only global palette/spacing variables drive its look. Override the globals on a scoped wrapper to re-skin a single instance.',

  propItems: 'Top-level items (may nest children, groups, dividers)',
  propMode: 'Layout and interaction mode',
  propSelectedKeys: 'Controlled selected keys',
  propDefaultSelectedKeys: 'Initial selected keys',
  propOpenKeys: 'Controlled open submenu keys',
  propDefaultOpenKeys: 'Initial open submenu keys',
  propTheme: 'Built-in palette',
  propInlineCollapsed: 'Collapse inline mode (labels hide)',
  propUnstyled: 'Strip every SkyGraph class — semantics only',
  emitSelect: 'Emitted after user selects a leaf item',
  emitOpenChange: 'Emitted when inline submenu expands/collapses',

  itemKey: 'Unique id (selection + open-key tracking)',
  itemLabel: 'Display label (string)',
  itemIcon: 'Optional leading icon (VNode produced via `h()` or `<component :is>`)',
  itemDisabled: 'Dim + block activation',
  itemDanger: 'Apply error color (destructive action)',
  itemChildren: 'Nested items (creates a submenu)',
  itemType: "'group' renders a titled section; 'divider' draws a rule",

  cssPrimary: 'Selected item text, dark-theme selected background, horizontal underline',
  cssPrimaryBg: 'Selected item background (light theme)',
  cssPrimaryHover: 'Horizontal hover underline',
  cssBgContainer: 'Menu surface background',
  cssBgElevated: 'Popover submenu surface',
  cssBgHover: 'Row hover background',
  cssText: 'Default menu text',
  cssTextSecondary: 'Dark theme default text',
  cssTextTertiary: 'Group title text',
  cssTextDisabled: 'Disabled item text',
  cssBorderSecondary: 'Vertical divider, popup border',
  cssError: 'Danger item text',
  cssErrorBg: 'Danger item hover background',
  cssBorderRadiusLg: 'Popup submenu radius',
  cssShadowLg: 'Popup submenu shadow',
  cssFontSize: 'Menu text size',
  cssFontSizeLg: 'Icon size',
  cssFontSizeSm: 'Group title font size',
  cssHeightMd: 'Minimum row height',
  cssPaddingXs: 'Row vertical padding + top/bottom gutters',
  cssPaddingSm: 'Icon / label gap, horizontal row padding',
  cssPaddingMd: 'Horizontal row padding (horizontal mode)',
  cssPaddingLg: 'Row horizontal padding, inline left indent',
  cssMarginXs: 'Divider vertical margin',
  cssZDropdown: 'Popup submenu z-index',
  cssLineHeight: 'Text line-height',
  cssTransitionDuration: 'Hover / selection transition',
  cssTransitionTiming: 'Transition easing',
} as const

/** Writable string map — used by table builders. */
export type MenuDocStrings = { -readonly [K in keyof typeof menuDocEn]: string }
