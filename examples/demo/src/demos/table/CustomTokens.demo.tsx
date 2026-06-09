import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import type { CSSProperties } from 'react'
import { people } from './data'

/**
 * Override `--sg-table-*` tokens on a local wrapper to restyle ONE table
 * without touching the globals. The two tables below share the same columns
 * and data — only the CSS variables on the right-hand wrapper differ, so the
 * per-instance restyle is obvious side by side.
 *
 * The full list of table tokens lives in `styles/components/table.css`.
 */

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 160 },
  { key: 'age', title: 'Age', width: 70, align: 'center' },
  {
    key: 'salary',
    title: 'Salary',
    width: 120,
    align: 'right',
    render: (v) => `$${Number(v).toLocaleString()}`,
  },
]

// Custom per-instance tokens — intentionally bold so the difference reads.
const customTokens: CSSProperties = {
  ['--sg-table-header-bg' as never]: 'var(--sg-color-primary)',
  ['--sg-table-header-color' as never]: 'var(--sg-color-white)',
  ['--sg-table-row-hover-bg' as never]: 'var(--sg-color-primary-bg)',
  ['--sg-table-border-color' as never]: 'var(--sg-color-primary-border)',
  ['--sg-table-cell-padding' as never]: '12px 14px',
  ['--sg-border-radius' as never]: '12px',
}

function Caption({ children }: { children: string }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 8,
        color: 'var(--sg-color-text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: 0.4,
      }}
    >
      {children}
    </div>
  )
}

export function CustomTokensTable() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: 24,
        width: '100%',
      }}
    >
      <div>
        <Caption>Default tokens</Caption>
        <Table columns={columns} data={people} pageSize={5} bordered />
      </div>
      <div style={customTokens}>
        <Caption>Custom --sg-table-* tokens</Caption>
        <Table columns={columns} data={people} pageSize={5} bordered />
      </div>
    </div>
  )
}
