import { useState } from 'react'
import { Table, Button, Empty, Segmented, notification } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { statusTag, ratingBar, salaryFmt, tableData, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

function BasicDemo() {
  const l = useAppLocale('tableKitchenSink')
  const cols: TableColumn[] = [
    {
      key: 'name',
      title: l.basic.columns.employee,
      width: 200,
      sortable: true,
      copyable: true,
      ellipsis: true,
    },
    { key: 'department', title: l.basic.columns.department, width: 130, sortable: true },
    { key: 'role', title: l.basic.columns.role, width: 120, sortable: true },
    {
      key: 'salary',
      title: l.basic.columns.salary,
      width: 120,
      sortable: true,
      align: 'right',
      render: (v) => salaryFmt(v),
    },
    { key: 'rating', title: l.basic.columns.rating, width: 150, render: (v) => ratingBar(v) },
    {
      key: 'status',
      title: l.basic.columns.status,
      width: 110,
      render: (v) => statusTag(v, l.statusLabel),
    },
    { key: 'hireDate', title: l.basic.columns.hireDate, width: 110, sortable: true },
  ]
  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        {l.basic.basicLead}
      </p>
      <Table
        columns={cols}
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
        locale={makeTableLocale(l)}
      />
    </div>
  )
}

function EmptyDemo() {
  const l = useAppLocale('tableKitchenSink')
  const cols: TableColumn[] = [
    {
      key: 'name',
      title: l.basic.columns.employee,
      width: 200,
      sortable: true,
      copyable: true,
      ellipsis: true,
    },
    { key: 'department', title: l.basic.columns.department, width: 130, sortable: true },
    { key: 'role', title: l.basic.columns.role, width: 120, sortable: true },
    {
      key: 'salary',
      title: l.basic.columns.salary,
      width: 120,
      sortable: true,
      align: 'right',
      render: (v) => salaryFmt(v),
    },
  ]
  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        {l.basic.emptyLead}
      </p>
      <Table
        columns={cols}
        data={[]}
        emptyContent={
          <Empty description={l.basic.emptyDescription}>
            <Button
              type="primary"
              size="small"
              onClick={() => notification.info(l.basic.addEmployeeToast)}
            >
              {l.basic.addEmployee}
            </Button>
          </Empty>
        }
        searchable
        bordered
        locale={makeTableLocale(l)}
      />
    </div>
  )
}

export function BasicTab() {
  const l = useAppLocale('tableKitchenSink')
  const [section, setSection] = useState<'basic' | 'empty'>('basic')

  return (
    <div>
      <Segmented
        value={section}
        onChange={(v) => setSection(v as typeof section)}
        options={[
          { label: l.basic.sectionBasic, value: 'basic' },
          { label: l.basic.sectionEmpty, value: 'empty' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {section === 'basic' ? <BasicDemo /> : <EmptyDemo />}
    </div>
  )
}
