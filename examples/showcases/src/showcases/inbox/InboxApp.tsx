import { useMemo, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Input,
  Tag,
  Modal,
  Form,
  Field,
  Textarea,
  Empty,
  Dropdown,
  NotificationContainer,
  notification,
  Tooltip,
} from '@skygraph/react'
import { threads as initialThreads, messagesById, folderCounts } from './data'
import type { EmailThread, EmailMessage, InboxFolder } from './data'
import { initials, colorFromString, useFilteredList, useAppLocale } from '../_shared'

const FOLDER_ICONS: Record<InboxFolder, string> = {
  inbox: '📥',
  starred: '⭐',
  sent: '📤',
  drafts: '📝',
  archive: '📦',
  spam: '🚫',
  trash: '🗑️',
}

const FOLDER_KEYS: InboxFolder[] = [
  'inbox',
  'starred',
  'sent',
  'drafts',
  'archive',
  'spam',
  'trash',
]

export function InboxApp() {
  const l = useAppLocale('inbox')
  const [threadList, setThreadList] = useState<EmailThread[]>(initialThreads)
  const [folder, setFolder] = useState<InboxFolder>('inbox')
  const [search, setSearch] = useState('')
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [composeOpen, setComposeOpen] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const folderFiltered = useMemo(() => {
    if (folder === 'starred') return threadList.filter((t) => t.starred)
    return threadList.filter((t) => t.folder === folder)
  }, [threadList, folder])

  const visible = useFilteredList(folderFiltered, search, ['subject', 'preview'])
  const counts = folderCounts(threadList)

  const activeThread = activeThreadId ? threadList.find((t) => t.id === activeThreadId) : null
  const activeMessages: EmailMessage[] = activeThread
    ? activeThread.messageIds.map((id) => messagesById[id]!).filter(Boolean)
    : []

  const update = (id: string, patch: Partial<EmailThread>) => {
    setThreadList((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
    if (activeThreadId === id) {
      // also keep open thread fresh
      setActiveThreadId(id)
    }
  }

  const toggleStar = (t: EmailThread) => update(t.id, { starred: !t.starred })

  const moveTo = (ids: string[], to: InboxFolder) => {
    setThreadList((prev) => prev.map((t) => (ids.includes(t.id) ? { ...t, folder: to } : t)))
    setSelected(new Set())
    notification.success(l.movedToast(ids.length, l.folders[to]))
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const openThread = (t: EmailThread) => {
    setActiveThreadId(t.id)
    if (!t.read) update(t.id, { read: true })
  }

  return (
    <div
      className="sc-content sc-content-flush"
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      <NotificationContainer />

      <div className="ib-shell">
        {/* Sidebar */}
        <div className="ib-sidebar">
          <div style={{ padding: '12px 14px' }}>
            <Button type="primary" onClick={() => setComposeOpen(true)} style={{ width: '100%' }}>
              ✏️ {l.composeButton}
            </Button>
          </div>
          <nav className="ib-folders">
            {FOLDER_KEYS.map((key) => {
              const c = counts[key]
              return (
                <button
                  key={key}
                  className={`ib-folder${folder === key ? ' ib-folder--active' : ''}`}
                  onClick={() => {
                    setFolder(key)
                    setActiveThreadId(null)
                  }}
                >
                  <span>{FOLDER_ICONS[key]}</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>{l.folders[key]}</span>
                  {c > 0 && <Badge count={c} />}
                </button>
              )
            })}
          </nav>
          <div
            style={{
              padding: '12px 14px',
              borderTop: '1px solid var(--sg-color-border-secondary)',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)', marginBottom: 6 }}>
              {l.labelsHeading}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {['work', 'finance', 'personal', 'updates', 'urgent', 'newsletters'].map((label) => (
                <Tag key={label} color="default">
                  {label}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        {/* Thread list */}
        <div className="ib-list">
          <div className="ib-list-header">
            <Input
              placeholder={l.searchPlaceholder}
              value={search}
              onChange={setSearch}
              size="small"
            />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              {selected.size > 0 ? (
                <>
                  <Tag>
                    {selected.size} {l.selectedSuffix}
                  </Tag>
                  <Tooltip title={l.archiveTooltip}>
                    <Button size="small" onClick={() => moveTo([...selected], 'archive')}>
                      📦
                    </Button>
                  </Tooltip>
                  <Tooltip title={l.spamTooltip}>
                    <Button size="small" onClick={() => moveTo([...selected], 'spam')}>
                      🚫
                    </Button>
                  </Tooltip>
                  <Tooltip title={l.trashTooltip}>
                    <Button size="small" onClick={() => moveTo([...selected], 'trash')}>
                      🗑️
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                  {l.countInFolder(visible.length, l.folders[folder])}
                </span>
              )}
            </div>
          </div>

          <div className="ib-list-body">
            {visible.length === 0 ? (
              <div style={{ padding: 24 }}>
                <Empty description={l.noMessages} />
              </div>
            ) : (
              visible.map((t) => {
                const sender = t.participants[0]!
                const isActive = activeThreadId === t.id
                const isSelected = selected.has(t.id)
                return (
                  <div
                    key={t.id}
                    className={[
                      'ib-thread',
                      isActive && 'ib-thread--active',
                      !t.read && 'ib-thread--unread',
                      isSelected && 'ib-thread--selected',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => openThread(t)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => toggleSelect(t.id)}
                      />
                      <button
                        className="ib-star"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleStar(t)
                        }}
                        title={t.starred ? l.unstar : l.star}
                      >
                        {t.starred ? '⭐' : '☆'}
                      </button>
                      <Avatar size="small" style={{ background: colorFromString(sender.name) }}>
                        {initials(sender.name)}
                      </Avatar>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                          <span
                            style={{
                              fontSize: 13,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {sender.name}
                            {t.messageIds.length > 1 && (
                              <span
                                style={{ color: 'var(--sg-color-text-secondary)', fontWeight: 400 }}
                              >
                                {' '}
                                ({t.messageIds.length})
                              </span>
                            )}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: 'var(--sg-color-text-secondary)',
                              flexShrink: 0,
                            }}
                          >
                            {new Date(t.receivedAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div
                          style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}
                        >
                          {t.important && (
                            <span style={{ color: 'var(--sg-color-warning)' }}>⚑</span>
                          )}
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: t.read ? 400 : 600,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {t.subject}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: 'var(--sg-color-text-secondary)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginTop: 2,
                          }}
                        >
                          {t.preview}
                        </div>
                        {t.labels.length > 0 && (
                          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                            {t.labels.map((label) => (
                              <Tag key={label} color="default">
                                {label}
                              </Tag>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Thread reading drawer */}
      <Drawer
        open={!!activeThread}
        onClose={() => setActiveThreadId(null)}
        title={activeThread?.subject ?? ''}
        width={720}
      >
        {activeThread && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {activeThread.labels.map((label) => (
                  <Tag key={label}>{label}</Tag>
                ))}
                {activeThread.starred && <Tag color="warning">{l.starred}</Tag>}
                {activeThread.important && <Tag color="error">{l.important}</Tag>}
              </div>
              <Dropdown
                trigger="click"
                items={[
                  { key: 'archive', label: l.drawerActionMenu.archive },
                  { key: 'spam', label: l.drawerActionMenu.spam },
                  { key: 'trash', label: l.drawerActionMenu.delete, danger: true },
                ]}
                onSelect={(k) => moveTo([activeThread.id], k as InboxFolder)}
              >
                <Button size="small">⋯</Button>
              </Dropdown>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activeMessages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    border: '1px solid var(--sg-color-border-secondary)',
                    borderRadius: 8,
                    padding: 14,
                    background: 'var(--sg-color-bg)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <Avatar size="small" style={{ background: colorFromString(m.from.name) }}>
                      {initials(m.from.name)}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: 14 }}>{m.from.name}</strong>
                        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                          {new Date(m.at).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                        {l.messageTo(m.to.map((p) => p.name).join(', '))}
                        {m.cc?.length ? `, ${l.messageCc(m.cc.map((p) => p.name).join(', '))}` : ''}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {m.body}
                  </div>
                  {m.attachments && m.attachments.length > 0 && (
                    <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {m.attachments.map((a, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid var(--sg-color-border-secondary)',
                            borderRadius: 6,
                            fontSize: 12,
                            background: 'var(--sg-color-bg-secondary)',
                          }}
                        >
                          📎 <strong>{a.name}</strong> · {a.size}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <Button type="primary" onClick={() => setComposeOpen(true)}>
                {l.reply}
              </Button>
              <Button onClick={() => moveTo([activeThread.id], 'archive')}>{l.archive}</Button>
              <Button onClick={() => toggleStar(activeThread)}>
                {activeThread.starred ? l.unstarBtn : l.starBtn}
              </Button>
            </div>
          </>
        )}
      </Drawer>

      <Modal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        title={l.composeTitle}
        footer={null}
        width={600}
      >
        <Form
          onFinish={(values) => {
            notification.success(l.emailSent((values as { to: string }).to))
            setComposeOpen(false)
          }}
        >
          <Field name="to" label={l.fieldTo} rules={[{ required: true, type: 'email' }]}>
            <Input placeholder={l.toPlaceholder} />
          </Field>
          <Field name="subject" label={l.fieldSubject} rules={[{ required: true }]}>
            <Input />
          </Field>
          <Field name="body" label={l.fieldBody} rules={[{ required: true }]}>
            <Textarea rows={8} />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <Button onClick={() => setComposeOpen(false)}>{l.discard}</Button>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button>{l.saveDraft}</Button>
              <Button type="primary" htmlType="submit">
                {l.send}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.ib-shell {
  flex: 1;
  display: flex;
  min-height: 0;
}
.ib-sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid var(--sg-color-border-secondary);
  background: var(--sg-color-bg-secondary);
  display: flex;
  flex-direction: column;
}
.ib-folders {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 4px 8px;
}
.ib-folder {
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.12s;
  color: var(--sg-color-text);
}
.ib-folder:hover { background: var(--sg-color-bg-hover); }
.ib-folder--active {
  background: color-mix(in srgb, var(--sg-color-primary) 14%, transparent);
  color: var(--sg-color-primary);
  font-weight: 500;
}
.ib-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--sg-color-border-secondary);
  min-width: 0;
}
.ib-list-header {
  padding: 12px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  flex-shrink: 0;
}
.ib-list-body {
  flex: 1;
  overflow-y: auto;
}
.ib-thread {
  padding: 10px 12px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  cursor: pointer;
  transition: background 0.1s;
}
.ib-thread:hover { background: var(--sg-color-bg-hover); }
.ib-thread--active { background: color-mix(in srgb, var(--sg-color-primary) 8%, transparent); }
.ib-thread--unread { background: var(--sg-color-bg); }
.ib-thread--selected { background: color-mix(in srgb, var(--sg-color-primary) 12%, transparent); }
.ib-star {
  all: unset;
  cursor: pointer;
  font-size: 14px;
  width: 20px;
  text-align: center;
}
.ib-star:hover { color: var(--sg-color-warning); }
`
