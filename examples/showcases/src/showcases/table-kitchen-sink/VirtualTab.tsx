import { useMemo } from 'react'
import { Table } from '@skygraph/react'
import type { RowId } from '@skygraph/react'
import { employees } from './data'
import { statusTag, ratingBar, salaryFmt, locale } from './common'

export function VirtualTab() {
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
        <strong>{largeData.length.toLocaleString()}</strong> rows with virtual scrolling — only visible
        rows are rendered in the DOM.
      </p>
      <Table
        columns={[
          { key: 'name', title: 'Employee', width: 200, sortable: true, fixed: 'left' as const },
          { key: 'department', title: 'Department', width: 130, sortable: true },
          { key: 'role', title: 'Role', width: 100, sortable: true },
          {
            key: 'salary', title: 'Salary', width: 120, sortable: true,
            align: 'right' as const, render: (v) => salaryFmt(v),
          },
          { key: 'rating', title: 'Rating', width: 150, render: (v) => ratingBar(v) },
          { key: 'status', title: 'Status', width: 110, render: (v) => statusTag(v) },
        ]}
        data={largeData}
        pageSize={largeData.length}
        showPagination={false}
        virtual={{ rowHeight: 44, overscan: 10 }}
        scroll={{ y: 500 }}
        bordered
        sticky
        locale={locale}
      />
    </div>
  )
}
