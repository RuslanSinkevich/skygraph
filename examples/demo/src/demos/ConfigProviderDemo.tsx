import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { useConfigProviderDocStrings } from './config-provider-doc/useConfigProviderDocStrings'

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

export function ConfigProviderDemo() {
  const t = useConfigProviderDocStrings()

  const providerProps = useMemo<PropDef[]>(
    () => [
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'" },
      { name: 'disabled', description: t.propDisabled, type: 'boolean' },
      { name: 'bordered', description: t.propBordered, type: 'boolean' },
      { name: 'locale', description: t.propLocale, type: 'SgLocale' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
    ],
    [t],
  )

  const localeProps = useMemo<PropDef[]>(
    () => [
      { name: 'table', description: t.localeTable, type: 'TableLocale' },
      { name: 'pagination', description: t.localePagination, type: 'PaginationLocale' },
      { name: 'dataGrid', description: t.localeDataGrid, type: 'DataGridLocale' },
      { name: 'modal', description: t.localeModal, type: 'ModalLocale' },
      { name: 'popconfirm', description: t.localePopconfirm, type: 'PopconfirmLocale' },
      { name: 'empty', description: t.localeEmpty, type: 'EmptyLocale' },
      { name: 'form', description: t.localeForm, type: 'FormLocale' },
      { name: 'upload', description: t.localeUpload, type: 'UploadLocale' },
      { name: 'transfer', description: t.localeTransfer, type: 'TransferLocale' },
      { name: 'calendar', description: t.localeCalendar, type: 'CalendarLocale' },
    ],
    [t],
  )

  const hookProps = useMemo<PropDef[]>(
    () => [
      { name: 'useConfig()', description: t.hookUseConfig, type: '() => SgConfig' },
      {
        name: 'useConfigWithDefaults(props, defaults)',
        description: t.hookUseConfigWithDefaults,
        type: '(props, defaults) => props & { resolvedSize, resolvedDisabled }',
      },
    ],
    [t],
  )

  const presetProps = useMemo<PropDef[]>(
    () => [
      { name: 'en_US', description: t.presetEnUs, type: 'SgLocale' },
      { name: 'ru_RU', description: t.presetRuRu, type: 'SgLocale' },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox
        title={t.demoSizeTitle}
        description={t.demoSizeDesc}
        code={SizeSource}
      >
        <SizeConfigProvider />
      </DemoBox>

      <DemoBox
        title={t.demoDisabledTitle}
        description={t.demoDisabledDesc}
        code={DisabledSource}
      >
        <DisabledConfigProvider />
      </DemoBox>

      <DemoBox
        title={t.demoNestedTitle}
        description={t.demoNestedDesc}
        code={NestedSource}
      >
        <NestedConfigProvider />
      </DemoBox>

      <DemoBox
        title={t.demoBorderedTitle}
        description={t.demoBorderedDesc}
        code={BorderedSource}
      >
        <BorderedConfigProvider />
      </DemoBox>

      <DemoBox
        title={t.demoLocaleTitle}
        description={t.demoLocaleDesc}
        code={LocaleSource}
      >
        <LocaleConfigProvider />
      </DemoBox>

      <DemoBox
        title={t.demoThemeTitle}
        description={t.demoThemeDesc}
        code={ThemeScopeSource}
      >
        <ThemeScopeConfigProvider />
      </DemoBox>

      <DemoBox
        title={t.demoHookTitle}
        description={t.demoHookDesc}
        code={UseConfigHookSource}
      >
        <UseConfigHookDemo />
      </DemoBox>

      <PropsTable title={t.tableProviderApi} data={providerProps} />
      <PropsTable title={t.tableLocaleShape} data={localeProps} />
      <PropsTable title={t.tablePresets} data={presetProps} />
      <PropsTable title={t.tableHooks} data={hookProps} />
    </ComponentDoc>
  )
}
