import { useState, useMemo, useCallback } from 'react'
import {
  Table, Tag, Badge, notification, NotificationContainer, Segmented,
  Button, Empty, Descriptions, Drawer,
} from '@skygraph/react'
import type { TableColumn, RowId, SummaryCell, CellSpan, TableLocale } from '@skygraph/react'
import { employees, treeEmployees, statusColors } from './data'

const statusTag = (val: unknown) => {
  const s = String(val)
  return <Tag color={statusColors[s] ?? '#999'}>{s}</Tag>
}

const ratingBar = (val: unknown) => {
  const n = Number(val)
  const pct = (n / 5) * 100
  const color = n >= 4 ? '#52c41a' : n >= 3 ? '#faad14' : '#ff4d4f'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{ flex: 1, height: 6, background: 'var(--sg-color-border-secondary, #f0f0f0)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 12, minWidth: 28 }}>{n.toFixed(1)}</span>
    </div>
  )
}

const salaryFmt = (val: unknown) => `$${Number(val).toLocaleString()}`

const tableData = employees.map((e) => ({
  id: e.id as RowId,
  data: { ...e } as Record<string, unknown>,
}))

const locale: TableLocale = {
  search: 'Search in table...',
  filterConfirm: 'Apply',
  filterReset: 'Reset',
  sortAsc: 'Sort ascending',
  sortDesc: 'Sort descending',
  cancelSort: 'Cancel sort',
  emptyText: 'No data',
  selectAll: 'Select all',
  selectInvert: 'Invert selection',
  selectionAll: 'All data',
  expand: 'Expand row',
  collapse: 'Collapse row',
  triggerAsc: 'Click to sort ascending',
  triggerDesc: 'Click to sort descending',
  cancelTrigger: 'Click to cancel sort',
  columns: 'Columns',
  density: 'Density',
  densityDefault: 'Default',
  densityMiddle: 'Medium',
  densitySmall: 'Compact',
  fullscreen: 'Fullscreen',
  exitFullscreen: 'Exit fullscreen',
  reload: 'Reload',
  export: 'Export',
  exportCSV: 'Export CSV',
  exportJSON: 'Export JSON',
  print: 'Print',
  pinLeft: 'Pin left',
  pinRight: 'Pin right',
  unpin: 'Unpin',
  sum: 'Sum',
  avg: 'Avg',
  count: 'Count',
  min: 'Min',
  max: 'Max',
  totalRows: (total: number) => `${total} rows total`,
  selectedRows: (count: number) => `${count} selected`,
}

