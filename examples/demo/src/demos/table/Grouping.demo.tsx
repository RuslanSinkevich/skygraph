import { useMemo, useState } from 'react'
import { Table, Select } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { generateSales } from './_data/generators'

/**
 * Sales rows (n = 400) grouped by a switchable field. Each group header
 * shows aggregates configured via `column.aggregate`:
 *
 *   - amount → built-in `sum`
 *   - units  → built-in `sum`
 *   - date   → custom reducer that picks the most recent ISO date
 *
 * `footer` enables the table-level totals row at the bottom (sum of
 * `amount` and `units` across the whole dataset).
 */
export function GroupingTable() {
  const data = useMemo(() => generateSales(400), [])
  const [groupBy, setGroupBy] = useState<string>('region')

  const columns: TableColumn[] = [
    { key: 'region', title: 'Region', width: 120, sortable: true },
    { key: 'product', title: 'Product', width: 150, sortable: true },
    { key: 'salesperson', title: 'Salesperson', width: 180, sortable: true },
    {
      key: 'amount',
      title: 'Amount',
      width: 130,
      align: 'right',
      sortable: true,
      aggregate: 'sum',
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    {
      key: 'units',
      title: 'Units',
      width: 100,
      align: 'right',
      sortable: true,
      aggregate: 'sum',
    },
    {
      key: 'date',
      title: 'Last sale',
      width: 130,
      sortable: true,
      // Built-in `max` only works on numbers — reduce manually so that ISO
      // date strings sort lexicographically (which matches chronological
      // order for a fixed-width format).
      aggregate: (values: unknown[]) => {
        let max = ''
        for (const v of values) {
          const s = String(v ?? '')
          if (s > max) max = s
        }
        return max || '—'
      },
    },
  ]

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
          Group by:
        </span>
        <Select
          size="small"
          value={groupBy}
          onChange={(v) => setGroupBy(String(v))}
          aria-label="Group by"
          options={[
            { label: 'Region', value: 'region' },
            { label: 'Salesperson', value: 'salesperson' },
            { label: 'Product', value: 'product' },
          ]}
          style={{ minWidth: 160 }}
        />
      </div>
      <Table
        columns={columns}
        data={data}
        groupBy={groupBy}
        defaultGroupExpanded
        pageSize={400}
        showPagination={false}
        footer
        bordered
        sticky
        scroll={{ y: 480 }}
      />
    </div>
  )
}
