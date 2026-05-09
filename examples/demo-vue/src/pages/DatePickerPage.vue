<script setup lang="ts">
import { ref } from 'vue'
import { SgDatePicker } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'DatePicker',
    lead: 'Date / month / year picker with optional time and customizable disabled days.',
    when1: 'Pick an exact date in forms (birthday, expiry, deadline).',
    when2: 'Use date+time when scheduling (showTime).',
    basicTitle: 'Basic',
    basicDesc: 'Default date picker.',
    formatTitle: 'Custom format',
    formatDesc: 'Display format string.',
    pickerTitle: 'Picker level',
    pickerDesc: 'date / month / year.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three sizes.',
  },
  ru: {
    title: 'DatePicker',
    lead: 'Выбор даты / месяца / года, опционально со временем и disabled days.',
    when1: 'Точная дата в формах (день рождения, дедлайн, срок).',
    when2: 'showTime — для планировщиков с датой+временем.',
    basicTitle: 'Basic',
    basicDesc: 'Дефолтный date picker.',
    formatTitle: 'Свой формат',
    formatDesc: 'Шаблон отображения.',
    pickerTitle: 'Уровень',
    pickerDesc: 'date / month / year.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
  },
})

const v1 = ref<Date | null>(null)
const v2 = ref<Date | null>(new Date())
const v3 = ref<Date | null>(null)
const v4 = ref<Date | null>(null)

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Selected date.', type: 'Date | null' },
  { name: 'placeholder', description: 'Placeholder text.', type: 'string', default: "'Select date'" },
  { name: 'format', description: 'Display format.', type: 'string' },
  { name: 'picker', description: 'Picker level.', type: "'date' | 'month' | 'year'", default: "'date'" },
  { name: 'showTime', description: 'Show time-of-day columns.', type: 'boolean', default: 'false' },
  { name: 'allowClear', description: 'Show clear button.', type: 'boolean', default: 'true' },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'", default: "'middle'" },
]

const BASIC = `<SgDatePicker v-model="value" />`
const FORMAT = `<SgDatePicker v-model="value" format="DD/MM/YYYY" />`
const PICKER = `<SgDatePicker v-model="value" picker="month" />
<SgDatePicker v-model="value" picker="year" />`
const SIZES = `<SgDatePicker size="small" />
<SgDatePicker size="middle" />
<SgDatePicker size="large" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'DatePicker']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgDatePicker v-model="v1" />
    </DemoBox>

    <DemoBox :title="t.formatTitle" :description="t.formatDesc" :code="FORMAT">
      <SgDatePicker v-model="v2" format="DD/MM/YYYY" />
    </DemoBox>

    <DemoBox :title="t.pickerTitle" :description="t.pickerDesc" :code="PICKER">
      <SgDatePicker v-model="v3" picker="month" />
      <SgDatePicker v-model="v4" picker="year" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgDatePicker size="small" />
      <SgDatePicker size="middle" />
      <SgDatePicker size="large" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
