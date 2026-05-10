import { useMemo, useState } from 'react'
import {
  Table,
  Tag,
  Button,
  Drawer,
  Modal,
  Form,
  Field,
  Input,
  Textarea,
  Select,
  Avatar,
  Timeline,
  Descriptions,
  Segmented,
  Empty,
  NotificationContainer,
  notification,
  Popconfirm,
  Dropdown,
} from '@skygraph/react'
import type { TableColumn, TimelineItem } from '@skygraph/react'
import { tickets as initialTickets, STATUS_COLOR, PRIORITY_COLOR } from './data'
import type { Ticket, TicketStatus, TicketPriority, TicketComment } from './data'
import {
  StatsRow,
  Toolbar,
  initials,
  colorFromString,
  timeAgo,
  useFilteredList,
  useTableRows,
  useAppLocale,
} from '../_shared'

type ViewMode = 'table' | 'queue'
type FilterKey = 'all' | 'open' | 'pending' | 'resolved' | 'urgent'

export function HelpDeskApp() {
  const l = useAppLocale('helpdesk')
  const [items, setItems] = useState<Ticket[]>(initialTickets)
  const [filter, setFilter] = useState<FilterKey>('all')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<ViewMode>('table')
  const [selected, setSelected] = useState<Ticket | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [reply, setReply] = useState('')

  const tabFiltered = useMemo(() => {
    if (filter === 'all') return items
    if (filter === 'open') return items.filter((t) => t.status === 'new' || t.status === 'open')
    if (filter === 'pending') return items.filter((t) => t.status === 'pending')
    if (filter === 'resolved')
      return items.filter((t) => t.status === 'resolved' || t.status === 'closed')
    if (filter === 'urgent')
      return items.filter((t) => t.priority === 'urgent' || t.priority === 'high')
    return items
  }, [items, filter])

  const filtered = useFilteredList(tabFiltered, search, [
    'subject',
    'customerName',
    'assigneeName',
    'id',
  ])

  const stats = useMemo(
    () => ({
      open: items.filter((t) => t.status === 'new' || t.status === 'open').length,
      pending: items.filter((t) => t.status === 'pending').length,
      urgent: items.filter((t) => t.priority === 'urgent').length,
      resolved: items.filter((t) => t.status === 'resolved').length,
    }),
    [items],
  )

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: l.columns.id,
      width: 100,
      sortable: true,
      fixed: 'left' as const,
      render: (v) => <code style={{ fontSize: 12 }}>{String(v)}</code>,
    },
    {
      key: 'subject',
      title: l.columns.subject,
      sortable: true,
      filterMode: 'search' as const,
      onFilter: (v, row) => String(row.subject).toLowerCase().includes(String(v).toLowerCase()),
      render: (v, row) => (
        <div>
          <div style={{ fontWeight: 500 }}>{String(v)}</div>
          <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)', marginTop: 2 }}>
            {String(row.product)} · {String(row.channel)}
          </div>
        </div>
      ),
    },
    {
      key: 'customerName',
      title: l.columns.customer,
      width: 180,
      sortable: true,
      render: (v) => (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Avatar size="small" style={{ background: colorFromString(String(v)) }}>
            {initials(String(v))}
          </Avatar>
          <span style={{ fontSize: 13 }}>{String(v)}</span>
        </div>
      ),
    },
    {
      key: 'assigneeName',
      title: l.columns.assignee,
      width: 140,
      sortable: true,
      filters: [
        'Alex Kim',
        'Maria Sanchez',
        'James Lee',
        'Sophie Wu',
        'Liam Novak',
        'Emma Tang',
      ].map((n) => ({ text: n, value: n })),
      onFilter: (v, row) => row.assigneeName === v,
      filterMultiple: true,
    },
    {
      key: 'priority',
      title: l.columns.priority,
      width: 100,
      sortable: true,
      filters: (['low', 'medium', 'high', 'urgent'] as TicketPriority[]).map((v) => ({
        text: l.priorityLabel[v],
        value: v,
      })),
      onFilter: (v, row) => row.priority === v,
      render: (v) => (
        <Tag color={PRIORITY_COLOR[v as TicketPriority]}>
          {l.priorityLabel[v as TicketPriority]}
        </Tag>
      ),
    },
    {
      key: 'status',
      title: l.columns.status,
      width: 100,
      sortable: true,
      filters: (['new', 'open', 'pending', 'resolved', 'closed'] as TicketStatus[]).map((v) => ({
        text: l.statusLabel[v],
        value: v,
      })),
      onFilter: (v, row) => row.status === v,
      render: (v) => (
        <Tag color={STATUS_COLOR[v as TicketStatus]}>{l.statusLabel[v as TicketStatus]}</Tag>
      ),
    },
    {
      key: 'updatedAt',
      title: l.columns.updated,
      width: 130,
      sortable: true,
      render: (v) => (
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          {timeAgo(String(v))}
        </span>
      ),
    },
    {
      key: 'actions',
      title: '',
      width: 56,
      render: (_v, row) => (
        <Dropdown
          trigger="click"
          items={[
            { key: 'open', label: l.rowActions.open },
            { key: 'resolve', label: l.rowActions.resolve },
            { key: 'close', label: l.rowActions.close, danger: true },
          ]}
          onSelect={(k) => {
            const t = items.find((x) => x.id === String(row.id))
            if (!t) return
            if (k === 'open') setSelected(t)
            else if (k === 'resolve') setStatus(t.id, 'resolved')
            else if (k === 'close') setStatus(t.id, 'closed')
          }}
        >
          <Button size="small" type="text">
            ⋯
          </Button>
        </Dropdown>
      ),
    },
  ]

  const setStatus = (id: string, status: TicketStatus) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t)),
    )
    notification.success(l.toasts.statusUpdate(id, l.statusLabel[status]))
  }

  const setAssignee = (id: string, assigneeName: string) => {
    setItems((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, assigneeName, updatedAt: new Date().toISOString() } : t,
      ),
    )
  }

  const sendReply = () => {
    if (!reply.trim() || !selected) return
    const c: TicketComment = {
      id: `${selected.id}-c${Date.now()}`,
      authorName: l.youAgent,
      authorRole: 'agent',
      body: reply,
      at: new Date().toISOString(),
    }
    setItems((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? {
              ...t,
              comments: [...t.comments, c],
              updatedAt: c.at,
            }
          : t,
      ),
    )
    setSelected((prev) => (prev ? { ...prev, comments: [...prev.comments, c] } : null))
    setReply('')
    notification.success(l.toasts.replySent)
  }

  const tableRows = useTableRows(filtered)

  const queueColumns: Record<TicketStatus, Ticket[]> = {
    new: [],
    open: [],
    pending: [],
    resolved: [],
    closed: [],
  }
  for (const t of filtered) queueColumns[t.status].push(t)

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />

      <StatsRow
        items={[
          {
            key: 'open',
            icon: '📬',
            label: l.stats.open,
            value: stats.open,
            sub: l.stats.openSub,
            subTone: 'default',
          },
          {
            key: 'pending',
            icon: '⏳',
            label: l.stats.pending,
            value: stats.pending,
            sub: l.stats.pendingSub,
            subTone: 'default',
          },
          {
            key: 'urgent',
            icon: '🔥',
            label: l.stats.urgent,
            value: stats.urgent,
            sub: l.stats.urgentSub,
            subTone: stats.urgent ? 'error' : 'default',
          },
          {
            key: 'resolved',
            icon: '✅',
            label: l.stats.resolved,
            value: stats.resolved,
            sub: l.stats.resolvedSub,
            subTone: 'success',
          },
        ]}
      />

      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: l.searchPlaceholder }}
        filters={
          <>
            <Segmented
              value={filter}
              onChange={(v) => setFilter(v as FilterKey)}
              options={[
                { label: `${l.filters.all} (${items.length})`, value: 'all' },
                { label: `${l.filters.open} (${stats.open})`, value: 'open' },
                { label: `${l.filters.pending} (${stats.pending})`, value: 'pending' },
                { label: `${l.filters.urgent} (${stats.urgent})`, value: 'urgent' },
                { label: `${l.filters.resolved} (${stats.resolved})`, value: 'resolved' },
              ]}
            />
            <Segmented
              value={view}
              onChange={(v) => setView(v as ViewMode)}
              options={[
                { label: l.views.table, value: 'table' },
                { label: l.views.queue, value: 'queue' },
              ]}
            />
          </>
        }
        actions={
          <Button type="primary" onClick={() => setCreateOpen(true)}>
            {l.newTicket}
          </Button>
        }
      />

      {view === 'table' ? (
        filtered.length === 0 ? (
          <Empty description={l.noTickets} />
        ) : (
          <Table
            columns={columns}
            data={tableRows}
            size="small"
            pageSize={10}
            bordered
            sticky
            columnPinning
            densityToggle
            groupByOptions={[
              { key: 'status', label: l.groupBy.status },
              { key: 'priority', label: l.groupBy.priority },
              { key: 'assigneeName', label: l.groupBy.assignee },
              { key: 'product', label: l.groupBy.product },
            ]}
          />
        )
      ) : (
        <div className="hd-queue">
          {(['new', 'open', 'pending', 'resolved', 'closed'] as TicketStatus[]).map((st) => (
            <div key={st} className="hd-queue-col">
              <div className="hd-queue-head">
                <Tag color={STATUS_COLOR[st]}>{l.statusLabel[st]}</Tag>
                <span className="hd-muted">{queueColumns[st].length}</span>
              </div>
              <div className="hd-queue-body">
                {queueColumns[st].length === 0 ? (
                  <div className="hd-queue-empty">{l.noTicketsInColumn}</div>
                ) : (
                  queueColumns[st].map((t) => (
                    <div key={t.id} className="hd-queue-card" onClick={() => setSelected(t)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <code style={{ fontSize: 11 }}>{t.id}</code>
                        <Tag color={PRIORITY_COLOR[t.priority]}>{l.priorityLabel[t.priority]}</Tag>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500, margin: '4px 0' }}>
                        {t.subject}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)' }}>
                        {t.customerName} · {timeAgo(t.updatedAt)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.id} — ${selected.subject}` : ''}
        width={640}
      >
        {selected && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
              <Tag color={STATUS_COLOR[selected.status]}>{l.statusLabel[selected.status]}</Tag>
              <Tag color={PRIORITY_COLOR[selected.priority]}>
                {l.priorityLabel[selected.priority]}
              </Tag>
              {selected.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
              <div style={{ flex: 1 }} />
              <Popconfirm
                title={l.drawer.resolveTitle}
                onConfirm={() => {
                  setStatus(selected.id, 'resolved')
                  setSelected(null)
                }}
              >
                <Button size="small" type="primary">
                  {l.drawer.resolveBtn}
                </Button>
              </Popconfirm>
            </div>

            <Descriptions
              column={2}
              size="small"
              items={[
                {
                  key: 'customer',
                  label: l.drawer.customer,
                  children: `${selected.customerName} (${selected.customerEmail})`,
                },
                {
                  key: 'assignee',
                  label: l.drawer.assignee,
                  children: (
                    <Select
                      value={selected.assigneeName}
                      onChange={(v) => {
                        setAssignee(selected.id, String(v))
                        setSelected((prev) => (prev ? { ...prev, assigneeName: String(v) } : null))
                      }}
                      options={[
                        'Alex Kim',
                        'Maria Sanchez',
                        'James Lee',
                        'Sophie Wu',
                        'Liam Novak',
                        'Emma Tang',
                      ].map((n) => ({ label: n, value: n }))}
                      size="small"
                    />
                  ),
                },
                { key: 'channel', label: l.drawer.channel, children: selected.channel },
                { key: 'product', label: l.drawer.product, children: selected.product },
                { key: 'created', label: l.drawer.created, children: timeAgo(selected.createdAt) },
                { key: 'updated', label: l.drawer.updated, children: timeAgo(selected.updatedAt) },
              ]}
            />

            <h4 style={{ margin: '20px 0 10px' }}>
              {l.drawer.conversationHeading(selected.comments.length)}
            </h4>
            <Timeline items={commentTimeline(selected.comments, l.authorRoleLabel)} />

            <div
              style={{
                marginTop: 16,
                border: '1px solid var(--sg-color-border-secondary)',
                borderRadius: 8,
                padding: 12,
                background: 'var(--sg-color-bg-secondary)',
              }}
            >
              <Textarea
                value={reply}
                onChange={setReply}
                placeholder={l.drawer.replyPlaceholder}
                rows={3}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <Button size="small" onClick={() => setReply('')} disabled={!reply}>
                  {l.drawer.clear}
                </Button>
                <Button size="small" type="primary" onClick={sendReply} disabled={!reply.trim()}>
                  {l.drawer.sendReply}
                </Button>
              </div>
            </div>
          </>
        )}
      </Drawer>

      {/* Create ticket modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title={l.newTicketModal.title}
        footer={null}
      >
        <Form
          initialValues={{ priority: 'medium', product: 'Web App' }}
          onFinish={(values) => {
            const id = `T-${(2300 + items.length + 1).toString().padStart(4, '0')}`
            const v = values as {
              subject: string
              description: string
              priority: TicketPriority
              product: string
              customerName: string
              customerEmail: string
            }
            const t: Ticket = {
              id,
              subject: v.subject,
              description: v.description,
              priority: v.priority,
              product: v.product,
              customerName: v.customerName,
              customerEmail: v.customerEmail,
              status: 'new',
              channel: 'web',
              assigneeName: 'Alex Kim',
              tags: ['new'],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              comments: [
                {
                  id: `${id}-c0`,
                  authorName: v.customerName,
                  authorRole: 'customer',
                  body: v.description,
                  at: new Date().toISOString(),
                },
              ],
            }
            setItems((prev) => [t, ...prev])
            setCreateOpen(false)
            notification.success(l.toasts.ticketCreated(id))
          }}
        >
          <Field name="subject" label={l.newTicketModal.subject} rules={[{ required: true }]}>
            <Input />
          </Field>
          <Field
            name="description"
            label={l.newTicketModal.description}
            rules={[{ required: true }]}
          >
            <Textarea rows={4} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field name="priority" label={l.newTicketModal.priority}>
              <Select
                options={(['low', 'medium', 'high', 'urgent'] as TicketPriority[]).map((v) => ({
                  label: l.priorityLabel[v],
                  value: v,
                }))}
              />
            </Field>
            <Field name="product" label={l.newTicketModal.product}>
              <Select
                options={[
                  'Web App',
                  'Mobile App',
                  'API',
                  'Billing',
                  'Dashboard',
                  'Integrations',
                ].map((v) => ({ label: v, value: v }))}
              />
            </Field>
            <Field
              name="customerName"
              label={l.newTicketModal.customer}
              rules={[{ required: true }]}
            >
              <Input />
            </Field>
            <Field name="customerEmail" label={l.newTicketModal.email} rules={[{ required: true }]}>
              <Input />
            </Field>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
            <Button onClick={() => setCreateOpen(false)}>{l.newTicketModal.cancel}</Button>
            <Button type="primary" htmlType="submit">
              {l.newTicketModal.create}
            </Button>
          </div>
        </Form>
      </Modal>

      <style>{styles}</style>
    </div>
  )
}

function commentTimeline(
  comments: TicketComment[],
  roleLabel: Record<'agent' | 'customer' | 'system', string>,
): TimelineItem[] {
  return comments.map((c) => ({
    color: c.authorRole === 'agent' ? 'blue' : c.authorRole === 'system' ? 'gray' : 'green',
    label: timeAgo(c.at),
    children: (
      <div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
          <Avatar size="small" style={{ background: colorFromString(c.authorName) }}>
            {initials(c.authorName)}
          </Avatar>
          <strong style={{ fontSize: 13 }}>{c.authorName}</strong>
          <Tag color={c.authorRole === 'agent' ? 'processing' : 'default'}>
            {roleLabel[c.authorRole]}
          </Tag>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5 }}>{c.body}</div>
      </div>
    ),
  }))
}

const styles = `
.hd-queue {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.hd-queue-col {
  display: flex;
  flex-direction: column;
  background: var(--sg-color-bg-secondary);
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
  min-height: 200px;
}
.hd-queue-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
}
.hd-queue-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  flex: 1;
}
.hd-queue-card {
  background: var(--sg-color-bg);
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.12s;
}
.hd-queue-card:hover {
  border-color: var(--sg-color-primary);
  transform: translateY(-1px);
}
.hd-queue-empty {
  font-size: 12px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
  text-align: center;
  padding: 20px 8px;
  border: 1px dashed var(--sg-color-border-secondary);
  border-radius: 6px;
}
.hd-muted { color: var(--sg-color-text-secondary); font-size: 12px; }
`
