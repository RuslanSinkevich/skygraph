import { useState, useCallback, useMemo } from 'react'
import { Table, Drawer, Descriptions, notification } from '@skygraph/react'
import type { TableColumn, RowId } from '@skygraph/react'
import { statusTag, ratingBar, salaryFmt, tableData, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

export function EditingTab() {
  const l = useAppLocale('tableKitchenSink')
  const e = l.editing
  const [data, setData] = useState(tableData)
  const [hiddenCols, setHiddenCols] = useState<string[]>([])
  const [detailDrawer, setDetailDrawer] = useState<Record<string, unknown> | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<RowId[]>([])

  const handleCellEdit = useCallback(
    (id: RowId, column: string, value: unknown) => {
      setData((prev) =>
        prev.map((r) => (r.id === id ? { ...r, data: { ...r.data, [column]: value } } : r)),
      )
      notification.success(e.toasts.cellEdit(column, String(id)))
    },
    [e],
  )

  const handleRowReorder = useCallback(
    (from: number, to: number) => {
      setData((prev) => {
        const next = [...prev]
        const [moved] = next.splice(from, 1)
        next.splice(to, 0, moved)
        return next
      })
      notification.info(e.toasts.rowMove(from, to))
    },
    [e],
  )

  const columns: TableColumn[] = useMemo(
    () => [
      {
        key: 'name',
        title: e.columns.employee,
        width: 200,
        fixed: 'left' as const,
        sortable: true,
        resizable: true,
        copyable: true,
        ellipsis: true,
        tooltip: e.tooltip,
        cellClassName: (_val, row) => (row.status === 'terminated' ? 'cell-terminated' : ''),
      },
      {
        key: 'department',
        title: e.columns.department,
        width: 130,
        sortable: true,
        resizable: true,
        editable: true,
      },
      {
        key: 'role',
        title: e.columns.role,
        width: 110,
        sortable: true,
        resizable: true,
        editable: true,
      },
      {
        key: 'location',
        title: e.columns.location,
        width: 130,
        sortable: true,
        resizable: true,
        editable: true,
      },
      {
        key: 'salary',
        title: e.columns.salary,
        width: 120,
        sortable: true,
        align: 'right',
        editable: true,
        render: (v) => salaryFmt(v),
        cellClassName: (val) => (Number(val) >= 150000 ? 'cell-high-salary' : ''),
      },
      {
        key: 'rating',
        title: e.columns.rating,
        width: 150,
        render: (v) => ratingBar(v),
      },
      {
        key: 'status',
        title: e.columns.status,
        width: 110,
        sortable: true,
        render: (v) => statusTag(v, l.statusLabel),
      },
    ],
    [e, l.statusLabel],
  )

  return (
    <>
      <p style={{ marginBottom: 12, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
        {e.lead}
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
          {
            key: 'export',
            label: e.selectionActions.export,
            onClick: () => notification.info(e.selectionActions.exportToast(selectedKeys.length)),
          },
          {
            key: 'delete',
            label: e.selectionActions.delete,
            danger: true,
            onClick: () =>
              notification.warning(e.selectionActions.deleteToast(selectedKeys.length)),
          },
        ]}
        onCellEdit={handleCellEdit}
        draggable
        onColumnOrderChange={(order) => notification.info(e.toasts.colOrder(order.join(', ')))}
        rowDraggable
        onRowOrderChange={handleRowReorder}
        columnVisibility
        hiddenColumns={hiddenCols}
        onHiddenColumnsChange={setHiddenCols}
        columnPinning
        onColumnPinChange={(key, fixed) =>
          notification.info(e.toasts.colPin(key, fixed ?? e.toasts.pinNone))
        }
        columnAutoResize
        onRowClick={(_id, row) => setDetailDrawer(row)}
        rowClassName={(row) => {
          if (row.status === 'terminated') return 'row-terminated'
          if (Number(row.overtime) > 30) return 'row-overtime-warn'
          return ''
        }}
        headerContextMenu={(col) => [
          {
            key: 'hide',
            label: e.contextMenu.hide(String(col.title)),
            onClick: () => setHiddenCols((prev) => [...prev, col.key]),
          },
        ]}
        cellContextMenu={(_id, col, row) => [
          {
            key: 'copy',
            label: e.contextMenu.copy,
            onClick: () => {
              navigator.clipboard?.writeText(String(row[col] ?? ''))
              notification.success(e.contextMenu.copiedToast)
            },
          },
          { key: 'div', label: '', divider: true },
          { key: 'view', label: e.contextMenu.view, onClick: () => setDetailDrawer(row) },
        ]}
        searchable
        exportable
        onExport={(rows) => notification.success(e.toasts.exported(rows.length))}
        printable
        exportJSON
        fullscreenable
        densityToggle
        keyboardNavigation
        scroll={{ x: 1000 }}
        locale={makeTableLocale(l)}
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
