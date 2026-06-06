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
    heroInstall: string
    statComponents: string
    /** Short label for the components stat tile — no numeric count. */
    statComponentsValue: string
    statComposables: string
    statTests: string
    statEngines: string
    statRuntimeCss: string
    statRuntimeCssValue: string
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
    featureStandaloneTitle: string
    featureStandaloneDesc: string
    featureEnginesTitle: string
    featureEnginesDesc: string
    quickInstallTitle: string
    quickInstallDesc: string
    quickInstallSub: string
    quickInstallCopy: string
    quickInstallCopied: string
    quickInstallNpmTitle: string
    quickInstallMinimalTitle: string
    quickInstallMinimalSub: string
  }
  roadmap: {
    title: string
    lead: string
    emptyLabel: string
    viewOnGithub: string
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
    skycodeTag: string
    gitborTitle: string
    gitborDesc: string
    gitborTag: string
    skygraphTitle: string
    skygraphDesc: string
    skygraphTag: string
    multiFrameworkTitle: string
    multiFrameworkLead: string
    multiFrameworkReact: string
    multiFrameworkVue: string
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
    whyTitle: string
    whyP1: string
    whyP2: string
    mentalTitle: string
    mentalP1: string
    mentalLayer1: string
    mentalLayer2: string
    mentalLayer3: string
    sectionStore: string
    sectionStoreLead: string
    sectionStoreP2: string
    sectionEngines: string
    sectionEnginesLead: string
    engineFormLabel: string
    engineFormDesc: string
    engineTableLabel: string
    engineTableDesc: string
    engineTreeLabel: string
    engineTreeDesc: string
    engineVirtualLabel: string
    engineVirtualDesc: string
    engineGraphLabel: string
    engineGraphDesc: string
    sectionTyped: string
    sectionTypedLead: string
    sectionTypedP2: string
    sectionMiddleware: string
    sectionMiddlewareLead: string
    sectionMiddlewareP2: string
    sectionGraph: string
    sectionGraphLead: string
    sectionGraphP2: string
    whenTitle: string
    when1: string
    when2: string
    when3: string
    when4: string
    nextTitle: string
    nextLead: string
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
    bannerTitle: string
    bannerBody: string
    seeReactDocs: string
    stylingShowcaseTitle: string
    stylingShowcaseLead: string
    designTokensTitle: string
    designTokensLead: string
    designTokensDescription: string
    designTokensTokensLine: string
  }

  designTokens: {
    title: string
    lead: string
    searchPlaceholder: string
    searchAriaLabel: string
    summaryGlobal: string
    summaryComponentsLeft: string
    summaryComponentsRight: string
    globalHeading: string
    globalLead: string
    perComponentHeading: string
    perComponentLead: string
    overrideHeading: string
    overrideAppWide: string
    overrideSubtree: string
    colVariable: string
    colDefault: string
    colDescription: string
  }

  stylingShowcase: {
    pageTitle: string
    pageLead: string
    when1: string
    when2: string
    when3: string
    swatchSemanticBadge: string
    recipePaletteTitle: string
    recipePaletteDesc: string
    recipeSemanticTitle: string
    recipeSemanticDesc: string
    recipeScopedBrandTitle: string
    recipeScopedBrandDesc: string
    recipeScopedBrandHeading: string
    recipeDarkTitle: string
    recipeDarkDesc: string
    recipeBtnTokensTitle: string
    recipeBtnTokensDesc: string
    recipeInputTokensTitle: string
    recipeInputTokensDesc: string
  }
  frameworkSwitcher: {
    label: string
    comingSoonTitle: string
  }
}
