import React, { useEffect, useCallback } from 'react'
import { Button } from './Button'

export interface DrawerProps {
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
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
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

  if (!open) return null

  const isHorizontal = placement === 'left' || placement === 'right'
  const sizeStyle: React.CSSProperties = isHorizontal
    ? { width, height: '100%' }
    : { height, width: '100%' }

  if (unstyled) {
    return (
      <div className={className} role="dialog" aria-modal="true">
        {title && <div>{title}</div>}
        <div>{children}</div>
        {footer && <div>{footer}</div>}
        {closable && <button onClick={onClose} aria-label="Close">×</button>}
      </div>
    )
  }

  return (
    <div className="sg-drawer-root">
      {mask && (
        <div
          className="sg-drawer-mask"
          onClick={maskClosable ? onClose : undefined}
        />
      )}
      <div
        className={[
          'sg-drawer',
          `sg-drawer-${placement}`,
          className,
        ].filter(Boolean).join(' ')}
        style={{ ...sizeStyle, ...style }}
        role="dialog"
        aria-modal="true"
      >
        {(title || closable) && (
          <div className="sg-drawer-header">
            {title && <div className="sg-drawer-title">{title}</div>}
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
        <div className="sg-drawer-body">{children}</div>
        {footer && <div className="sg-drawer-footer">{footer}</div>}
      </div>
    </div>
  )
}
