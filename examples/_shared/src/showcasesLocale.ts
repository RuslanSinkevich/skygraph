/**
 * Hub strings for SkyGraph showcases (standalone app + embedded in React demo).
 * Tags stay English — they are technical keywords.
 *
 * The `apps` sub-tree carries the in-app strings for every showcase. Only
 * `en` and `ru` are required (T-Showcases-I18n scope; zh/de/fr/es belong to
 * the SgLocale namespace owned by T-Docs-Locales).
 */
export type ShowcaseCategoryKey = 'data' | 'comms' | 'productivity' | 'design'

// ---------------------------------------------------------------------------
// Common pieces reused across apps.
// ---------------------------------------------------------------------------

export interface CommonActionsLocale {
  view: string
  edit: string
  delete: string
  cancel: string
  save: string
  close: string
  reset: string
  refresh: string
  open: string
  send: string
  apply: string
  copy: string
  copied: string
  export: string
  exportCsv: string
  more: string
  details: string
  search: string
  add: string
  create: string
  remove: string
  back: string
  next: string
  done: string
}

// ---------------------------------------------------------------------------
// Per-app locales.
// ---------------------------------------------------------------------------

export interface ChatLocale {
  inbox: string
  searchConversations: string
  noMatches: string
  selectConversation: string
  noMessages: string
  channelMembers: (n: number) => string
  online: string
  offline: string
  pinTooltip: string
  muteNotifications: string
  leaveConversation: string
  mutedToast: string
  leftToast: string
  detailsButton: string
  membersHeading: (n: number) => string
  activityHeading: string
  pinnedSuffix: string
  composerPlaceholder: string
  sendButton: string
}

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

export interface DashboardLocale {
  title: string
  lead: string
  modes: {
    operations: string
    drilldown: string
    editor: string
  }
  printTable: string
  exportButton: string
  exportToast: string
  exportToastSub: string
  stats: {
    revenue: string
    revenueSub: (icon: string, pct: string) => string
    orders: string
    ordersSub: (perDay: string) => string
    signups: string
    signupsSub: string
    active: string
    activeSub: string
  }
  widgets: {
    revenueTitle: string
    revenueHint: (total: string) => string
    countriesTitle: string
    countriesHint: (count: number) => string
    ordersTitle: string
    ordersHint: (count: string) => string
    activeTitle: string
    activeHint: (now: string) => string
    healthTitle: string
    healthHint: (count: number) => string
    activityTitle: string
    activityHint: string
  }
  widgetActions: {
    refresh: string
    exportPng: string
    pinToTop: string
  }
  widgetToasts: {
    refreshed: (id: string) => string
    exportQueued: (id: string) => string
    pinned: (id: string) => string
    nodeContext: (id: string) => string
    canvasContext: string
    refreshShort: (id: string) => string
    settings: (id: string) => string
    removed: (id: string) => string
  }
  drilldown: {
    overview: string
    channels: string
    products: string
    overviewHint: (icon: string, pct: number) => string
    columns: {
      date: string
      revenue: string
      orders: string
      visitors: string
      conversion: string
      aov: string
      newCustomers: string
      returning: string
    }
    channelsTable: {
      summaryTitle: string
      totalVisitors: string
      totalRevenue: string
      topChannel: string
      topChannelValue: string
      bestConversion: string
      bestConversionValue: string
      channel: string
      visitors: string
      revenue: string
      conversion: string
      trend: string
      trendUp: string
      trendFlat: string
      trendDown: string
    }
    productsTable: {
      product: string
      unitsSold: string
      revenue: string
      rating: string
      returnRate: string
    }
    groupedReturning: string
    groupedOrders: string
  }
  drawers: {
    dayDetailsTitle: (date: string) => string
    date: string
    revenue: string
    orders: string
    visitors: string
    conversion: string
    aov: string
    newCustomers: string
    returning: string
    revenuePerformance: string
    conversionRate: string
    channel: string
    revenuePerVisitor: string
    trafficShare: string
    revenueShare: string
    product: string
    avgPrice: string
    rating: string
    returnRateLabel: string
    ratingHeading: string
    returnRateHealth: string
  }
  empty: {
    noServices: string
    noDataInPeriod: string
  }
  serviceMenu: {
    restart: string
    viewLogs: string
    silence: string
  }
  serviceToast: (action: string, name: string) => string
  healthLabel: Record<'healthy' | 'degraded' | 'down', string>
  activityType: Record<'alert' | 'deploy' | 'edit' | 'login', string>
  trendLabel: Record<'up' | 'flat' | 'down', string>
  detailsBtn: string
  drilldownLead: (icon: string, pct: number) => string
  channelTopValue: string
  channelBestConvValue: string
  exportToastTitle: string
}

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

export interface FormsLocale {
  tabs: {
    basic: string
    validation: string
    layouts: string
    dynamic: string
    schema: string
  }
  basic: {
    sections: {
      textInputs: string
      inputGroup: string
      selection: string
      toggleRange: string
      dateTime: string
      specialised: string
    }
    labels: {
      input: string
      passwordStrength: string
      searchInput: string
      inputNumber: string
      textarea: string
      protocolAddon: string
      unitAddon: string
      select: string
      autoComplete: string
      segmented: string
      radioGroup: string
      checkbox: string
      switch: string
      sliderValue: (v: number) => string
      rate: string
      datePicker: string
      rangePicker: string
      timePicker: string
      colorPicker: string
      tagInput: string
      pinInputDigits: string
      pinInputMasked: string
      inlineEdit: string
    }
    placeholders: {
      basic: string
      password: string
      multiLine: string
      example: string
      weight: string
      chooseOption: string
      autoEmail: string
      pickDate: string
      pickTime: string
      tagInput: string
    }
    options: {
      alpha: string
      beta: string
      gamma: string
      disabled: string
      a: string
      b: string
      c: string
      disabledRadio: string
      daily: string
      weekly: string
      monthly: string
    }
    enabled: string
    disabledLabel: string
    agreeTerms: string
    selectAll: string
    on: string
    off: string
    inlineDefault: string
    inlineNoButtons: string
    inlineDisabled: string
    toasts: {
      searching: (q: string) => string
      pinComplete: (v: string) => string
      saved: (v: string) => string
    }
  }
  validation: {
    sections: {
      rules: string
      authForms: string
    }
    rulesLead: string
    fields: {
      username: string
      usernameRequired: string
      usernameMin: string
      usernameMax: string
      usernamePattern: string
      usernamePlaceholder: string
      email: string
      emailRequired: string
      emailInvalid: string
      emailPlaceholder: string
      password: string
      passwordRequired: string
      passwordMin: string
      passwordPlaceholder: string
      age: string
      ageRange: string
      agePlaceholder: string
      website: string
      websiteUrl: string
      websiteHelp: string
      websitePlaceholder: string
      role: string
      rolePick: string
      rolePlaceholder: string
      bio: string
      bioMax: string
      bioWarn: string
      bioExtra: string
      bioPlaceholder: string
      agree: string
      agreeRequired: string
    }
    submit: string
    reset: string
    submittedToast: string
    roleOptions: {
      developer: string
      designer: string
      manager: string
      qa: string
    }
    auth: {
      modes: {
        login: string
        register: string
        forgot: string
      }
      brand: string
      loginEmail: string
      loginPassword: string
      loginEmailPlaceholder: string
      loginPasswordPlaceholder: string
      rememberMe: string
      forgotLink: string
      signIn: string
      loginToast: string
      registerToast: string
      firstName: string
      lastName: string
      firstNamePlaceholder: string
      lastNamePlaceholder: string
      regEmailPlaceholder: string
      regPasswordPlaceholder: string
      agreeTerms: string
      agreeRequired: string
      createAccount: string
      forgotLead: string
      sendReset: string
      backToLogin: string
      resetToast: string
    }
  }
  layouts: {
    layoutLabel: string
    sizeLabel: string
    requiredMarkLabel: string
    requiredOptions: {
      show: string
      optional: string
      hide: string
    }
    fields: {
      firstName: string
      lastName: string
      department: string
      active: string
    }
    placeholders: {
      first: string
      last: string
      select: string
    }
    deptOptions: {
      eng: string
      design: string
      marketing: string
    }
    save: string
    reset: string
    submittedToast: string
  }
  dynamic: {
    sections: {
      lists: string
      playground: string
    }
    teamLead: string
    teamName: string
    teamNamePlaceholder: string
    membersHeading: (n: number) => string
    addMember: string
    namePlaceholder: string
    emailPlaceholder: string
    nameRequired: string
    emailInvalid: string
    roles: {
      developer: string
      designer: string
      pm: string
      qa: string
    }
    saveTeam: string
    reset: string
    teamSavedToast: string
    playground: {
      otpHeading: string
      otpLead: string
      otpProgress: (entered: number, total: number) => string
      otpVerified: string
      otpSuccess: string
      tryAgain: string
      searchHeading: string
      searchLead: string
      searchPlaceholder: string
      searchButton: string
      searchEmpty: string
      passwordHeading: string
      passwordLead: string
      weakLabel: string
      weakPlaceholder: string
      mediumLabel: string
      mediumPlaceholder: string
      strongLabel: string
      strongPlaceholder: string
      tryYourOwnLabel: string
      tryYourOwnPlaceholder: string
    }
  }
  schema: {
    completedHeading: string
    completedLead: (name: string, plan: string) => string
    startOver: string
    intro: string
    steps: {
      personal: string
      professional: string
      preferences: string
      review: string
    }
    fields: {
      fullName: string
      fullNamePh: string
      email: string
      emailPh: string
      phone: string
      phonePh: string
      company: string
      companyPh: string
      position: string
      positionPh: string
      skills: string
      skillsPh: string
      experience: string
      experienceLevels: {
        junior: string
        middle: string
        senior: string
        lead: string
      }
      plan: string
      planOptions: {
        free: string
        pro: string
        enterprise: string
      }
      notifications: string
      notificationsHelp: string
      newsletter: string
      newsletterLabel: string
    }
    review: {
      personal: string
      name: string
      email: string
      phone: string
      professional: string
      company: string
      position: string
      skills: string
      experience: string
      preferences: string
      plan: string
      notifications: string
      newsletter: string
      enabled: string
      disabled: string
      subscribed: string
      no: string
    }
    back: string
    next: string
    completeBtn: string
    completedToast: string
  }
}

export interface HrPortalLocale {
  stats: {
    total: string
    activeRemote: string
    onLeave: string
    avgSalary: string
  }
  tabs: {
    directory: string
    org: string
    leave: string
    reviews: string
    team: string
    onboarding: string
  }
  directory: {
    searchPlaceholder: string
    table: {
      employee: string
      department: string
      role: string
      status: string
      startDate: string
      salary: string
    }
    views: {
      table: string
      cards: string
    }
  }
  org: {
    departmentSizes: string
  }
  leave: {
    views: {
      calendar: string
      table: string
    }
    noOverlaps: string
    overlapsCount: (n: number) => string
    table: {
      employee: string
      type: string
      from: string
      to: string
      status: string
      approve: string
      reject: string
      groupByType: string
      groupByStatus: string
      typeFilters: {
        vacation: string
        sick: string
        personal: string
        remote: string
      }
      statusFilters: {
        approved: string
        pending: string
        rejected: string
      }
    }
    toasts: {
      approved: (name: string) => string
      rejected: (name: string) => string
    }
  }
  reviews: {
    filters: {
      all: string
      pending: string
      draft: string
      completed: string
    }
    avgOverall: (avg: string) => string
    overall: string
    tech: string
    collab: string
    leadAbbr: string
    delivery: string
    reviewer: string
    drawer: {
      period: string
      reviewer: string
      overall: string
      score: string
      breakdown: string
      technical: string
      collaboration: string
      leadership: string
      delivery: string
      goals: string
      highlights: string
      improvements: string
      exportPdf: string
      complete: string
    }
  }
  team: {
    heading: string
    assignedTag: (n: number) => string
    available: string
    assigned: string
  }
  onboarding: {
    steps: {
      personal: string
      equipment: string
      training: string
    }
    panels: {
      personal: string
      equipment: string
      training: string
    }
    fields: {
      fullName: string
      fullNamePh: string
      email: string
      emailPh: string
      department: string
      deptPh: string
      role: string
      rolePh: string
      startDate: string
      datePh: string
      salary: string
      salaryPh: string
    }
    continueEquipment: string
    continueTraining: string
    completeBtn: string
    equipmentList: {
      laptop: string
      email: string
      vpn: string
      slack: string
      github: string
    }
    equipmentLead: string
    trainingPlan: {
      week1: string
      week2: string
      week3: string
      week4: string
    }
    toasts: {
      personalSaved: string
      complete: string
    }
  }
  statusLabel: Record<'active' | 'on-leave' | 'remote' | 'terminated', string>
  reviewStatusLabel: Record<'pending' | 'draft' | 'completed', string>
  leaveTypeLabel: Record<'vacation' | 'sick' | 'personal' | 'remote', string>
  leaveStatusLabel: Record<'approved' | 'pending' | 'rejected', string>
}

export interface AdminLocale {
  stats: {
    total: string
    totalSub: (active: number) => string
    admins: string
    adminsSub: (n: number) => string
    twoFa: string
    critical: string
    criticalSub: string
  }
  tabs: {
    users: string
    sessions: string
    apiKeys: string
    audit: string
    roles: string
    settings: string
  }
  users: {
    searchPlaceholder: string
    selectedTag: (n: number) => string
    bulkSuspendConfirm: (n: number) => string
    bulkSuspend: string
    bulkSuspendToast: (n: number) => string
    viewBtn: string
    createBtn: string
    columns: {
      user: string
      role: string
      status: string
      department: string
      twoFa: string
      lastLogin: string
      logins: string
    }
    rowMenu: {
      edit: string
      reset: string
      suspend: string
      activate: string
      delete: string
    }
    drawer: {
      email: string
      department: string
      lastLogin: string
      created: string
      loginCount: string
      twoFaEnabled: string
      yes: string
      no: string
      permissionsHeading: (n: number) => string
      activityHeading: string
      edit: string
      resetPassword: string
      suspend: string
      suspendConfirm: string
      suspendedToast: (name: string) => string
      resetSentToast: string
    }
    createTitle: string
    createToast: string
    editTitle: (name: string) => string
    editToast: string
    submitCreate: string
    submitSave: string
    groupBy: {
      role: string
      department: string
      status: string
    }
  }
  audit: {
    severityAll: string
    severityInfo: string
    severityWarning: string
    severityCritical: string
    columns: {
      time: string
      user: string
      action: string
      target: string
      ip: string
    }
    expanded: {
      details: string
      severity: string
      ip: string
      timestamp: string
    }
    exportToast: string
    exportBtn: string
  }
  roles: {
    newRole: string
    newRoleToast: string
    permissionsLabel: (n: number) => string
    usersLabel: (n: number) => string
    editPermissions: string
    editPermissionsTitle: (name: string) => string
    cancel: string
    save: string
    available: string
    granted: string
    saveToast: (name: string, n: number) => string
  }
  settings: {
    /** No translatable strings inside; section labels come from data. */
    placeholder: string
    updateToast: (key: string) => string
  }
  apiKeys: {
    searchPlaceholder: string
    createBtn: string
    columns: {
      name: string
      token: string
      owner: string
      scopes: string
      rate: (perMinute: string) => string
      rateTitle: string
      lastUsed: string
      expires: string
      status: string
    }
    rotate: string
    rotateToast: (name: string) => string
    revoke: string
    revokeConfirm: string
    revokedToast: (name: string) => string
    createTitle: string
    keyName: string
    keyNamePh: string
    scopesLabel: string
    scopesPh: string
    rateLabel: string
    ratePh: string
    cancel: string
    generate: string
    createdTitle: string
    createdWarning: string
    copy: string
    copiedToast: string
    confirmedBtn: string
  }
  sessions: {
    searchPlaceholder: string
    terminateAllBtn: string
    terminateAllConfirm: string
    terminateAllToast: string
    columns: {
      user: string
      device: string
      location: string
      ip: string
      started: string
      lastActive: string
      current: string
    }
    currentTag: string
    youBtn: string
    terminate: string
    terminateConfirm: (user: string) => string
    terminatedToast: (id: string) => string
  }
  userForm: {
    fullName: string
    fullNamePh: string
    email: string
    emailPh: string
    department: string
    deptPh: string
    role: string
    rolePh: string
    status: string
    statusOptions: {
      active: string
      suspended: string
      pending: string
      deactivated: string
    }
    twoFa: string
    cancel: string
  }
  roleLabel: Record<string, string>
  statusLabel: Record<string, string>
  apiKeyStatusLabel: Record<'active' | 'revoked' | 'expired', string>
}

export interface CrmLocale {
  stats: {
    contacts: string
    contactsSub: (n: number) => string
    pipeline: string
    pipelineSub: (n: number) => string
    won: string
    wonSub: (n: number) => string
    avgDeal: string
    avgDealSub: (rate: number) => string
    lifetime: string
    lifetimeSub: string
  }
  tabs: {
    leads: string
    contacts: string
    deals: string
    pipeline: string
    hierarchy: string
    deadlines: string
    activity: string
  }
  leads: {
    searchPlaceholder: string
    cards: {
      total: string
      newLeads: string
      qualified: string
      conversion: string
    }
    filterAll: (n: number) => string
    filterLeads: string
    filterProspects: string
    viewBtn: string
    addLead: string
    columns: {
      lead: string
      company: string
      stage: string
      potential: string
      lastContact: string
    }
    rowActions: {
      edit: string
      convert: string
      sendEmail: string
    }
    editTitle: (name: string) => string
    addLeadTitle: string
    convertTitle: (name: string) => string
    convertText: string
    convertOk: string
    savedToast: string
    convertedToast: (name: string) => string
  }
  contacts: {
    searchPlaceholder: string
    selectedTag: (n: number) => string
    bulkEmailConfirm: (n: number) => string
    bulkEmail: string
    bulkEmailToast: (n: number) => string
    bulkDeleteConfirm: (n: number) => string
    bulkDelete: string
    bulkDeleteToast: (n: number) => string
    addContact: string
    addContactTitle: string
    columns: {
      contact: string
      company: string
      phone: string
      status: string
      revenue: string
      lastContact: string
    }
    rowActions: {
      edit: string
      sendEmail: string
      createDeal: string
      delete: string
    }
    editTitle: (name: string) => string
    updatedToast: string
    createdToast: string
    submitSave: string
    submitCreate: string
    summaryContacts: (n: number) => string
    groupByCompany: string
    groupByStatus: string
  }
  deals: {
    searchPlaceholder: string
    filterAll: (n: number) => string
    open: (sum: string) => string
    weighted: (sum: string) => string
    won: (sum: string) => string
    columns: {
      deal: string
      value: string
      stage: string
      probability: string
      created: string
    }
    rowActions: {
      details: string
      markWon: string
      markLost: string
      reassign: string
    }
    summary: (n: number, avg: number) => string
    drawer: {
      value: string
      probability: string
      weighted: string
      created: string
      contact: string
      company: string
    }
    toasts: {
      won: string
      lost: string
    }
  }
  pipeline: {
    intro: string
    movedToast: (stage: string) => string
    drawer: {
      close: string
      markWon: string
      markLost: string
      wonToast: string
      lostToast: string
      value: string
      probability: string
      created: string
      contact: string
      company: string
      email: string
      winProbability: string
    }
  }
  hierarchy: {
    breadcrumbRoot: string
    breadcrumbAll: string
    allAccounts: (contacts: number, companies: number) => string
    kpi: {
      lifetime: string
      pipeline: string
      pipelineSub: (n: number) => string
      customers: string
    }
    dealsHeading: (n: number) => string
    noDeals: string
  }
  deadlines: {
    intro: string
    conflictsLabel: string
    conflictsNone: string
    noActivities: string
  }
  activity: {
    typeFilterAll: string
    typeFilters: {
      call: string
      email: string
      meeting: string
      note: string
    }
    countLabel: (n: number) => string
  }
  contactDrawer: {
    edit: string
    email: string
    phone: string
    company: string
    revenue: string
    lastContact: string
    openDeals: (n: number) => string
    activity: string
  }
  contactForm: {
    fullName: string
    fullNamePh: string
    email: string
    emailPh: string
    company: string
    companyPh: string
    phone: string
    phonePh: string
    status: string
    statusPh: string
    revenue: string
    revenuePh: string
    cancel: string
    submitDefault: string
    statusOptions: {
      lead: string
      prospect: string
      customer: string
      churned: string
    }
  }
  stageLabel: Record<string, string>
  statusLabel: Record<string, string>
  activityTypeLabel: Record<'call' | 'email' | 'meeting' | 'note', string>
}

