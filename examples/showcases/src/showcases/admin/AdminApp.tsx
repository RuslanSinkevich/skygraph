import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Badge, Avatar, Button, Input, Select,
  Modal, Drawer, Descriptions, Form, Field, Switch, InputNumber,
  Progress, Popconfirm, Dropdown, Collapse, Transfer,
  notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import {
  systemUsers, auditLog, roles, systemSettings, allPermissions,
  userToRow, auditToRow,
} from './data'
import type { SystemUser, UserRole, UserStatus, AuditEntry, RoleDefinition } from './data'

const roleColors: Record<UserRole, string> = {
  admin: 'error', editor: 'processing', viewer: 'default', moderator: 'warning', support: 'success',
}

const statusColors: Record<UserStatus, string> = {
  active: 'success', suspended: 'error', pending: 'warning', deactivated: 'default',
}

const severityColors: Record<string, string> = {
  info: 'default', warning: 'warning', critical: 'error',
}

function StatsRow() {
  const active = systemUsers.filter(u => u.status === 'active').length
  const admins = systemUsers.filter(u => u.role === 'admin').length
  const twoFa = systemUsers.filter(u => u.twoFactor).length
  const pctTwoFa = Math.round((twoFa / systemUsers.length) * 100)
  const recentLogs = auditLog.filter(l => l.severity === 'critical').length
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-card-label">Total Users</div>
        <div className="stat-card-value">{systemUsers.length}</div>
        <div className="stat-card-sub">{active} active</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Admins</div>
        <div className="stat-card-value">{admins}</div>
        <div className="stat-card-sub">{roles.length} roles defined</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">2FA Adoption</div>
        <div className="stat-card-value">{pctTwoFa}%</div>
        <Progress percent={pctTwoFa} showInfo={false} status={pctTwoFa > 70 ? 'success' : 'active'} />
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Critical Events</div>
        <div className="stat-card-value" style={{ color: recentLogs > 0 ? 'var(--sg-color-error)' : undefined }}>
          {recentLogs}
        </div>
        <div className="stat-card-sub">last 14 days</div>
      </div>
    </div>
  )
}

