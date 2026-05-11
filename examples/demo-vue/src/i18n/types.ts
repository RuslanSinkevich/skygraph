export type Locale = 'en' | 'ru'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'ru']

export const DEFAULT_LOCALE: Locale = 'en'

export interface DemoDict {
  app: {
    appTitle: string
    tagline: string
    heroSub: string
  }
  search: {
    placeholder: string
    ariaLabel: string
    noMatches: string
  }
  menuSections: {
    general: string
    dataEntry: string
    dataDisplay: string
    feedback: string
    navigation: string
    form: string
    visualization: string
    guide: string
  }
  header: {
    navComponents: string
    navHome: string
    navGuide: string
    navRoadmap: string
    navAbout: string
    navGithub: string
    themeAria: string
    languageAria: string
    burgerAria: string
  }
  footer: {
    copyright: string
    columnDocs: string
    columnResources: string
    columnCommunity: string
    columnProject: string
    linkGettingStarted: string
    linkComponents: string
    linkTheming: string
    linkCoreApi: string
    linkChangelog: string
    linkArchitecture: string
    linkContributing: string
    linkGithub: string
    linkIssues: string
    linkAbout: string
    linkRoadmap: string
    linkLicense: string
  }
  language: {
    switcherLabel: string
    en: string
    ru: string
  }
  componentDoc: {
    examples: string
    whenToUse: string
    /**
     * Legacy keys still consumed by `examples/demo-vue/src/components/*.vue`
     * (the pre-Wave-3 wrappers, kept around for non-migrated surfaces).
     * The new wrappers in `src/demos/components/*` use `demoBox.*` and
     * `propsTable.titleApi` instead — keep both in sync until the legacy
     * components are removed (out of scope for T-Vue-Demo-Wrappers-Parity).
     */
    propsTitle: string
    showCode: string
    hideCode: string
    copy: string
    copied: string
  }
  propsTable: {
    /** Default heading for {@link PropsTable} when `title` prop is absent. */
    titleApi: string
    colProperty: string
    colDescription: string
    colType: string
    colDefault: string
    requiredLabel: string
  }
  /**
   * `DemoBox` strings (1:1 with React `examples/demo/src/i18n/types.ts`
   * `demoBox` section). Used by the new wrappers in
   * `examples/demo-vue/src/demos/components/DemoBox.vue`.
   */
  demoBox: {
    toolbarLabel: string
    showCode: string
    hideCode: string
    showCodeAria: string
    hideCodeAria: string
    copyCode: string
    copy: string
    copied: string
    copiedToast: string
  }
  cssVarsTable: {
    title: string
    colVariable: string
    colDefault: string
    colDescription: string
  }
  landing: {
    title: string
    lead: string
    statComponents: string
    statComposables: string
    statTests: string
    statEngines: string
    ctaPrimary: string
    ctaSecondary: string
    featureReactiveTitle: string
    featureReactiveDesc: string
    featureZeroRuntimeTitle: string
    featureZeroRuntimeDesc: string
    featureA11yTitle: string
    featureA11yDesc: string
    featureMultiTitle: string
    featureMultiDesc: string
    quickInstallTitle: string
    quickInstallDesc: string
    quickInstallCopy: string
    quickInstallCopied: string
  }
}
