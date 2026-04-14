import React, { useState, useMemo } from 'react'
import { useConfig } from '../ConfigProvider'
import { Checkbox } from './Checkbox'
import { Button } from './Button'
import { Input } from './Input'
import type { BaseComponentProps, InteractiveProps } from '../../types'

export interface TransferItem {
  key: string
  title: string
  description?: string
  disabled?: boolean
}

export interface TransferProps extends BaseComponentProps, InteractiveProps {
  dataSource: TransferItem[]
  targetKeys?: string[]
  defaultTargetKeys?: string[]
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void
  showSearch?: boolean
  titles?: [string, string]
  render?: (item: TransferItem) => React.ReactNode
  listStyle?: React.CSSProperties
  oneWay?: boolean
}

export function Transfer({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys = [],
  onChange,
  onSelectChange,
  showSearch,
  titles = ['Source', 'Target'],
  render: renderItem,
  listStyle,
  oneWay,
  disabled: disabledProp,
  className,
  style,
  unstyled,
}: TransferProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled
  const locale = config.locale?.transfer

  const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys)
  const targetKeys = controlledTargetKeys ?? internalTargetKeys

  const [sourceSelected, setSourceSelected] = useState<string[]>([])
  const [targetSelected, setTargetSelected] = useState<string[]>([])
  const [sourceSearch, setSourceSearch] = useState('')
  const [targetSearch, setTargetSearch] = useState('')

  const targetKeySet = useMemo(() => new Set(targetKeys), [targetKeys])

  const sourceItems = useMemo(
    () => dataSource.filter((item) => !targetKeySet.has(item.key)),
    [dataSource, targetKeySet],
  )
  const targetItems = useMemo(
    () => dataSource.filter((item) => targetKeySet.has(item.key)),
    [dataSource, targetKeySet],
  )

  const filterItems = (items: TransferItem[], search: string) => {
    if (!search) return items
    const q = search.toLowerCase()
    return items.filter((item) => item.title.toLowerCase().includes(q))
  }

  const toggleSelection = (
    key: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const next = selected.includes(key)
      ? selected.filter((k) => k !== key)
      : [...selected, key]
    setSelected(next)
  }

  const moveRight = () => {
    if (disabled || sourceSelected.length === 0) return
    const newTargetKeys = [...targetKeys, ...sourceSelected]
    setInternalTargetKeys(newTargetKeys)
    onChange?.(newTargetKeys, 'right', sourceSelected)
    setSourceSelected([])
    onSelectChange?.([], targetSelected)
  }

  const moveLeft = () => {
    if (disabled || targetSelected.length === 0) return
    const removeSet = new Set(targetSelected)
    const newTargetKeys = targetKeys.filter((k) => !removeSet.has(k))
    setInternalTargetKeys(newTargetKeys)
    onChange?.(newTargetKeys, 'left', targetSelected)
    setTargetSelected([])
    onSelectChange?.(sourceSelected, [])
  }

  const displayTitles = [
    locale?.titles?.[0] ?? titles[0],
    locale?.titles?.[1] ?? titles[1],
  ]

  const renderList = (
    items: TransferItem[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    title: string,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const filtered = filterItems(items, search)
    const selectAll = () => {
      const allKeys = filtered.filter((i) => !i.disabled).map((i) => i.key)
      setSelected(allKeys)
    }
    const deselectAll = () => setSelected([])
    const allChecked = filtered.length > 0 && filtered.every((i) => i.disabled || selected.includes(i.key))

    return (
      <div className={unstyled ? '' : 'sg-transfer-list'} style={listStyle}>
        <div className={unstyled ? '' : 'sg-transfer-list-header'}>
          <Checkbox
            checked={allChecked}
            disabled={disabled}
            onChange={(checked) => (checked ? selectAll() : deselectAll())}
          >
            {title}
          </Checkbox>
          <span className={unstyled ? '' : 'sg-transfer-list-count'}>
            {selected.length}/{filtered.length}
          </span>
        </div>
        {showSearch && (
          <div className={unstyled ? '' : 'sg-transfer-list-search'}>
            <Input
              placeholder={locale?.searchPlaceholder ?? 'Search'}
              value={search}
              onChange={setSearch}
              disabled={disabled}
              unstyled={unstyled}
            />
          </div>
        )}
        <ul className={unstyled ? '' : 'sg-transfer-list-body'} role="listbox">
          {filtered.map((item) => (
            <li
              key={item.key}
              className={unstyled ? '' : ['sg-transfer-list-item', item.disabled ? 'sg-transfer-list-item-disabled' : ''].filter(Boolean).join(' ')}
              role="option"
              aria-selected={selected.includes(item.key)}
            >
              <Checkbox
                checked={selected.includes(item.key)}
                disabled={disabled || item.disabled}
                onChange={() => toggleSelection(item.key, selected, setSelected)}
                unstyled={unstyled}
              >
                {renderItem ? renderItem(item) : item.title}
              </Checkbox>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className={unstyled ? '' : 'sg-transfer-list-empty'}>
              {locale?.notFoundContent ?? 'No data'}
            </li>
          )}
        </ul>
      </div>
    )
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-transfer', disabled ? 'sg-transfer-disabled' : '', className].filter(Boolean).join(' ')

  return (
    <div className={wrapperClass} style={style}>
      {renderList(sourceItems, sourceSelected, setSourceSelected, displayTitles[0], sourceSearch, setSourceSearch)}
      <div className={unstyled ? '' : 'sg-transfer-operation'}>
        <Button
          type="primary"
          size="small"
          disabled={disabled || sourceSelected.length === 0}
          onClick={moveRight}
          unstyled={unstyled}
        >
          &gt;
        </Button>
        {!oneWay && (
          <Button
            type="primary"
            size="small"
            disabled={disabled || targetSelected.length === 0}
            onClick={moveLeft}
            unstyled={unstyled}
          >
            &lt;
          </Button>
        )}
      </div>
      {renderList(targetItems, targetSelected, setTargetSelected, displayTitles[1], targetSearch, setTargetSearch)}
    </div>
  )
}
