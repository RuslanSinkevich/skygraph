<script setup lang="ts">
import { ref } from 'vue'
import { SgTreeSelect } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'TreeSelect',
    lead: 'Select a node from a hierarchical tree, single or multi.',
    when1: 'Picking a folder, category, or org unit from a tree.',
    when2: 'When `Select` is too flat for the data you have.',
    basicTitle: 'Basic',
    basicDesc: 'Click to open, click a node to select.',
    multipleTitle: 'Multiple',
    multipleDesc: 'Multi-select with chips.',
    checkableTitle: 'Checkable',
    checkableDesc: 'Show checkboxes per node.',
    searchTitle: 'Search',
    searchDesc: 'Allow text search inside the dropdown.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three size tokens.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Non-interactive read-only display.',
  },
  ru: {
    title: 'TreeSelect',
    lead: 'Выбор узла из иерархического дерева, single / multi.',
    when1: 'Выбор папки, категории, оргединицы из дерева.',
    when2: 'Когда `Select` слишком плоский для данных.',
    basicTitle: 'Basic',
    basicDesc: 'Клик открывает, клик по узлу выбирает.',
    multipleTitle: 'Multiple',
    multipleDesc: 'Мульти-выбор с чипами.',
    checkableTitle: 'Checkable',
    checkableDesc: 'Чекбоксы на узлах.',
    searchTitle: 'Search',
    searchDesc: 'Поиск внутри dropdown.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Только для чтения.',
  },
})

const treeData = [
  {
    value: 'frontend',
    label: 'Frontend',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  {
    value: 'backend',
    label: 'Backend',
    children: [
      { value: 'node', label: 'Node.js' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
    ],
  },
]

const v1 = ref<string | number>('react')
const v2 = ref<(string | number)[]>(['react', 'vue'])

const propsData: PropDef[] = [
  { name: 'treeData', description: 'Selectable nodes.', type: 'TreeSelectNode[]' },
  {
    name: 'modelValue / value',
    description: 'Two-way bound value.',
    type: '(string | number) | (string | number)[]',
  },
  {
    name: 'placeholder',
    description: 'Input placeholder.',
    type: 'string',
    default: "'Please select'",
  },
  { name: 'multiple', description: 'Multi-select mode.', type: 'boolean', default: 'false' },
  {
    name: 'treeCheckable',
    description: 'Render checkboxes per node.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'showSearch', description: 'Allow text search.', type: 'boolean', default: 'false' },
  { name: 'allowClear', description: 'Show clear control.', type: 'boolean', default: 'true' },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: 'Size token.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgTreeSelect :tree-data="treeData" v-model="value" />`
const MULTI = `<SgTreeSelect multiple :tree-data="treeData" v-model="values" />`
const CHECK = `<SgTreeSelect tree-checkable :tree-data="treeData" v-model="values" />`
const SEARCH = `<SgTreeSelect show-search :tree-data="treeData" v-model="value" />`
const SIZES = `<SgTreeSelect size="small"  :tree-data="treeData" />
<SgTreeSelect size="middle" :tree-data="treeData" />
<SgTreeSelect size="large"  :tree-data="treeData" />`
const DISABLED = `<SgTreeSelect disabled :tree-data="treeData" value="react" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'TreeSelect']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgTreeSelect :tree-data="treeData" v-model="v1" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v1 }}</span>
    </DemoBox>

    <DemoBox :title="t.multipleTitle" :description="t.multipleDesc" :code="MULTI">
      <SgTreeSelect multiple :tree-data="treeData" v-model="v2" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v2 }}</span>
    </DemoBox>

    <DemoBox :title="t.checkableTitle" :description="t.checkableDesc" :code="CHECK">
      <SgTreeSelect tree-checkable :tree-data="treeData" v-model="v2" />
    </DemoBox>

    <DemoBox :title="t.searchTitle" :description="t.searchDesc" :code="SEARCH">
      <SgTreeSelect show-search :tree-data="treeData" v-model="v1" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgTreeSelect size="small" :tree-data="treeData" />
      <SgTreeSelect size="middle" :tree-data="treeData" />
      <SgTreeSelect size="large" :tree-data="treeData" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgTreeSelect disabled :tree-data="treeData" value="react" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
