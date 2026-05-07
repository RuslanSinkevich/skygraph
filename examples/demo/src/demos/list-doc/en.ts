/**
 * English source of truth for List doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
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
    'When the item layout is meaningful (avatar + title + actions) and you want slots for it — see `List.Item.Meta`.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'dataSource + renderItem, with a bordered frame.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small, default, large.',
  demoWithMetaTitle: 'With Meta',
  demoWithMetaDesc: 'List.Item + List.Item.Meta for structured rows.',
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
  demoVirtualDesc: 'Windowed rendering for 10,000+ rows.',
  demoRowClassNameTitle: 'rowClassName',
  demoRowClassNameDesc: 'Highlight rows by predicate.',
  demoSlotsTitle: 'Slots (classNames / styles)',
  demoSlotsDesc: 'Target stable DOM slots.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Rebrand the hover / border / header via global tokens.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Drop sg-list-* styles, keep behaviour.',

  tableListApi: 'List API',
  tableListItem: 'List.Item',
  tableListItemMeta: 'List.Item.Meta',
  tableCssVars: 'CSS Variables',

  propDataSource: 'Items to render',
  propRenderItem: 'Renders a single item',
  propHeader: 'Content above the list body',
  propFooter: 'Content below the list body',
  propLoading: 'Wrap the items area in a Spin overlay',
  propLoadMore: 'Extra slot below the items for a "load more" action',
  propBordered: 'Outline the list and tint header / footer',
  propSplit: 'Render dividers between items',
  propHoverable: 'Highlight rows on hover',
  propSize:
    'Padding preset (this is List-specific; not tied to ConfigProvider.size)',
  propPagination: 'Pagination config — pass `false` to disable',
  propGrid: 'Grid layout config with responsive column counts',
  propVirtual: 'Fixed-height virtualization',
  propLocale: 'Localized strings (currently `emptyText`)',
  propSelectable: 'Enable click-to-select',
  propMultiSelect: 'Allow Ctrl/Cmd-click multi-selection',
  propSelectedKeys: 'Controlled / initial selected indices',
  propOnSelectionChange: 'Fires when selection changes',
  propDraggable: 'Enable drag-and-drop reorder with a handle',
  propOnReorder: 'Fires after a drop',
  propOnItemClick: 'Row click handler (fires even without selection)',
  propRowClassName: 'Static class or predicate for row styling',
  propClassNames:
    'Slot classes (root / header / footer / items / item / empty / pagination)',
  propStyles: 'Slot inline styles',
  propClassStyle: 'Root class / style',
  propUnstyled: 'Drop every sg-list-* style',

  itemChildren: 'Main cell content',
  itemActions: 'Inline actions rendered after the main content with hairline dividers',
  itemExtra: 'Secondary column aligned to the end of the row',
  itemClassStyle: 'Row class / style',

  metaAvatar: 'Leading visual (Avatar, icon, letter)',
  metaTitle: 'Primary line',
  metaDescription: 'Secondary line under the title',

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

/** Writable string map — use for props / table builders (same keys as `listDocEn`). */
export type ListDocStrings = { -readonly [K in keyof typeof listDocEn]: string }
