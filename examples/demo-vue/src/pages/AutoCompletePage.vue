<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgAutoComplete, type AutoCompleteOption } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'AutoComplete',
    lead: 'Free-form text input with suggestion dropdown — like Input, but suggesting matches as the user types.',
    when1: 'Typeahead for known but freely-editable values (cities, tags, recipients).',
    when2: 'Quick filter against a small option set without forcing a strict pick.',
    basicTitle: 'Basic',
    basicDesc: 'Static suggestion list, two-way bound value.',
    emailTitle: 'Email domain hint',
    emailDesc: 'Append common domains as the user types.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Same size tokens as Input.',
    statusTitle: 'Disabled',
    statusDesc: 'Non-interactive read-only state.',
  },
  ru: {
    title: 'AutoComplete',
    lead: 'Свободное поле ввода с выпадающими подсказками — как Input, но с автодополнением.',
    when1: 'Typeahead по известным редактируемым значениям (города, теги, адресаты).',
    when2: 'Быстрый фильтр без жёсткого выбора из списка.',
    basicTitle: 'Basic',
    basicDesc: 'Статический список подсказок, двусторонний биндинг.',
    emailTitle: 'Подсказка email-домена',
    emailDesc: 'Добавляются распространённые домены по мере ввода.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Те же размерные токены, что у Input.',
    statusTitle: 'Disabled',
    statusDesc: 'Неактивное состояние только для чтения.',
  },
})

const v1 = ref('Apple')
const v2 = ref('user@')

const fruits: AutoCompleteOption[] = [
  { value: 'Apple' },
  { value: 'Banana' },
  { value: 'Cherry' },
  { value: 'Durian' },
  { value: 'Mango' },
]

const emailOptions = computed<AutoCompleteOption[]>(() => {
  const at = v2.value.indexOf('@')
  if (at === -1) return []
  const left = v2.value.slice(0, at + 1)
  return ['gmail.com', 'outlook.com', 'yahoo.com', 'proton.me'].map((d) => ({
    value: left + d,
    label: left + d,
  }))
})

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Two-way bound value.', type: 'string' },
  {
    name: 'options',
    description: 'Suggestion list.',
    type: 'AutoCompleteOption[]',
    required: true,
  },
  { name: 'placeholder', description: 'Input placeholder.', type: 'string' },
  {
    name: 'size',
    description: 'Size token.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: 'Disable editing.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const optionProps: PropDef[] = [
  { name: 'value', description: 'Stored value emitted on select.', type: 'string', required: true },
  { name: 'label', description: 'Display text — falls back to `value`.', type: 'string' },
]

const BASIC = `<SgAutoComplete v-model="value" :options="fruits" placeholder="Pick a fruit" />`
const EMAIL = `<SgAutoComplete v-model="email" :options="emailOptions" />`
const SIZES = `<SgAutoComplete size="small" :options="opts" />
<SgAutoComplete size="middle" :options="opts" />
<SgAutoComplete size="large" :options="opts" />`
const DISABLED = `<SgAutoComplete value="locked" :options="opts" disabled />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'AutoComplete']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgAutoComplete v-model="v1" :options="fruits" placeholder="Pick a fruit" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v1 }}</span>
    </DemoBox>

    <DemoBox :title="t.emailTitle" :description="t.emailDesc" :code="EMAIL">
      <SgAutoComplete v-model="v2" :options="emailOptions" placeholder="user@…" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgAutoComplete size="small" :options="fruits" placeholder="Small" />
      <SgAutoComplete size="middle" :options="fruits" placeholder="Middle" />
      <SgAutoComplete size="large" :options="fruits" placeholder="Large" />
    </DemoBox>

    <DemoBox :title="t.statusTitle" :description="t.statusDesc" :code="DISABLED">
      <SgAutoComplete value="locked" :options="fruits" disabled />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
      <PropsTable title="AutoCompleteOption" :data="optionProps" />
    </template>
  </ComponentDoc>
</template>
