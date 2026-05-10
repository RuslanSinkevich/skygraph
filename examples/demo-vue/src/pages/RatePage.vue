<script setup lang="ts">
import { ref } from 'vue'
import { SgRate } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Rate',
    lead: 'Star-style rating control. Whole or half steps, custom symbol, disabled state.',
    when1: 'Quick subjective scoring (reviews, satisfaction).',
    when2: 'Compact filter / quality indicator inside lists and tables.',
    basicTitle: 'Basic',
    basicDesc: 'Whole-star rating, default 5 symbols.',
    halfTitle: 'Allow half',
    halfDesc: 'Click on the left or right half of a symbol.',
    countTitle: 'Custom count',
    countDesc: 'Pick any number of symbols — 3 for nps, 10 for fine-grained.',
    customTitle: 'Custom character',
    customDesc: 'Pass any short string as the symbol.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Read-only display of an existing rating.',
  },
  ru: {
    title: 'Rate',
    lead: 'Звёздный рейтинг. Целые или половинные шаги, свой символ, состояние disabled.',
    when1: 'Быстрая субъективная оценка (отзывы, оценка сервиса).',
    when2: 'Компактный индикатор качества внутри списков и таблиц.',
    basicTitle: 'Basic',
    basicDesc: 'Целые звёзды, по умолчанию 5 символов.',
    halfTitle: 'Половинки',
    halfDesc: 'Клик по левой или правой половине символа.',
    countTitle: 'Своё количество',
    countDesc: 'Любое число символов — 3 для NPS, 10 для тонкой шкалы.',
    customTitle: 'Свой символ',
    customDesc: 'Любая короткая строка вместо звезды.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Только для чтения — отображение существующей оценки.',
  },
})

const v1 = ref(3)
const v2 = ref(2.5)

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Two-way bound rating.', type: 'number' },
  {
    name: 'defaultValue',
    description: 'Initial rating when uncontrolled.',
    type: 'number',
    default: '0',
  },
  { name: 'count', description: 'Number of symbols.', type: 'number', default: '5' },
  { name: 'allowHalf', description: 'Allow half steps.', type: 'boolean', default: 'false' },
  { name: 'character', description: 'Custom symbol (default ★).', type: 'string', default: "'★'" },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgRate v-model="value" />`
const HALF = `<SgRate v-model="value" allow-half />`
const COUNT = `<SgRate :count="10" :default-value="6" />`
const CUSTOM = `<SgRate character="❤" :default-value="3" />`
const DISABLED = `<SgRate :default-value="4" disabled />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Rate']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgRate v-model="v1" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v1 }}</span>
    </DemoBox>

    <DemoBox :title="t.halfTitle" :description="t.halfDesc" :code="HALF">
      <SgRate v-model="v2" allow-half />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v2 }}</span>
    </DemoBox>

    <DemoBox :title="t.countTitle" :description="t.countDesc" :code="COUNT">
      <SgRate :count="10" :default-value="6" />
    </DemoBox>

    <DemoBox :title="t.customTitle" :description="t.customDesc" :code="CUSTOM">
      <SgRate character="❤" :default-value="3" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgRate :default-value="4" disabled />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