function UsersTab() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [userDrawer, setUserDrawer] = useState<SystemUser | null>(null)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState<SystemUser | null>(null)

  const filtered = useMemo(() => {
    if (!search) return systemUsers
    const q = search.toLowerCase()
    return systemUsers.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.department.toLowerCase().includes(q)
    )
  }, [search])

  const tableData = useMemo(() => filtered.map(userToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'User', width: 240, sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small">{String(row.avatar)}</Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{String(row.name)}</div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{String(row.email)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role', title: 'Role', width: 110, sortable: true,
      filters: (['admin', 'editor', 'viewer', 'moderator', 'support'] as UserRole[]).map(r => ({ text: r, value: r })),
      onFilter: (value, row) => row.role === value,
      render: (val) => <Tag color={roleColors[val as UserRole]}>{String(val)}</Tag>,
    },
    {
      key: 'status', title: 'Status', width: 110,
      filters: (['active', 'suspended', 'pending', 'deactivated'] as UserStatus[]).map(s => ({ text: s, value: s })),
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColors[val as UserStatus]}>{String(val)}</Tag>,
    },
    { key: 'department', title: 'Department', width: 120, sortable: true },
    {
      key: 'twoFactor', title: '2FA', width: 60, align: 'center',
      render: (val) => val ? <span style={{ color: 'var(--sg-color-success)' }}>✓</span> : <span style={{ color: 'var(--sg-color-text-secondary)' }}>—</span>,
    },
    { key: 'lastLogin', title: 'Last Login', width: 150, sortable: true },
    {
      key: 'loginCount', title: 'Logins', width: 70, sortable: true, align: 'center',
      render: (val) => Number(val).toLocaleString(),
    },
    {
      key: 'actions', title: '', width: 100,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" onClick={() => {
            const u = systemUsers.find(x => x.id === String(row.id))
            if (u) setUserDrawer(u)
          }}>View</Button>
          <Dropdown
            items={[
              { key: 'edit', label: 'Edit User' },
              { key: 'reset', label: 'Reset Password' },
              { key: 'suspend', label: row.status === 'suspended' ? 'Activate' : 'Suspend', danger: row.status !== 'suspended' },
              { key: 'delete', label: 'Delete User', danger: true },
            ]}
            onSelect={(key) => {
              if (key === 'edit') {
                const u = systemUsers.find(x => x.id === String(row.id))
                if (u) setEditModal(u)
              } else {
                notification.info(`${key}: ${row.name}`)
              }
            }}
          >
            <Button size="small">⋯</Button>
          </Dropdown>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search users..." value={search} onChange={setSearch} style={{ width: 240 }} />
        <div className="sc-toolbar-spacer" />
        {selected.length > 0 && (
          <>
            <Tag>{selected.length} selected</Tag>
            <Popconfirm title={`Suspend ${selected.length} users?`} onConfirm={() => {
              notification.success(`Suspended ${selected.length} users (mock)`)
              setSelected([])
            }}>
              <Button size="small">Bulk Suspend</Button>
            </Popconfirm>
            <Popconfirm title={`Delete ${selected.length} users?`} onConfirm={() => {
              notification.error(`Deleted ${selected.length} users (mock)`)
              setSelected([])
            }}>
              <Button size="small">Bulk Delete</Button>
            </Popconfirm>
          </>
        )}
        <Button type="primary" onClick={() => setCreateModal(true)}>+ Create User</Button>
      </div>
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys as string[]) }}
      />

      <Drawer
        open={!!userDrawer}
        onClose={() => setUserDrawer(null)}
        title={userDrawer?.name ?? ''}
        width={500}
      >
        {userDrawer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large">{userDrawer.avatar}</Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{userDrawer.name}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <Tag color={roleColors[userDrawer.role]}>{userDrawer.role}</Tag>
                  <Tag color={statusColors[userDrawer.status]}>{userDrawer.status}</Tag>
                </div>
              </div>
            </div>
            <Descriptions
              items={[
                { label: 'Email', children: userDrawer.email },
                { label: 'Department', children: userDrawer.department },
                { label: 'Last Login', children: userDrawer.lastLogin },
                { label: 'Created', children: userDrawer.createdAt },
                { label: 'Login Count', children: String(userDrawer.loginCount) },
                { label: '2FA Enabled', children: userDrawer.twoFactor ? 'Yes' : 'No' },
              ]}
              column={1}
              size="small"
            />
            <h4>Permissions ({roles.find(r => r.key === userDrawer.role)?.permissions.length ?? 0})</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {roles.find(r => r.key === userDrawer.role)?.permissions.map(p => (
                <Tag key={p} color="default" style={{ fontSize: 11 }}>{p}</Tag>
              ))}
            </div>
            <h4>Recent Activity</h4>
            {auditLog.filter(l => l.userId === userDrawer.id).slice(0, 5).map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--sg-color-border-secondary)', fontSize: 13 }}>
                <span>{l.action}</span>
                <span style={{ color: 'var(--sg-color-text-secondary)' }}>{l.timestamp}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Button type="primary" onClick={() => {
                setUserDrawer(null)
                setEditModal(userDrawer)
              }}>Edit</Button>
              <Button onClick={() => notification.info('Password reset email sent (mock)')}>Reset Password</Button>
              <Popconfirm title="Suspend this user?" onConfirm={() => {
                notification.warning(`${userDrawer.name} suspended (mock)`)
                setUserDrawer(null)
              }}>
                <Button>Suspend</Button>
              </Popconfirm>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={createModal}
        onClose={() => setCreateModal(false)}
        title="Create New User"
        footer={null}
        width={520}
      >
        <Form onFinish={(values) => {
          notification.success('User created (mock)', JSON.stringify(values, null, 2))
          setCreateModal(false)
        }}>
          <Field name="name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="John Doe" />
          </Field>
          <Field name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="john@company.io" />
          </Field>
          <Field name="department" label="Department" rules={[{ required: true }]}>
            <Select
              options={['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Support', 'Finance', 'HR'].map(d => ({ label: d, value: d }))}
              placeholder="Select department"
            />
          </Field>
          <Field name="role" label="Role" rules={[{ required: true }]}>
            <Select
              options={roles.map(r => ({ label: r.name, value: r.key }))}
              placeholder="Select role"
            />
          </Field>
          <Field name="twoFactor" label="Require 2FA">
            <Switch />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setCreateModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Create User</Button>
          </div>
        </Form>
      </Modal>

      <Modal
        open={!!editModal}
        onClose={() => setEditModal(null)}
        title={`Edit — ${editModal?.name ?? ''}`}
        footer={null}
        width={520}
      >
        {editModal && (
          <Form
            initialValues={{ name: editModal.name, email: editModal.email, department: editModal.department, role: editModal.role, status: editModal.status }}
            onFinish={(values) => {
              notification.success('User updated (mock)', JSON.stringify(values, null, 2))
              setEditModal(null)
            }}
          >
            <Field name="name" label="Full Name" rules={[{ required: true }]}>
              <Input />
            </Field>
            <Field name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Field>
            <Field name="department" label="Department">
              <Select
                options={['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Support', 'Finance', 'HR'].map(d => ({ label: d, value: d }))}
              />
            </Field>
            <Field name="role" label="Role">
              <Select options={roles.map(r => ({ label: r.name, value: r.key }))} />
            </Field>
            <Field name="status" label="Status">
              <Select
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Suspended', value: 'suspended' },
                  { label: 'Pending', value: 'pending' },
                  { label: 'Deactivated', value: 'deactivated' },
                ]}
              />
            </Field>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <Button onClick={() => setEditModal(null)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save Changes</Button>
            </div>
          </Form>
        )}
      </Modal>
    </>
  )
}

