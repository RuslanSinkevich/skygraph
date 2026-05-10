<script setup lang="ts">
import { SgDescriptions, type DescriptionsItem } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Descriptions',
    lead: 'Read-only label / value grid — order summary, profile cards, technical specs.',
    when1: 'Display structured details on a detail page.',
    when2: 'Order / invoice summary inside a card.',
    basicTitle: 'Basic',
    basicDesc: 'Three columns, no border.',
    borderedTitle: 'Bordered',
    borderedDesc: 'Table-style with cell borders.',
    verticalTitle: 'Vertical layout',
    verticalDesc: 'Labels above values (good for narrow columns).',
    spanTitle: 'Span',
    spanDesc: 'Items can span multiple columns.',
  },
  ru: {
    title: 'Descriptions',
    lead: 'Read-only сетка label/value — карточки заказов, профилей, технических данных.',
    when1: 'Структурированные детали на странице сущности.',
    when2: 'Сводка заказа / invoice внутри карточки.',
    basicTitle: 'Basic',
    basicDesc: 'Три колонки, без рамок.',
    borderedTitle: 'Bordered',
    borderedDesc: 'Табличная разметка с рамками ячеек.',
    verticalTitle: 'Vertical layout',
    verticalDesc: 'Лейблы над значениями (для узких колонок).',
    spanTitle: 'Span',
    spanDesc: 'Элементы могут занимать несколько колонок.',
  },
})

const items: DescriptionsItem[] = [
  { label: 'Name', value: 'Cloud Atlas' },
  { label: 'Status', value: 'Active' },
  { label: 'Plan', value: 'Pro' },
  { label: 'Created', value: '2025-11-12' },
  { label: 'Region', value: 'eu-central-1' },
  { label: 'Owner', value: 'team@skygraph.dev' },
]

const itemsSpan: DescriptionsItem[] = [
  { label: 'Name', value: 'Cloud Atlas', span: 2 },
  { label: 'Status', value: 'Active' },
  {
    label: 'Description',
    value: 'Edge-deployed reactive UI library bundled with the Sky platform.',
    span: 3,
  },
]

const propsData: PropDef[] = [
  { name: 'title', description: 'Optional heading.', type: 'string' },
  {
    name: 'items',
    description: 'Rows built from these items.',
    type: 'DescriptionsItem[]',
    required: true,
  },
  { name: 'bordered', description: 'Render with cell borders.', type: 'boolean', default: 'false' },
  { name: 'column', description: 'Number of columns per row.', type: 'number', default: '3' },
  {
    name: 'layout',
    description: 'Horizontal or vertical layout.',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  { name: 'colon', description: 'Append ":" after labels.', type: 'boolean', default: 'true' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'" },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const itemPropsTable: PropDef[] = [
  { name: 'label', description: 'Field label.', type: 'string', required: true },
  { name: 'value', description: 'Value content.', type: 'string', required: true },
  { name: 'span', description: 'Column span (max `column`).', type: 'number' },
  { name: 'key', description: 'Optional stable key.', type: 'string' },
]

const BASIC = `<SgDescriptions title="Project" :items="items" />`
const BORDERED = `<SgDescriptions bordered title="Project" :items="items" />`
const VERTICAL = `<SgDescriptions layout="vertical" :items="items" />`
const SPAN = `<SgDescriptions bordered :items="[
  { label: 'Name', value: 'Cloud Atlas', span: 2 },
  { label: 'Status', value: 'Active' },
  { label: 'Description', value: '…', span: 3 },
]" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Descriptions']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgDescriptions title="Project" :items="items" />
    </DemoBox>

    <DemoBox :title="t.borderedTitle" :description="t.borderedDesc" :code="BORDERED" vertical>
      <SgDescriptions bordered title="Project" :items="items" />
    </DemoBox>

    <DemoBox :title="t.verticalTitle" :description="t.verticalDesc" :code="VERTICAL" vertical>
      <SgDescriptions layout="vertical" :items="items" />
    </DemoBox>

    <DemoBox :title="t.spanTitle" :description="t.spanDesc" :code="SPAN" vertical>
      <SgDescriptions bordered :items="itemsSpan" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
      <PropsTable title="DescriptionsItem" :data="itemPropsTable" />
    </template>
  </ComponentDoc>
</template>
