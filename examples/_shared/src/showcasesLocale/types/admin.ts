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
