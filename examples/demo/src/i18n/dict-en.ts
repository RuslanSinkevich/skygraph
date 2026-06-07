import type { DemoDict } from './types'
import { showcasesLocaleEn } from '@skygraph-examples/shared'

export const en: DemoDict = {
  app: {
    appTitle: 'SkyGraph',
    tagline: 'Reactive UI Library',
    heroSub:
      'Headless reactive core and many styled components. TypeScript-first. Zero runtime CSS-in-JS.',
    componentsBadgeSuffix: 'Components',
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
    cardComponentsDesc: 'Browse ready-made UI components',
  },

  header: {
    navComponents: 'Components',
    navShowcases: 'Showcases',
    navGuide: 'Guide',
    navBenchmarks: 'Benchmarks',
    navRoadmap: 'Changelog',
    navAbout: 'About',
    navGithub: 'GitHub',
    burgerAria: 'Open navigation',
    themeAria: 'Toggle theme',
  },

  benchmarkDetail: {
    backToAll: '← All benchmarks',
    tableTitle: 'Table benchmark',
    tableSubtitle: 'SkyGraph <Table> vs antd <Table virtual>',
    treeTitle: 'Tree benchmark',
    treeSubtitle: 'SkyGraph <Tree> vs antd <Tree height>',
    chartTitle: 'Chart benchmark',
    chartSubtitle: 'SkyGraph <BarChart> vs recharts <BarChart>',
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
    linkRoadmap: 'Changelog',
    linkLicense: 'License',
    copyright: '© 2026 SkyGraph contributors',
  },

  landing: {
    heroTitle: 'A ready-made UI kit for web apps',
    heroSub:
      'SkyGraph is a multi-framework UI library for React and Vue. Many styled components, reference apps, dark and light themes — built on a single shared engine.',
    ctaPrimary: 'See live apps',
    ctaSecondary: 'Browse components',
    heroImageAlt: 'Screenshot of the SkyGraph CRM showcase in light mode',

    highlightsTitle: 'What you get',
    highlight1Title: 'Styled components',
    highlight1Desc:
      'Forms, tables, trees, calendars, charts, diagrams, dashboards. All ready to drop into a project.',
    highlight2Title: '12 reference apps',
    highlight2Desc:
      'Real CRM, dashboards, org chart, kitchen-sink table — full source code included.',
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
    showcaseOrgChartTitle: 'Org Chart',
    showcaseOrgChartDesc:
      'Company org chart with auto tree layout, pan & zoom, and collapsible branches.',
    showcaseTableTitle: 'Table — Kitchen Sink',
    showcaseTableDesc:
      'Sorting, filtering, grouping, virtual scroll, export and print on a million-row dataset.',

    spotsTitle: 'Built for real interfaces',
    spotThemingTitle: 'Light and dark in one click',
    spotThemingDesc:
      'Each component reads its colors from CSS variables. Switch theme via a single attribute or override individual tokens for your brand.',
    spotChartsTitle: 'Charts and diagrams',
    spotChartsDesc:
      'Responsive SVG charts, interactive flow diagrams, configurable tooltips and legends. SVG/PNG export and print built in.',
    spotFormsTitle: 'Forms with validation',
    spotFormsDesc:
      'Type-safe forms, field-level validation, dependent fields, conditional rows. Works with any data source.',

    installTitle: 'Install',
    installLead: 'For developers — three packages, one stylesheet import.',
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

  benchmarks: {
    pageTitle: 'SkyGraph runtime benchmarks',
    pageLead1:
      'Side-by-side comparisons against widely-used React libraries on the same data, in the same browser tab. No microbenchmarks: each test mounts a real component tree, measures with',
    pageLead2: '+',
    pageLead3: ', takes the median of multiple runs after a discarded warm-up.',
    disclaimerHonestTitle: 'Honest reporting.',
    disclaimerHonestBody:
      "If SkyGraph is slower in a benchmark, that's what the table shows. We don't tweak methodology to win.",
    disclaimerBrowserTitle: 'Browser-only.',
    disclaimerBrowserBody:
      'Heap delta is reported only when performance.memory is exposed (Chromium).',
    disclaimerTriggerTitle: 'Trigger-based.',
    disclaimerTriggerBeforeRun: 'Benchmarks never autorun. Use the ',
    disclaimerTriggerAfterRun: ' button on each tab.',
    runWord: 'Run',
    tabTableLabel: 'Table · 100k rows',
    tabTableSubtitle: 'Mount + scroll FPS + heap delta',
    tabTableVs: 'vs antd <Table virtual>',
    tabFormLabel: 'Form · 100 fields',
    tabFormSubtitle: 'Mount + per-change + submit bytes',
    tabFormVs: 'vs react-hook-form + plain inputs',
    tabChartLabel: 'LineChart · 1k×60',
    tabChartSubtitle: 'Median frame time + avg FPS',
    tabChartVs: 'vs recharts <LineChart>',
    howToReadTitle: 'How to read these numbers',
    howToRead1Strong: 'Median, not mean.',
    howToRead1Rest:
      'Browser GC and main-thread interruptions create heavy outliers. Median of N runs is what matters for steady-state UX.',
    howToRead2Strong: 'Same dataset, same dom host.',
    howToRead2Rest:
      'Each variant renders into a detached DOM root that is unmounted between runs to release retained nodes.',
    howToRead3Strong: 'Single-threaded numbers.',
    howToRead3Rest:
      'No Web Workers, no React Server Components. Both libraries are measured the way an app developer would actually use them.',
    howToRead4Strong: 'Mount uses ',
    howToRead4BeforeCode: '.',
    howToRead4AfterCode:
      ' Both variants commit synchronously so the timestamp captures real layout work, not a deferred React 19 schedule.',
    run: 'Run',
    stop: 'Stop',
    runningEllipsis: 'Running…',
    done: 'Done',
    stopped: 'Stopped',
    warmingUp: 'Warming up…',
    generatingDataset: 'Generating dataset…',
    runningWithLabel: 'Running {label}…',
    errorWithMessage: 'Error: {message}',
    pressRunEmpty: 'Press Run to collect numbers.',
    variantColumn: 'Variant',
    methodStrong: 'Method.',
    livePreview: 'Live preview',
    livePreviewFields: 'Live preview ({count} fields)',
    rows: 'Rows',
    library: 'Library',
    tick: 'Tick',
    heapNa: 'n/a',
    colMedianMount: 'Median mount',
    colScrollFps: 'Scroll FPS',
    colHeapDelta: 'Heap Δ',
    colMinMount: 'Min mount',
    colMaxMount: 'Max mount',
    colMedianFrame: 'Median frame',
    colAvgFps: 'Avg FPS',
    colMount: 'Mount',
    colMinFrame: 'Min frame',
    colMaxFrame: 'Max frame',
    colPerChange: 'Per-change',
    colSubmitBytes: 'Submit bytes',
    labelSkyTable: 'SkyGraph <Table> (React)',
    labelSkyVueTable: 'SkyGraph <SgTable> (Vue)',
    labelAntdTable: 'antd <Table virtual>',
    labelSkyForm: 'SkyGraph <Form> + <Field>',
    labelRhfForm: 'react-hook-form + plain <input>',
    labelSkyChart: 'SkyGraph <LineChart>',
    labelRechartsChart: 'recharts <LineChart>',
    tableRunIdle: 'Run · {rows} × 4',
    formRunIdle: 'Run · {fields} × 6',
    chartRunIdle: 'Run · {points} × {updates} × 4',
    tableMethod:
      '{rows} rows, 7 columns, virtualized scroll container 480px tall. Each variant is mounted into a detached host with a single flushSync, mount time is measured to the next two paint frames. Then the scroller is scrolled {frames} frames at {pxPerFrame}px/frame and average frame time → FPS is computed. We discard the warm-up run and report the median of 3 measured runs. Heap delta is reported only on Chromium where performance.memory is exposed.',
    formMethod:
      '{fields} text inputs are mounted in one flushSync; mount time is captured to the next two frames. Then {changes} fields are changed via the library control API (FormEngine.setValue / react-hook-form setValue) and per-change time is averaged. Submit bytes is JSON.stringify(values) size. Warm-up discarded; median of 5 runs.',
    chartMethod:
      'A line chart with two series of {points} points is mounted, then re-rendered {updates} times with fresh data using flushSync. We measure average frame time across the update frames and convert to FPS. Animations disabled and point markers off — path layout + reconciliation only. Warm-up discarded; median of 3 runs.',
    fieldLabel: 'Label {n}',
    fieldPlaceholder: 'Placeholder {n}',
    employeePrefix: 'Employee ',
    colId: 'ID',
    colName: 'Name',
    colDepartment: 'Department',
    colRole: 'Role',
    colSalary: 'Salary',
    colStatus: 'Status',
    colHired: 'Hired',
    chartVisits: 'Visits',
    chartOrders: 'Orders',
    previewSkyReact: 'SkyGraph (React)',
    previewSkyVue: 'SkyGraph (Vue)',
    previewAntdBrand: 'antd',
  },
}