export interface EcommerceLocale {
  stats: {
    revenue: string
    revenueSub: (orders: number) => string
    pending: string
    pendingSub: string
    activeProducts: string
    activeProductsSub: (total: number) => string
    lowStock: string
    lowStockSub: string
    vip: string
    vipSub: (total: number) => string
  }
  tabs: {
    products: string
    orders: string
    customers: string
    inventory: string
    analytics: string
  }
  products: {
    searchPlaceholder: string
    categoryAll: string
    categoryOptions: {
      electronics: string
      clothing: string
      homeGarden: string
    }
    statusAll: string
    statusOptions: {
      active: string
      draft: string
      archived: string
    }
    sortOptions: {
      featured: string
      sold: string
      priceAsc: string
      priceDesc: string
      rating: string
    }
    views: {
      grid: string
      list: string
    }
    addBtn: string
    showing: (visible: number, total: number) => string
    featured: string
    sale: string
    inStock: (n: number) => string
    lowStockBadge: (n: number) => string
    soldSuffix: string
    marginSuffix: string
    drawer: {
      sku: string
      brand: string
      category: string
      price: string
      cost: string
      margin: string
      stockReserved: string
      available: string
      status: string
      rating: string
      sold: string
      revenue: string
      tagsHeading: string
      stockHealth: string
      descriptionHeading: string
    }
    createTitle: string
    fields: {
      name: string
      namePh: string
      category: string
      categoryPh: string
      brand: string
      brandPh: string
      price: string
      pricePh: string
      stock: string
      stockPh: string
      featured: string
    }
    cancel: string
    create: string
    createdToast: string
  }
  orders: {
    searchPlaceholder: string
    exportBtn: string
    exportToast: string
    columns: {
      order: string
      customer: string
      total: string
      status: string
      date: string
      items: string
    }
    actions: {
      details: string
      refund: string
    }
    summaryPageTotal: string
    detailTitle: (id: string) => string
    close: string
    markPaid: string
    markPaidToast: (id: string) => string
    steps: {
      pending: string
      paid: string
      shipped: string
      delivered: string
      cancelled: string
    }
    descriptions: {
      customer: string
      email: string
      address: string
      date: string
      total: string
      items: string
    }
    itemsHeading: string
    itemsTable: {
      product: string
      qty: string
      price: string
      subtotal: string
    }
    refundTitle: (id: string) => string
    refundFields: {
      order: string
      customer: string
      orderTotal: string
      amount: string
      reason: string
      reasonPh: string
      reasonOptions: {
        defective: string
        wrongItem: string
        request: string
        damage: string
        other: string
      }
    }
    cancel: string
    issueRefund: string
    refundToast: (amount: string, id: string) => string
    statusLabel: Record<string, string>
  }
  customers: {
    searchPlaceholder: string
    exportBtn: string
    exportToast: string
    viewBtn: string
    vipBadge: string
    columns: {
      customer: string
      status: string
      orders: string
      totalSpent: string
      aov: string
      lastOrder: string
      registered: string
    }
    drawer: {
      email: string
      registered: string
      totalOrders: string
      totalSpent: string
      aov: string
      lastOrder: string
      orderHistoryHeading: string
    }
    statusLabel: Record<string, string>
  }
  inventory: {
    cards: {
      out: string
      low: string
      healthy: string
      total: string
    }
    searchPlaceholder: string
    bucketAll: (n: number) => string
    bucketOut: (n: number) => string
    bucketLow: (n: number) => string
    bucketHealthy: (n: number) => string
    exportBtn: string
    exportToast: string
    columns: {
      product: string
      brand: string
      category: string
      onHand: string
      reserved: string
      available: string
      health: string
      status: string
    }
    restockBtn: string
    restockTitle: (name: string) => string
    quantity: string
    supplier: string
    supplierOptions: {
      primary: string
      backup: string
      local: string
    }
    cancel: string
    orderRestock: string
    restockedToast: (qty: number, name: string) => string
    statusLabel: Record<string, string>
  }
  analytics: {
    periods: {
      d7: string
      d30: string
      d90: string
      all: string
    }
    stats: {
      revenue: string
      ordersSub: (n: number) => string
      aov: string
      itemsSub: (n: string) => string
      inventoryValue: string
      inventorySub: (n: number) => string
      vipShare: string
      vipSub: string
    }
    cards: {
      revenueTrend: string
      noData: string
      ordersByStatus: string
      revenueByCategory: string
      topProducts: string
    }
    soldSuffix: string
    marginSuffix: string
  }
}

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

// ---------------------------------------------------------------------------
// Aggregate ShowcasesLocale.
// ---------------------------------------------------------------------------

export interface ShowcasesLocale {
  hubTitle: string
  hubLead: string
  searchPlaceholder: string
  noMatches: string
  back: string
  languageSwitcher: string
  categories: {
    all: string
    data: string
    comms: string
    productivity: string
    design: string
  }
  cards: Record<
    string,
    {
      title: string
      description: string
    }
  >
  apps: {
    chat: ChatLocale
    inbox: InboxLocale
    helpdesk: HelpdeskLocale
    dashboard: DashboardLocale
    fileManager: FileManagerLocale
    workflowEditor: WorkflowEditorLocale
    forms: FormsLocale
    hrPortal: HrPortalLocale
    admin: AdminLocale
    crm: CrmLocale
    ecommerce: EcommerceLocale
    tableKitchenSink: TableKitchenSinkLocale
  }
}

// ---------------------------------------------------------------------------
// English dictionary.
// ---------------------------------------------------------------------------

