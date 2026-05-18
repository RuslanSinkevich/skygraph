import type { ShowcasesLocale } from '@skygraph-examples/shared'

/**
 * Demo i18n types.
 *
 * Minimal in-house i18n for the SkyGraph demo app.
 * No external dependencies (react-i18next etc.) — pure React Context.
 */

export type Locale = 'en' | 'ru'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'ru']

export const DEFAULT_LOCALE: Locale = 'en'

/**
 * String dictionary used by the demo app shell (App.tsx).
 *
 * NOTE: this dictionary covers ONLY the visible chrome (sidebar, topbar,
 * Overview page). Individual demo pages still use hardcoded English in
 * Stream 2 — they are scheduled for follow-up cycles, see TODO-cycle.md.
 */
export interface DemoDict {
  app: {
    appTitle: string
    tagline: string
    heroSub: string
    componentsBadgeSuffix: string
  }

  search: {
    placeholder: string
    ariaLabel: string
    noMatches: string
  }

  features: {
    reactiveCoreTitle: string
    reactiveCoreDesc: string
    componentsTitle: string
    componentsDesc: string
    zeroRuntimeTitle: string
    zeroRuntimeDesc: string
  }

  overview: {
    browseHeading: string
  }

  topbar: {
    stylingShowcase: string
    theming: string
    gettingStarted: string
    github: string
  }

  menuSections: {
    guide: string
    general: string
    dataEntry: string
    dataDisplay: string
    feedback: string
    navigation: string
  }

  menuItems: {
    overview: string
    gettingStarted: string
    stylingShowcase: string
    theming: string
    designTokens: string
    coreApi: string
    configProvider: string
  }

  language: {
    switcherLabel: string
    en: string
    ru: string
  }

  propsTable: {
    titleApi: string
    colProperty: string
    colDescription: string
    colType: string
    colDefault: string
    requiredLabel: string
  }

  cssVarsTable: {
    title: string
    colVariable: string
    colDefault: string
    colDescription: string
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

  componentDoc: {
    whenToUse: string
    examples: string
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

  header: {
    navComponents: string
    navShowcases: string
    navGuide: string
    navBenchmarks: string
    navRoadmap: string
    navAbout: string
    navGithub: string
    burgerAria: string
    themeAria: string
  }

  /**
   * Standalone benchmark detail pages (#/benchmarks/<table|tree|chart>).
   * Linked from the components sidebar; uses the same translation channel
   * as the BenchmarksPage hub.
   */
  benchmarkDetail: {
    backToAll: string
    tableTitle: string
    tableSubtitle: string
    treeTitle: string
    treeSubtitle: string
    chartTitle: string
    chartSubtitle: string
  }

  /** Embedded showcases hub (same copy as standalone `showcasesLocale`). */
  showcases: ShowcasesLocale

  footer: {
    columnDocs: string
    columnResources: string
    columnCommunity: string
    columnProject: string
    linkGettingStarted: string
    linkComponents: string
    linkTheming: string
    linkCoreApi: string
    linkChangelog: string
    linkShowcases: string
    linkArchitecture: string
    linkContributing: string
    linkGithub: string
    linkIssues: string
    linkAbout: string
    linkRoadmap: string
    linkLicense: string
    copyright: string
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
    gitborTitle: string
    gitborDesc: string
    skygraphTitle: string
    skygraphDesc: string
    multiFrameworkTitle: string
    multiFrameworkLead: string
    multiFrameworkReact: string
    multiFrameworkVue: string
  }

  /** Benchmarks hub (#/benchmarks) — follows header LanguageSwitcher locale. */
  benchmarks: {
    pageTitle: string
    pageLead1: string
    pageLead2: string
    pageLead3: string
    disclaimerHonestTitle: string
    disclaimerHonestBody: string
    disclaimerBrowserTitle: string
    disclaimerBrowserBody: string
    disclaimerTriggerTitle: string
    disclaimerTriggerBeforeRun: string
    disclaimerTriggerAfterRun: string
    runWord: string
    tabTableLabel: string
    tabTableSubtitle: string
    tabTableVs: string
    tabFormLabel: string
    tabFormSubtitle: string
    tabFormVs: string
    tabChartLabel: string
    tabChartSubtitle: string
    tabChartVs: string
    howToReadTitle: string
    howToRead1Strong: string
    howToRead1Rest: string
    howToRead2Strong: string
    howToRead2Rest: string
    howToRead3Strong: string
    howToRead3Rest: string
    howToRead4Strong: string
    howToRead4BeforeCode: string
    howToRead4AfterCode: string
    run: string
    stop: string
    runningEllipsis: string
    done: string
    stopped: string
    warmingUp: string
    generatingDataset: string
    runningWithLabel: string
    errorWithMessage: string
    pressRunEmpty: string
    variantColumn: string
    methodStrong: string
    livePreview: string
    livePreviewFields: string
    rows: string
    library: string
    tick: string
    heapNa: string
    colMedianMount: string
    colScrollFps: string
    colHeapDelta: string
    colMinMount: string
    colMaxMount: string
    colMedianFrame: string
    colAvgFps: string
    colMount: string
    colMinFrame: string
    colMaxFrame: string
    colPerChange: string
    colSubmitBytes: string
    labelSkyTable: string
    labelSkyVueTable: string
    labelAntdTable: string
    labelSkyForm: string
    labelRhfForm: string
    labelSkyChart: string
    labelRechartsChart: string
    tableRunIdle: string
    formRunIdle: string
    chartRunIdle: string
    tableMethod: string
    formMethod: string
    chartMethod: string
    fieldLabel: string
    fieldPlaceholder: string
    employeePrefix: string
    colId: string
    colName: string
    colDepartment: string
    colRole: string
    colSalary: string
    colStatus: string
    colHired: string
    chartVisits: string
    chartOrders: string
    previewSkyReact: string
    previewSkyVue: string
    previewAntdBrand: string
  }
}
