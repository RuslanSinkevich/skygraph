import React from 'react'
import { Button } from '../../ui/Button'
import { TransferList } from './TransferList'
import type { TransferProps, TransferItem } from './types'
import { DEFAULT_TRANSFER_LOCALE } from './types'

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(' ')
}

export function Transfer({
  dataSource,
  targetKeys,
  onChange,
  selectedKeys: controlledSelectedKeys,
  onSelectChange,
  titles,
  render,
  showSearch = false,
  filterOption,
  searchPlaceholder,
  showSelectAll = true,
  disabled = false,
  oneWay = false,
  pagination,
  locale,
  className,
  style,
  unstyled,
}: TransferProps) {
  const mergedLocale = React.useMemo(() => ({
    ...DEFAULT_TRANSFER_LOCALE,
    ...locale,
  }), [locale])

  const [internalSourceSelected, setInternalSourceSelected] = React.useState<string[]>([])
  const [internalTargetSelected, setInternalTargetSelected] = React.useState<string[]>([])

  const sourceSelected = controlledSelectedKeys
    ? controlledSelectedKeys.filter(k => !targetKeys.includes(k))
    : internalSourceSelected
  const targetSelected = controlledSelectedKeys
    ? controlledSelectedKeys.filter(k => targetKeys.includes(k))
    : internalTargetSelected

  const setSourceSelected = (keys: string[]) => {
    if (!controlledSelectedKeys) setInternalSourceSelected(keys)
    onSelectChange?.(keys, targetSelected)
  }

  const setTargetSelected = (keys: string[]) => {
    if (!controlledSelectedKeys) setInternalTargetSelected(keys)
    onSelectChange?.(sourceSelected, keys)
  }

  const targetKeySet = React.useMemo(() => new Set(targetKeys), [targetKeys])

  const sourceItems = React.useMemo(
    () => dataSource.filter(item => !targetKeySet.has(item.key)),
    [dataSource, targetKeySet],
  )

  const targetItems = React.useMemo(
    () => dataSource.filter(item => targetKeySet.has(item.key)),
    [dataSource, targetKeySet],
  )

  const moveToRight = () => {
    const moveKeys = sourceSelected.filter(k => {
      const item = dataSource.find(i => i.key === k)
      return item && !item.disabled
    })
    if (moveKeys.length === 0) return

    const newTargetKeys = [...targetKeys, ...moveKeys]
    onChange?.(newTargetKeys, 'right', moveKeys)
    setSourceSelected([])
  }

  const moveToLeft = () => {
    const moveKeys = targetSelected.filter(k => {
      const item = dataSource.find(i => i.key === k)
      return item && !item.disabled
    })
    if (moveKeys.length === 0) return

    const moveKeySet = new Set(moveKeys)
    const newTargetKeys = targetKeys.filter(k => !moveKeySet.has(k))
    onChange?.(newTargetKeys, 'left', moveKeys)
    setTargetSelected([])
  }

  const canMoveRight = sourceSelected.some(k => {
    const item = dataSource.find(i => i.key === k)
    return item && !item.disabled
  })

  const canMoveLeft = !oneWay && targetSelected.some(k => {
    const item = dataSource.find(i => i.key === k)
    return item && !item.disabled
  })

  if (unstyled) {
    return (
      <div className={className} style={style}>
        <TransferList
          unstyled
          items={sourceItems}
          selectedKeys={sourceSelected}
          onSelect={setSourceSelected}
          title={titles?.[0]}
          render={render}
          showSearch={showSearch}
          filterOption={filterOption}
          searchPlaceholder={searchPlaceholder}
          showSelectAll={showSelectAll}
          disabled={disabled}
          pagination={pagination}
          locale={mergedLocale}
          direction="left"
        />
        <div>
          <button disabled={disabled || !canMoveRight} onClick={moveToRight}>→</button>
          {!oneWay && (
            <button disabled={disabled || !canMoveLeft} onClick={moveToLeft}>←</button>
          )}
        </div>
        <TransferList
          unstyled
          items={targetItems}
          selectedKeys={targetSelected}
          onSelect={setTargetSelected}
          title={titles?.[1]}
          render={render}
          showSearch={showSearch}
          filterOption={filterOption}
          searchPlaceholder={searchPlaceholder}
          showSelectAll={showSelectAll}
          disabled={disabled}
          pagination={pagination}
          locale={mergedLocale}
          direction="right"
        />
      </div>
    )
  }

  return (
    <div className={cls('sg-transfer', disabled && 'sg-transfer-disabled', className)} style={style}>
      <TransferList
        items={sourceItems}
        selectedKeys={sourceSelected}
        onSelect={setSourceSelected}
        title={titles?.[0] ?? 'Source'}
        render={render}
        showSearch={showSearch}
        filterOption={filterOption}
        searchPlaceholder={searchPlaceholder}
        showSelectAll={showSelectAll}
        disabled={disabled}
        pagination={pagination}
        locale={mergedLocale}
        direction="left"
      />

      <div className="sg-transfer-operations">
        <Button
          type="primary"
          size="small"
          disabled={disabled || !canMoveRight}
          onClick={moveToRight}
        >
          →
        </Button>
        {!oneWay && (
          <Button
            type="primary"
            size="small"
            disabled={disabled || !canMoveLeft}
            onClick={moveToLeft}
          >
            ←
          </Button>
        )}
      </div>

      <TransferList
        items={targetItems}
        selectedKeys={targetSelected}
        onSelect={setTargetSelected}
        title={titles?.[1] ?? 'Target'}
        render={render}
        showSearch={showSearch}
        filterOption={filterOption}
        searchPlaceholder={searchPlaceholder}
        showSelectAll={showSelectAll}
        disabled={disabled}
        pagination={pagination}
        locale={mergedLocale}
        direction="right"
      />
    </div>
  )
}
