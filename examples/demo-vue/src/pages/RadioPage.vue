<script setup lang="ts">
import { ref } from 'vue'
import { SgRadio, type RadioOption } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Radio',
    lead: 'Pick exactly one option from a small mutually exclusive set.',
    when1: 'Two to seven mutually exclusive options.',
    when2: 'For more options or wide screens prefer Select.',
    horizontalTitle: 'Horizontal',
    horizontalDesc: 'Default direction.',
    verticalTitle: 'Vertical',
    verticalDesc: 'Stack vertically.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Whole group or single option.',
  },
  ru: {
    title: 'Radio',
    lead: 'Выбор ровно одного из небольшого взаимоисключающего набора.',
    when1: '2–7 взаимоисключающих вариантов.',
    when2: 'Если опций больше — берите Select.',
    horizontalTitle: 'Горизонтально',
    horizontalDesc: 'Направление по умолчанию.',
    verticalTitle: 'Вертикально',
    verticalDesc: 'Стек по вертикали.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Группа целиком или один опшн.',
  },
})

const opts: RadioOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'pear', label: 'Pear' },
  { value: 'orange', label: 'Orange' },
]

const opts2: RadioOption[] = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B (disabled)', disabled: true },
  { value: 'c', label: 'C' },
]

const v1 = ref<string>('apple')
const v2 = ref<string>('apple')
const v3 = ref<string>('a')

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Selected value.', type: 'string | number' },
  { name: 'options', description: 'Selectable options.', type: 'RadioOption[]', required: true },
  { name: 'direction', description: 'Stack direction.', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
  { name: 'disabled', description: 'Disable the whole group.', type: 'boolean', default: 'false' },
]

const HORIZ = `<SgRadio v-model="value" :options="opts" />`
const VERT = `<SgRadio v-model="value" direction="vertical" :options="opts" />`
const DISABLED = `<SgRadio v-model="value" :options="opts" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Radio']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.horizontalTitle" :description="t.horizontalDesc" :code="HORIZ">
      <SgRadio v-model="v1" :options="opts" />
    </DemoBox>

    <DemoBox :title="t.verticalTitle" :description="t.verticalDesc" :code="VERT">
      <SgRadio v-model="v2" direction="vertical" :options="opts" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgRadio v-model="v3" :options="opts2" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
