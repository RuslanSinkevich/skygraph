<script setup lang="ts">
import { ref } from 'vue'
import { SgTable } from '@skygraph/vue'
import type { TableColumn, RowId } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Table',
    lead: 'Headless `useTable()` orchestrator + `<SgTable>` shell with sort, filter, search, paginate.',
    when1: 'Records, transactions, queues — anything tabular with selection or sort.',
    when2: 'When you want sticky header, virtual rows, and uniform paddings.',
    basicTitle: 'Basic',
    basicDesc: 'Columns + rows; nothing else needed.',
    sortableTitle: 'Sortable',
    sortableDesc: 'Click a sortable column header to cycle asc / desc / none.',
    searchTitle: 'Searchable',
    searchDesc: 'Toolbar search across all visible columns.',
    paginationTitle: 'Pagination',
    paginationDesc: 'Built-in page navigator under the body.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three densities — small / middle / large.',
    selectionTitle: 'Row selection',
    selectionDesc: 'Checkbox or radio mode; controlled via `rowSelection`.',
  },
  ru: {
    title: 'Table',
    lead: 'Headless `useTable()` + `<SgTable>`: сорт, фильтр, поиск, пагинация.',
    when1: 'Записи, транзакции, очереди — табличные данные с выбором/сортом.',
    when2: 'Когда нужен sticky-header, виртуальные строки, единые отступы.',
    basicTitle: 'Basic',
    basicDesc: 'Колонки + данные — больше ничего.',
    sortableTitle: 'Sortable',
    sortableDesc: 'Клик по заголовку — asc / desc / none.',
    searchTitle: 'Поиск',
    searchDesc: 'Поиск в тулбаре по всем видимым колонкам.',
    paginationTitle: 'Пагинация',
    paginationDesc: 'Встроенная пагинация под телом.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три плотности — small / middle / large.',
    selectionTitle: 'Выбор строк',
    selectionDesc: 'Checkbox или radio; контролируется через `rowSelection`.',
  },
})

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'role', title: 'Role' },
  { key: 'team', title: 'Team', sortable: true },
  { key: 'status', title: 'Status', align: 'center' },
]

const data = Array.from({ length: 14 }).map((_, i) => ({
  id: String(i + 1),
  data: {
    name: ['Anna', 'Boris', 'Clara', 'Dmitry', 'Elena', 'Fyodor', 'Greta'][i % 7] + ' ' + (i + 1),
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    team: ['Apollo', 'Hermes', 'Zeus', 'Hera'][i % 4],
    status: i % 2 === 0 ? '✓ active' : '— inactive',
  } as Record<string, unknown>,
}))

const selected = ref<RowId[]>([])

const propsData: PropDef[] = [
  { name: 'columns', description: 'Column definitions.', type: 'TableColumn[]' },
  { name: 'data', description: 'Dataset rows: `{ id, data }[]`.', type: 'Array<{ id, data }>' },
  { name: 'pageSize', description: 'Page size for built-in pagination.', type: 'number' },
  { name: 'rowSelection', description: 'Row-selection state.', type: 'RowSelectionConfig' },
  { name: 'bordered', description: 'Outlined borders.', type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: 'Density.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'sticky',
    description: 'Sticky header while scrolling.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'searchable', description: 'Toolbar search.', type: 'boolean', default: 'false' },
  {
    name: 'showPagination',
    description: 'Show pagination block.',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'rowClassName',
    description: 'Static or per-row class.',
    type: 'string | (row, id) => string',
  },
  { name: 'locale', description: 'Override locale strings.', type: 'TableLocale' },
  { name: 'unstyled', description: 'Strip Skygraph styles.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgTable :columns="columns" :data="data" />`
const SORT = `// columns: [{ key: 'name', title: 'Name', sortable: true }, …]
<SgTable :columns="columns" :data="data" />`
const SEARCH = `<SgTable searchable :columns="columns" :data="data" />`
const PAG = `<SgTable :page-size="5" :columns="columns" :data="data" />`
const SIZES = `<SgTable size="small"  :columns="columns" :data="data" />
<SgTable size="middle" :columns="columns" :data="data" />
<SgTable size="large"  :columns="columns" :data="data" />`
const SEL = `<SgTable
  :columns="columns"
  :data="data"
  :row-selection="{ selectedKeys: selected, onChange: (k) => (selected = k) }"
/>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Table']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgTable :columns="columns" :data="data.slice(0, 5)" />
    </DemoBox>

    <DemoBox :title="t.sortableTitle" :description="t.sortableDesc" :code="SORT">
      <SgTable :columns="columns" :data="data.slice(0, 5)" />
    </DemoBox>

    <DemoBox :title="t.searchTitle" :description="t.searchDesc" :code="SEARCH">
      <SgTable searchable :columns="columns" :data="data" :page-size="5" />
    </DemoBox>

    <DemoBox :title="t.paginationTitle" :description="t.paginationDesc" :code="PAG">
      <SgTable :page-size="5" :columns="columns" :data="data" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgTable size="small" :columns="columns" :data="data.slice(0, 4)" />
      <SgTable size="middle" :columns="columns" :data="data.slice(0, 4)" />
      <SgTable size="large" :columns="columns" :data="data.slice(0, 4)" />
    </DemoBox>

    <DemoBox :title="t.selectionTitle" :description="t.selectionDesc" :code="SEL">
      <SgTable
        :columns="columns"
        :data="data.slice(0, 6)"
        :row-selection="{
          selectedKeys: selected,
          onChange: (keys: RowId[]) => (selected = keys),
        }"
      />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)"
        >selected: {{ selected }}</span
      >
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
