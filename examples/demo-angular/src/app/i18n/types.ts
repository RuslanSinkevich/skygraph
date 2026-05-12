/**
 * Demo-angular i18n types — mirrors `examples/demo-vue/src/i18n/types.ts`
 * which itself mirrors `examples/demo/src/i18n/types.ts`. Keeping the
 * three demo apps on the same dictionary shape makes the eventual
 * cross-framework parity smoke test trivial.
 */

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
  menuItems: {
    gettingStarted: string
    stylingShowcase: string
    theming: string
    designTokens: string
    coreApi: string
    configProvider: string
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
    propsTitle: string
    showCode: string
    hideCode: string
    copy: string
    copied: string
  }
  propsTable: {
    titleApi: string
    colProperty: string
    colDescription: string
    colType: string
    colDefault: string
    requiredLabel: string
  }
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
  roadmap: {
    title: string
    lead: string
    statClosed: string
    statOpen: string
    statTotal: string
    sourceLabel: string
    emptyLabel: string
  }
  about: {
    title: string
    lead1: string
    lead2: string
    lead3: string
    versionLabel: string
    licenseLabel: string
    licenseValue: string
    architectureLink: string
    skyPlatformTitle: string
    skyPlatformLead: string
    skycodeTitle: string
    skycodeDesc: string
    skyforkTitle: string
    skyforkDesc: string
    skygraphTitle: string
    skygraphDesc: string
    multiFrameworkTitle: string
    multiFrameworkLead: string
    multiFrameworkVue: string
    multiFrameworkAngular: string
  }
  gettingStarted: {
    title: string
    lead: string
    installation: string
    installLeadNpm: string
    installLeadPnpm: string
    importStyles: string
    importStylesLead: string
    importStylesNote1: string
    importStylesNote2Theming: string
    basicForm: string
    basicFormLead: string
    individualComponents: string
    individualComponentsLead: string
    whatsNext: string
    cardThemingTitle: string
    cardThemingDesc: string
    cardCoreApiTitle: string
    cardCoreApiDesc: string
    cardComponentsTitle: string
    cardComponentsDesc: string
  }
  theming: {
    title: string
    lead: string
    threeLayersHeading: string
    colLayer: string
    colPrefix: string
    colPurpose: string
    layerPalette: string
    layerPalettePurpose: string
    layerSemantic: string
    layerSemanticPurpose: string
    layerComponent: string
    layerComponentPurpose: string
    layersFooter: string
    darkModeHeading: string
    darkModeLead: string
    darkModeNote: string
    customThemeHeading: string
    customThemeLead: string
    customThemeFooter: string
    perComponentHeading: string
    perComponentLead: string
    slotsHeading: string
    slotsLead: string
    headlessHeading: string
    headlessLead: string
    headlessFooter: string
  }
  coreApi: {
    title: string
    lead: string
    sectionStore: string
    sectionStoreLead: string
    sectionEngines: string
    sectionEnginesLead: string
    sectionTyped: string
    sectionTypedLead: string
    sectionMiddleware: string
    sectionMiddlewareLead: string
    sectionGraph: string
    sectionGraphLead: string
  }
  configProvider: {
    title: string
    lead: string
    sectionBasic: string
    sectionBasicLead: string
    sectionRuntime: string
    sectionRuntimeLead: string
    sectionRead: string
    sectionReadLead: string
    sectionWrapper: string
    sectionWrapperLead: string
    wrapperNote: string
  }
  guideStub: {
    seeReactDocs: string
    stylingShowcaseTitle: string
    stylingShowcaseLead: string
    designTokensTitle: string
    designTokensLead: string
    designTokensDescription: string
    designTokensTokensLine: string
  }
  frameworkSwitcher: {
    label: string
    comingSoonTitle: string
  }
}
