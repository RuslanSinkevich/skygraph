import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Badge, Avatar, Timeline, Drawer, Button, Input, Select,
  Progress, Form, Field, Descriptions, Modal, Popconfirm, Dropdown, InputNumber,
  notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { contacts, deals, activities, pipelineStats, toTableRow } from './data'
import type { Contact, ContactStatus, Deal } from './data'

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

const stageColors: Record<string, string> = {
  qualification: 'default',
  proposal: 'processing',
  negotiation: 'warning',
  'closed-won': 'success',
  'closed-lost': 'error',
}

function StatsRow() {
  const totalRevenue = contacts.reduce((s, c) => s + c.revenue, 0)
  const totalDeals = deals.reduce((s, d) => s + d.value, 0)
  const wonDeals = pipelineStats['closed-won']
  const wonValue = wonDeals.reduce((s, d) => s + d.value, 0)
  const avgDealSize = deals.length ? Math.round(totalDeals / deals.length) : 0
  const winRate = deals.length ? Math.round((wonDeals.length / deals.length) * 100) : 0
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
        <div className="stat-card-label">Avg Deal Size</div>
        <div className="stat-card-value">${(avgDealSize / 1000).toFixed(0)}k</div>
        <div className="stat-card-sub">win rate: {winRate}%</div>
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
  const [editModal, setEditModal] = useState<Contact | null>(null)
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    if (!search) return contacts
    const q = search.toLowerCase()
    return contacts.filter(c => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
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
    { key: 'company', title: 'Company', width: 130, sortable: true },
    { key: 'phone', title: 'Phone', width: 150 },
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
      render: (val) => {
        const n = Number(val)
        return <span style={{ fontWeight: n > 100000 ? 600 : 400 }}>${n.toLocaleString()}</span>
      },
    },
    { key: 'lastContact', title: 'Last Contact', width: 120, sortable: true },
    {
      key: 'actions',
      title: '',
      width: 120,
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
                if (c) setEditModal(c)
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
        <Button type="primary" onClick={() => notification.success('Contact created (mock)')}>
          + Add Contact
        </Button>
      </div>
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys as string[]) }}
        summary={(rows) => {
          const totalRev = rows.reduce((s, r) => s + (Number(r.data.revenue) || 0), 0)
          return [[
            { content: `${rows.length} contacts` },
            { content: '' },
            { content: '' },
            { content: '' },
            { content: `$${totalRev.toLocaleString()}`, align: 'right' as const },
            { content: '' },
            { content: '' },
          ]]
        }}
      />

      <Drawer
        open={!!drawerContact}
        onClose={() => setDrawerContact(null)}
        title={drawerContact?.name ?? ''}
        width={500}
      >
        {drawerContact && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large">{drawerContact.avatar}</Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{drawerContact.name}</div>
                <Tag color={statusColors[drawerContact.status]}>{drawerContact.status}</Tag>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Button size="small" onClick={() => {
                  setDrawerContact(null)
                  setEditModal(drawerContact)
                }}>Edit</Button>
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
                  <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--sg-color-border-secondary)' }}>
                    <span style={{ fontSize: 13, flex: 1 }}>{d.title}</span>
                    <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginRight: 8 }}>
                      ${d.value.toLocaleString()} · {d.probability}%
                    </span>
                    <Tag color={stageColors[d.stage]}>{stageLabels[d.stage]}</Tag>
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

      <Modal
        open={!!editModal}
        onClose={() => setEditModal(null)}
        title={`Edit — ${editModal?.name ?? ''}`}
        footer={null}
        width={520}
      >
        {editModal && (
          <Form
            initialValues={{
              name: editModal.name, email: editModal.email,
              company: editModal.company, phone: editModal.phone,
              status: editModal.status, revenue: editModal.revenue,
            }}
            onFinish={(values) => {
              notification.success('Contact updated (mock)', JSON.stringify(values, null, 2))
              setEditModal(null)
            }}
          >
            <Field name="name" label="Full Name" rules={[{ required: true }]}>
              <Input />
            </Field>
            <Field name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Field>
            <Field name="company" label="Company">
              <Input />
            </Field>
            <Field name="phone" label="Phone">
              <Input />
            </Field>
            <Field name="status" label="Status" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: 'Lead', value: 'lead' },
                  { label: 'Prospect', value: 'prospect' },
                  { label: 'Customer', value: 'customer' },
                  { label: 'Churned', value: 'churned' },
                ]}
              />
            </Field>
            <Field name="revenue" label="Revenue ($)">
              <InputNumber min={0} style={{ width: '100%' }} />
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

