export interface HelpdeskLocale {
  stats: {
    open: string
    openSub: string
    pending: string
    pendingSub: string
    urgent: string
    urgentSub: string
    resolved: string
    resolvedSub: string
  }
  searchPlaceholder: string
  filters: {
    all: string
    open: string
    pending: string
    urgent: string
    resolved: string
  }
  views: {
    table: string
    queue: string
  }
  newTicket: string
  noTickets: string
  noTicketsInColumn: string
  columns: {
    id: string
    subject: string
    customer: string
    assignee: string
    priority: string
    status: string
    updated: string
  }
  rowActions: {
    open: string
    resolve: string
    close: string
  }
  groupBy: {
    status: string
    priority: string
    assignee: string
    product: string
  }
  drawer: {
    resolveTitle: string
    resolveBtn: string
    customer: string
    assignee: string
    channel: string
    product: string
    created: string
    updated: string
    conversationHeading: (n: number) => string
    replyPlaceholder: string
    clear: string
    sendReply: string
  }
  newTicketModal: {
    title: string
    subject: string
    description: string
    priority: string
    product: string
    customer: string
    email: string
    cancel: string
    create: string
  }
  toasts: {
    statusUpdate: (id: string, status: string) => string
    replySent: string
    ticketCreated: (id: string) => string
  }
  statusLabel: Record<'new' | 'open' | 'pending' | 'resolved' | 'closed', string>
  priorityLabel: Record<'low' | 'medium' | 'high' | 'urgent', string>
  authorRoleLabel: Record<'agent' | 'customer' | 'system', string>
  youAgent: string
}
