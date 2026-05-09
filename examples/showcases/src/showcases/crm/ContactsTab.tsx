import { useState, useMemo } from 'react'
import {
  Table, Tag, Button, Modal, Popconfirm, Dropdown, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { contacts, activities, deals } from './data'
import type { Contact } from './data'
import {
  Toolbar, useFilteredList, money, statusColor, renderUserCell,
} from '../_shared'
import { ContactForm } from './ContactForm'
import { ContactDrawer } from './ContactDrawer'

export function ContactsTab() {
  const [search, setSearch] = useState('')
  const [drawerContact, setDrawerContact] = useState<Contact | null>(null)
  const [editContact, setEditContact] = useState<Contact | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useFilteredList(contacts, search, ['name', 'company', 'email'])

  const tableData = useMemo(
    () => filtered.map(c => ({ id: c.id, data: c as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Contact', width: 240, sortable: true, fixed: 'left' as const,
      render: (_, row) => <>{renderUserCell({
        name: String(row.name),
        email: String(row.email),
        avatar: String(row.avatar),
      })}</>,
    },
    { key: 'company', title: 'Company', width: 130, sortable: true },
    { key: 'phone', title: 'Phone', width: 150 },
    {
      key: 'status', title: 'Status', width: 110,
      filters: ['lead', 'customer', 'churned', 'prospect'].map(v => ({ text: v, value: v })),
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColor(String(val))}>{String(val)}</Tag>,
    },
    {
      key: 'revenue', title: 'Revenue', width: 130, sortable: true, align: 'right',
      filterMode: 'advanced' as const,
      advancedFilterType: 'number' as const,
      onFilter: (value, row) => Number(row.revenue) >= Number(value),
      render: (val) => {
        const n = Number(val)
        return <span style={{ fontWeight: n > 100000 ? 600 : 400 }}>{money(n)}</span>
      },
      aggregate: 'sum' as const,
    },
    { key: 'lastContact', title: 'Last Contact', width: 120, sortable: true },
    {
      key: 'actions', title: '', width: 120,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" onClick={() => {
            const c = contacts.find(x => x.id === String(row.id))
            if (c) setDrawerContact(c)
          }}>View</Button>
          <Dropdown
            items={[
              { key: 'edit', label: 'Edit' },
              { key: 'email', label: 'Send Email' },
              { key: 'deal', label: 'Create Deal' },
              { key: 'delete', label: 'Delete', danger: true },
            ]}
            onSelect={(key) => {
              if (key === 'edit') {
                const c = contacts.find(x => x.id === String(row.id))
                if (c) setEditContact(c)
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

  const drawerActivities = drawerContact ? activities.filter(a => a.contactId === drawerContact.id) : []
  const drawerDeals = drawerContact ? deals.filter(d => d.contactId === drawerContact.id) : []

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search contacts…' }}
        actions={
          <>
            {selected.length > 0 && (
              <>
                <Tag>{selected.length} selected</Tag>
                <Popconfirm title={`Send bulk email to ${selected.length} contacts?`} onConfirm={() => {
                  notification.success(`Email sent to ${selected.length} contacts (mock)`)
                  setSelected([])
                }}>
                  <Button size="small">Bulk Email</Button>
                </Popconfirm>
                <Popconfirm title={`Delete ${selected.length} contacts?`} onConfirm={() => {
                  notification.error(`Deleted ${selected.length} contacts (mock)`)
                  setSelected([])
                }}>
                  <Button size="small">Bulk Delete</Button>
                </Popconfirm>
              </>
            )}
            <Button type="primary" onClick={() => setCreateOpen(true)}>+ Add Contact</Button>
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
          { key: 'company', label: 'Company' },
          { key: 'status', label: 'Status' },
        ]}
        rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys as string[]) }}
        summary={(rows) => {
          const total = rows.reduce((s, r) => s + (Number(r.data.revenue) || 0), 0)
          return [[
            { content: `${rows.length} contacts` },
            { content: '' }, { content: '' }, { content: '' },
            { content: money(total), align: 'right' as const },
            { content: '' }, { content: '' },
          ]]
        }}
      />

      <ContactDrawer
        contact={drawerContact}
        onClose={() => setDrawerContact(null)}
        onEdit={() => { if (drawerContact) { setEditContact(drawerContact); setDrawerContact(null) } }}
        activities={drawerActivities}
        deals={drawerDeals}
      />

      <Modal
        open={!!editContact}
        onClose={() => setEditContact(null)}
        title={`Edit — ${editContact?.name ?? ''}`}
        footer={null}
        width={520}
      >
        {editContact && (
          <ContactForm
            initialValues={editContact}
            onSubmit={(values) => {
              notification.success('Contact updated (mock)', JSON.stringify(values, null, 2))
              setEditContact(null)
            }}
            onCancel={() => setEditContact(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add Contact"
        footer={null}
        width={520}
      >
        <ContactForm
          onSubmit={(values) => {
            notification.success('Contact created (mock)', JSON.stringify(values, null, 2))
            setCreateOpen(false)
          }}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create"
        />
      </Modal>
    </>
  )
}
