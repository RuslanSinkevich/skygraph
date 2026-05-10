<script setup lang="ts">
/**
 * `TextareaDemo` — aggregator for the Textarea component page.
 *
 * Vue-only — there is no `examples/demo/src/demos/TextareaDemo.tsx`
 * (see `findings/T-Vue-Demo-Foundation.md` → `react-textarea-no-demo`).
 * Per task-card decision, no `CssVarsTable` is rendered here ("Vue-only
 * → don't bootstrap a new doc contract").
 */
import { computed } from 'vue'
import {
  ComponentDoc,
  DemoBox,
  PropsTable,
  type PropDef,
} from './components'
import { useTextareaDocStrings } from './textarea-doc/useStrings'

import BasicTextarea from './textarea/Basic.demo.vue'
import BasicSource from './textarea/Basic.demo.vue?raw'
import RowsTextarea from './textarea/Rows.demo.vue'
import RowsSource from './textarea/Rows.demo.vue?raw'
import CountTextarea from './textarea/Count.demo.vue'
import CountSource from './textarea/Count.demo.vue?raw'
import SizesTextarea from './textarea/Sizes.demo.vue'
import SizesSource from './textarea/Sizes.demo.vue?raw'

const t = useTextareaDocStrings()

const textareaProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'string', default: "''" },
  { name: 'value', description: t.value.propValue, type: 'string' },
  { name: 'defaultValue', description: t.value.propDefaultValue, type: 'string' },
  { name: 'placeholder', description: t.value.propPlaceholder, type: 'string' },
  { name: 'rows', description: t.value.propRows, type: 'number', default: '4' },
  { name: 'maxLength', description: t.value.propMaxLength, type: 'number' },
  { name: 'showCount', description: t.value.propShowCount, type: 'boolean', default: 'false' },
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
  { name: '@focus', description: t.value.emitFocus, type: '() => void' },
  { name: '@blur', description: t.value.emitBlur, type: '() => void' },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbTextarea]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource" vertical>
      <BasicTextarea />
    </DemoBox>

    <DemoBox :title="t.demoRowsTitle" :description="t.demoRowsDesc" :code="RowsSource" vertical>
      <RowsTextarea />
    </DemoBox>

    <DemoBox :title="t.demoCountTitle" :description="t.demoCountDesc" :code="CountSource" vertical>
      <CountTextarea />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource" vertical>
      <SizesTextarea />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTextareaApi" :data="textareaProps" />
    </template>
  </ComponentDoc>
</template>
