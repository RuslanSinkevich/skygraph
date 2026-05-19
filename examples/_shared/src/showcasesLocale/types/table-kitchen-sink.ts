export interface TableKitchenSinkLocale {
  appTitle: string
  appLead: string
  tableLocale: {
    searchPlaceholder: string
    filterConfirm: string
    filterReset: string
    sortAsc: string
    sortDesc: string
    cancelSort: string
    emptyText: string
    selectAll: string
    selectInvert: string
    selectionAll: string
    expand: string
    collapse: string
    triggerAsc: string
    triggerDesc: string
    cancelTrigger: string
    columns: string
    density: string
    densityDefault: string
    densityMiddle: string
    densitySmall: string
    fullscreen: string
    exitFullscreen: string
    reload: string
    export: string
    exportCSV: string
    exportJSON: string
    print: string
    pinLeft: string
    pinRight: string
    unpin: string
    sum: string
    avg: string
    count: string
    min: string
    max: string
    totalRows: (total: number) => string
    selectedRows: (count: number) => string
  }
  tabs: {
    basic: string
    sortFilter: string
    editing: string
    virtual: string
    pinned: string
    grouped: string
  }
  basic: {
    sectionBasic: string
    sectionEmpty: string
    basicLead: string
    emptyLead: string
    emptyDescription: string
    addEmployee: string
    addEmployeeToast: string
    columns: {
      employee: string
      department: string
      role: string
      salary: string
      rating: string
      status: string
      hireDate: string
    }
  }
  sortFilter: {
    lead: string
    expColumn: string
    summaryEmployees: (n: number) => string
    summaryAvg: (sum: string) => string
    summaryYears: (avg: string) => string
    summaryRating: (avg: string) => string
  }
  editing: {
    lead: string
    columns: {
      employee: string
      department: string
      role: string
      location: string
      salary: string
      rating: string
      status: string
    }
    tooltip: string
    selectionActions: {
      export: string
      delete: string
      exportToast: (n: number) => string
      deleteToast: (n: number) => string
    }
    contextMenu: {
      hide: (title: string) => string
      copy: string
      copiedToast: string
      view: string
    }
    toasts: {
      cellEdit: (col: string, id: string) => string
      rowMove: (from: number, to: number) => string
      colOrder: (order: string) => string
      colPin: (key: string, fixed: string) => string
      pinNone: string
      exported: (n: number) => string
    }
  }
  virtual: {
    leadPrefix: string
    leadSuffix: string
    columns: {
      employee: string
      department: string
      role: string
      salary: string
      rating: string
      status: string
    }
  }
  pinned: {
    lead: string
    columns: {
      employee: string
      department: string
      role: string
      salary: string
      rating: string
      status: string
    }
  }
  grouped: {
    modes: {
      group: string
      tree: string
      colgroups: string
      cellspan: string
    }
    groupByLabel: string
    groupOptions: {
      department: string
      role: string
      status: string
      location: string
    }
    columns: {
      employee: string
      department: string
      role: string
      salary: string
      rating: string
      projects: string
      status: string
      name: string
    }
    columnGroups: {
      personal: string
      compensation: string
      meta: string
      hireDate: string
      experience: string
      location: string
    }
    cellSpanLead: string
    groupExpandToast: (key: string, expanded: string) => string
    expanded: string
    collapsed: string
  }
  statusLabel: Record<string, string>
}
