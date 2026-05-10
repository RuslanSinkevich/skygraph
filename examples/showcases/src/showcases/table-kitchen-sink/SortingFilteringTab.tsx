import { useState } from 'react'
import { Table } from '@skygraph/react'
import type { TableColumn, SortConfig, SummaryCell, RowId } from '@skygraph/react'
import { statusTag, ratingBar, salaryFmt, tableData, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

export function SortingFilteringTab() {
  const l = useAppLocale('tableKitchenSink')
  const sf = l.sortFilter
  const [sorts, setSorts] = useState<SortConfig[]>([])

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: l.basic.columns.employee,
      width: 200,
      sortable: true,
      filterMode: 'search' as const,
      onFilter: (v: unknown, row: Record<string, unknown>) =>
        String(row.name).toLowerCase().includes(String(v).toLowerCase()),
    },
    {
      key: 'department',
      title: l.basic.columns.department,
      width: 130,
      sortable: true,
      filters: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Support'].map(
        (d) => ({ text: d, value: d }),
      ),
      onFilter: (v: unknown, row: Record<string, unknown>) => row.department === v,
      filterMultiple: true,
      filterSearch: true,
    },
    {
      key: 'role',
      title: l.basic.columns.role,
      width: 110,
      sortable: true,
      filters: ['Junior', 'Middle', 'Senior', 'Lead', 'Manager', 'Director'].map((r) => ({
        text: r,
        value: r,
      })),
      onFilter: (v: unknown, row: Record<string, unknown>) => row.role === v,
      filterMultiple: true,
    },
    {
      key: 'salary',
      title: l.basic.columns.salary,
      width: 120,
      sortable: true,
      align: 'right',
      render: (v: unknown) => salaryFmt(v),
      aggregate: 'avg' as const,
    },
    {
      key: 'experience',
      title: sf.expColumn,
      width: 90,
      sortable: true,
      align: 'center',
      aggregate: 'avg' as const,
    },
    {
      key: 'rating',
      title: l.basic.columns.rating,
      width: 150,
      sortable: true,
      render: (v: unknown) => ratingBar(v),
      aggregate: 'avg' as const,
    },
    {
      key: 'status',
      title: l.basic.columns.status,
      width: 110,
      sortable: true,
      render: (v: unknown) => statusTag(v, l.statusLabel),
      filters: ['active', 'on-leave', 'remote', 'terminated'].map((s) => ({
        text: l.statusLabel[s] ?? s,
        value: s,
      })),
      onFilter: (v: unknown, row: Record<string, unknown>) => row.status === v,
      filterMultiple: true,
    },
  ]

  const summaryFn = (
    rows: Array<{ id: RowId; data: Record<string, unknown> }>,
  ): SummaryCell[][] => {
    const totalSalary = rows.reduce((s, r) => s + (Number(r.data.salary) || 0), 0)
    const avgSalary = rows.length ? totalSalary / rows.length : 0
    const avgExp = rows.length
      ? rows.reduce((s, r) => s + (Number(r.data.experience) || 0), 0) / rows.length
      : 0
    const avgRating = rows.length
      ? rows.reduce((s, r) => s + (Number(r.data.rating) || 0), 0) / rows.length
      : 0
    return [
      [
        { content: sf.summaryEmployees(rows.length), colSpan: 3 },
        { content: '' },
        { content: '' },
        { content: sf.summaryAvg(salaryFmt(Math.round(avgSalary))), align: 'right' },
        { content: sf.summaryYears(avgExp.toFixed(1)), align: 'center' },
        { content: sf.summaryRating(avgRating.toFixed(1)) },
        { content: '' },
      ],
    ]
  }

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        {sf.lead}
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
        locale={makeTableLocale(l)}
      />
    </div>
  )
}
