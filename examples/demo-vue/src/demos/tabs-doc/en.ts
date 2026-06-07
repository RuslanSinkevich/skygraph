/**
 * English source of truth for Tabs doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/tabs-doc/en.ts`.
 */
export const tabsDocEn = {
  pageTitle: 'Tabs',
  pageBadge: 'Navigation',
  crumbCategory: 'Navigation',
  crumbTabs: 'Tabs',
  pageLead: 'Switch between related views without leaving the page.',
  pageWhen1:
    'When a single resource has multiple views that share context (details / activity / settings).',
  pageWhen2: 'When you want lightweight navigation that keeps the user on the current screen.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default tabs with three panels.',
  demoLineTitle: 'Line',
  demoLineDesc: 'Underline-only strip — pass type="line" for the flatter look.',
  demoControlledTitle: 'Controlled',
  demoControlledDesc: 'Drive active key from outside (deep links, wizards).',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Three sizes for different densities.',
  demoRichLabelsTitle: 'Rich labels',
  demoRichLabelsDesc: 'Mix badges, icons, and status dots into the label.',
  demoStatesTitle: 'Loading & disabled',
  demoStatesDesc: 'Per-item flags gate activation.',
  demoTokensTitle: 'Token override',
  demoTokensDesc:
    'Three scopes built from Tabs tokens: green brand, dark surface and glass pick (ink bar and label).',

  tableTabsApi: 'Tabs API',
  tableTabItem: 'TabItem',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Default `card` uses primary + surface tokens; `line` leans on primary for the underline and text tokens for labels.',

  propItems: 'Tab definitions',
  propActiveKey: 'Controlled active key',
  propDefaultActiveKey: 'Initial active key (uncontrolled)',
  propType:
    'Visual style: `card` — bordered tabs attached to the panel; `line` — underline indicator only',
  propSize: 'Tab list size (inherits from ConfigProvider)',
  propUnstyled: 'Opt out of SkyGraph styling',
  emitChange: 'Emitted after the active tab changes',

  itemKey: 'Unique identifier — used for active state and ARIA',
  itemLabel: 'Tab label text shown in the tab strip',
  itemContent:
    'Panel body shown when this tab is active (string; use `#panel` slot for rich content)',
  itemDisabled: 'Grey out and block activation',
  itemLoading: 'Show spinner, block activation',

  cssPrimary: 'Active tab label; underline (`line`) or accent on `card`',
  cssPrimaryHover: 'Hovered (inactive) tab label',
  cssText: 'Panel body text',
  cssTextSecondary: 'Inactive tab label',
  cssTextDisabled: 'Disabled tab label',
  cssBorderSecondary: '`line`: nav bottom rule; `card`: outer box + tab seams + panel top',
  cssBg: '`card`: active tab + panel surface',
  cssBgSecondary: '`card`: inactive tab strip background',
  cssFontSize: 'Tab label font size (sm/lg variants override)',
  cssPaddingSm: 'Vertical tab padding',
  cssPaddingLg: 'Horizontal tab padding',
  cssPaddingXs: 'Gap between label text and loading spinner',
  cssMarginMd: 'Space between tab list and panel body',
  cssSpinColor: 'Loading indicator color',
} as const

/** Writable string map — used by table builders. */
export type TabsDocStrings = { -readonly [K in keyof typeof tabsDocEn]: string }
