import { useMemo } from 'react'
import { Table } from '@skygraph/react'
import type { RowId } from '@skygraph/react'
import { employees } from './data'
import { statusTag, ratingBar, salaryFmt, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

export function VirtualTab() {
  const l = useAppLocale('tableKitchenSink')
  const v = l.virtual
  const largeData = useMemo<Array<{ id: RowId; data: Record<string, unknown> }>>(() => {
    const result: Array<{ id: RowId; data: Record<string, unknown> }> = []
    for (let i = 0; i < 5; i++) {
      for (const e of employees) {
        result.push({
          id: `v-${result.length}` as RowId,
          data: { ...e, name: `${e.name} #${result.length + 1}` } as Record<string, unknown>,
        })
      }
    }
    return result
  }, [])

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        {v.leadPrefix}
        <strong>{largeData.length.toLocaleString()}</strong>
        {v.leadSuffix}
      </p>
      <Table
        columns={[
          {
            key: 'name',
            title: v.columns.employee,
            width: 200,
            sortable: true,
            fixed: 'left' as const,
          },
          { key: 'department', title: v.columns.department, width: 130, sortable: true },
          { key: 'role', title: v.columns.role, width: 100, sortable: true },
          {
            key: 'salary',
            title: v.columns.salary,
            width: 120,
            sortable: true,
            align: 'right' as const,
            render: (v) => salaryFmt(v),
          },
          { key: 'rating', title: v.columns.rating, width: 150, render: (v) => ratingBar(v) },
          {
            key: 'status',
            title: v.columns.status,
            width: 110,
            render: (val) => statusTag(val, l.statusLabel),
          },
        ]}
        data={largeData}
        pageSize={largeData.length}
        showPagination={false}
        virtual={{ rowHeight: 44, overscan: 10 }}
        scroll={{ y: 500 }}
        bordered
        sticky
        locale={makeTableLocale(l)}
      />
    </div>
  )
}
