<script setup lang="ts">
import { ref } from 'vue'
import { SgColorPicker } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'ColorPicker',
    lead: 'Hex / RGB color picker with optional preset swatches.',
    when1: 'Theme editor or "brand color" form input.',
    when2: 'Per-item highlight colors (calendar events, tags, labels).',
    basicTitle: 'Basic',
    basicDesc: 'Click the swatch to open the picker panel.',
    presetsTitle: 'Presets',
    presetsDesc: 'Quick-pick swatch grid below the area.',
    textTitle: 'With text',
    textDesc: 'Show formatted color string next to the swatch.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three size tokens.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Non-interactive read-only display.',
  },
  ru: {
    title: 'ColorPicker',
    lead: 'Hex / RGB-пикер с опциональными пресетами.',
    when1: 'Редактор темы или поле «фирменный цвет».',
    when2: 'Per-item цвета (события календаря, теги, метки).',
    basicTitle: 'Basic',
    basicDesc: 'Клик по сватчу открывает панель.',
    presetsTitle: 'Пресеты',
    presetsDesc: 'Быстрый выбор из сетки сватчей.',
    textTitle: 'С текстом',
    textDesc: 'Отформатированная строка рядом со сватчем.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Только для чтения.',
  },
})

const v = ref('#1677ff')

const presets = [
  { label: 'Brand', colors: ['#1677ff', '#1890ff', '#722ed1', '#13c2c2'] },
  { label: 'Status', colors: ['#52c41a', '#faad14', '#ff4d4f', '#000000'] },
]

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Two-way bound color (hex string).', type: 'string' },
  { name: 'presets', description: 'Optional swatch groups.', type: 'Array<{ label, colors[] }>' },
  {
    name: 'showText',
    description: 'Show formatted text beside the swatch.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'format', description: 'Output format.', type: "'hex' | 'rgb'", default: "'hex'" },
  {
    name: 'trigger',
    description: 'Trigger interaction.',
    type: "'click' | 'hover'",
    default: "'click'",
  },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: 'Size token.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgColorPicker v-model="value" />`
const PRESETS = `<SgColorPicker v-model="value" :presets="[
  { label: 'Brand', colors: ['#1677ff', '#722ed1'] },
  { label: 'Status', colors: ['#52c41a', '#ff4d4f'] },
]" />`
const TEXT = `<SgColorPicker show-text v-model="value" />`
const SIZES = `<SgColorPicker size="small" />
<SgColorPicker size="middle" />
<SgColorPicker size="large" />`
const DISABLED = `<SgColorPicker disabled value="#1677ff" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'ColorPicker']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgColorPicker v-model="v" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v }}</span>
    </DemoBox>

    <DemoBox :title="t.presetsTitle" :description="t.presetsDesc" :code="PRESETS">
      <SgColorPicker v-model="v" :presets="presets" />
    </DemoBox>

    <DemoBox :title="t.textTitle" :description="t.textDesc" :code="TEXT">
      <SgColorPicker show-text v-model="v" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgColorPicker size="small" />
      <SgColorPicker size="middle" />
      <SgColorPicker size="large" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgColorPicker disabled value="#1677ff" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
