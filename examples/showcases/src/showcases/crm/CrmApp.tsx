import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Badge, Avatar, Timeline, Drawer, Button, Input,
  Progress, Form, Field, Select, Descriptions, notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { contacts, deals, activities, pipelineStats, toTableRow } from './data'
import type { Contact, ContactStatus } from './data'

const statusColors: Record<ContactStatus, string> = {
  lead: 'processing',
  customer: 'success',
  churned: 'error',
  prospect: 'warning',
}

const stageLabels: Record<string, string> = {
  qualification: 'Qualification',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  'closed-won': 'Closed Won',
  'closed-lost': 'Closed Lost',
}

function StatsRow() {
  const totalRevenue = contacts.reduce((s, c) => s + c.revenue, 0)
  const totalDeals = deals.reduce((s, d) => s + d.value, 0)
  const wonDeals = pipelineStats['closed-won']
  const wonValue = wonDeals.reduce((s, d) => s + d.value, 0)
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-card-label">Total Contacts</div>
        <div className="stat-card-value">{contacts.length}</div>
        <div className="stat-card-sub">{contacts.filter(c => c.status === 'customer').length} customers</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Pipeline Value</div>
        <div className="stat-card-value">${(totalDeals / 1000).toFixed(0)}k</div>
        <div className="stat-card-sub">{deals.length} active deals</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Won Revenue</div>
        <div className="stat-card-value">${(wonValue / 1000).toFixed(0)}k</div>
        <div className="stat-card-sub">{wonDeals.length} deals closed</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Total Revenue</div>
        <div className="stat-card-value">${(totalRevenue / 1000).toFixed(0)}k</div>
        <div className="stat-card-sub">lifetime value</div>
      </div>
    </div>
  )
}

function ContactsTab() {
  const [search, setSearch] = useState('')
  const [drawerContact, setDrawerContact] = useState<Contact | null>(null)

  const filtered = useMemo(() => {
    if (!search) return contacts
    const q = search.toLowerCase()
    return contacts.filter(c => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q))
  }, [search])

  const tableData = useMemo(() => filtered.map(toTableRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Contact',
      width: 240,
      sortable: true,
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
    { key: 'company', title: 'Company', width: 140, sortable: true },
    {
      key: 'status',
      title: 'Status',
      width: 110,
      filters: [
        { text: 'Lead', value: 'lead' },
        { text: 'Customer', value: 'customer' },
        { text: 'Churned', value: 'churned' },
        { text: 'Prospect', value: 'prospect' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColors[val as ContactStatus]}>{String(val)}</Tag>,
    },
    {
      key: 'revenue',
      title: 'Revenue',
      width: 120,
      sortable: true,
      align: 'right',
      render: (val) => `$${Number(val).toLocaleString()}`,
    },
    { key: 'lastContact', title: 'Last Contact', width: 120, sortable: true },
    {
      key: 'actions',
      title: '',
      width: 80,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const c = contacts.find(x => x.id === String(row.id))
          if (c) setDrawerContact(c)
        }}>View</Button>
      ),
    },
  ]

  const contactActivities = drawerContact
    ? activities.filter(a => a.contactId === drawerContact.id)
    : []

  const contactDeals = drawerContact
    ? deals.filter(d => d.contactId === drawerContact.id)
    : []

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search contacts..." value={search} onChange={setSearch} style={{ width: 240 }} />
        <div className="sc-toolbar-spacer" />
        <Button type="primary" onClick={() => notification.success('Contact created (mock)')}>
          + Add Contact
        </Button>
      </div>
      <Table columns={columns} data={tableData} pageSize={10} size="small" />

      <Drawer
        open={!!drawerContact}
        onClose={() => setDrawerContact(null)}
        title={drawerContact?.name ?? ''}
        width={480}
      >
        {drawerContact && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large">{drawerContact.avatar}</Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{drawerContact.name}</div>
                <Tag color={statusColors[drawerContact.status]}>{drawerContact.status}</Tag>
              </div>
            </div>
            <Descriptions
              items={[
                { label: 'Email', children: drawerContact.email },
                { label: 'Phone', children: drawerContact.phone },
                { label: 'Company', children: drawerContact.company },
                { label: 'Revenue', children: `$${drawerContact.revenue.toLocaleString()}` },
                { label: 'Last Contact', children: drawerContact.lastContact },
              ]}
              column={1}
              size="small"
            />
            {contactDeals.length > 0 && (
              <>
                <h4>Deals ({contactDeals.length})</h4>
                {contactDeals.map(d => (
                  <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--sg-color-border-secondary)' }}>
                    <span style={{ fontSize: 13 }}>{d.title}</span>
                    <Tag>{stageLabels[d.stage]}</Tag>
                  </div>
                ))}
              </>
            )}
            <h4>Activity</h4>
            <Timeline
              items={contactActivities.slice(0, 8).map(a => ({
                children: (
                  <div>
                    <div style={{ fontSize: 13 }}>{a.description}</div>
                    <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)' }}>
                      {a.type} — {a.date}
                    </div>
                  </div>
                ),
                color: a.type === 'call' ? 'blue' : a.type === 'email' ? 'green' : a.type === 'meeting' ? 'orange' : 'gray',
              }))}
            />
          </div>
        )}
      </Drawer>
    </>
  )
}

