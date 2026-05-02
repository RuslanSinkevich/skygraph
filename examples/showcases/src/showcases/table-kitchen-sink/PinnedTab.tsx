import { Table } from '@skygraph/react'
import { tableData, statusTag, ratingBar, salaryFmt, locale } from './common'

export function PinnedTab() {
  const slice = tableData.slice(0, 20)

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        First 2 rows pinned to <strong>top</strong>, last 2 pinned to <strong>bottom</strong>. They stay
        visible while scrolling.
      </p>
      <Table
        columns={[
          { key: 'name', title: 'Employee', width: 200, sortable: true, fixed: 'left' as const },
          { key: 'department', title: 'Department', width: 130, sortable: true },
          { key: 'role', title: 'Role', width: 100 },
          {
            key: 'salary', title: 'Salary', width: 120, sortable: true,
            align: 'right' as const, render: (v) => salaryFmt(v),
          },
          { key: 'rating', title: 'Rating', width: 150, render: (v) => ratingBar(v) },
          { key: 'status', title: 'Status', width: 110, render: (v) => statusTag(v) },
        ]}
        data={slice}
        pageSize={20}
        showPagination={false}
        pinnedRows={{
          top: [slice[0].id, slice[1].id],
          bottom: [slice[18].id, slice[19].id],
        }}
        bordered
        showRowNumber
        striped
        scroll={{ x: 900 }}
        locale={locale}
      />
    </div>
  )
}
