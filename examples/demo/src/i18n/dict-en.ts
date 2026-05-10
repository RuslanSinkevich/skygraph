import type { DemoDict } from './types'
import { showcasesLocaleEn } from '@skygraph-examples/shared'

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
    reactiveCoreDesc: 'Fine-grained subscriptions. Batch updates. No re-render waterfalls.',
    componentsTitle: 'Components',
    componentsDesc: 'Forms, tables, trees, modals, pickers — production-ready out of the box.',
    zeroRuntimeTitle: 'Zero Runtime CSS',
    zeroRuntimeDesc: 'Pure CSS variables. Dark mode in one attribute. No styled-components.',
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

  theming: {
    title: 'Theming',
    lead: 'SkyGraph uses a 3-layer CSS variable system. Override any layer to create your own theme — no build step, no JS runtime cost.',
    threeLayersHeading: 'Three Layers',
    colLayer: 'Layer',
    colPrefix: 'Prefix',
    colPurpose: 'Purpose',
    layerPalette: 'Palette',
    layerPalettePurpose: 'Raw colors: blue-500, gray-100, etc.',
    layerSemantic: 'Semantic',
    layerSemanticPurpose: 'Intent-based: primary, success, error, bg, text',
    layerComponent: 'Component',
    layerComponentPurpose: 'Per-component tokens for fine-grained control',
    layersFooter:
      'Palette feeds into semantic tokens, which feed into component tokens. Override at any layer — downstream tokens inherit automatically.',
    darkModeHeading: 'Dark Mode',
    darkModeLead: 'Toggle dark mode by setting a single attribute on the root element:',
    darkModeNote:
      'SkyGraph ships light and dark palettes. The semantic layer references palette variables, so dark mode swaps the entire look with zero JS overhead.',
    customThemeHeading: 'Custom Theme',
    customThemeLead: 'Override the primary color by setting semantic variables in your CSS:',
    customThemeFooter:
      'All components that reference --sg-color-primary will pick up the new color — buttons, links, active states, focus rings, etc.',
    perComponentHeading: 'Per-Component Customization',
    perComponentLead: 'Each component exposes its own CSS variables for surgical overrides:',
    slotsHeading: 'Slot-based styling (classNames / styles)',
    slotsLead:
      'For complex components you can target specific DOM nodes via named slots — without relying on deep selectors. Use classNames for CSS classes and styles for inline styles. Slot keys and the corresponding stable DOM classes are part of the public styling contract.',
    headlessHeading: 'Headless Mode',
    headlessLead:
      'Need full control over styling? Pass unstyled to any component to strip all SkyGraph CSS. You keep the reactive behavior and accessibility — bring your own classes:',
    headlessFooter:
      'Headless mode is per-component — mix styled and unstyled freely in the same app.',
  },

  designTokens: {
    title: 'Design Tokens',
    lead: 'Every SkyGraph visual is driven by a CSS custom property. Override a token on `:root` for app-wide changes, on a wrapper for a subtree, or on a single component instance.',
    searchPlaceholder: 'Search tokens (e.g. radius, primary, shadow, table)…',
    searchAriaLabel: 'Search tokens',
    summaryGlobal: 'global tokens',
    summaryComponentsLeft: 'component tokens across',
    summaryComponentsRight: 'components',
    globalHeading: 'Global tokens',
    globalLead: 'Semantic tokens change with the theme. Palette tokens stay fixed.',
    perComponentHeading: 'Per-component tokens',
    perComponentLead:
      'These variables are declared by a specific component and are the cleanest way to re-skin just that component.',
    overrideHeading: 'Override examples',
    overrideAppWide: 'App-wide brand swap:',
    overrideSubtree: 'Per-subtree override (scoped to one page / card):',
    colVariable: 'Variable',
    colDefault: 'Default',
    colDescription: 'Description',
  },

  coreApi: {
    title: 'Core API',
    lead: 'Pure-TS reactive runtime + domain engines. Zero React dependency in core; React layer is a thin adapter.',
    sectionStore: 'Store — path-based reactive key/value',
    sectionStoreLead:
      'Centralized state, granular per-path subscriptions, transactional commits, batched notifies, computed values with cycle detection.',
    sectionEngines: 'Domain Engines',
    sectionEnginesLead:
      'FormEngine, TableEngine, TreeEngine, VirtualEngine, GraphEngine — each owns a `$<name>.` namespace in the store and exposes a focused API for its domain.',
    sectionTyped: 'TypedCore — compile-time path safety',
    sectionTypedLead:
      'Wrap the runtime Core in a generic TypedCore<T> for autocomplete and TS-checked path strings without runtime overhead.',
    sectionMiddleware: 'Middleware Pipeline',
    sectionMiddlewareLead:
      'Plug logger / freeze / persistence / validation middlewares between writes and notifications. Customize ordering and write your own.',
    sectionGraph: 'GraphEngine — diagrams',
    sectionGraphLead:
      'Nodes (with outline / transform / parent / anchorPolicy), edges (with stable anchor IDs), incremental anchors and AABBs, snapshot subscriptions for React.',
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
    individualComponentsLead: 'Every component works standalone — no provider or context required:',
    whatsNext: "What's Next",
    cardThemingTitle: 'Theming',
    cardThemingDesc: 'CSS variables, dark mode, custom palettes',
    cardCoreApiTitle: 'Core API',
    cardCoreApiDesc: 'createCore, createForm, createTable, createTree, createGraph',
    cardComponentsTitle: 'Components',
    cardComponentsDesc: 'Browse 65+ ready-made UI components',
  },

  header: {
    navComponents: 'Components',
    navShowcases: 'Showcases',
    navGuide: 'Guide',
    navBenchmarks: 'Benchmarks',
    navRoadmap: 'Roadmap',
    navAbout: 'About',
    navGithub: 'GitHub',
    burgerAria: 'Open navigation',
    themeAria: 'Toggle theme',
  },

  showcases: showcasesLocaleEn,

  footer: {
    columnDocs: 'Documentation',
    columnResources: 'Resources',
    columnCommunity: 'Community',
    columnProject: 'Project',
    linkGettingStarted: 'Getting started',
    linkComponents: 'Components',
    linkTheming: 'Theming',
    linkCoreApi: 'Core API',
    linkChangelog: 'Changelog',
    linkShowcases: 'Showcases',
    linkArchitecture: 'Architecture',
    linkContributing: 'Contributing',
    linkGithub: 'GitHub',
    linkIssues: 'Report an issue',
    linkAbout: 'About',
    linkRoadmap: 'Roadmap',
    linkLicense: 'License',
    copyright: '© 2026 SkyGraph contributors',
  },

  landing: {
    statComponents: 'Components',
    statTests: 'Tests',
    statEngines: 'Engines',
    statShowcases: 'Showcases',
    statRuntimeCss: 'Runtime CSS',
    statRuntimeCssValue: '0 KB',
    ctaPrimary: 'Get started',
    ctaSecondary: 'Browse showcases',
    quickInstallTitle: 'Quick install',
    quickInstallSub: 'Three packages — core engine, React adapter and styles.',
    minimalExampleTitle: 'Minimal example',
    minimalExampleSub: 'Reactive form, no providers, no boilerplate.',
    featureReactiveCoreTitle: 'Reactive core',
    featureReactiveCoreDesc:
      'Path-based store, transactions, batched notifies, computed values with cycle detection.',
    featureEnginesTitle: 'Domain engines',
    featureEnginesDesc: 'Form, Table, Tree, Virtual, Graph, Calendar — six engines on one store.',
    featurePrintTitle: 'Print & export',
    featurePrintDesc: 'ref.print() + SVG/PNG export for Charts, Diagram and Table.',
    featureChartsTitle: 'Charts UX',
    featureChartsDesc:
      'Responsive SVG, brushing, crosshair, animations, hover toolbar, context menu.',
    featureDiagramTitle: 'Diagram UX',
    featureDiagramDesc: 'Multi-select, lasso, hover actions, orthogonal routing, undo/redo.',
    featureStylingTitle: 'Styling contract',
    featureStylingDesc: 'Three-layer tokens, slots API, dark mode, zero runtime CSS-in-JS.',
    whatsNewTitle: "What's new",
    whatsNewLink: 'View full changelog →',
    showcasesTitle: 'Real-world apps',
    showcasesSub: 'Mini-applications composed from @skygraph/react — fake data, real components.',
    showcasesLink: 'View all 12 showcases →',
  },

  roadmap: {
    title: 'Roadmap',
    lead: 'Live snapshot of TODO.md. Closed items are tagged with the round that landed them; open items are candidates for upcoming streams.',
    statClosed: 'closed',
    statOpen: 'open',
    statTotal: 'total',
    sourceLabel: 'Source: TODO.md',
    emptyLabel: 'No items.',
  },

  about: {
    title: 'About SkyGraph',
    lead1:
      'SkyGraph is a TypeScript-first reactive UI library — a path-based core, six domain engines and 78+ styled components, all driven by CSS variables with zero runtime cost.',
    lead2:
      'It is the UI substrate for the Sky platform, designed to feed the same component contract into multiple framework adapters: React today, Vue and Angular next.',
    lead3:
      'No styled-components, no CSS-in-JS runtime, no proprietary build steps — only standards: TypeScript, CSS variables, native DOM events.',
    versionLabel: 'Version',
    licenseLabel: 'License',
    licenseValue: 'MIT',
    architectureLink: 'Architecture →',
    skyPlatformTitle: 'Sky platform',
    skyPlatformLead: 'Three coupled projects sharing one design system and one data model.',
    skycodeTitle: 'Skycode',
    skycodeDesc: 'AI-augmented IDE — VS Code fork with the Skycode assistant.',
    skyforkTitle: 'SkyFork',
    skyforkDesc: 'Codebase orchestration — branch hub, agent runner, automation.',
    skygraphTitle: 'SkyGraph',
    skygraphDesc: 'This library — the UI / data foundation underneath every Sky surface.',
    multiFrameworkTitle: 'Multi-framework — coming soon',
    multiFrameworkLead:
      'The core engine and the styling contract are framework-agnostic. Adapters in flight:',
    multiFrameworkVue: 'Vue 3 — Composition-API bindings on top of the core store.',
    multiFrameworkAngular: 'Angular — signals-based store integration, same components.',
  },
}
