import { useMemo, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Input,
  Mentions,
  Tag,
  Timeline,
  Tooltip,
  Dropdown,
  NotificationContainer,
  notification,
  Empty,
} from '@skygraph/react'
import type { TimelineItem } from '@skygraph/react'
import { conversations, messages, users, me, timeline } from './data'
import type { Conversation, Message } from './data'
import { initials, colorFromString, useFilteredList, useAppLocale } from '../_shared'

export function ChatApp() {
  const l = useAppLocale('chat')
  const [activeId, setActiveId] = useState<string>('c1')
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [conversationsState, setConversationsState] = useState(conversations)
  const [messagesState, setMessagesState] = useState(messages)

  const filtered = useFilteredList(conversationsState, search, ['name', 'lastMessage'])

  const active = useMemo<Conversation | undefined>(
    () => conversationsState.find((c) => c.id === activeId),
    [conversationsState, activeId],
  )

  const activeMessages = useMemo(
    () => messagesState.filter((m) => m.conversationId === activeId),
    [messagesState, activeId],
  )

  const userById = useMemo(() => {
    const map = new Map<string, (typeof users)[number]>()
    for (const u of users) map.set(u.id, u)
    return map
  }, [])

  const mentionOptions = useMemo(
    () => users.filter((u) => u.id !== 'me').map((u) => ({ value: u.name, label: u.name })),
    [],
  )

  const send = () => {
    const text = draft.trim()
    if (!text || !active) return
    const newMsg: Message = {
      id: `m${Date.now()}`,
      conversationId: active.id,
      authorId: 'me',
      at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    }
    setMessagesState((prev) => [...prev, newMsg])
    setConversationsState((prev) =>
      prev.map((c) =>
        c.id === active.id ? { ...c, lastMessage: text, lastAt: 'now', unread: 0 } : c,
      ),
    )
    setDraft('')
  }

  const openConversation = (id: string) => {
    setActiveId(id)
    setConversationsState((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
  }

  const totalUnread = conversationsState.reduce((s, c) => s + c.unread, 0)

  const timelineItems: TimelineItem[] = timeline.map((t) => ({
    label: t.at,
    children: t.label,
  }))

  const renderMessageText = (text: string) => {
    const parts = text.split(/(@[\w\s]+?(?=\s|$|[.!?,]))/g)
    return parts.map((p, i) =>
      p.startsWith('@') ? (
        <span
          key={i}
          style={{
            background: 'color-mix(in srgb, var(--sg-color-primary) 14%, transparent)',
            color: 'var(--sg-color-primary)',
            padding: '0 4px',
            borderRadius: 3,
            fontWeight: 500,
          }}
        >
          {p}
        </span>
      ) : (
        <span key={i}>{p}</span>
      ),
    )
  }

  return (
    <div
      className="sc-content sc-content-flush"
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      <NotificationContainer />

      <div className="chat-shell">
        {/* Sidebar: conversation list */}
        <div className="sc-twopane-side chat-side">
          <div className="chat-side-header">
            <strong>{l.inbox}</strong>
            {totalUnread > 0 && <Badge count={totalUnread} />}
          </div>
          <div style={{ padding: '8px 12px' }}>
            <Input
              placeholder={l.searchConversations}
              value={search}
              onChange={setSearch}
              size="small"
            />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 24 }}>
                <Empty description={l.noMatches} />
              </div>
            ) : (
              filtered.map((c) => {
                const isActive = c.id === activeId
                const peer =
                  c.type === 'dm'
                    ? users.find((u) => c.members.includes(u.id) && u.id !== 'me')
                    : null
                return (
                  <div
                    key={c.id}
                    className={[
                      'sc-thread-item',
                      isActive && 'sc-thread-item--active',
                      c.unread > 0 && 'sc-thread-item--unread',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => openConversation(c.id)}
                  >
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <Avatar size="small" style={{ background: colorFromString(c.name) }}>
                        {c.type === 'channel' ? '#' : initials(peer?.name ?? c.name)}
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
                            {c.name}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: 'var(--sg-color-text-secondary)',
                              flexShrink: 0,
                            }}
                          >
                            {c.lastAt}
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
                          {c.lastMessage}
                        </div>
                      </div>
                      {c.unread > 0 && <Badge count={c.unread} />}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Main: messages */}
        <div className="sc-twopane-main">
          {!active ? (
            <div
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Empty description={l.selectConversation} />
            </div>
          ) : (
            <>
              <div className="chat-header">
                <div>
                  <div style={{ fontWeight: 600 }}>
                    {active.type === 'channel' ? '# ' : ''}
                    {active.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                    {active.type === 'channel'
                      ? l.channelMembers(active.members.length)
                      : userById.get(active.members.find((m) => m !== 'me') ?? '')?.online
                        ? l.online
                        : l.offline}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Tooltip title={l.pinTooltip}>
                    <Button size="small" type="text">
                      📌
                    </Button>
                  </Tooltip>
                  <Dropdown
                    trigger="click"
                    items={[
                      { key: 'mute', label: l.muteNotifications },
                      { key: 'leave', label: l.leaveConversation, danger: true },
                    ]}
                    onSelect={(k) => {
                      if (k === 'mute') notification.info(l.mutedToast)
                      else if (k === 'leave') notification.warning(l.leftToast)
                    }}
                  >
                    <Button size="small" type="text">
                      ⋯
                    </Button>
                  </Dropdown>
                  <Button size="small" onClick={() => setShowDetails(true)}>
                    {l.detailsButton}
                  </Button>
                </div>
              </div>

              <div className="chat-body">
                {activeMessages.length === 0 ? (
                  <Empty description={l.noMessages} />
                ) : (
                  activeMessages.map((m) => {
                    const u = userById.get(m.authorId)
                    const isMine = m.authorId === 'me'
                    return (
                      <div key={m.id} className={`sc-msg${isMine ? ' sc-msg--mine' : ''}`}>
                        <Avatar
                          size="small"
                          style={{ background: colorFromString(u?.name ?? m.authorId) }}
                        >
                          {initials(u?.name ?? m.authorId)}
                        </Avatar>
                        <div>
                          <div className="sc-msg-bubble">
                            {!isMine && (
                              <div
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  marginBottom: 2,
                                  color: 'var(--sg-color-primary)',
                                }}
                              >
                                {u?.name}
                              </div>
                            )}
                            {renderMessageText(m.text)}
                            {m.attachments?.map((a, i) => (
                              <div
                                key={i}
                                style={{
                                  marginTop: 6,
                                  padding: '6px 10px',
                                  background: isMine
                                    ? 'rgba(255,255,255,0.18)'
                                    : 'var(--sg-color-bg)',
                                  border: '1px solid var(--sg-color-border-secondary)',
                                  borderRadius: 6,
                                  fontSize: 12,
                                  display: 'flex',
                                  gap: 6,
                                  alignItems: 'center',
                                }}
                              >
                                📎 <strong>{a.name}</strong> · {a.size}
                              </div>
                            ))}
                          </div>
                          <div
                            className="sc-msg-meta"
                            style={{ textAlign: isMine ? 'right' : 'left' }}
                          >
                            {m.at}
                            {m.pinned && ` · 📌 ${l.pinnedSuffix}`}
                          </div>
                          {m.reactions && m.reactions.length > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                gap: 4,
                                marginTop: 4,
                                justifyContent: isMine ? 'flex-end' : 'flex-start',
                              }}
                            >
                              {m.reactions.map((r, i) => (
                                <Tag key={i} color="default">
                                  {r.emoji} {r.count}
                                </Tag>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <div className="chat-composer">
                <Mentions
                  value={draft}
                  onChange={setDraft}
                  options={mentionOptions}
                  prefix="@"
                  placeholder={l.composerPlaceholder}
                  rows={2}
                />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, gap: 8 }}
                >
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Button size="small" type="text">
                      📎
                    </Button>
                    <Button size="small" type="text">
                      😀
                    </Button>
                    <Button size="small" type="text">
                      📷
                    </Button>
                  </div>
                  <Button type="primary" size="small" onClick={send} disabled={!draft.trim()}>
                    {l.sendButton}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Drawer
        open={showDetails}
        onClose={() => setShowDetails(false)}
        title={active ? (active.type === 'channel' ? `# ${active.name}` : active.name) : ''}
        width={360}
      >
        {active && (
          <>
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ marginBottom: 8 }}>{l.membersHeading(active.members.length)}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {active.members.map((id) => {
                  const u = id === 'me' ? me : userById.get(id)
                  if (!u) return null
                  return (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar size="small" style={{ background: colorFromString(u.name) }}>
                        {initials(u.name)}
                      </Avatar>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13 }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)' }}>
                          {u.role}
                        </div>
                      </div>
                      <Tag color={u.online ? 'success' : 'default'}>
                        {u.online ? l.online : l.offline}
                      </Tag>
                    </div>
                  )
                })}
              </div>
            </div>

            <h4 style={{ marginBottom: 8 }}>{l.activityHeading}</h4>
            <Timeline items={timelineItems} />
          </>
        )}
      </Drawer>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.chat-shell {
  flex: 1;
  display: flex;
  min-height: 0;
}
.chat-side {
  border-right: 1px solid var(--sg-color-border-secondary);
}
.chat-side-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  font-size: 14px;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  flex-shrink: 0;
}
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.chat-composer {
  border-top: 1px solid var(--sg-color-border-secondary);
  padding: 12px 16px;
  flex-shrink: 0;
  background: var(--sg-color-bg);
}
`
