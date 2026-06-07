export type OrgDept = 'exec' | 'eng' | 'product' | 'design' | 'sales' | 'marketing'

export interface OrgChartLocale {
  sidebar: {
    title: string
    hint: string
    legendTitle: string
    statsTitle: string
    peopleLabel: string
    visibleLabel: string
    depthLabel: string
  }
  dept: Record<OrgDept, string>
  toolbar: {
    expandAll: string
    collapseAll: string
    hint: string
  }
  /** Badge on a node with collapsed children, e.g. "+3". */
  reportsBadge: (n: number) => string
  inspector: {
    title: string
    empty: string
    role: string
    department: string
    manager: string
    noManager: string
    directReports: string
    totalReports: string
    email: string
    focus: string
  }
  toasts: {
    expandedAll: string
    collapsedAll: string
    expanded: (name: string) => string
    collapsed: (name: string) => string
  }
}
