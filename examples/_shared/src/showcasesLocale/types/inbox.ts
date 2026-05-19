export interface InboxLocale {
  composeButton: string
  labelsHeading: string
  searchPlaceholder: string
  selectedSuffix: string
  countInFolder: (count: number, folder: string) => string
  noMessages: string
  unstar: string
  star: string
  archiveTooltip: string
  spamTooltip: string
  trashTooltip: string
  starred: string
  important: string
  archive: string
  spam: string
  delete: string
  reply: string
  unstarBtn: string
  starBtn: string
  composeTitle: string
  fieldTo: string
  fieldSubject: string
  fieldBody: string
  toPlaceholder: string
  discard: string
  saveDraft: string
  send: string
  emailSent: (to: string) => string
  movedToast: (count: number, to: string) => string
  messageTo: (recipients: string) => string
  messageCc: (recipients: string) => string
  folders: {
    inbox: string
    starred: string
    sent: string
    drafts: string
    archive: string
    spam: string
    trash: string
  }
  drawerActionMenu: {
    archive: string
    spam: string
    delete: string
  }
}
