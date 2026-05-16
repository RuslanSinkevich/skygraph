<script setup lang="ts">
/**
 * `AutoCompleteDemo` — aggregator for the AutoComplete component page.
 *
 * Mirrors `examples/demo/src/demos/AutoCompleteDemo.tsx` (7 examples).
 * Vue delta: `States` shows two disabled rows (no loading), `AsyncSearch`
 * surfaces progress in a side label rather than via `loading` —
 * `SgAutoComplete` lacks the `loading` prop.
 */
import { computed } from 'vue'
import {
  ComponentDoc,
  DemoBox,
  PropsTable,
  CssVarsTable,
  type PropDef,
  type CssVarDef,
} from './components'
import { useAutoCompleteDocStrings } from './autocomplete-doc/useStrings'

import BasicAutoCompleteDemo from './autocomplete/Basic.demo.vue'
import BasicSource from './autocomplete/Basic.demo.vue?raw'
import EmailDomainsAutoCompleteDemo from './autocomplete/EmailDomains.demo.vue'
import EmailDomainsSource from './autocomplete/EmailDomains.demo.vue?raw'
import AsyncSearchAutoCompleteDemo from './autocomplete/AsyncSearch.demo.vue'
import AsyncSearchSource from './autocomplete/AsyncSearch.demo.vue?raw'
import SizesAutoCompleteDemo from './autocomplete/Sizes.demo.vue'
import SizesSource from './autocomplete/Sizes.demo.vue?raw'
import StatesAutoCompleteDemo from './autocomplete/States.demo.vue'
import StatesSource from './autocomplete/States.demo.vue?raw'
import TokensOverrideAutoCompleteDemo from './autocomplete/TokensOverride.demo.vue'
import TokensOverrideSource from './autocomplete/TokensOverride.demo.vue?raw'
import UnstyledAutoCompleteDemo from './autocomplete/Unstyled.demo.vue'
import UnstyledSource from './autocomplete/Unstyled.demo.vue?raw'

const t = useAutoCompleteDocStrings()

const autoCompleteProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'string' },
  { name: 'value', description: t.value.propValue, type: 'string' },
  { name: 'defaultValue', description: t.value.propDefaultValue, type: 'string' },
  {
    name: 'options',
    description: t.value.propOptions,
    type: 'AutoCompleteOption[]',
  },
  { name: 'placeholder', description: t.value.propPlaceholder, type: 'string' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: string) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(value: string) => void' },
  { name: '@search', description: t.value.emitSearch, type: '(query: string) => void' },
  {
    name: '@select',
    description: t.value.emitSelect,
    type: '(value: string, option: AutoCompleteOption) => void',
  },
  { name: '@blur', description: t.value.emitBlur, type: '() => void' },
])

const optionProps = computed<PropDef[]>(() => [
  { name: 'value', description: t.value.propOptionValue, type: 'string' },
  { name: 'label', description: t.value.propOptionLabel, type: 'string' },
])

const autoCompleteCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-input-*', default: '—', description: t.value.cssSgInputAll },
  {
    name: 'sg-color-bg-elevated',
    default: '#ffffff',
    description: t.value.cssSgColorBgElevated,
  },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgHover,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextTertiary,
  },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  {
    name: 'sg-shadow-lg',
    default: '0 10px 30px rgba(0, 0, 0, 0.12)',
    description: t.value.cssSgShadowLg,
  },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
  { name: 'sg-padding-md', default: '16px', description: t.value.cssSgPaddingMd },
  {
    name: 'sg-transition-duration',
    default: '180ms',
    description: t.value.cssSgTransitionDuration,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbAutoComplete]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicAutoCompleteDemo />
    </DemoBox>

    <DemoBox :title="t.demoEmailTitle" :description="t.demoEmailDesc" :code="EmailDomainsSource">
      <EmailDomainsAutoCompleteDemo />
    </DemoBox>

    <DemoBox :title="t.demoAsyncTitle" :description="t.demoAsyncDesc" :code="AsyncSearchSource">
      <AsyncSearchAutoCompleteDemo />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesAutoCompleteDemo />
    </DemoBox>

    <DemoBox :title="t.demoStatesTitle" :description="t.demoStatesDesc" :code="StatesSource">
      <StatesAutoCompleteDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideAutoCompleteDemo />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledAutoCompleteDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableAutoCompleteApi" :data="autoCompleteProps" />
      <PropsTable :title="t.tableOptionApi" :data="optionProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="autoCompleteCssVars" />
    </template>
  </ComponentDoc>
</template>
