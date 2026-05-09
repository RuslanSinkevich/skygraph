<script setup lang="ts">
import { ref } from 'vue'
import { SgSlider } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Slider',
    lead: 'Numeric input picker on a continuous range.',
    when1: 'Quickly choose a value when an exact number is not critical.',
    when2: 'Volume, opacity, brightness, range filters.',
    basicTitle: 'Basic',
    basicDesc: '0–100 default range.',
    rangeTitle: 'Custom range / step',
    rangeDesc: 'Bounded range with discrete step.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Non-interactive.',
  },
  ru: {
    title: 'Slider',
    lead: 'Выбор числового значения на непрерывном диапазоне.',
    when1: 'Быстрый выбор когда точное число не критично.',
    when2: 'Громкость, прозрачность, яркость, фильтры по диапазону.',
    basicTitle: 'Basic',
    basicDesc: 'Диапазон 0–100 по умолчанию.',
    rangeTitle: 'Свой диапазон и шаг',
    rangeDesc: 'Ограниченный диапазон с дискретным шагом.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Неактивный.',
  },
})

const v1 = ref(40)
const v2 = ref(2)

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Current value.', type: 'number' },
  { name: 'min', description: 'Lower bound.', type: 'number', default: '0' },
  { name: 'max', description: 'Upper bound.', type: 'number', default: '100' },
  { name: 'step', description: 'Discrete step.', type: 'number', default: '1' },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgSlider v-model="value" />`
const RANGE = `<SgSlider v-model="value" :min="0" :max="10" :step="1" />`
const DISABLED = `<SgSlider :model-value="50" :disabled="true" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Slider']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgSlider v-model="v1" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary);">value: {{ v1 }}</span>
    </DemoBox>

    <DemoBox :title="t.rangeTitle" :description="t.rangeDesc" :code="RANGE" vertical>
      <SgSlider v-model="v2" :min="0" :max="10" :step="1" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary);">value: {{ v2 }}</span>
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED" vertical>
      <SgSlider :model-value="50" :disabled="true" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
