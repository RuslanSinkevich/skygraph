<script setup lang="ts">
import { ref } from 'vue'
import { SgTree } from '@skygraph/vue'
import type { TreeKey, TreeNodeData } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Tree',
    lead: 'Hierarchical viewer with checkable, draggable, searchable, virtual-scroll modes.',
    when1: 'Folder structures, org charts, navigation trees.',
    when2: 'Multi-select pickers driven by hierarchical data.',
    basicTitle: 'Basic',
    basicDesc: 'Default selectable tree.',
    checkableTitle: 'Checkable',
    checkableDesc: 'Render checkboxes; parent ↔ child sync.',
    searchTitle: 'Search',
    searchDesc: 'Built-in search filter at the top.',
    blockTitle: 'Block node',
    blockDesc: 'Whole row is the click target.',
    directoryTitle: 'Directory',
    directoryDesc: 'Folder-style: click to expand on selection.',
  },
  ru: {
    title: 'Tree',
    lead: 'Иерархический вьюер: чекаемые, draggable, поиск, virtual-scroll.',
    when1: 'Папки, оргструктуры, деревья навигации.',
    when2: 'Мульти-селект на основе иерархии.',
    basicTitle: 'Basic',
    basicDesc: 'Стандартное selectable дерево.',
    checkableTitle: 'Checkable',
    checkableDesc: 'Чекбоксы; синк parent ↔ child.',
    searchTitle: 'Search',
    searchDesc: 'Встроенный поиск сверху.',
    blockTitle: 'Block node',
    blockDesc: 'Вся строка — кликабельная цель.',
    directoryTitle: 'Directory',
    directoryDesc: 'Папочный режим: клик раскрывает узел.',
  },
})

const treeData: TreeNodeData[] = [
  {
    key: 'src',
    title: 'src',
    children: [
      {
        key: 'src/components',
        title: 'components',
        children: [
          { key: 'src/components/Button.vue', title: 'Button.vue' },
          { key: 'src/components/Input.vue', title: 'Input.vue' },
        ],
      },
      {
        key: 'src/utils',
        title: 'utils',
        children: [
          { key: 'src/utils/format.ts', title: 'format.ts' },
          { key: 'src/utils/dom.ts', title: 'dom.ts' },
        ],
      },
      { key: 'src/index.ts', title: 'index.ts' },
    ],
  },
  {
    key: 'tests',
    title: 'tests',
    children: [
      { key: 'tests/unit', title: 'unit' },
      { key: 'tests/e2e', title: 'e2e' },
    ],
  },
]

const checked = ref<TreeKey[]>([])
const selected = ref<TreeKey[]>([])

const propsData: PropDef[] = [
  {
    name: 'treeData',
    description: 'Hierarchical data with `key`, `title`, `children`.',
    type: 'TreeNodeData[]',
  },
  { name: 'checkable', description: 'Render checkboxes.', type: 'boolean', default: 'false' },
  {
    name: 'checkStrictly',
    description: 'Decouple parent/child.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'selectable', description: 'Click titles to select.', type: 'boolean', default: 'true' },
  { name: 'multiple', description: 'Allow multi-select.', type: 'boolean', default: 'false' },
  {
    name: 'defaultExpandAll',
    description: 'Expand every parent on first render.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'showSearch', description: 'Toolbar search field.', type: 'boolean', default: 'false' },
  { name: 'blockNode', description: 'Whole-row click target.', type: 'boolean', default: 'false' },
  { name: 'directory', description: 'Folder-style behavior.', type: 'boolean', default: 'false' },
  {
    name: 'draggable',
    description: 'Drag handles per node.',
    type: 'boolean | (node) => boolean',
    default: 'false',
  },
  {
    name: 'virtual',
    description: 'Virtual scroll when `height` is set.',
    type: 'boolean',
    default: 'true',
  },
  { name: 'height', description: 'Fixed viewport height for virtual mode.', type: 'number' },
  {
    name: 'unstyled',
    description: 'Render semantic tree without Skygraph styles.',
    type: 'boolean',
    default: 'false',
  },
]

const BASIC = `<SgTree :tree-data="treeData" default-expand-all />`
const CHECK = `<SgTree
  checkable
  default-expand-all
  :tree-data="treeData"
  v-model:checkedKeys="checked"
/>`
const SEARCH = `<SgTree show-search default-expand-all :tree-data="treeData" />`
const BLOCK = `<SgTree block-node default-expand-all :tree-data="treeData" />`
const DIR = `<SgTree directory default-expand-all :tree-data="treeData" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Tree']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgTree :tree-data="treeData" default-expand-all v-model:selectedKeys="selected" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)"
        >selected: {{ selected }}</span
      >
    </DemoBox>

    <DemoBox :title="t.checkableTitle" :description="t.checkableDesc" :code="CHECK">
      <SgTree checkable default-expand-all :tree-data="treeData" v-model:checkedKeys="checked" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)"
        >checked: {{ checked }}</span
      >
    </DemoBox>

    <DemoBox :title="t.searchTitle" :description="t.searchDesc" :code="SEARCH">
      <SgTree show-search default-expand-all :tree-data="treeData" />
    </DemoBox>

    <DemoBox :title="t.blockTitle" :description="t.blockDesc" :code="BLOCK">
      <SgTree block-node default-expand-all :tree-data="treeData" />
    </DemoBox>

    <DemoBox :title="t.directoryTitle" :description="t.directoryDesc" :code="DIR">
      <SgTree directory default-expand-all :tree-data="treeData" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
