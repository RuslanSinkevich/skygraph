import type { RowId, TableLocale } from '@skygraph/vue'
import { employees, statusColors } from './data'
import type { ShowcasesLocale } from '@skygraph-examples/shared'

/**
 * Shared cell-render helpers for the Table Kitchen Sink showcase. React used
 * JSX `render: (val) => <Tag>...</Tag>` functions on each column; Vue's
 * `<SgTable>` exposes a single `#cell` slot, so we keep these as plain data
 * getters and let the tab templates branch on `column.key` to invoke them.
 */

export interface StatusTagModel {
  label: string
  color: string
}

export function statusTag(val: unknown, statusLabel?: Record<string, string>): StatusTagModel {
  const s = String(val)
  return {
    label: statusLabel?.[s] ?? s,
    color: statusColors[s] ?? '#999',
  }
}

export interface RatingBarModel {
  value: number
  percent: number
  color: string
}

export function ratingBar(val: unknown): RatingBarModel {
  const n = Number(val)
  const pct = (n / 5) * 100
  const color = n >= 4 ? '#52c41a' : n >= 3 ? '#faad14' : '#ff4d4f'
  return { value: n, percent: pct, color }
}

export const salaryFmt = (val: unknown): string => `$${Number(val).toLocaleString()}`

export const tableData = employees.map((e) => ({
  id: e.id as RowId,
  data: { ...e } as Record<string, unknown>,
}))

export type TksLocale = ShowcasesLocale['apps']['tableKitchenSink']

export function makeTableLocale(loc: TksLocale): TableLocale {
  return loc.tableLocale as unknown as TableLocale
}

export const sharedTableStyles = `
.cell-overtime-high { background: color-mix(in srgb, #ff4d4f 8%, transparent) !important; }
.cell-high-salary { background: color-mix(in srgb, #faad14 8%, transparent) !important; }
.cell-terminated { opacity: 0.5; }
.row-terminated { opacity: 0.6; }
.row-overtime-warn { border-left: 3px solid #ff4d4f !important; }
`
