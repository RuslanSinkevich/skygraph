import { useState, useMemo } from 'react'
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Field,
  Input,
  Select,
  InputNumber,
  Popconfirm,
  notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { apiKeys as initialKeys } from './apiKeysData'
import type { ApiKey } from './apiKeysData'
import { Toolbar, useFilteredList, statusColor, num, useAppLocale } from '../_shared'

const SCOPE_OPTIONS = [
  'read:users',
  'write:users',
  'read:orders',
  'write:orders',
  'read:analytics',
  'admin:settings',
  'webhooks:write',
  'billing:read',
]

/** NEW tab: API key management. */
export function ApiKeysTab() {
  const lc = useAppLocale('admin')
  const k = lc.apiKeys
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [createdKey, setCreatedKey] = useState<string | null>(null)

  const filtered = useFilteredList(keys, search, ['name', 'ownerName', 'prefix'])

  const tableData = useMemo(
    () => filtered.map((key) => ({ id: key.id, data: key as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: k.columns.name,
      width: 200,
      sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'prefix',
      title: k.columns.token,
      width: 140,
      render: (val) => (
        <code
          style={{
            fontSize: 12,
            background: 'var(--sg-color-bg-secondary)',
            padding: '2px 6px',
            borderRadius: 3,
          }}
        >
          {String(val)}…
        </code>
      ),
    },
    { key: 'ownerName', title: k.columns.owner, width: 140, sortable: true },
    {
      key: 'scopes',
      title: k.columns.scopes,
      width: 220,
      render: (val) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {(val as string[]).map((scope) => (
            <Tag key={scope} style={{ fontSize: 10 }}>
              {scope}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      key: 'rateLimit',
      title: k.columns.rateTitle,
      width: 100,
      sortable: true,
      align: 'right',
      render: (val) => k.columns.rate(num(Number(val))),
    },
    {
      key: 'lastUsed',
      title: k.columns.lastUsed,
      width: 150,
      render: (v) => (v as string | null) ?? '—',
    },
    { key: 'expiresAt', title: k.columns.expires, width: 110 },
    {
      key: 'status',
      title: k.columns.status,
      width: 100,
      render: (val) => {
        const v = String(val) as keyof typeof lc.apiKeyStatusLabel
        return <Tag color={statusColor(String(val))}>{lc.apiKeyStatusLabel[v] ?? String(val)}</Tag>
      },
    },
    {
      key: 'actions',
      title: '',
      width: 130,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" onClick={() => notification.info(k.rotateToast(String(row.name)))}>
            {k.rotate}
          </Button>
          <Popconfirm
            title={k.revokeConfirm}
            onConfirm={() => {
              setKeys((prev) =>
                prev.map((key) =>
                  key.id === row.id ? { ...key, status: 'revoked', lastUsed: null } : key,
                ),
              )
              notification.error(k.revokedToast(String(row.name)))
            }}
          >
            <Button size="small" danger>
              {k.revoke}
            </Button>
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
    setKeys((prev) => [newKey, ...prev])
    setCreatedKey(fullKey)
    setCreateOpen(false)
  }

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: k.searchPlaceholder }}
        actions={
          <Button type="primary" onClick={() => setCreateOpen(true)}>
            {k.createBtn}
          </Button>
        }
      />
      <Table columns={columns} data={tableData} pageSize={10} size="small" />

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title={k.createTitle}
        footer={null}
        width={520}
      >
        <Form onFinish={(v) => handleCreate(v)}>
          <Field name="name" label={k.keyName} rules={[{ required: true }]}>
            <Input placeholder={k.keyNamePh} />
          </Field>
          <Field name="scopes" label={k.scopesLabel} rules={[{ required: true }]}>
            {(field) => (
              <Select
                multiple
                value={(field.value as string[]) ?? []}
                onChange={(vals) => field.onChange(vals)}
                options={SCOPE_OPTIONS.map((s) => ({ label: s, value: s }))}
                placeholder={k.scopesPh}
              />
            )}
          </Field>
          <Field name="rateLimit" label={k.rateLabel}>
            <InputNumber min={1} max={10000} placeholder={k.ratePh} style={{ width: '100%' }} />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setCreateOpen(false)}>{k.cancel}</Button>
            <Button type="primary" htmlType="submit">
              {k.generate}
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        open={!!createdKey}
        onClose={() => setCreatedKey(null)}
        title={k.createdTitle}
        footer={
          <Button type="primary" onClick={() => setCreatedKey(null)}>
            {k.confirmedBtn}
          </Button>
        }
        width={560}
      >
        <p style={{ color: 'var(--sg-color-warning)', fontSize: 13 }}>⚠️ {k.createdWarning}</p>
        <code
          style={{
            display: 'block',
            padding: 12,
            background: 'var(--sg-color-bg-secondary)',
            borderRadius: 6,
            fontFamily: 'monospace',
            fontSize: 13,
            wordBreak: 'break-all',
            margin: '12px 0',
          }}
        >
          {createdKey}
        </code>
        <Button
          onClick={() => {
            if (createdKey) {
              navigator.clipboard?.writeText(createdKey)
              notification.success(k.copiedToast)
            }
          }}
        >
          {k.copy}
        </Button>
      </Modal>
    </>
  )
}
