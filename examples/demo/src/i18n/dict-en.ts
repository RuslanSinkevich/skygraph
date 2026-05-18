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
    linkRoadmap: 'Roadmap',
    linkLicense: 'License',
    copyright: '© 2026 SkyGraph contributors',
  },

  landing: {
    heroTitle: 'A ready-made UI kit for web apps',
    heroSub:
      'SkyGraph is a multi-framework UI library for React and Vue. 78+ components, 12 reference apps, dark and light themes — built on a single shared engine.',
    ctaPrimary: 'See live apps',
    ctaSecondary: 'Browse components',
    heroImageAlt: 'Screenshot of the SkyGraph CRM showcase in light mode',

    highlightsTitle: 'What you get',
    highlight1Title: '78+ components',
    highlight1Desc:
      'Forms, tables, trees, calendars, charts, diagrams, dashboards. All ready to drop into a project.',
    highlight2Title: '12 reference apps',
    highlight2Desc:
      'Real CRM, dashboards, workflow editor, kitchen-sink table — full source code included.',
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
    showcaseWorkflowTitle: 'Workflow Editor',
    showcaseWorkflowDesc:
      'Visio-style flowcharts with multi-select, lasso, undo/redo and orthogonal routing.',
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
