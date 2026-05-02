import { useState } from 'react'
import { Table, Button, Empty, Segmented, notification } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { statusTag, ratingBar, salaryFmt, tableData, locale } from './common'

const basicColumns: TableColumn[] = [
  { key: 'name', title: 'Employee', width: 200, sortable: true, copyable: true, ellipsis: true },
  { key: 'department', title: 'Department', width: 130, sortable: true },
  { key: 'role', title: 'Role', width: 120, sortable: true },
  {
    key: 'salary', title: 'Salary', width: 120, sortable: true, align: 'right',
    render: (v) => salaryFmt(v),
  },
  { key: 'rating', title: 'Rating', width: 150, render: (v) => ratingBar(v) },
  { key: 'status', title: 'Status', width: 110, render: (v) => statusTag(v) },
  { key: 'hireDate', title: 'Hire Date', width: 110, sortable: true },
]

function BasicDemo() {
  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        Standard table with pagination, search and row selection. Strip-down view of the kitchen sink
        for the most common case.
      </p>
      <Table
        columns={basicColumns}
        data={tableData}
        pageSize={10}
        showPagination
        showSizeChanger
        pageSizeOptions={[10, 25, 50]}
        searchable
        striped
        bordered
        highlightOnHover
        showRowNumber
        locale={locale}
      />
    </div>
  )
}

function EmptyDemo() {
  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        Empty state with a custom illustration and call-to-action button.
      </p>
      <Table
        columns={basicColumns.slice(0, 4)}
        data={[]}
        emptyContent={
          <Empty description="No employees match your criteria">
            <Button type="primary" size="small" onClick={() => notification.info('Add employee (mock)')}>
              Add Employee
            </Button>
          </Empty>
        }
        searchable
        bordered
        locale={locale}
      />
    </div>
  )
}

export function BasicTab() {
  const [section, setSection] = useState<'basic' | 'empty'>('basic')

  return (
    <div>
      <Segmented
        value={section}
        onChange={(v) => setSection(v as typeof section)}
        options={[
          { label: 'Basic table', value: 'basic' },
          { label: 'Empty state', value: 'empty' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {section === 'basic' ? <BasicDemo /> : <EmptyDemo />}
    </div>
  )
}
