import { useState, useRef, useEffect, type ReactNode } from 'react'
import type { BaseComponentProps, SizableProps } from '../../types'

/** Single menu entry: leaf item, submenu, group heading, or divider. */
export interface MenuItem {
  /** Unique key for selection and open-state tracking. */
  key: string
  /** Visible label or custom node. */
  label: ReactNode
  /** Optional icon shown before the label. */
  icon?: ReactNode
  /** When true, the item cannot be activated. */
  disabled?: boolean
  /** When true, styles the item as a destructive action. */
  danger?: boolean
  /** Nested items for a submenu; omit for a leaf. */
  children?: MenuItem[]
  /** Renders as a titled group or a non-interactive divider. */
  type?: 'group' | 'divider'
}

/** Props for the hierarchical menu with optional inline, horizontal, or vertical layout. */
export interface MenuProps extends BaseComponentProps, SizableProps {
  /** Top-level menu items (may include groups and nested submenus). */
  items: MenuItem[]
  /** Layout and interaction mode for the root menu. @default 'vertical' */
  mode?: 'vertical' | 'horizontal' | 'inline'
  /** Controlled list of selected item keys. */
  selectedKeys?: string[]
  /** Initial selected keys when `selectedKeys` is not set. @default [] */
  defaultSelectedKeys?: string[]
  /** Controlled list of keys for expanded inline submenus. */
  openKeys?: string[]
  /** Initial open submenu keys when `openKeys` is not set. @default [] */
  defaultOpenKeys?: string[]
  /** Called after the user selects a leaf item. */
  onSelect?: (info: { key: string; selectedKeys: string[] }) => void
  /** Called when inline submenu expand/collapse state changes. */
  onOpenChange?: (openKeys: string[]) => void
  /** Collapses inline mode to icons only at the root level. @default false */
  inlineCollapsed?: boolean
  /** Built-in color scheme for styled menus. @default 'light' */
  theme?: 'light' | 'dark'
}

/**
 * Renders an accessible menu tree with support for groups, dividers, and nested submenus.
 * Supports controlled or uncontrolled selection and open keys.
 */
export function Menu({
  items,
  mode = 'vertical',
  selectedKeys,
  defaultSelectedKeys = [],
  openKeys,
  defaultOpenKeys = [],
  onSelect,
  onOpenChange,
  inlineCollapsed = false,
  theme = 'light',
  className,
  style,
  unstyled,
}: MenuProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>(
    selectedKeys ?? defaultSelectedKeys
  )
  const [internalOpen, setInternalOpen] = useState<string[]>(
    openKeys ?? defaultOpenKeys
  )

  const currentSelected = selectedKeys ?? internalSelected
  const currentOpen = openKeys ?? internalOpen

  const handleSelect = (key: string) => {
    const next = [key]
    setInternalSelected(next)
    onSelect?.({ key, selectedKeys: next })
  }

  const toggleOpen = (key: string) => {
    const next = currentOpen.includes(key)
      ? currentOpen.filter((k) => k !== key)
      : [...currentOpen, key]
    setInternalOpen(next)
    onOpenChange?.(next)
  }

  if (unstyled) {
    return (
      <ul role="menu" className={className} style={style}>
        {items.map((item) => (
          <UnstyledMenuItem
            key={item.key}
            item={item}
            selectedKeys={currentSelected}
            openKeys={currentOpen}
            onSelect={handleSelect}
            onToggleOpen={toggleOpen}
          />
        ))}
      </ul>
    )
  }

  const rootClasses = [
    'sg-menu',
    `sg-menu-${mode}`,
    `sg-menu-${theme}`,
    inlineCollapsed ? 'sg-menu-collapsed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <ul role="menu" className={rootClasses} style={style}>
      {items.map((item) => (
        <StyledMenuItem
          key={item.key}
          item={item}
          mode={mode}
          selectedKeys={currentSelected}
          openKeys={currentOpen}
          onSelect={handleSelect}
          onToggleOpen={toggleOpen}
          inlineCollapsed={inlineCollapsed}
          depth={0}
        />
      ))}
    </ul>
  )
}

/* ---- Unstyled (headless) ---- */

function UnstyledMenuItem({
  item,
  selectedKeys,
  openKeys,
  onSelect,
  onToggleOpen,
}: {
  item: MenuItem
  selectedKeys: string[]
  openKeys: string[]
  onSelect: (key: string) => void
  onToggleOpen: (key: string) => void
}) {
  if (item.type === 'divider') return <li role="separator" />
  if (item.type === 'group') {
    return (
      <li role="group">
        <span>{item.label}</span>
        <ul role="menu">
          {item.children?.map((child) => (
            <UnstyledMenuItem
              key={child.key}
              item={child}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onSelect={onSelect}
              onToggleOpen={onToggleOpen}
            />
          ))}
        </ul>
      </li>
    )
  }
  if (item.children?.length) {
    const isOpen = openKeys.includes(item.key)
    return (
      <li>
        <button
          disabled={item.disabled}
          aria-expanded={isOpen}
          onClick={() => onToggleOpen(item.key)}
        >
          {item.icon}
          {item.label}
        </button>
        {isOpen && (
          <ul role="menu">
            {item.children.map((child) => (
              <UnstyledMenuItem
                key={child.key}
                item={child}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onSelect={onSelect}
                onToggleOpen={onToggleOpen}
              />
            ))}
          </ul>
        )}
      </li>
    )
  }
  return (
    <li
      role="menuitem"
      aria-selected={selectedKeys.includes(item.key)}
      onClick={() => !item.disabled && onSelect(item.key)}
    >
      {item.icon}
      {item.label}
    </li>
  )
}

