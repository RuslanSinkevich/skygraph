import React, { useState, useRef, useEffect, useId } from 'react'
import { Button } from './Button'
import { Transition } from './Transition'
import { useFocusTrap } from '../../hooks/a11y/useFocusTrap'
import type { BaseComponentProps } from '../../types'

export interface PopconfirmProps extends BaseComponentProps {
  title: React.ReactNode
  description?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  okText?: string
  cancelText?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactElement
  disabled?: boolean
}

export function Popconfirm({
  title,
  description,
  onConfirm,
  onCancel,
  okText = 'Yes',
  cancelText = 'No',
  placement = 'top',
  children,
  disabled,
  className,
  unstyled,
}: PopconfirmProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const trapRef = useFocusTrap(open)
  const popconfirmId = useId()

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleTrigger = () => {
    if (!disabled) setOpen(!open)
  }

  const handleConfirm = () => {
    setOpen(false)
    onConfirm?.()
  }

  const handleCancel = () => {
    setOpen(false)
    onCancel?.()
  }

  if (unstyled) {
    return (
      <div ref={ref} className={className} style={{ position: 'relative', display: 'inline-block' }}>
        <div onClick={handleTrigger} aria-describedby={open ? popconfirmId : undefined}>{children}</div>
        {open && (
          <div id={popconfirmId} role="alertdialog">
            <div>{title}</div>
            {description && <div>{description}</div>}
            <button onClick={handleCancel}>{cancelText}</button>
            <button onClick={handleConfirm}>{okText}</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={['sg-popconfirm-wrapper', className].filter(Boolean).join(' ')}
    >
      <div onClick={handleTrigger} aria-describedby={open ? popconfirmId : undefined}>{children}</div>
        <Transition visible={open} name="sg-fade" unmountOnExit>
          <div id={popconfirmId} role="alertdialog" ref={trapRef} className={`sg-popconfirm sg-popconfirm-${placement}`}>
          <div className="sg-popconfirm-arrow" />
          <div className="sg-popconfirm-inner">
            <div className="sg-popconfirm-title">
              <span className="sg-popconfirm-icon">⚠</span>
              {title}
            </div>
            {description && (
              <div className="sg-popconfirm-description">{description}</div>
            )}
            <div className="sg-popconfirm-buttons">
              <Button size="small" onClick={handleCancel}>{cancelText}</Button>
              <Button size="small" type="primary" onClick={handleConfirm}>{okText}</Button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}
