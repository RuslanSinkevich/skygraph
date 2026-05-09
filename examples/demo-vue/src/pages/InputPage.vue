<script setup lang="ts">
import { ref } from 'vue'
import { SgInput } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Input',
    lead: 'Single-line text field with v-model, status, prefix/suffix slots and clear button.',
    when1: 'Capture short freeform text — names, emails, search queries.',
    when2: 'Use `status` to show validation feedback inside forms.',
    basicTitle: 'Basic',
    basicDesc: 'v-model two-way binding.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three size tokens.',
    statusTitle: 'Status',
    statusDesc: 'error / warning visually distinguish failed validation.',
    clearTitle: 'Allow clear',
    clearDesc: 'Adds a clear button when the field has a value.',
    disabledTitle: 'Disabled / Read-only',
    disabledDesc: 'Two non-interactive states.',
  },
  ru: {
    title: 'Input',
    lead: 'Однострочное поле ввода с v-model, статусами, slot-ами prefix/suffix и кнопкой очистки.',
    when1: 'Короткий свободный текст — имена, email, поиск.',
    when2: 'Используйте `status` для подсветки валидации внутри форм.',
    basicTitle: 'Basic',
    basicDesc: 'Двусторонний биндинг через v-model.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
    statusTitle: 'Статус',
    statusDesc: 'error / warning подсвечивают ошибку валидации.',
    clearTitle: 'Allow clear',
    clearDesc: 'Кнопка очистки появляется когда есть значение.',
    disabledTitle: 'Disabled / Read-only',
    disabledDesc: 'Два неактивных состояния.',
  },
})

const value = ref('Hello')

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Two-way bound value (Vue idiom + alias).', type: 'string', default: "''" },
  { name: 'placeholder', description: 'Placeholder when empty.', type: 'string' },
  { name: 'type', description: 'Native input type.', type: "'text' | 'email' | 'password' | 'number'", default: "'text'" },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'status', description: 'Validation status.', type: "'error' | 'warning'" },
  { name: 'allowClear', description: 'Render a clear button.', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable editing.', type: 'boolean', default: 'false' },
  { name: 'readOnly', description: 'Make read-only.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgInput v-model="value" placeholder="Type something" />`
const SIZES = `<SgInput size="small" placeholder="Small" />
<SgInput size="middle" placeholder="Middle" />
<SgInput size="large" placeholder="Large" />`
const STATUS = `<SgInput status="error" value="invalid" />
<SgInput status="warning" value="needs review" />`
const CLEAR = `<SgInput v-model="value" allow-clear placeholder="With clear" />`
const DISABLED = `<SgInput :disabled="true" value="disabled" />
<SgInput :read-only="true" value="read-only" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Input']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgInput v-model="value" placeholder="Type something" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary);">value: {{ value }}</span>
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgInput size="small" placeholder="Small" />
      <SgInput size="middle" placeholder="Middle" />
      <SgInput size="large" placeholder="Large" />
    </DemoBox>

    <DemoBox :title="t.statusTitle" :description="t.statusDesc" :code="STATUS">
      <SgInput status="error" value="invalid" />
      <SgInput status="warning" value="needs review" />
    </DemoBox>

    <DemoBox :title="t.clearTitle" :description="t.clearDesc" :code="CLEAR">
      <SgInput v-model="value" allow-clear placeholder="With clear" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgInput :disabled="true" value="disabled" />
      <SgInput :read-only="true" value="read-only" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
