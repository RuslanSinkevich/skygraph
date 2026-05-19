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
