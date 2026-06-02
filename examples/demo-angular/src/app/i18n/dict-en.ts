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
    statComponents: 'Components',
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
      'SkyGraph is a TypeScript-first reactive UI library — a path-based core, six domain engines and 78+ styled components, all driven by CSS variables with zero runtime cost.',
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
    gitborTitle: 'GitBor',
    gitborDesc:
      'Cross-platform desktop Git client on Electron — visual commit graph, interactive rebase, data safety.',
    skygraphTitle: 'SkyGraph',
    skygraphDesc: 'This library — multi-framework UI on a shared headless core.',
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
    cardComponentsDesc: '50+ ready-to-use components: Button, Input, Table, Tree and more.',
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
    lead: 'The framework-agnostic engine that powers every SkyGraph adapter. A path-based reactive store with batched updates, typed bindings and domain engines for forms, tables, trees and graphs.',
    sectionStore: 'createCore — reactive store',
    sectionStoreLead:
      'Path-based reactive store. Set, subscribe, batch — fine-grained reactivity without re-render waterfalls.',
    sectionEngines: 'Domain engines',
    sectionEnginesLead:
      'Specialised engines built on top of the core: forms, tables, trees, graphs and a virtualisation primitive.',
    sectionTyped: 'Typed core',
    sectionTypedLead:
      'Wrap a core in a typed proxy to get autocomplete and compile-time safety on every set/get/subscribe call.',
    sectionMiddleware: 'Middleware',
    sectionMiddlewareLead:
      'Plug logging, freeze, devtools or your own middleware into the store via core.use().',
    sectionGraph: 'Graph engine',
    sectionGraphLead:
      'A topology-aware reactive graph: nodes, edges, ports, anchors. Powers Diagram, Dashboard and the routing primitives.',
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
    seeReactDocs: 'See the React reference for the full content →',
    stylingShowcaseTitle: 'Styling Showcase',
    stylingShowcaseLead:
      'A gallery of every styling recipe SkyGraph supports — palette, semantic and component tokens, slot overrides, conditional rows, dark scopes, headless modals. Angular port pending.',
    designTokensTitle: 'Design Tokens',
    designTokensLead:
      'Searchable index of every public --sg-* variable SkyGraph exposes. Angular port pending — the React reference covers the full token catalogue.',
    designTokensDescription:
      'In the meantime you can browse tokens directly in source — they live in a single CSS file and are framework-agnostic:',
    designTokensTokensLine: 'one CSS file with the full palette + semantic + component tokens.',
  },
  frameworkSwitcher: {
    label: 'Framework',
    comingSoonTitle: 'Coming soon',
  },
}
