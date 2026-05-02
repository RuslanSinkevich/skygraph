import { useState, useMemo } from 'react'
import {
  Table, Tag, Button, Modal, Form, Field, Input, Select, InputNumber,
  Popconfirm, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { apiKeys as initialKeys } from './apiKeysData'
import type { ApiKey } from './apiKeysData'
import { Toolbar, useFilteredList, statusColor, num } from '../_shared'

const SCOPE_OPTIONS = [
  'read:users', 'write:users', 'read:orders', 'write:orders',
  'read:analytics', 'admin:settings', 'webhooks:write', 'billing:read',
]

/** NEW tab: API key management. */
export function ApiKeysTab() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [createdKey, setCreatedKey] = useState<string | null>(null)

  const filtered = useFilteredList(keys, search, ['name', 'ownerName', 'prefix'])

  const tableData = useMemo(
    () => filtered.map(k => ({ id: k.id, data: k as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Key Name', width: 200, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'prefix', title: 'Token', width: 140,
      render: (val) => (
        <code style={{ fontSize: 12, background: 'var(--sg-color-bg-secondary)', padding: '2px 6px', borderRadius: 3 }}>
          {String(val)}…
        </code>
      ),
    },
    { key: 'ownerName', title: 'Owner', width: 140, sortable: true },
    {
      key: 'scopes', title: 'Scopes', width: 220,
      render: (val) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {(val as string[]).map(s => <Tag key={s} style={{ fontSize: 10 }}>{s}</Tag>)}
        </div>
      ),
    },
    {
      key: 'rateLimit', title: 'Rate', width: 100, sortable: true, align: 'right',
      render: (val) => `${num(Number(val))}/min`,
    },
    { key: 'lastUsed', title: 'Last Used', width: 150, render: (v) => (v as string | null) ?? '—' },
    { key: 'expiresAt', title: 'Expires', width: 110 },
    {
      key: 'status', title: 'Status', width: 100,
      render: (val) => <Tag color={statusColor(String(val))}>{String(val)}</Tag>,
    },
    {
      key: 'actions', title: '', width: 130,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" onClick={() => notification.info(`Rotate ${row.name} (mock)`)}>Rotate</Button>
          <Popconfirm
            title="Revoke this API key?"
            onConfirm={() => {
              setKeys(prev => prev.map(k => k.id === row.id ? { ...k, status: 'revoked', lastUsed: null } : k))
              notification.error(`Revoked ${row.name}`)
            }}
          >
            <Button size="small" danger>Revoke</Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  const handleCreate = (values: Record<string, unknown>) => {
    const prefix = `sk_${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    const fullKey = `${prefix}_${Math.random().toString(36).slice(2, 30)}`
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: String(values.name),
      prefix,
      scopes: (values.scopes as string[]) ?? [],
      ownerId: 'u1',
      ownerName: 'You',
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsed: null,
      expiresAt: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
      rateLimit: Number(values.rateLimit) || 100,
      status: 'active',
    }
    setKeys(prev => [newKey, ...prev])
    setCreatedKey(fullKey)
    setCreateOpen(false)
  }

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search keys…' }}
        actions={<Button type="primary" onClick={() => setCreateOpen(true)}>+ Create Key</Button>}
      />
      <Table columns={columns} data={tableData} pageSize={10} size="small" />

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create API Key" footer={null} width={520}>
        <Form onFinish={(v) => handleCreate(v)}>
          <Field name="name" label="Key Name" rules={[{ required: true }]}>
            <Input placeholder="Production Backend" />
          </Field>
          <Field name="scopes" label="Scopes" rules={[{ required: true }]}>
            {(field) => (
              <Select
                multiple
                value={(field.value as string[]) ?? []}
                onChange={(vals) => field.onChange(vals)}
                options={SCOPE_OPTIONS.map(s => ({ label: s, value: s }))}
                placeholder="Pick scopes"
              />
            )}
          </Field>
          <Field name="rateLimit" label="Rate Limit (req/min)">
            <InputNumber min={1} max={10000} placeholder="100" style={{ width: '100%' }} />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Generate Key</Button>
          </div>
        </Form>
      </Modal>

      <Modal
        open={!!createdKey}
        onClose={() => setCreatedKey(null)}
        title="API Key Created"
        footer={
          <Button type="primary" onClick={() => setCreatedKey(null)}>I have copied the key</Button>
        }
        width={560}
      >
        <p style={{ color: 'var(--sg-color-warning)', fontSize: 13 }}>
          ⚠️ Copy this key now — for security reasons, you will not be able to see it again.
        </p>
        <code style={{
          display: 'block',
          padding: 12,
          background: 'var(--sg-color-bg-secondary)',
          borderRadius: 6,
          fontFamily: 'monospace',
          fontSize: 13,
          wordBreak: 'break-all',
          margin: '12px 0',
        }}>{createdKey}</code>
        <Button onClick={() => {
          if (createdKey) {
            navigator.clipboard?.writeText(createdKey)
            notification.success('Copied to clipboard')
          }
        }}>Copy</Button>
      </Modal>
    </>
  )
}
