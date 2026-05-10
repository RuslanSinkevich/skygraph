import { Table } from '@skygraph/react'
import { tableData, statusTag, ratingBar, salaryFmt, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

export function PinnedTab() {
  const l = useAppLocale('tableKitchenSink')
  const p = l.pinned
  const slice = tableData.slice(0, 20)

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        {p.lead}
      </p>
      <Table
        columns={[
          {
            key: 'name',
            title: p.columns.employee,
            width: 200,
            sortable: true,
            fixed: 'left' as const,
          },
          { key: 'department', title: p.columns.department, width: 130, sortable: true },
          { key: 'role', title: p.columns.role, width: 100 },
          {
            key: 'salary',
            title: p.columns.salary,
            width: 120,
            sortable: true,
            align: 'right' as const,
            render: (v) => salaryFmt(v),
          },
          { key: 'rating', title: p.columns.rating, width: 150, render: (v) => ratingBar(v) },
          {
            key: 'status',
            title: p.columns.status,
            width: 110,
            render: (v) => statusTag(v, l.statusLabel),
          },
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
        locale={makeTableLocale(l)}
      />
    </div>
  )
}