/* ---- Styled ---- */

function StyledMenuItem({
  item,
  mode,
  selectedKeys,
  openKeys,
  onSelect,
  onToggleOpen,
  inlineCollapsed,
  depth,
}: {
  item: MenuItem
  mode: 'vertical' | 'horizontal' | 'inline'
  selectedKeys: string[]
  openKeys: string[]
  onSelect: (key: string) => void
  onToggleOpen: (key: string) => void
  inlineCollapsed: boolean
  depth: number
}) {
  const popoverRef = useRef<HTMLLIElement>(null)
  const [hoverOpen, setHoverOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  if (item.type === 'divider') {
    return <li className="sg-menu-divider" role="separator" />
  }

  if (item.type === 'group') {
    return (
      <li className="sg-menu-group" role="group">
        <div className="sg-menu-group-title">{item.label}</div>
        <ul className="sg-menu-group-list" role="menu">
          {item.children?.map((child) => (
            <StyledMenuItem
              key={child.key}
              item={child}
              mode={mode}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onSelect={onSelect}
              onToggleOpen={onToggleOpen}
              inlineCollapsed={inlineCollapsed}
              depth={depth}
            />
          ))}
        </ul>
      </li>
    )
  }

  const hasChildren = !!(item.children && item.children.length > 0)
  const isSelected = selectedKeys.includes(item.key)
  const isInlineOpen = openKeys.includes(item.key)
  const showPopover = mode !== 'inline' && hasChildren
  const showInlineSub = mode === 'inline' && hasChildren

  const itemClasses = [
    'sg-menu-item',
    isSelected && !hasChildren ? 'sg-menu-item-selected' : '',
    item.disabled ? 'sg-menu-item-disabled' : '',
    item.danger ? 'sg-menu-item-danger' : '',
    hasChildren ? 'sg-menu-submenu' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleMouseEnter = () => {
    if (!showPopover || item.disabled) return
    clearTimeout(timerRef.current)
    setHoverOpen(true)
  }

  const handleMouseLeave = () => {
    if (!showPopover) return
    timerRef.current = setTimeout(() => setHoverOpen(false), 150)
  }

  const handleItemClick = () => {
    if (item.disabled) return
    if (showInlineSub) {
      onToggleOpen(item.key)
      return
    }
    if (!hasChildren) {
      onSelect(item.key)
    }
  }

  const paddingLeft =
    mode === 'inline' && !inlineCollapsed ? `${24 + depth * 24}px` : undefined

  return (
    <li
      ref={popoverRef}
      className={[
        hasChildren ? 'sg-menu-submenu-wrapper' : '',
        showPopover && hoverOpen ? 'sg-menu-submenu-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        role="menuitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? (showPopover ? hoverOpen : isInlineOpen) : undefined}
        className={itemClasses}
        style={{ paddingLeft }}
        onClick={handleItemClick}
      >
        {item.icon && <span className="sg-menu-item-icon">{item.icon}</span>}
        {!(inlineCollapsed && depth === 0) && (
          <span className="sg-menu-item-label">{item.label}</span>
        )}
        {hasChildren && (
          <span
            className={[
              'sg-menu-submenu-arrow',
              (showPopover ? hoverOpen : isInlineOpen)
                ? 'sg-menu-submenu-arrow-open'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        )}
      </div>

      {/* Inline submenu */}
      {showInlineSub && (
        <ul
          className={[
            'sg-menu-inline-sub',
            isInlineOpen ? 'sg-menu-inline-sub-open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          role="menu"
        >
          {item.children!.map((child) => (
            <StyledMenuItem
              key={child.key}
              item={child}
              mode={mode}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onSelect={onSelect}
              onToggleOpen={onToggleOpen}
              inlineCollapsed={inlineCollapsed}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}

      {/* Popover submenu (vertical / horizontal) */}
      {showPopover && hoverOpen && (
        <ul className="sg-menu-popup" role="menu">
          {item.children!.map((child) => (
            <StyledMenuItem
              key={child.key}
              item={child}
              mode={mode}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onSelect={onSelect}
              onToggleOpen={onToggleOpen}
              inlineCollapsed={false}
              depth={0}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
