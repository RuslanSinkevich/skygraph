import React, { useState, useRef, useEffect } from 'react'
import { Button } from './Button'

export interface PopconfirmProps {
  title: React.ReactNode
  description?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  okText?: string
  cancelText?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactElement
  disabled?: boolean
  className?: string
  unstyled?: boolean
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
        <div onClick={handleTrigger}>{children}</div>
        {open && (
          <div>
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
      <div onClick={handleTrigger}>{children}</div>
      {open && (
        <div className={`sg-popconfirm sg-popconfirm-${placement}`}>
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
      )}
    </div>
  )
}
