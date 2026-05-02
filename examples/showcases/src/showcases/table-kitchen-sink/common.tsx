import type { ReactNode } from 'react'
import { Tag } from '@skygraph/react'
import type { RowId, TableLocale } from '@skygraph/react'
import { employees, statusColors } from './data'

export const statusTag = (val: unknown): ReactNode => {
  const s = String(val)
  return <Tag color={statusColors[s] ?? '#999'}>{s}</Tag>
}

export const ratingBar = (val: unknown): ReactNode => {
  const n = Number(val)
  const pct = (n / 5) * 100
  const color = n >= 4 ? '#52c41a' : n >= 3 ? '#faad14' : '#ff4d4f'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{
        flex: 1, height: 6, background: 'var(--sg-color-border-secondary, #f0f0f0)',
        borderRadius: 3, overflow: 'hidden',
      }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 12, minWidth: 28 }}>{n.toFixed(1)}</span>
    </div>
  )
}

export const salaryFmt = (val: unknown): string => `$${Number(val).toLocaleString()}`

export const tableData = employees.map((e) => ({
  id: e.id as RowId,
  data: { ...e } as Record<string, unknown>,
}))

export const locale = {
  searchPlaceholder: 'Search in table...',
  filterConfirm: 'Apply',
  filterReset: 'Reset',
  sortAsc: 'Sort ascending',
  sortDesc: 'Sort descending',
  cancelSort: 'Cancel sort',
  emptyText: 'No data',
  selectAll: 'Select all',
  selectInvert: 'Invert selection',
  selectionAll: 'All data',
  expand: 'Expand row',
  collapse: 'Collapse row',
  triggerAsc: 'Click to sort ascending',
  triggerDesc: 'Click to sort descending',
  cancelTrigger: 'Click to cancel sort',
  columns: 'Columns',
  density: 'Density',
  densityDefault: 'Default',
  densityMiddle: 'Medium',
  densitySmall: 'Compact',
  fullscreen: 'Fullscreen',
  exitFullscreen: 'Exit fullscreen',
  reload: 'Reload',
  export: 'Export',
  exportCSV: 'Export CSV',
  exportJSON: 'Export JSON',
  print: 'Print',
  pinLeft: 'Pin left',
  pinRight: 'Pin right',
  unpin: 'Unpin',
  sum: 'Sum',
  avg: 'Avg',
  count: 'Count',
  min: 'Min',
  max: 'Max',
  totalRows: (total: number) => `${total} rows total`,
  selectedRows: (count: number) => `${count} selected`,
} as TableLocale

export const sharedTableStyles = `
.cell-overtime-high { background: color-mix(in srgb, #ff4d4f 8%, transparent) !important; }
.cell-high-salary { background: color-mix(in srgb, #faad14 8%, transparent) !important; }
.cell-terminated { opacity: 0.5; }
.row-terminated { opacity: 0.6; }
.row-overtime-warn { border-left: 3px solid #ff4d4f !important; }
`
