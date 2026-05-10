<script setup lang="ts">
/**
 * `ResultDemo` — aggregator for the Result component page.
 *
 * Mirrors `examples/demo/src/demos/ResultDemo.tsx` (8 examples).
 * Vue-specific delta: `title` / `subTitle` are `string` only;
 * `icon` and `extra` are slots, not props.
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

import { useResultDocStrings } from './result-doc/useStrings'

import SuccessResult from './result/Success.demo.vue'
import SuccessSource from './result/Success.demo.vue?raw'
import ErrorResult from './result/Error.demo.vue'
import ErrorSource from './result/Error.demo.vue?raw'
import InfoWarningResult from './result/InfoWarning.demo.vue'
import InfoWarningSource from './result/InfoWarning.demo.vue?raw'
import HttpResult from './result/Http.demo.vue'
import HttpSource from './result/Http.demo.vue?raw'
import CustomIconResult from './result/CustomIcon.demo.vue'
import CustomIconSource from './result/CustomIcon.demo.vue?raw'
import WithContentResult from './result/WithContent.demo.vue'
import WithContentSource from './result/WithContent.demo.vue?raw'
import TokensOverrideResult from './result/TokensOverride.demo.vue'
import TokensOverrideSource from './result/TokensOverride.demo.vue?raw'
import UnstyledResult from './result/Unstyled.demo.vue'
import UnstyledSource from './result/Unstyled.demo.vue?raw'

const t = useResultDocStrings()

const resultProps = computed<PropDef[]>(() => [
  {
    name: 'status',
    description: t.value.propStatus,
    type: "'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'",
    required: true,
  },
  { name: 'title', description: t.value.propTitle, type: 'string', required: true },
  { name: 'subTitle', description: t.value.propSubTitle, type: 'string' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '#icon', description: t.value.propIconSlot, type: 'slot' },
  { name: '#extra', description: t.value.propExtraSlot, type: 'slot' },
  { name: '#default', description: t.value.propDefaultSlot, type: 'slot' },
])

const resultCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-success', default: '#52c41a', description: t.value.cssSuccess },
  { name: 'sg-color-error', default: '#ff4d4f', description: t.value.cssError },
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssInfo },
  { name: 'sg-color-warning', default: '#faad14', description: t.value.cssWarning },
  { name: 'sg-color-bg-secondary', default: '#fafafa', description: t.value.cssBgSecondary },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssTextSecondary,
  },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssBorderRadius },
  { name: 'sg-font-size-xl', default: '20px', description: t.value.cssFontSizeXl },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbResult]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoSuccessTitle" :description="t.demoSuccessDesc" :code="SuccessSource">
      <SuccessResult />
    </DemoBox>

    <DemoBox :title="t.demoErrorTitle" :description="t.demoErrorDesc" :code="ErrorSource">
      <ErrorResult />
    </DemoBox>

    <DemoBox
      :title="t.demoInfoWarningTitle"
      :description="t.demoInfoWarningDesc"
      :code="InfoWarningSource"
    >
      <InfoWarningResult />
    </DemoBox>

    <DemoBox :title="t.demoHttpTitle" :description="t.demoHttpDesc" :code="HttpSource">
      <HttpResult />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomIconTitle"
      :description="t.demoCustomIconDesc"
      :code="CustomIconSource"
    >
      <CustomIconResult />
    </DemoBox>

    <DemoBox
      :title="t.demoWithContentTitle"
      :description="t.demoWithContentDesc"
      :code="WithContentSource"
    >
      <WithContentResult />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideResult />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledResult />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableResultApi" :data="resultProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="resultCssVars" />
    </template>
  </ComponentDoc>
</template>
