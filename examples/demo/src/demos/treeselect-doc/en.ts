/**
 * English source of truth for TreeSelect doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const treeSelectDocEn = {
  pageTitle: 'TreeSelect',
  pageLead:
    'Dropdown selector backed by a tree. Pick one leaf, many leaves, or cascade whole subtrees.',
  pageWhen1: 'When options have a hierarchy (org charts, regions, taxonomies).',
  pageWhen2: 'When you want multi-select with parent/child cascading (`treeCheckable`).',
  pageWhen3: 'Inside forms — wrap with <Field> to capture validation.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Single-value picker.',
  demoMultipleTitle: 'Multiple',
  demoMultipleDesc: 'Pick multiple leaves — selections render as tags.',
  demoCheckableTitle: 'Checkable',
  demoCheckableDesc: 'Checkboxes with subtree cascade.',
  demoSearchTitle: 'Search',
  demoSearchDesc: 'Filter nodes by typing.',
  demoDisabledNodesTitle: 'Disabled nodes',
  demoDisabledNodesDesc: 'Per-node `disabled` greys out specific rows.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Three sizes, same structure.',
  demoTokensOverrideTitle: 'Token override',
  demoTokensOverrideDesc:
    'Three scoped recipes — branded green, dark field, glass pick — reskin one TreeSelect.',
  demoFloatingLabelTitle: 'Floating label',
  demoFloatingLabelDesc:
    'Floating label over the trigger — it rises on focus or once a node is chosen.',

  tableTreeSelectApi: 'TreeSelect API',
  tableTreeNodeData: 'TreeNodeData',
  tableCssVars: 'CSS Variables',

  propTreeData: 'Hierarchical nodes',
  propValue: 'Selected key(s)',
  propDefaultValue: 'Initial selection (uncontrolled)',
  propOnChange: 'Selection change callback',
  propMultiple: 'Enable multi-select (tag-style)',
  propTreeCheckable: 'Render checkboxes, cascade-select subtrees',
  propShowSearch: 'Show filter input in the dropdown',
  propAllowClear: 'Show clear button when there is a value',
  propPlaceholder: 'Placeholder shown when empty',
  propTreeDefaultExpandAll: 'Expand every parent on mount',
  propSize: 'Control size',
  propDisabled: 'Disable the whole selector',
  propUnstyled: 'Render without SkyGraph styles',

  nodeKey: 'Unique identifier used in `value`',
  nodeTitle: 'Display label',
  nodeChildren: 'Nested child nodes',
  nodeDisabled: 'Block selection on this node',
  nodeSelectable: 'Per-node selection enable',
  nodeCheckable: 'Per-node checkbox enable',

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
export type TreeSelectDocStrings = { -readonly [K in keyof typeof treeSelectDocEn]: string }
