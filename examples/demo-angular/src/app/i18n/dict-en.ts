import type { DemoDict } from './types'

export const en: DemoDict = {
  app: {
    appTitle: 'SkyGraph Angular',
    tagline: 'Standalone components + signals on top of @skygraph/core',
    heroSub:
      'Angular adapter that pairs with @skygraph/core and @skygraph/styles. Same DOM contract, same CSS, idiomatic Angular API — standalone components, signals, control flow.',
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
    title: 'SkyGraph',
    lead: 'A framework-agnostic UI kit with an Angular adapter — standalone components, signals, and the new control flow on top of @skygraph/core.',
    heroInstall: 'npm install @skygraph/core @skygraph/angular @skygraph/styles',
    statComponents: 'styled UI components',
    statComponentsValue: 'Many',
    statComposables: 'Standalone',
    statTests: 'Tests',
    statEngines: 'Engines',
    statRuntimeCss: 'Run-time CSS',
    statRuntimeCssValue: '0 kB',
    ctaPrimary: 'Browse components',
    ctaSecondary: 'Read source',
    featureReactiveTitle: 'Reactive core',
    featureReactiveDesc:
      'A single store engine with form / table / tree / graph adapters. Same engine across React and Vue.',
    featureZeroRuntimeTitle: 'Zero-runtime CSS',
    featureZeroRuntimeDesc:
      'All styling lives in @skygraph/styles. No CSS-in-JS, no runtime cost, theming via plain CSS variables.',
    featureA11yTitle: 'Accessible by default',
    featureA11yDesc:
      'Roving tabindex, list navigation, focus traps and ARIA wiring built in to every primitive.',
    featureMultiTitle: 'Same DOM, same CSS',
    featureMultiDesc:
      'Angular components emit the exact same .sg-* classes as the React adapter — themes and showcases work everywhere.',
    featureStandaloneTitle: 'Standalone + signals',
    featureStandaloneDesc:
      'Every component is standalone with OnPush change detection and signal-based inputs. No NgModules. New @if / @for control flow throughout.',
    featureEnginesTitle: 'Domain engines',
    featureEnginesDesc:
      'Form, table, tree, graph and virtualisation engines built on top of the core store. Reuse them with useTable / useTree / useGraph composables.',
    quickInstallTitle: 'Quick install',
    quickInstallDesc:
      'Add @skygraph/angular and @skygraph/styles, import the stylesheet once, and wire provideSgConfig() at the application root.',
    quickInstallSub: 'Two packages, one stylesheet — no extra config.',
    quickInstallCopy: 'Copy',
    quickInstallCopied: 'Copied',
    quickInstallNpmTitle: 'npm',
    quickInstallMinimalTitle: 'main.ts',
    quickInstallMinimalSub: 'Bootstrap with provideSgConfig() at the root.',
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
      'React — hooks, ConfigProvider, 47 UI primitives + 17 complex components on top of the same core.',
    multiFrameworkVue:
      'Vue 3 — Composition-API bindings, 52 SFC primitives + 14 complex — same core, identical `.sg-*` classes.',
  },
  gettingStarted: {
    title: 'Getting Started',
    lead: 'Install SkyGraph, import the stylesheet once, wire provideSgConfig() at bootstrap, and start composing standalone Angular components. Same DOM contract as the React adapter, idiomatic Angular surface.',
    installation: 'Installation',
    installLeadNpm: 'Install the core engine and the Angular adapter via npm:',
    installLeadPnpm: 'Or via pnpm:',
    importStyles: 'Import styles',
    importStylesLead:
      'Import the prebuilt stylesheet once at the entry of your app (e.g. styles.css):',
    importStylesNote1: 'All components emit CSS variables you can override at any scope (',
    importStylesNote2Theming: 'see Theming',
    basicForm: 'Basic form',
    basicFormLead:
      'Compose standalone components — Reactive Forms work because every Sg* component implements ControlValueAccessor where it makes sense:',
    individualComponents: 'Individual components',
    individualComponentsLead: 'Or use the styled components on their own:',
    whatsNext: "What's next",
    cardThemingTitle: 'Theming',
    cardThemingDesc: 'Override CSS variables to reskin the whole app or a single subtree.',
    cardCoreApiTitle: 'Core API',
    cardCoreApiDesc: 'Drive forms, tables and trees with the path-based reactive store.',
    cardComponentsTitle: 'Browse components',
    cardComponentsDesc: 'Ready-to-use components: Button, Input, Table, Tree and more.',
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
  configProvider: {
    title: 'ConfigProvider',
    lead: 'Scope size / disabled / locale / bordered defaults across your app or to a subtree. In Angular this is provided through DI: `provideSgConfig()` at the application root or `<sg-config-provider>` for nested overrides.',
    sectionBasic: 'Basic configuration',
    sectionBasicLead: 'Configure the global defaults at bootstrap with `provideSgConfig()`:',
    sectionRuntime: 'Runtime updates',
    sectionRuntimeLead:
      'Use `SgConfigService.update()` to change the configuration at runtime — every Sg* component picks up the change reactively:',
    sectionRead: 'Reading the active config',
    sectionReadLead: 'Inject `SgConfigService` to read or react to the current configuration:',
    sectionWrapper: 'Subtree overrides',
    sectionWrapperLead:
      'Use `<sg-config-provider>` to override the configuration for a subtree only:',
    wrapperNote:
      'Tip: in Angular, prefer `provideSgConfig()` with route-level providers over component wrappers. The wrapper exists for tests, demos and incremental adoption.',
  },
  guideStub: {
    bannerTitle: '⛔ STUB — DO NOT TOUCH THIS PAGE',
    bannerBody:
      'This Angular guide route is an intentional placeholder so the sidebar menu stays complete. Full content is in the React and Vue demos. Do not port, refactor, or “finish” this file unless explicitly asked.',
    seeReactDocs: 'See the React reference for the full content →',
    stylingShowcaseTitle: 'Styling Showcase',
    stylingShowcaseLead:
      'Stub only. Palette, semantic tokens, scoped brand, dark scopes — see React or Vue demo for the real gallery.',
    designTokensTitle: 'Design Tokens',
    designTokensLead:
      'Stub only. Searchable token index — see React or Vue demo; link below is a fallback.',
    designTokensDescription:
      'Tokens live in one CSS file (framework-agnostic). This Angular page does not duplicate the explorer on purpose.',
    designTokensTokensLine: 'one CSS file with the full palette + semantic + component tokens.',
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

  stylingShowcase: {
    pageTitle: 'Styling Showcase',
    pageLead:
      'A gallery of SkyGraph styling recipes: palette, semantic tokens, scoped brand themes, dark scopes and component tokens. Every example uses nothing but CSS variables — no runtime CSS-in-JS.',
    when1: 'You need to re-skin the whole UI with brand colours — override semantic tokens.',
    when2: 'You need a dark scope on part of the page — set data-sg-theme="dark" on a wrapper.',
    when3:
      'You need to tune a single component — use its component tokens (--sg-btn-*, --sg-input-*, …).',
    swatchSemanticBadge: 'theme',
    recipePaletteTitle: 'Palette',
    recipePaletteDesc:
      'Stable 1–10 colour ramps for blue / gray / red / green / orange. Every semantic token resolves to one of these.',
    recipeSemanticTitle: 'Semantic tokens',
    recipeSemanticDesc:
      'Surface, text, brand and state colours (success / error / warning). Theme-driven — switch with data-sg-theme="dark|light".',
    recipeScopedBrandTitle: 'Scoped brand',
    recipeScopedBrandDesc:
      'Override --sg-color-primary and --sg-border-radius on a wrapper — every component inside re-skins without touching its source.',
    recipeScopedBrandHeading: 'Pink brand + rounded corners',
    recipeDarkTitle: 'Dark scope',
    recipeDarkDesc:
      'A single data-sg-theme="dark" attribute flips every nested component to the dark palette.',
    recipeBtnTokensTitle: 'Component tokens — Button',
    recipeBtnTokensDesc:
      'Tune --sg-btn-radius / --sg-btn-height / --sg-btn-padding on a wrapper for pill buttons. Scoped — not global.',
    recipeInputTokensTitle: 'Component tokens — Input',
    recipeInputTokensDesc:
      '--sg-input-height and --sg-input-radius reshape inputs locally. Select picks up the same tokens.',
  },
  frameworkSwitcher: {
    label: 'Framework',
    comingSoonTitle: 'Coming soon',
  },
}
