import React, { useState, useRef } from 'react'

export interface TooltipProps {
  title: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactElement
  className?: string
  unstyled?: boolean
}

export function Tooltip({
  title,
  placement = 'top',
  children,
  className,
  unstyled,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  if (unstyled) {
    return (
      <div
        className={className}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {children}
        {visible && <div>{title}</div>}
      </div>
    )
  }

  return (
    <div
      className={['sg-tooltip-wrapper', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={ref}
    >
      {children}
      {visible && (
        <div className={`sg-tooltip sg-tooltip-${placement}`}>
          <div className="sg-tooltip-content">{title}</div>
          <div className="sg-tooltip-arrow" />
        </div>
      )}
    </div>
  )
}
