/**
 * English source of truth for List doc page strings (Vue).
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Vue doesn't expose a compound `List.Item` / `List.Item.Meta` API —
 * the same row layout is composed inline via the default slot.
 */
export const listDocEn = {
  pageTitle: 'List',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbList: 'List',
  pageLead:
    'Collection renderer with header / footer, pagination, grid, virtualization, selection and drag-and-drop.',
  pageWhen1:
    "When you need to render a homogeneous collection that isn't big enough to warrant a Table.",
  pageWhen2:
    'When the item layout is meaningful (avatar + title + actions) and you want a default-slot recipe for it.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'dataSource + default slot, with a bordered frame.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small, default, large.',
  demoWithMetaTitle: 'With Meta',
  demoWithMetaDesc: 'Avatar + title + description + actions composed via the default slot.',
  demoGridTitle: 'Grid layout',
  demoGridDesc: 'Responsive grid of cards with breakpoint overrides.',
  demoPaginationTitle: 'Pagination',
  demoPaginationDesc: 'Built-in Pagination in the footer.',
  demoLoadingTitle: 'Loading',
  demoLoadingDesc: 'Spin overlay while refreshing.',
  demoEmptyTitle: 'Empty',
  demoEmptyDesc: 'Built-in Empty + localized emptyText.',
  demoSelectableTitle: 'Selectable',
  demoSelectableDesc: 'Click-to-select, plus Ctrl/Cmd for multi-pick.',
  demoDraggableTitle: 'Draggable',
  demoDraggableDesc: 'Drag rows with the ⠿ handle, own the reorder.',
  demoVirtualTitle: 'Virtual',
  demoVirtualDesc: 'Windowed rendering for 10 000+ rows.',
  demoRowClassNameTitle: 'rowClassName',
  demoRowClassNameDesc: 'Highlight rows by predicate.',
  demoSlotsTitle: 'Slots (classNames / styles)',
  demoSlotsDesc: 'Target stable DOM slots without descendant selectors.',
  demoTokensTitle: 'Token override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableListApi: 'List API',
  tableCssVars: 'CSS Variables',

  propDataSource: 'Items to render',
  propHeader: 'Plain-text header (use `#header` slot for VNode)',
  propFooter: 'Plain-text footer (use `#footer` slot for VNode)',
  propLoading: 'Wrap the items area in a Spin overlay',
  propBordered: 'Outline the list and tint header / footer',
  propSplit: 'Render dividers between items',
  propHoverable: 'Highlight rows on hover',
  propSize: 'Padding preset (List-specific; not tied to ConfigProvider.size)',
  propPagination: 'Pagination config — pass `false` to disable',
  propGrid: 'Grid layout config with responsive column counts',
  propVirtual: 'Fixed-height virtualization',
  propLocale: 'Localized strings (currently `emptyText`)',
  propSelectable: 'Enable click-to-select',
  propMultiSelect: 'Allow Ctrl/Cmd-click multi-selection',
  propSelectedKeys: 'Controlled selected indices',
  propDefaultSelectedKeys: 'Initial selected indices (uncontrolled)',
  propEmitSelectionChange: '`@selectionChange(keys, items)` — fires when selection changes',
  propDraggable: 'Enable HTML5 drag-and-drop with a handle',
  propEmitReorder: '`@reorder(from, to)` — fires after a drop',
  propEmitItemClick: '`@itemClick(item, index)` — row click handler',
  propEmitPageChange: '`@pageChange(page, size)` — pagination change',
  propRowClassName: 'Static class or `(item, index) => string` predicate',
  propClassNames: 'Slot classes (root / header / footer / items / item / empty / pagination)',
  propStyles: 'Slot inline styles',
  propUnstyled: 'Drop every sg-list-* style',

  cssHint:
    'List has no component-local tokens. It reads `--sg-color-bg-hover` (rows), `--sg-color-border*` (outlines / dividers) and `--sg-color-bg-secondary` (header / footer) — override any of them on a wrapper.',

  cssSgColorBg: 'Items background',
  cssSgColorBgSecondary: 'Header / footer background',
  cssSgColorBgHover: 'Row hover background',
  cssSgColorBorder: '`bordered` outline + action-divider lines',
  cssSgColorBorderSecondary: 'Row dividers when `split`',
  cssSgColorText: 'Body / title text',
  cssSgColorTextSecondary: 'Action + description colour',
  cssSgColorPrimary: 'Action hover colour',
  cssSgBorderRadius: '`bordered` outer radius + grid cell radius',
  cssSgFontSize: 'Base list font size',
  cssSgFontSizeSm: '`size="small"` + description font size',
  cssSgFontSizeLg: '`size="large"` title font size',
  cssSgLineHeight: 'Shared line-height',
  cssSgPaddingSm: '`size="small"` vertical padding + action gap',
  cssSgPaddingMd: 'Default vertical padding + meta gap',
  cssSgPaddingLg: 'Default horizontal padding',
  cssSgPaddingXl: 'Empty-state padding + `extra` left margin',
  cssSgMarginXs: 'Meta title → description spacing',
  cssSgTransitionDuration: 'Hover / action colour transition',
} as const

/** Writable string map — same keys as `listDocEn`. */
export type ListDocStrings = { -readonly [K in keyof typeof listDocEn]: string }
