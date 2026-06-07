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
    showcaseOrgChartTitle: string
    showcaseOrgChartDesc: string
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
   * Changelog page (`/roadmap`). Mirrors React
   * `examples/demo/src/i18n/types.ts#roadmap`.
   */
  roadmap: {
    title: string
    lead: string
    emptyLabel: string
    viewOnGithub: string
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
   * Guide → Design Tokens (`/guide/design-tokens`). Mirrors React's
   * `designTokens` channel — same dataset, same wording, same UI.
   */
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

  /**
   * Guide → Styling Showcase (`/guide/styling-showcase`). The Vue port
   * is a simplified subset of the React reference — palette swatches,
   * semantic swatches, brand override scope, dark scope and per-feature
   * brand. Recipe titles/descriptions live here.
   */
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
    scopedBrandPrimary: string
    scopedBrandDefault: string
    scopedBrandInputPlaceholder: string
    recipeDarkTitle: string
    recipeDarkDesc: string
    darkPrimary: string
    darkDefault: string
    darkInputPlaceholder: string
    recipeBtnTokensTitle: string
    recipeBtnTokensDesc: string
    pillPrimary: string
    pillDefault: string
    recipeInputTokensTitle: string
    recipeInputTokensDesc: string
    roundedInputPlaceholder: string
    recipePerFeatureTitle: string
    recipePerFeatureDesc: string
    perFeatureLabelPrimary: string
    perFeatureLabelRadius: string
    perFeaturePrimary: string
    perFeatureDefault: string
    perFeatureInputPlaceholder: string
  }

  /**
   * Guide → ConfigProvider (`/guide/config-provider`). Rich prose
   * guide — when to reach for the wrapper vs. picking sizes per
   * component, how locale propagation works, how to compose providers.
   */
  configProviderGuide: {
    title: string
    lead: string
    whenHeading: string
    when1: string
    when2: string
    when3: string
    when4: string
    apiHeading: string
    apiLead: string
    apiSizeDesc: string
    apiDisabledDesc: string
    apiBorderedDesc: string
    apiLocaleDesc: string
    nestedHeading: string
    nestedLead: string
    componentHeading: string
    componentLead: string
    componentCta: string
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
