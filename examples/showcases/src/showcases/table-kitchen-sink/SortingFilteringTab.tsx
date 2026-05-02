import { useState } from 'react'
import { Table } from '@skygraph/react'
import type { TableColumn, SortConfig, SummaryCell, RowId } from '@skygraph/react'
import { statusTag, ratingBar, salaryFmt, tableData, locale } from './common'

export function SortingFilteringTab() {
  const [sorts, setSorts] = useState<SortConfig[]>([])

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Employee',
      width: 200,
      sortable: true,
      filterMode: 'search' as const,
      onFilter: (v: unknown, row: Record<string, unknown>) =>
        String(row.name).toLowerCase().includes(String(v).toLowerCase()),
    },
    {
      key: 'department',
      title: 'Department',
      width: 130,
      sortable: true,
      filters: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Support']
        .map((d) => ({ text: d, value: d })),
      onFilter: (v: unknown, row: Record<string, unknown>) => row.department === v,
      filterMultiple: true,
      filterSearch: true,
    },
    {
      key: 'role',
      title: 'Role',
      width: 110,
      sortable: true,
      filters: ['Junior', 'Middle', 'Senior', 'Lead', 'Manager', 'Director']
        .map((r) => ({ text: r, value: r })),
      onFilter: (v: unknown, row: Record<string, unknown>) => row.role === v,
      filterMultiple: true,
    },
    {
      key: 'salary',
      title: 'Salary',
      width: 120,
      sortable: true,
      align: 'right',
      render: (v: unknown) => salaryFmt(v),
      aggregate: 'avg' as const,
    },
    {
      key: 'experience',
      title: 'Exp (yrs)',
      width: 90,
      sortable: true,
      align: 'center',
      aggregate: 'avg' as const,
    },
    {
      key: 'rating',
      title: 'Rating',
      width: 150,
      sortable: true,
      render: (v: unknown) => ratingBar(v),
      aggregate: 'avg' as const,
    },
    {
      key: 'status',
      title: 'Status',
      width: 110,
      sortable: true,
      render: (v: unknown) => statusTag(v),
      filters: ['active', 'on-leave', 'remote', 'terminated']
        .map((s) => ({ text: s, value: s })),
      onFilter: (v: unknown, row: Record<string, unknown>) => row.status === v,
      filterMultiple: true,
    },
  ]

  const summaryFn = (rows: Array<{ id: RowId; data: Record<string, unknown> }>): SummaryCell[][] => {
    const totalSalary = rows.reduce((s, r) => s + (Number(r.data.salary) || 0), 0)
    const avgSalary = rows.length ? totalSalary / rows.length : 0
    const avgExp = rows.length ? rows.reduce((s, r) => s + (Number(r.data.experience) || 0), 0) / rows.length : 0
    const avgRating = rows.length ? rows.reduce((s, r) => s + (Number(r.data.rating) || 0), 0) / rows.length : 0
    return [[
      { content: `${rows.length} employees`, colSpan: 3 },
      { content: '' },
      { content: '' },
      { content: `avg ${salaryFmt(Math.round(avgSalary))}`, align: 'right' },
      { content: `${avgExp.toFixed(1)} yrs`, align: 'center' },
      { content: `⭐ ${avgRating.toFixed(1)}` },
      { content: '' },
    ]]
  }

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        Multi-column sort (hold <kbd>Shift</kbd> + click), per-column filters (search, multi-select),
        column aggregates and a custom summary row.
      </p>
      <Table
        columns={columns}
        data={tableData}
        pageSize={15}
        searchable
        bordered
        striped
        highlightOnHover
        sticky
        multiSort
        sorts={sorts}
        onSortsChange={setSorts}
        summary={summaryFn}
        footer
        showRowNumber
        locale={locale}
      />
    </div>
  )
}
