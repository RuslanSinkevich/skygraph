import { useState } from 'react'
import { Table, Segmented, notification } from '@skygraph/react'
import type { TableColumn, CellSpan } from '@skygraph/react'
import { treeEmployees } from './data'
import { tableData, statusTag, ratingBar, salaryFmt, locale } from './common'

type Mode = 'group' | 'tree' | 'colgroups' | 'cellspan'

function GroupByDemo() {
  const [groupField, setGroupField] = useState('department')
  return (
    <>
      <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 13 }}>Group by:</span>
        <Segmented
          value={groupField}
          onChange={(v) => setGroupField(v as string)}
          options={[
            { label: 'Department', value: 'department' },
            { label: 'Role', value: 'role' },
            { label: 'Status', value: 'status' },
            { label: 'Location', value: 'location' },
          ]}
        />
      </div>
      <Table
        columns={[
          { key: 'name', title: 'Employee', width: 200, sortable: true, fixed: 'left' as const },
          { key: 'department', title: 'Department', width: 130, sortable: true },
          { key: 'role', title: 'Role', width: 100, sortable: true },
          {
            key: 'salary', title: 'Salary', width: 120, sortable: true,
            align: 'right' as const, render: (v) => salaryFmt(v), aggregate: 'avg' as const,
          },
          { key: 'rating', title: 'Rating', width: 150, render: (v) => ratingBar(v), aggregate: 'avg' as const },
          {
            key: 'projects', title: 'Projects', width: 90, sortable: true,
            align: 'center' as const, aggregate: 'sum' as const,
          },
          { key: 'status', title: 'Status', width: 110, render: (v) => statusTag(v) },
        ]}
        data={tableData}
        pageSize={200}
        showPagination={false}
        groupBy={groupField}
        defaultGroupExpanded
        onGroupExpandChange={(key, expanded) => notification.info(`Group "${key}": ${expanded ? 'expanded' : 'collapsed'}`)}
        footer
        showRowNumber
        bordered
        searchable
        scroll={{ x: 1100, y: 500 }}
        locale={locale}
      />
    </>
  )
}

function TreeDemo() {
  const treeCols: TableColumn[] = [
    { key: 'name', title: 'Name', width: 250, sortable: true },
    { key: 'role', title: 'Role', width: 120 },
    {
      key: 'salary', title: 'Salary', width: 120,
      render: (v) => (Number(v) > 0 ? salaryFmt(v) : '-'),
      aggregate: 'sum' as const,
    },
    { key: 'status', title: 'Status', width: 110, render: (v) => (v ? statusTag(v) : '-') },
  ]

  return (
    <Table
      columns={treeCols}
      data={treeEmployees}
      tree={{ defaultExpandAllRows: true, indentSize: 24 }}
      bordered
      showRowNumber
      showPagination={false}
      footer
      locale={locale}
    />
  )
}

function ColumnGroupsDemo() {
  const groupedColumns: TableColumn[] = [
    { key: 'name', title: 'Employee', width: 180, sortable: true, fixed: 'left' as const, copyable: true, ellipsis: true },
    {
      key: 'personal',
      title: 'Personal Info',
      children: [
        { key: 'department', title: 'Department', width: 130, sortable: true },
        { key: 'role', title: 'Role', width: 100, sortable: true, editable: true },
        { key: 'location', title: 'Location', width: 130 },
      ],
    },
    {
      key: 'compensation',
      title: 'Compensation & Performance',
      children: [
        {
          key: 'salary', title: 'Salary', width: 120, sortable: true,
          align: 'right' as const, render: (v) => salaryFmt(v), aggregate: 'avg' as const,
        },
        { key: 'experience', title: 'Exp (yrs)', width: 90, sortable: true, align: 'center' as const, aggregate: 'avg' as const },
        { key: 'rating', title: 'Rating', width: 150, render: (v) => ratingBar(v), aggregate: 'avg' as const },
        { key: 'projects', title: 'Projects', width: 90, sortable: true, align: 'center' as const, aggregate: 'sum' as const },
      ],
    },
    {
      key: 'meta',
      title: 'Meta',
      children: [
        { key: 'status', title: 'Status', width: 110, render: (v) => statusTag(v) },
        { key: 'hireDate', title: 'Hire Date', width: 110 },
      ],
    },
  ]

  return (
    <Table
      columns={groupedColumns}
      data={tableData.slice(0, 30)}
      pageSize={30}
      showPagination={false}
      bordered
      footer
      showRowNumber
      striped
      scroll={{ x: 1300 }}
      locale={locale}
    />
  )
}

function CellSpanDemo() {
  const slice = tableData.slice(0, 15)
  const cols: TableColumn[] = [
    {
      key: 'name', title: 'Employee', width: 200, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'department', title: 'Department', width: 140,
      onCell: (_row, idx): CellSpan => {
        if (idx === 0) return { rowSpan: 3 }
        if (idx === 1 || idx === 2) return { rowSpan: 0 }
        if (idx === 5) return { colSpan: 2 }
        return {}
      },
    },
    {
      key: 'role', title: 'Role', width: 120,
      onCell: (_row, idx): CellSpan => {
        if (idx === 5) return { colSpan: 0 }
        return {}
      },
    },
    {
      key: 'salary', title: 'Salary', width: 120,
      align: 'right' as const, render: (v) => salaryFmt(v),
    },
    { key: 'status', title: 'Status', width: 110, render: (v) => statusTag(v) },
  ]

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        Cell spanning via <code>onCell</code>: rows 1–3 share a merged Department cell, row 6 merges
        Department + Role.
      </p>
      <Table
        columns={cols}
        data={slice}
        pageSize={15}
        showPagination={false}
        bordered
        showRowNumber
        locale={locale}
      />
    </div>
  )
}

export function GroupedTab() {
  const [mode, setMode] = useState<Mode>('group')

  return (
    <div>
      <Segmented
        value={mode}
        onChange={(v) => setMode(v as Mode)}
        options={[
          { label: 'Group by', value: 'group' },
          { label: 'Tree data', value: 'tree' },
          { label: 'Column groups', value: 'colgroups' },
          { label: 'Cell span', value: 'cellspan' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {mode === 'group' && <GroupByDemo />}
      {mode === 'tree' && <TreeDemo />}
      {mode === 'colgroups' && <ColumnGroupsDemo />}
      {mode === 'cellspan' && <CellSpanDemo />}
    </div>
  )
}
