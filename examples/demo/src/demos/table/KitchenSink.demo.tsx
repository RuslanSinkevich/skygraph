import { useState } from 'react'
import { Table, Button, Tag } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Every header-level filter style on the same table — checkbox list,
 * search-as-you-type, advanced numeric, advanced text — combined with
 * selection + expand + sort + global search + resize + fixed columns +
 * editable + summary. Use as a reference when wiring up complex tables.
 */
export function KitchenSinkTable() {
  const [selected, setSelected] = useState<string[]>([])

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      width: 160,
      sortable: true,
      fixed: 'left',
      resizable: true,
      filterMode: 'search',
      onFilter: (v, row) => String(row.name).toLowerCase().includes(String(v).toLowerCase()),
    },
    {
      key: 'age',
      title: 'Age',
      width: 90,
      sortable: true,
      align: 'center',
      editable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      advancedFilterOperators: ['eq', 'lt', 'lte', 'gt', 'gte', 'between'],
    },
    {
      key: 'email',
      title: 'Email',
      width: 220,
      resizable: true,
      ellipsis: true,
      filterMode: 'search',
      onFilter: (v, row) => String(row.email).toLowerCase().includes(String(v).toLowerCase()),
    },
    { key: 'city', title: 'City', width: 130, sortable: true, resizable: true },
    {
      key: 'role',
      title: 'Role',
      width: 130,
      resizable: true,
      filters: [
        { text: 'Developer', value: 'Developer' },
        { text: 'Designer', value: 'Designer' },
        { text: 'Manager', value: 'Manager' },
        { text: 'QA', value: 'QA' },
      ],
      onFilter: (value, row) => row.role === value,
    },
    {
      key: 'salary',
      title: 'Salary',
      width: 130,
      align: 'right',
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      advancedFilterOperators: ['eq', 'gte', 'lte', 'between'],
    },
    {
      key: 'status',
      title: 'Status',
      width: 110,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={val === 'active' ? 'success' : 'default'}>{String(val)}</Tag>,
    },
    {
      key: 'action',
      title: 'Action',
      width: 90,
      fixed: 'right',
      render: () => (
        <Button size="small" type="text">
          Edit
        </Button>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={people}
      pageSize={6}
      searchable
      bordered
      scroll={{ x: 1200 }}
      rowSelection={{
        selectedKeys: selected,
        onChange: (keys) => setSelected(keys as string[]),
      }}
      expandable={{
        expandedRowRender: (row) => (
          <div>
            Details for <strong>{String(row.name)}</strong>: {String(row.email)}, $
            {String(row.salary)}
          </div>
        ),
      }}
      onCellEdit={(id, col, val) => {
        console.log('Edit:', id, col, val)
      }}
      summary={(rows) => {
        const total = rows.reduce((s, r) => s + (Number(r.data.salary) || 0), 0)
        return [
          [
            { content: `${rows.length} rows`, colSpan: 6 },
            { content: `$${total.toLocaleString()}` },
            { content: '' },
          ],
        ]
      }}
    />
  )
}
