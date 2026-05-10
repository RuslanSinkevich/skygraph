import { useMemo, useState } from 'react'
import { ResourceCalendar, Table, Tag, Button, Segmented, notification } from '@skygraph/react'
import type { Assignment, Conflict, Resource, TableColumn } from '@skygraph/react'
import { employees, leaveRecords, leaveToRow } from './data'
import { statusColor, useAppLocale } from '../_shared'

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
  const lc = useAppLocale('hrPortal')
  const lv = lc.leave
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
        title: `${lc.leaveTypeLabel[l.type] ?? l.type} · ${lc.leaveStatusLabel[l.status] ?? l.status}`,
        start: dateMs(l.startDate),
        end: dateMs(l.endDate) + DAY_MS,
        status: l.status === 'pending' ? 'tentative' : (TYPE_STATUS[l.type] ?? 'tentative'),
      }))
  }, [resources, lc])

  const [assignments, setAssignments] = useState(initialAssignments)

  const tableData = useMemo(() => leaveRecords.map(leaveToRow), [])

  const columns: TableColumn[] = [
    { key: 'employeeName', title: lv.table.employee, width: 180, sortable: true, fixed: 'left' },
    {
      key: 'type',
      title: lv.table.type,
      width: 110,
      filters: (['vacation', 'sick', 'personal', 'remote'] as const).map((v) => ({
        text: lv.table.typeFilters[v],
        value: v,
      })),
      onFilter: (v, row) => row.type === v,
      render: (val) => {
        const v = String(val) as keyof typeof lc.leaveTypeLabel
        return <Tag>{lc.leaveTypeLabel[v] ?? String(val)}</Tag>
      },
    },
    { key: 'startDate', title: lv.table.from, width: 120, sortable: true },
    { key: 'endDate', title: lv.table.to, width: 120, sortable: true },
    {
      key: 'status',
      title: lv.table.status,
      width: 110,
      filters: (['approved', 'pending', 'rejected'] as const).map((v) => ({
        text: lv.table.statusFilters[v],
        value: v,
      })),
      onFilter: (value, row) => row.status === value,
      render: (val) => {
        const v = String(val) as keyof typeof lc.leaveStatusLabel
        return <Tag color={statusColor(String(val))}>{lc.leaveStatusLabel[v] ?? String(val)}</Tag>
      },
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
              onClick={() => notification.success(lv.toasts.approved(String(row.employeeName)))}
            >
              {lv.table.approve}
            </Button>
            <Button
              size="small"
              onClick={() => notification.error(lv.toasts.rejected(String(row.employeeName)))}
            >
              {lv.table.reject}
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
            { label: lv.views.calendar, value: 'calendar' },
            { label: lv.views.table, value: 'table' },
          ]}
        />
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          {conflicts.length === 0 ? lv.noOverlaps : lv.overlapsCount(conflicts.length)}
        </span>
      </div>

      {view === 'calendar' ? (
        <div
          style={{
            overflowX: 'auto',
            border: '1px solid var(--sg-color-border-secondary)',
            borderRadius: 8,
          }}
        >
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
            { key: 'type', label: lv.table.groupByType },
            { key: 'status', label: lv.table.groupByStatus },
          ]}
          footer
        />
      )}
    </div>
  )
}
