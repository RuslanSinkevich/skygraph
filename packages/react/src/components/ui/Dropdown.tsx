import React, { useState, useRef, useEffect, useId } from 'react'
import { Transition } from './Transition'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps } from '../../types'

export interface DropdownItem {
  key: string
  label: React.ReactNode
  disabled?: boolean
  danger?: boolean
  divider?: boolean
}

export interface DropdownProps extends BaseComponentProps {
  items: DropdownItem[]
  onSelect?: (key: string) => void
  trigger?: 'click' | 'hover'
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
  disabled?: boolean
  children: React.ReactElement
}

export function Dropdown({
  items,
  onSelect,
  trigger = 'hover',
  placement = 'bottomLeft',
  disabled: disabledProp,
  children,
  className,
  unstyled,
}: DropdownProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled ?? false

  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const menuId = useId()

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

  useEffect(() => {
    if (!open) setFocusedIndex(-1)
  }, [open])

  const getNextMenuIndex = (current: number, direction: 1 | -1) => {
    let next = current
    for (let i = 0; i < items.length; i++) {
      next = (next + direction + items.length) % items.length
      if (!items[next].divider && !items[next].disabled) return next
    }
    return current
  }

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (open && focusedIndex >= 0 && !items[focusedIndex].divider) {
          handleSelect(items[focusedIndex])
        } else {
          setOpen(!open)
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) setOpen(true)
        else setFocusedIndex((i) => getNextMenuIndex(i, 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) setOpen(true)
        else setFocusedIndex((i) => getNextMenuIndex(i, -1))
        break
    }
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
      <div
        className="sg-dropdown-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
      <Transition visible={open} name="sg-slide-up" unmountOnExit>
        <div
          className={`sg-dropdown sg-dropdown-${placement}`}
          role="menu"
          id={menuId}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item, idx) =>
            item.divider ? (
              <div key={item.key} className="sg-dropdown-divider" role="separator" />
            ) : (
              <div
                key={item.key}
                role="menuitem"
                className={[
                  'sg-dropdown-item',
                  item.disabled ? 'sg-dropdown-item-disabled' : '',
                  item.danger ? 'sg-dropdown-item-danger' : '',
                  idx === focusedIndex ? 'sg-dropdown-item-focused' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </div>
            )
          )}
        </div>
      </Transition>
    </div>
  )
}
