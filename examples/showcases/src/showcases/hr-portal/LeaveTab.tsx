import { useMemo, useState } from 'react'
import {
  ResourceCalendar,
  Table,
  Tag,
  Button,
  Segmented,
  notification,
} from '@skygraph/react'
import type {
  Assignment,
  Conflict,
  Resource,
  TableColumn,
} from '@skygraph/react'
import { employees, leaveRecords, leaveToRow } from './data'
import { statusColor } from '../_shared'

const PALETTE = [
  '#3b82f6',
  '#f97316',
  '#10b981',
  '#a855f7',
  '#ef4444',
  '#0ea5e9',
  '#eab308',
  '#22c55e',
]

const TYPE_STATUS: Record<string, 'tentative' | 'confirmed'> = {
  vacation: 'confirmed',
  remote: 'tentative',
  personal: 'tentative',
  sick: 'tentative',
}

const DAY_MS = 86_400_000

function dateMs(s: string): number {
  return new Date(s + 'T00:00:00Z').getTime()
}

export function LeaveTab() {
  const [view, setView] = useState<'calendar' | 'table'>('calendar')
  const [conflicts, setConflicts] = useState<Conflict[]>([])

  const resources = useMemo<Resource[]>(() => {
    const ids = new Set(leaveRecords.map((l) => l.employeeId))
    const list = employees.filter((e) => ids.has(e.id)).slice(0, 12)
    return list.map((e, i) => ({
      id: e.id,
      name: `${e.name} · ${e.role}`,
      color: PALETTE[i % PALETTE.length]!,
      capacityPerSlot: 1,
    }))
  }, [])

  const initialAssignments = useMemo<Assignment[]>(() => {
    const allowed = new Set(resources.map((r) => r.id))
    return leaveRecords
      .filter((l) => l.status !== 'rejected' && allowed.has(l.employeeId))
      .map((l) => ({
        id: l.id,
        resourceId: l.employeeId,
        title: `${l.type} · ${l.status}`,
        start: dateMs(l.startDate),
        end: dateMs(l.endDate) + DAY_MS,
        status: l.status === 'pending' ? 'tentative' : TYPE_STATUS[l.type] ?? 'tentative',
      }))
  }, [resources])

  const [assignments, setAssignments] = useState(initialAssignments)

  const tableData = useMemo(() => leaveRecords.map(leaveToRow), [])

  const columns: TableColumn[] = [
    { key: 'employeeName', title: 'Employee', width: 180, sortable: true, fixed: 'left' },
    {
      key: 'type',
      title: 'Type',
      width: 110,
      filters: [
        { text: 'vacation', value: 'vacation' },
        { text: 'sick', value: 'sick' },
        { text: 'personal', value: 'personal' },
        { text: 'remote', value: 'remote' },
      ],
      onFilter: (v, row) => row.type === v,
      render: (val) => <Tag>{String(val)}</Tag>,
    },
    { key: 'startDate', title: 'From', width: 120, sortable: true },
    { key: 'endDate', title: 'To', width: 120, sortable: true },
    {
      key: 'status',
      title: 'Status',
      width: 110,
      filters: ['approved', 'pending', 'rejected'].map((v) => ({ text: v, value: v })),
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColor(String(val))}>{String(val)}</Tag>,
    },
    {
      key: 'actions',
      title: '',
      width: 180,
      render: (_, row) =>
        row.status === 'pending' ? (
          <div style={{ display: 'flex', gap: 4 }}>
            <Button
              size="small"
              type="primary"
              onClick={() => notification.success(`Approved leave for ${row.employeeName}`)}
            >
              Approve
            </Button>
            <Button
              size="small"
              onClick={() => notification.error(`Rejected leave for ${row.employeeName}`)}
            >
              Reject
            </Button>
          </div>
        ) : null,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Segmented
          value={view}
          onChange={(v) => setView(v as typeof view)}
          options={[
            { label: 'Lane planner (ResourceCalendar)', value: 'calendar' },
            { label: 'Requests table', value: 'table' },
          ]}
        />
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          {conflicts.length === 0 ? 'No overlapping leaves' : `${conflicts.length} overlap(s) detected`}
        </span>
      </div>

      {view === 'calendar' ? (
        <div style={{ overflowX: 'auto', border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8 }}>
          <ResourceCalendar
            resources={resources}
            assignments={assignments}
            scale="week"
            columnWidth={120}
            rowHeight={56}
            sidebarWidth={220}
            draggable
            resizable
            onAssignmentChange={(next) =>
              setAssignments((prev) => prev.map((a) => (a.id === next.id ? { ...a, ...next } : a)))
            }
            onConflict={setConflicts}
          />
        </div>
      ) : (
        <Table
          columns={columns}
          data={tableData}
          pageSize={10}
          size="small"
          searchable
          bordered
          striped
          columnPinning
          densityToggle
          exportable
          groupByOptions={[
            { key: 'type', label: 'Leave type' },
            { key: 'status', label: 'Status' },
          ]}
          footer
        />
      )}
    </div>
  )
}
