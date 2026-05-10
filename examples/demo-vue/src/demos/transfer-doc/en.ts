/**
 * English source of truth for Transfer doc page strings (Vue port).
 *
 * Vue parity gaps vs React (see `findings/T-Vue-Demo-Forms.md`
 * → `transfer-vue-feature-gaps`):
 * - no `render` prop / row scoped slot — labels are plain title text
 * - no `listStyle` prop
 *
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const transferDocEn = {
  pageTitle: 'Transfer',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbTransfer: 'Transfer',
  pageLead:
    'Dual-list shuttle for picking a subset of items. Built-in search, per-row disabled, one-way mode and CSS-token themability.',
  pageWhen1:
    'When you need to split a set into "available" and "selected" — e.g. role permissions, tag selection, audience targeting.',
  pageWhen2: "When a multi-Select feels too crowded and reordering isn't important.",
  pageWhen3:
    'For rich row labels (title + description), use the React Transfer — Vue currently renders `title` only (gap).',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled via `v-model` / `target-keys`.',
  demoSearchTitle: 'With search',
  demoSearchDesc: 'Filter each list by title substring.',
  demoOneWayTitle: 'One-way',
  demoOneWayDesc: 'Hide the move-left button.',
  demoTitlesTitle: 'Titles',
  demoTitlesDesc: 'Custom column headers.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Whole control + per-row `disabled`.',
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc: 'Rebrand panels via the global palette.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Strip the wrapper class hooks; semantics stay intact.',

  tableTransferApi: 'Transfer API',
  tableTransferItem: 'TransferItem',
  tableCssVars: 'CSS Variables',

  propDataSource: 'All items — split between source / target via `target-keys`',
  propModelValue: 'v-model binding (Vue idiom) for keys on the right list',
  propTargetKeys: 'Compat alias for `modelValue`',
  propDefaultTargetKeys: 'Initial target keys when uncontrolled',
  propShowSearch: 'Render a search input above each list (matches on `title`)',
  propTitles: 'Column headers for [source, target]',
  propOneWay: 'Hide the move-left button — items only flow to the target',
  propDisabled: 'Disable both lists (also inherits from `ConfigProvider`)',
  propUnstyled: 'Drop every sg-transfer-* class',
  emitUpdateModelValue: 'Emitted with the new target-keys (v-model)',
  emitChange: 'Fires after a move with `(keys, direction, moveKeys)`',
  emitSelectChange: 'Fires when checkbox selection changes on either list',

  itemKey: 'Stable identifier — presence in `target-keys` determines side',
  itemTitle: 'Primary label + default search text',
  itemDescription: 'Secondary line — Vue ignores it (no `render` slot yet)',
  itemDisabled: 'Exclude from selection / bulk move',

  cssHint:
    'Transfer has no component-local tokens. Rebrand via the global palette — the panel chrome uses `--sg-color-border`, `--sg-color-bg-secondary` (header), `--sg-color-bg-hover` (row) and `--sg-color-primary-bg` (selected row).',

  cssSgColorBgContainer: 'List panel background',
  cssSgColorBgSecondary: 'List header background',
  cssSgColorBgHover: 'Row hover background',
  cssSgColorPrimaryBg: 'Selected-row background',
  cssSgColorBorder: 'Panel outline',
  cssSgColorBorderSecondary: 'Header / search dividers',
  cssSgColorText: 'Body text',
  cssSgColorTextSecondary: 'Count / header meta colour',
  cssSgColorTextDisabled: 'Disabled row text',
  cssSgBorderRadius: 'Panel outer radius',
  cssSgFontSize: 'Row font size',
  cssSgFontSizeSm: 'Header count text size',
  cssSgPaddingXs: 'Row vertical padding',
  cssSgPaddingSm: 'Header vertical padding + operation button gap',
  cssSgPaddingMd: 'Inter-panel gap + horizontal padding',
  cssSgHeightMd: 'Operation (move) button min width',
  cssSgTransitionDuration: 'Row hover transition',
} as const

/** Writable string map — use for props / table builders (same keys as `transferDocEn`). */
export type TransferDocStrings = { -readonly [K in keyof typeof transferDocEn]: string }
