import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'
import './styles.css'

/**
 * `unstyled` strips all built-in SkyGraph table styles — grid, borders,
 * padding, hover. Behavior (sort, select, expand, pagination) still works.
 * You bring your own CSS, or drop the table inside your own card shell.
 */
export function UnstyledTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'city', title: 'City', width: 120 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <div className="demo-unstyled-card" style={{ width: '100%' }}>
      <div className="demo-unstyled-card-title">Unstyled table wrapper</div>
      <div className="demo-unstyled-card-row">
        <button className="demo-unstyled-btn" type="button">
          Custom action
        </button>
        <span style={{ color: 'var(--sg-color-text-secondary)' }}>
          No SkyGraph table CSS used.
        </span>
      </div>
      <div style={{ width: '100%' }}>
        <Table unstyled columns={columns} data={people} pageSize={5} />
      </div>
    </div>
  )
}
