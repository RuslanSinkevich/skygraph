<script setup lang="ts">
import { ref } from 'vue'
import { SgCheckbox } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Checkbox',
    lead: 'Boolean / multi-select control with v-model and indeterminate state.',
    when1: 'Pick one or several items in a group.',
    when2: 'Use a single checkbox for an on/off opt-in (subscribe, accept terms).',
    basicTitle: 'Basic',
    basicDesc: 'A single checkbox with v-model.',
    statesTitle: 'States',
    statesDesc: 'Disabled and indeterminate.',
  },
  ru: {
    title: 'Checkbox',
    lead: 'Булевый или мульти-селект контрол с v-model и indeterminate состоянием.',
    when1: 'Один или несколько пунктов из группы.',
    when2: 'Один чекбокс для опции вкл/выкл (подписка, согласие).',
    basicTitle: 'Basic',
    basicDesc: 'Одиночный чекбокс с v-model.',
    statesTitle: 'Состояния',
    statesDesc: 'Disabled и indeterminate.',
  },
})

const v1 = ref(true)
const v2 = ref(false)

const propsData: PropDef[] = [
  { name: 'modelValue / checked', description: 'Checked state.', type: 'boolean' },
  { name: 'indeterminate', description: 'Show indeterminate visual state.', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgCheckbox v-model="value">Subscribe</SgCheckbox>`
const STATES = `<SgCheckbox :disabled="true">Disabled</SgCheckbox>
<SgCheckbox indeterminate>Indeterminate</SgCheckbox>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Checkbox']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgCheckbox v-model="v1">Subscribe</SgCheckbox>
      <SgCheckbox v-model="v2">Accept terms</SgCheckbox>
    </DemoBox>

    <DemoBox :title="t.statesTitle" :description="t.statesDesc" :code="STATES">
      <SgCheckbox :disabled="true">Disabled</SgCheckbox>
      <SgCheckbox :checked="true" :disabled="true">Disabled checked</SgCheckbox>
      <SgCheckbox indeterminate>Indeterminate</SgCheckbox>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
