import React, { useState, useEffect, useRef } from 'react'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationConfig {
  type?: NotificationType
  message: React.ReactNode
  description?: React.ReactNode
  duration?: number
  key?: string
  onClose?: () => void
  placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'
}

interface NotificationItem extends NotificationConfig {
  id: string
}

type Listener = (items: NotificationItem[]) => void

const listeners = new Set<Listener>()
let items: NotificationItem[] = []
let counter = 0

function notify(all: Listener[]) {
  for (const fn of all) fn([...items])
}

function addNotification(config: NotificationConfig) {
  const id = config.key ?? `sg-notif-${++counter}`
  const item: NotificationItem = { ...config, id }
  items = [...items, item]
  notify([...listeners])

  const duration = config.duration ?? 4500
  if (duration > 0) {
    setTimeout(() => removeNotification(id), duration)
  }
}

function removeNotification(id: string) {
  items = items.filter((i) => i.id !== id)
  notify([...listeners])
}

export const notification = {
  open: (config: NotificationConfig) => addNotification(config),
  success: (message: React.ReactNode, description?: React.ReactNode) =>
    addNotification({ type: 'success', message, description }),
  error: (message: React.ReactNode, description?: React.ReactNode) =>
    addNotification({ type: 'error', message, description }),
  warning: (message: React.ReactNode, description?: React.ReactNode) =>
    addNotification({ type: 'warning', message, description }),
  info: (message: React.ReactNode, description?: React.ReactNode) =>
    addNotification({ type: 'info', message, description }),
  destroy: () => {
    items = []
    notify([...listeners])
  },
}

const typeIcons: Record<NotificationType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

export interface NotificationContainerProps {
  placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'
  unstyled?: boolean
}

export function NotificationContainer({
  placement = 'topRight',
  unstyled,
}: NotificationContainerProps) {
  const [list, setList] = useState<NotificationItem[]>([])
  const listenerRef = useRef<Listener>()

  useEffect(() => {
    const fn: Listener = (newItems) => setList(newItems)
    listenerRef.current = fn
    listeners.add(fn)
    return () => { listeners.delete(fn) }
  }, [])

  const filtered = list.filter(
    (i) => (i.placement ?? 'topRight') === placement
  )

  if (filtered.length === 0) return null

  const containerClass = unstyled
    ? undefined
    : `sg-notification-container sg-notification-${placement}`

  return (
    <div className={containerClass}>
      {filtered.map((item) => (
        <NotificationCard
          key={item.id}
          item={item}
          onClose={() => {
            removeNotification(item.id)
            item.onClose?.()
          }}
          unstyled={unstyled}
        />
      ))}
    </div>
  )
}

function NotificationCard({
  item,
  onClose,
  unstyled,
}: {
  item: NotificationItem
  onClose: () => void
  unstyled?: boolean
}) {
  const type = item.type ?? 'info'

  if (unstyled) {
    return (
      <div role="alert">
        <span>{typeIcons[type]}</span>
        <span>{item.message}</span>
        {item.description && <div>{item.description}</div>}
        <button onClick={onClose}>×</button>
      </div>
    )
  }

  return (
    <div className={`sg-notification sg-notification-${type}`} role="alert">
      <div className="sg-notification-icon">{typeIcons[type]}</div>
      <div className="sg-notification-content">
        <div className="sg-notification-message">{item.message}</div>
        {item.description && (
          <div className="sg-notification-description">{item.description}</div>
        )}
      </div>
      <button className="sg-notification-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  )
}
