import { useMemo } from 'react'
import { Calendar, Table, Tag, Button, notification } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { leaveRecords, leaveToRow } from './data'
import { dateKey, statusColor } from '../_shared'

export function LeaveTab() {
  const tableData = useMemo(() => leaveRecords.map(leaveToRow), [])

  const columns: TableColumn[] = [
    { key: 'employeeName', title: 'Employee', width: 160, sortable: true },
    { key: 'type', title: 'Type', width: 100, render: (val) => <Tag>{String(val)}</Tag> },
    { key: 'startDate', title: 'From', width: 110, sortable: true },
    { key: 'endDate', title: 'To', width: 110 },
    {
      key: 'status', title: 'Status', width: 100,
      filters: ['approved', 'pending', 'rejected'].map(v => ({ text: v, value: v })),
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColor(String(val))}>{String(val)}</Tag>,
    },
    {
      key: 'actions', title: '', width: 160,
      render: (_, row) => row.status === 'pending' ? (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" type="primary" onClick={() => notification.success(`Approved leave for ${row.employeeName}`)}>Approve</Button>
          <Button size="small" onClick={() => notification.error(`Rejected leave for ${row.employeeName}`)}>Reject</Button>
        </div>
      ) : null,
    },
  ]

  return (
    <>
      <Calendar
        fullscreen={false}
        cellRender={(date) => {
          const k = dateKey(date)
          const leaves = leaveRecords.filter(l =>
            l.status === 'approved' && k >= l.startDate && k <= l.endDate
          )
          if (!leaves.length) return null
          return (
            <div style={{ fontSize: 10 }}>
              {leaves.slice(0, 1).map((l, i) => <div key={i}>{l.employeeName.split(' ')[0]}</div>)}
              {leaves.length > 1 && <div>+{leaves.length - 1}</div>}
            </div>
          )
        }}
      />
      <div style={{ marginTop: 20 }}>
        <h4 style={{ marginBottom: 12 }}>Leave Requests</h4>
        <Table columns={columns} data={tableData} pageSize={8} size="small" />
      </div>
    </>
  )
}
