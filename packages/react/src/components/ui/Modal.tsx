import React, { useEffect, useCallback } from 'react'
import { Button } from './Button'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  width?: number | string
  className?: string
  unstyled?: boolean
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 520,
  className,
  unstyled,
}: ModalProps) {
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

  if (unstyled) {
    return (
      <div className={className} role="dialog" aria-modal="true">
        {title && <div>{title}</div>}
        <div>{children}</div>
        {footer && <div>{footer}</div>}
        <Button type="text" onClick={onClose} unstyled aria-label="Close">x</Button>
      </div>
    )
  }

  return (
    <div className="sg-modal-mask" onClick={onClose}>
      <div
        className={['sg-modal', className].filter(Boolean).join(' ')}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="sg-modal-header">
          {title && <div className="sg-modal-title">{title}</div>}
          <Button
            type="text"
            className="sg-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </Button>
        </div>
        <div className="sg-modal-body">{children}</div>
        {footer && <div className="sg-modal-footer">{footer}</div>}
      </div>
    </div>
  )
}