export const showcasesLocaleEn: ShowcasesLocale = {
  languageSwitcher: 'Language',
  hubTitle: 'SkyGraph Showcases',
  hubLead:
    'Real-world mini-apps built with @skygraph/react — fake data, real components. Browse by category or search.',
  searchPlaceholder: 'Search demos by name, description or tag…',
  noMatches: 'No demos match your filters.',
  back: '← Back to hub',
  categories: {
    all: 'All',
    data: 'Data & Tables',
    comms: 'Communication',
    productivity: 'Productivity & Admin',
    design: 'Design & Forms',
  },
  cards: {
    'table-kitchen-sink': {
      title: 'Table — Kitchen Sink',
      description:
        'Every table feature in one demo: sorting, filtering, grouping, tree data, virtual scroll, drag & drop, inline editing, export, print, keyboard navigation, aggregation, pinned rows, and more.',
    },
    dashboard: {
      title: 'Operations Dashboard',
      description:
        'Live KPI dashboard with widget grid + drill-down tables and a layout editor mode. Hover toolbars on charts, widget actions, right-click context.',
    },
    crm: {
      title: 'CRM Dashboard',
      description:
        'Contacts/deals tables, drag-and-drop pipeline, account hierarchy tree and a ResourceCalendar of deal deadlines with conflict overlay.',
    },
    helpdesk: {
      title: 'Help Desk Tickets',
      description:
        'Ticketing queue with status segmentation, queue view, conversation timeline, customer replies and ticket creation.',
    },
    chat: {
      title: 'Team Messenger',
      description:
        'Channel + DM list, message bubbles with reactions and attachments, @-mentions composer and member drawer.',
    },
    inbox: {
      title: 'Email Inbox',
      description:
        'Threaded email client with folders, labels, bulk actions, full-thread reading drawer and compose modal.',
    },
    ecommerce: {
      title: 'E-Commerce Admin',
      description:
        'Product gallery with grid/list views, image carousel, order management, customers, refunds.',
    },
    'hr-portal': {
      title: 'HR Portal',
      description:
        'Employee directory, org tree, leave calendar, onboarding flow, performance reviews and team assignment.',
    },
    'file-manager': {
      title: 'File Manager',
      description:
        'Tree-driven file browser with grid/list views, breadcrumb, upload, preview drawer, share and rename modals.',
    },
    admin: {
      title: 'Permissions & Roles',
      description:
        'Users, audit log, role transfer, API keys, sessions and system settings across one admin panel.',
    },
    'workflow-editor': {
      title: 'Workflow Editor',
      description:
        'Visio-like flowchart built on GraphEngine — drag nodes, switch routing, add nodes/edges, inspect topology.',
    },
    forms: {
      title: 'Forms Playground',
      description:
        'All form controls in one place: validation, wizard, dynamic field arrays, real-world layouts.',
    },
  },
  apps: {
    chat: {
      inbox: 'Inbox',
      searchConversations: 'Search conversations...',
      noMatches: 'No matches',
      selectConversation: 'Select a conversation',
      noMessages: 'No messages yet',
      channelMembers: (n) => `${n} members`,
      online: 'Online',
      offline: 'Offline',
      pinTooltip: 'Pin conversation',
      muteNotifications: 'Mute notifications',
      leaveConversation: 'Leave conversation',
      mutedToast: 'Muted',
      leftToast: 'Left conversation',
      detailsButton: 'Details',
      membersHeading: (n) => `Members (${n})`,
      activityHeading: 'Activity',
      pinnedSuffix: 'pinned',
      composerPlaceholder: 'Write a message — type @ to mention…',
      sendButton: 'Send',
    },
    inbox: {
      composeButton: 'Compose',
      labelsHeading: 'LABELS',
      searchPlaceholder: 'Search mail…',
      selectedSuffix: 'selected',
      countInFolder: (count, folder) => `${count} ${folder}`,
      noMessages: 'No messages',
      unstar: 'Unstar',
      star: 'Star',
      archiveTooltip: 'Archive',
      spamTooltip: 'Spam',
      trashTooltip: 'Trash',
      starred: 'starred',
      important: 'important',
      archive: 'Archive',
      spam: 'Mark as spam',
      delete: 'Delete',
      reply: 'Reply',
      unstarBtn: 'Unstar',
      starBtn: 'Star',
      composeTitle: 'Compose new email',
      fieldTo: 'To',
      fieldSubject: 'Subject',
      fieldBody: 'Message',
      toPlaceholder: 'recipient@example.com',
      discard: 'Discard',
      saveDraft: 'Save draft',
      send: 'Send',
      emailSent: (to) => `Email sent to ${to}`,
      movedToast: (count, to) => `Moved ${count} to ${to}`,
      messageTo: (recipients) => `to ${recipients}`,
      messageCc: (recipients) => `cc ${recipients}`,
      folders: {
        inbox: 'Inbox',
        starred: 'Starred',
        sent: 'Sent',
        drafts: 'Drafts',
        archive: 'Archive',
        spam: 'Spam',
        trash: 'Trash',
      },
      drawerActionMenu: {
        archive: 'Archive',
        spam: 'Mark as spam',
        delete: 'Delete',
      },
    },
    helpdesk: {
      stats: {
        open: 'Open',
        openSub: 'awaiting agent',
        pending: 'Pending',
        pendingSub: 'waiting on customer',
        urgent: 'Urgent',
        urgentSub: 'P1 / P2',
        resolved: 'Resolved',
        resolvedSub: 'this period',
      },
      searchPlaceholder: 'Search by subject, customer, assignee…',
      filters: {
        all: 'All',
        open: 'Open',
        pending: 'Pending',
        urgent: 'Urgent',
        resolved: 'Resolved',
      },
      views: {
        table: 'Table',
        queue: 'Queue',
      },
      newTicket: '+ New ticket',
      noTickets: 'No tickets',
      noTicketsInColumn: 'No tickets',
      columns: {
        id: 'ID',
        subject: 'Subject',
        customer: 'Customer',
        assignee: 'Assignee',
        priority: 'Priority',
        status: 'Status',
        updated: 'Updated',
      },
      rowActions: {
        open: 'Open',
        resolve: 'Mark resolved',
        close: 'Close',
      },
      groupBy: {
        status: 'Status',
        priority: 'Priority',
        assignee: 'Assignee',
        product: 'Product',
      },
      drawer: {
        resolveTitle: 'Mark as resolved?',
        resolveBtn: 'Resolve',
        customer: 'Customer',
        assignee: 'Assignee',
        channel: 'Channel',
        product: 'Product',
        created: 'Created',
        updated: 'Updated',
        conversationHeading: (n) => `Conversation (${n})`,
        replyPlaceholder: 'Reply to customer…',
        clear: 'Clear',
        sendReply: 'Send reply',
      },
      newTicketModal: {
        title: 'New support ticket',
        subject: 'Subject',
        description: 'Description',
        priority: 'Priority',
        product: 'Product',
        customer: 'Customer',
        email: 'Email',
        cancel: 'Cancel',
        create: 'Create',
      },
      toasts: {
        statusUpdate: (id, status) => `${id} → ${status}`,
        replySent: 'Reply sent',
        ticketCreated: (id) => `Ticket ${id} created`,
      },
      statusLabel: {
        new: 'new',
        open: 'open',
        pending: 'pending',
        resolved: 'resolved',
        closed: 'closed',
      },
      priorityLabel: {
        low: 'low',
        medium: 'medium',
        high: 'high',
        urgent: 'urgent',
      },
      authorRoleLabel: {
        agent: 'agent',
        customer: 'customer',
        system: 'system',
      },
      youAgent: 'You (agent)',
    },
    dashboard: {
      title: 'Operations dashboard',
      lead: 'Live metrics across web, API, and infrastructure. Drill into KPIs for breakdowns or open the layout editor.',
      modes: {
        operations: 'Operations',
        drilldown: 'Drill-down',
        editor: 'Layout editor',
      },
      printTable: 'Print table',
      exportButton: 'Export',
      exportToast: 'Report exported',
      exportToastSub: 'CSV is in your downloads folder.',
      stats: {
        revenue: 'Revenue',
        revenueSub: (icon, pct) => `${icon} ${pct} vs prev`,
        orders: 'Orders',
        ordersSub: (perDay) => `${perDay} per day`,
        signups: 'Signups',
        signupsSub: 'unique users',
        active: 'Active now',
        activeSub: 'last 5 min',
      },
      widgets: {
        revenueTitle: 'Revenue trend',
        revenueHint: (total) => `${total} total`,
        countriesTitle: 'Top countries',
        countriesHint: (count) => `${count} regions`,
        ordersTitle: 'Orders & signups',
        ordersHint: (count) => `${count} orders`,
        activeTitle: 'Active users',
        activeHint: (now) => `${now} now`,
        healthTitle: 'Service health',
        healthHint: (count) => `${count} services`,
        activityTitle: 'Recent activity',
        activityHint: 'last hour',
      },
      widgetActions: {
        refresh: 'Refresh',
        exportPng: 'Export PNG',
        pinToTop: 'Pin to top',
      },
      widgetToasts: {
        refreshed: (id) => `Refreshed ${id}`,
        exportQueued: (id) => `Export queued for "${id}"`,
        pinned: (id) => `Pinned ${id}`,
        nodeContext: (id) => `Right-click on widget "${id}" — context menu would open here`,
        canvasContext: 'Right-click on background — would offer "Add widget…"',
        refreshShort: (id) => `Refresh "${id}"`,
        settings: (id) => `Settings for "${id}"`,
        removed: (id) => `Removed "${id}"`,
      },
      drilldown: {
        overview: 'Overview (daily)',
        channels: 'Channels',
        products: 'Top products',
        overviewHint: (icon, pct) =>
          `Trend: ${icon} ${pct}% revenue change vs previous half-period. Right-click headers / cells for context menus. Try Group-by toolbar.`,
        columns: {
          date: 'Date',
          revenue: 'Revenue',
          orders: 'Orders',
          visitors: 'Visitors',
          conversion: 'Conversion',
          aov: 'AOV',
          newCustomers: 'New',
          returning: 'Returning',
        },
        channelsTable: {
          summaryTitle: 'Channel summary',
          totalVisitors: 'Total Visitors',
          totalRevenue: 'Total Revenue',
          topChannel: 'Top Channel',
          topChannelValue: 'Organic Search',
          bestConversion: 'Best Conversion',
          bestConversionValue: 'Email (5.2%)',
          channel: 'Channel',
          visitors: 'Visitors',
          revenue: 'Revenue',
          conversion: 'Conversion',
          trend: 'Trend',
          trendUp: 'Up',
          trendFlat: 'Flat',
          trendDown: 'Down',
        },
        productsTable: {
          product: 'Product',
          unitsSold: 'Units Sold',
          revenue: 'Revenue',
          rating: 'Rating',
          returnRate: 'Return Rate',
        },
        groupedReturning: 'Returning',
        groupedOrders: 'Orders',
      },
      drawers: {
        dayDetailsTitle: (date) => `Day Details — ${date}`,
        date: 'Date',
        revenue: 'Revenue',
        orders: 'Orders',
        visitors: 'Visitors',
        conversion: 'Conversion',
        aov: 'AOV',
        newCustomers: 'New Customers',
        returning: 'Returning',
        revenuePerformance: 'Revenue Performance',
        conversionRate: 'Conversion Rate',
        channel: 'Channel',
        revenuePerVisitor: 'Revenue/Visitor',
        trafficShare: 'Traffic Share',
        revenueShare: 'Revenue Share',
        product: 'Product',
        avgPrice: 'Avg Price',
        rating: 'Rating',
        returnRateLabel: 'Return Rate',
        ratingHeading: 'Rating',
        returnRateHealth: 'Return Rate Health',
      },
      empty: {
        noServices: 'No services',
        noDataInPeriod: 'No data in selected period',
      },
      serviceMenu: {
        restart: 'Restart',
        viewLogs: 'View logs',
        silence: 'Silence alerts',
      },
      serviceToast: (action, name) => `${action}: ${name}`,
      healthLabel: {
        healthy: 'healthy',
        degraded: 'degraded',
        down: 'down',
      },
      activityType: {
        alert: 'alert',
        deploy: 'deploy',
        edit: 'edit',
        login: 'login',
      },
      trendLabel: {
        up: 'up',
        flat: 'flat',
        down: 'down',
      },
      detailsBtn: 'Details',
      drilldownLead: (icon, pct) =>
        `Trend: ${icon} ${pct}% revenue change vs previous half-period. Right-click headers / cells for context menus. Try Group-by toolbar.`,
      channelTopValue: 'Organic Search',
      channelBestConvValue: 'Email (5.2%)',
      exportToastTitle: 'Report exported',
    },
    fileManager: {
      emptyFolder: 'This folder is empty',
      rootName: 'My Files',
      storage: 'Storage: 142 GB / 200 GB',
      searchPlaceholder: 'Search files…',
      shortcutHint: '⌘+F search · Del delete',
      shortcutHintTitle: 'Use ↑↓ to navigate, Enter to open',
      views: {
        grid: 'Grid',
        list: 'List',
        recent: 'Recent',
      },
      upload: 'Upload',
      uploadDone: 'File uploaded (mock)',
      recentSubtitle: (n) => `${n} recently modified files`,
      noContents: (name) => `No contents for ${name}`,
      table: {
        name: 'Name',
        size: 'Size',
        type: 'Type',
        modified: 'Modified',
        preview: 'Preview',
        open: 'Open',
        delete: 'Delete',
        deleteConfirm: (name) => `Delete "${name}"?`,
        deleted: (name) => `Deleted ${name} (mock)`,
      },
      preview: {
        notAvailable: (type) => `Preview not available for ${type}`,
        typeLabel: 'Type:',
        sizeLabel: 'Size:',
        modifiedLabel: 'Modified:',
        pathLabel: 'Path:',
        download: 'Download',
        share: 'Share',
        rename: 'Rename',
        deleteConfirm: (name) => `Delete "${name}"?`,
        deleteToast: 'Deleted (mock)',
        readable: 'readable',
        large: 'large',
        downloading: (name) => `Downloading ${name}`,
      },
      rename: {
        title: 'Rename file',
        cancel: 'Cancel',
        submit: 'Rename',
        toast: (newName) => `Renamed to ${newName} (mock)`,
      },
      share: {
        title: (name) => `Share — ${name}`,
        done: 'Done',
        description: 'Anyone with the link can view this file.',
        copy: 'Copy',
        copied: 'Link copied',
        permissionLabel: 'Permission:',
        permView: 'View only',
        permComment: 'Comment',
        permEdit: 'Edit',
      },
    },
    workflowEditor: {
      paletteTitle: 'Palette',
      paletteHint: 'Click a shape to add a node, then drag it on the canvas.',
      statsTitle: 'Stats',
      nodesLabel: 'nodes',
      edgesLabel: 'edges',
      routing: {
        straight: 'Straight',
        orthogonal: 'Orthogonal',
      },
      selection: {
        single: 'Single',
        multi: 'Multi (⌃-click)',
        lasso: 'Lasso',
      },
      selectedTag: (n) => `${n} selected`,
      deleteSelected: 'Delete selected',
      deleteSelectedConfirm: (n) => `Delete ${n} selected nodes?`,
      lockLayout: 'Lock layout',
      unlockLayout: 'Unlock layout',
      addEdge: '+ Edge',
      addNode: '+ Node',
      resetTemplate: 'Reset',
      resetConfirm: 'Reset to template?',
      inspector: {
        title: 'Inspector',
        selectNode: 'Select a node',
        id: 'ID',
        kind: 'Kind',
        position: 'Position',
        outgoing: 'Outgoing',
        incoming: 'Incoming',
        label: 'Label',
        apply: 'Apply',
        delete: 'Delete node',
        deleteConfirm: (name) => `Delete "${name}"?`,
      },
      modals: {
        addTitle: 'Add node',
        labelField: 'Label',
        labelPlaceholder: 'Describe the step',
        kindField: 'Kind',
        cancel: 'Cancel',
        add: 'Add',
        edgeTitle: 'Connect nodes',
        fromField: 'From',
        fromPlaceholder: 'Source node',
        toField: 'To',
        toPlaceholder: 'Target node',
        edgeLabel: 'Label',
        edgeLabelPlaceholder: 'yes / no / ...',
        connect: 'Connect',
      },
      contextMenu: {
        rename: '✎ Rename',
        duplicate: '⎘ Duplicate',
        delete: '✕ Delete',
        addNode: '+ New node',
        addEdge: '+ New edge',
      },
      nodeActions: {
        rename: 'Rename',
        duplicate: 'Duplicate',
        delete: 'Delete',
      },
      edgeActions: {
        remove: 'Remove edge',
      },
      toasts: {
        renamed: (label) => `Renamed to "${label}"`,
        deletedNode: (id) => `Deleted node ${id}`,
        addedNode: (label) => `Added "${label}"`,
        pickEnds: 'Pick source and target',
        differentEnds: 'Source and target must differ',
        connected: (from, to) => `Connected ${from} → ${to}`,
        reset: 'Workflow reset to template',
        duplicated: (label) => `Duplicated "${label}"`,
        removedEdge: (id) => `Removed edge ${id}`,
        bulkRemoved: (n) => `Removed ${n} nodes`,
        deletedShort: (id) => `Deleted ${id}`,
      },
      kindLabel: {
        start: 'start',
        task: 'task',
        decision: 'decision',
        end: 'end',
      },
    },
    forms: {
      tabs: {
        basic: 'Basic',
        validation: 'Validation',
        layouts: 'Layouts',
        dynamic: 'Dynamic',
        schema: 'Schema (Wizard)',
      },
      basic: {
        sections: {
          textInputs: 'Text Inputs',
          inputGroup: 'Input Group',
          selection: 'Selection Controls',
          toggleRange: 'Toggle & Range',
          dateTime: 'Date & Time',
          specialised: 'Specialised Inputs',
        },
        labels: {
          input: 'Input',
          passwordStrength: 'Password + Strength',
          searchInput: 'Search Input',
          inputNumber: 'InputNumber',
          textarea: 'Textarea',
          protocolAddon: 'With protocol addon',
          unitAddon: 'With unit addon',
          select: 'Select',
          autoComplete: 'AutoComplete',
          segmented: 'Segmented',
          radioGroup: 'RadioGroup',
          checkbox: 'Checkbox',
          switch: 'Switch',
          sliderValue: (v) => `Slider (${v})`,
          rate: 'Rate',
          datePicker: 'DatePicker',
          rangePicker: 'RangePicker',
          timePicker: 'TimePicker',
          colorPicker: 'ColorPicker',
          tagInput: 'TagInput (max 8 tags)',
          pinInputDigits: 'PinInput (6 digits)',
          pinInputMasked: 'PinInput (masked, 4 chars)',
          inlineEdit: 'InlineEdit',
        },
        placeholders: {
          basic: 'Basic text input',
          password: 'Enter password',
          multiLine: 'Multi-line text...',
          example: 'example.com',
          weight: 'Weight',
          chooseOption: 'Choose option',
          autoEmail: 'Type email username',
          pickDate: 'Pick a date',
          pickTime: 'Pick time',
          tagInput: 'Type and press Enter...',
        },
        options: {
          alpha: 'Option Alpha',
          beta: 'Option Beta',
          gamma: 'Option Gamma',
          disabled: 'Disabled Option',
          a: 'Option A',
          b: 'Option B',
          c: 'Option C',
          disabledRadio: 'Disabled',
          daily: 'daily',
          weekly: 'weekly',
          monthly: 'monthly',
        },
        enabled: 'Enabled',
        disabledLabel: 'Disabled',
        agreeTerms: 'Agree to terms',
        selectAll: 'Select all',
        on: 'ON',
        off: 'OFF',
        inlineDefault: 'Click me to edit',
        inlineNoButtons: 'No buttons mode',
        inlineDisabled: 'Disabled edit',
        toasts: {
          searching: (q) => `Searching: "${q}"`,
          pinComplete: (v) => `PIN complete: ${v}`,
          saved: (v) => `Saved: "${v}"`,
        },
      },
      validation: {
        sections: {
          rules: 'Rules & feedback',
          authForms: 'Auth form templates',
        },
        rulesLead:
          'Real-time validation with rules, warnings, feedback icons and various trigger modes.',
        fields: {
          username: 'Username',
          usernameRequired: 'Username is required',
          usernameMin: 'At least 3 characters',
          usernameMax: 'Max 20 characters',
          usernamePattern: 'Only letters, numbers and underscore',
          usernamePlaceholder: 'john_doe',
          email: 'Email',
          emailRequired: 'Email is required',
          emailInvalid: 'Invalid email format',
          emailPlaceholder: 'user@example.com',
          password: 'Password',
          passwordRequired: 'Password is required',
          passwordMin: 'At least 8 characters',
          passwordPlaceholder: 'Strong password',
          age: 'Age',
          ageRange: 'Must be 18-120',
          agePlaceholder: 'Your age',
          website: 'Website',
          websiteUrl: 'Enter a valid URL',
          websiteHelp: 'Include https://',
          websitePlaceholder: 'yoursite.com',
          role: 'Role',
          rolePick: 'Select a role',
          rolePlaceholder: 'Select role',
          bio: 'Bio',
          bioMax: 'Max 200 characters',
          bioWarn: 'A longer bio helps others know you',
          bioExtra: 'Tell us about yourself',
          bioPlaceholder: 'A few words about you...',
          agree: 'I agree to the Terms of Service',
          agreeRequired: 'You must agree',
        },
        submit: 'Submit',
        reset: 'Reset',
        submittedToast: 'Form submitted!',
        roleOptions: {
          developer: 'Developer',
          designer: 'Designer',
          manager: 'Manager',
          qa: 'QA Engineer',
        },
        auth: {
          modes: {
            login: 'Login',
            register: 'Register',
            forgot: 'Forgot',
          },
          brand: 'SkyGraph',
          loginEmail: 'Email',
          loginPassword: 'Password',
          loginEmailPlaceholder: 'you@email.com',
          loginPasswordPlaceholder: 'Your password',
          rememberMe: 'Remember me',
          forgotLink: 'Forgot password?',
          signIn: 'Sign In',
          loginToast: 'Login success (mock)',
          registerToast: 'Registered (mock)',
          firstName: 'First Name',
          lastName: 'Last Name',
          firstNamePlaceholder: 'Jane',
          lastNamePlaceholder: 'Doe',
          regEmailPlaceholder: 'jane@example.com',
          regPasswordPlaceholder: 'Min 8 characters',
          agreeTerms: 'I agree to Terms & Privacy Policy',
          agreeRequired: 'Required',
          createAccount: 'Create Account',
          forgotLead: "Enter your email and we'll send you a reset link.",
          sendReset: 'Send Reset Link',
          backToLogin: '← Back to login',
          resetToast: 'Reset link sent (mock)',
        },
      },
      layouts: {
        layoutLabel: 'Layout',
        sizeLabel: 'Size',
        requiredMarkLabel: 'Required Mark',
        requiredOptions: {
          show: 'Show',
          optional: 'Optional',
          hide: 'Hide',
        },
        fields: {
          firstName: 'First Name',
          lastName: 'Last Name',
          department: 'Department',
          active: 'Active',
        },
        placeholders: {
          first: 'John',
          last: 'Doe',
          select: 'Select...',
        },
        deptOptions: {
          eng: 'Engineering',
          design: 'Design',
          marketing: 'Marketing',
        },
        save: 'Save',
        reset: 'Reset',
        submittedToast: 'Submitted',
      },
      dynamic: {
        sections: {
          lists: 'Dynamic field arrays',
          playground: 'Interactive playground',
        },
        teamLead:
          'Add and remove form fields dynamically. Each team member entry has its own validation.',
        teamName: 'Team Name',
        teamNamePlaceholder: 'Team name',
        membersHeading: (n) => `Team Members (${n})`,
        addMember: '+ Add Member',
        namePlaceholder: 'Name',
        emailPlaceholder: 'Email',
        nameRequired: 'Name required',
        emailInvalid: 'Invalid email',
        roles: {
          developer: 'Developer',
          designer: 'Designer',
          pm: 'PM',
          qa: 'QA',
        },
        saveTeam: 'Save Team',
        reset: 'Reset',
        teamSavedToast: 'Team saved!',
        playground: {
          otpHeading: 'OTP Verification',
          otpLead: 'Enter the 6-digit code sent to your email.',
          otpProgress: (entered, total) => `${entered}/${total} digits entered`,
          otpVerified: 'Verified successfully!',
          otpSuccess: 'Code verified!',
          tryAgain: 'Try again',
          searchHeading: 'Live Search',
          searchLead: 'Search through items with instant results.',
          searchPlaceholder: 'Search topics...',
          searchButton: 'Search',
          searchEmpty: 'Type something and hit Search',
          passwordHeading: 'Password Strength Checker',
          passwordLead: 'Try different passwords to see real-time strength analysis.',
          weakLabel: 'Weak example',
          weakPlaceholder: 'Weak password',
          mediumLabel: 'Medium example',
          mediumPlaceholder: 'Medium password',
          strongLabel: 'Strong example',
          strongPlaceholder: 'Strong password',
          tryYourOwnLabel: 'Try your own',
          tryYourOwnPlaceholder: 'Type anything...',
        },
      },
      schema: {
        completedHeading: 'Registration Complete!',
        completedLead: (name, plan) =>
          `Welcome, ${name}! Your ${plan} plan account has been created.`,
        startOver: 'Start Over',
        intro:
          'Multi-step schema-driven registration: each step has its own data shape and gating rules, with a structured review before submit.',
        steps: {
          personal: 'Personal Info',
          professional: 'Professional',
          preferences: 'Preferences',
          review: 'Review',
        },
        fields: {
          fullName: 'Full Name *',
          fullNamePh: 'Jane Smith',
          email: 'Email *',
          emailPh: 'jane@example.com',
          phone: 'Phone',
          phonePh: '555 123 4567',
          company: 'Company *',
          companyPh: 'Acme Inc.',
          position: 'Position',
          positionPh: 'Senior Developer',
          skills: 'Skills',
          skillsPh: 'Add skills (e.g. React, Node.js)',
          experience: 'Experience Level',
          experienceLevels: {
            junior: 'Junior',
            middle: 'Middle',
            senior: 'Senior',
            lead: 'Lead',
          },
          plan: 'Plan',
          planOptions: {
            free: 'Free — Basic features',
            pro: 'Pro — All features, priority support',
            enterprise: 'Enterprise — Custom, SLA, dedicated manager',
          },
          notifications: 'Notifications',
          notificationsHelp: 'Push & email alerts',
          newsletter: 'Newsletter',
          newsletterLabel: 'Subscribe to monthly newsletter',
        },
        review: {
          personal: 'Personal',
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          professional: 'Professional',
          company: 'Company',
          position: 'Position',
          skills: 'Skills',
          experience: 'Experience',
          preferences: 'Preferences',
          plan: 'Plan',
          notifications: 'Notifications',
          newsletter: 'Newsletter',
          enabled: '✓ Enabled',
          disabled: '✕ Disabled',
          subscribed: '✓ Subscribed',
          no: '✕ No',
        },
        back: '← Back',
        next: 'Next →',
        completeBtn: 'Complete Registration',
        completedToast: 'Registration complete!',
      },
    },
    hrPortal: {
      stats: {
        total: 'Total Employees',
        activeRemote: 'Active / Remote',
        onLeave: 'On Leave',
        avgSalary: 'Avg Salary',
      },
      tabs: {
        directory: 'Directory',
        org: 'Org Chart',
        leave: 'Leave Calendar',
        reviews: 'Performance Reviews',
        team: 'Team Assign',
        onboarding: 'Onboarding',
      },
      directory: {
        searchPlaceholder: 'Search employees…',
        table: {
          employee: 'Employee',
          department: 'Department',
          role: 'Role',
          status: 'Status',
          startDate: 'Start Date',
          salary: 'Salary',
        },
        views: {
          table: 'Table',
          cards: 'Cards',
        },
      },
      org: {
        departmentSizes: 'Department Sizes',
      },
      leave: {
        views: {
          calendar: 'Lane planner (ResourceCalendar)',
          table: 'Requests table',
        },
        noOverlaps: 'No overlapping leaves',
        overlapsCount: (n) => `${n} overlap(s) detected`,
        table: {
          employee: 'Employee',
          type: 'Type',
          from: 'From',
          to: 'To',
          status: 'Status',
          approve: 'Approve',
          reject: 'Reject',
          groupByType: 'Leave type',
          groupByStatus: 'Status',
          typeFilters: {
            vacation: 'vacation',
            sick: 'sick',
            personal: 'personal',
            remote: 'remote',
          },
          statusFilters: {
            approved: 'approved',
            pending: 'pending',
            rejected: 'rejected',
          },
        },
        toasts: {
          approved: (name) => `Approved leave for ${name}`,
          rejected: (name) => `Rejected leave for ${name}`,
        },
      },
      reviews: {
        filters: {
          all: 'All',
          pending: 'Pending',
          draft: 'Draft',
          completed: 'Completed',
        },
        avgOverall: (avg) => `Avg overall: ${avg}`,
        overall: 'Overall',
        tech: 'Tech',
        collab: 'Collab',
        leadAbbr: 'Lead',
        delivery: 'Delivery',
        reviewer: 'Reviewer',
        drawer: {
          period: 'Period',
          reviewer: 'Reviewer',
          overall: 'Overall',
          score: 'Score',
          breakdown: 'Competency Breakdown',
          technical: 'Technical Skill',
          collaboration: 'Collaboration',
          leadership: 'Leadership',
          delivery: 'Delivery',
          goals: 'Goals',
          highlights: 'Highlights',
          improvements: 'Areas for Improvement',
          exportPdf: 'Export PDF',
          complete: 'Complete Review',
        },
      },
      team: {
        heading: 'Assign employees to Project Alpha',
        assignedTag: (n) => `${n} assigned`,
        available: 'Available',
        assigned: 'Assigned',
      },
      onboarding: {
        steps: {
          personal: 'Personal',
          equipment: 'Equipment',
          training: 'Training',
        },
        panels: {
          personal: 'Personal Information',
          equipment: 'Equipment & Access',
          training: 'Training Schedule',
        },
        fields: {
          fullName: 'Full Name',
          fullNamePh: 'John Doe',
          email: 'Email',
          emailPh: 'john@company.com',
          department: 'Department',
          deptPh: 'Select department',
          role: 'Role',
          rolePh: 'Frontend Developer',
          startDate: 'Start Date',
          datePh: 'Select date',
          salary: 'Salary',
          salaryPh: '50000',
        },
        continueEquipment: 'Continue → Equipment',
        continueTraining: 'Continue → Training',
        completeBtn: 'Complete Onboarding',
        equipmentList: {
          laptop: '✓ Laptop provisioned',
          email: '✓ Email account created',
          vpn: '✓ VPN access granted',
          slack: '○ Slack/Teams invited',
          github: '○ GitHub org added',
        },
        equipmentLead: 'Provisioning checklist:',
        trainingPlan: {
          week1: 'Week 1: Orientation & Company Culture',
          week2: 'Week 2: Team Processes & Tools',
          week3: 'Week 3: Product Deep-Dive',
          week4: 'Week 4: First Assignment',
        },
        toasts: {
          personalSaved: 'Personal info saved (mock)',
          complete: 'Onboarding complete!',
        },
      },
      statusLabel: {
        active: 'active',
        'on-leave': 'on-leave',
        remote: 'remote',
        terminated: 'terminated',
      },
      reviewStatusLabel: {
        pending: 'pending',
        draft: 'draft',
        completed: 'completed',
      },
      leaveTypeLabel: {
        vacation: 'vacation',
        sick: 'sick',
        personal: 'personal',
        remote: 'remote',
      },
      leaveStatusLabel: {
        approved: 'approved',
        pending: 'pending',
        rejected: 'rejected',
      },
    },
    admin: {
      stats: {
        total: 'Total Users',
        totalSub: (active) => `${active} active`,
        admins: 'Admins',
        adminsSub: (n) => `${n} roles defined`,
        twoFa: '2FA Adoption',
        critical: 'Critical Events',
        criticalSub: 'last 14 days',
      },
      tabs: {
        users: 'Users',
        sessions: 'Active Sessions',
        apiKeys: 'API Keys',
        audit: 'Audit Log',
        roles: 'Access Control',
        settings: 'Settings',
      },
      users: {
        searchPlaceholder: 'Search users…',
        selectedTag: (n) => `${n} selected`,
        bulkSuspendConfirm: (n) => `Suspend ${n} users?`,
        bulkSuspend: 'Bulk Suspend',
        bulkSuspendToast: (n) => `Suspended ${n} users (mock)`,
        viewBtn: 'View',
        createBtn: '+ Create User',
        columns: {
          user: 'User',
          role: 'Role',
          status: 'Status',
          department: 'Department',
          twoFa: '2FA',
          lastLogin: 'Last Login',
          logins: 'Logins',
        },
        rowMenu: {
          edit: 'Edit User',
          reset: 'Reset Password',
          suspend: 'Suspend',
          activate: 'Activate',
          delete: 'Delete User',
        },
        drawer: {
          email: 'Email',
          department: 'Department',
          lastLogin: 'Last Login',
          created: 'Created',
          loginCount: 'Login Count',
          twoFaEnabled: '2FA Enabled',
          yes: 'Yes',
          no: 'No',
          permissionsHeading: (n) => `Permissions (${n})`,
          activityHeading: 'Recent Activity',
          edit: 'Edit',
          resetPassword: 'Reset Password',
          suspend: 'Suspend',
          suspendConfirm: 'Suspend this user?',
          suspendedToast: (name) => `${name} suspended (mock)`,
          resetSentToast: 'Password reset email sent (mock)',
        },
        createTitle: 'Create New User',
        createToast: 'User created (mock)',
        editTitle: (name) => `Edit — ${name}`,
        editToast: 'User updated (mock)',
        submitCreate: 'Create User',
        submitSave: 'Save Changes',
        groupBy: {
          role: 'Role',
          department: 'Department',
          status: 'Status',
        },
      },
      audit: {
        severityAll: 'All Severity',
        severityInfo: 'Info',
        severityWarning: 'Warning',
        severityCritical: 'Critical',
        columns: {
          time: 'Time',
          user: 'User',
          action: 'Action',
          target: 'Target',
          ip: 'IP Address',
        },
        expanded: {
          details: 'Details',
          severity: 'Severity',
          ip: 'IP',
          timestamp: 'Timestamp',
        },
        exportToast: 'Export audit log (mock)',
        exportBtn: 'Export CSV',
      },
      roles: {
        newRole: '+ New Role',
        newRoleToast: 'Create role wizard (mock)',
        permissionsLabel: (n) => `${n} permissions`,
        usersLabel: (n) => `${n} users`,
        editPermissions: 'Edit Permissions',
        editPermissionsTitle: (name) => `Edit Permissions — ${name}`,
        cancel: 'Cancel',
        save: 'Save',
        available: 'Available',
        granted: 'Granted',
        saveToast: (name, n) => `Updated ${name} with ${n} permissions (mock)`,
      },
      settings: {
        placeholder: '',
        updateToast: (key) => `Setting "${key}" updated (mock)`,
      },
      apiKeys: {
        searchPlaceholder: 'Search keys…',
        createBtn: '+ Create Key',
        columns: {
          name: 'Key Name',
          token: 'Token',
          owner: 'Owner',
          scopes: 'Scopes',
          rate: (perMinute) => `${perMinute}/min`,
          rateTitle: 'Rate',
          lastUsed: 'Last Used',
          expires: 'Expires',
          status: 'Status',
        },
        rotate: 'Rotate',
        rotateToast: (name) => `Rotate ${name} (mock)`,
        revoke: 'Revoke',
        revokeConfirm: 'Revoke this API key?',
        revokedToast: (name) => `Revoked ${name}`,
        createTitle: 'Create API Key',
        keyName: 'Key Name',
        keyNamePh: 'Production Backend',
        scopesLabel: 'Scopes',
        scopesPh: 'Pick scopes',
        rateLabel: 'Rate Limit (req/min)',
        ratePh: '100',
        cancel: 'Cancel',
        generate: 'Generate Key',
        createdTitle: 'API Key Created',
        createdWarning:
          '⚠️ Copy this key now — for security reasons, you will not be able to see it again.',
        copy: 'Copy',
        copiedToast: 'Copied to clipboard',
        confirmedBtn: 'I have copied the key',
      },
      sessions: {
        searchPlaceholder: 'Search by user, IP, location…',
        terminateAllBtn: 'Terminate All Others',
        terminateAllConfirm: 'Terminate ALL other sessions? You will stay signed in.',
        terminateAllToast: 'All other sessions terminated',
        columns: {
          user: 'User',
          device: 'Device',
          location: 'Location',
          ip: 'IP',
          started: 'Started',
          lastActive: 'Last Active',
          current: '',
        },
        currentTag: 'Current',
        youBtn: 'This is you',
        terminate: 'Terminate',
        terminateConfirm: (user) => `Terminate session for ${user}?`,
        terminatedToast: (id) => `Session ${id} terminated`,
      },
      userForm: {
        fullName: 'Full Name',
        fullNamePh: 'John Doe',
        email: 'Email',
        emailPh: 'john@company.io',
        department: 'Department',
        deptPh: 'Select department',
        role: 'Role',
        rolePh: 'Select role',
        status: 'Status',
        statusOptions: {
          active: 'Active',
          suspended: 'Suspended',
          pending: 'Pending',
          deactivated: 'Deactivated',
        },
        twoFa: 'Require 2FA',
        cancel: 'Cancel',
      },
      roleLabel: {
        admin: 'admin',
        editor: 'editor',
        viewer: 'viewer',
        moderator: 'moderator',
        support: 'support',
      },
      statusLabel: {
        active: 'active',
        suspended: 'suspended',
        pending: 'pending',
        deactivated: 'deactivated',
      },
      apiKeyStatusLabel: {
        active: 'active',
        revoked: 'revoked',
        expired: 'expired',
      },
    },
    crm: {
      stats: {
        contacts: 'Total Contacts',
        contactsSub: (n) => `${n} customers`,
        pipeline: 'Pipeline Value',
        pipelineSub: (n) => `${n} active deals`,
        won: 'Won Revenue',
        wonSub: (n) => `${n} deals closed`,
        avgDeal: 'Avg Deal Size',
        avgDealSub: (rate) => `win rate ${rate}%`,
        lifetime: 'Total Revenue',
        lifetimeSub: 'lifetime value',
      },
      tabs: {
        leads: 'Leads',
        contacts: 'Contacts',
        deals: 'Deals',
        pipeline: 'Pipeline (Kanban)',
        hierarchy: 'Hierarchy',
        deadlines: 'Deadlines',
        activity: 'Activity',
      },
      leads: {
        searchPlaceholder: 'Search leads…',
        cards: {
          total: 'Total Leads',
          newLeads: 'New Leads',
          qualified: 'Qualified Prospects',
          conversion: 'Lead → Prospect Rate',
        },
        filterAll: (n) => `All (${n})`,
        filterLeads: 'Leads',
        filterProspects: 'Prospects',
        viewBtn: 'View',
        addLead: '+ Add Lead',
        columns: {
          lead: 'Lead',
          company: 'Company',
          stage: 'Stage',
          potential: 'Potential',
          lastContact: 'Last Contact',
        },
        rowActions: {
          edit: 'Edit',
          convert: 'Convert to Customer',
          sendEmail: 'Send Email',
        },
        editTitle: (name) => `Edit — ${name}`,
        addLeadTitle: 'Add Lead',
        convertTitle: (name) => `Convert "${name}" to customer?`,
        convertText: 'This will move the lead to the Contacts tab as an active customer.',
        convertOk: 'Convert',
        savedToast: 'Lead saved (mock)',
        convertedToast: (name) => `${name} converted to customer (mock)`,
      },
      contacts: {
        searchPlaceholder: 'Search contacts…',
        selectedTag: (n) => `${n} selected`,
        bulkEmailConfirm: (n) => `Send bulk email to ${n} contacts?`,
        bulkEmail: 'Bulk Email',
        bulkEmailToast: (n) => `Email sent to ${n} contacts (mock)`,
        bulkDeleteConfirm: (n) => `Delete ${n} contacts?`,
        bulkDelete: 'Bulk Delete',
        bulkDeleteToast: (n) => `Deleted ${n} contacts (mock)`,
        addContact: '+ Add Contact',
        addContactTitle: 'Add Contact',
        columns: {
          contact: 'Contact',
          company: 'Company',
          phone: 'Phone',
          status: 'Status',
          revenue: 'Revenue',
          lastContact: 'Last Contact',
        },
        rowActions: {
          edit: 'Edit',
          sendEmail: 'Send Email',
          createDeal: 'Create Deal',
          delete: 'Delete',
        },
        editTitle: (name) => `Edit — ${name}`,
        updatedToast: 'Contact updated (mock)',
        createdToast: 'Contact created (mock)',
        submitSave: 'Save Changes',
        submitCreate: 'Create',
        summaryContacts: (n) => `${n} contacts`,
        groupByCompany: 'Company',
        groupByStatus: 'Status',
      },
      deals: {
        searchPlaceholder: 'Search deals…',
        filterAll: (n) => `All (${n})`,
        open: (sum) => `Open: ${sum}`,
        weighted: (sum) => `Weighted: ${sum}`,
        won: (sum) => `Won: ${sum}`,
        columns: {
          deal: 'Deal',
          value: 'Value',
          stage: 'Stage',
          probability: 'Probability',
          created: 'Created',
        },
        rowActions: {
          details: 'Details',
          markWon: 'Mark as Won',
          markLost: 'Mark as Lost',
          reassign: 'Reassign',
        },
        summary: (n, avg) => `${n} deals · avg ${avg}%`,
        drawer: {
          value: 'Value',
          probability: 'Probability',
          weighted: 'Weighted',
          created: 'Created',
          contact: 'Contact',
          company: 'Company',
        },
        toasts: {
          won: 'Deal marked as Won',
          lost: 'Deal marked as Lost',
        },
      },
      pipeline: {
        intro: 'Drag deal cards across stages to update the pipeline. Click a card for details.',
        movedToast: (stage) => `Moved to ${stage}`,
        drawer: {
          close: 'Close',
          markWon: 'Mark Won',
          markLost: 'Mark Lost',
          wonToast: 'Deal marked as Won (mock)',
          lostToast: 'Deal marked as Lost (mock)',
          value: 'Value',
          probability: 'Probability',
          created: 'Created',
          contact: 'Contact',
          company: 'Company',
          email: 'Email',
          winProbability: 'Win Probability',
        },
      },
      hierarchy: {
        breadcrumbRoot: 'Accounts',
        breadcrumbAll: 'All',
        allAccounts: (contacts, companies) =>
          `All Accounts (${contacts} contacts · ${companies} companies)`,
        kpi: {
          lifetime: 'Lifetime revenue',
          pipeline: 'Pipeline value',
          pipelineSub: (n) => `${n} deals`,
          customers: 'Customers',
        },
        dealsHeading: (n) => `Deals (${n})`,
        noDeals: 'No deals',
      },
      deadlines: {
        intro:
          'Top 8 accounts as resource lanes. Activities (1d) and active deals (~5d window around predicted close) are assignments. Each lane has capacityPerSlot=2 — over-capacity weeks surface as conflicts. Drag to move, edge-drag to resize.',
        conflictsLabel: 'Conflicts:',
        conflictsNone: 'none',
        noActivities: 'No upcoming activities',
      },
      activity: {
        typeFilterAll: 'All Types',
        typeFilters: {
          call: '📞 Calls',
          email: '📧 Emails',
          meeting: '🤝 Meetings',
          note: '📝 Notes',
        },
        countLabel: (n) => `${n} activities`,
      },
      contactDrawer: {
        edit: 'Edit',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        revenue: 'Revenue',
        lastContact: 'Last Contact',
        openDeals: (n) => `Open Deals (${n})`,
        activity: 'Activity',
      },
      contactForm: {
        fullName: 'Full Name',
        fullNamePh: 'John Doe',
        email: 'Email',
        emailPh: 'john@example.com',
        company: 'Company',
        companyPh: 'Acme Inc',
        phone: 'Phone',
        phonePh: '+1 (555) 000-0000',
        status: 'Status',
        statusPh: 'Select status',
        revenue: 'Revenue ($)',
        revenuePh: '0',
        cancel: 'Cancel',
        submitDefault: 'Save',
        statusOptions: {
          lead: 'Lead',
          prospect: 'Prospect',
          customer: 'Customer',
          churned: 'Churned',
        },
      },
      stageLabel: {
        lead: 'Lead',
        qualified: 'Qualified',
        proposal: 'Proposal',
        negotiation: 'Negotiation',
        'closed-won': 'Closed Won',
        'closed-lost': 'Closed Lost',
      },
      statusLabel: {
        lead: 'lead',
        prospect: 'prospect',
        customer: 'customer',
        churned: 'churned',
      },
      activityTypeLabel: {
        call: 'call',
        email: 'email',
        meeting: 'meeting',
        note: 'note',
      },
    },
    ecommerce: {
      stats: {
        revenue: 'Total Revenue',
        revenueSub: (orders) => `${orders} orders`,
        pending: 'Pending Orders',
        pendingSub: 'needs processing',
        activeProducts: 'Active Products',
        activeProductsSub: (total) => `of ${total} total`,
        lowStock: 'Low Stock',
        lowStockSub: 'below 10 units',
        vip: 'VIP Customers',
        vipSub: (total) => `of ${total} total`,
      },
      tabs: {
        products: 'Products',
        orders: 'Orders',
        customers: 'Customers',
        inventory: 'Inventory',
        analytics: 'Analytics',
      },
      products: {
        searchPlaceholder: 'Search products…',
        categoryAll: 'All categories',
        categoryOptions: {
          electronics: 'Electronics',
          clothing: 'Clothing',
          homeGarden: 'Home & Garden',
        },
        statusAll: 'All status',
        statusOptions: {
          active: 'Active',
          draft: 'Draft',
          archived: 'Archived',
        },
        sortOptions: {
          featured: 'Featured',
          sold: 'Top sellers',
          priceAsc: 'Price ↑',
          priceDesc: 'Price ↓',
          rating: 'Highest rated',
        },
        views: {
          grid: 'Grid',
          list: 'List',
        },
        addBtn: '+ Add Product',
        showing: (visible, total) => `Showing ${visible} of ${total} products`,
        featured: '★ Featured',
        sale: 'SALE',
        inStock: (n) => `${n} in stock`,
        lowStockBadge: (n) => `Low stock (${n})`,
        soldSuffix: 'sold',
        marginSuffix: 'margin',
        drawer: {
          sku: 'SKU',
          brand: 'Brand',
          category: 'Category',
          price: 'Price',
          cost: 'Cost',
          margin: 'Margin',
          stockReserved: 'Stock / Reserved',
          available: 'Available',
          status: 'Status',
          rating: 'Rating',
          sold: 'Sold',
          revenue: 'Revenue',
          tagsHeading: 'Tags',
          stockHealth: 'Stock Health',
          descriptionHeading: 'Description',
        },
        createTitle: 'Add New Product',
        fields: {
          name: 'Product Name',
          namePh: 'Wireless Earbuds Pro',
          category: 'Category',
          categoryPh: 'Select category',
          brand: 'Brand',
          brandPh: 'Select brand',
          price: 'Price ($)',
          pricePh: '29.99',
          stock: 'Initial Stock',
          stockPh: '100',
          featured: 'Featured',
        },
        cancel: 'Cancel',
        create: 'Create Product',
        createdToast: 'Product created (mock)',
      },
      orders: {
        searchPlaceholder: 'Search orders…',
        exportBtn: 'Export CSV',
        exportToast: 'Export orders (mock)',
        columns: {
          order: 'Order',
          customer: 'Customer',
          total: 'Total',
          status: 'Status',
          date: 'Date',
          items: 'Items',
        },
        actions: {
          details: 'Details',
          refund: 'Refund',
        },
        summaryPageTotal: 'Page Total',
        detailTitle: (id) => `Order ${id}`,
        close: 'Close',
        markPaid: 'Mark as Paid',
        markPaidToast: (id) => `Order ${id} marked as paid (mock)`,
        steps: {
          pending: 'Pending',
          paid: 'Paid',
          shipped: 'Shipped',
          delivered: 'Delivered',
          cancelled: 'Cancelled',
        },
        descriptions: {
          customer: 'Customer',
          email: 'Email',
          address: 'Address',
          date: 'Date',
          total: 'Total',
          items: 'Items',
        },
        itemsHeading: 'Order Items',
        itemsTable: {
          product: 'Product',
          qty: 'Qty',
          price: 'Price',
          subtotal: 'Subtotal',
        },
        refundTitle: (id) => `Refund — ${id}`,
        refundFields: {
          order: 'Order',
          customer: 'Customer',
          orderTotal: 'Order Total',
          amount: 'Refund Amount ($)',
          reason: 'Reason',
          reasonPh: 'Select reason',
          reasonOptions: {
            defective: 'Defective product',
            wrongItem: 'Wrong item',
            request: 'Customer request',
            damage: 'Shipping damage',
            other: 'Other',
          },
        },
        cancel: 'Cancel',
        issueRefund: 'Issue Refund',
        refundToast: (amount, id) => `Refund of $${amount} issued for ${id} (mock)`,
        statusLabel: {
          pending: 'pending',
          paid: 'paid',
          shipped: 'shipped',
          delivered: 'delivered',
          cancelled: 'cancelled',
        },
      },
      customers: {
        searchPlaceholder: 'Search customers…',
        exportBtn: 'Export',
        exportToast: 'Export customers (mock)',
        viewBtn: 'View',
        vipBadge: '⭐ VIP',
        columns: {
          customer: 'Customer',
          status: 'Status',
          orders: 'Orders',
          totalSpent: 'Total Spent',
          aov: 'AOV',
          lastOrder: 'Last Order',
          registered: 'Registered',
        },
        drawer: {
          email: 'Email',
          registered: 'Registered',
          totalOrders: 'Total Orders',
          totalSpent: 'Total Spent',
          aov: 'Avg Order Value',
          lastOrder: 'Last Order',
          orderHistoryHeading: 'Order History',
        },
        statusLabel: {
          vip: 'vip',
          active: 'active',
          new: 'new',
          inactive: 'inactive',
        },
      },
      inventory: {
        cards: {
          out: 'Out of stock',
          low: 'Low stock (< 10)',
          healthy: 'Healthy',
          total: 'Total SKUs',
        },
        searchPlaceholder: 'Search by name, SKU or brand…',
        bucketAll: (n) => `All (${n})`,
        bucketOut: (n) => `Out (${n})`,
        bucketLow: (n) => `Low (${n})`,
        bucketHealthy: (n) => `Healthy (${n})`,
        exportBtn: 'Export Reorder Report',
        exportToast: 'Reorder report exported (mock)',
        columns: {
          product: 'Product',
          brand: 'Brand',
          category: 'Category',
          onHand: 'On Hand',
          reserved: 'Reserved',
          available: 'Available',
          health: 'Health',
          status: 'Status',
        },
        restockBtn: 'Restock',
        restockTitle: (name) => `Restock — ${name}`,
        quantity: 'Quantity',
        supplier: 'Supplier',
        supplierOptions: {
          primary: 'Primary supplier',
          backup: 'Backup supplier',
          local: 'Local supplier',
        },
        cancel: 'Cancel',
        orderRestock: 'Order Restock',
        restockedToast: (qty, name) => `Added ${qty} units to ${name}`,
        statusLabel: {
          active: 'active',
          draft: 'draft',
          archived: 'archived',
        },
      },
      analytics: {
        periods: {
          d7: 'Last 7 days',
          d30: 'Last 30 days',
          d90: 'Last 90 days',
          all: 'All time',
        },
        stats: {
          revenue: 'Revenue',
          ordersSub: (n) => `${n} orders`,
          aov: 'Avg Order Value',
          itemsSub: (n) => `${n} items sold`,
          inventoryValue: 'Inventory Value',
          inventorySub: (n) => `at cost across ${n} SKUs`,
          vipShare: 'VIP Share',
          vipSub: 'of customers',
        },
        cards: {
          revenueTrend: 'Revenue trend',
          noData: 'No data in selected period',
          ordersByStatus: 'Orders by status',
          revenueByCategory: 'Revenue by category',
          topProducts: 'Top products by revenue',
        },
        soldSuffix: 'sold',
        marginSuffix: 'margin',
      },
    },
    tableKitchenSink: {
      appTitle: 'Table — Kitchen Sink',
      appLead:
        'Every Table feature in one place: multi-sort, filtering, grouping, tree data, virtual scroll, drag & drop (rows + columns), inline editing, export (CSV/JSON), print, fullscreen, density toggle, keyboard navigation, cell spanning, column pinning, column visibility, aggregation, pinned rows, selection summary, context menus and locale.',
      tableLocale: {
        searchPlaceholder: 'Search in table...',
        filterConfirm: 'Apply',
        filterReset: 'Reset',
        sortAsc: 'Sort ascending',
        sortDesc: 'Sort descending',
        cancelSort: 'Cancel sort',
        emptyText: 'No data',
        selectAll: 'Select all',
        selectInvert: 'Invert selection',
        selectionAll: 'All data',
        expand: 'Expand row',
        collapse: 'Collapse row',
        triggerAsc: 'Click to sort ascending',
        triggerDesc: 'Click to sort descending',
        cancelTrigger: 'Click to cancel sort',
        columns: 'Columns',
        density: 'Density',
        densityDefault: 'Default',
        densityMiddle: 'Medium',
        densitySmall: 'Compact',
        fullscreen: 'Fullscreen',
        exitFullscreen: 'Exit fullscreen',
        reload: 'Reload',
        export: 'Export',
        exportCSV: 'Export CSV',
        exportJSON: 'Export JSON',
        print: 'Print',
        pinLeft: 'Pin left',
        pinRight: 'Pin right',
        unpin: 'Unpin',
        sum: 'Sum',
        avg: 'Avg',
        count: 'Count',
        min: 'Min',
        max: 'Max',
        totalRows: (total) => `${total} rows total`,
        selectedRows: (count) => `${count} selected`,
      },
      tabs: {
        basic: 'Basic',
        sortFilter: 'Sorting & Filtering',
        editing: 'Editing & DnD',
        virtual: 'Virtual Scroll',
        pinned: 'Pinned Rows',
        grouped: 'Grouped & Tree',
      },
      basic: {
        sectionBasic: 'Basic table',
        sectionEmpty: 'Empty state',
        basicLead:
          'Standard table with pagination, search and row selection. Strip-down view of the kitchen sink for the most common case.',
        emptyLead: 'Empty state with a custom illustration and call-to-action button.',
        emptyDescription: 'No employees match your criteria',
        addEmployee: 'Add Employee',
        addEmployeeToast: 'Add employee (mock)',
        columns: {
          employee: 'Employee',
          department: 'Department',
          role: 'Role',
          salary: 'Salary',
          rating: 'Rating',
          status: 'Status',
          hireDate: 'Hire Date',
        },
      },
      sortFilter: {
        lead: 'Multi-column sort (hold Shift + click), per-column filters (search, multi-select), column aggregates and a custom summary row.',
        expColumn: 'Exp (yrs)',
        summaryEmployees: (n) => `${n} employees`,
        summaryAvg: (sum) => `avg ${sum}`,
        summaryYears: (avg) => `${avg} yrs`,
        summaryRating: (avg) => `⭐ ${avg}`,
      },
      editing: {
        lead: 'Double-click any editable cell to change it. Drag rows by their handle to reorder. Drag column headers to rearrange. Right-click a header or cell for context actions.',
        columns: {
          employee: 'Employee',
          department: 'Department',
          role: 'Role',
          location: 'Location',
          salary: 'Salary',
          rating: 'Rating',
          status: 'Status',
        },
        tooltip: 'Full name of the employee',
        selectionActions: {
          export: 'Export Selected',
          delete: 'Delete',
          exportToast: (n) => `Exporting ${n} rows`,
          deleteToast: (n) => `Deleting ${n} rows (mock)`,
        },
        contextMenu: {
          hide: (title) => `Hide "${title}"`,
          copy: 'Copy value',
          copiedToast: 'Copied!',
          view: 'View details',
        },
        toasts: {
          cellEdit: (col, id) => `Updated ${col} for row ${id}`,
          rowMove: (from, to) => `Row moved from ${from} to ${to}`,
          colOrder: (order) => `Column order: ${order}`,
          colPin: (key, fixed) => `Pin ${key}: ${fixed}`,
          pinNone: 'none',
          exported: (n) => `Exported ${n} rows to CSV`,
        },
      },
      virtual: {
        leadPrefix: '',
        leadSuffix: ' rows with virtual scrolling — only visible rows are rendered in the DOM.',
        columns: {
          employee: 'Employee',
          department: 'Department',
          role: 'Role',
          salary: 'Salary',
          rating: 'Rating',
          status: 'Status',
        },
      },
      pinned: {
        lead: 'First 2 rows pinned to top, last 2 pinned to bottom. They stay visible while scrolling.',
        columns: {
          employee: 'Employee',
          department: 'Department',
          role: 'Role',
          salary: 'Salary',
          rating: 'Rating',
          status: 'Status',
        },
      },
      grouped: {
        modes: {
          group: 'Group by',
          tree: 'Tree data',
          colgroups: 'Column groups',
          cellspan: 'Cell span',
        },
        groupByLabel: 'Group by:',
        groupOptions: {
          department: 'Department',
          role: 'Role',
          status: 'Status',
          location: 'Location',
        },
        columns: {
          employee: 'Employee',
          department: 'Department',
          role: 'Role',
          salary: 'Salary',
          rating: 'Rating',
          projects: 'Projects',
          status: 'Status',
          name: 'Name',
        },
        columnGroups: {
          personal: 'Personal Info',
          compensation: 'Compensation & Performance',
          meta: 'Meta',
          hireDate: 'Hire Date',
          experience: 'Exp (yrs)',
          location: 'Location',
        },
        cellSpanLead:
          'Cell spanning via onCell: rows 1–3 share a merged Department cell, row 6 merges Department + Role.',
        groupExpandToast: (key, expanded) => `Group "${key}": ${expanded}`,
        expanded: 'expanded',
        collapsed: 'collapsed',
      },
      statusLabel: {
        active: 'Active',
        'on-leave': 'On leave',
        remote: 'Remote',
        terminated: 'Terminated',
      },
    },
  },
}

