<script setup lang="ts">
import { ref } from 'vue'
import { SgInputNumber } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'InputNumber',
    lead: 'Numeric input with min, max, step and precision.',
    when1: 'Capture quantities, prices, durations, or any bounded numeric value.',
    when2: 'When the user benefits from explicit increment / decrement controls.',
    basicTitle: 'Basic',
    basicDesc: 'v-model with default value.',
    rangeTitle: 'Min / max / step',
    rangeDesc: 'Bounded value with stepper.',
    precisionTitle: 'Precision',
    precisionDesc: 'Two-decimal numeric input.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three sizes.',
  },
  ru: {
    title: 'InputNumber',
    lead: 'Числовое поле с min, max, step и precision.',
    when1: 'Количества, цены, длительности и любые ограниченные числовые значения.',
    when2: 'Когда пользователю нужны явные кнопки инкремента/декремента.',
    basicTitle: 'Basic',
    basicDesc: 'v-model с начальным значением.',
    rangeTitle: 'Min / max / step',
    rangeDesc: 'Ограниченное значение с шагом.',
    precisionTitle: 'Precision',
    precisionDesc: 'Поле с двумя знаками после запятой.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
  },
})

const value = ref<number | null>(5)
const value2 = ref<number | null>(0)
const value3 = ref<number | null>(0.10)

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Current numeric value.', type: 'number | null' },
  { name: 'min', description: 'Lower bound.', type: 'number' },
  { name: 'max', description: 'Upper bound.', type: 'number' },
  { name: 'step', description: 'Stepper increment.', type: 'number', default: '1' },
  { name: 'precision', description: 'Decimal precision.', type: 'number' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgInputNumber v-model="value" />`
const RANGE = `<SgInputNumber v-model="value" :min="0" :max="10" :step="2" />`
const PRECISION = `<SgInputNumber v-model="value" :precision="2" :step="0.01" />`
const SIZES = `<SgInputNumber size="small" :model-value="1" />
<SgInputNumber size="middle" :model-value="1" />
<SgInputNumber size="large" :model-value="1" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'InputNumber']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgInputNumber v-model="value" />
    </DemoBox>

    <DemoBox :title="t.rangeTitle" :description="t.rangeDesc" :code="RANGE">
      <SgInputNumber v-model="value2" :min="0" :max="10" :step="2" />
    </DemoBox>

    <DemoBox :title="t.precisionTitle" :description="t.precisionDesc" :code="PRECISION">
      <SgInputNumber v-model="value3" :precision="2" :step="0.01" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgInputNumber size="small" :model-value="1" />
      <SgInputNumber size="middle" :model-value="1" />
      <SgInputNumber size="large" :model-value="1" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
