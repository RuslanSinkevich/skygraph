import type { DemoDict } from './types'

export const en: DemoDict = {
  app: {
    appTitle: 'SkyGraph',
    tagline: 'Reactive UI Library',
    heroSub:
      'Headless reactive core + 50+ styled components. TypeScript-first. Zero runtime CSS-in-JS.',
    componentsBadgeSuffix: '+ Components',
  },

  search: {
    placeholder: 'Search components…',
    ariaLabel: 'Search components',
    noMatches: 'No matches.',
  },

  features: {
    reactiveCoreTitle: 'Reactive Core',
    reactiveCoreDesc:
      'Fine-grained subscriptions. Batch updates. No re-render waterfalls.',
    componentsTitle: 'Components',
    componentsDesc:
      'Forms, tables, trees, modals, pickers — production-ready out of the box.',
    zeroRuntimeTitle: 'Zero Runtime CSS',
    zeroRuntimeDesc:
      'Pure CSS variables. Dark mode in one attribute. No styled-components.',
  },

  overview: {
    browseHeading: 'Browse Components',
  },

  topbar: {
    stylingShowcase: 'Styling Showcase',
    theming: 'Theming',
    gettingStarted: 'Getting Started',
    github: 'GitHub',
  },

  menuSections: {
    guide: 'Guide',
    general: 'General',
    dataEntry: 'Data Entry',
    dataDisplay: 'Data Display',
    feedback: 'Feedback',
    navigation: 'Navigation',
  },

  menuItems: {
    overview: 'Overview',
    gettingStarted: 'Getting Started',
    stylingShowcase: 'Styling Showcase',
    theming: 'Theming',
    designTokens: 'Design Tokens',
    coreApi: 'Core API',
    configProvider: 'ConfigProvider',
  },

  language: {
    switcherLabel: 'Language',
    en: 'English',
    ru: 'Русский',
  },

  propsTable: {
    titleApi: 'API',
    colProperty: 'Property',
    colDescription: 'Description',
    colType: 'Type',
    colDefault: 'Default',
    requiredLabel: 'required',
  },

  cssVarsTable: {
    title: 'CSS Variables',
    colVariable: 'Variable',
    colDefault: 'Default',
    colDescription: 'Description',
  },

  demoBox: {
    toolbarLabel: 'Demo actions',
    showCode: 'Show Code',
    hideCode: 'Hide Code',
    showCodeAria: 'Show code',
    hideCodeAria: 'Hide code',
    copyCode: 'Copy code',
    copy: 'Copy',
    copied: 'Copied',
    copiedToast: 'Copied!',
  },

  componentDoc: {
    whenToUse: 'When To Use',
    examples: 'Examples',
  },

  gettingStarted: {
    title: 'Getting Started',
    lead: 'Get up and running with SkyGraph in under 5 minutes.',
    installation: 'Installation',
    installLeadNpm: 'Install the core engine and React bindings:',
    installLeadPnpm: 'Or with pnpm:',
    importStyles: 'Import Styles',
    importStylesLead:
      'SkyGraph ships a default theme via CSS. Import it once at the root of your app:',
    importStylesNote1:
      'This gives you the full design system — palette, spacing, typography, and component tokens. You can override any variable (see ',
    importStylesNote2Theming: 'Theming',
    basicForm: 'Basic Form Example',
    basicFormLead:
      "SkyGraph's reactive core powers forms out of the box — validation, dependencies, and dynamic fields with zero boilerplate:",
    individualComponents: 'Using Individual Components',
    individualComponentsLead:
      'Every component works standalone — no provider or context required:',
    whatsNext: "What's Next",
    cardThemingTitle: 'Theming',
    cardThemingDesc: 'CSS variables, dark mode, custom palettes',
    cardCoreApiTitle: 'Core API',
    cardCoreApiDesc: 'createCore, createForm, createTable, createTree, createGraph',
    cardComponentsTitle: 'Components',
    cardComponentsDesc: 'Browse 65+ ready-made UI components',
  },
}
