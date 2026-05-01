import { useState, useMemo } from 'react'
import {
  Table, Tag, Button, Popconfirm, Avatar, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { activeSessions as initial } from './apiKeysData'
import type { ActiveSession } from './apiKeysData'
import { Toolbar, useFilteredList, initials, colorFromString } from '../_shared'

const DEVICE_ICONS: Record<string, string> = {
  MacBook: '💻', Windows: '🖥️', iPad: '📱', iPhone: '📱', Android: '📱', Linux: '🐧',
}

function deviceIcon(device: string): string {
  for (const [key, icon] of Object.entries(DEVICE_ICONS)) {
    if (device.includes(key)) return icon
  }
  return '🌐'
}

/** NEW tab: active session monitoring + remote logout. */
export function SessionsTab() {
  const [sessions, setSessions] = useState<ActiveSession[]>(initial)
  const [search, setSearch] = useState('')

  const filtered = useFilteredList(sessions, search, ['userName', 'ip', 'location', 'browser'])

  const tableData = useMemo(
    () => filtered.map(s => ({ id: s.id, data: s as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'userName', title: 'User', width: 200, sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small" style={{ background: colorFromString(String(val)) }}>
            {initials(String(val))}
          </Avatar>
          <span style={{ fontWeight: 500 }}>{String(val)}</span>
        </div>
      ),
    },
    {
      key: 'device', title: 'Device', width: 200,
      render: (val, row) => (
        <span>{deviceIcon(String(val))} {String(val)} · <span style={{ color: 'var(--sg-color-text-secondary)' }}>{String(row.browser)}</span></span>
      ),
    },
    { key: 'location', title: 'Location', width: 140 },
    {
      key: 'ip', title: 'IP', width: 130,
      render: (val) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{String(val)}</span>,
    },
    { key: 'createdAt', title: 'Started', width: 150, sortable: true },
    {
      key: 'lastActive', title: 'Last Active', width: 150, sortable: true,
      render: (val) => <span style={{ color: 'var(--sg-color-text-secondary)' }}>{String(val)}</span>,
    },
    {
      key: 'current', title: '', width: 80,
      render: (val) => val ? <Tag color="success">Current</Tag> : null,
    },
    {
      key: 'actions', title: '', width: 110,
      render: (_, row) => row.current ? (
        <Button size="small" disabled>This is you</Button>
      ) : (
        <Popconfirm
          title={`Terminate session for ${row.userName}?`}
          onConfirm={() => {
            setSessions(prev => prev.filter(s => s.id !== row.id))
            notification.success(`Session ${row.id} terminated`)
          }}
        >
          <Button size="small" style={{ color: 'var(--sg-color-error, #d4380d)' }}>Terminate</Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search by user, IP, location…' }}
        actions={
          <Popconfirm
            title="Terminate ALL other sessions? You will stay signed in."
            onConfirm={() => {
              setSessions(prev => prev.filter(s => s.current))
              notification.warning('All other sessions terminated')
            }}
          >
            <Button style={{ color: 'var(--sg-color-error, #d4380d)' }}>Terminate All Others</Button>
          </Popconfirm>
        }
      />
      <Table columns={columns} data={tableData} pageSize={12} size="small" striped />
    </>
  )
}
