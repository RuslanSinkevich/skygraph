import { useState, useCallback, useMemo } from 'react'
import {
  Table, Drawer, Descriptions, notification,
} from '@skygraph/react'
import type { TableColumn, RowId } from '@skygraph/react'
import { statusTag, ratingBar, salaryFmt, tableData, locale } from './common'

export function EditingTab() {
  const [data, setData] = useState(tableData)
  const [hiddenCols, setHiddenCols] = useState<string[]>([])
  const [detailDrawer, setDetailDrawer] = useState<Record<string, unknown> | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<RowId[]>([])

  const handleCellEdit = useCallback((id: RowId, column: string, value: unknown) => {
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, data: { ...r.data, [column]: value } } : r)),
    )
    notification.success(`Updated ${column} for row ${id}`)
  }, [])

  const handleRowReorder = useCallback((from: number, to: number) => {
    setData((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    notification.info(`Row moved from ${from} to ${to}`)
  }, [])

  const columns: TableColumn[] = useMemo(() => [
    {
      key: 'name', title: 'Employee', width: 200, fixed: 'left' as const,
      sortable: true, resizable: true, copyable: true, ellipsis: true,
      tooltip: 'Full name of the employee',
      cellClassName: (_val, row) => row.status === 'terminated' ? 'cell-terminated' : '',
    },
    {
      key: 'department', title: 'Department', width: 130, sortable: true, resizable: true,
      editable: true,
    },
    {
      key: 'role', title: 'Role', width: 110, sortable: true, resizable: true,
      editable: true,
    },
    {
      key: 'location', title: 'Location', width: 130, sortable: true, resizable: true,
      editable: true,
    },
    {
      key: 'salary', title: 'Salary', width: 120, sortable: true, align: 'right',
      editable: true,
      render: (v) => salaryFmt(v),
      cellClassName: (val) => Number(val) >= 150000 ? 'cell-high-salary' : '',
    },
    {
      key: 'rating', title: 'Rating', width: 150,
      render: (v) => ratingBar(v),
    },
    {
      key: 'status', title: 'Status', width: 110, sortable: true,
      render: (v) => statusTag(v),
    },
  ], [])

  return (
    <>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        Double-click any editable cell to change it. Drag rows by their handle to reorder. Drag column
        headers to rearrange. Right-click a header or cell for context actions.
      </p>
      <Table
        columns={columns}
        data={data}
        pageSize={15}
        showPagination
        showSizeChanger
        showQuickJumper
        size="small"
        bordered
        striped
        highlightOnHover
        sticky

        showRowNumber={{ title: '#', width: 44, fixed: 'left' }}

        rowSelection={{
          selectedKeys,
          onChange: setSelectedKeys,
          type: 'checkbox',
        }}
        selectionSummary
        selectionActions={[
          { key: 'export', label: 'Export Selected', onClick: () => notification.info(`Exporting ${selectedKeys.length} rows`) },
          { key: 'delete', label: 'Delete', danger: true, onClick: () => notification.warning(`Deleting ${selectedKeys.length} rows (mock)`) },
        ]}

        onCellEdit={handleCellEdit}

        draggable
        onColumnOrderChange={(order) => notification.info(`Column order: ${order.join(', ')}`)}

        rowDraggable
        onRowOrderChange={handleRowReorder}

        columnVisibility
        hiddenColumns={hiddenCols}
        onHiddenColumnsChange={setHiddenCols}

        columnPinning
        onColumnPinChange={(key, fixed) => notification.info(`Pin ${key}: ${fixed ?? 'none'}`)}

        columnAutoResize

        onRowClick={(_id, row) => setDetailDrawer(row)}

        rowClassName={(row) => {
          if (row.status === 'terminated') return 'row-terminated'
          if (Number(row.overtime) > 30) return 'row-overtime-warn'
          return ''
        }}

        headerContextMenu={(col) => [
          { key: 'hide', label: `Hide "${String(col.title)}"`, onClick: () => setHiddenCols(prev => [...prev, col.key]) },
        ]}

        cellContextMenu={(_id, col, row) => [
          {
            key: 'copy',
            label: 'Copy value',
            onClick: () => {
              navigator.clipboard?.writeText(String(row[col] ?? ''))
              notification.success('Copied!')
            },
          },
          { key: 'div', label: '', divider: true },
          { key: 'view', label: 'View details', onClick: () => setDetailDrawer(row) },
        ]}

        searchable
        exportable
        onExport={(rows) => notification.success(`Exported ${rows.length} rows to CSV`)}
        printable
        exportJSON
        fullscreenable
        densityToggle
        keyboardNavigation

        scroll={{ x: 1000 }}
        locale={locale}
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
