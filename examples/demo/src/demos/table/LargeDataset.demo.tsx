import { useMemo, useState } from 'react'
import { Table, Tag } from '@skygraph/react'
import type { TableColumn, RowId } from '@skygraph/react'
import { generateEmployees } from './_data/generators'

/**
 * Stress test: 10 000 employee rows with the full pro-feature set wired up
 * at once — virtualisation, sorting, filtering, header context-menu pinning,
 * groupBy and row selection. The point is to verify the UI stays
 * interactive at this volume; FPS should hold steady during fast scrolling
 * and the selection / sort handlers should feel instantaneous.
 */
export function LargeDatasetTable() {
  const data = useMemo(() => generateEmployees(10_000), [])
  const [selected, setSelected] = useState<RowId[]>([])

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: '#',
      width: 80,
      align: 'right',
      sortable: true,
      fixed: 'left',
    },
    {
      key: 'name',
      title: 'Name',
      width: 200,
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'text',
      advancedFilterOperators: ['contains', 'startsWith', 'eq'],
      fixed: 'left',
    },
    {
      key: 'department',
      title: 'Department',
      width: 140,
      sortable: true,
      filters: [
        { text: 'Engineering', value: 'Engineering' },
        { text: 'Design', value: 'Design' },
        { text: 'Sales', value: 'Sales' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Support', value: 'Support' },
        { text: 'Finance', value: 'Finance' },
        { text: 'HR', value: 'HR' },
        { text: 'Ops', value: 'Ops' },
      ],
      onFilter: (v, row) => row.department === v,
    },
    {
      key: 'role',
      title: 'Role',
      width: 130,
      sortable: true,
      filters: [
        { text: 'Junior', value: 'Junior' },
        { text: 'Mid', value: 'Mid' },
        { text: 'Senior', value: 'Senior' },
        { text: 'Lead', value: 'Lead' },
        { text: 'Manager', value: 'Manager' },
        { text: 'Director', value: 'Director' },
      ],
      onFilter: (v, row) => row.role === v,
    },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      filters: [
        { text: 'active', value: 'active' },
        { text: 'on-leave', value: 'on-leave' },
        { text: 'remote', value: 'remote' },
        { text: 'terminated', value: 'terminated' },
      ],
      onFilter: (v, row) => row.status === v,
      render: (v) => (
        <Tag
          color={
            v === 'active'
              ? 'success'
              : v === 'remote'
                ? 'processing'
                : v === 'on-leave'
                  ? 'warning'
                  : 'default'
          }
        >
          {String(v)}
        </Tag>
      ),
    },
    {
      key: 'salary',
      title: 'Salary',
      width: 130,
      align: 'right',
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      advancedFilterOperators: ['eq', 'lt', 'lte', 'gt', 'gte', 'between'],
      aggregate: 'avg',
      render: (v) => `$${(Number(v) / 1000).toFixed(0)}k`,
    },
    {
      key: 'rating',
      title: 'Rating',
      width: 100,
      align: 'right',
      sortable: true,
      aggregate: 'avg',
      render: (v) => Number(v).toFixed(1),
    },
    {
      key: 'location',
      title: 'Location',
      width: 110,
      sortable: true,
    },
  ]

  return (
    <Table
      columns={columns}
      data={data}
      pageSize={data.length}
      showPagination={false}
      bordered
      sticky
      striped
      highlightOnHover
      virtual={{ rowHeight: 40, overscan: 8, height: 560 }}
      groupBy="department"
      defaultGroupExpanded
      columnPinning
      rowSelection={{
        selectedKeys: selected,
        onChange: (keys) => setSelected(keys),
      }}
      selectionSummary
    />
  )
}
