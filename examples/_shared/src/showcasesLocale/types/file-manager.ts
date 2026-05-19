export interface FileManagerLocale {
  emptyFolder: string
  rootName: string
  storage: string
  searchPlaceholder: string
  shortcutHint: string
  shortcutHintTitle: string
  views: {
    grid: string
    list: string
    recent: string
  }
  upload: string
  uploadDone: string
  recentSubtitle: (n: number) => string
  noContents: (name: string) => string
  table: {
    name: string
    size: string
    type: string
    modified: string
    preview: string
    open: string
    delete: string
    deleteConfirm: (name: string) => string
    deleted: (name: string) => string
  }
  preview: {
    notAvailable: (type: string) => string
    typeLabel: string
    sizeLabel: string
    modifiedLabel: string
    pathLabel: string
    download: string
    share: string
    rename: string
    deleteConfirm: (name: string) => string
    deleteToast: string
    readable: string
    large: string
    downloading: (name: string) => string
  }
  rename: {
    title: string
    cancel: string
    submit: string
    toast: (newName: string) => string
  }
  share: {
    title: (name: string) => string
    done: string
    description: string
    copy: string
    copied: string
    permissionLabel: string
    permView: string
    permComment: string
    permEdit: string
  }
}
