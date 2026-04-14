import React, { useState, useRef, useId } from 'react'
import { Transition } from './Transition'
import type { BaseComponentProps } from '../../types'

/** Props for the Tooltip component. */
export interface TooltipProps extends BaseComponentProps {
  /** Content shown in the tooltip on hover. */
  title: React.ReactNode
  /** Tooltip position relative to the trigger. @default 'top' */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Single React element that receives hover handlers as the trigger. */
  children: React.ReactElement
}

/**
 * Shows floating help text on hover, with optional placement and fade transition.
 */
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
