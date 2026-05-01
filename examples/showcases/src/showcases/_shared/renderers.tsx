import type { ReactNode } from 'react'
import { Tag, Avatar } from '@skygraph/react'
import { statusColor } from './statusColors'
import { initials, colorFromString } from './formatters'

/**
 * Reusable cell renderers for `<Table>` columns. Avoid re-implementing
 * "render Tag for status" or "Avatar + name + email" in every showcase.
 */

export function renderStatusTag(value: unknown): ReactNode {
  const v = String(value ?? '')
  if (!v) return null
  return <Tag color={statusColor(v)}>{v}</Tag>
}

export function renderUserCell(opts: {
  name: string
  email?: string
  avatar?: string
  size?: 'small' | 'middle' | 'large'
}): ReactNode {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Avatar
        size={opts.size ?? 'small'}
        style={{ background: colorFromString(opts.name) }}
      >
        {opts.avatar ?? initials(opts.name)}
      </Avatar>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {opts.name}
        </div>
        {opts.email && (
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {opts.email}
          </div>
        )}
      </div>
    </div>
  )
}

export function renderRatingBar(value: unknown, max = 5): ReactNode {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  const pct = Math.max(0, Math.min(100, (n / max) * 100))
  const color = n >= max * 0.8 ? '#52c41a' : n >= max * 0.6 ? '#faad14' : '#ff4d4f'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{ flex: 1, height: 6, background: 'var(--sg-color-border-secondary, #f0f0f0)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 12, minWidth: 28 }}>{n.toFixed(1)}</span>
    </div>
  )
}

export function renderTrend(value: unknown): ReactNode {
  const t = String(value)
  if (t === 'up') return <Tag color="success">↑ Up</Tag>
  if (t === 'down') return <Tag color="error">↓ Down</Tag>
  return <Tag color="default">→ Flat</Tag>
}