function DealsTab() {
  const stages = ['qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'] as const
  return (
    <div>
      {stages.map(stage => {
        const stageDeals = pipelineStats[stage]
        const total = stageDeals.reduce((s, d) => s + d.value, 0)
        return (
          <div key={stage} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Badge count={stageDeals.length} />
              <span style={{ fontWeight: 600 }}>{stageLabels[stage]}</span>
              <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                — ${(total / 1000).toFixed(0)}k
              </span>
            </div>
            <Progress
              percent={Math.round((stageDeals.length / Math.max(deals.length, 1)) * 100)}
              status={stage === 'closed-won' ? 'success' : stage === 'closed-lost' ? 'error' : 'active'}
            />
            {stageDeals.map(d => {
              const contact = contacts.find(c => c.id === d.contactId)
              return (
                <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                  <span>{d.title}</span>
                  <span style={{ color: 'var(--sg-color-text-secondary)' }}>
                    ${d.value.toLocaleString()} · {contact?.name}
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

function ActivityTab() {
  const typeIcons: Record<string, string> = { call: '📞', email: '📧', meeting: '🤝', note: '📝' }
  return (
    <Timeline
      items={activities.slice(0, 30).map(a => {
        const contact = contacts.find(c => c.id === a.contactId)
        return {
          children: (
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>
                {typeIcons[a.type]} {a.description}
              </div>
              <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                {contact?.name} · {a.date}
              </div>
            </div>
          ),
          color: a.type === 'call' ? 'blue' : a.type === 'email' ? 'green' : a.type === 'meeting' ? 'orange' : 'gray',
        }
      })}
    />
  )
}

function NewContactTab() {
  return (
    <div style={{ maxWidth: 480 }}>
      <Form
        onFinish={(values) => {
          notification.success('Contact created (mock)', JSON.stringify(values, null, 2))
        }}
      >
        <Field name="name" label="Full Name" rules={[{ required: true }]}>
          <Input placeholder="John Doe" />
        </Field>
        <Field name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="john@example.com" />
        </Field>
        <Field name="company" label="Company">
          <Input placeholder="Acme Inc" />
        </Field>
        <Field name="phone" label="Phone">
          <Input placeholder="+1 (555) 000-0000" />
        </Field>
        <Field name="status" label="Status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: 'Lead', value: 'lead' },
              { label: 'Prospect', value: 'prospect' },
              { label: 'Customer', value: 'customer' },
            ]}
            placeholder="Select status"
          />
        </Field>
        <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>
          Create Contact
        </Button>
      </Form>
    </div>
  )
}

export function CrmApp() {
  const [activeTab, setActiveTab] = useState('contacts')

  const tabs: TabItem[] = [
    { key: 'contacts', label: 'Contacts', children: <ContactsTab /> },
    { key: 'deals', label: 'Pipeline', children: <DealsTab /> },
    { key: 'activity', label: 'Activity', children: <ActivityTab /> },
    { key: 'new', label: '+ New Contact', children: <NewContactTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
