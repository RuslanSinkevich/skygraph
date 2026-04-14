import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Badge, Avatar, Timeline, Drawer, Button, Input,
  Progress, Form, Field, Select, Descriptions, notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { contacts, deals, activities, pipelineStats } from './data'
import type { Contact, Deal, ContactStatus } from './data'

const statusColors: Record<ContactStatus, string> = {
  lead: 'blue',
  customer: 'green',
  churned: 'red',
  prospect: 'orange',
}

const stageLabels: Record<Deal['stage'], string> = {
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
  const [statusFilter, setStatusFilter] = useState<string>('')

  const filtered = useMemo(() => {
    let list = contacts
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()))
    if (statusFilter) list = list.filter(c => c.status === statusFilter)
    return list
  }, [search, statusFilter])

  const columns: TableColumn<Contact>[] = [
    {
      key: 'name',
      title: 'Contact',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small">{r.avatar}</Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{r.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'company', title: 'Company', sorter: (a, b) => a.company.localeCompare(b.company) },
    {
      key: 'status',
      title: 'Status',
      filters: [
        { label: 'Lead', value: 'lead' },
        { label: 'Customer', value: 'customer' },
        { label: 'Churned', value: 'churned' },
        { label: 'Prospect', value: 'prospect' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, r) => <Tag color={statusColors[r.status]}>{r.status}</Tag>,
    },
    {
      key: 'revenue',
      title: 'Revenue',
      sorter: (a, b) => a.revenue - b.revenue,
      render: (_, r) => `$${r.revenue.toLocaleString()}`,
    },
    { key: 'lastContact', title: 'Last Contact', sorter: (a, b) => a.lastContact.localeCompare(b.lastContact) },
    {
      key: 'actions',
      title: '',
      render: (_, r) => <Button size="small" onClick={() => setDrawerContact(r)}>View</Button>,
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
        <Input placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 240 }} />
        <Select
          placeholder="All statuses"
          value={statusFilter || undefined}
          onChange={v => setStatusFilter(v ?? '')}
          options={[
            { label: 'All statuses', value: '' },
            { label: 'Lead', value: 'lead' },
            { label: 'Customer', value: 'customer' },
            { label: 'Prospect', value: 'prospect' },
            { label: 'Churned', value: 'churned' },
          ]}
          style={{ width: 160 }}
          allowClear
        />
        <div className="sc-toolbar-spacer" />
        <Button type="primary" onClick={() => notification.success({ message: 'Contact created (mock)' })}>
          + Add Contact
        </Button>
      </div>
      <Table<Contact> columns={columns} dataSource={filtered} rowKey="id" size="small" pagination={{ pageSize: 8 }} />

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
              size="small"
              status={stage === 'closed-won' ? 'success' : stage === 'closed-lost' ? 'exception' : 'active'}
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
      items={activities.slice(0, 20).map(a => {
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
          notification.success({ message: 'Contact created (mock)', description: JSON.stringify(values, null, 2) })
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
  const tabs: TabItem[] = [
    { key: 'contacts', label: 'Contacts' },
    { key: 'deals', label: 'Pipeline' },
    { key: 'activity', label: 'Activity' },
    { key: 'new', label: '+ New Contact' },
  ]

  const [activeTab, setActiveTab] = useState('contacts')

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
      <div style={{ marginTop: 16 }}>
        {activeTab === 'contacts' && <ContactsTab />}
        {activeTab === 'deals' && <DealsTab />}
        {activeTab === 'activity' && <ActivityTab />}
        {activeTab === 'new' && <NewContactTab />}
      </div>
    </div>
  )
}