// ---------------------------------------------------------------------------
// Russian dictionary.
// ---------------------------------------------------------------------------

export const showcasesLocaleRu: ShowcasesLocale = {
  languageSwitcher: 'Язык',
  hubTitle: 'Витрины SkyGraph',
  hubLead:
    'Мини-приложения на @skygraph/react с тестовыми данными и настоящими компонентами. Фильтр по категориям или поиск.',
  searchPlaceholder: 'Поиск по названию, описанию или тегу…',
  noMatches: 'Ничего не подошло под фильтры.',
  back: '← К списку витрин',
  categories: {
    all: 'Все',
    data: 'Данные и таблицы',
    comms: 'Коммуникации',
    productivity: 'Продуктивность и админка',
    design: 'Дизайн и формы',
  },
  cards: {
    'table-kitchen-sink': {
      title: 'Таблица — полный набор',
      description:
        'Все возможности Table: сортировка, фильтры, группировка, дерево, виртуализация, drag-and-drop, инлайн-редактирование, экспорт, печать, клавиатура, агрегации, закрепление строк и другое.',
    },
    dashboard: {
      title: 'Операционный дашборд',
      description:
        'Живые KPI: сетка виджетов, drill-down таблицы и режим редактора раскладки. Тулбары на чартах, действия по виджетам, контекстное меню.',
    },
    crm: {
      title: 'CRM',
      description:
        'Таблицы контактов и сделок, канбан-воронка, дерево иерархии аккаунтов и ResourceCalendar дедлайнов с подсветкой конфликтов.',
    },
    helpdesk: {
      title: 'Хелпдеск — тикеты',
      description:
        'Очередь тикетов, сегменты по статусу, таймлайн переписки, ответы клиентов и создание тикета.',
    },
    chat: {
      title: 'Корпоративный мессенджер',
      description:
        'Каналы и ЛС, сообщения с реакциями и вложениями, поле ввода с @-упоминаниями и drawer участников.',
    },
    inbox: {
      title: 'Почтовый инбокс',
      description:
        'Поток писем с папками и метками, массовые действия, чтение треда в drawer и модалка составления.',
    },
    ecommerce: {
      title: 'Админка e-commerce',
      description:
        'Галерея товаров (сетка/список), карусель изображений, заказы, клиенты, возвраты.',
    },
    'hr-portal': {
      title: 'HR-портал',
      description:
        'Каталог сотрудников, орг-дерево, календарь отпусков, онбординг, ревью и назначение в команды.',
    },
    'file-manager': {
      title: 'Файловый менеджер',
      description:
        'Дерево каталогов, вид сетка/список, хлебные крошки, загрузка, drawer предпросмотра, модалки «поделиться» и переименования.',
    },
    admin: {
      title: 'Права и роли',
      description:
        'Пользователи, журнал аудита, перенос ролей, API-ключи, сессии и системные настройки в одной панели.',
    },
    'workflow-editor': {
      title: 'Редактор процессов',
      description:
        'Блок-схема на GraphEngine: перетаскивание узлов, тип маршрутизации, добавление рёбер и инспектор.',
    },
    forms: {
      title: 'Песочница форм',
      description:
        'Все контролы формы: валидация, мастер, динамические массивы полей, реальные раскладки.',
    },
  },
  apps: {
    chat: {
      inbox: 'Входящие',
      searchConversations: 'Поиск диалогов...',
      noMatches: 'Ничего не найдено',
      selectConversation: 'Выберите диалог',
      noMessages: 'Сообщений пока нет',
      channelMembers: (n) => `${n} участников`,
      online: 'В сети',
      offline: 'Не в сети',
      pinTooltip: 'Закрепить диалог',
      muteNotifications: 'Отключить уведомления',
      leaveConversation: 'Выйти из диалога',
      mutedToast: 'Отключено',
      leftToast: 'Вы покинули диалог',
      detailsButton: 'Детали',
      membersHeading: (n) => `Участники (${n})`,
      activityHeading: 'Активность',
      pinnedSuffix: 'закреплено',
      composerPlaceholder: 'Введите сообщение — @ для упоминания…',
      sendButton: 'Отправить',
    },
    inbox: {
      composeButton: 'Написать',
      labelsHeading: 'МЕТКИ',
      searchPlaceholder: 'Поиск писем…',
      selectedSuffix: 'выбрано',
      countInFolder: (count, folder) => `${count} в папке ${folder}`,
      noMessages: 'Нет писем',
      unstar: 'Снять отметку',
      star: 'Отметить',
      archiveTooltip: 'Архив',
      spamTooltip: 'Спам',
      trashTooltip: 'Корзина',
      starred: 'избранное',
      important: 'важно',
      archive: 'В архив',
      spam: 'Пометить как спам',
      delete: 'Удалить',
      reply: 'Ответить',
      unstarBtn: 'Снять отметку',
      starBtn: 'В избранное',
      composeTitle: 'Новое письмо',
      fieldTo: 'Кому',
      fieldSubject: 'Тема',
      fieldBody: 'Сообщение',
      toPlaceholder: 'recipient@example.com',
      discard: 'Отменить',
      saveDraft: 'В черновики',
      send: 'Отправить',
      emailSent: (to) => `Письмо отправлено на ${to}`,
      movedToast: (count, to) => `Перемещено ${count} в «${to}»`,
      messageTo: (recipients) => `кому: ${recipients}`,
      messageCc: (recipients) => `копия: ${recipients}`,
      folders: {
        inbox: 'Входящие',
        starred: 'Избранное',
        sent: 'Отправленные',
        drafts: 'Черновики',
        archive: 'Архив',
        spam: 'Спам',
        trash: 'Корзина',
      },
      drawerActionMenu: {
        archive: 'В архив',
        spam: 'Пометить как спам',
        delete: 'Удалить',
      },
    },
    helpdesk: {
      stats: {
        open: 'Открытые',
        openSub: 'ждут агента',
        pending: 'В ожидании',
        pendingSub: 'ждём клиента',
        urgent: 'Срочные',
        urgentSub: 'P1 / P2',
        resolved: 'Решённые',
        resolvedSub: 'за период',
      },
      searchPlaceholder: 'Поиск по теме, клиенту, исполнителю…',
      filters: {
        all: 'Все',
        open: 'Открытые',
        pending: 'В ожидании',
        urgent: 'Срочные',
        resolved: 'Решённые',
      },
      views: {
        table: 'Таблица',
        queue: 'Очередь',
      },
      newTicket: '+ Новый тикет',
      noTickets: 'Тикетов нет',
      noTicketsInColumn: 'Тикетов нет',
      columns: {
        id: 'ID',
        subject: 'Тема',
        customer: 'Клиент',
        assignee: 'Исполнитель',
        priority: 'Приоритет',
        status: 'Статус',
        updated: 'Обновлён',
      },
      rowActions: {
        open: 'Открыть',
        resolve: 'Решено',
        close: 'Закрыть',
      },
      groupBy: {
        status: 'Статус',
        priority: 'Приоритет',
        assignee: 'Исполнитель',
        product: 'Продукт',
      },
      drawer: {
        resolveTitle: 'Отметить как решено?',
        resolveBtn: 'Решено',
        customer: 'Клиент',
        assignee: 'Исполнитель',
        channel: 'Канал',
        product: 'Продукт',
        created: 'Создан',
        updated: 'Обновлён',
        conversationHeading: (n) => `Переписка (${n})`,
        replyPlaceholder: 'Ответ клиенту…',
        clear: 'Очистить',
        sendReply: 'Отправить ответ',
      },
      newTicketModal: {
        title: 'Новый тикет в поддержку',
        subject: 'Тема',
        description: 'Описание',
        priority: 'Приоритет',
        product: 'Продукт',
        customer: 'Клиент',
        email: 'Email',
        cancel: 'Отмена',
        create: 'Создать',
      },
      toasts: {
        statusUpdate: (id, status) => `${id} → ${status}`,
        replySent: 'Ответ отправлен',
        ticketCreated: (id) => `Тикет ${id} создан`,
      },
      statusLabel: {
        new: 'новый',
        open: 'открыт',
        pending: 'в ожидании',
        resolved: 'решён',
        closed: 'закрыт',
      },
      priorityLabel: {
        low: 'низкий',
        medium: 'средний',
        high: 'высокий',
        urgent: 'срочный',
      },
      authorRoleLabel: {
        agent: 'агент',
        customer: 'клиент',
        system: 'система',
      },
      youAgent: 'Вы (агент)',
    },
    dashboard: {
      title: 'Операционный дашборд',
      lead: 'Живые метрики по веб-сервисам, API и инфраструктуре. Drill-down по KPI или редактор раскладки.',
      modes: {
        operations: 'Операции',
        drilldown: 'Drill-down',
        editor: 'Редактор раскладки',
      },
      printTable: 'Печать таблицы',
      exportButton: 'Экспорт',
      exportToast: 'Отчёт экспортирован',
      exportToastSub: 'CSV сохранён в загрузках.',
      stats: {
        revenue: 'Выручка',
        revenueSub: (icon, pct) => `${icon} ${pct} к пред. периоду`,
        orders: 'Заказы',
        ordersSub: (perDay) => `${perDay} в день`,
        signups: 'Регистрации',
        signupsSub: 'уникальные пользователи',
        active: 'Активные сейчас',
        activeSub: 'за 5 минут',
      },
      widgets: {
        revenueTitle: 'Тренд выручки',
        revenueHint: (total) => `${total} всего`,
        countriesTitle: 'Топ стран',
        countriesHint: (count) => `${count} регионов`,
        ordersTitle: 'Заказы и регистрации',
        ordersHint: (count) => `${count} заказов`,
        activeTitle: 'Активные пользователи',
        activeHint: (now) => `${now} сейчас`,
        healthTitle: 'Состояние сервисов',
        healthHint: (count) => `${count} сервисов`,
        activityTitle: 'Последняя активность',
        activityHint: 'за последний час',
      },
      widgetActions: {
        refresh: 'Обновить',
        exportPng: 'Экспорт PNG',
        pinToTop: 'Закрепить сверху',
      },
      widgetToasts: {
        refreshed: (id) => `Обновлено ${id}`,
        exportQueued: (id) => `Экспорт «${id}» поставлен в очередь`,
        pinned: (id) => `Закреплено ${id}`,
        nodeContext: (id) => `Правый клик по виджету «${id}» — контекстное меню откроется здесь`,
        canvasContext: 'Правый клик по фону — открыл бы «Добавить виджет…»',
        refreshShort: (id) => `Обновить «${id}»`,
        settings: (id) => `Настройки «${id}»`,
        removed: (id) => `Удалён «${id}»`,
      },
      drilldown: {
        overview: 'Обзор (по дням)',
        channels: 'Каналы',
        products: 'Топ товаров',
        overviewHint: (icon, pct) =>
          `Тренд: ${icon} ${pct}% по выручке к пред. полупериоду. Правый клик по заголовкам/ячейкам — контекстные меню. Попробуйте Group-by.`,
        columns: {
          date: 'Дата',
          revenue: 'Выручка',
          orders: 'Заказы',
          visitors: 'Посетители',
          conversion: 'Конверсия',
          aov: 'AOV',
          newCustomers: 'Новые',
          returning: 'Вернулись',
        },
        channelsTable: {
          summaryTitle: 'Сводка по каналам',
          totalVisitors: 'Всего посетителей',
          totalRevenue: 'Всего выручки',
          topChannel: 'Топ канал',
          topChannelValue: 'Organic Search',
          bestConversion: 'Лучшая конверсия',
          bestConversionValue: 'Email (5.2%)',
          channel: 'Канал',
          visitors: 'Посетители',
          revenue: 'Выручка',
          conversion: 'Конверсия',
          trend: 'Тренд',
          trendUp: 'Рост',
          trendFlat: 'Без изменений',
          trendDown: 'Падение',
        },
        productsTable: {
          product: 'Товар',
          unitsSold: 'Продано',
          revenue: 'Выручка',
          rating: 'Рейтинг',
          returnRate: 'Возвраты',
        },
        groupedReturning: 'Вернулись',
        groupedOrders: 'Заказы',
      },
      drawers: {
        dayDetailsTitle: (date) => `Детали дня — ${date}`,
        date: 'Дата',
        revenue: 'Выручка',
        orders: 'Заказы',
        visitors: 'Посетители',
        conversion: 'Конверсия',
        aov: 'AOV',
        newCustomers: 'Новые клиенты',
        returning: 'Вернувшиеся',
        revenuePerformance: 'Эффективность выручки',
        conversionRate: 'Уровень конверсии',
        channel: 'Канал',
        revenuePerVisitor: 'Выручка/посетитель',
        trafficShare: 'Доля трафика',
        revenueShare: 'Доля выручки',
        product: 'Товар',
        avgPrice: 'Средняя цена',
        rating: 'Рейтинг',
        returnRateLabel: 'Возвраты',
        ratingHeading: 'Рейтинг',
        returnRateHealth: 'Здоровье возвратов',
      },
      empty: {
        noServices: 'Сервисов нет',
        noDataInPeriod: 'Нет данных за период',
      },
      serviceMenu: {
        restart: 'Перезапустить',
        viewLogs: 'Логи',
        silence: 'Заглушить алерты',
      },
      serviceToast: (action, name) => `${action}: ${name}`,
      healthLabel: {
        healthy: 'здоров',
        degraded: 'деградирует',
        down: 'упал',
      },
      activityType: {
        alert: 'алерт',
        deploy: 'деплой',
        edit: 'правка',
        login: 'вход',
      },
      trendLabel: {
        up: 'рост',
        flat: 'без изменений',
        down: 'падение',
      },
      detailsBtn: 'Подробнее',
      drilldownLead: (icon, pct) =>
        `Тренд: ${icon} ${pct}% изменение выручки vs прошлый полупериод. Контекстные меню по ПКМ на заголовках/ячейках. Попробуйте панель Group-by.`,
      channelTopValue: 'Органический поиск',
      channelBestConvValue: 'Email (5.2%)',
      exportToastTitle: 'Отчёт выгружен',
    },
    fileManager: {
      emptyFolder: 'В этой папке пусто',
      rootName: 'Мои файлы',
      storage: 'Хранилище: 142 ГБ из 200 ГБ',
      searchPlaceholder: 'Поиск файлов…',
      shortcutHint: '⌘+F поиск · Del удалить',
      shortcutHintTitle: '↑↓ для навигации, Enter — открыть',
      views: {
        grid: 'Сетка',
        list: 'Список',
        recent: 'Недавние',
      },
      upload: 'Загрузить',
      uploadDone: 'Файл загружен (mock)',
      recentSubtitle: (n) => `${n} недавно изменённых файлов`,
      noContents: (name) => `Нет содержимого для ${name}`,
      table: {
        name: 'Имя',
        size: 'Размер',
        type: 'Тип',
        modified: 'Изменён',
        preview: 'Просмотр',
        open: 'Открыть',
        delete: 'Удалить',
        deleteConfirm: (name) => `Удалить «${name}»?`,
        deleted: (name) => `Удалено ${name} (mock)`,
      },
      preview: {
        notAvailable: (type) => `Просмотр недоступен для ${type}`,
        typeLabel: 'Тип:',
        sizeLabel: 'Размер:',
        modifiedLabel: 'Изменён:',
        pathLabel: 'Путь:',
        download: 'Скачать',
        share: 'Поделиться',
        rename: 'Переименовать',
        deleteConfirm: (name) => `Удалить «${name}»?`,
        deleteToast: 'Удалено (mock)',
        readable: 'читаемый',
        large: 'большой',
        downloading: (name) => `Скачивается ${name}`,
      },
      rename: {
        title: 'Переименовать файл',
        cancel: 'Отмена',
        submit: 'Переименовать',
        toast: (newName) => `Переименовано в ${newName} (mock)`,
      },
      share: {
        title: (name) => `Поделиться — ${name}`,
        done: 'Готово',
        description: 'Любой по ссылке может просмотреть этот файл.',
        copy: 'Копировать',
        copied: 'Ссылка скопирована',
        permissionLabel: 'Права:',
        permView: 'Только просмотр',
        permComment: 'Комментирование',
        permEdit: 'Редактирование',
      },
    },
    workflowEditor: {
      paletteTitle: 'Палитра',
      paletteHint: 'Кликните по фигуре, чтобы добавить узел, потом перетащите его на холст.',
      statsTitle: 'Статистика',
      nodesLabel: 'узлов',
      edgesLabel: 'связей',
      routing: {
        straight: 'Прямые',
        orthogonal: 'Ортогональные',
      },
      selection: {
        single: 'Одиночный',
        multi: 'Мульти (⌃-click)',
        lasso: 'Лассо',
      },
      selectedTag: (n) => `${n} выбрано`,
      deleteSelected: 'Удалить выбранные',
      deleteSelectedConfirm: (n) => `Удалить ${n} выбранных узлов?`,
      lockLayout: 'Заблокировать раскладку',
      unlockLayout: 'Разблокировать раскладку',
      addEdge: '+ Связь',
      addNode: '+ Узел',
      resetTemplate: 'Сброс',
      resetConfirm: 'Сбросить к шаблону?',
      inspector: {
        title: 'Инспектор',
        selectNode: 'Выберите узел',
        id: 'ID',
        kind: 'Тип',
        position: 'Позиция',
        outgoing: 'Исходящие',
        incoming: 'Входящие',
        label: 'Подпись',
        apply: 'Применить',
        delete: 'Удалить узел',
        deleteConfirm: (name) => `Удалить «${name}»?`,
      },
      modals: {
        addTitle: 'Добавить узел',
        labelField: 'Подпись',
        labelPlaceholder: 'Опишите шаг',
        kindField: 'Тип',
        cancel: 'Отмена',
        add: 'Добавить',
        edgeTitle: 'Соединить узлы',
        fromField: 'Откуда',
        fromPlaceholder: 'Исходный узел',
        toField: 'Куда',
        toPlaceholder: 'Целевой узел',
        edgeLabel: 'Подпись',
        edgeLabelPlaceholder: 'да / нет / ...',
        connect: 'Соединить',
      },
      contextMenu: {
        rename: '✎ Переименовать',
        duplicate: '⎘ Дублировать',
        delete: '✕ Удалить',
        addNode: '+ Новый узел',
        addEdge: '+ Новая связь',
      },
      nodeActions: {
        rename: 'Переименовать',
        duplicate: 'Дублировать',
        delete: 'Удалить',
      },
      edgeActions: {
        remove: 'Удалить связь',
      },
      toasts: {
        renamed: (label) => `Переименовано в «${label}»`,
        deletedNode: (id) => `Удалён узел ${id}`,
        addedNode: (label) => `Добавлен «${label}»`,
        pickEnds: 'Выберите источник и цель',
        differentEnds: 'Источник и цель должны различаться',
        connected: (from, to) => `Соединено ${from} → ${to}`,
        reset: 'Workflow сброшен к шаблону',
        duplicated: (label) => `Дублировано «${label}»`,
        removedEdge: (id) => `Удалена связь ${id}`,
        bulkRemoved: (n) => `Удалено ${n} узлов`,
        deletedShort: (id) => `Удалено ${id}`,
      },
      kindLabel: {
        start: 'старт',
        task: 'задача',
        decision: 'решение',
        end: 'конец',
      },
    },
    forms: {
      tabs: {
        basic: 'Базовые',
        validation: 'Валидация',
        layouts: 'Раскладки',
        dynamic: 'Динамические',
        schema: 'Схема (мастер)',
      },
      basic: {
        sections: {
          textInputs: 'Текстовые поля',
          inputGroup: 'Input Group',
          selection: 'Выбор',
          toggleRange: 'Переключатели и диапазоны',
          dateTime: 'Дата и время',
          specialised: 'Специализированные поля',
        },
        labels: {
          input: 'Input',
          passwordStrength: 'Пароль + сила',
          searchInput: 'Search Input',
          inputNumber: 'InputNumber',
          textarea: 'Textarea',
          protocolAddon: 'С аддоном протокола',
          unitAddon: 'С аддоном единиц',
          select: 'Select',
          autoComplete: 'AutoComplete',
          segmented: 'Segmented',
          radioGroup: 'RadioGroup',
          checkbox: 'Checkbox',
          switch: 'Switch',
          sliderValue: (v) => `Slider (${v})`,
          rate: 'Rate',
          datePicker: 'DatePicker',
          rangePicker: 'RangePicker',
          timePicker: 'TimePicker',
          colorPicker: 'ColorPicker',
          tagInput: 'TagInput (макс. 8 тегов)',
          pinInputDigits: 'PinInput (6 цифр)',
          pinInputMasked: 'PinInput (маска, 4 знака)',
          inlineEdit: 'InlineEdit',
        },
        placeholders: {
          basic: 'Обычное текстовое поле',
          password: 'Введите пароль',
          multiLine: 'Многострочный текст...',
          example: 'example.com',
          weight: 'Вес',
          chooseOption: 'Выберите вариант',
          autoEmail: 'Введите имя email',
          pickDate: 'Выберите дату',
          pickTime: 'Выберите время',
          tagInput: 'Введите и нажмите Enter...',
        },
        options: {
          alpha: 'Вариант Alpha',
          beta: 'Вариант Beta',
          gamma: 'Вариант Gamma',
          disabled: 'Заблокированный',
          a: 'Вариант A',
          b: 'Вариант B',
          c: 'Вариант C',
          disabledRadio: 'Заблокирован',
          daily: 'дневной',
          weekly: 'недельный',
          monthly: 'месячный',
        },
        enabled: 'Включено',
        disabledLabel: 'Выключено',
        agreeTerms: 'Согласен с условиями',
        selectAll: 'Выбрать все',
        on: 'ВКЛ',
        off: 'ВЫКЛ',
        inlineDefault: 'Кликните, чтобы редактировать',
        inlineNoButtons: 'Без кнопок',
        inlineDisabled: 'Редактирование выключено',
        toasts: {
          searching: (q) => `Поиск: «${q}»`,
          pinComplete: (v) => `PIN введён: ${v}`,
          saved: (v) => `Сохранено: «${v}»`,
        },
      },
      validation: {
        sections: {
          rules: 'Правила и фидбэк',
          authForms: 'Шаблоны форм авторизации',
        },
        rulesLead:
          'Валидация в реальном времени: правила, предупреждения, иконки фидбэка и режимы триггеров.',
        fields: {
          username: 'Имя пользователя',
          usernameRequired: 'Обязательное поле',
          usernameMin: 'Минимум 3 символа',
          usernameMax: 'Максимум 20 символов',
          usernamePattern: 'Только буквы, цифры и подчёркивание',
          usernamePlaceholder: 'john_doe',
          email: 'Email',
          emailRequired: 'Обязательное поле',
          emailInvalid: 'Неверный формат email',
          emailPlaceholder: 'user@example.com',
          password: 'Пароль',
          passwordRequired: 'Обязательное поле',
          passwordMin: 'Минимум 8 символов',
          passwordPlaceholder: 'Надёжный пароль',
          age: 'Возраст',
          ageRange: 'От 18 до 120',
          agePlaceholder: 'Ваш возраст',
          website: 'Сайт',
          websiteUrl: 'Введите корректный URL',
          websiteHelp: 'Включая https://',
          websitePlaceholder: 'yoursite.com',
          role: 'Роль',
          rolePick: 'Выберите роль',
          rolePlaceholder: 'Выберите роль',
          bio: 'О себе',
          bioMax: 'Максимум 200 символов',
          bioWarn: 'Чем длиннее, тем лучше других о вас узнают',
          bioExtra: 'Расскажите о себе',
          bioPlaceholder: 'Несколько слов о вас...',
          agree: 'Согласен с пользовательским соглашением',
          agreeRequired: 'Необходимо согласие',
        },
        submit: 'Отправить',
        reset: 'Сброс',
        submittedToast: 'Форма отправлена!',
        roleOptions: {
          developer: 'Разработчик',
          designer: 'Дизайнер',
          manager: 'Менеджер',
          qa: 'QA-инженер',
        },
        auth: {
          modes: {
            login: 'Вход',
            register: 'Регистрация',
            forgot: 'Восстановление',
          },
          brand: 'SkyGraph',
          loginEmail: 'Email',
          loginPassword: 'Пароль',
          loginEmailPlaceholder: 'you@email.com',
          loginPasswordPlaceholder: 'Ваш пароль',
          rememberMe: 'Запомнить меня',
          forgotLink: 'Забыли пароль?',
          signIn: 'Войти',
          loginToast: 'Вход выполнен (mock)',
          registerToast: 'Регистрация прошла (mock)',
          firstName: 'Имя',
          lastName: 'Фамилия',
          firstNamePlaceholder: 'Иван',
          lastNamePlaceholder: 'Петров',
          regEmailPlaceholder: 'jane@example.com',
          regPasswordPlaceholder: 'Минимум 8 символов',
          agreeTerms: 'Согласен с правилами и политикой конфиденциальности',
          agreeRequired: 'Обязательно',
          createAccount: 'Создать аккаунт',
          forgotLead: 'Введите email — мы отправим ссылку для восстановления.',
          sendReset: 'Отправить ссылку',
          backToLogin: '← Назад к входу',
          resetToast: 'Ссылка отправлена (mock)',
        },
      },
      layouts: {
        layoutLabel: 'Раскладка',
        sizeLabel: 'Размер',
        requiredMarkLabel: 'Метка обязательного поля',
        requiredOptions: {
          show: 'Показывать',
          optional: 'Опционально',
          hide: 'Скрывать',
        },
        fields: {
          firstName: 'Имя',
          lastName: 'Фамилия',
          department: 'Отдел',
          active: 'Активен',
        },
        placeholders: {
          first: 'Иван',
          last: 'Петров',
          select: 'Выберите...',
        },
        deptOptions: {
          eng: 'Разработка',
          design: 'Дизайн',
          marketing: 'Маркетинг',
        },
        save: 'Сохранить',
        reset: 'Сброс',
        submittedToast: 'Отправлено',
      },
      dynamic: {
        sections: {
          lists: 'Динамические списки полей',
          playground: 'Интерактивная песочница',
        },
        teamLead:
          'Добавляйте и удаляйте поля динамически. У каждой записи участника своя валидация.',
        teamName: 'Название команды',
        teamNamePlaceholder: 'Название команды',
        membersHeading: (n) => `Участники (${n})`,
        addMember: '+ Добавить участника',
        namePlaceholder: 'Имя',
        emailPlaceholder: 'Email',
        nameRequired: 'Имя обязательно',
        emailInvalid: 'Неверный email',
        roles: {
          developer: 'Разработчик',
          designer: 'Дизайнер',
          pm: 'PM',
          qa: 'QA',
        },
        saveTeam: 'Сохранить команду',
        reset: 'Сброс',
        teamSavedToast: 'Команда сохранена!',
        playground: {
          otpHeading: 'OTP-верификация',
          otpLead: 'Введите 6-значный код, отправленный на ваш email.',
          otpProgress: (entered, total) => `Введено ${entered}/${total} цифр`,
          otpVerified: 'Подтверждено!',
          otpSuccess: 'Код подтверждён!',
          tryAgain: 'Ещё раз',
          searchHeading: 'Живой поиск',
          searchLead: 'Поиск по списку с мгновенными результатами.',
          searchPlaceholder: 'Поиск тем...',
          searchButton: 'Поиск',
          searchEmpty: 'Введите запрос и нажмите «Поиск»',
          passwordHeading: 'Проверка силы пароля',
          passwordLead: 'Попробуйте разные пароли, чтобы увидеть анализ силы в реальном времени.',
          weakLabel: 'Слабый пример',
          weakPlaceholder: 'Слабый пароль',
          mediumLabel: 'Средний пример',
          mediumPlaceholder: 'Средний пароль',
          strongLabel: 'Сильный пример',
          strongPlaceholder: 'Сильный пароль',
          tryYourOwnLabel: 'Попробуйте свой',
          tryYourOwnPlaceholder: 'Введите что-нибудь...',
        },
      },
      schema: {
        completedHeading: 'Регистрация завершена!',
        completedLead: (name, plan) =>
          `Добро пожаловать, ${name}! Ваш аккаунт на тарифе ${plan} создан.`,
        startOver: 'Начать заново',
        intro:
          'Многошаговая регистрация по схеме: у каждого шага своя структура данных и правила перехода, итоговый просмотр перед отправкой.',
        steps: {
          personal: 'Личное',
          professional: 'Профессия',
          preferences: 'Настройки',
          review: 'Просмотр',
        },
        fields: {
          fullName: 'Полное имя *',
          fullNamePh: 'Иван Петров',
          email: 'Email *',
          emailPh: 'jane@example.com',
          phone: 'Телефон',
          phonePh: '555 123 4567',
          company: 'Компания *',
          companyPh: 'Acme Inc.',
          position: 'Должность',
          positionPh: 'Senior Developer',
          skills: 'Навыки',
          skillsPh: 'Добавьте навыки (например, React, Node.js)',
          experience: 'Уровень опыта',
          experienceLevels: {
            junior: 'Junior',
            middle: 'Middle',
            senior: 'Senior',
            lead: 'Lead',
          },
          plan: 'Тариф',
          planOptions: {
            free: 'Free — базовые возможности',
            pro: 'Pro — все возможности, приоритетная поддержка',
            enterprise: 'Enterprise — кастомизация, SLA, выделенный менеджер',
          },
          notifications: 'Уведомления',
          notificationsHelp: 'Push и email-уведомления',
          newsletter: 'Рассылка',
          newsletterLabel: 'Подписаться на ежемесячную рассылку',
        },
        review: {
          personal: 'Личное',
          name: 'Имя',
          email: 'Email',
          phone: 'Телефон',
          professional: 'Профессия',
          company: 'Компания',
          position: 'Должность',
          skills: 'Навыки',
          experience: 'Опыт',
          preferences: 'Настройки',
          plan: 'Тариф',
          notifications: 'Уведомления',
          newsletter: 'Рассылка',
          enabled: '✓ Включено',
          disabled: '✕ Выключено',
          subscribed: '✓ Подписан',
          no: '✕ Нет',
        },
        back: '← Назад',
        next: 'Далее →',
        completeBtn: 'Завершить регистрацию',
        completedToast: 'Регистрация завершена!',
      },
    },
    hrPortal: {
      stats: {
        total: 'Всего сотрудников',
        activeRemote: 'Активные / Удалённые',
        onLeave: 'В отпуске',
        avgSalary: 'Средняя зарплата',
      },
      tabs: {
        directory: 'Каталог',
        org: 'Орг-схема',
        leave: 'Календарь отпусков',
        reviews: 'Ревью производительности',
        team: 'Назначение в команду',
        onboarding: 'Онбординг',
      },
      directory: {
        searchPlaceholder: 'Поиск сотрудников…',
        table: {
          employee: 'Сотрудник',
          department: 'Отдел',
          role: 'Должность',
          status: 'Статус',
          startDate: 'Дата выхода',
          salary: 'Зарплата',
        },
        views: {
          table: 'Таблица',
          cards: 'Карточки',
        },
      },
      org: {
        departmentSizes: 'Размеры отделов',
      },
      leave: {
        views: {
          calendar: 'Планировщик дорожек (ResourceCalendar)',
          table: 'Таблица заявок',
        },
        noOverlaps: 'Пересечений нет',
        overlapsCount: (n) => `Найдено пересечений: ${n}`,
        table: {
          employee: 'Сотрудник',
          type: 'Тип',
          from: 'С',
          to: 'По',
          status: 'Статус',
          approve: 'Одобрить',
          reject: 'Отклонить',
          groupByType: 'Тип отпуска',
          groupByStatus: 'Статус',
          typeFilters: {
            vacation: 'отпуск',
            sick: 'больничный',
            personal: 'личное',
            remote: 'удалённо',
          },
          statusFilters: {
            approved: 'одобрено',
            pending: 'в ожидании',
            rejected: 'отклонено',
          },
        },
        toasts: {
          approved: (name) => `Отпуск одобрен для ${name}`,
          rejected: (name) => `Отпуск отклонён для ${name}`,
        },
      },
      reviews: {
        filters: {
          all: 'Все',
          pending: 'В ожидании',
          draft: 'Черновик',
          completed: 'Завершено',
        },
        avgOverall: (avg) => `Средняя оценка: ${avg}`,
        overall: 'Общая',
        tech: 'Тех.',
        collab: 'Командная',
        leadAbbr: 'Лидерство',
        delivery: 'Доставка',
        reviewer: 'Ревьюер',
        drawer: {
          period: 'Период',
          reviewer: 'Ревьюер',
          overall: 'Общая',
          score: 'Балл',
          breakdown: 'Разбор компетенций',
          technical: 'Технические навыки',
          collaboration: 'Командная работа',
          leadership: 'Лидерство',
          delivery: 'Доставка',
          goals: 'Цели',
          highlights: 'Сильные стороны',
          improvements: 'Зоны для роста',
          exportPdf: 'Экспорт PDF',
          complete: 'Завершить ревью',
        },
      },
      team: {
        heading: 'Назначить сотрудников на проект Alpha',
        assignedTag: (n) => `Назначено: ${n}`,
        available: 'Доступные',
        assigned: 'Назначенные',
      },
      onboarding: {
        steps: {
          personal: 'Личное',
          equipment: 'Оборудование',
          training: 'Обучение',
        },
        panels: {
          personal: 'Личная информация',
          equipment: 'Оборудование и доступы',
          training: 'План обучения',
        },
        fields: {
          fullName: 'Полное имя',
          fullNamePh: 'Иван Петров',
          email: 'Email',
          emailPh: 'john@company.com',
          department: 'Отдел',
          deptPh: 'Выберите отдел',
          role: 'Должность',
          rolePh: 'Frontend Developer',
          startDate: 'Дата выхода',
          datePh: 'Выберите дату',
          salary: 'Зарплата',
          salaryPh: '50000',
        },
        continueEquipment: 'Далее → Оборудование',
        continueTraining: 'Далее → Обучение',
        completeBtn: 'Завершить онбординг',
        equipmentList: {
          laptop: '✓ Ноутбук выдан',
          email: '✓ Email-ящик создан',
          vpn: '✓ Доступ к VPN выдан',
          slack: '○ Приглашение в Slack/Teams',
          github: '○ Добавлен в GitHub-организацию',
        },
        equipmentLead: 'Чек-лист подготовки:',
        trainingPlan: {
          week1: 'Неделя 1: Знакомство и культура компании',
          week2: 'Неделя 2: Командные процессы и инструменты',
          week3: 'Неделя 3: Глубокое погружение в продукт',
          week4: 'Неделя 4: Первое задание',
        },
        toasts: {
          personalSaved: 'Личные данные сохранены (mock)',
          complete: 'Онбординг завершён!',
        },
      },
      statusLabel: {
        active: 'активен',
        'on-leave': 'в отпуске',
        remote: 'удалённо',
        terminated: 'уволен',
      },
      reviewStatusLabel: {
        pending: 'в ожидании',
        draft: 'черновик',
        completed: 'завершено',
      },
      leaveTypeLabel: {
        vacation: 'отпуск',
        sick: 'больничный',
        personal: 'личное',
        remote: 'удалённо',
      },
      leaveStatusLabel: {
        approved: 'одобрено',
        pending: 'в ожидании',
        rejected: 'отклонено',
      },
    },
    admin: {
      stats: {
        total: 'Всего пользователей',
        totalSub: (active) => `${active} активных`,
        admins: 'Администраторы',
        adminsSub: (n) => `${n} ролей определено`,
        twoFa: 'Покрытие 2FA',
        critical: 'Критичные события',
        criticalSub: 'за 14 дней',
      },
      tabs: {
        users: 'Пользователи',
        sessions: 'Активные сессии',
        apiKeys: 'API-ключи',
        audit: 'Журнал аудита',
        roles: 'Контроль доступа',
        settings: 'Настройки',
      },
      users: {
        searchPlaceholder: 'Поиск пользователей…',
        selectedTag: (n) => `Выбрано: ${n}`,
        bulkSuspendConfirm: (n) => `Заблокировать ${n} пользователей?`,
        bulkSuspend: 'Массовая блокировка',
        bulkSuspendToast: (n) => `Заблокировано ${n} пользователей (mock)`,
        viewBtn: 'Открыть',
        createBtn: '+ Создать пользователя',
        columns: {
          user: 'Пользователь',
          role: 'Роль',
          status: 'Статус',
          department: 'Отдел',
          twoFa: '2FA',
          lastLogin: 'Последний вход',
          logins: 'Входы',
        },
        rowMenu: {
          edit: 'Редактировать',
          reset: 'Сбросить пароль',
          suspend: 'Заблокировать',
          activate: 'Активировать',
          delete: 'Удалить пользователя',
        },
        drawer: {
          email: 'Email',
          department: 'Отдел',
          lastLogin: 'Последний вход',
          created: 'Создан',
          loginCount: 'Количество входов',
          twoFaEnabled: '2FA включена',
          yes: 'Да',
          no: 'Нет',
          permissionsHeading: (n) => `Права (${n})`,
          activityHeading: 'Последняя активность',
          edit: 'Редактировать',
          resetPassword: 'Сбросить пароль',
          suspend: 'Заблокировать',
          suspendConfirm: 'Заблокировать пользователя?',
          suspendedToast: (name) => `${name} заблокирован (mock)`,
          resetSentToast: 'Письмо для сброса пароля отправлено (mock)',
        },
        createTitle: 'Создать нового пользователя',
        createToast: 'Пользователь создан (mock)',
        editTitle: (name) => `Редактирование — ${name}`,
        editToast: 'Пользователь обновлён (mock)',
        submitCreate: 'Создать пользователя',
        submitSave: 'Сохранить изменения',
        groupBy: {
          role: 'Роль',
          department: 'Отдел',
          status: 'Статус',
        },
      },
      audit: {
        severityAll: 'Все уровни',
        severityInfo: 'Инфо',
        severityWarning: 'Предупреждение',
        severityCritical: 'Критическое',
        columns: {
          time: 'Время',
          user: 'Пользователь',
          action: 'Действие',
          target: 'Цель',
          ip: 'IP-адрес',
        },
        expanded: {
          details: 'Детали',
          severity: 'Уровень',
          ip: 'IP',
          timestamp: 'Время',
        },
        exportToast: 'Экспорт журнала (mock)',
        exportBtn: 'Экспорт CSV',
      },
      roles: {
        newRole: '+ Новая роль',
        newRoleToast: 'Мастер создания роли (mock)',
        permissionsLabel: (n) => `прав: ${n}`,
        usersLabel: (n) => `пользователей: ${n}`,
        editPermissions: 'Изменить права',
        editPermissionsTitle: (name) => `Изменение прав — ${name}`,
        cancel: 'Отмена',
        save: 'Сохранить',
        available: 'Доступные',
        granted: 'Выданные',
        saveToast: (name, n) => `Обновлено ${name} с ${n} правами (mock)`,
      },
      settings: {
        placeholder: '',
        updateToast: (key) => `Настройка «${key}» обновлена (mock)`,
      },
      apiKeys: {
        searchPlaceholder: 'Поиск ключей…',
        createBtn: '+ Создать ключ',
        columns: {
          name: 'Имя ключа',
          token: 'Токен',
          owner: 'Владелец',
          scopes: 'Скоупы',
          rate: (perMinute) => `${perMinute}/мин`,
          rateTitle: 'Лимит',
          lastUsed: 'Последнее использование',
          expires: 'Действует до',
          status: 'Статус',
        },
        rotate: 'Ротация',
        rotateToast: (name) => `Ротация ${name} (mock)`,
        revoke: 'Отозвать',
        revokeConfirm: 'Отозвать этот API-ключ?',
        revokedToast: (name) => `${name} отозван`,
        createTitle: 'Создать API-ключ',
        keyName: 'Имя ключа',
        keyNamePh: 'Production Backend',
        scopesLabel: 'Скоупы',
        scopesPh: 'Выберите скоупы',
        rateLabel: 'Лимит запросов (req/мин)',
        ratePh: '100',
        cancel: 'Отмена',
        generate: 'Сгенерировать',
        createdTitle: 'API-ключ создан',
        createdWarning:
          '⚠️ Скопируйте этот ключ сейчас — по соображениям безопасности он больше не будет показан.',
        copy: 'Копировать',
        copiedToast: 'Скопировано в буфер обмена',
        confirmedBtn: 'Я скопировал ключ',
      },
      sessions: {
        searchPlaceholder: 'Поиск по пользователю, IP, локации…',
        terminateAllBtn: 'Завершить все остальные',
        terminateAllConfirm: 'Завершить ВСЕ остальные сессии? Вы останетесь авторизованы.',
        terminateAllToast: 'Все остальные сессии завершены',
        columns: {
          user: 'Пользователь',
          device: 'Устройство',
          location: 'Локация',
          ip: 'IP',
          started: 'Начало',
          lastActive: 'Последняя активность',
          current: '',
        },
        currentTag: 'Текущая',
        youBtn: 'Это вы',
        terminate: 'Завершить',
        terminateConfirm: (user) => `Завершить сессию для ${user}?`,
        terminatedToast: (id) => `Сессия ${id} завершена`,
      },
      userForm: {
        fullName: 'Полное имя',
        fullNamePh: 'Иван Петров',
        email: 'Email',
        emailPh: 'john@company.io',
        department: 'Отдел',
        deptPh: 'Выберите отдел',
        role: 'Роль',
        rolePh: 'Выберите роль',
        status: 'Статус',
        statusOptions: {
          active: 'Активный',
          suspended: 'Заблокирован',
          pending: 'Ожидает',
          deactivated: 'Деактивирован',
        },
        twoFa: 'Требовать 2FA',
        cancel: 'Отмена',
      },
      roleLabel: {
        admin: 'админ',
        editor: 'редактор',
        viewer: 'наблюдатель',
        moderator: 'модератор',
        support: 'поддержка',
      },
      statusLabel: {
        active: 'активен',
        suspended: 'заблокирован',
        pending: 'ожидает',
        deactivated: 'деактивирован',
      },
      apiKeyStatusLabel: {
        active: 'активен',
        revoked: 'отозван',
        expired: 'истёк',
      },
    },
    crm: {
      stats: {
        contacts: 'Всего контактов',
        contactsSub: (n) => `${n} клиентов`,
        pipeline: 'Сумма воронки',
        pipelineSub: (n) => `${n} активных сделок`,
        won: 'Выигранная выручка',
        wonSub: (n) => `${n} сделок закрыто`,
        avgDeal: 'Средний размер сделки',
        avgDealSub: (rate) => `win rate ${rate}%`,
        lifetime: 'Общая выручка',
        lifetimeSub: 'lifetime value',
      },
      tabs: {
        leads: 'Лиды',
        contacts: 'Контакты',
        deals: 'Сделки',
        pipeline: 'Воронка (Канбан)',
        hierarchy: 'Иерархия',
        deadlines: 'Дедлайны',
        activity: 'Активность',
      },
      leads: {
        searchPlaceholder: 'Поиск лидов…',
        cards: {
          total: 'Всего лидов',
          newLeads: 'Новые лиды',
          qualified: 'Квалифицированные проспекты',
          conversion: 'Конверсия Лид → Проспект',
        },
        filterAll: (n) => `Все (${n})`,
        filterLeads: 'Лиды',
        filterProspects: 'Проспекты',
        viewBtn: 'Открыть',
        addLead: '+ Добавить лида',
        columns: {
          lead: 'Лид',
          company: 'Компания',
          stage: 'Этап',
          potential: 'Потенциал',
          lastContact: 'Последний контакт',
        },
        rowActions: {
          edit: 'Редактировать',
          convert: 'Конвертировать в клиента',
          sendEmail: 'Отправить email',
        },
        editTitle: (name) => `Редактирование — ${name}`,
        addLeadTitle: 'Добавить лида',
        convertTitle: (name) => `Конвертировать «${name}» в клиента?`,
        convertText: 'Лид перейдёт в таблицу контактов как активный клиент.',
        convertOk: 'Конвертировать',
        savedToast: 'Лид сохранён (mock)',
        convertedToast: (name) => `${name} конвертирован в клиента (mock)`,
      },
      contacts: {
        searchPlaceholder: 'Поиск контактов…',
        selectedTag: (n) => `Выбрано: ${n}`,
        bulkEmailConfirm: (n) => `Отправить массовое письмо ${n} контактам?`,
        bulkEmail: 'Массовая рассылка',
        bulkEmailToast: (n) => `Отправлено ${n} контактам (mock)`,
        bulkDeleteConfirm: (n) => `Удалить ${n} контактов?`,
        bulkDelete: 'Массовое удаление',
        bulkDeleteToast: (n) => `Удалено ${n} контактов (mock)`,
        addContact: '+ Добавить контакт',
        addContactTitle: 'Добавить контакт',
        columns: {
          contact: 'Контакт',
          company: 'Компания',
          phone: 'Телефон',
          status: 'Статус',
          revenue: 'Выручка',
          lastContact: 'Последний контакт',
        },
        rowActions: {
          edit: 'Редактировать',
          sendEmail: 'Отправить email',
          createDeal: 'Создать сделку',
          delete: 'Удалить',
        },
        editTitle: (name) => `Редактирование — ${name}`,
        updatedToast: 'Контакт обновлён (mock)',
        createdToast: 'Контакт создан (mock)',
        submitSave: 'Сохранить',
        submitCreate: 'Создать',
        summaryContacts: (n) => `${n} контактов`,
        groupByCompany: 'Компания',
        groupByStatus: 'Статус',
      },
      deals: {
        searchPlaceholder: 'Поиск сделок…',
        filterAll: (n) => `Все (${n})`,
        open: (sum) => `Открыто: ${sum}`,
        weighted: (sum) => `Взвешенно: ${sum}`,
        won: (sum) => `Выиграно: ${sum}`,
        columns: {
          deal: 'Сделка',
          value: 'Сумма',
          stage: 'Этап',
          probability: 'Вероятность',
          created: 'Создана',
        },
        rowActions: {
          details: 'Детали',
          markWon: 'Отметить как выиграна',
          markLost: 'Отметить как проиграна',
          reassign: 'Переназначить',
        },
        summary: (n, avg) => `${n} сделок · сред. ${avg}%`,
        drawer: {
          value: 'Сумма',
          probability: 'Вероятность',
          weighted: 'Взвешенно',
          created: 'Создана',
          contact: 'Контакт',
          company: 'Компания',
        },
        toasts: {
          won: 'Сделка отмечена как Выиграна',
          lost: 'Сделка отмечена как Проиграна',
        },
      },
      pipeline: {
        intro: 'Перетаскивайте карточки между этапами. Кликните по карточке для деталей.',
        movedToast: (stage) => `Перемещено в «${stage}»`,
        drawer: {
          close: 'Закрыть',
          markWon: 'Отметить выиграно',
          markLost: 'Отметить проиграно',
          wonToast: 'Сделка отмечена как Выиграна (mock)',
          lostToast: 'Сделка отмечена как Проиграна (mock)',
          value: 'Сумма',
          probability: 'Вероятность',
          created: 'Создана',
          contact: 'Контакт',
          company: 'Компания',
          email: 'Email',
          winProbability: 'Вероятность выигрыша',
        },
      },
      hierarchy: {
        breadcrumbRoot: 'Аккаунты',
        breadcrumbAll: 'Все',
        allAccounts: (contacts, companies) =>
          `Все аккаунты (${contacts} контактов · ${companies} компаний)`,
        kpi: {
          lifetime: 'Lifetime выручка',
          pipeline: 'Сумма воронки',
          pipelineSub: (n) => `${n} сделок`,
          customers: 'Клиенты',
        },
        dealsHeading: (n) => `Сделки (${n})`,
        noDeals: 'Сделок нет',
      },
      deadlines: {
        intro:
          'Топ-8 аккаунтов как дорожки. Активности (1 день) и активные сделки (~5-дневное окно вокруг прогноза закрытия) — назначения. У каждой дорожки capacityPerSlot=2 — недели с перегрузкой подсвечиваются как конфликты. Перетаскивайте, тяните за край для изменения длительности.',
        conflictsLabel: 'Конфликты:',
        conflictsNone: 'нет',
        noActivities: 'Предстоящих активностей нет',
      },
      activity: {
        typeFilterAll: 'Все типы',
        typeFilters: {
          call: '📞 Звонки',
          email: '📧 Письма',
          meeting: '🤝 Встречи',
          note: '📝 Заметки',
        },
        countLabel: (n) => `${n} активностей`,
      },
      contactDrawer: {
        edit: 'Редактировать',
        email: 'Email',
        phone: 'Телефон',
        company: 'Компания',
        revenue: 'Выручка',
        lastContact: 'Последний контакт',
        openDeals: (n) => `Открытые сделки (${n})`,
        activity: 'Активность',
      },
      contactForm: {
        fullName: 'Полное имя',
        fullNamePh: 'Иван Петров',
        email: 'Email',
        emailPh: 'john@example.com',
        company: 'Компания',
        companyPh: 'Acme Inc',
        phone: 'Телефон',
        phonePh: '+1 (555) 000-0000',
        status: 'Статус',
        statusPh: 'Выберите статус',
        revenue: 'Выручка ($)',
        revenuePh: '0',
        cancel: 'Отмена',
        submitDefault: 'Сохранить',
        statusOptions: {
          lead: 'Лид',
          prospect: 'Проспект',
          customer: 'Клиент',
          churned: 'Отвалившийся',
        },
      },
      stageLabel: {
        lead: 'Лид',
        qualified: 'Квалифицирован',
        proposal: 'Предложение',
        negotiation: 'Переговоры',
        'closed-won': 'Закрыта (выиграно)',
        'closed-lost': 'Закрыта (проиграно)',
      },
      statusLabel: {
        lead: 'лид',
        prospect: 'проспект',
        customer: 'клиент',
        churned: 'отвалился',
      },
      activityTypeLabel: {
        call: 'звонок',
        email: 'email',
        meeting: 'встреча',
        note: 'заметка',
      },
    },
    ecommerce: {
      stats: {
        revenue: 'Общая выручка',
        revenueSub: (orders) => `${orders} заказов`,
        pending: 'Ожидающие заказы',
        pendingSub: 'требуют обработки',
        activeProducts: 'Активные товары',
        activeProductsSub: (total) => `из ${total} всего`,
        lowStock: 'Низкий запас',
        lowStockSub: 'меньше 10 штук',
        vip: 'VIP-клиенты',
        vipSub: (total) => `из ${total} всего`,
      },
      tabs: {
        products: 'Товары',
        orders: 'Заказы',
        customers: 'Клиенты',
        inventory: 'Склад',
        analytics: 'Аналитика',
      },
      products: {
        searchPlaceholder: 'Поиск товаров…',
        categoryAll: 'Все категории',
        categoryOptions: {
          electronics: 'Электроника',
          clothing: 'Одежда',
          homeGarden: 'Дом и сад',
        },
        statusAll: 'Все статусы',
        statusOptions: {
          active: 'Активен',
          draft: 'Черновик',
          archived: 'Архив',
        },
        sortOptions: {
          featured: 'Рекомендуемые',
          sold: 'Бестселлеры',
          priceAsc: 'Цена ↑',
          priceDesc: 'Цена ↓',
          rating: 'По рейтингу',
        },
        views: {
          grid: 'Сетка',
          list: 'Список',
        },
        addBtn: '+ Добавить товар',
        showing: (visible, total) => `Показано ${visible} из ${total} товаров`,
        featured: '★ Рекомендуем',
        sale: 'СКИДКА',
        inStock: (n) => `${n} на складе`,
        lowStockBadge: (n) => `Мало (${n})`,
        soldSuffix: 'продано',
        marginSuffix: 'маржа',
        drawer: {
          sku: 'SKU',
          brand: 'Бренд',
          category: 'Категория',
          price: 'Цена',
          cost: 'Себестоимость',
          margin: 'Маржа',
          stockReserved: 'Склад / Резерв',
          available: 'Доступно',
          status: 'Статус',
          rating: 'Рейтинг',
          sold: 'Продано',
          revenue: 'Выручка',
          tagsHeading: 'Теги',
          stockHealth: 'Здоровье запаса',
          descriptionHeading: 'Описание',
        },
        createTitle: 'Добавить новый товар',
        fields: {
          name: 'Название товара',
          namePh: 'Wireless Earbuds Pro',
          category: 'Категория',
          categoryPh: 'Выберите категорию',
          brand: 'Бренд',
          brandPh: 'Выберите бренд',
          price: 'Цена ($)',
          pricePh: '29.99',
          stock: 'Начальный запас',
          stockPh: '100',
          featured: 'Рекомендуемый',
        },
        cancel: 'Отмена',
        create: 'Создать товар',
        createdToast: 'Товар создан (mock)',
      },
      orders: {
        searchPlaceholder: 'Поиск заказов…',
        exportBtn: 'Экспорт CSV',
        exportToast: 'Экспорт заказов (mock)',
        columns: {
          order: 'Заказ',
          customer: 'Клиент',
          total: 'Сумма',
          status: 'Статус',
          date: 'Дата',
          items: 'Товары',
        },
        actions: {
          details: 'Детали',
          refund: 'Возврат',
        },
        summaryPageTotal: 'Итого по странице',
        detailTitle: (id) => `Заказ ${id}`,
        close: 'Закрыть',
        markPaid: 'Отметить как оплачен',
        markPaidToast: (id) => `Заказ ${id} отмечен как оплачен (mock)`,
        steps: {
          pending: 'Ожидает',
          paid: 'Оплачен',
          shipped: 'Отправлен',
          delivered: 'Доставлен',
          cancelled: 'Отменён',
        },
        descriptions: {
          customer: 'Клиент',
          email: 'Email',
          address: 'Адрес',
          date: 'Дата',
          total: 'Сумма',
          items: 'Позиций',
        },
        itemsHeading: 'Позиции заказа',
        itemsTable: {
          product: 'Товар',
          qty: 'Кол-во',
          price: 'Цена',
          subtotal: 'Сумма',
        },
        refundTitle: (id) => `Возврат — ${id}`,
        refundFields: {
          order: 'Заказ',
          customer: 'Клиент',
          orderTotal: 'Сумма заказа',
          amount: 'Сумма возврата ($)',
          reason: 'Причина',
          reasonPh: 'Выберите причину',
          reasonOptions: {
            defective: 'Бракованный товар',
            wrongItem: 'Неверная позиция',
            request: 'Запрос клиента',
            damage: 'Повреждение при доставке',
            other: 'Другое',
          },
        },
        cancel: 'Отмена',
        issueRefund: 'Выпустить возврат',
        refundToast: (amount, id) => `Возврат на сумму $${amount} оформлен для ${id} (mock)`,
        statusLabel: {
          pending: 'ожидает',
          paid: 'оплачен',
          shipped: 'отправлен',
          delivered: 'доставлен',
          cancelled: 'отменён',
        },
      },
      customers: {
        searchPlaceholder: 'Поиск клиентов…',
        exportBtn: 'Экспорт',
        exportToast: 'Экспорт клиентов (mock)',
        viewBtn: 'Открыть',
        vipBadge: '⭐ VIP',
        columns: {
          customer: 'Клиент',
          status: 'Статус',
          orders: 'Заказы',
          totalSpent: 'Всего потрачено',
          aov: 'AOV',
          lastOrder: 'Последний заказ',
          registered: 'Регистрация',
        },
        drawer: {
          email: 'Email',
          registered: 'Регистрация',
          totalOrders: 'Всего заказов',
          totalSpent: 'Всего потрачено',
          aov: 'Средний чек',
          lastOrder: 'Последний заказ',
          orderHistoryHeading: 'История заказов',
        },
        statusLabel: {
          vip: 'vip',
          active: 'активен',
          new: 'новый',
          inactive: 'неактивен',
        },
      },
      inventory: {
        cards: {
          out: 'Закончились',
          low: 'Мало (< 10)',
          healthy: 'В норме',
          total: 'Всего SKU',
        },
        searchPlaceholder: 'Поиск по названию, SKU или бренду…',
        bucketAll: (n) => `Все (${n})`,
        bucketOut: (n) => `Закончились (${n})`,
        bucketLow: (n) => `Мало (${n})`,
        bucketHealthy: (n) => `В норме (${n})`,
        exportBtn: 'Экспорт отчёта по дозаказу',
        exportToast: 'Отчёт экспортирован (mock)',
        columns: {
          product: 'Товар',
          brand: 'Бренд',
          category: 'Категория',
          onHand: 'В наличии',
          reserved: 'Резерв',
          available: 'Доступно',
          health: 'Здоровье',
          status: 'Статус',
        },
        restockBtn: 'Дозаказ',
        restockTitle: (name) => `Дозаказ — ${name}`,
        quantity: 'Количество',
        supplier: 'Поставщик',
        supplierOptions: {
          primary: 'Основной поставщик',
          backup: 'Резервный поставщик',
          local: 'Локальный поставщик',
        },
        cancel: 'Отмена',
        orderRestock: 'Заказать пополнение',
        restockedToast: (qty, name) => `Добавлено ${qty} шт к ${name}`,
        statusLabel: {
          active: 'активен',
          draft: 'черновик',
          archived: 'архив',
        },
      },
      analytics: {
        periods: {
          d7: 'Последние 7 дней',
          d30: 'Последние 30 дней',
          d90: 'Последние 90 дней',
          all: 'Всё время',
        },
        stats: {
          revenue: 'Выручка',
          ordersSub: (n) => `${n} заказов`,
          aov: 'Средний чек',
          itemsSub: (n) => `${n} позиций продано`,
          inventoryValue: 'Стоимость склада',
          inventorySub: (n) => `по себестоимости, ${n} SKU`,
          vipShare: 'Доля VIP',
          vipSub: 'клиентов',
        },
        cards: {
          revenueTrend: 'Тренд выручки',
          noData: 'Нет данных за период',
          ordersByStatus: 'Заказы по статусам',
          revenueByCategory: 'Выручка по категориям',
          topProducts: 'Топ товаров по выручке',
        },
        soldSuffix: 'продано',
        marginSuffix: 'маржа',
      },
    },
    tableKitchenSink: {
      appTitle: 'Таблица — полный набор',
      appLead:
        'Все возможности Table в одном месте: мульти-сортировка, фильтры, группировка, дерево, виртуализация, drag-and-drop (строки + колонки), инлайн-редактирование, экспорт (CSV/JSON), печать, полноэкранный режим, переключение плотности, клавиатурная навигация, объединение ячеек, закрепление колонок, видимость колонок, агрегации, закреплённые строки, сводка выделения, контекстные меню и локали.',
      tableLocale: {
        searchPlaceholder: 'Поиск в таблице...',
        filterConfirm: 'Применить',
        filterReset: 'Сброс',
        sortAsc: 'Сортировать по возрастанию',
        sortDesc: 'Сортировать по убыванию',
        cancelSort: 'Отменить сортировку',
        emptyText: 'Нет данных',
        selectAll: 'Выбрать все',
        selectInvert: 'Инвертировать выбор',
        selectionAll: 'Все данные',
        expand: 'Развернуть строку',
        collapse: 'Свернуть строку',
        triggerAsc: 'Клик — по возрастанию',
        triggerDesc: 'Клик — по убыванию',
        cancelTrigger: 'Клик — отменить сортировку',
        columns: 'Колонки',
        density: 'Плотность',
        densityDefault: 'По умолчанию',
        densityMiddle: 'Средняя',
        densitySmall: 'Компактная',
        fullscreen: 'Полный экран',
        exitFullscreen: 'Выйти из полного экрана',
        reload: 'Обновить',
        export: 'Экспорт',
        exportCSV: 'Экспорт CSV',
        exportJSON: 'Экспорт JSON',
        print: 'Печать',
        pinLeft: 'Закрепить слева',
        pinRight: 'Закрепить справа',
        unpin: 'Открепить',
        sum: 'Сумма',
        avg: 'Среднее',
        count: 'Кол-во',
        min: 'Мин',
        max: 'Макс',
        totalRows: (total) => `всего ${total}`,
        selectedRows: (count) => `выбрано ${count}`,
      },
      tabs: {
        basic: 'Базовая',
        sortFilter: 'Сортировка и фильтры',
        editing: 'Редактирование и DnD',
        virtual: 'Виртуальная прокрутка',
        pinned: 'Закреплённые строки',
        grouped: 'Группы и дерево',
      },
      basic: {
        sectionBasic: 'Базовая таблица',
        sectionEmpty: 'Пустое состояние',
        basicLead:
          'Стандартная таблица с пагинацией, поиском и выбором строк. Урезанный вариант полного набора для самого распространённого случая.',
        emptyLead: 'Пустое состояние с кастомной иллюстрацией и call-to-action.',
        emptyDescription: 'Сотрудников по фильтрам не найдено',
        addEmployee: 'Добавить сотрудника',
        addEmployeeToast: 'Добавить сотрудника (mock)',
        columns: {
          employee: 'Сотрудник',
          department: 'Отдел',
          role: 'Должность',
          salary: 'Зарплата',
          rating: 'Рейтинг',
          status: 'Статус',
          hireDate: 'Дата найма',
        },
      },
      sortFilter: {
        lead: 'Мульти-сортировка (Shift + клик), фильтры по колонкам (поиск, мульти-выбор), агрегации и кастомная итоговая строка.',
        expColumn: 'Стаж (лет)',
        summaryEmployees: (n) => `${n} сотрудников`,
        summaryAvg: (sum) => `сред. ${sum}`,
        summaryYears: (avg) => `${avg} лет`,
        summaryRating: (avg) => `⭐ ${avg}`,
      },
      editing: {
        lead: 'Двойной клик по любой редактируемой ячейке. Перетаскивайте строки за хэндл. Перетаскивайте заголовки колонок. Правый клик по заголовку или ячейке — контекстное меню.',
        columns: {
          employee: 'Сотрудник',
          department: 'Отдел',
          role: 'Должность',
          location: 'Локация',
          salary: 'Зарплата',
          rating: 'Рейтинг',
          status: 'Статус',
        },
        tooltip: 'Полное имя сотрудника',
        selectionActions: {
          export: 'Экспортировать выбранные',
          delete: 'Удалить',
          exportToast: (n) => `Экспортируем ${n} строк`,
          deleteToast: (n) => `Удаляем ${n} строк (mock)`,
        },
        contextMenu: {
          hide: (title) => `Скрыть «${title}»`,
          copy: 'Копировать значение',
          copiedToast: 'Скопировано!',
          view: 'Подробнее',
        },
        toasts: {
          cellEdit: (col, id) => `Обновлено ${col} в строке ${id}`,
          rowMove: (from, to) => `Строка перемещена с ${from} на ${to}`,
          colOrder: (order) => `Порядок колонок: ${order}`,
          colPin: (key, fixed) => `Закрепить ${key}: ${fixed}`,
          pinNone: 'нет',
          exported: (n) => `Экспортировано ${n} строк в CSV`,
        },
      },
      virtual: {
        leadPrefix: '',
        leadSuffix: ' строк с виртуальной прокруткой — в DOM только видимые.',
        columns: {
          employee: 'Сотрудник',
          department: 'Отдел',
          role: 'Должность',
          salary: 'Зарплата',
          rating: 'Рейтинг',
          status: 'Статус',
        },
      },
      pinned: {
        lead: 'Первые 2 строки закреплены сверху, последние 2 — снизу. Они остаются видимыми при прокрутке.',
        columns: {
          employee: 'Сотрудник',
          department: 'Отдел',
          role: 'Должность',
          salary: 'Зарплата',
          rating: 'Рейтинг',
          status: 'Статус',
        },
      },
      grouped: {
        modes: {
          group: 'Группировка',
          tree: 'Дерево',
          colgroups: 'Группы колонок',
          cellspan: 'Объединение ячеек',
        },
        groupByLabel: 'Группировать по:',
        groupOptions: {
          department: 'Отдел',
          role: 'Должность',
          status: 'Статус',
          location: 'Локация',
        },
        columns: {
          employee: 'Сотрудник',
          department: 'Отдел',
          role: 'Должность',
          salary: 'Зарплата',
          rating: 'Рейтинг',
          projects: 'Проекты',
          status: 'Статус',
          name: 'Имя',
        },
        columnGroups: {
          personal: 'Личная информация',
          compensation: 'Компенсация и эффективность',
          meta: 'Мета',
          hireDate: 'Дата найма',
          experience: 'Опыт (лет)',
          location: 'Локация',
        },
        cellSpanLead:
          'Объединение ячеек через onCell: строки 1–3 имеют общий Department, строка 6 объединяет Department + Role.',
        groupExpandToast: (key, expanded) => `Группа «${key}»: ${expanded}`,
        expanded: 'раскрыта',
        collapsed: 'свёрнута',
      },
      statusLabel: {
        active: 'активен',
        'on-leave': 'в отпуске',
        remote: 'удалённо',
        terminated: 'уволен',
      },
    },
  },
}
