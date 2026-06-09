<script setup lang="ts">
/**
 * `RateDemo` — aggregator for the Rate component page.
 *
 * Mirrors `examples/demo/src/demos/RateDemo.tsx` (8 examples).
 * Vue delta: `CustomCharacter` shows three glyph rows — `SgRate`
 * accepts `character` as a string only (no SVG/VNode support yet).
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
import { useRateDocStrings } from './rate-doc/useStrings'

import BasicRateDemo from './rate/Basic.demo.vue'
import BasicSource from './rate/Basic.demo.vue?raw'
import AllowHalfRateDemo from './rate/AllowHalf.demo.vue'
import AllowHalfSource from './rate/AllowHalf.demo.vue?raw'
import CountRateDemo from './rate/Count.demo.vue'
import CountSource from './rate/Count.demo.vue?raw'
import CustomCharacterRateDemo from './rate/CustomCharacter.demo.vue'
import CustomCharacterSource from './rate/CustomCharacter.demo.vue?raw'
import DisabledRateDemo from './rate/Disabled.demo.vue'
import DisabledSource from './rate/Disabled.demo.vue?raw'
import InFormRateDemo from './rate/InForm.demo.vue'
import InFormSource from './rate/InForm.demo.vue?raw'
import TokensOverrideRateDemo from './rate/TokensOverride.demo.vue'
import TokensOverrideSource from './rate/TokensOverride.demo.vue?raw'

const t = useRateDocStrings()

const rateProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'number' },
  { name: 'value', description: t.value.propValue, type: 'number' },
  {
    name: 'defaultValue',
    description: t.value.propDefaultValue,
    type: 'number',
    default: '0',
  },
  { name: 'count', description: t.value.propCount, type: 'number', default: '5' },
  { name: 'allowHalf', description: t.value.propAllowHalf, type: 'boolean', default: 'false' },
  { name: 'character', description: t.value.propCharacter, type: 'string', default: "'★'" },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: number) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(value: number) => void' },
])

const rateCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-star', default: '#fadb14', description: t.value.cssSgColorStar },
  {
    name: 'sg-color-border',
    default: 'rgba(5, 5, 5, 0.06)',
    description: t.value.cssSgColorBorder,
  },
  {
    name: 'sg-rate-symbol-empty-opacity',
    default: '0.42',
    description: t.value.cssSgRateSymbolEmptyOpacity,
  },
  { name: 'sg-font-size-xl', default: '20px', description: t.value.cssSgFontSizeXl },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
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
    :crumbs="[t.crumbCategory, t.crumbRate]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicRateDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoAllowHalfTitle"
      :description="t.demoAllowHalfDesc"
      :code="AllowHalfSource"
    >
      <AllowHalfRateDemo />
    </DemoBox>

    <DemoBox :title="t.demoCountTitle" :description="t.demoCountDesc" :code="CountSource">
      <CountRateDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomCharacterTitle"
      :description="t.demoCustomCharacterDesc"
      :code="CustomCharacterSource"
    >
      <CustomCharacterRateDemo />
    </DemoBox>

    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledRateDemo />
    </DemoBox>

    <DemoBox :title="t.demoInFormTitle" :description="t.demoInFormDesc" :code="InFormSource">
      <InFormRateDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensOverrideTitle"
      :description="t.demoTokensOverrideDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideRateDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableRateApi" :data="rateProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="rateCssVars" />
    </template>
  </ComponentDoc>
</template>
