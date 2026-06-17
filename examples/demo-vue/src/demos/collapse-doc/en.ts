/**
 * English source of truth for Collapse doc page strings.
 * Keep keys aligned with `ru.ts`.
 */
export const collapseDocEn = {
  pageTitle: 'Collapse',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbCollapse: 'Collapse',
  pageLead:
    'Group of vertically stacked, expandable panels — show secondary detail without crowding the page.',
  pageWhen1: 'FAQ-style content with one item per question.',
  pageWhen2: 'Settings, filter or onboarding flows with optional advanced sections.',
  pageWhen3: 'Lists where one row at a time can show extra detail (use `accordion`).',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Multiple panels open at once. `defaultActiveKey` seeds the open set.',
  demoAccordionTitle: 'Accordion',
  demoAccordionDesc: 'Single-open mode — clicking another swaps which panel is open.',
  demoBorderlessTitle: 'Borderless',
  demoBorderlessDesc: '`:bordered="false"` removes the outer frame.',
  demoControlledTitle: 'Controlled',
  demoControlledDesc: 'Own the open set with `activeKey` + `@change` — toolbars, URL state.',
  demoDisabledTitle: 'Disabled item',
  demoDisabledDesc: 'A `disabled` panel cannot be opened or focused.',
  demoExtraTitle: 'Extra in header',
  demoExtraDesc: 'Short text status appears to the right of the label.',
  demoGhostTitle: 'Ghost',
  demoGhostDesc: '`ghost` removes borders and panel backgrounds.',
  demoIconPositionTitle: 'Icon position',
  demoIconPositionDesc: 'Move the chevron to the trailing edge — classic FAQ layout.',
  demoNoArrowTitle: 'No arrow',
  demoNoArrowDesc: 'Hide the chevron per item with `showArrow: false`.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Three sizes affect header padding, min-height, and (on `large`) font size.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableCollapseApi: 'Collapse API',
  tableCollapseItemApi: 'CollapseItem',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Collapse has no dedicated tokens — it reads the global surface palette and border tokens. Override `--sg-color-bg-container`, `--sg-color-bg-secondary`, `--sg-color-bg-hover`, plus `--sg-color-border-secondary` to rebrand.',

  propItems: 'Panels in display order',
  propActiveKey: 'Controlled open keys',
  propDefaultActiveKey: 'Initial open keys (uncontrolled)',
  propAccordion: 'Only one panel open at a time',
  propBordered: 'Draw the outer frame',
  propExpandIconPosition: 'Where to dock the expand chevron',
  propGhost: 'Transparent style — no outer border / panel backgrounds',
  propSize: 'Header padding / min-height preset',
  propUnstyled: 'Drop sg-collapse-* classes (keep aria + accordion logic)',
  propOnChange: 'Fires with the new active-key array (`@change`)',

  itemKey: 'Unique panel key',
  itemLabel: 'Header text',
  itemContent: 'Body text revealed when expanded',
  itemExtra: 'Short text rendered to the right of the header (Vue: string only — see findings)',
  itemShowArrow: 'Show / hide the expand chevron for this panel',
  itemDisabled: 'Lock the panel — header is greyed and unfocusable',

  cssBgContainer: 'Panel & header background',
  cssBgSecondary: 'Open panel body background',
  cssBgHover: 'Header background on hover',
  cssBorderSecondary: 'Frame and panel separators',
  cssText: 'Header text colour',
  cssTextSecondary: 'Body text colour',
  cssBorderRadiusLg: 'Outer frame corner radius',
} as const

export type CollapseDocStrings = { -readonly [K in keyof typeof collapseDocEn]: string }
