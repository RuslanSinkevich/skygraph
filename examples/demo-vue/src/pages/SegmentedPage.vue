<script setup lang="ts">
import { ref } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Segmented',
    lead: 'Pill-shaped switch between a small set of mutually-exclusive options.',
    when1: 'Switch view modes (List / Grid, Day / Week / Month).',
    when2: 'Toggle between two or three filters without a dropdown.',
    basicTitle: 'Basic',
    basicDesc: 'Three options, single-select.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three size tokens.',
    blockTitle: 'Block',
    blockDesc: 'Stretches to fill its parent.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Per-option `disabled` flag and global `disabled`.',
  },
  ru: {
    title: 'Segmented',
    lead: 'Pill-переключатель из небольшого набора взаимоисключающих опций.',
    when1: 'Смена режима отображения (List / Grid, Day / Week / Month).',
    when2: 'Переключение между двумя-тремя фильтрами без dropdown.',
    basicTitle: 'Basic',
    basicDesc: 'Три опции, одиночный выбор.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
    blockTitle: 'Block',
    blockDesc: 'Растягивается на ширину родителя.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Per-option `disabled` и глобальный `disabled`.',
  },
})

const v = ref('list')

const propsData: PropDef[] = [
  {
    name: 'options',
    description: 'Options array (string or { label, value, disabled }).',
    type: 'SegmentedOption[]',
    required: true,
  },
  { name: 'value', description: 'Controlled value.', type: 'string' },
  { name: 'defaultValue', description: 'Initial value when uncontrolled.', type: 'string' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'" },
  { name: 'disabled', description: 'Disable the control.', type: 'boolean' },
  { name: 'block', description: 'Stretch to full width.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgSegmented v-model:value="v" :options="['list', 'grid', 'kanban']" />`
const SIZES = `<SgSegmented size="small" :options="['Day', 'Week', 'Month']" />
<SgSegmented :options="['Day', 'Week', 'Month']" />
<SgSegmented size="large" :options="['Day', 'Week', 'Month']" />`
const BLOCK = `<SgSegmented block :options="['Free', 'Pro', 'Enterprise']" />`
const DISABLED = `<SgSegmented disabled :options="['One', 'Two', 'Three']" default-value="One" />
<SgSegmented :options="[
  { label: 'Day', value: 'd' },
  { label: 'Week', value: 'w', disabled: true },
  { label: 'Month', value: 'm' },
]" default-value="d" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="navigation"
    :crumbs="['Navigation', 'Segmented']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgSegmented :value="v" :options="['list', 'grid', 'kanban']" @change="v = $event" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v }}</span>
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgSegmented size="small" :options="['Day', 'Week', 'Month']" default-value="Day" />
      <SgSegmented :options="['Day', 'Week', 'Month']" default-value="Day" />
      <SgSegmented size="large" :options="['Day', 'Week', 'Month']" default-value="Day" />
    </DemoBox>

    <DemoBox :title="t.blockTitle" :description="t.blockDesc" :code="BLOCK" vertical>
      <SgSegmented block :options="['Free', 'Pro', 'Enterprise']" default-value="Pro" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgSegmented disabled :options="['One', 'Two', 'Three']" default-value="One" />
      <SgSegmented
        :options="[
          { label: 'Day', value: 'd' },
          { label: 'Week', value: 'w', disabled: true },
          { label: 'Month', value: 'm' },
        ]"
        default-value="d"
      />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
