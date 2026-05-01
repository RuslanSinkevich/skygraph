import type { ReactNode } from 'react'
import { Progress } from '@skygraph/react'

/**
 * Shared KPI / stats card row used by every "dashboard-style" showcase.
 * Replaces six near-identical local copies.
 */

export interface StatItem {
  key?: string
  label: ReactNode
  value: ReactNode
  /** Optional sub-line (e.g. "vs prev period", "of 200 total"). */
  sub?: ReactNode
  /** Tone for sub line. */
  subTone?: 'default' | 'success' | 'error' | 'warning'
  /** Optional progress bar under the value (0-100). */
  progress?: number
  progressStatus?: 'success' | 'active' | 'error'
  /** Inline icon / emoji on the left of the label. */
  icon?: ReactNode
}

export interface StatsRowProps {
  items: StatItem[]
  className?: string
  /** Override grid min column width. */
  minColumnWidth?: number
}

const toneVar: Record<NonNullable<StatItem['subTone']>, string> = {
  default: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))',
  success: 'var(--sg-color-success, #52c41a)',
  error: 'var(--sg-color-error, #ff4d4f)',
  warning: 'var(--sg-color-warning, #faad14)',
}

export function StatsRow({ items, className, minColumnWidth = 180 }: StatsRowProps) {
  return (
    <div
      className={['stats-row', className].filter(Boolean).join(' ')}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))` }}
    >
      {items.map((it, i) => (
        <div key={it.key ?? i} className="stat-card">
          <div className="stat-card-label">
            {it.icon && <span style={{ marginRight: 6 }}>{it.icon}</span>}
            {it.label}
          </div>
          <div className="stat-card-value">{it.value}</div>
          {it.progress !== undefined && (
            <Progress
              percent={it.progress}
              showInfo={false}
              status={it.progressStatus ?? 'active'}
            />
          )}
          {it.sub !== undefined && (
            <div
              className="stat-card-sub"
              style={{ color: toneVar[it.subTone ?? 'default'] }}
            >
              {it.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
