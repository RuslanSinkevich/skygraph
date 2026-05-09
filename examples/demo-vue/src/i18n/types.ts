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
    dataEntry: string
    dataDisplay: string
    feedback: string
    navigation: string
    form: string
    visualization: string
  }
  header: {
    navComponents: string
    navHome: string
    themeAria: string
    languageAria: string
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
    colProperty: string
    colDescription: string
    colType: string
    colDefault: string
    requiredLabel: string
  }
  landing: {
    title: string
    lead: string
    statComponents: string
    statComposables: string
    statTests: string
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
  }
}
