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