function AuditTab() {
  const [severityFilter, setSeverityFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    if (severityFilter === 'all') return auditLog
    return auditLog.filter(l => l.severity === severityFilter)
  }, [severityFilter])

  const tableData = useMemo(() => filtered.map(auditToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'severity', title: '', width: 40, align: 'center',
      render: (val) => (
        <Badge count={val === 'critical' ? '!' : val === 'warning' ? '⚠' : '·'}
          color={val === 'critical' ? 'red' : val === 'warning' ? 'orange' : 'gray'} />
      ),
    },
    { key: 'timestamp', title: 'Time', width: 160, sortable: true },
    {
      key: 'userName', title: 'User', width: 140, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'action', title: 'Action', width: 170, sortable: true,
      render: (val) => <code style={{ fontSize: 12, background: 'var(--sg-color-bg-secondary)', padding: '2px 6px', borderRadius: 3 }}>{String(val)}</code>,
    },
    { key: 'target', title: 'Target', width: 160 },
    {
      key: 'ip', title: 'IP Address', width: 130,
      render: (val) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{String(val)}</span>,
    },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Select
          value={severityFilter}
          onChange={setSeverityFilter}
          options={[
            { label: 'All Severity', value: 'all' },
            { label: 'Info', value: 'info' },
            { label: 'Warning', value: 'warning' },
            { label: 'Critical', value: 'critical' },
          ]}
          style={{ width: 160 }}
        />
        <div className="sc-toolbar-spacer" />
        <Button size="small" onClick={() => notification.info('Export audit log (mock)')}>Export CSV</Button>
      </div>
      <Table
        columns={columns}
        data={tableData}
        pageSize={12}
        size="small"
        expandable={{
          expandedRowRender: (row) => (
            <div style={{ padding: '8px 0', fontSize: 13 }}>
              <Descriptions
                items={[
                  { label: 'Details', children: String(row.details) },
                  { label: 'Severity', children: <Tag color={severityColors[String(row.severity)]}>{String(row.severity)}</Tag> },
                  { label: 'IP', children: String(row.ip) },
                  { label: 'Timestamp', children: String(row.timestamp) },
                ]}
                column={2}
                size="small"
              />
            </div>
          ),
        }}
      />
    </>
  )
}