// ---------------------------------------------------------------------------
// FULL FEATURE — every compatible prop in one table
// ---------------------------------------------------------------------------
function FullFeatureDemo() {
  const [selectedKeys, setSelectedKeys] = useState<RowId[]>([])
  const [editData, setEditData] = useState(tableData)
  const [sorts, setSorts] = useState<Array<{ key: string; direction: 'asc' | 'desc' }>>([])
  const [hiddenCols, setHiddenCols] = useState<string[]>([])
  const [detailDrawer, setDetailDrawer] = useState<Record<string, unknown> | null>(null)

  const handleCellEdit = useCallback((id: RowId, column: string, value: unknown) => {
    setEditData((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, data: { ...r.data, [column]: value } } : r,
      ),
    )
    notification.success(`Updated ${column} for row ${id}`)
  }, [])

  const handleRowReorder = useCallback((from: number, to: number) => {
    setEditData((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }, [])

  const summaryFn = useCallback((rows: Array<{ id: RowId; data: Record<string, unknown> }>): SummaryCell[][] => {
    const totalSalary = rows.reduce((s, r) => s + (Number(r.data.salary) || 0), 0)
    const avgSalary = rows.length ? totalSalary / rows.length : 0
    const avgExp = rows.length ? rows.reduce((s, r) => s + (Number(r.data.experience) || 0), 0) / rows.length : 0
    const avgRating = rows.length ? rows.reduce((s, r) => s + (Number(r.data.rating) || 0), 0) / rows.length : 0
    const totalProjects = rows.reduce((s, r) => s + (Number(r.data.projects) || 0), 0)
    const totalOT = rows.reduce((s, r) => s + (Number(r.data.overtime) || 0), 0)
    return [[
      { content: `${rows.length} employees`, colSpan: 2 },
      { content: '' },
      { content: `avg ${salaryFmt(Math.round(avgSalary))}`, align: 'right' },
      { content: `${avgExp.toFixed(1)} yrs`, align: 'center' },
      { content: `⭐ ${avgRating.toFixed(1)}` },
      { content: '' },
      { content: '' },
      { content: String(totalProjects), align: 'center' },
      { content: `${totalOT} hrs`, align: 'center' },
      { content: '' },
    ]]
  }, [])

  const columns: TableColumn[] = useMemo(() => [
    {
      key: 'name',
      title: 'Employee',
      width: 220,
      minWidth: 150,
      sortable: true,
      resizable: true,
      fixed: 'left' as const,
      copyable: true,
      ellipsis: true,
      tooltip: 'Full name of the employee',
      cellClassName: (_val: unknown, row: Record<string, unknown>) =>
        row.status === 'terminated' ? 'cell-terminated' : '',
      render: (val: unknown, row: Record<string, unknown>) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#fff',
            background: `hsl(${String(val).charCodeAt(0) * 5}, 60%, 50%)`,
          }}>
            {String(val).charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{String(val)}</div>
            <div style={{ fontSize: 11, color: 'var(--sg-color-text-tertiary)' }}>{String(row.email)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'work',
      title: 'Work Info',
      children: [
        {
          key: 'department',
          title: 'Department',
          width: 130,
          minWidth: 80,
          sortable: true,
          resizable: true,
          filters: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Support']
            .map((d) => ({ text: d, value: d })),
          onFilter: (v: unknown, row: Record<string, unknown>) => row.department === v,
          filterMultiple: true,
          filterSearch: true,
        },
        {
          key: 'role',
          title: 'Role',
          width: 100,
          minWidth: 70,
          sortable: true,
          resizable: true,
          editable: true,
          filters: ['Junior', 'Middle', 'Senior', 'Lead', 'Manager', 'Director']
            .map((r) => ({ text: r, value: r })),
          onFilter: (v: unknown, row: Record<string, unknown>) => row.role === v,
          filterMultiple: true,
        },
        {
          key: 'location',
          title: 'Location',
          width: 130,
          minWidth: 80,
          sortable: true,
          resizable: true,
          tooltip: 'Primary office location',
          filterMode: 'search' as const,
          onFilter: (v: unknown, row: Record<string, unknown>) => String(row.location).toLowerCase().includes(String(v).toLowerCase()),
        },
      ],
    },
    {
      key: 'compensation',
      title: 'Compensation',
      children: [
        {
          key: 'salary',
          title: 'Salary',
          width: 120,
          minWidth: 80,
          sortable: true,
          resizable: true,
          align: 'right' as const,
          render: (v: unknown) => salaryFmt(v),
          aggregate: 'avg' as const,
          tooltip: 'Annual salary in USD',
          copyable: true,
          cellClassName: (val: unknown) => Number(val) >= 150000 ? 'cell-high-salary' : '',
        },
        {
          key: 'experience',
          title: 'Exp (yrs)',
          width: 90,
          minWidth: 60,
          sortable: true,
          resizable: true,
          align: 'center' as const,
          aggregate: 'avg' as const,
        },
      ],
    },
    {
      key: 'performance',
      title: 'Performance',
      children: [
        {
          key: 'rating',
          title: 'Rating',
          width: 160,
          minWidth: 100,
          sortable: true,
          resizable: true,
          render: (v: unknown) => ratingBar(v),
          aggregate: 'avg' as const,
        },
        {
          key: 'projects',
          title: 'Projects',
          width: 90,
          minWidth: 60,
          sortable: true,
          align: 'center' as const,
          aggregate: 'sum' as const,
        },
        {
          key: 'overtime',
          title: 'OT (hrs)',
          width: 90,
          minWidth: 60,
          sortable: true,
          align: 'center' as const,
          aggregate: 'sum' as const,
          cellClassName: (val: unknown) => Number(val) > 30 ? 'cell-overtime-high' : '',
        },
      ],
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
    {
      key: 'hireDate',
      title: 'Hire Date',
      width: 110,
      sortable: true,
      ellipsis: true,
      copyable: true,
    },
  ], [])

  const pinnedTop = useMemo(() => editData.slice(0, 2).map(r => r.id), [editData])

  return (
    <>
      <Table
        columns={columns}
        data={editData}

        /* Sizing & appearance */
        size="small"
        bordered
        striped
        highlightOnHover
        sticky

        /* Pagination */
        pageSize={15}
        showPagination
        showSizeChanger
        pageSizeOptions={[10, 15, 25, 50, 100]}
        showQuickJumper
        showTotal={(total, range) => <span style={{ fontSize: 12 }}>{range[0]}–{range[1]} of {total} rows</span>}

        /* Row numbering */
        showRowNumber={{ title: '#', width: 44, fixed: 'left' }}

        /* Selection */
        rowSelection={{
          selectedKeys,
          onChange: (keys) => setSelectedKeys(keys),
          type: 'checkbox',
        }}
        selectionSummary
        selectionActions={[
          { key: 'export', label: 'Export Selected', onClick: () => notification.info(`Exporting ${selectedKeys.length} rows`) },
          { key: 'delete', label: 'Delete', danger: true, onClick: () => notification.warning(`Deleting ${selectedKeys.length} rows (mock)`) },
        ]}

        /* Sorting (multi-sort, controlled) */
        multiSort
        sorts={sorts}
        onSortsChange={setSorts}

        /* Inline editing */
        onCellEdit={handleCellEdit}

        /* Expandable rows */
        expandable={{
          expandedRowRender: (row) => (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, padding: 8, fontSize: 13 }}>
              <div><strong>Email:</strong> {String(row.email)}</div>
              <div><strong>Hire Date:</strong> {String(row.hireDate)}</div>
              <div><strong>Projects:</strong> {String(row.projects)}</div>
              <div><strong>Location:</strong> {String(row.location)}</div>
              <div><strong>Overtime:</strong> {String(row.overtime)} hrs</div>
              <div><strong>Status:</strong> {statusTag(row.status)}</div>
            </div>
          ),
          rowExpandable: () => true,
        }}

        /* Column drag reorder */
        draggable
        onColumnOrderChange={(order) => notification.info(`Column order: ${order.join(', ')}`)}

        /* Row drag & drop */
        rowDraggable
        onRowOrderChange={handleRowReorder}

        /* Column visibility (controlled) */
        columnVisibility
        hiddenColumns={hiddenCols}
        onHiddenColumnsChange={setHiddenCols}

        /* Column pinning */
        columnPinning
        onColumnPinChange={(key, fixed) => notification.info(`Pin ${key}: ${fixed ?? 'none'}`)}

        /* Column auto-resize on double-click */
        columnAutoResize

        /* Custom summary row */
        summary={summaryFn}

        /* Footer with aggregates */
        footer

        /* Row click */
        onRowClick={(id, data) => setDetailDrawer(data)}

        /* Conditional row styling */
        rowClassName={(row) => {
          if (row.status === 'terminated') return 'row-terminated'
          if (Number(row.overtime) > 30) return 'row-overtime-warn'
          return ''
        }}

        /* Pinned rows */
        pinnedRows={{ top: pinnedTop }}

        /* Header context menu */
        headerContextMenu={(col) => [
          { key: 'sort-asc', label: `Sort ${String(col.title)} ascending`, onClick: () => setSorts([{ key: col.key, direction: 'asc' }]) },
          { key: 'sort-desc', label: `Sort ${String(col.title)} descending`, onClick: () => setSorts([{ key: col.key, direction: 'desc' }]) },
          { key: 'div1', label: '', divider: true },
          { key: 'hide', label: 'Hide column', onClick: () => setHiddenCols(prev => [...prev, col.key]) },
        ]}

        /* Cell context menu */
        cellContextMenu={(id, col, data) => [
          { key: 'copy', label: 'Copy value', onClick: () => { navigator.clipboard?.writeText(String(data[col] ?? '')); notification.success('Copied!') } },
          { key: 'filter', label: `Filter by "${String(data[col])}"`, onClick: () => notification.info(`Filter ${col} = ${String(data[col])} (mock)`) },
          { key: 'div', label: '', divider: true },
          { key: 'view', label: 'View details', onClick: () => setDetailDrawer(data) },
        ]}

        /* Toolbar features */
        searchable
        exportable
        onExport={(data) => notification.success(`Exported ${data.length} rows to CSV`)}
        printable
        exportJSON
        fullscreenable
        densityToggle
        keyboardNavigation

        /* Scroll */
        scroll={{ x: 1500 }}

        /* Locale */
        locale={locale}

        /* Empty state */
        emptyContent={<Empty description="No employees match your criteria" />}
      />

      <Drawer
        open={!!detailDrawer}
        onClose={() => setDetailDrawer(null)}
        title={String(detailDrawer?.name ?? '')}
        width={420}
      >
        {detailDrawer && (
          <Descriptions
            items={Object.entries(detailDrawer).map(([k, v]) => ({
              label: k,
              children: typeof v === 'object' ? JSON.stringify(v) : String(v),
            }))}
            column={1}
            size="small"
          />
        )}
      </Drawer>
    </>
  )
}

