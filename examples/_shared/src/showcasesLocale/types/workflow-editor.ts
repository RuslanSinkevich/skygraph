export interface WorkflowEditorLocale {
  paletteTitle: string
  paletteHint: string
  statsTitle: string
  nodesLabel: string
  edgesLabel: string
  routing: {
    straight: string
    orthogonal: string
  }
  selection: {
    single: string
    multi: string
    lasso: string
  }
  selectedTag: (n: number) => string
  deleteSelected: string
  deleteSelectedConfirm: (n: number) => string
  lockLayout: string
  unlockLayout: string
  addEdge: string
  addNode: string
  resetTemplate: string
  resetConfirm: string
  inspector: {
    title: string
    selectNode: string
    id: string
    kind: string
    position: string
    outgoing: string
    incoming: string
    label: string
    apply: string
    delete: string
    deleteConfirm: (name: string) => string
  }
  modals: {
    addTitle: string
    labelField: string
    labelPlaceholder: string
    kindField: string
    cancel: string
    add: string
    edgeTitle: string
    fromField: string
    fromPlaceholder: string
    toField: string
    toPlaceholder: string
    edgeLabel: string
    edgeLabelPlaceholder: string
    connect: string
  }
  contextMenu: {
    rename: string
    duplicate: string
    delete: string
    addNode: string
    addEdge: string
  }
  nodeActions: {
    rename: string
    duplicate: string
    delete: string
  }
  edgeActions: {
    remove: string
  }
  toasts: {
    renamed: (label: string) => string
    deletedNode: (id: string) => string
    addedNode: (label: string) => string
    pickEnds: string
    differentEnds: string
    connected: (from: string, to: string) => string
    reset: string
    duplicated: (label: string) => string
    removedEdge: (id: string) => string
    bulkRemoved: (n: number) => string
    deletedShort: (id: string) => string
  }
  kindLabel: Record<'start' | 'task' | 'decision' | 'end', string>
}