function DealsTab() {
  const [dealDetail, setDealDetail] = useState<Deal | null>(null)
  const stages = ['qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'] as const
  return (
    <>
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
                  <div key={d.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 0', fontSize: 13, cursor: 'pointer',
                    borderBottom: '1px solid var(--sg-color-border-secondary)',
                  }}
                    onClick={() => setDealDetail(d)}
                  >
                    <span style={{ fontWeight: 500 }}>{d.title}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ color: 'var(--sg-color-text-secondary)' }}>
                        ${d.value.toLocaleString()}
                      </span>
                      <Tag color="default" style={{ fontSize: 11 }}>{d.probability}%</Tag>
                      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                        {contact?.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <Modal
        open={!!dealDetail}
        onClose={() => setDealDetail(null)}
        title={dealDetail?.title ?? ''}
        width={520}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => setDealDetail(null)}>Close</Button>
            {dealDetail && dealDetail.stage !== 'closed-won' && dealDetail.stage !== 'closed-lost' && (
              <>
                <Button onClick={() => {
                  notification.success(`Deal marked as Won (mock)`)
                  setDealDetail(null)
                }} type="primary">Mark Won</Button>
                <Button onClick={() => {
                  notification.error(`Deal marked as Lost (mock)`)
                  setDealDetail(null)
                }}>Mark Lost</Button>
              </>
            )}
          </div>
        }
      >
        {dealDetail && (() => {
          const contact = contacts.find(c => c.id === dealDetail.contactId)
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Tag color={stageColors[dealDetail.stage]}>{stageLabels[dealDetail.stage]}</Tag>
              <Descriptions
                items={[
                  { label: 'Value', children: `$${dealDetail.value.toLocaleString()}` },
                  { label: 'Probability', children: `${dealDetail.probability}%` },
                  { label: 'Created', children: dealDetail.createdAt },
                  { label: 'Contact', children: contact?.name ?? '—' },
                  { label: 'Company', children: contact?.company ?? '—' },
                  { label: 'Email', children: contact?.email ?? '—' },
                ]}
                column={2}
                size="small"
              />
              <h4>Win Probability</h4>
              <Progress
                percent={dealDetail.probability}
                status={dealDetail.stage === 'closed-won' ? 'success' : dealDetail.stage === 'closed-lost' ? 'error' : 'active'}
              />
            </div>
          )
        })()}
      </Modal>
    </>
  )
}

function ActivityTab() {
  const typeIcons: Record<string, string> = { call: '📞', email: '📧', meeting: '🤝', note: '📝' }
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    if (typeFilter === 'all') return activities
    return activities.filter(a => a.type === typeFilter)
  }, [typeFilter])

  return (
    <>
      <div className="sc-toolbar">
        <Select
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { label: 'All Types', value: 'all' },
            { label: '📞 Calls', value: 'call' },
            { label: '📧 Emails', value: 'email' },
            { label: '🤝 Meetings', value: 'meeting' },
            { label: '📝 Notes', value: 'note' },
          ]}
          style={{ width: 160 }}
        />
        <div className="sc-toolbar-spacer" />
        <Tag>{filtered.length} activities</Tag>
      </div>
      <Timeline
        items={filtered.slice(0, 30).map(a => {
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
    </>
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
        <Field name="revenue" label="Initial Revenue ($)">
          <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
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
