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
}
