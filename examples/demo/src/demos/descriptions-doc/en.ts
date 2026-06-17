/**
 * English source of truth for Descriptions doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const descriptionsDocEn = {
  pageTitle: 'Descriptions',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbDescriptions: 'Descriptions',
  pageLead:
    'Read-only key / value table for detail pages. Supports horizontal + vertical layouts, a bordered variant, variable column count and per-item `span`.',
  pageWhen1: 'Showing a block of read-only fields — invoices, profile summaries, incident details.',
  pageWhen2: 'When a data table feels too heavy but a plain `<dl>` would be too minimal.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default 3-column, horizontal layout.',
  demoBorderedTitle: 'Bordered',
  demoBorderedDesc: 'Bordered frame + tinted label column.',
  demoVerticalTitle: 'Vertical layout',
  demoVerticalDesc: 'Labels above values — good for long cell content.',
  demoColumnsTitle: 'Columns',
  demoColumnsDesc: 'Change column density; `span` widens items.',
  demoNoColonTitle: 'No colon',
  demoNoColonDesc: 'Drop the trailing colon after labels.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small and middle padding / font presets.',
  demoRichContentTitle: 'Rich content',
  demoRichContentDesc: 'Labels and values accept any ReactNode — Badge, Tag, links…',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tableDescriptionsApi: 'Descriptions API',
  tableDescriptionsItem: 'DescriptionsItem',
  tableCssVars: 'CSS Variables',

  propTitle: 'Optional heading rendered above the table',
  propItems: 'Label / value pairs rendered according to `column` + per-item `span`',
  propBordered: 'Wraps the table in a border + tints the label column',
  propColumn: 'Number of label / value pairs per row',
  propLayout: 'Stack labels above values (`vertical`) or side-by-side (`horizontal`)',
  propColon: 'Append a `:` after every label',
  propSize: 'Padding / font preset — inherits from ConfigProvider',
  propClassName: 'Extra class on the root',
  propStyle: 'Inline style on the root',
  propUnstyled: 'Drop every sg-descriptions-* class; render a bare `<table>`',

  itemKey: 'Stable key for reconciliation',
  itemLabel: 'First-cell / header row label',
  itemChildren: 'Value content',
  itemSpan: 'Column span (capped at the `column` prop)',

  cssHint:
    'Descriptions has no component-local tokens. Rebrand via the global palette — especially `--sg-color-bg-secondary` (label column in bordered mode) and `--sg-color-border-secondary` (dividers).',

  cssSgColorText: 'Value colour + title colour',
  cssSgColorTextSecondary: 'Label colour',
  cssSgColorBgSecondary: 'Label column background in `bordered` mode',
  cssSgColorBorderSecondary: 'Table border + row dividers in `bordered` mode',
  cssSgBorderRadius: 'Outer corners of the bordered table',
  cssSgFontSize: 'Base cell font size',
  cssSgFontSizeSm: '`size="small"` font size',
  cssSgFontSizeLg: 'Title font size',
  cssSgLineHeight: 'Line-height for labels / values / title',
  cssSgPaddingXs: '`size="small"` vertical padding',
  cssSgPaddingSm: 'Default vertical padding / horizontal padding in small-bordered',
  cssSgPaddingMd: 'Default horizontal padding between label and value',
  cssSgPaddingLg: 'Horizontal padding in bordered mode',
  cssSgMarginSm: 'Right margin of the colon',
  cssSgMarginMd: 'Space between title and table',
} as const

/** Writable string map — use for props / table builders (same keys as `descriptionsDocEn`). */
export type DescriptionsDocStrings = { -readonly [K in keyof typeof descriptionsDocEn]: string }
