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
