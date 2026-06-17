/**
 * English source of truth for Descriptions doc page strings.
 * Keep keys aligned with `ru.ts`.
 */
export const descriptionsDocEn = {
  pageTitle: 'Descriptions',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbDescriptions: 'Descriptions',
  pageLead:
    'Read-only label/value list for surfacing structured data — user profile, invoice, settings summary.',
  pageWhen1: 'Detail panel after clicking a row in a list/table.',
  pageWhen2: 'Account / billing / order summaries where edits live elsewhere.',
  pageWhen3: 'Print-friendly views — pairs render as a real `<table>`.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Three columns, horizontal layout, colon after each label.',
  demoBorderedTitle: 'Bordered',
  demoBorderedDesc: 'Outer border + tinted label column.',
  demoColumnsTitle: 'Columns',
  demoColumnsDesc: '`:column` controls how many pairs fit per row; `span` widens an item.',
  demoVerticalTitle: 'Vertical layout',
  demoVerticalDesc: 'Stack label above value when values are long.',
  demoNoColonTitle: 'No colon',
  demoNoColonDesc: '`:colon="false"` drops the trailing colon.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Two visual presets — `small` and the default.',
  demoRichContentTitle: 'Rich content',
  demoRichContentDesc: 'Vue: `value` is `string`. React supports `ReactNode` — see findings.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableDescriptionsApi: 'Descriptions API',
  tableDescriptionsItemApi: 'DescriptionsItem',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Descriptions reads global surface / border tokens. Override `--sg-color-bg-secondary` (label column), `--sg-color-border-secondary` (dividers), `--sg-border-radius` (outer corners) to rebrand.',

  propTitle: 'Optional heading rendered above the table',
  propItems: 'Rows built from these items',
  propBordered: 'Render bordered table',
  propColumn: 'Number of columns per row',
  propLayout: 'Horizontal (label | value) or vertical (stack label above value)',
  propColon: 'Append `:` after labels',
  propSize: 'Compact `small` vs default padding',
  propUnstyled: 'Drop sg-descriptions-* classes — only `<table>` markup remains',

  itemKey: 'Optional stable key',
  itemLabel: 'Field label',
  itemValue: 'Field value (Vue: string only — see findings)',
  itemSpan: 'Column span (max `column`)',

  cssBgSecondary: 'Label column background (bordered)',
  cssBorderSecondary: 'Frame and row dividers',
  cssTextSecondary: 'Label text colour',
  cssText: 'Value text colour',
  cssBorderRadius: 'Outer frame corner radius',
  cssFontSize: 'Default value font size',
  cssFontSizeSm: 'Small-size value font size',
} as const

export type DescriptionsDocStrings = { -readonly [K in keyof typeof descriptionsDocEn]: string }
