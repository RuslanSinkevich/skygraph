import React, { useState, useRef, useId } from 'react'
import { Transition } from './Transition'
import type { BaseComponentProps } from '../../types'

export interface TooltipProps extends BaseComponentProps {
  title: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactElement
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
  const tooltipId = useId()

  if (unstyled) {
    return (
      <div
        className={className}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ position: 'relative', display: 'inline-block' }}
        aria-describedby={visible ? tooltipId : undefined}
      >
        {children}
        {visible && <div id={tooltipId} role="tooltip">{title}</div>}
      </div>
    )
  }

  return (
    <div
      className={['sg-tooltip-wrapper', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={ref}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}
      <Transition visible={visible} name="sg-fade" unmountOnExit>
        <div id={tooltipId} role="tooltip" className={`sg-tooltip sg-tooltip-${placement}`}>
          <div className="sg-tooltip-content">{title}</div>
          <div className="sg-tooltip-arrow" />
        </div>
      </Transition>
    </div>
  )
}
