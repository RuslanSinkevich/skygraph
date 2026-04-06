import React from 'react'

export interface TagProps {
  color?: 'default' | 'success' | 'error' | 'warning' | 'processing' | string
  closable?: boolean
  onClose?: () => void
  bordered?: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

const presetColors = new Set(['default', 'success', 'error', 'warning', 'processing'])

export function Tag({
  color = 'default',
  closable,
  onClose,
  bordered = true,
  children,
  className,
  style,
  unstyled,
}: TagProps) {
  if (unstyled) {
    return (
      <span className={className} style={style}>
        {children}
        {closable && <span onClick={onClose} role="button">×</span>}
      </span>
    )
  }

  const isPreset = presetColors.has(color)
  const classes = [
    'sg-tag',
    isPreset ? `sg-tag-${color}` : '',
    bordered ? '' : 'sg-tag-borderless',
    className,
  ].filter(Boolean).join(' ')

  const customStyle: React.CSSProperties = isPreset
    ? { ...style }
    : { ...style, background: color, borderColor: color, color: '#fff' }

  return (
    <span className={classes} style={customStyle}>
      {children}
      {closable && (
        <span
          className="sg-tag-close"
          onClick={(e) => {
            e.stopPropagation()
            onClose?.()
          }}
          role="button"
          aria-label="Close"
        >
          ×
        </span>
      )}
    </span>
  )
}
