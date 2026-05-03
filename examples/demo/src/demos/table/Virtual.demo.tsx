import { useMemo } from 'react'
import { Table } from '@skygraph/react'
import type { RowId } from '@skygraph/react'

export function VirtualTable() {
  const largeData = useMemo(() => {
    const result: Array<{ id: RowId; data: Record<string, unknown> }> = []
    for (let i = 0; i < 1000; i++) {
      result.push({
        id: `v-${i}` as RowId,
        data: {
          id: i + 1,
          name: `Employee ${i + 1}`,
          department: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'][i % 5],
          role: ['Developer', 'Manager', 'Analyst', 'Director'][i % 4],
          salary: 50000 + (i * 100),
          status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'On Leave' : 'Terminated',
        },
      })
    }
    return result
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <Table
        columns={[
          { key: 'id', title: 'ID', width: 80, sortable: true },
          { key: 'name', title: 'Name', width: 200, sortable: true, fixed: 'left' },
          { key: 'department', title: 'Department', width: 150, sortable: true },
          { key: 'role', title: 'Role', width: 150, sortable: true },
          { 
            key: 'salary', 
            title: 'Salary', 
            width: 120, 
            sortable: true,
            render: (v) => `$${Number(v).toLocaleString()}`
          },
          { key: 'status', title: 'Status', width: 120 },
        ]}
        data={largeData}
        pageSize={largeData.length}
        showPagination={false}
        showRowNumber
        virtual={{ rowHeight: 40, overscan: 10 }}
        scroll={{ y: 400 }}
        bordered
      />
    </div>
  )
}
