import React from 'react'

export interface BadgeProps {
  count?: number
  dot?: boolean
  overflowCount?: number
  showZero?: boolean
  color?: string
  status?: 'success' | 'error' | 'warning' | 'processing' | 'default'
  text?: React.ReactNode
  offset?: [number, number]
  children?: React.ReactNode
  className?: string
  unstyled?: boolean
}

export function Badge({
  count,
  dot,
  overflowCount = 99,
  showZero,
  color,
  status,
  text,
  offset,
  children,
  className,
  unstyled,
}: BadgeProps) {
  const hasCount = count !== undefined && (count > 0 || showZero)
  const displayCount = hasCount
    ? count! > overflowCount ? `${overflowCount}+` : `${count}`
    : null

  if (unstyled) {
    return (
      <span className={className} style={{ position: 'relative', display: 'inline-block' }}>
        {children}
        {(dot || hasCount) && <sup>{displayCount}</sup>}
        {status && <span>{text}</span>}
      </span>
    )
  }

  if (status && !children) {
    return (
      <span className={['sg-badge-status', className].filter(Boolean).join(' ')}>
        <span
          className={`sg-badge-status-dot sg-badge-status-${status}`}
          style={color ? { background: color } : undefined}
        />
        {text && <span className="sg-badge-status-text">{text}</span>}
      </span>
    )
  }

  const offsetStyle: React.CSSProperties | undefined = offset
    ? { right: -offset[0], marginTop: offset[1] }
    : undefined

  return (
    <span className={['sg-badge', className].filter(Boolean).join(' ')}>
      {children}
      {dot && !hasCount && (
        <sup className="sg-badge-dot" style={{ ...offsetStyle, ...(color ? { background: color } : {}) }} />
      )}
      {hasCount && (
        <sup
          className="sg-badge-count"
          style={{ ...offsetStyle, ...(color ? { background: color } : {}) }}
        >
          {displayCount}
        </sup>
      )}
    </span>
  )
}
