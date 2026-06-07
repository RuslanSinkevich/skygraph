import type { OrgChartLocale } from '../../types/org-chart'

export const orgChartLocaleEn: OrgChartLocale = {
  sidebar: {
    title: 'Organization',
    hint: 'Scroll to pan, Ctrl + scroll to zoom. Click a card to inspect, use the badge to collapse a branch.',
    legendTitle: 'Departments',
    statsTitle: 'Stats',
    peopleLabel: 'people',
    visibleLabel: 'visible',
    depthLabel: 'levels',
  },
  dept: {
    exec: 'Executive',
    eng: 'Engineering',
    product: 'Product',
    design: 'Design',
    sales: 'Sales',
    marketing: 'Marketing',
  },
  toolbar: {
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    hint: 'Org chart auto-layout · GraphEngine',
  },
  reportsBadge: (n) => `+${n}`,
  inspector: {
    title: 'Details',
    empty: 'Select a person on the chart',
    role: 'Role',
    department: 'Department',
    manager: 'Reports to',
    noManager: '— (top of org)',
    directReports: 'Direct reports',
    totalReports: 'Total reports',
    email: 'Email',
    focus: 'Toggle branch',
  },
  toasts: {
    expandedAll: 'Expanded the whole organization',
    collapsedAll: 'Collapsed to top level',
    expanded: (name) => `Expanded ${name}'s team`,
    collapsed: (name) => `Collapsed ${name}'s team`,
  },
}
