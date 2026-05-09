<script setup lang="ts">
import { ref } from 'vue'
import { SgSelect, type SelectOption } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Select',
    lead: 'Single or multi-select dropdown with v-model.',
    when1: 'Pick one or several values from a small to medium list of options.',
    when2: 'When the dropdown should remain styled (use Cascader / TreeSelect for hierarchical data).',
    basicTitle: 'Basic',
    basicDesc: 'Single value v-model.',
    multiTitle: 'Multiple',
    multiDesc: 'Multi-select with removable tags.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three sizes.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Whole select disabled or just an option.',
  },
  ru: {
    title: 'Select',
    lead: 'Селект с одиночным или множественным выбором, v-model.',
    when1: 'Выбор одного или нескольких значений из небольшого списка.',
    when2: 'Когда нужен стилизованный dropdown (для иерархии — Cascader / TreeSelect).',
    basicTitle: 'Basic',
    basicDesc: 'Одиночный выбор через v-model.',
    multiTitle: 'Множественный',
    multiDesc: 'Множественный выбор с тегами.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Полностью или один опшн.',
  },
})

const opts: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'pear', label: 'Pear' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
]

const v1 = ref<string>('apple')
const v2 = ref<string[]>(['apple', 'pear'])
const v3 = ref<string>('apple')

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Selected value(s).', type: 'string | number | (string | number)[]' },
  { name: 'options', description: 'Selectable options list.', type: 'SelectOption[]', required: true },
  { name: 'placeholder', description: 'Placeholder text.', type: 'string', default: "'Select...'" },
  { name: 'multiple', description: 'Multi-select mode.', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Render the native <select>.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgSelect v-model="value" :options="opts" />`
const MULTI = `<SgSelect v-model="value" multiple :options="opts" />`
const SIZES = `<SgSelect size="small" :options="opts" />
<SgSelect size="middle" :options="opts" />
<SgSelect size="large" :options="opts" />`
const DISABLED = `<SgSelect :disabled="true" :options="opts" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Select']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <div style="min-width: 220px;">
        <SgSelect v-model="v1" :options="opts" />
      </div>
    </DemoBox>

    <DemoBox :title="t.multiTitle" :description="t.multiDesc" :code="MULTI">
      <div style="min-width: 320px;">
        <SgSelect v-model="v2" multiple :options="opts" />
      </div>
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <div style="min-width: 160px;"><SgSelect v-model="v3" size="small" :options="opts" /></div>
      <div style="min-width: 160px;"><SgSelect v-model="v3" size="middle" :options="opts" /></div>
      <div style="min-width: 160px;"><SgSelect v-model="v3" size="large" :options="opts" /></div>
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <div style="min-width: 220px;">
        <SgSelect :disabled="true" :options="opts" placeholder="Disabled" />
      </div>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
