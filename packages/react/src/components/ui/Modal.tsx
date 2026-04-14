import React, { useEffect, useCallback, useId } from 'react'
import { Button } from './Button'
import { Transition } from './Transition'
import { useFocusTrap } from '../../hooks/a11y/useFocusTrap'
import type { BaseComponentProps } from '../../types'

export interface ModalProps extends BaseComponentProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  width?: number | string
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
        <Button type="text" onClick={onClose} unstyled aria-label="Close">x</Button>
      </div>
    )
  }

  return (
    <Transition visible={open} name="sg-fade" unmountOnExit>
      <div className="sg-modal-mask" onClick={onClose}>
        <Transition visible={open} name="sg-zoom" unmountOnExit>
          <div
            ref={trapRef}
            className={['sg-modal', className].filter(Boolean).join(' ')}
            style={{ width }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={children ? bodyId : undefined}
          >
            <div className="sg-modal-header">
              {title && <div className="sg-modal-title" id={titleId}>{title}</div>}
              <Button
                type="text"
                className="sg-modal-close"
                onClick={onClose}
                aria-label="Close"
              >
                &times;
              </Button>
            </div>
            <div className="sg-modal-body" id={bodyId}>{children}</div>
            {footer && <div className="sg-modal-footer">{footer}</div>}
          </div>
        </Transition>
      </div>
    </Transition>
  )
}
