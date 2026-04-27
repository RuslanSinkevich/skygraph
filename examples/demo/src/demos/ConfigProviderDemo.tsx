import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { SizeConfigProvider } from './config-provider/Size.demo'
import SizeSource from './config-provider/Size.demo?raw'
import { DisabledConfigProvider } from './config-provider/Disabled.demo'
import DisabledSource from './config-provider/Disabled.demo?raw'
import { NestedConfigProvider } from './config-provider/Nested.demo'
import NestedSource from './config-provider/Nested.demo?raw'
import { BorderedConfigProvider } from './config-provider/Bordered.demo'
import BorderedSource from './config-provider/Bordered.demo?raw'
import { LocaleConfigProvider } from './config-provider/Locale.demo'
import LocaleSource from './config-provider/Locale.demo?raw'
import { UseConfigHookDemo } from './config-provider/UseConfigHook.demo'
import UseConfigHookSource from './config-provider/UseConfigHook.demo?raw'
import { ThemeScopeConfigProvider } from './config-provider/ThemeScope.demo'
import ThemeScopeSource from './config-provider/ThemeScope.demo?raw'

const providerProps: PropDef[] = [
  { name: 'size', description: 'Default `size` for descendants. Per-component props still win.', type: "'small' | 'middle' | 'large'" },
  { name: 'disabled', description: 'Disables every descendant control that reads the context (Input, Button, Select, Switch, Checkbox, etc.).', type: 'boolean' },
  { name: 'bordered', description: 'Default bordered flag. Currently consumed by Table; other components keep their own defaults.', type: 'boolean' },
  { name: 'locale', description: 'Shallow-merged into the parent locale. Currently consumed by Transfer (titles / search / not-found). Other components are queued for the i18n pass.', type: 'SgLocale' },
  { name: 'children', description: 'Subtree that reads the merged config via `useConfig()`.', type: 'ReactNode' },
]

const localeProps: PropDef[] = [
  { name: 'table', description: 'Table strings (empty state, filter reset/confirm, search placeholder, sort indicators, row count formatters, column actions).', type: 'TableLocale' },
  { name: 'pagination', description: 'Pagination labels — total prefix, page-size label, jump input.', type: 'PaginationLocale' },
  { name: 'dataGrid', description: 'DataGrid empty text and "Select all" label.', type: 'DataGridLocale' },
  { name: 'modal', description: 'Modal OK / Cancel button labels.', type: 'ModalLocale' },
  { name: 'popconfirm', description: 'Popconfirm OK / Cancel button labels.', type: 'PopconfirmLocale' },
  { name: 'empty', description: 'Default Empty description.', type: 'EmptyLocale' },
  { name: 'form', description: 'Required / optional markers + submit/reset button labels.', type: 'FormLocale' },
  { name: 'upload', description: 'Upload trigger, remove, preview, and error strings.', type: 'UploadLocale' },
  { name: 'transfer', description: 'Transfer list titles, search placeholder, empty content, unit labels.', type: 'TransferLocale' },
  { name: 'calendar', description: 'Month / weekday names and "Today" button label.', type: 'CalendarLocale' },
]

const hookProps: PropDef[] = [
  { name: 'useConfig()', description: 'Returns the merged SgConfig from the nearest ancestor ConfigProvider. Components use it to resolve `size` / `disabled` / `locale`.', type: '() => SgConfig' },
  { name: 'useConfigWithDefaults(props, defaults)', description: 'Resolves effective `size` and `disabled` from props → context → defaults. Returns the original props plus `resolvedSize` and `resolvedDisabled`.', type: '(props, defaults) => props & { resolvedSize, resolvedDisabled }' },
]

export function ConfigProviderDemo() {
  return (
    <ComponentDoc
      title="ConfigProvider"
      description="Root configuration for nested Skygraph components. Sets default `size`, `disabled`, `bordered`, and `locale` without passing props through every level."
      whenToUse={[
        'Apply a consistent `size` (or disable everything) across a whole page or dialog.',
        'Ship locale strings once at the app root instead of per-component.',
        'Nest providers to scope defaults to a form, a drawer, or a specific feature flag.',
      ]}
    >
      <DemoBox
        title="Size"
        description="A single provider propagates `size` to every descendant control. Input, Button, Select, Switch, Checkbox and more read it via `useConfig()`."
        code={SizeSource}
      >
        <SizeConfigProvider />
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Flip the whole subtree to a read-only state in one line — useful for preview panes, inactive tabs, or permission-gated UIs."
        code={DisabledSource}
      >
        <DisabledConfigProvider />
      </DemoBox>

      <DemoBox
        title="Nested providers + explicit props"
        description="Inner providers shallow-override the outer ones. Per-component props always win over both."
        code={NestedSource}
      >
        <NestedConfigProvider />
      </DemoBox>

      <DemoBox
        title="Bordered (Table)"
        description="`bordered` is plumbed for Table today — hosting that on the provider keeps every table aligned without touching individual instances."
        code={BorderedSource}
      >
        <BorderedConfigProvider />
      </DemoBox>

      <DemoBox
        title="Locale (Transfer)"
        description="`locale` is shallow-merged with the parent provider. Transfer reads `titles`, `searchPlaceholder`, `notFoundContent` from it — the rest of the tree is ready for the i18n rollout."
        code={LocaleSource}
      >
        <LocaleConfigProvider />
      </DemoBox>

      <DemoBox
        title="Theme + behaviour scope"
        description="`ConfigProvider` owns behaviour (size / disabled / locale). CSS tokens own visuals. Combine them on the same wrapper to ship self-contained micro-themes."
        code={ThemeScopeSource}
      >
        <ThemeScopeConfigProvider />
      </DemoBox>

      <DemoBox
        title="useConfig() hook"
        description="Custom components can read the merged config just like built-ins do. Handy for third-party controls that want to follow the same size / disabled contract."
        code={UseConfigHookSource}
      >
        <UseConfigHookDemo />
      </DemoBox>

      <PropsTable title="ConfigProvider API" data={providerProps} />
      <PropsTable title="SgLocale shape" data={localeProps} />
      <PropsTable title="Hooks" data={hookProps} />
    </ComponentDoc>
  )
}
