<script setup lang="ts">
import { ref } from 'vue'
import { SgTimePicker } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'TimePicker',
    lead: 'Hour / minute / second picker with optional 12-hour mode and custom step.',
    when1: 'Booking flows that need a time of day.',
    when2: 'Settings — opening hours, scheduled jobs, reminders.',
    basicTitle: 'Basic',
    basicDesc: 'HH:mm:ss with seconds visible.',
    twelveTitle: '12-hour clock',
    twelveDesc: 'AM / PM column.',
    stepTitle: 'Custom steps',
    stepDesc: '15-minute step + no seconds.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three size tokens.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Non-interactive read-only display.',
  },
  ru: {
    title: 'TimePicker',
    lead: 'Выбор часов / минут / секунд, 12-часовой режим, кастомный шаг.',
    when1: 'Бронирование, где нужно время дня.',
    when2: 'Настройки — часы работы, задачи по расписанию, напоминания.',
    basicTitle: 'Basic',
    basicDesc: 'HH:mm:ss с секундами.',
    twelveTitle: '12-часовой формат',
    twelveDesc: 'Колонка AM / PM.',
    stepTitle: 'Свой шаг',
    stepDesc: 'Шаг 15 минут, без секунд.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Только для чтения.',
  },
})

const v1 = ref('09:30:00')
const v2 = ref('02:15:00')

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Two-way bound HH:mm:ss string.', type: 'string' },
  {
    name: 'placeholder',
    description: 'Input placeholder.',
    type: 'string',
    default: "'Select time'",
  },
  { name: 'format', description: 'Display format.', type: 'string' },
  {
    name: 'use12Hours',
    description: '12-hour clock with AM/PM.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'hourStep / minuteStep / secondStep',
    description: 'Step between values.',
    type: 'number',
    default: '1',
  },
  { name: 'showSecond', description: 'Show seconds column.', type: 'boolean', default: 'true' },
  { name: 'showNow', description: 'Show "Now" button.', type: 'boolean', default: 'true' },
  { name: 'allowClear', description: 'Show clear control.', type: 'boolean', default: 'true' },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: 'Size token.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgTimePicker v-model="value" />`
const TWELVE = `<SgTimePicker use-12-hours v-model="value" />`
const STEPS = `<SgTimePicker :minute-step="15" :show-second="false" />`
const SIZES = `<SgTimePicker size="small" />
<SgTimePicker size="middle" />
<SgTimePicker size="large" />`
const DISABLED = `<SgTimePicker disabled value="08:00:00" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'TimePicker']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgTimePicker v-model="v1" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v1 }}</span>
    </DemoBox>

    <DemoBox :title="t.twelveTitle" :description="t.twelveDesc" :code="TWELVE">
      <SgTimePicker :use12-hours="true" v-model="v2" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v2 }}</span>
    </DemoBox>

    <DemoBox :title="t.stepTitle" :description="t.stepDesc" :code="STEPS">
      <SgTimePicker :minute-step="15" :show-second="false" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgTimePicker size="small" />
      <SgTimePicker size="middle" />
      <SgTimePicker size="large" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgTimePicker disabled value="08:00:00" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