// ---------------------------------------------------------------------------
// GROUP BY
// ---------------------------------------------------------------------------
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
          { key: 'salary', title: 'Salary', width: 120, sortable: true, align: 'right' as const, render: (v) => salaryFmt(v), aggregate: 'avg' as const },
          { key: 'rating', title: 'Rating', width: 150, render: (v) => ratingBar(v), aggregate: 'avg' as const },
          { key: 'projects', title: 'Projects', width: 90, sortable: true, align: 'center' as const, aggregate: 'sum' as const },
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

// ---------------------------------------------------------------------------
// TREE DATA
// ---------------------------------------------------------------------------
function TreeDemo() {
  const treeCols: TableColumn[] = [
    { key: 'name', title: 'Name', width: 250, sortable: true },
    { key: 'role', title: 'Role', width: 120 },
    { key: 'salary', title: 'Salary', width: 120, render: (v) => (Number(v) > 0 ? salaryFmt(v) : '-'), aggregate: 'sum' as const },
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
    />
  )
}

// ---------------------------------------------------------------------------
// VIRTUAL SCROLL
// ---------------------------------------------------------------------------
function VirtualDemo() {
  const largeData = useMemo(
    () => {
      const result = []
      for (let i = 0; i < 5; i++) {
        for (const e of employees) {
          result.push({
            id: `v-${result.length}` as RowId,
            data: { ...e, name: `${e.name} #${result.length + 1}` } as Record<string, unknown>,
          })
        }
      }
      return result
    },
    [],
  )

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        <strong>{largeData.length.toLocaleString()}</strong> rows with virtual scrolling — only visible rows are rendered in the DOM.
      </p>
      <Table
        columns={[
          { key: 'name', title: 'Employee', width: 200, sortable: true, fixed: 'left' as const },
          { key: 'department', title: 'Department', width: 130, sortable: true },
          { key: 'role', title: 'Role', width: 100, sortable: true },
          { key: 'salary', title: 'Salary', width: 120, sortable: true, align: 'right' as const, render: (v) => salaryFmt(v) },
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
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// DRAG & DROP (rows + columns)
// ---------------------------------------------------------------------------
function DragDemo() {
  const [data, setData] = useState(() => tableData.slice(0, 12))

  const handleReorder = useCallback((from: number, to: number) => {
    setData((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    notification.info(`Row moved from ${from} to ${to}`)
  }, [])

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        Drag rows to reorder. Drag column headers to rearrange columns.
      </p>
      <Table
        columns={[
          { key: 'name', title: 'Employee', width: 200, sortable: true },
          { key: 'department', title: 'Department', width: 130 },
          { key: 'role', title: 'Role', width: 100 },
          { key: 'salary', title: 'Salary', width: 120, align: 'right' as const, render: (v) => salaryFmt(v) },
          { key: 'status', title: 'Status', width: 110, render: (v) => statusTag(v) },
        ]}
        data={data}
        pageSize={12}
        showPagination={false}
        rowDraggable
        onRowOrderChange={handleReorder}
        draggable
        onColumnOrderChange={(order) => notification.info(`Columns: ${order.join(', ')}`)}
        showRowNumber
        bordered
        highlightOnHover
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// PINNED ROWS (top + bottom)
// ---------------------------------------------------------------------------
function PinnedRowsDemo() {
  const slice = tableData.slice(0, 20)
  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        First 2 rows pinned to <strong>top</strong>, last 2 pinned to <strong>bottom</strong>. They stay visible while scrolling.
      </p>
      <Table
        columns={[
          { key: 'name', title: 'Employee', width: 200, sortable: true, fixed: 'left' as const },
          { key: 'department', title: 'Department', width: 130, sortable: true },
          { key: 'role', title: 'Role', width: 100 },
          { key: 'salary', title: 'Salary', width: 120, sortable: true, align: 'right' as const, render: (v) => salaryFmt(v) },
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
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// COLUMN GROUPS (nested headers)
// ---------------------------------------------------------------------------
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
        { key: 'salary', title: 'Salary', width: 120, sortable: true, align: 'right' as const, render: (v) => salaryFmt(v), aggregate: 'avg' as const },
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
    />
  )
}

// ---------------------------------------------------------------------------
// CELL SPAN (onCell)
// ---------------------------------------------------------------------------
function CellSpanDemo() {
  const slice = tableData.slice(0, 15)
  const cols: TableColumn[] = [
    {
      key: 'name', title: 'Employee', width: 200, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'department', title: 'Department', width: 140,
      onCell: (row: Record<string, unknown>, idx: number): CellSpan => {
        if (idx === 0) return { rowSpan: 3 }
        if (idx === 1 || idx === 2) return { rowSpan: 0 }
        if (idx === 5) return { colSpan: 2 }
        return {}
      },
    },
    {
      key: 'role', title: 'Role', width: 120,
      onCell: (_row: Record<string, unknown>, idx: number): CellSpan => {
        if (idx === 5) return { colSpan: 0 }
        return {}
      },
    },
    { key: 'salary', title: 'Salary', width: 120, align: 'right' as const, render: (v) => salaryFmt(v) },
    { key: 'status', title: 'Status', width: 110, render: (v) => statusTag(v) },
  ]

  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        Cell spanning via <code>onCell</code>: rows 1–3 share a merged Department cell, row 6 merges Department + Role.
      </p>
      <Table
        columns={cols}
        data={slice}
        pageSize={15}
        showPagination={false}
        bordered
        showRowNumber
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// EMPTY STATE
// ---------------------------------------------------------------------------
function EmptyDemo() {
  return (
    <Table
      columns={[
        { key: 'name', title: 'Employee', width: 200 },
        { key: 'department', title: 'Department', width: 140 },
        { key: 'role', title: 'Role', width: 120 },
        { key: 'salary', title: 'Salary', width: 120 },
      ]}
      data={[]}
      emptyContent={
        <Empty description="No employees match your criteria">
          <Button type="primary" size="small" onClick={() => notification.info('Add employee (mock)')}>
            Add Employee
          </Button>
        </Empty>
      }
      searchable
      bordered
    />
  )
}

// ---------------------------------------------------------------------------
// ROOT
// ---------------------------------------------------------------------------
export function TableKitchenSinkApp() {
  const [activeTab, setActiveTab] = useState('full')

  const tabs = [
    { key: 'full', label: 'Full Feature' },
    { key: 'groups', label: 'Group By' },
    { key: 'tree', label: 'Tree Data' },
    { key: 'virtual', label: 'Virtual Scroll' },
    { key: 'drag', label: 'Drag & Drop' },
    { key: 'pinned', label: 'Pinned Rows' },
    { key: 'colgroups', label: 'Column Groups' },
    { key: 'cellspan', label: 'Cell Span' },
    { key: 'empty', label: 'Empty State' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <NotificationContainer />
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>Table — Kitchen Sink</h2>
        <p style={{ margin: 0, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
          Every Table feature in one place: multi-sort, filtering, grouping, tree data, virtual scroll,
          drag &amp; drop (rows + columns), inline editing, export (CSV/JSON), print, fullscreen, density toggle,
          keyboard navigation, cell spanning, column pinning, column visibility, aggregation,
          pinned rows, selection summary, context menus, row numbering, custom summary, and locale.
        </p>
      </div>
      <Segmented
        value={activeTab}
        onChange={(v) => setActiveTab(v as string)}
        options={tabs.map((t) => ({ label: t.label, value: t.key }))}
      />
      <div style={{ marginTop: 16, flex: 1 }}>
        {activeTab === 'full' && <FullFeatureDemo />}
        {activeTab === 'groups' && <GroupByDemo />}
        {activeTab === 'tree' && <TreeDemo />}
        {activeTab === 'virtual' && <VirtualDemo />}
        {activeTab === 'drag' && <DragDemo />}
        {activeTab === 'pinned' && <PinnedRowsDemo />}
        {activeTab === 'colgroups' && <ColumnGroupsDemo />}
        {activeTab === 'cellspan' && <CellSpanDemo />}
        {activeTab === 'empty' && <EmptyDemo />}
      </div>
      <style>{`
        .cell-overtime-high { background: color-mix(in srgb, #ff4d4f 8%, transparent) !important; }
        .cell-high-salary { background: color-mix(in srgb, #faad14 8%, transparent) !important; }
        .cell-terminated { opacity: 0.5; }
        .row-terminated { opacity: 0.6; }
        .row-overtime-warn { border-left: 3px solid #ff4d4f !important; }
      `}</style>
    </div>
  )
}
