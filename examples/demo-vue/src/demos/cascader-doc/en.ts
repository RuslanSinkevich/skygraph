/**
 * English source of truth for Cascader doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/cascader-doc/en.ts` 1:1 — `multiple`,
 * `maxTagCount`, `loadData`, and the `{ filter }` form of `showSearch`
 * are all supported in Vue as well.
 */
export const cascaderDocEn = {
  pageTitle: 'Cascader',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbCascader: 'Cascader',
  pageLead:
    'Column-based picker for ordered hierarchical data: region → city → district, taxonomy → subcategory → tag, etc.',
  pageWhen1: 'When the value is a path rather than a single node (province + city + district).',
  pageWhen2:
    'When options form a clear hierarchy and column-by-column drill-down is faster than a deep tree.',
  pageWhen3:
    'When users benefit from parent-level commits (`change-on-select`) or built-in path search.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled drill-down with both value and labels.',
  demoDefaultValueTitle: 'Default value',
  demoDefaultValueDesc: 'Uncontrolled cascader with a preset path.',
  demoHoverTriggerTitle: 'Hover trigger',
  demoHoverTriggerDesc: 'Open the next column on hover for fast drill-down.',
  demoChangeOnSelectTitle: 'Change on select',
  demoChangeOnSelectDesc: 'Commit on every level, not only on leaf.',
  demoSearchTitle: 'Search',
  demoSearchDesc:
    'Built-in search box. Pass `{ filter }` to override the default path matcher (also boolean for simple cases).',
  demoMultipleTitle: 'Multiple',
  demoMultipleDesc:
    '`multiple` keeps every committed path as a removable tag; `max-tag-count` collapses overflow.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small / middle / large — matches Input + Select tokens.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Disable the whole control or individual options.',
  demoCustomRenderTitle: 'Custom trigger',
  demoCustomRenderDesc:
    'Replace the default trigger label with a `(labels, options) => string` formatter.',
  demoAsyncLoadTitle: 'Async load',
  demoAsyncLoadDesc:
    'Mark a node `isLeaf: false`; on click the cascader calls `load-data(selectedOptions)` and renders a loading spinner until children are populated.',
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc: 'Scope global tokens on a wrapper to re-skin a single Cascader.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Semantics only — paint with your own CSS.',

  tableCascaderApi: 'Cascader API',
  tableOption: 'CascaderOption',
  tableCssVars: 'CSS Variables',

  propOptions: 'Top-level options; each may nest children',
  propModelValue: 'Selected path from root to current value (`v-model`)',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial path when uncontrolled',
  propPlaceholder: 'Trigger placeholder',
  propAllowClear: 'Show clear (×) button when a value is set',
  propDisabled: 'Disable the whole cascader',
  propSize: 'Matches Input/Select size tokens',
  propShowSearch: 'Enable the search box; `{ filter }` overrides the default matcher',
  propExpandTrigger: 'Open the next column on click or hover',
  propChangeOnSelect: 'Commit on every level, not only on leaf',
  propDisplayRender: 'Custom trigger label formatter `(labels, options) => string`',
  propMultiple: 'Allow several leaf paths as removable tags',
  propMaxTagCount: 'Max visible tags in `multiple` mode before "+N" summary',
  propLoadData: 'Async children loader `(selectedOptions) => void`',
  propUnstyled: 'Drop every SkyGraph class — keep only semantics',
  emitUpdateModelValue: 'Fires with the next value path (used by `v-model`)',
  emitChange: 'Fires with `(value, selectedOptions)` — full path + resolved option chain',

  optionValue: 'Stable value for this level',
  optionLabel: 'Display label (string)',
  optionChildren: 'Nested options',
  optionDisabled: 'Dim & block selection',
  optionIsLeaf: 'Set to `false` to advertise async children (works with `load-data`)',

  cssHint:
    'Cascader has no component-scoped tokens — it is fully driven by the global palette. Override the globals on a scoped wrapper to re-skin a single instance.',

  cssSgColorPrimary: 'Focus border, active row indicator',
  cssSgColorPrimaryHover: 'Hover border on trigger',
  cssSgColorPrimaryBg: 'Focus glow + active row background',
  cssSgColorBgContainer: 'Trigger + panel background',
  cssSgColorBgElevated: 'Dropdown surface background',
  cssSgColorBgHover: 'Row hover',
  cssSgColorText: 'Option + value text color',
  cssSgColorTextPlaceholder: 'Placeholder + empty panel text',
  cssSgColorTextTertiary: 'Separator arrow, clear icon base',
  cssSgColorTextDisabled: 'Disabled option text',
  cssSgColorBorder: 'Trigger border',
  cssSgColorBorderSecondary: 'Column divider',
  cssSgBorderRadius: 'Trigger + panel radius',
  cssSgBorderRadiusSm: 'Tag radius',
  cssSgShadowLg: 'Dropdown shadow',
  cssSgFontSize: 'Base font size',
  cssSgFontSizeSm: 'Small-size font',
  cssSgFontSizeLg: 'Large-size font',
  cssSgHeightSm: 'Small trigger min-height',
  cssSgHeightMd: 'Default trigger min-height',
  cssSgHeightLg: 'Large trigger min-height',
  cssSgPaddingXs: 'Row vertical padding + gap',
  cssSgPaddingSm: 'Option icon gap',
  cssSgPaddingMd: 'Row horizontal padding',
  cssSgPaddingLg: 'Empty panel padding',
  cssSgTransitionDuration: 'Hover / focus transition',
  cssSgTransitionTiming: 'Transition easing',
} as const

/** Writable string map — use for props / table builders (same keys as `cascaderDocEn`). */
export type CascaderDocStrings = {
  -readonly [K in keyof typeof cascaderDocEn]: string
}
