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
  /**
   * Sidebar entry labels for the Guide section. 1:1 with React
   * `examples/demo/src/i18n/types.ts#menuItems`. Wave 3.4 ports only the
   * 6 guide labels — `overview` is React-only and intentionally omitted.
   */
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
    navShowcases: string
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
    heroTitle: string
    heroSub: string
    ctaPrimary: string
    ctaSecondary: string
    heroImageAlt: string

    highlightsTitle: string
    highlight1Title: string
    highlight1Desc: string
    highlight2Title: string
    highlight2Desc: string
    highlight3Title: string
    highlight3Desc: string
    highlight4Title: string
    highlight4Desc: string

    showcasesTitle: string
    showcasesSub: string
    showcasesLink: string
    showcaseCrmTitle: string
    showcaseCrmDesc: string
    showcaseDashboardTitle: string
    showcaseDashboardDesc: string
    showcaseWorkflowTitle: string
    showcaseWorkflowDesc: string
    showcaseTableTitle: string
    showcaseTableDesc: string

    spotsTitle: string
    spotThemingTitle: string
    spotThemingDesc: string
    spotChartsTitle: string
    spotChartsDesc: string
    spotFormsTitle: string
    spotFormsDesc: string

    installTitle: string
    installLead: string
    installLearnMore: string

    footerCtaTitle: string
    footerCtaBody: string
    footerCtaButton: string
    footerDevHint: string
  }

  /**
   * Roadmap page (`/roadmap`). 1:1 with React
   * `examples/demo/src/i18n/types.ts#roadmap`.
   */
  roadmap: {
    title: string
    lead: string
    statClosed: string
    statOpen: string
    statTotal: string
    sourceLabel: string
    emptyLabel: string

    metricComponents: string
    metricEngines: string
    metricFrameworks: string
    metricRounds: string

    filterAll: string
    filterShipped: string
    filterPlanned: string
    searchPlaceholder: string
    searchAriaLabel: string

    sectionsHeading: string
    sectionsLead: string
    sectionProgressLabel: string
    sectionStatusComplete: string
    sectionStatusActive: string
    /** "{closed} of {total} closed" — `{closed}` / `{total}` are placeholders. */
    sectionProgressCount: string

    timelineHeading: string
    timelineLead: string
    roundLabel: string

    nextHeading: string
    nextLead: string
    nextEmpty: string

    itemBadgeShipped: string
    itemBadgePlanned: string
    /** "Round {n}" — `{n}` is replaced. */
    itemRound: string

    sourceLink: string

    overallProgressLabel?: string
    metricTests?: string
    latestEyebrow?: string
    topicSingular?: string
    topicPlural?: string
    commitSingular?: string
    commitPlural?: string
    changelogLink?: string
    moreLabel?: string
  }

  /**
   * About page (`/about`). 1:1 with React
   * `examples/demo/src/i18n/types.ts#about`. Vue surface intentionally
   * mirrors the same labels; no Vue-specific copy.
   */
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
    gitborTitle: string
    gitborDesc: string
    skygraphTitle: string
    skygraphDesc: string
    multiFrameworkTitle: string
    multiFrameworkLead: string
    multiFrameworkReact: string
    multiFrameworkVue: string
  }

  /** Getting Started guide (`/guide/getting-started`). */
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

  /** Theming guide (`/guide/theming`). */
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

  /** Core API guide (`/guide/core-api`). */
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

  /**
   * Stub guide pages — Vue-side parity is structural only. Full ports of
   * `StylingShowcasePage`, `DesignTokensPage` and `ConfigProviderDemo`
   * (the embedded guide variant) are out of scope for Wave 3.4.
   */
  guideStub: {
    seeReactDocs: string
    stylingShowcaseTitle: string
    stylingShowcaseLead: string
    designTokensTitle: string
    designTokensLead: string
    configProviderTitle: string
    configProviderLead: string
  }

  /**
   * `<FrameworkSwitcher>` — used in the topbar `extras` slot. Visual
   * parity with `examples/demo/src/components/FrameworkSwitcher.tsx`.
   */
  frameworkSwitcher: {
    label: string
    comingSoonTitle: string
  }
}
