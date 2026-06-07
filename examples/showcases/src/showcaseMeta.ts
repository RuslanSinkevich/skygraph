import type { ShowcaseCategoryKey, ShowcasesLocale } from '@skygraph-examples/shared'

export type ShowcaseCategory = ShowcaseCategoryKey

export interface ShowcaseMeta {
  key: string
  icon: string
  category: ShowcaseCategory
  tags: string[]
}

export const SHOWCASE_METAS: ShowcaseMeta[] = [
  {
    key: 'table-kitchen-sink',
    icon: '🍳',
    category: 'data',
    tags: [
      'Table',
      'Sort',
      'Filter',
      'Group',
      'Tree',
      'Virtual',
      'DnD',
      'Export',
      'Print',
      'Aggregate',
    ],
  },
  {
    key: 'dashboard',
    icon: '📈',
    category: 'data',
    tags: [
      'Dashboard',
      'DashboardEditor',
      'Widgets',
      'LineChart',
      'BarChart',
      'AreaChart',
      'PieChart',
      'Drill-down',
      'Print',
    ],
  },
  {
    key: 'crm',
    icon: '👥',
    category: 'productivity',
    tags: ['Table', 'Kanban', 'Tree', 'ResourceCalendar', 'Drawer', 'Modal', 'Form', 'Timeline'],
  },
  {
    key: 'helpdesk',
    icon: '🎫',
    category: 'comms',
    tags: ['Table', 'Drawer', 'Form', 'Timeline', 'Tag', 'Segmented', 'Popconfirm'],
  },
  {
    key: 'chat',
    icon: '💬',
    category: 'comms',
    tags: ['List', 'Avatar', 'Mentions', 'Timeline', 'Drawer', 'Badge'],
  },
  {
    key: 'inbox',
    icon: '📬',
    category: 'comms',
    tags: ['Folders', 'Threading', 'Drawer', 'Modal', 'Form', 'Tag', 'Badge'],
  },
  {
    key: 'ecommerce',
    icon: '🛒',
    category: 'productivity',
    tags: ['Gallery', 'Carousel', 'Modal', 'Drawer', 'Steps', 'Form'],
  },
  {
    key: 'hr-portal',
    icon: '🏢',
    category: 'productivity',
    tags: ['Tree', 'Table', 'Calendar', 'Steps', 'Transfer', 'Collapse'],
  },
  {
    key: 'file-manager',
    icon: '📁',
    category: 'productivity',
    tags: ['Tree', 'VirtualList', 'Breadcrumb', 'Upload', 'Drawer', 'Modal'],
  },
  {
    key: 'admin',
    icon: '🔐',
    category: 'productivity',
    tags: ['Transfer', 'Table', 'Drawer', 'Collapse', 'Switch', 'Popconfirm', 'Tabs'],
  },
  {
    key: 'org-chart',
    icon: '🏛️',
    category: 'design',
    tags: ['Diagram', 'GraphEngine', 'TreeLayout', 'Pan', 'Zoom', 'Collapse'],
  },
  {
    key: 'forms',
    icon: '📝',
    category: 'design',
    tags: ['Form', 'Field', 'Wizard', 'TagInput', 'PinInput', 'InlineEdit', 'Validation'],
  },
]

export const SHOWCASE_CATEGORY_ITEMS: Array<{
  key: ShowcaseCategory | 'all'
  labelFrom: (s: ShowcasesLocale) => string
}> = [
  { key: 'all', labelFrom: (s) => s.categories.all },
  { key: 'data', labelFrom: (s) => s.categories.data },
  { key: 'comms', labelFrom: (s) => s.categories.comms },
  { key: 'productivity', labelFrom: (s) => s.categories.productivity },
  { key: 'design', labelFrom: (s) => s.categories.design },
]
