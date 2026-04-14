import React, { useEffect, useRef, useState } from 'react'

export interface ContextMenuItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  danger?: boolean
  disabled?: boolean
  divider?: boolean
  onClick?: () => void
  children?: ContextMenuItem[]
}

export interface ContextMenuState {
  x: number
  y: number
  items: ContextMenuItem[]
}

interface ContextMenuProps {
  state: ContextMenuState | null
  onClose: () => void
}

export function ContextMenu({ state, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [subMenu, setSubMenu] = useState<{ key: string; x: number; y: number; items: ContextMenuItem[] } | null>(null)

  useEffect(() => {
    if (!state) return
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const handleScroll = () => onClose()

    document.addEventListener('mousedown', handle)
    document.addEventListener('keydown', handleKey)
    window.addEventListener('scroll', handleScroll, true)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('keydown', handleKey)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [state, onClose])

  if (!state) return null

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: state.y,
    left: state.x,
    zIndex: 1050,
    minWidth: 160,
    background: 'var(--sg-bg-elevated, #fff)',
    border: '1px solid var(--sg-border, #d9d9d9)',
    borderRadius: 'var(--sg-radius, 6px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
    padding: '4px 0',
    fontSize: 14,
  }

  const renderItems = (items: ContextMenuItem[], isSubmenu = false) => (
    <div
      ref={isSubmenu ? undefined : ref}
      className="sg-context-menu"
      style={isSubmenu ? { ...menuStyle, position: 'absolute', top: 0, left: '100%' } : menuStyle}
      role="menu"
    >
      {items.map((item) => {
        if (item.divider) {
          return (
            <div
              key={item.key}
              className="sg-context-menu-divider"
              style={{ height: 1, margin: '4px 0', background: 'var(--sg-border-light, #f0f0f0)' }}
            />
          )
        }

        const itemStyle: React.CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 12px',
          cursor: item.disabled ? 'not-allowed' : 'pointer',
          opacity: item.disabled ? 0.4 : 1,
          color: item.danger ? 'var(--sg-error, #ff4d4f)' : 'inherit',
          position: 'relative',
        }

        return (
          <div
            key={item.key}
            className="sg-context-menu-item"
            style={itemStyle}
            role="menuitem"
            onClick={() => {
              if (item.disabled) return
              item.onClick?.()
              if (!item.children) onClose()
            }}
            onMouseEnter={(e) => {
              if (item.children) {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                setSubMenu({ key: item.key, x: rect.right, y: rect.top, items: item.children })
              } else {
                setSubMenu(null)
              }
            }}
          >
            {item.icon && <span className="sg-context-menu-icon">{item.icon}</span>}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.children && <span style={{ marginLeft: 8, opacity: 0.5 }}>›</span>}
            {subMenu?.key === item.key && item.children && renderItems(item.children, true)}
          </div>
        )
      })}
    </div>
  )

  return renderItems(state.items)
}
