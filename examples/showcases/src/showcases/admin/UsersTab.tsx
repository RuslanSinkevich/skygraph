import { useState, useMemo } from 'react'
import {
  Table, Tag, Button, Avatar, Modal, Drawer, Descriptions,
  Popconfirm, Dropdown, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { systemUsers, userToRow, auditLog, roles } from './data'
import type { SystemUser, UserRole, UserStatus } from './data'
import { Toolbar, useFilteredList, num } from '../_shared'
import { roleColors, statusColors } from './common'
import { UserForm } from './UserForm'

export function UsersTab() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [drawerUser, setDrawerUser] = useState<SystemUser | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [editUser, setEditUser] = useState<SystemUser | null>(null)

  const filtered = useFilteredList(systemUsers, search, ['name', 'email', 'department'])
  const tableData = useMemo(() => filtered.map(userToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'User', width: 240, sortable: true, fixed: 'left' as const,
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
      render: (val) => val
        ? <span style={{ color: 'var(--sg-color-success)' }}>✓</span>
        : <span style={{ color: 'var(--sg-color-text-secondary)' }}>—</span>,
    },
    { key: 'lastLogin', title: 'Last Login', width: 150, sortable: true },
    {
      key: 'loginCount', title: 'Logins', width: 90, sortable: true, align: 'center',
      filterMode: 'advanced' as const,
      advancedFilterType: 'number' as const,
      onFilter: (value, row) => Number(row.loginCount) >= Number(value),
      render: (val) => num(Number(val)),
      aggregate: 'sum' as const,
    },
    {
      key: 'actions', title: '', width: 100,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" onClick={() => {
            const u = systemUsers.find(x => x.id === String(row.id))
            if (u) setDrawerUser(u)
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
                if (u) setEditUser(u)
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
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search users…' }}
        actions={
          <>
            {selected.length > 0 && (
              <>
                <Tag>{selected.length} selected</Tag>
                <Popconfirm title={`Suspend ${selected.length} users?`} onConfirm={() => {
                  notification.success(`Suspended ${selected.length} users (mock)`)
                  setSelected([])
                }}>
                  <Button size="small">Bulk Suspend</Button>
                </Popconfirm>
              </>
            )}
            <Button type="primary" onClick={() => setCreateOpen(true)}>+ Create User</Button>
          </>
        }
      />
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        bordered
        sticky
        columnPinning
        densityToggle
        groupByOptions={[
          { key: 'role', label: 'Role' },
          { key: 'department', label: 'Department' },
          { key: 'status', label: 'Status' },
        ]}
        rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys as string[]) }}
      />

      <Drawer open={!!drawerUser} onClose={() => setDrawerUser(null)} title={drawerUser?.name ?? ''} width={500}>
        {drawerUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large">{drawerUser.avatar}</Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{drawerUser.name}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <Tag color={roleColors[drawerUser.role]}>{drawerUser.role}</Tag>
                  <Tag color={statusColors[drawerUser.status]}>{drawerUser.status}</Tag>
                </div>
              </div>
            </div>
            <Descriptions
              items={[
                { label: 'Email', children: drawerUser.email },
                { label: 'Department', children: drawerUser.department },
                { label: 'Last Login', children: drawerUser.lastLogin },
                { label: 'Created', children: drawerUser.createdAt },
                { label: 'Login Count', children: String(drawerUser.loginCount) },
                { label: '2FA Enabled', children: drawerUser.twoFactor ? 'Yes' : 'No' },
              ]}
              column={1}
              size="small"
            />
            <h4>Permissions ({roles.find(r => r.key === drawerUser.role)?.permissions.length ?? 0})</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {roles.find(r => r.key === drawerUser.role)?.permissions.map(p => (
                <Tag key={p} color="default" style={{ fontSize: 11 }}>{p}</Tag>
              ))}
            </div>
            <h4>Recent Activity</h4>
            {auditLog.filter(l => l.userId === drawerUser.id).slice(0, 5).map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--sg-color-border-secondary)', fontSize: 13 }}>
                <span>{l.action}</span>
                <span style={{ color: 'var(--sg-color-text-secondary)' }}>{l.timestamp}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Button type="primary" onClick={() => {
                setDrawerUser(null)
                setEditUser(drawerUser)
              }}>Edit</Button>
              <Button onClick={() => notification.info('Password reset email sent (mock)')}>Reset Password</Button>
              <Popconfirm title="Suspend this user?" onConfirm={() => {
                notification.warning(`${drawerUser.name} suspended (mock)`)
                setDrawerUser(null)
              }}>
                <Button>Suspend</Button>
              </Popconfirm>
            </div>
          </div>
        )}
      </Drawer>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create New User" footer={null} width={520}>
        <UserForm
          onSubmit={(values) => {
            notification.success('User created (mock)', JSON.stringify(values, null, 2))
            setCreateOpen(false)
          }}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create User"
        />
      </Modal>

      <Modal open={!!editUser} onClose={() => setEditUser(null)} title={`Edit — ${editUser?.name ?? ''}`} footer={null} width={520}>
        {editUser && (
          <UserForm
            initialValues={editUser}
            showStatus
            onSubmit={(values) => {
              notification.success('User updated (mock)', JSON.stringify(values, null, 2))
              setEditUser(null)
            }}
            onCancel={() => setEditUser(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>
    </>
  )
}