function RolesTab() {
  const [editRole, setEditRole] = useState<RoleDefinition | null>(null)
  const [targetPerms, setTargetPerms] = useState<string[]>([])

  const permTransferSource = allPermissions.map(p => ({
    key: p,
    title: p.replace(/_/g, ' '),
    description: p,
  }))

  const openRoleEditor = (role: RoleDefinition) => {
    setEditRole(role)
    setTargetPerms(role.permissions)
  }

  return (
    <>
      <div className="sc-toolbar">
        <div className="sc-toolbar-spacer" />
        <Button type="primary" onClick={() => notification.info('Create role wizard (mock)')}>+ New Role</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {roles.map(role => (
          <div key={role.key} style={{
            border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8, padding: 20,
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{role.name}</span>
              <Tag color={roleColors[role.key as UserRole]}>{role.key}</Tag>
            </div>
            <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{role.description}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--sg-color-text-secondary)', marginTop: 4 }}>
              <span>{role.permissions.length} permissions</span>
              <span>{role.userCount} users</span>
            </div>
            <Progress percent={Math.round((role.permissions.length / allPermissions.length) * 100)} showInfo={false} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
              {role.permissions.slice(0, 4).map(p => (
                <Tag key={p} color="default" style={{ fontSize: 10 }}>{p.replace(/_/g, ' ')}</Tag>
              ))}
              {role.permissions.length > 4 && (
                <Tag color="default" style={{ fontSize: 10 }}>+{role.permissions.length - 4}</Tag>
              )}
            </div>
            <Button size="small" onClick={() => openRoleEditor(role)} style={{ marginTop: 4 }}>
              Edit Permissions
            </Button>
          </div>
        ))}
      </div>

      <Modal
        open={!!editRole}
        onClose={() => setEditRole(null)}
        title={`Edit Permissions — ${editRole?.name ?? ''}`}
        width={700}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => setEditRole(null)}>Cancel</Button>
            <Button type="primary" onClick={() => {
              notification.success(`Updated ${editRole?.name} with ${targetPerms.length} permissions (mock)`)
              setEditRole(null)
            }}>Save</Button>
          </div>
        }
      >
        {editRole && (
          <Transfer
            dataSource={permTransferSource}
            targetKeys={targetPerms}
            onChange={(keys) => setTargetPerms(keys)}
            titles={['Available', 'Granted']}
            showSearch
          />
        )}
      </Modal>
    </>
  )
}

function SettingsTab() {
  const [settings, setSettings] = useState(systemSettings)
  const categories = [...new Set(settings.map(s => s.category))]

  const updateSetting = (key: string, value: string | boolean | number) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s))
    notification.success(`Setting "${key}" updated (mock)`)
  }

  return (
    <Collapse
      defaultActiveKey={[categories[0]]}
      items={categories.map(cat => ({
        key: cat,
        label: <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{cat}</span>,
        children: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {settings.filter(s => s.category === cat).map(s => (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--sg-color-border-secondary)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{s.description}</div>
                </div>
                <div style={{ width: 220, flexShrink: 0 }}>
                  {s.type === 'toggle' && (
                    <Switch checked={s.value as boolean} onChange={(v) => updateSetting(s.key, v)} />
                  )}
                  {s.type === 'text' && (
                    <Input
                      value={s.value as string}
                      onChange={(v) => updateSetting(s.key, v)}
                      size="small"
                    />
                  )}
                  {s.type === 'number' && (
                    <InputNumber
                      value={s.value as number}
                      onChange={(v) => updateSetting(s.key, v ?? 0)}
                      size="small"
                      style={{ width: '100%' }}
                    />
                  )}
                  {s.type === 'select' && (
                    <Select
                      value={s.value as string}
                      onChange={(v) => updateSetting(s.key, v)}
                      options={(s.options ?? []).map(o => ({ label: o, value: o }))}
                      size="small"
                      style={{ width: '100%' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ),
      }))}
    />
  )
}

export function AdminApp() {
  const [activeTab, setActiveTab] = useState('users')

  const tabs: TabItem[] = [
    { key: 'users', label: 'Users', children: <UsersTab /> },
    { key: 'audit', label: 'Audit Log', children: <AuditTab /> },
    { key: 'roles', label: 'Access Control', children: <RolesTab /> },
    { key: 'settings', label: 'Settings', children: <SettingsTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
