import { useState } from 'react'
import {
  Tag, Button, Modal, Progress, Transfer, notification,
} from '@skygraph/react'
import { roles, allPermissions } from './data'
import type { RoleDefinition, UserRole } from './data'
import { Toolbar } from '../_shared'
import { roleColors } from './common'

export function RolesTab() {
  const [editRole, setEditRole] = useState<RoleDefinition | null>(null)
  const [targetPerms, setTargetPerms] = useState<string[]>([])

  const transferSource = allPermissions.map(p => ({
    key: p,
    title: p.replace(/_/g, ' '),
    description: p,
  }))

  const open = (r: RoleDefinition) => {
    setEditRole(r)
    setTargetPerms(r.permissions)
  }

  return (
    <>
      <Toolbar
        actions={<Button type="primary" onClick={() => notification.info('Create role wizard (mock)')}>+ New Role</Button>}
      />
      <div className="sc-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {roles.map(role => (
          <div key={role.key} className="sc-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{role.name}</span>
              <Tag color={roleColors[role.key as UserRole]}>{role.key}</Tag>
            </div>
            <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{role.description}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
              <span>{role.permissions.length} permissions</span>
              <span>{role.userCount} users</span>
            </div>
            <Progress percent={Math.round((role.permissions.length / allPermissions.length) * 100)} showInfo={false} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {role.permissions.slice(0, 4).map(p => (
                <Tag key={p} color="default" style={{ fontSize: 10 }}>{p.replace(/_/g, ' ')}</Tag>
              ))}
              {role.permissions.length > 4 && (
                <Tag color="default" style={{ fontSize: 10 }}>+{role.permissions.length - 4}</Tag>
              )}
            </div>
            <Button size="small" onClick={() => open(role)}>Edit Permissions</Button>
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
            dataSource={transferSource}
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
