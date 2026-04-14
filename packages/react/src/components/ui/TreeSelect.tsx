import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'

/** A single node in the tree select data source. */
export interface TreeSelectNode {
  /** Unique key used in selection value arrays. */
  key: string
  /** Display label for the node. */
  title: React.ReactNode
  /** Nested child nodes. */
  children?: TreeSelectNode[]
  /** Gray out the node and block selection. */
  disabled?: boolean
  /** Per-node selection enable flag. */
  selectable?: boolean
  /** Per-node checkbox enable flag when the tree is checkable. */
  checkable?: boolean
}

/** Props for the hierarchical dropdown selector. */
export interface TreeSelectProps extends BaseComponentProps, InteractiveProps, SizableProps {
  /** Tree structure to render in the panel. */
  treeData: TreeSelectNode[]
  /** Selected key(s); string for single mode, array when multi or checkable. */
  value?: string | string[]
  /** Initial selection when uncontrolled. */
  defaultValue?: string | string[]
  /** Called when selection changes. */
  onChange?: (value: string | string[]) => void
  /** Allow selecting more than one leaf (toggle keys). */
  multiple?: boolean
  /** Show checkboxes and treat selection as multi-value. */
  treeCheckable?: boolean
  /** Filter visible nodes by a search box in the dropdown. */
  showSearch?: boolean
  /** Show a control to clear the current selection. */
  allowClear?: boolean
  /** Text when nothing is selected. @default 'Select...' */
  placeholder?: string
  /** Expand all parent nodes on first render. @default false */
  treeDefaultExpandAll?: boolean
}

function flattenTree(nodes: TreeSelectNode[], parentDisabled = false): Array<TreeSelectNode & { depth: number }> {
  const result: Array<TreeSelectNode & { depth: number }> = []
  const walk = (items: TreeSelectNode[], depth: number, parentDis: boolean) => {
    for (const node of items) {
      const dis = parentDis || !!node.disabled
      result.push({ ...node, disabled: dis, depth })
      if (node.children) walk(node.children, depth + 1, dis)
    }
  }
  walk(nodes, 0, parentDisabled)
  return result
}

/**
 * Dropdown that lists a tree with expand/collapse, optional search, and single or multi selection.
 */
export function TreeSelect({
  treeData,
  value,
  defaultValue,
  onChange,
  multiple,
  treeCheckable,
  showSearch,
  allowClear,
  placeholder = 'Select...',
  treeDefaultExpandAll = false,
  disabled: disabledProp,
  size: sizeProp,
  className,
  style,
  unstyled,
}: TreeSelectProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled
  const size = sizeProp ?? config.size ?? 'middle'

  const isMulti = multiple || treeCheckable
  const normalizeValue = (v?: string | string[]): string[] => {
    if (!v) return []
    return Array.isArray(v) ? v : [v]
  }

  const [internalValue, setInternalValue] = useState<string[]>(normalizeValue(defaultValue))
  const selectedKeys = normalizeValue(value) ?? internalValue
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => {
    if (treeDefaultExpandAll) {
      const all = new Set<string>()
      const walk = (nodes: TreeSelectNode[]) => {
        for (const n of nodes) {
          if (n.children?.length) { all.add(n.key); walk(n.children) }
        }
      }
      walk(treeData)
      return all
    }
    return new Set()
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const flatNodes = useMemo(() => flattenTree(treeData), [treeData])

  const filteredNodes = useMemo(() => {
    if (!search) return flatNodes
    const q = search.toLowerCase()
    return flatNodes.filter((n) => String(n.title).toLowerCase().includes(q))
  }, [flatNodes, search])

  const visibleNodes = useMemo(() => {
    if (search) return filteredNodes
    return flatNodes.filter((node) => {
      for (const parent of flatNodes) {
        if (parent.children?.some((c) => c.key === node.key)) {
          if (!expandedKeys.has(parent.key)) return false
        }
      }
      return true
    })
  }, [flatNodes, filteredNodes, expandedKeys, search])

  const toggleExpand = useCallback((key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key); else next.add(key)
      return next
    })
  }, [])

  const handleSelect = (key: string) => {
    if (disabled) return
    if (isMulti) {
      const next = selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key]
      setInternalValue(next)
      onChange?.(next)
    } else {
      setInternalValue([key])
      onChange?.(key)
      setOpen(false)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setInternalValue([])
    onChange?.(isMulti ? [] : '' as unknown as string)
  }

  const titleMap = useMemo(() => {
    const m = new Map<string, React.ReactNode>()
    flatNodes.forEach((n) => m.set(n.key, n.title))
    return m
  }, [flatNodes])

  const displayValue = selectedKeys.length > 0
    ? selectedKeys.map((k) => titleMap.get(k) ?? k).join(', ')
    : null

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-tree-select', `sg-tree-select-${size}`, disabled ? 'sg-tree-select-disabled' : '', className].filter(Boolean).join(' ')

  return (
    <div className={wrapperClass} style={style} ref={ref}>
      <div
        className={unstyled ? '' : 'sg-tree-select-selector'}
        onClick={() => !disabled && setOpen(!open)}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="tree"
      >
        <span className={displayValue ? '' : (unstyled ? '' : 'sg-select-placeholder')}>
          {displayValue ?? placeholder}
        </span>
        {allowClear && selectedKeys.length > 0 && !disabled && (
          <span className={unstyled ? '' : 'sg-tree-select-clear'} onClick={handleClear}>×</span>
        )}
      </div>
      {open && (
        <div className={unstyled ? '' : 'sg-tree-select-dropdown'} role="tree">
          {showSearch && (
            <div className={unstyled ? '' : 'sg-tree-select-search'}>
              <input
                className={unstyled ? '' : 'sg-input'}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          )}
          <div className={unstyled ? '' : 'sg-tree-select-tree'}>
            {visibleNodes.map((node) => {
              const hasChildren = !!node.children?.length
              const isExpanded = expandedKeys.has(node.key)
              const isSelected = selectedKeys.includes(node.key)

              return (
                <div
                  key={node.key}
                  className={unstyled ? '' : [
                    'sg-tree-select-node',
                    isSelected ? 'sg-tree-select-node-selected' : '',
                    node.disabled ? 'sg-tree-select-node-disabled' : '',
                  ].filter(Boolean).join(' ')}
                  style={!search ? { paddingLeft: `${node.depth * 20 + 8}px` } : undefined}
                  role="treeitem"
                  aria-selected={isSelected}
                  aria-expanded={hasChildren ? isExpanded : undefined}
                >
                  {hasChildren && !search && (
                    <span
                      className={unstyled ? '' : 'sg-tree-select-switcher'}
                      onClick={() => toggleExpand(node.key)}
                    >
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  )}
                  {treeCheckable && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={node.disabled}
                      onChange={() => !node.disabled && handleSelect(node.key)}
                      className={unstyled ? '' : 'sg-tree-select-checkbox'}
                    />
                  )}
                  <span
                    className={unstyled ? '' : 'sg-tree-select-title'}
                    onClick={() => !node.disabled && (hasChildren && !search ? toggleExpand(node.key) : handleSelect(node.key))}
                  >
                    {node.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
