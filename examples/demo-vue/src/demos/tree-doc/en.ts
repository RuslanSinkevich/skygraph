/**
 * English source of truth for Tree doc page strings (Vue).
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Vue `SgTree` is narrower than React: no `showLine`, `actions`,
 * `nodeStatus`, `editable`, `showIcon`. Examples are scoped to the
 * current Vue API surface — see
 * `findings/T-Vue-Demo-Complex.md` → `tree-vue-narrower-than-react`.
 */
export const treeDocEn = {
  pageTitle: 'Tree',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbTree: 'Tree',
  pageLead:
    'Hierarchical viewer with checkable, draggable, searchable, virtual-scroll and directory modes — driven by a `treeData` array of `{ key, title, children }`.',
  pageWhen1: 'Folder structures, org charts, navigation trees, build/deploy status views.',
  pageWhen2: 'Multi-select pickers driven by hierarchical data (`checkable`).',
  pageWhen3: 'For huge datasets (1 000+ nodes) set `height` for windowed virtual scroll.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default expand/collapse + click-to-select.',
  demoCheckableTitle: 'Checkable',
  demoCheckableDesc: 'Checkboxes cascade to descendants.',
  demoCheckStrictlyTitle: 'Check strictly',
  demoCheckStrictlyDesc: 'Decouple parent/child checks for permission/role pickers.',
  demoDirectoryTitle: 'Directory',
  demoDirectoryDesc: 'Filesystem-explorer styling — folder click expands.',
  demoSearchTitle: 'Search',
  demoSearchDesc: 'Built-in filter with match highlighting.',
  demoToolbarTitle: 'Toolbar',
  demoToolbarDesc: 'Expand / collapse / check-all / uncheck-all bulk controls.',
  demoDraggableTitle: 'Drag & drop',
  demoDraggableDesc: 'Rearrange nodes via native HTML5 DnD; `@drop` reports `dropPosition`.',
  demoBlockNodeTitle: 'Block node',
  demoBlockNodeDesc: 'Whole row is the click target — bigger hit area.',
  demoMultipleTitle: 'Multi-select',
  demoMultipleDesc: '`multiple` lets `Ctrl+click` toggle several nodes.',
  demoLoadableTitle: 'Lazy load',
  demoLoadableDesc: '`loadData(node)` resolves children on demand.',
  demoVirtualTitle: 'Virtual scroll',
  demoVirtualDesc: '1 000 nodes, only visible rows rendered (`height` enables it).',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope `--sg-color-primary` or `data-sg-theme` to skin one Tree.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Keep semantics + keyboard nav, drop Skygraph styles.',

  tableTreeApi: 'Tree API',
  tableTreeNodeData: 'TreeNodeData',
  tableCssVars: 'CSS Variables',

  propTreeData: 'Hierarchical data',
  propFieldNames: 'Rename title / key / children accessors',
  propCheckable: 'Show checkboxes on nodes',
  propCheckStrictly: 'Parent and child checks are independent',
  propSelectable: 'Clicking a title selects the node',
  propMultiple: 'Allow multiple selected nodes',
  propDefaultExpandAll: 'Expand every parent on mount (uncontrolled)',
  propAutoExpandParent: 'Expand ancestors of focused / matched nodes',
  propBlockNode: 'Whole row is clickable for selection',
  propDirectory: 'Filesystem-explorer look (filled selection)',
  propDraggable: 'Enable HTML5 DnD per node or predicate',
  propLoadData: 'Lazy-load children on expand',
  propShowSearch: 'Render the built-in filter bar',
  propHighlightSearch: 'Highlight matched text in titles',
  propShowToolbar: 'Expand / collapse / check-all controls',
  propIndentSize: 'Horizontal indent per level (px)',
  propHeight: 'Enable windowed virtual scroll at this viewport height',
  propVirtual: 'Use virtual scroll when height is set',
  propKeyboard: 'Built-in keyboard navigation',
  propLocale: 'Override built-in strings',
  propUnstyled: 'Keep semantics, drop SkyGraph styles',
  propEmitCheck: '`@check` — emitted when checked-set changes',
  propEmitSelect: '`@select` — emitted when selection changes',
  propEmitDrop: '`@drop` — emitted on a successful HTML5 drop',

  nodeKey: 'Unique identifier',
  nodeTitle: 'Display label',
  nodeChildren: 'Nested child nodes',
  nodeDisabled: 'Grey out, block selection/check',
  nodeSelectable: 'Per-node selection enable',
  nodeCheckable: 'Per-node checkbox enable',
  nodeIsLeaf: 'Force leaf rendering (no switcher)',
  nodeIcon: 'Custom leading icon',

  cssHint:
    'Tree has no component-specific tokens — it is fully driven by global tokens. Override `--sg-color-primary`, `--sg-color-bg-hover`, `--sg-color-border` to re-skin.',

  cssSgColorPrimary: 'Selected title color, switcher hover, focus outline, drop indicator',
  cssSgColorPrimaryBg: 'Selected row background, drop-inside tint',
  cssSgColorBgHover: 'Row hover background, toolbar button hover',
  cssSgColorText: 'Default node title color',
  cssSgColorTextSecondary: 'Switcher + action button color',
  cssSgColorTextTertiary: 'Empty state + leaf switcher',
  cssSgColorTextDisabled: 'Disabled node title',
  cssSgColorBorder: 'Toolbar divider, search input border, virtual scrollbar',
  cssSgBorderRadiusSm: 'Node row + title radius',
  cssSgFontSize: 'Title font size',
} as const

/** Writable string map — same keys as `treeDocEn`. */
export type TreeDocStrings = { -readonly [K in keyof typeof treeDocEn]: string }
