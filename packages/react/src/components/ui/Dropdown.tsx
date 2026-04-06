import React, { useState, useRef, useEffect } from 'react'

export interface DropdownItem {
  key: string
  label: React.ReactNode
  disabled?: boolean
  danger?: boolean
  divider?: boolean
}

export interface DropdownProps {
  items: DropdownItem[]
  onSelect?: (key: string) => void
  trigger?: 'click' | 'hover'
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
  disabled?: boolean
  children: React.ReactElement
  className?: string
  unstyled?: boolean
}

export function Dropdown({
  items,
  onSelect,
  trigger = 'hover',
  placement = 'bottomLeft',
  disabled,
  children,
  className,
  unstyled,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

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

  const handleMouseEnter = () => {
    if (trigger !== 'hover' || disabled) return
    clearTimeout(timerRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    if (trigger !== 'hover') return
    timerRef.current = setTimeout(() => setOpen(false), 100)
  }

  const handleClick = () => {
    if (trigger !== 'click' || disabled) return
    setOpen(!open)
  }

  const handleSelect = (item: DropdownItem) => {
    if (item.disabled) return
    setOpen(false)
    onSelect?.(item.key)
  }

  if (unstyled) {
    return (
      <div ref={ref} className={className} style={{ position: 'relative', display: 'inline-block' }}>
        <div onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </div>
        {open && (
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {items.map((item) =>
              item.divider ? <hr key={item.key} /> : (
                <div key={item.key} onClick={() => handleSelect(item)}>{item.label}</div>
              )
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={['sg-dropdown-wrapper', className].filter(Boolean).join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sg-dropdown-trigger" onClick={handleClick}>
        {children}
      </div>
      {open && (
        <div
          className={`sg-dropdown sg-dropdown-${placement}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item) =>
            item.divider ? (
              <div key={item.key} className="sg-dropdown-divider" />
            ) : (
              <div
                key={item.key}
                className={[
                  'sg-dropdown-item',
                  item.disabled ? 'sg-dropdown-item-disabled' : '',
                  item.danger ? 'sg-dropdown-item-danger' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
