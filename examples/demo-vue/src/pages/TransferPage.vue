<script setup lang="ts">
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Transfer',
    lead: 'Two-pane picker for moving items between source and target sets.',
    when1: 'Permission editors, group memberships, "selected items" pickers.',
    when2: 'Any large set where bulk move is more ergonomic than checkbox lists.',
    basicTitle: 'Basic',
    basicDesc: 'Click to select, then move with the arrow buttons.',
    searchTitle: 'With search',
    searchDesc: 'Show search input on each pane.',
    titlesTitle: 'Custom titles',
    titlesDesc: 'Override the default "Source" / "Target".',
    onewayTitle: 'One-way',
    onewayDesc: 'Only allow moves left → right.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Non-interactive read-only display.',
  },
  ru: {
    title: 'Transfer',
    lead: 'Двухколоночный пикер для переноса элементов между наборами.',
    when1: 'Редакторы прав, members групп, пикеры «выбранных элементов».',
    when2: 'Большие наборы, где bulk-move удобнее списков с чекбоксами.',
    basicTitle: 'Basic',
    basicDesc: 'Клик выбирает, кнопки-стрелки переносят.',
    searchTitle: 'С поиском',
    searchDesc: 'Поиск в каждой колонке.',
    titlesTitle: 'Свои заголовки',
    titlesDesc: 'Переопределить «Source» / «Target».',
    onewayTitle: 'One-way',
    onewayDesc: 'Перенос только слева направо.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Только для чтения.',
  },
})

const data = Array.from({ length: 12 }).map((_, i) => ({
  key: `item-${i + 1}`,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
  disabled: i === 3,
}))

const v1 = ref<string[]>(['item-2'])
const v2 = ref<string[]>([])

const propsData: PropDef[] = [
  { name: 'dataSource', description: 'Source data set.', type: 'TransferItem[]' },
  {
    name: 'modelValue / targetKeys',
    description: 'Keys present in the right pane.',
    type: 'string[]',
  },
  {
    name: 'showSearch',
    description: 'Show search input on each pane.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'titles',
    description: 'Pane titles, [left, right].',
    type: '[string, string]',
    default: "['Source', 'Target']",
  },
  { name: 'oneWay', description: 'Only allow left → right.', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgTransfer :data-source="data" v-model="targetKeys" />`
const SEARCH = `<SgTransfer show-search :data-source="data" v-model="targetKeys" />`
const TITLES = `<SgTransfer
  :titles="['Available', 'Selected']"
  :data-source="data"
  v-model="targetKeys"
/>`
const ONEWAY = `<SgTransfer one-way :data-source="data" v-model="targetKeys" />`
const DISABLED = `<SgTransfer disabled :data-source="data" :target-keys="['item-2']" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Transfer']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgTransfer :data-source="data" v-model="v1" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">target: {{ v1 }}</span>
    </DemoBox>

    <DemoBox :title="t.searchTitle" :description="t.searchDesc" :code="SEARCH">
      <SgTransfer show-search :data-source="data" v-model="v2" />
    </DemoBox>

    <DemoBox :title="t.titlesTitle" :description="t.titlesDesc" :code="TITLES">
      <SgTransfer :titles="['Available', 'Selected']" :data-source="data" v-model="v2" />
    </DemoBox>

    <DemoBox :title="t.onewayTitle" :description="t.onewayDesc" :code="ONEWAY">
      <SgTransfer one-way :data-source="data" v-model="v2" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgTransfer disabled :data-source="data" :target-keys="['item-2']" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
