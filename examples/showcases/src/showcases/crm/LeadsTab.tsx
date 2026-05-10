import { useState, useMemo } from 'react'
import {
  Table,
  Tag,
  Button,
  Modal,
  Dropdown,
  Segmented,
  Progress,
  notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { contacts as initialContacts, activities, deals } from './data'
import type { Contact, ContactStatus } from './data'
import {
  Toolbar,
  useFilteredList,
  money,
  statusColor,
  renderUserCell,
  shortDate,
  useAppLocale,
} from '../_shared'
import { ContactForm } from './ContactForm'
import { ContactDrawer } from './ContactDrawer'

type LeadFilter = 'all' | 'lead' | 'prospect'

export function LeadsTab() {
  const lc = useAppLocale('crm')
  const ld = lc.leads
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<LeadFilter>('all')
  const [drawerContact, setDrawerContact] = useState<Contact | null>(null)
  const [editContact, setEditContact] = useState<Contact | null>(null)
  const [convertContact, setConvertContact] = useState<Contact | null>(null)

  const leads = useMemo(
    () => initialContacts.filter((c) => c.status === 'lead' || c.status === 'prospect'),
    [],
  )

  const visible = useMemo(() => {
    return leads.filter((c) => filter === 'all' || c.status === (filter as ContactStatus))
  }, [leads, filter])

  const filtered = useFilteredList(visible, search, ['name', 'company', 'email'])

  const tableData = useMemo(
    () => filtered.map((c) => ({ id: c.id, data: c as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: ld.columns.lead,
      width: 240,
      sortable: true,
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
    { key: 'company', title: ld.columns.company, width: 140, sortable: true },
    {
      key: 'status',
      title: ld.columns.stage,
      width: 110,
      render: (val) => (
        <Tag color={statusColor(String(val))}>{lc.statusLabel[String(val)] ?? String(val)}</Tag>
      ),
    },
    {
      key: 'revenue',
      title: ld.columns.potential,
      width: 120,
      sortable: true,
      align: 'right',
      render: (val) => money(Number(val)),
    },
    {
      key: 'lastContact',
      title: ld.columns.lastContact,
      width: 120,
      sortable: true,
      render: (val) => shortDate(String(val)),
    },
    {
      key: 'actions',
      title: '',
      width: 150,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button
            size="small"
            onClick={() => {
              const c = initialContacts.find((x) => x.id === String(row.id))
              if (c) setDrawerContact(c)
            }}
          >
            {ld.viewBtn}
          </Button>
          <Dropdown
            items={[
              { key: 'edit', label: ld.rowActions.edit },
              { key: 'convert', label: ld.rowActions.convert },
              { key: 'email', label: ld.rowActions.sendEmail },
            ]}
            onSelect={(key) => {
              const c = initialContacts.find((x) => x.id === String(row.id))
              if (!c) return
              if (key === 'edit') setEditContact(c)
              else if (key === 'convert') setConvertContact(c)
              else notification.info(`${key}: ${c.name}`)
            }}
          >
            <Button size="small">⋯</Button>
          </Dropdown>
        </div>
      ),
    },
  ]

  const conversionRate = leads.length
    ? Math.round((leads.filter((c) => c.status === 'prospect').length / leads.length) * 100)
    : 0

  const drawerActivities = drawerContact
    ? activities.filter((a) => a.contactId === drawerContact.id)
    : []
  const drawerDeals = drawerContact ? deals.filter((d) => d.contactId === drawerContact.id) : []

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div className="lead-card">
          <div className="lead-card-label">{ld.cards.total}</div>
          <div className="lead-card-value">{leads.length}</div>
        </div>
        <div className="lead-card">
          <div className="lead-card-label">{ld.cards.newLeads}</div>
          <div className="lead-card-value">{leads.filter((c) => c.status === 'lead').length}</div>
        </div>
        <div className="lead-card">
          <div className="lead-card-label">{ld.cards.qualified}</div>
          <div className="lead-card-value">
            {leads.filter((c) => c.status === 'prospect').length}
          </div>
        </div>
        <div className="lead-card">
          <div className="lead-card-label">{ld.cards.conversion}</div>
          <Progress percent={conversionRate} size="small" />
        </div>
      </div>

      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: ld.searchPlaceholder }}
        filters={
          <Segmented
            value={filter}
            onChange={(v) => setFilter(v as LeadFilter)}
            options={[
              { label: ld.filterAll(leads.length), value: 'all' },
              { label: ld.filterLeads, value: 'lead' },
              { label: ld.filterProspects, value: 'prospect' },
            ]}
          />
        }
        actions={
          <Button
            type="primary"
            onClick={() =>
              setEditContact({
                id: `new-${Date.now()}`,
                name: '',
                email: '',
                company: '',
                phone: '',
                status: 'lead',
                revenue: 0,
                lastContact: shortDate(new Date()),
                avatar: '?',
              } as Contact)
            }
          >
            {ld.addLead}
          </Button>
        }
      />
      <Table columns={columns} data={tableData} pageSize={10} size="small" striped />

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
        title={editContact?.name ? ld.editTitle(editContact.name) : ld.addLeadTitle}
        footer={null}
        width={520}
      >
        {editContact && (
          <ContactForm
            initialValues={editContact}
            onSubmit={(values) => {
              notification.success(ld.savedToast, JSON.stringify(values, null, 2))
              setEditContact(null)
            }}
            onCancel={() => setEditContact(null)}
          />
        )}
      </Modal>

      <Modal
        open={!!convertContact}
        onClose={() => setConvertContact(null)}
        title={ld.convertTitle(convertContact?.name ?? '')}
        onOk={() => {
          notification.success(ld.convertedToast(convertContact?.name ?? ''))
          setConvertContact(null)
        }}
        okText={ld.convertOk}
      >
        <p>{ld.convertText}</p>
      </Modal>

      <style>{leadsStyles}</style>
    </>
  )
}

const leadsStyles = `
.lead-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  padding: 12px 14px;
  background: var(--sg-color-bg-container);
}
.lead-card-label {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
  margin-bottom: 4px;
}
.lead-card-value {
  font-size: 22px;
  font-weight: 600;
}
`
