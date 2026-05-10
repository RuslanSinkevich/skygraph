import { useState, useMemo } from 'react'
import {
  Table,
  Tag,
  Button,
  Avatar,
  Modal,
  Drawer,
  Descriptions,
  Popconfirm,
  Dropdown,
  notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { systemUsers, userToRow, auditLog, roles } from './data'
import type { SystemUser, UserRole, UserStatus } from './data'
import { Toolbar, useFilteredList, num, useAppLocale } from '../_shared'
import { roleColors, statusColors } from './common'
import { UserForm } from './UserForm'

export function UsersTab() {
  const lc = useAppLocale('admin')
  const u = lc.users
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [drawerUser, setDrawerUser] = useState<SystemUser | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [editUser, setEditUser] = useState<SystemUser | null>(null)

  const filtered = useFilteredList(systemUsers, search, ['name', 'email', 'department'])
  const tableData = useMemo(() => filtered.map(userToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: u.columns.user,
      width: 240,
      sortable: true,
      fixed: 'left' as const,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small">{String(row.avatar)}</Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{String(row.name)}</div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
              {String(row.email)}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      title: u.columns.role,
      width: 110,
      sortable: true,
      filters: (['admin', 'editor', 'viewer', 'moderator', 'support'] as UserRole[]).map((r) => ({
        text: lc.roleLabel[r] ?? r,
        value: r,
      })),
      onFilter: (value, row) => row.role === value,
      render: (val) => (
        <Tag color={roleColors[val as UserRole]}>{lc.roleLabel[String(val)] ?? String(val)}</Tag>
      ),
    },
    {
      key: 'status',
      title: u.columns.status,
      width: 110,
      filters: (['active', 'suspended', 'pending', 'deactivated'] as UserStatus[]).map((s) => ({
        text: lc.statusLabel[s] ?? s,
        value: s,
      })),
      onFilter: (value, row) => row.status === value,
      render: (val) => (
        <Tag color={statusColors[val as UserStatus]}>
          {lc.statusLabel[String(val)] ?? String(val)}
        </Tag>
      ),
    },
    { key: 'department', title: u.columns.department, width: 120, sortable: true },
    {
      key: 'twoFactor',
      title: u.columns.twoFa,
      width: 60,
      align: 'center',
      render: (val) =>
        val ? (
          <span style={{ color: 'var(--sg-color-success)' }}>✓</span>
        ) : (
          <span style={{ color: 'var(--sg-color-text-secondary)' }}>—</span>
        ),
    },
    { key: 'lastLogin', title: u.columns.lastLogin, width: 150, sortable: true },
    {
      key: 'loginCount',
      title: u.columns.logins,
      width: 90,
      sortable: true,
      align: 'center',
      filterMode: 'advanced' as const,
      advancedFilterType: 'number' as const,
      onFilter: (value, row) => Number(row.loginCount) >= Number(value),
      render: (val) => num(Number(val)),
      aggregate: 'sum' as const,
    },
    {
      key: 'actions',
      title: '',
      width: 100,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button
            size="small"
            onClick={() => {
              const usr = systemUsers.find((x) => x.id === String(row.id))
              if (usr) setDrawerUser(usr)
            }}
          >
            {u.viewBtn}
          </Button>
          <Dropdown
            items={[
              { key: 'edit', label: u.rowMenu.edit },
              { key: 'reset', label: u.rowMenu.reset },
              {
                key: 'suspend',
                label: row.status === 'suspended' ? u.rowMenu.activate : u.rowMenu.suspend,
                danger: row.status !== 'suspended',
              },
              { key: 'delete', label: u.rowMenu.delete, danger: true },
            ]}
            onSelect={(key) => {
              if (key === 'edit') {
                const usr = systemUsers.find((x) => x.id === String(row.id))
                if (usr) setEditUser(usr)
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
        search={{ value: search, onChange: setSearch, placeholder: u.searchPlaceholder }}
        actions={
          <>
            {selected.length > 0 && (
              <>
                <Tag>{u.selectedTag(selected.length)}</Tag>
                <Popconfirm
                  title={u.bulkSuspendConfirm(selected.length)}
                  onConfirm={() => {
                    notification.success(u.bulkSuspendToast(selected.length))
                    setSelected([])
                  }}
                >
                  <Button size="small">{u.bulkSuspend}</Button>
                </Popconfirm>
              </>
            )}
            <Button type="primary" onClick={() => setCreateOpen(true)}>
              {u.createBtn}
            </Button>
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
          { key: 'role', label: u.groupBy.role },
          { key: 'department', label: u.groupBy.department },
          { key: 'status', label: u.groupBy.status },
        ]}
        rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys as string[]) }}
      />

      <Drawer
        open={!!drawerUser}
        onClose={() => setDrawerUser(null)}
        title={drawerUser?.name ?? ''}
        width={500}
      >
        {drawerUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large">{drawerUser.avatar}</Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{drawerUser.name}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <Tag color={roleColors[drawerUser.role]}>
                    {lc.roleLabel[drawerUser.role] ?? drawerUser.role}
                  </Tag>
                  <Tag color={statusColors[drawerUser.status]}>
                    {lc.statusLabel[drawerUser.status] ?? drawerUser.status}
                  </Tag>
                </div>
              </div>
            </div>
            <Descriptions
              items={[
                { label: u.drawer.email, children: drawerUser.email },
                { label: u.drawer.department, children: drawerUser.department },
                { label: u.drawer.lastLogin, children: drawerUser.lastLogin },
                { label: u.drawer.created, children: drawerUser.createdAt },
                { label: u.drawer.loginCount, children: String(drawerUser.loginCount) },
                {
                  label: u.drawer.twoFaEnabled,
                  children: drawerUser.twoFactor ? u.drawer.yes : u.drawer.no,
                },
              ]}
              column={1}
              size="small"
            />
            <h4>
              {u.drawer.permissionsHeading(
                roles.find((r) => r.key === drawerUser.role)?.permissions.length ?? 0,
              )}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {roles
                .find((r) => r.key === drawerUser.role)
                ?.permissions.map((p) => (
                  <Tag key={p} color="default" style={{ fontSize: 11 }}>
                    {p}
                  </Tag>
                ))}
            </div>
            <h4>{u.drawer.activityHeading}</h4>
            {auditLog
              .filter((lg) => lg.userId === drawerUser.id)
              .slice(0, 5)
              .map((lg) => (
                <div
                  key={lg.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '4px 0',
                    borderBottom: '1px solid var(--sg-color-border-secondary)',
                    fontSize: 13,
                  }}
                >
                  <span>{lg.action}</span>
                  <span style={{ color: 'var(--sg-color-text-secondary)' }}>{lg.timestamp}</span>
                </div>
              ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Button
                type="primary"
                onClick={() => {
                  setDrawerUser(null)
                  setEditUser(drawerUser)
                }}
              >
                {u.drawer.edit}
              </Button>
              <Button onClick={() => notification.info(u.drawer.resetSentToast)}>
                {u.drawer.resetPassword}
              </Button>
              <Popconfirm
                title={u.drawer.suspendConfirm}
                onConfirm={() => {
                  notification.warning(u.drawer.suspendedToast(drawerUser.name))
                  setDrawerUser(null)
                }}
              >
                <Button>{u.drawer.suspend}</Button>
              </Popconfirm>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title={u.createTitle}
        footer={null}
        width={520}
      >
        <UserForm
          onSubmit={(values) => {
            notification.success(u.createToast, JSON.stringify(values, null, 2))
            setCreateOpen(false)
          }}
          onCancel={() => setCreateOpen(false)}
          submitLabel={u.submitCreate}
        />
      </Modal>

      <Modal
        open={!!editUser}
        onClose={() => setEditUser(null)}
        title={u.editTitle(editUser?.name ?? '')}
        footer={null}
        width={520}
      >
        {editUser && (
          <UserForm
            initialValues={editUser}
            showStatus
            onSubmit={(values) => {
              notification.success(u.editToast, JSON.stringify(values, null, 2))
              setEditUser(null)
            }}
            onCancel={() => setEditUser(null)}
            submitLabel={u.submitSave}
          />
        )}
      </Modal>
    </>
  )
}
