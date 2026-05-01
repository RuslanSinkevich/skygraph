import { useState, useMemo } from 'react'
import {
  Table, Tag, Avatar, Segmented,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { employees, employeeToRow } from './data'
import { Toolbar, useFilteredList, money, statusColor } from '../_shared'

export function DirectoryTab() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<string>('table')

  const filtered = useFilteredList(employees, search, ['name', 'email', 'role', 'department'])
  const tableData = useMemo(() => filtered.map(employeeToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Employee', width: 220, sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small">{String(row.avatar)}</Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{String(val)}</div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{String(row.email)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'department', title: 'Department', width: 120, sortable: true,
      filters: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance'].map(d => ({ text: d, value: d })),
      onFilter: (value, row) => row.department === value,
    },
    { key: 'role', title: 'Role', width: 150 },
    {
      key: 'status', title: 'Status', width: 100,
      filters: ['active', 'on-leave', 'remote'].map(v => ({ text: v, value: v })),
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColor(String(val))}>{String(val)}</Tag>,
    },
    { key: 'startDate', title: 'Start Date', width: 110, sortable: true },
    {
      key: 'salary', title: 'Salary', width: 100, sortable: true, align: 'right',
      render: (val) => money(Number(val)),
    },
  ]

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search employees…', width: 220 }}
        actions={
          <Segmented
            value={view}
            onChange={setView}
            options={[
              { label: 'Table', value: 'table' },
              { label: 'Cards', value: 'cards' },
            ]}
          />
        }
      />
      {view === 'table' ? (
        <Table columns={columns} data={tableData} pageSize={10} size="small" />
      ) : (
        <div className="sc-card-grid">
          {filtered.map(e => (
            <div key={e.id} className="sc-card" style={{ alignItems: 'center', textAlign: 'center' }}>
              <Avatar size="large">{e.avatar}</Avatar>
              <div style={{ fontWeight: 600 }}>{e.name}</div>
              <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{e.role}</div>
              <Tag color={statusColor(e.status)}>{e.status}</Tag>
              <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{e.department}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
