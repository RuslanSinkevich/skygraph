import type { DemoDict } from './types'

export const en: DemoDict = {
  app: {
    appTitle: 'SkyGraph Vue',
    tagline: 'Reactive UI Library for Vue 3',
    heroSub:
      'Composables and many styled components powered by @skygraph/core and @skygraph/styles. Same DOM contract, same CSS, idiomatic Vue API.',
  },
  search: {
    placeholder: 'Search components',
    ariaLabel: 'Search components',
    noMatches: 'No components match',
  },
  menuSections: {
    general: 'General',
    dataEntry: 'Data Entry',
    dataDisplay: 'Data Display',
    feedback: 'Feedback',
    navigation: 'Navigation',
    form: 'Form',
    visualization: 'Visualization',
    guide: 'Guide',
  },
  menuItems: {
    gettingStarted: 'Getting Started',
    stylingShowcase: 'Styling Showcase',
    theming: 'Theming',
    designTokens: 'Design Tokens',
    coreApi: 'Core API',
    configProvider: 'ConfigProvider',
  },
  header: {
    navComponents: 'Components',
    navHome: 'Home',
    navGuide: 'Guide',
    navShowcases: 'Showcases',
    navRoadmap: 'Changelog',
    navAbout: 'About',
    navGithub: 'GitHub',
    themeAria: 'Toggle theme',
    languageAria: 'Switch language',
    burgerAria: 'Open navigation',
  },
  footer: {
    copyright: '© 2026 SkyGraph contributors',
    columnDocs: 'Documentation',
    columnResources: 'Resources',
    columnCommunity: 'Community',
    columnProject: 'Project',
    linkGettingStarted: 'Getting started',
    linkComponents: 'Components',
    linkTheming: 'Theming',
    linkCoreApi: 'Core API',
    linkChangelog: 'Changelog',
    linkArchitecture: 'Architecture',
    linkContributing: 'Contributing',
    linkGithub: 'GitHub',
    linkIssues: 'Report an issue',
    linkAbout: 'About',
    linkRoadmap: 'Changelog',
    linkLicense: 'License',
  },
  language: {
    switcherLabel: 'Language',
    en: 'English',
    ru: 'Русский',
  },
  componentDoc: {
    examples: 'Examples',
    whenToUse: 'When to use',
    propsTitle: 'API',
    showCode: 'Show code',
    hideCode: 'Hide code',
    copy: 'Copy',
    copied: 'Copied',
  },
  propsTable: {
    titleApi: 'API',
    colProperty: 'Property',
    colDescription: 'Description',
    colType: 'Type',
    colDefault: 'Default',
    requiredLabel: 'required',
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
  cssVarsTable: {
    title: 'CSS Variables',
    colVariable: 'Variable',
    colDefault: 'Default',
    colDescription: 'Description',
  },
  landing: {
    heroEyebrow: 'Vue 3 UI library',
    heroTitle: 'A ready-made UI kit for Vue 3',
    heroSub:
      'SkyGraph is a multi-framework UI library for React and Vue. Many styled components, reference apps, dark and light themes — built on a single shared engine.',
    heroComponentsCta: 'Browse components',
    heroGettingStartedCta: 'Getting Started',
    ctaPrimary: 'See live apps',
    ctaSecondary: 'Browse components',
    heroImageAlt: 'Screenshot of the SkyGraph CRM showcase in light mode',

    previewLabel: 'Live UI preview',
    previewInputPlaceholder: 'Project name',
    previewThemeLight: 'Light theme',
    previewThemeDark: 'Dark theme',
    previewCodeLabel: 'Minimal entry',
    previewMetricComponents: 'Components',
    previewMetricComponentsValue: '50+',
    previewMetricTheme: 'Theme',
    previewMetricData: 'Data',
    previewMetricDataValue: 'typed',
    previewColumnComponent: 'Component',
    previewColumnStatus: 'Status',
    previewColumnCoverage: 'Coverage',
    previewStatusStable: 'Stable',
    previewStatusBeta: 'Beta',
    previewRowTable: 'Table',
    previewRowForm: 'Form',
    previewRowCharts: 'Charts',

    componentIndexTitle: 'Components up front',
    componentIndexSub: 'No promo imagery: jump straight to APIs, states and working examples.',

    highlightsTitle: 'What you get',
    highlight1Title: 'Styled components',
    highlight1Desc:
      'Forms, tables, trees, calendars, charts, diagrams, dashboards. All ready to drop into a project.',
    highlight2Title: '12 reference apps',
    highlight2Desc:
      'Real CRM, dashboards, project tracker, kitchen-sink table — full source code included.',
    highlight3Title: 'Light and dark themes',
    highlight3Desc:
      'Themes ship out of the box. Switch with a single attribute, change colors via CSS variables.',
    highlight4Title: 'Open source · MIT',
    highlight4Desc:
      'Use freely in commercial and personal projects. Public source, no telemetry, no lock-in.',

    showcasesTitle: 'Reference apps',
    showcasesSub:
      'Real interfaces composed entirely of SkyGraph components — fake data, fully working UI.',
    showcasesLink: 'View all reference apps →',
    showcaseCrmTitle: 'CRM',
    showcaseCrmDesc:
      'Contacts, deals pipeline, activity timeline. Drag-and-drop board, inline editing.',
    showcaseDashboardTitle: 'Operations Dashboard',
    showcaseDashboardDesc:
      'Live KPI grid, mixed charts, filters and drill-down, customizable layout.',
    showcaseProjectTrackerTitle: 'Security Command Center',
    showcaseProjectTrackerDesc:
      'Incident table with infrastructure tree, response timeline, playbooks and a detail drawer.',
    showcaseTableTitle: 'Table — Kitchen Sink',
    showcaseTableDesc:
      'Sorting, filtering, grouping, virtual scroll, export and print on a million-row dataset.',

    spotsTitle: 'Built for real interfaces',
    spotThemingTitle: 'Light and dark in one click',
    spotThemingDesc:
      'Each component reads its colors from CSS variables. Switch theme via a single attribute or override individual tokens for your brand.',
    spotChartsTitle: 'Charts',
    spotChartsDesc:
      'Responsive SVG charts with configurable tooltips, legends and print/export flows.',
    spotFormsTitle: 'Forms with validation',
    spotFormsDesc:
      'Type-safe forms, field-level validation, dependent fields, conditional rows. Works with any data source.',

    installTitle: 'Install',
    installLead: 'For developers — two packages, one stylesheet import.',
    installLearnMore: 'Read Getting Started →',

    footerCtaTitle: 'Ready to try it out?',
    footerCtaBody: 'Open the live reference apps or jump straight to the component catalogue.',
    footerCtaButton: 'See live apps',
    footerDevHint: 'For developers: Getting Started · Architecture · License (MIT)',
  },

  roadmap: {
    title: 'Changelog',
    lead: 'Every released version with the changes that landed in it.',
    emptyLabel: 'No releases yet.',
    viewOnGithub: 'View CHANGELOG.md on GitHub →',
  },

  about: {
    title: 'About SkyGraph',
    lead1:
      'SkyGraph is a TypeScript-first reactive UI library — a path-based core, six domain engines and many styled components, all driven by CSS variables with zero runtime cost.',
    lead2:
      'It is the UI substrate for the Sky platform: the same component contract ships through adapters for React and Vue — pixel-identical DOM and CSS.',
    lead3:
      'No styled-components, no CSS-in-JS runtime, no proprietary build steps — only standards: TypeScript, CSS variables, native DOM events.',
    versionLabel: 'Version',
    licenseLabel: 'License',
    licenseValue: 'MIT',
    architectureLink: 'Architecture →',
    skyPlatformTitle: "Author's pet projects",
    skyPlatformLead:
      'Three independent pet projects by Ruslan Sinkevich — developer tools on different stacks.',
    skycodeTitle: 'Skycode',
    skycodeDesc:
      'VS Code fork with a built-in AI assistant — agent, 40+ model providers, inline diff.',
    skycodeTag: 'IDE',
    gitborTitle: 'GitBor',
    gitborDesc:
      'Cross-platform desktop Git client on Electron — visual commit graph, interactive rebase, data safety.',
    gitborTag: 'Git client',
    skygraphTitle: 'SkyGraph',
    skygraphDesc: 'This library — multi-framework UI on a shared headless core.',
    skygraphTag: 'UI library — you are here',
    multiFrameworkTitle: 'Multi-framework',
    multiFrameworkLead:
      'The core engine and the styling contract are framework-agnostic. Shipped adapters:',
    multiFrameworkReact:
      'React — hooks, ConfigProvider, many styled components on the same shared core.',
    multiFrameworkVue:
      'Vue 3 — Composition API, many styled components — same core, identical `.sg-*` classes.',
  },

  gettingStarted: {
    title: 'Getting Started',
    lead: 'Get up and running with SkyGraph in under 5 minutes.',
    installation: 'Installation',
    installLeadNpm: 'Install the core engine and Vue bindings:',
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
    cardComponentsDesc: 'Browse ready-made UI components',
  },

  theming: {
    title: 'Theming',
    lead: 'SkyGraph uses a 3-layer CSS variable system. Override any layer to create your own theme — no build step, no JS runtime cost.',
    threeLayersHeading: 'Three Layers',
    colLayer: 'Layer',
    colPrefix: 'Prefix',
    colPurpose: 'Purpose',
    layerPalette: 'Palette',
    layerPalettePurpose: 'Stable colour ramps (blue-1…blue-10, gray, red, green, orange).',
    layerSemantic: 'Semantic',
    layerSemanticPurpose:
      'Tokens for surfaces, text, primary, success / error / warning. Toggled by data-sg-theme.',
    layerComponent: 'Component',
    layerComponentPurpose: 'Per-component overrides — Button height, Input radius, Table padding…',
    layersFooter:
      'Override at the deepest layer that fits: change a palette ramp to re-skin everything, a semantic token to swap brand colour, a component token to tune one widget.',
    darkModeHeading: 'Dark mode',
    darkModeLead: 'Switch the whole app between light and dark by toggling one attribute:',
    darkModeNote: 'Wire it up to a switch, persist in localStorage, that is it:',
    customThemeHeading: 'Custom theme',
    customThemeLead:
      'Override semantic tokens to ship a brand theme without rebuilding components:',
    customThemeFooter:
      'Tokens cascade — primary buttons, focus rings, badges and table sort indicators all pick up the new colour automatically.',
    perComponentHeading: 'Component tokens',
    perComponentLead:
      'Each component exposes its own tokens. Override globally for a brand-wide change or scope to a subtree:',
    slotsHeading: 'Slots',
    slotsLead:
      'For deeper customisation, every complex component lets you classNames each slot — table rows, list items, modal header — and swap CSS without forking the component:',
    headlessHeading: 'Headless mode',
    headlessLead: 'Pass `unstyled` to drop the .sg-* classes and bring your own CSS:',
    headlessFooter:
      'Behaviour, accessibility and reactivity are preserved. Style is 100% yours — useful for full-bespoke designs that still need a robust core.',
  },

  coreApi: {
    title: 'Core API',
    lead: 'A pure-TypeScript reactive runtime that sits underneath every SkyGraph component. You almost never need to touch it directly — but when you do (state shared across frameworks, custom engines, or non-component code), this is the API surface.',
    whyTitle: 'Why a separate Core?',
    whyP1:
      'Most UI libraries glue their state model to a single framework. SkyGraph does the opposite: the reactive store, the form engine, the table engine, the graph engine — none of them import React, Vue or Angular. They are plain TypeScript classes.',
    whyP2:
      'That is what makes the same components behave identically across frameworks, and why server-rendered code, workers and tests can use the same engines without dragging a UI framework in.',
    mentalTitle: 'Mental model — three layers',
    mentalP1:
      'Everything in SkyGraph is built on three layers. You can stop at any layer that solves your problem.',
    mentalLayer1:
      'Store — a single reactive key/value addressed by string paths (`user.name`, `form.fields.email`).',
    mentalLayer2:
      'Domain engines — opinionated APIs (Form / Table / Tree / Virtual / Graph) that live inside their own namespace in the Store.',
    mentalLayer3:
      'Framework bindings — `@skygraph/react`, `@skygraph/vue`, `@skygraph/angular` translate Store updates into framework-native re-renders.',
    sectionStore: 'Store — path-based reactive key/value',
    sectionStoreLead:
      'The lowest layer. One centralized state tree, granular per-path subscriptions, transactional commits, batched notifies, and computed values with cycle detection.',
    sectionStoreP2:
      '`set` writes to a path, `subscribe` listens to exactly one path (no over-renders), and `batch` collects multiple writes into a single notification — useful when you mutate several related fields at once.',
    sectionEngines: 'Domain engines — Form, Table, Tree, Virtual, Graph',
    sectionEnginesLead:
      'Five high-level engines sit on top of the Store. Each one owns a `$<name>.` namespace and exposes a focused API for its domain. Use them when raw `get` / `set` would mean reinventing form validation or virtualization.',
    engineFormLabel: 'FormEngine',
    engineFormDesc: 'Field registry, async validation, dirty / touched tracking, submit pipeline.',
    engineTableLabel: 'TableEngine',
    engineTableDesc:
      'Sorting, filtering, pagination, row selection, column resize — for any data shape.',
    engineTreeLabel: 'TreeEngine',
    engineTreeDesc: 'Hierarchical selection, expand / collapse, async children loading.',
    engineVirtualLabel: 'VirtualEngine',
    engineVirtualDesc:
      'Fixed / variable size windowing for lists and tables with thousands of rows.',
    engineGraphLabel: 'GraphEngine',
    engineGraphDesc: 'Nodes, edges and anchors for diagrams and node-based editors.',
    sectionTyped: 'TypedCore — compile-time path safety',
    sectionTypedLead:
      'Wrap the runtime Core in a generic `TypedCore<T>` and the compiler will autocomplete every path and reject typos — with zero runtime overhead.',
    sectionTypedP2:
      'Reach for this when your store grows beyond a handful of paths or when several developers share the same shape. Both write sites and `subscribe` calls become type-safe.',
    sectionMiddleware: 'Middleware pipeline',
    sectionMiddlewareLead:
      'Cross-cutting concerns — logging, freezing, persistence, validation — plug in between writes and notifications. Order is explicit and you can write your own.',
    sectionMiddlewareP2:
      'Built-ins ship with the core: `loggerMiddleware()` traces every write, `freezeMiddleware()` makes state read-only in dev, and persistence/validation helpers live next to them.',
    sectionGraph: 'GraphEngine — diagrams in depth',
    sectionGraphLead:
      'A self-contained engine for diagrams and node editors: nodes with outline / transform / parent / anchorPolicy, edges with stable anchor IDs, incremental anchor caches and AABBs.',
    sectionGraphP2:
      'Subscribe once and you receive a snapshot whenever any part of the graph changes — that snapshot is what `@skygraph/react`, `@skygraph/vue` and `@skygraph/angular` Graph components consume.',
    whenTitle: 'When to use Core directly',
    when1:
      'You need to share state across frameworks (React island in a Vue host, or Angular shell with React widgets).',
    when2:
      'You need a domain engine in a worker, in a test, or on the server — anywhere a UI framework is overkill.',
    when3:
      'You are writing a new SkyGraph component and want it to play nicely with `subscribe` / `batch` / TypedCore.',
    when4:
      'You want a centralized audit trail, persistence layer or freeze-in-dev — the middleware pipeline is the right hook.',
    nextTitle: 'Where to go next',
    nextLead:
      'Most apps never touch Core — they use `@skygraph/react`, `@skygraph/vue` or `@skygraph/angular` components which already speak to it. If you want the framework bindings, see Getting Started; if you want runtime configuration (size / locale / direction) see ConfigProvider; for theming see Design Tokens and Styling Showcase.',
  },

  designTokens: {
    title: 'Design Tokens',
    lead: 'Searchable index of every public --sg-* variable. Tokens are the theming contract: override one on :root, on a wrapper or on a single component scope to re-skin the UI without touching components.',
    searchPlaceholder: 'Search by name, value or description…',
    searchAriaLabel: 'Search design tokens',
    summaryGlobal: 'global tokens',
    summaryComponentsLeft: 'component variables across',
    summaryComponentsRight: 'groups',
    globalHeading: 'Global tokens',
    globalLead:
      'Palette, semantic colours, typography and sizing. Override on :root to re-skin the whole app.',
    perComponentHeading: 'Per-component tokens',
    perComponentLead:
      'Local variables exposed per component — surgical tweaks without touching the CSS. Grouped by component.',
    overrideHeading: 'How to override',
    overrideAppWide: 'App-wide on :root — applies everywhere:',
    overrideSubtree: 'Per-subtree via inline style — applies only to the DOM branch:',
    colVariable: 'Variable',
    colDefault: 'Default',
    colDescription: 'Description',
  },

  frameworkSwitcher: {
    label: 'Framework',
    comingSoonTitle: 'Coming soon',
  },
}
