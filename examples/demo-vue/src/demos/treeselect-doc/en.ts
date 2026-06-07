/**
 * English source of truth for TreeSelect doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/treeselect-doc/en.ts`. Since Stream 4
 * the Vue and React APIs are 1:1 — same `TreeNodeData` (`key` / `title`),
 * cascading `tree-checkable` and `tree-default-expand-all`.
 */
export const treeSelectDocEn = {
  pageTitle: 'TreeSelect',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbTreeSelect: 'TreeSelect',
  pageLead:
    'Dropdown selector backed by a tree. Pick one node, many nodes, or tick subtrees with `tree-checkable`.',
  pageWhen1: 'When options have a hierarchy (org charts, regions, taxonomies).',
  pageWhen2: 'When you want multi-select with checkbox controls (`tree-checkable`).',
  pageWhen3: 'Inside forms — wrap with `<SgField>` to capture validation.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Single-value picker.',
  demoMultipleTitle: 'Multiple',
  demoMultipleDesc: 'Pick multiple nodes — selections are joined into the trigger label.',
  demoCheckableTitle: 'Checkable',
  demoCheckableDesc: 'Checkboxes per node — ticking a parent cascades to its subtree.',
  demoSearchTitle: 'Search',
  demoSearchDesc: 'Filter nodes by typing.',
  demoDisabledNodesTitle: 'Disabled nodes',
  demoDisabledNodesDesc: 'Per-node `disabled` greys out specific rows.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Three sizes, same structure.',
  demoTokensOverrideTitle: 'Token override',
  demoTokensOverrideDesc:
    'Three scopes built from TreeSelect tokens: green brand, dark field (with tree dropdown) and glass pick.',
  demoFloatingLabelTitle: 'Floating label',
  demoFloatingLabelDesc:
    'Floating label over the TreeSelect control: glides up on focus or when a node is selected.',

  tableTreeSelectApi: 'TreeSelect API',
  tableTreeNodeData: 'TreeNodeData',
  tableCssVars: 'CSS Variables',

  propTreeData: 'Hierarchical nodes',
  propModelValue: 'Selected value(s) (`v-model`); array when `multiple`',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial selection (uncontrolled)',
  propMultiple: 'Enable multi-select',
  propTreeCheckable: 'Render checkboxes per node with subtree cascade',
  propShowSearch: 'Show filter input in the dropdown',
  propAllowClear: 'Show clear button when there is a value',
  propPlaceholder: 'Placeholder shown when empty',
  propTreeDefaultExpandAll: 'Expand every parent on first render',
  propTreeDefaultExpandedKeys: 'Initially expanded keys (overrides `treeDefaultExpandAll`)',
  propSize: 'Control size',
  propDisabled: 'Disable the whole selector',
  propUnstyled: 'Render without SkyGraph styles',
  emitUpdateModelValue: 'Fires with the new value (used by `v-model`)',
  emitChange: 'Mirror of `update:modelValue`',
  emitSearch: 'Fires with the current search text',

  nodeKey: 'Unique identifier used in `model-value`',
  nodeTitle: 'Display label (string)',
  nodeChildren: 'Nested child nodes',
  nodeDisabled: 'Block selection on this node',

  cssHint:
    "TreeSelect shares Input's control tokens; the dropdown reuses the same overlay + hover variables as Select.",

  cssSgColorPrimary: 'Focused/active node + selected pill fill',
  cssSgColorPrimaryBg: 'Focus ring around the control',
  cssSgColorPrimaryHover: 'Hover border of the control',
  cssSgInputBg: 'Control background (shared with Input)',
  cssSgInputBorder: 'Control border color',
  cssSgInputRadius: 'Control radius',
  cssSgInputHeight: 'Control min-height',
  cssSgColorBgElevated: 'Dropdown panel background',
  cssSgShadowLg: 'Dropdown panel shadow',
  cssSgColorBgHover: 'Row hover background in the dropdown',
  cssSgColorBorderSecondary: 'Tag border in multi-select mode',
  cssSgBorderRadiusSm: 'Selected-tag radius',
} as const

/** Writable string map — use for props / table builders (same keys as `treeSelectDocEn`). */
export type TreeSelectDocStrings = {
  -readonly [K in keyof typeof treeSelectDocEn]: string
}
