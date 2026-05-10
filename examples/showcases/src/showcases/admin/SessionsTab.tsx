import { useState, useMemo } from 'react'
import { Table, Tag, Button, Popconfirm, Avatar, notification } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { activeSessions as initial } from './apiKeysData'
import type { ActiveSession } from './apiKeysData'
import { Toolbar, useFilteredList, initials, colorFromString, useAppLocale } from '../_shared'

const DEVICE_ICONS: Record<string, string> = {
  MacBook: '💻',
  Windows: '🖥️',
  iPad: '📱',
  iPhone: '📱',
  Android: '📱',
  Linux: '🐧',
}

function deviceIcon(device: string): string {
  for (const [key, icon] of Object.entries(DEVICE_ICONS)) {
    if (device.includes(key)) return icon
  }
  return '🌐'
}

/** NEW tab: active session monitoring + remote logout. */
export function SessionsTab() {
  const ses = useAppLocale('admin').sessions
  const [sessions, setSessions] = useState<ActiveSession[]>(initial)
  const [search, setSearch] = useState('')

  const filtered = useFilteredList(sessions, search, ['userName', 'ip', 'location', 'browser'])

  const tableData = useMemo(
    () => filtered.map((s) => ({ id: s.id, data: s as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'userName',
      title: ses.columns.user,
      width: 200,
      sortable: true,
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
      key: 'device',
      title: ses.columns.device,
      width: 200,
      render: (val, row) => (
        <span>
          {deviceIcon(String(val))} {String(val)} ·{' '}
          <span style={{ color: 'var(--sg-color-text-secondary)' }}>{String(row.browser)}</span>
        </span>
      ),
    },
    { key: 'location', title: ses.columns.location, width: 140 },
    {
      key: 'ip',
      title: ses.columns.ip,
      width: 130,
      render: (val) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{String(val)}</span>,
    },
    { key: 'createdAt', title: ses.columns.started, width: 150, sortable: true },
    {
      key: 'lastActive',
      title: ses.columns.lastActive,
      width: 150,
      sortable: true,
      render: (val) => (
        <span style={{ color: 'var(--sg-color-text-secondary)' }}>{String(val)}</span>
      ),
    },
    {
      key: 'current',
      title: '',
      width: 80,
      render: (val) => (val ? <Tag color="success">{ses.currentTag}</Tag> : null),
    },
    {
      key: 'actions',
      title: '',
      width: 110,
      render: (_, row) =>
        row.current ? (
          <Button size="small" disabled>
            {ses.youBtn}
          </Button>
        ) : (
          <Popconfirm
            title={ses.terminateConfirm(String(row.userName))}
            onConfirm={() => {
              setSessions((prev) => prev.filter((s) => s.id !== row.id))
              notification.success(ses.terminatedToast(String(row.id)))
            }}
          >
            <Button size="small" danger>
              {ses.terminate}
            </Button>
          </Popconfirm>
        ),
    },
  ]

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: ses.searchPlaceholder }}
        actions={
          <Popconfirm
            title={ses.terminateAllConfirm}
            onConfirm={() => {
              setSessions((prev) => prev.filter((s) => s.current))
              notification.warning(ses.terminateAllToast)
            }}
          >
            <Button danger>{ses.terminateAllBtn}</Button>
          </Popconfirm>
        }
      />
      <Table columns={columns} data={tableData} pageSize={12} size="small" striped />
    </>
  )
}
