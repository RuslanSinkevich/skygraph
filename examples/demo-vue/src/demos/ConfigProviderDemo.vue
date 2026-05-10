<script setup lang="ts">
/**
 * `ConfigProviderDemo` — aggregator for the ConfigProvider page.
 *
 * Mirrors `examples/demo/src/demos/ConfigProviderDemo.tsx` 1:1.
 *
 * Vue-specific deltas (already documented in the doc strings):
 *   - The subtree comes via the default slot (React: `children`).
 *   - The hook composables are `useConfig()` and `useConfigWithDefaults()`,
 *     exported from `@skygraph/vue`.
 *   - There is intentionally NO CSS-vars table on this page —
 *     `SgConfigProvider` does not own any visual tokens (parity with the
 *     React reference).
 */
import { computed } from 'vue'
import {
  ComponentDoc,
  DemoBox,
  PropsTable,
  type PropDef,
} from './components'

import { useConfigProviderDocStrings } from './configprovider-doc/useStrings'

import SizeConfigProvider from './configprovider/Size.demo.vue'
import SizeSource from './configprovider/Size.demo.vue?raw'
import DisabledConfigProvider from './configprovider/Disabled.demo.vue'
import DisabledSource from './configprovider/Disabled.demo.vue?raw'
import NestedConfigProvider from './configprovider/Nested.demo.vue'
import NestedSource from './configprovider/Nested.demo.vue?raw'
import BorderedConfigProvider from './configprovider/Bordered.demo.vue'
import BorderedSource from './configprovider/Bordered.demo.vue?raw'
import LocaleConfigProvider from './configprovider/Locale.demo.vue'
import LocaleSource from './configprovider/Locale.demo.vue?raw'
import ThemeScopeConfigProvider from './configprovider/ThemeScope.demo.vue'
import ThemeScopeSource from './configprovider/ThemeScope.demo.vue?raw'
import UseConfigHookDemo from './configprovider/UseConfigHook.demo.vue'
import UseConfigHookSource from './configprovider/UseConfigHook.demo.vue?raw'

const t = useConfigProviderDocStrings()

const providerProps = computed<PropDef[]>(() => [
  { name: 'size', description: t.value.propSize, type: "'small' | 'middle' | 'large'" },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean' },
  { name: 'bordered', description: t.value.propBordered, type: 'boolean' },
  { name: 'locale', description: t.value.propLocale, type: 'SgLocale' },
  { name: 'default slot', description: t.value.slotDefault, type: 'slot' },
])

const localeProps = computed<PropDef[]>(() => [
  { name: 'table', description: t.value.localeTable, type: 'TableLocale' },
  { name: 'pagination', description: t.value.localePagination, type: 'PaginationLocale' },
  { name: 'dataGrid', description: t.value.localeDataGrid, type: 'DataGridLocale' },
  { name: 'modal', description: t.value.localeModal, type: 'ModalLocale' },
  { name: 'popconfirm', description: t.value.localePopconfirm, type: 'PopconfirmLocale' },
  { name: 'empty', description: t.value.localeEmpty, type: 'EmptyLocale' },
  { name: 'form', description: t.value.localeForm, type: 'FormLocale' },
  { name: 'upload', description: t.value.localeUpload, type: 'UploadLocale' },
  { name: 'transfer', description: t.value.localeTransfer, type: 'TransferLocale' },
  { name: 'calendar', description: t.value.localeCalendar, type: 'CalendarLocale' },
])

const presetProps = computed<PropDef[]>(() => [
  { name: 'en_US', description: t.value.presetEnUs, type: 'SgLocale' },
  { name: 'ru_RU', description: t.value.presetRuRu, type: 'SgLocale' },
])

const hookProps = computed<PropDef[]>(() => [
  {
    name: 'useConfig()',
    description: t.value.hookUseConfig,
    type: '() => ComputedRef<SgConfig>',
  },
  {
    name: 'useConfigWithDefaults(props, defaults)',
    description: t.value.hookUseConfigWithDefaults,
    type: '(props, defaults) => { resolvedSize, resolvedDisabled }',
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbConfigProvider]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoSizeTitle" :description="t.demoSizeDesc" :code="SizeSource">
      <SizeConfigProvider />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledTitle"
      :description="t.demoDisabledDesc"
      :code="DisabledSource"
    >
      <DisabledConfigProvider />
    </DemoBox>

    <DemoBox
      :title="t.demoNestedTitle"
      :description="t.demoNestedDesc"
      :code="NestedSource"
    >
      <NestedConfigProvider />
    </DemoBox>

    <DemoBox
      :title="t.demoBorderedTitle"
      :description="t.demoBorderedDesc"
      :code="BorderedSource"
    >
      <BorderedConfigProvider />
    </DemoBox>

    <DemoBox
      :title="t.demoLocaleTitle"
      :description="t.demoLocaleDesc"
      :code="LocaleSource"
    >
      <LocaleConfigProvider />
    </DemoBox>

    <DemoBox
      :title="t.demoThemeTitle"
      :description="t.demoThemeDesc"
      :code="ThemeScopeSource"
    >
      <ThemeScopeConfigProvider />
    </DemoBox>

    <DemoBox
      :title="t.demoHookTitle"
      :description="t.demoHookDesc"
      :code="UseConfigHookSource"
    >
      <UseConfigHookDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableProviderApi" :data="providerProps" />
      <PropsTable :title="t.tableLocaleShape" :data="localeProps" />
      <PropsTable :title="t.tablePresets" :data="presetProps" />
      <PropsTable :title="t.tableHooks" :data="hookProps" />
    </template>
  </ComponentDoc>
</template>
