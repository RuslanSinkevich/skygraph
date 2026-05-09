<script setup lang="ts">
import { ref } from 'vue'
import { SgTextarea } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Textarea',
    lead: 'Multi-line text input with row count, max length and live counter.',
    when1: 'Capture longer freeform text — comments, notes, descriptions.',
    when2: 'When you need a hard cap on length and visible counter.',
    basicTitle: 'Basic',
    basicDesc: 'v-model two-way binding.',
    rowsTitle: 'Rows',
    rowsDesc: 'Visible row count.',
    countTitle: 'With counter',
    countDesc: 'maxLength + showCount displays a live character counter.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three sizes.',
  },
  ru: {
    title: 'Textarea',
    lead: 'Многострочное поле с rows, maxLength и счётчиком.',
    when1: 'Длинный текст — комментарии, заметки, описания.',
    when2: 'Когда нужен жёсткий лимит длины и видимый счётчик.',
    basicTitle: 'Basic',
    basicDesc: 'Двусторонний биндинг через v-model.',
    rowsTitle: 'Rows',
    rowsDesc: 'Количество видимых строк.',
    countTitle: 'Со счётчиком',
    countDesc: 'maxLength + showCount показывает счётчик символов.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
  },
})

const v1 = ref('Hello\nworld')
const v2 = ref('Bigger one')
const v3 = ref('Counted')

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Two-way bound value.', type: 'string', default: "''" },
  { name: 'placeholder', description: 'Placeholder when empty.', type: 'string' },
  { name: 'rows', description: 'Visible row count.', type: 'number', default: '4' },
  { name: 'maxLength', description: 'Hard cap on input length.', type: 'number' },
  { name: 'showCount', description: 'Render a live counter under the field.', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable editing.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgTextarea v-model="value" placeholder="Type a note" />`
const ROWS = `<SgTextarea v-model="value" :rows="6" />`
const COUNT = `<SgTextarea v-model="value" :max-length="40" show-count />`
const SIZES = `<SgTextarea size="small" :rows="2" />
<SgTextarea size="middle" :rows="2" />
<SgTextarea size="large" :rows="2" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Textarea']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgTextarea v-model="v1" placeholder="Type a note" />
    </DemoBox>

    <DemoBox :title="t.rowsTitle" :description="t.rowsDesc" :code="ROWS" vertical>
      <SgTextarea v-model="v2" :rows="6" />
    </DemoBox>

    <DemoBox :title="t.countTitle" :description="t.countDesc" :code="COUNT" vertical>
      <SgTextarea v-model="v3" :max-length="40" show-count />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES" vertical>
      <SgTextarea size="small" :rows="2" placeholder="Small" />
      <SgTextarea size="middle" :rows="2" placeholder="Middle" />
      <SgTextarea size="large" :rows="2" placeholder="Large" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
