/**
 * English source of truth for ConfigProvider doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const configProviderDocEn = {
  pageTitle: 'ConfigProvider',
  pageLead:
    'Root configuration for nested Skygraph components. Sets default `size`, `disabled`, `bordered`, and `locale` without passing props through every level.',
  pageWhen1: 'Apply a consistent `size` (or disable everything) across a whole page or dialog.',
  pageWhen2: 'Ship locale strings once at the app root instead of per-component.',
  pageWhen3: 'Nest providers to scope defaults to a form, a drawer, or a specific feature flag.',

  demoSizeTitle: 'Size',
  demoSizeDesc:
    'A single provider propagates `size` to every descendant control. Input, Button, Select, Switch, Checkbox and more read it via `useConfig()`.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc:
    'Flip the whole subtree to a read-only state in one line — useful for preview panes, inactive tabs, or permission-gated UIs.',
  demoNestedTitle: 'Nested providers + explicit props',
  demoNestedDesc: 'Inner providers shallow-override the outer ones. Per-component props always win over both.',
  demoBorderedTitle: 'Bordered (Table)',
  demoBorderedDesc:
    '`bordered` is plumbed for Table today — hosting that on the provider keeps every table aligned without touching individual instances.',
  demoLocaleTitle: 'Locale presets (en_US / ru_RU)',
  demoLocaleDesc:
    'Flip the provider between the bundled `en_US` and `ru_RU` presets and watch Empty, Pagination, Popconfirm, Upload, and SchemaForm swap their strings. Override individual keys by passing your own `SgLocale`.',
  demoThemeTitle: 'Theme + behaviour scope',
  demoThemeDesc:
    '`ConfigProvider` owns behaviour (size / disabled / locale). CSS tokens own visuals. Combine them on the same wrapper to ship self-contained micro-themes.',
  demoHookTitle: 'useConfig() hook',
  demoHookDesc:
    'Custom components can read the merged config just like built-ins do. Handy for third-party controls that want to follow the same size / disabled contract.',

  tableProviderApi: 'ConfigProvider API',
  tableLocaleShape: 'SgLocale shape',
  tablePresets: 'Locale presets',
  tableHooks: 'Hooks',

  propSize: 'Default `size` for descendants. Per-component props still win.',
  propDisabled:
    'Disables every descendant control that reads the context (Input, Button, Select, Switch, Checkbox, etc.).',
  propBordered:
    'Default bordered flag. Currently consumed by Table; other components keep their own defaults.',
  propLocale:
    'Shallow-merged into the parent locale. Consumed by Empty, Pagination, Popconfirm, Upload, Form field markers, SchemaForm submit, Transfer and Calendar. Presets available: `en_US`, `ru_RU`.',
  propChildren: 'Subtree that reads the merged config via `useConfig()`.',

  localeTable:
    'Table strings (empty state, filter reset/confirm, search placeholder, sort indicators, row count formatters, column actions).',
  localePagination: 'Pagination labels — total prefix, page-size label, jump input.',
  localeDataGrid: 'DataGrid empty text and "Select all" label.',
  localeModal: 'Modal OK / Cancel button labels.',
  localePopconfirm: 'Popconfirm OK / Cancel button labels.',
  localeEmpty: 'Default Empty description.',
  localeForm: 'Required / optional markers + submit/reset button labels.',
  localeUpload: 'Upload trigger, remove, preview, and error strings.',
  localeTransfer: 'Transfer list titles, search placeholder, empty content, unit labels.',
  localeCalendar: 'Month / weekday names and "Today" button label.',

  hookUseConfig:
    'Returns the merged SgConfig from the nearest ancestor ConfigProvider. Components use it to resolve `size` / `disabled` / `locale`.',
  hookUseConfigWithDefaults:
    'Resolves effective `size` and `disabled` from props → context → defaults. Returns the original props plus `resolvedSize` and `resolvedDisabled`.',

  presetEnUs: 'English (US) locale preset. Covers all components currently consuming locale.',
  presetRuRu: 'Russian (RU) locale preset. Covers all components currently consuming locale.',
} as const

/** Writable string map — use for props / table builders (same keys as `configProviderDocEn`). */
export type ConfigProviderDocStrings = { -readonly [K in keyof typeof configProviderDocEn]: string }
