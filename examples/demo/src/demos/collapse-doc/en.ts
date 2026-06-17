/**
 * English source of truth for Collapse doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const collapseDocEn = {
  pageTitle: 'Collapse',
  pageLead:
    'Vertical accordion-style list of collapsible panels with controlled / accordion modes, per-item extras, and full keyboard support.',
  pageWhen1: 'FAQ pages and help centres — users only want one answer at a time.',
  pageWhen2: 'Long settings screens split into foldable sections.',
  pageWhen3: 'Summary rows (billing, team, API keys) with a peek-on-demand body.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Multiple panels open at once.',
  demoAccordionTitle: 'Accordion',
  demoAccordionDesc: 'Only one panel may be open at a time.',
  demoBorderlessTitle: 'Borderless',
  demoBorderlessDesc: 'Drop the outer frame — keep panel separators.',
  demoGhostTitle: 'Ghost',
  demoGhostDesc: 'Fully transparent style for overlays and cards.',
  demoIconPositionTitle: 'Expand icon position',
  demoIconPositionDesc: 'Flip the chevron to the end of the header.',
  demoExtraTitle: 'Extra slot',
  demoExtraDesc: "Status tags or action buttons in the header's right edge.",
  demoDisabledTitle: 'Disabled items',
  demoDisabledDesc: 'Gate a section behind a permission or loading state.',
  demoNoArrowTitle: 'No arrow',
  demoNoArrowDesc: "Per-item `showArrow: false` for headers that don't need a chevron.",
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small / middle / large.',
  demoControlledTitle: 'Controlled',
  demoControlledDesc: 'Own the open set yourself to add Expand all / Collapse all toolbars.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tableCollapseApi: 'Collapse API',
  tableCollapseItem: 'CollapseItem',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Collapse has no component-private tokens. It composes the global surface palette (`--sg-color-bg-*`), border tokens (`--sg-color-border-secondary`), and size scales (`--sg-height-*`, `--sg-padding-*`, `--sg-font-size-*`). Scope those on a wrapper for local rebrands.',

  propItems: 'Panels to render, each with a stable `key`',
  propActiveKey: 'Controlled open keys; overrides internal state',
  propDefaultActiveKey: 'Initial open keys when uncontrolled',
  propOnChange: 'Fires after the open set changes (array form)',
  propAccordion: 'Only one panel may be open at a time',
  propBordered: 'Outer border + rounded container',
  propExpandIconPosition: 'Chevron placement relative to the header text',
  propGhost: 'Transparent style without panel backgrounds / borders',
  propSize: 'Header padding / font scale (inherits from ConfigProvider)',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop every sg-collapse-* class (headless mode)',

  itemKey: 'Unique id used for the open set and toggling',
  itemLabel: 'Header content (text or ReactNode)',
  itemChildren: 'Body content revealed when expanded',
  itemExtra: 'Slot rendered on the right edge of the header',
  itemShowArrow: 'Hide the chevron for this panel when `false`',
  itemDisabled: 'Prevent toggling and dim the header',

  cssBgContainer: 'Panel background',
  cssBgSecondary: 'Idle header background',
  cssBgHover: 'Hovered header background',
  cssBorderSecondary: 'Outer frame + panel separators',
  cssText: 'Header + body text',
  cssTextSecondary: '`extra` slot text colour',
  cssPrimary: 'Header focus-visible outline',
  cssFontSize: 'Default header + body font size',
  cssFontSizeSm: '`size="small"` header font size',
  cssFontSizeLg: '`size="large"` header font size',
  cssLineHeight: 'Paragraph line height inside the body',
  cssHeightSm: '`size="small"` min header height',
  cssHeightMd: '`size="middle"` min header height',
  cssHeightLg: '`size="large"` min header height',
  cssPaddingXs: '`size="small"` header padding',
  cssPaddingSm: '`size="middle"` header v-padding + gap before chevron',
  cssPaddingMd: '`size="large"` header v-padding',
  cssPaddingLg: '`size="middle"` header h-padding',
  cssPaddingXl: '`size="large"` header h-padding',
  cssBorderRadiusLg: 'Bordered container corner radius',
  cssTransitionDuration: 'Hover + chevron rotation duration',
  cssTransitionTiming: 'Shared easing',
} as const

/** Writable string map — use for props / table builders (same keys as `collapseDocEn`). */
export type CollapseDocStrings = { -readonly [K in keyof typeof collapseDocEn]: string }
