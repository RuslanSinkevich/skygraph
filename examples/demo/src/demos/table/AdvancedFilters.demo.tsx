import { useMemo, useState } from 'react'
import { Table, Tag, Button, Select } from '@skygraph/react'
import type { TableColumn, FilterDropdownProps, SummaryCell } from '@skygraph/react'
import { generateProducts } from './_data/generators'

/**
 * Showcases `filterMode='advanced'` with operators tuned per column type:
 *
 *   - number → eq / lt / lte / gt / gte / between
 *   - string → eq / contains / startsWith / endsWith
 *   - enum   → in / notIn (textual list)
 *   - date   → between / lt / gt / eq (lexicographic ISO compare)
 *   - array  → custom dropdown (`contains` / `notContains` are not built-in
 *              for array fields, so a small picker drives an `onFilter`
 *              predicate)
 *
 * Footer reports `Showing N of 200`. Reset bumps the table key to drop all
 * internal filter state at once — simpler than threading controlled
 * `filteredValue` through every column.
 */
export function AdvancedFiltersTable() {
  const data = useMemo(() => generateProducts(200), [])
  const [resetKey, setResetKey] = useState(0)

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'ID',
      width: 80,
      align: 'right',
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      advancedFilterOperators: ['eq', 'lt', 'lte', 'gt', 'gte', 'between'],
    },
    {
      key: 'name',
      title: 'Name',
      width: 220,
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'text',
      advancedFilterOperators: ['eq', 'contains', 'startsWith', 'endsWith'],
    },
    {
      key: 'status',
      title: 'Status',
      width: 130,
      filterMode: 'advanced',
      advancedFilterType: 'text',
      advancedFilterOperators: ['in', 'notIn'],
      render: (v) => (
        <Tag color={v === 'active' ? 'success' : v === 'paused' ? 'warning' : 'default'}>
          {String(v)}
        </Tag>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      width: 130,
      align: 'right',
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      advancedFilterOperators: ['eq', 'lt', 'lte', 'gt', 'gte', 'between'],
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    {
      key: 'created_at',
      title: 'Created',
      width: 140,
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'text',
      advancedFilterOperators: ['eq', 'lt', 'gt', 'between'],
    },
    {
      key: 'tags',
      title: 'Tags',
      width: 200,
      // Array `contains` / `notContains` are not built-in operators of
      // `filterMode='advanced'`, so we provide a small custom dropdown
      // and an `onFilter` predicate that does the work.
      filterDropdown: (props: FilterDropdownProps) => <TagsFilterDropdown {...props} />,
      onFilter: (value, row) => {
        const tags = (row.tags as string[]) ?? []
        const v = value as { mode: 'contains' | 'notContains'; tag: string }
        if (!v?.tag) return true
        return v.mode === 'contains' ? tags.includes(v.tag) : !tags.includes(v.tag)
      },
      render: (v) => (
        <span style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}>
          {(v as string[]).map((t) => (
            <Tag key={t} color="default">
              {t}
            </Tag>
          ))}
        </span>
      ),
    },
  ]

  const summary = (rows: { id: string; data: Record<string, unknown> }[]): SummaryCell[][] => [
    [
      {
        content: (
          <span>
            Showing <strong>{rows.length}</strong> of {data.length}
          </span>
        ),
        colSpan: columns.length - 1,
      },
      {
        content: (
          <Button size="small" onClick={() => setResetKey((k) => k + 1)}>
            Reset all filters
          </Button>
        ),
        align: 'right',
      },
    ],
  ]

  return (
    <Table
      key={resetKey}
      columns={columns}
      data={data}
      pageSize={10}
      bordered
      sticky
      scroll={{ y: 420 }}
      summary={summary}
    />
  )
}

const ALL_TAGS = ['new', 'sale', 'pro', 'eco', 'kids', 'gaming', 'office', 'travel']

function TagsFilterDropdown({
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
}: FilterDropdownProps) {
  const current = (selectedKeys[0] as { mode: 'contains' | 'notContains'; tag: string }) ?? {
    mode: 'contains',
    tag: '',
  }

  return (
    <div
      style={{
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 220,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Select
        size="small"
        value={current.mode}
        onChange={(v) => setSelectedKeys([{ ...current, mode: v as 'contains' | 'notContains' }])}
        options={[
          { label: 'contains', value: 'contains' },
          { label: 'not contains', value: 'notContains' },
        ]}
        aria-label="Tag filter mode"
      />
      <Select
        size="small"
        value={current.tag}
        onChange={(v) => setSelectedKeys([{ ...current, tag: String(v) }])}
        placeholder="— pick tag —"
        options={ALL_TAGS.map((t) => ({ label: t, value: t }))}
        aria-label="Tag value"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <Button size="small" onClick={clearFilters}>
          Reset
        </Button>
        <Button size="small" type="primary" disabled={!current.tag} onClick={confirm}>
          OK
        </Button>
      </div>
    </div>
  )
}
