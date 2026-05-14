<script setup lang="ts">
/**
 * Showcases custom filter dropdowns with operator pickers. React's
 * `filterMode='advanced'` is reproduced here via the `#filterDropdown` slot:
 * each column gets a small dialog with the operators that make sense for its
 * data type (numeric, text, or array).
 */
import { computed } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgSelect,
  SgInput,
  type TableColumn,
  type RowId,
  type TableSummaryCell as SummaryCell,
} from '@skygraph/vue'

interface Product extends Record<string, unknown> {
  id: number
  name: string
  status: string
  price: number
  tags: string[]
}

interface NumFilter {
  op: string
  a: number
  b?: number
}
interface TextFilter {
  op: string
  q: string
}
interface TagsFilter {
  mode: 'contains' | 'notContains'
  tag: string
}

const STATUS = ['active', 'paused', 'archived']
const TAGS = ['new', 'sale', 'pro', 'eco', 'kids', 'gaming']
const NAMES = ['Cup', 'Lamp', 'Book', 'Chair', 'Desk', 'Pen', 'Bag', 'Hat']

function seedRandom(s: number) {
  let x = s
  return () => {
    x = (x * 9301 + 49297) % 233280
    return x / 233280
  }
}

function generate(n: number): Array<{ id: RowId; data: Product }> {
  const rnd = seedRandom(1234)
  return Array.from({ length: n }, (_, i) => {
    const tagCount = 1 + Math.floor(rnd() * 3)
    const tags = Array.from(
      new Set(Array.from({ length: tagCount }, () => TAGS[Math.floor(rnd() * TAGS.length)]!)),
    )
    return {
      id: `p-${i}` as RowId,
      data: {
        id: i + 1,
        name: `${NAMES[i % NAMES.length]} ${i + 1}`,
        status: STATUS[Math.floor(rnd() * STATUS.length)]!,
        price: Math.round(rnd() * 500 + 10),
        tags,
      },
    }
  })
}

const data = computed(() => generate(60))

