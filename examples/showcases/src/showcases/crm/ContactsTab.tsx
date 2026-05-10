import { useState, useMemo } from 'react'
import { Table, Tag, Button, Modal, Popconfirm, Dropdown, notification } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { contacts, activities, deals } from './data'
import type { Contact } from './data'
import {
  Toolbar,
  useFilteredList,
  money,
  statusColor,
  renderUserCell,
  useAppLocale,
} from '../_shared'
import { ContactForm } from './ContactForm'
import { ContactDrawer } from './ContactDrawer'

export function ContactsTab() {
  const lc = useAppLocale('crm')
  const c = lc.contacts
  const [search, setSearch] = useState('')
  const [drawerContact, setDrawerContact] = useState<Contact | null>(null)
  const [editContact, setEditContact] = useState<Contact | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useFilteredList(contacts, search, ['name', 'company', 'email'])

  const tableData = useMemo(
    () => filtered.map((ct) => ({ id: ct.id, data: ct as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: c.columns.contact,
      width: 240,
      sortable: true,
      fixed: 'left' as const,
      render: (_, row) => (
        <>
          {renderUserCell({
            name: String(row.name),
            email: String(row.email),
            avatar: String(row.avatar),
          })}
        </>
      ),
    },
    { key: 'company', title: c.columns.company, width: 130, sortable: true },
    { key: 'phone', title: c.columns.phone, width: 150 },
    {
      key: 'status',
      title: c.columns.status,
      width: 110,
      filters: ['lead', 'customer', 'churned', 'prospect'].map((v) => ({
        text: lc.statusLabel[v] ?? v,
        value: v,
      })),
      onFilter: (value, row) => row.status === value,
      render: (val) => (
        <Tag color={statusColor(String(val))}>{lc.statusLabel[String(val)] ?? String(val)}</Tag>
      ),
    },
    {
      key: 'revenue',
      title: c.columns.revenue,
      width: 130,
      sortable: true,
      align: 'right',
      filterMode: 'advanced' as const,
      advancedFilterType: 'number' as const,
      onFilter: (value, row) => Number(row.revenue) >= Number(value),
      render: (val) => {
        const n = Number(val)
        return <span style={{ fontWeight: n > 100000 ? 600 : 400 }}>{money(n)}</span>
      },
      aggregate: 'sum' as const,
    },
    { key: 'lastContact', title: c.columns.lastContact, width: 120, sortable: true },
    {
      key: 'actions',
      title: '',
      width: 120,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button
            size="small"
            onClick={() => {
              const ct = contacts.find((x) => x.id === String(row.id))
              if (ct) setDrawerContact(ct)
            }}
          >
            {lc.leads.viewBtn}
          </Button>
          <Dropdown
            items={[
              { key: 'edit', label: c.rowActions.edit },
              { key: 'email', label: c.rowActions.sendEmail },
              { key: 'deal', label: c.rowActions.createDeal },
              { key: 'delete', label: c.rowActions.delete, danger: true },
            ]}
            onSelect={(key) => {
              if (key === 'edit') {
                const ct = contacts.find((x) => x.id === String(row.id))
                if (ct) setEditContact(ct)
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

  const drawerActivities = drawerContact
    ? activities.filter((a) => a.contactId === drawerContact.id)
    : []
  const drawerDeals = drawerContact ? deals.filter((d) => d.contactId === drawerContact.id) : []

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: c.searchPlaceholder }}
        actions={
          <>
            {selected.length > 0 && (
              <>
                <Tag>{c.selectedTag(selected.length)}</Tag>
                <Popconfirm
                  title={c.bulkEmailConfirm(selected.length)}
                  onConfirm={() => {
                    notification.success(c.bulkEmailToast(selected.length))
                    setSelected([])
                  }}
                >
                  <Button size="small">{c.bulkEmail}</Button>
                </Popconfirm>
                <Popconfirm
                  title={c.bulkDeleteConfirm(selected.length)}
                  onConfirm={() => {
                    notification.error(c.bulkDeleteToast(selected.length))
                    setSelected([])
                  }}
                >
                  <Button size="small">{c.bulkDelete}</Button>
                </Popconfirm>
              </>
            )}
            <Button type="primary" onClick={() => setCreateOpen(true)}>
              {c.addContact}
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
          { key: 'company', label: c.groupByCompany },
          { key: 'status', label: c.groupByStatus },
        ]}
        rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys as string[]) }}
        summary={(rows) => {
          const total = rows.reduce((s, r) => s + (Number(r.data.revenue) || 0), 0)
          return [
            [
              { content: c.summaryContacts(rows.length) },
              { content: '' },
              { content: '' },
              { content: '' },
              { content: money(total), align: 'right' as const },
              { content: '' },
              { content: '' },
            ],
          ]
        }}
      />

      <ContactDrawer
        contact={drawerContact}
        onClose={() => setDrawerContact(null)}
        onEdit={() => {
          if (drawerContact) {
            setEditContact(drawerContact)
            setDrawerContact(null)
          }
        }}
        activities={drawerActivities}
        deals={drawerDeals}
      />

      <Modal
        open={!!editContact}
        onClose={() => setEditContact(null)}
        title={c.editTitle(editContact?.name ?? '')}
        footer={null}
        width={520}
      >
        {editContact && (
          <ContactForm
            initialValues={editContact}
            onSubmit={(values) => {
              notification.success(c.updatedToast, JSON.stringify(values, null, 2))
              setEditContact(null)
            }}
            onCancel={() => setEditContact(null)}
            submitLabel={c.submitSave}
          />
        )}
      </Modal>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title={c.addContactTitle}
        footer={null}
        width={520}
      >
        <ContactForm
          onSubmit={(values) => {
            notification.success(c.createdToast, JSON.stringify(values, null, 2))
            setCreateOpen(false)
          }}
          onCancel={() => setCreateOpen(false)}
          submitLabel={c.submitCreate}
        />
      </Modal>
    </>
  )
}
