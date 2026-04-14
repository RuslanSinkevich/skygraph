import React, { useEffect, useCallback, useId } from 'react'
import { Button } from './Button'
import { Transition } from './Transition'
import { useFocusTrap } from '../../hooks/a11y/useFocusTrap'
import type { BaseComponentProps } from '../../types'

export interface DrawerProps extends BaseComponentProps {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  placement?: 'left' | 'right' | 'top' | 'bottom'
  width?: number | string
  height?: number | string
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
}

const PLACEMENT_TRANSITION: Record<string, string> = {
  left: 'sg-slide-left',
  right: 'sg-slide-right',
  top: 'sg-slide-down',
  bottom: 'sg-slide-up',
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  placement = 'right',
  width = 378,
  height = 378,
  closable = true,
  mask = true,
  maskClosable = true,
  className,
  style,
  unstyled,
}: DrawerProps) {
  const uid = useId()
  const titleId = `${uid}-title`
  const bodyId = `${uid}-body`
  const trapRef = useFocusTrap(open)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  const isHorizontal = placement === 'left' || placement === 'right'
  const sizeStyle: React.CSSProperties = isHorizontal
    ? { width, height: '100%' }
    : { height, width: '100%' }

  if (unstyled) {
    if (!open) return null
    return (
      <div
        ref={trapRef}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={children ? bodyId : undefined}
      >
        {title && <div id={titleId}>{title}</div>}
        <div id={bodyId}>{children}</div>
        {footer && <div>{footer}</div>}
        {closable && <button onClick={onClose} aria-label="Close">×</button>}
      </div>
    )
  }

  const transitionName = PLACEMENT_TRANSITION[placement] ?? 'sg-slide-right'

  return (
    <Transition visible={open} name="sg-fade" unmountOnExit duration={300}>
      <div className="sg-drawer-root">
        {mask && (
          <div
            className="sg-drawer-mask"
            onClick={maskClosable ? onClose : undefined}
          />
        )}
        <Transition visible={open} name={transitionName} unmountOnExit duration={300}>
          <div
            ref={trapRef}
            className={[
              'sg-drawer',
              `sg-drawer-${placement}`,
              className,
            ].filter(Boolean).join(' ')}
            style={{ ...sizeStyle, ...style }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={children ? bodyId : undefined}
          >
            {(title || closable) && (
              <div className="sg-drawer-header">
                {title && <div className="sg-drawer-title" id={titleId}>{title}</div>}
                {closable && (
                  <Button
                    type="text"
                    className="sg-drawer-close"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    &times;
                  </Button>
                )}
              </div>
            )}
            <div className="sg-drawer-body" id={bodyId}>{children}</div>
            {footer && <div className="sg-drawer-footer">{footer}</div>}
          </div>
        </Transition>
      </div>
    </Transition>
  )
}
