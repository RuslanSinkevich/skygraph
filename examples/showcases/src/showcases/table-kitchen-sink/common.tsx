import type { ReactNode } from 'react'
import { Tag } from '@skygraph/react'
import type { RowId, TableLocale } from '@skygraph/react'
import { employees, statusColors } from './data'
import type { ShowcasesLocale } from '@skygraph-examples/shared'

export const statusTag = (val: unknown, statusLabel?: Record<string, string>): ReactNode => {
  const s = String(val)
  const label = statusLabel?.[s] ?? s
  return <Tag color={statusColors[s] ?? '#999'}>{label}</Tag>
}

export const ratingBar = (val: unknown): ReactNode => {
  const n = Number(val)
  const pct = (n / 5) * 100
  const color = n >= 4 ? '#52c41a' : n >= 3 ? '#faad14' : '#ff4d4f'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div
        style={{
          flex: 1,
          height: 6,
          background: 'var(--sg-color-border-secondary, #f0f0f0)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
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

export type TksLocale = ShowcasesLocale['apps']['tableKitchenSink']

export function makeTableLocale(loc: TksLocale): TableLocale {
  return loc.tableLocale as TableLocale
}

export const sharedTableStyles = `
.cell-overtime-high { background: color-mix(in srgb, #ff4d4f 8%, transparent) !important; }
.cell-high-salary { background: color-mix(in srgb, #faad14 8%, transparent) !important; }
.cell-terminated { opacity: 0.5; }
.row-terminated { opacity: 0.6; }
.row-overtime-warn { border-left: 3px solid #ff4d4f !important; }
`
