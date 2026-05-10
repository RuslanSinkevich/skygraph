import { useState } from 'react'
import { Table, Segmented, notification } from '@skygraph/react'
import type { TableColumn, CellSpan } from '@skygraph/react'
import { treeEmployees } from './data'
import { tableData, statusTag, ratingBar, salaryFmt, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

type Mode = 'group' | 'tree' | 'colgroups' | 'cellspan'

function GroupByDemo() {
  const l = useAppLocale('tableKitchenSink')
  const g = l.grouped
  const [groupField, setGroupField] = useState('department')
  return (
    <>
      <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 13 }}>{g.groupByLabel}</span>
        <Segmented
          value={groupField}
          onChange={(v) => setGroupField(v as string)}
          options={[
            { label: g.groupOptions.department, value: 'department' },
            { label: g.groupOptions.role, value: 'role' },
            { label: g.groupOptions.status, value: 'status' },
            { label: g.groupOptions.location, value: 'location' },
          ]}
        />
      </div>
      <Table
        columns={[
          {
            key: 'name',
            title: g.columns.employee,
            width: 200,
            sortable: true,
            fixed: 'left' as const,
          },
          { key: 'department', title: g.columns.department, width: 130, sortable: true },
          { key: 'role', title: g.columns.role, width: 100, sortable: true },
          {
            key: 'salary',
            title: g.columns.salary,
            width: 120,
            sortable: true,
            align: 'right' as const,
            render: (v) => salaryFmt(v),
            aggregate: 'avg' as const,
          },
          {
            key: 'rating',
            title: g.columns.rating,
            width: 150,
            render: (v) => ratingBar(v),
            aggregate: 'avg' as const,
          },
          {
            key: 'projects',
            title: g.columns.projects,
            width: 90,
            sortable: true,
            align: 'center' as const,
            aggregate: 'sum' as const,
          },
          {
            key: 'status',
            title: g.columns.status,
            width: 110,
            render: (v) => statusTag(v, l.statusLabel),
          },
        ]}
        data={tableData}
        pageSize={200}
        showPagination={false}
        groupBy={groupField}
        defaultGroupExpanded
        onGroupExpandChange={(key, expanded) =>
          notification.info(g.groupExpandToast(key, expanded ? g.expanded : g.collapsed))
        }
        footer
        showRowNumber
        bordered
        searchable
        scroll={{ x: 1100, y: 500 }}
        locale={makeTableLocale(l)}
      />
    </>
  )
}

function TreeDemo() {
  const l = useAppLocale('tableKitchenSink')
  const g = l.grouped
  const treeCols: TableColumn[] = [
    { key: 'name', title: g.columns.name, width: 250, sortable: true },
    { key: 'role', title: g.columns.role, width: 120 },
    {
      key: 'salary',
      title: g.columns.salary,
      width: 120,
      render: (v) => (Number(v) > 0 ? salaryFmt(v) : '-'),
      aggregate: 'sum' as const,
    },
    {
      key: 'status',
      title: g.columns.status,
      width: 110,
      render: (v) => (v ? statusTag(v, l.statusLabel) : '-'),
    },
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
      locale={makeTableLocale(l)}
    />
  )
}

function ColumnGroupsDemo() {
  const l = useAppLocale('tableKitchenSink')
  const g = l.grouped
  const groupedColumns: TableColumn[] = [
    {
      key: 'name',
      title: g.columns.employee,
      width: 180,
      sortable: true,
      fixed: 'left' as const,
      copyable: true,
      ellipsis: true,
    },
    {
      key: 'personal',
      title: g.columnGroups.personal,
      children: [
        { key: 'department', title: g.columns.department, width: 130, sortable: true },
        { key: 'role', title: g.columns.role, width: 100, sortable: true, editable: true },
        { key: 'location', title: g.columnGroups.location, width: 130 },
      ],
    },
    {
      key: 'compensation',
      title: g.columnGroups.compensation,
      children: [
        {
          key: 'salary',
          title: g.columns.salary,
          width: 120,
          sortable: true,
          align: 'right' as const,
          render: (v) => salaryFmt(v),
          aggregate: 'avg' as const,
        },
        {
          key: 'experience',
          title: g.columnGroups.experience,
          width: 90,
          sortable: true,
          align: 'center' as const,
          aggregate: 'avg' as const,
        },
        {
          key: 'rating',
          title: g.columns.rating,
          width: 150,
          render: (v) => ratingBar(v),
          aggregate: 'avg' as const,
        },
        {
          key: 'projects',
          title: g.columns.projects,
          width: 90,
          sortable: true,
          align: 'center' as const,
          aggregate: 'sum' as const,
        },
      ],
    },
    {
      key: 'meta',
      title: g.columnGroups.meta,
      children: [
        {
          key: 'status',
          title: g.columns.status,
          width: 110,
          render: (v) => statusTag(v, l.statusLabel),
        },
        { key: 'hireDate', title: g.columnGroups.hireDate, width: 110 },
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
      locale={makeTableLocale(l)}
    />
  )
}

function CellSpanDemo() {
  const l = useAppLocale('tableKitchenSink')
  const g = l.grouped
  const slice = tableData.slice(0, 15)
  const cols: TableColumn[] = [
    {
      key: 'name',
      title: g.columns.employee,
      width: 200,
      sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'department',
      title: g.columns.department,
      width: 140,
      onCell: (_row, idx): CellSpan => {
        if (idx === 0) return { rowSpan: 3 }
        if (idx === 1 || idx === 2) return { rowSpan: 0 }
        if (idx === 5) return { colSpan: 2 }
        return {}
      },
    },
    {
      key: 'role',
      title: g.columns.role,
      width: 120,
      onCell: (_row, idx): CellSpan => {
        if (idx === 5) return { colSpan: 0 }
        return {}
      },
    },
    {
      key: 'salary',
      title: g.columns.salary,
      width: 120,
      align: 'right' as const,
      render: (v) => salaryFmt(v),
    },
    {
      key: 'status',
      title: g.columns.status,
      width: 110,
      render: (v) => statusTag(v, l.statusLabel),
    },
  ]

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        {g.cellSpanLead}
      </p>
      <Table
        columns={cols}
        data={slice}
        pageSize={15}
        showPagination={false}
        bordered
        showRowNumber
        locale={makeTableLocale(l)}
      />
    </div>
  )
}

export function GroupedTab() {
  const l = useAppLocale('tableKitchenSink')
  const g = l.grouped
  const [mode, setMode] = useState<Mode>('group')

  return (
    <div>
      <Segmented
        value={mode}
        onChange={(v) => setMode(v as Mode)}
        options={[
          { label: g.modes.group, value: 'group' },
          { label: g.modes.tree, value: 'tree' },
          { label: g.modes.colgroups, value: 'colgroups' },
          { label: g.modes.cellspan, value: 'cellspan' },
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