const columns: TableColumn[] = [
  {
    key: 'id',
    title: 'ID',
    width: 80,
    align: 'right',
    sortable: true,
    onFilter: (raw, row) => {
      const v = raw as NumFilter
      const n = Number(row.id)
      switch (v.op) {
        case 'eq':
          return n === v.a
        case 'lt':
          return n < v.a
        case 'gt':
          return n > v.a
        case 'between':
          return v.b !== undefined && n >= v.a && n <= v.b
        default:
          return true
      }
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 220,
    sortable: true,
    onFilter: (raw, row) => {
      const v = raw as TextFilter
      const s = String(row.name).toLowerCase()
      const q = v.q.toLowerCase()
      switch (v.op) {
        case 'eq':
          return s === q
        case 'contains':
          return s.includes(q)
        case 'startsWith':
          return s.startsWith(q)
        case 'endsWith':
          return s.endsWith(q)
        default:
          return true
      }
    },
  },
  { key: 'status', title: 'Status', width: 130 },
  { key: 'price', title: 'Price', width: 130, align: 'right', sortable: true },
  {
    key: 'tags',
    title: 'Tags',
    width: 200,
    onFilter: (raw, row) => {
      const v = raw as TagsFilter
      const tags = (row.tags as string[]) ?? []
      if (!v?.tag) return true
      return v.mode === 'contains' ? tags.includes(v.tag) : !tags.includes(v.tag)
    },
  },
]

function summary(rows: Array<{ id: RowId; data: Record<string, unknown> }>): SummaryCell[][] {
  return [
    [
      { content: `Showing ${rows.length} of ${data.value.length}`, colSpan: columns.length - 1 },
      { content: 'reset', align: 'right' as const },
    ],
  ]
}

const numericOps = [
  { label: '=', value: 'eq' },
  { label: '<', value: 'lt' },
  { label: '>', value: 'gt' },
  { label: 'between', value: 'between' },
]

const textOps = [
  { label: 'equals', value: 'eq' },
  { label: 'contains', value: 'contains' },
  { label: 'starts with', value: 'startsWith' },
  { label: 'ends with', value: 'endsWith' },
]

const tagModes = [
  { label: 'contains', value: 'contains' },
  { label: 'not contains', value: 'notContains' },
]

const tagOptions = TAGS.map((t) => ({ label: t, value: t }))

function numFilter(keys: unknown[]): NumFilter {
  return (keys[0] as NumFilter | undefined) ?? { op: 'eq', a: 0 }
}
function textFilter(keys: unknown[]): TextFilter {
  return (keys[0] as TextFilter | undefined) ?? { op: 'contains', q: '' }
}
function tagsFilter(keys: unknown[]): TagsFilter {
  return (keys[0] as TagsFilter | undefined) ?? { mode: 'contains', tag: '' }
}
</script>

<template>
  <SgTable
    :columns="columns"
    :data="data"
    :page-size="10"
    bordered
    sticky
    :scroll="{ y: 420 }"
    :summary="summary"
  >
    <template #cell="{ column, value, row }">
      <template v-if="column.key === 'status'">
        <SgTag
          :color="value === 'active' ? 'success' : value === 'paused' ? 'warning' : 'default'"
          >{{ String(value) }}</SgTag
        >
      </template>
      <template v-else-if="column.key === 'price'">${{ Number(value).toFixed(2) }}</template>
      <template v-else-if="column.key === 'tags'">
        <span style="display: inline-flex; gap: 4px; flex-wrap: wrap">
          <SgTag v-for="t in row.tags as string[]" :key="t" color="default">{{ t }}</SgTag>
        </span>
      </template>
      <template v-else>{{ value }}</template>
    </template>

    <template #filterDropdown="{ column, selectedKeys, setSelectedKeys, confirm, clearFilters }">
      <!-- numeric columns -->
      <div
        v-if="column.key === 'id' || column.key === 'price'"
        style="padding: 8px; display: flex; flex-direction: column; gap: 8px; min-width: 220px"
        @click.stop
      >
        <SgSelect
          size="small"
          :model-value="numFilter(selectedKeys).op"
          :options="numericOps"
          aria-label="Operator"
          @update:model-value="
            (v) => setSelectedKeys([{ ...numFilter(selectedKeys), op: String(v) }])
          "
        />
        <SgInput
          size="small"
          type="number"
          placeholder="Value"
          :model-value="String(numFilter(selectedKeys).a)"
          @update:model-value="
            (v) => setSelectedKeys([{ ...numFilter(selectedKeys), a: Number(v) }])
          "
        />
        <SgInput
          v-if="numFilter(selectedKeys).op === 'between'"
          size="small"
          type="number"
          placeholder="Max"
          :model-value="String(numFilter(selectedKeys).b ?? '')"
          @update:model-value="
            (v) => setSelectedKeys([{ ...numFilter(selectedKeys), b: Number(v) }])
          "
        />
        <div style="display: flex; justify-content: space-between; gap: 4px">
          <SgButton size="small" @click="clearFilters">Reset</SgButton>
          <SgButton size="small" type="primary" @click="confirm">OK</SgButton>
        </div>
      </div>

      <!-- text column -->
      <div
        v-else-if="column.key === 'name'"
        style="padding: 8px; display: flex; flex-direction: column; gap: 8px; min-width: 220px"
        @click.stop
      >
        <SgSelect
          size="small"
          :model-value="textFilter(selectedKeys).op"
          :options="textOps"
          aria-label="Operator"
          @update:model-value="
            (v) => setSelectedKeys([{ ...textFilter(selectedKeys), op: String(v) }])
          "
        />
        <SgInput
          size="small"
          placeholder="Value"
          :model-value="textFilter(selectedKeys).q"
          @update:model-value="(v) => setSelectedKeys([{ ...textFilter(selectedKeys), q: v }])"
        />
        <div style="display: flex; justify-content: space-between; gap: 4px">
          <SgButton size="small" @click="clearFilters">Reset</SgButton>
          <SgButton size="small" type="primary" @click="confirm">OK</SgButton>
        </div>
      </div>

      <!-- tags column -->
      <div
        v-else-if="column.key === 'tags'"
        style="padding: 8px; display: flex; flex-direction: column; gap: 8px; min-width: 220px"
        @click.stop
      >
        <SgSelect
          size="small"
          :model-value="tagsFilter(selectedKeys).mode"
          :options="tagModes"
          aria-label="Tag mode"
          @update:model-value="
            (v) =>
              setSelectedKeys([
                { ...tagsFilter(selectedKeys), mode: v as 'contains' | 'notContains' },
              ])
          "
        />
        <SgSelect
          size="small"
          placeholder="— pick tag —"
          :model-value="tagsFilter(selectedKeys).tag"
          :options="tagOptions"
          aria-label="Tag value"
          @update:model-value="
            (v) => setSelectedKeys([{ ...tagsFilter(selectedKeys), tag: String(v) }])
          "
        />
        <div style="display: flex; justify-content: space-between; gap: 4px">
          <SgButton size="small" @click="clearFilters">Reset</SgButton>
          <SgButton
            size="small"
            type="primary"
            :disabled="!tagsFilter(selectedKeys).tag"
            @click="confirm"
            >OK</SgButton
          >
        </div>
      </div>
    </template>
  </SgTable>
</template>
