import React, { useState } from 'react'
import { Spin } from './Spin'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, SizableProps } from '../../types'

export interface TabItem {
  key: string
  label: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
}

export interface TabsProps extends BaseComponentProps, SizableProps {
  items: TabItem[]
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (key: string) => void
}

export function Tabs({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  size: sizeProp,
  className,
  style,
  unstyled,
}: TabsProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const [internalKey, setInternalKey] = useState(
    activeKey ?? defaultActiveKey ?? items[0]?.key ?? ''
  )
  const currentKey = activeKey ?? internalKey
  const activeItem = items.find((i) => i.key === currentKey)

  const handleClick = (key: string, disabled?: boolean, loading?: boolean) => {
    if (disabled || loading) return
    setInternalKey(key)
    onChange?.(key)
  }

  if (unstyled) {
    return (
      <div className={className} style={style}>
        <div role="tablist">
          {items.map((item) => (
            <button
              key={item.key}
              role="tab"
              aria-selected={item.key === currentKey}
              disabled={item.disabled || item.loading}
              onClick={() => handleClick(item.key, item.disabled, item.loading)}
            >
              {item.label}
              {item.loading && <Spin size="small" unstyled />}
            </button>
          ))}
        </div>
        <div role="tabpanel">{activeItem?.children}</div>
      </div>
    )
  }

  return (
    <div className={['sg-tabs', `sg-tabs-${size}`, className].filter(Boolean).join(' ')} style={style}>
      <div className="sg-tabs-nav" role="tablist">
        {items.map((item) => (
          <div
            key={item.key}
            role="tab"
            aria-selected={item.key === currentKey}
            className={[
              'sg-tabs-tab',
              item.key === currentKey ? 'sg-tabs-tab-active' : '',
              item.disabled ? 'sg-tabs-tab-disabled' : '',
              item.loading ? 'sg-tabs-tab-loading' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            tabIndex={item.key === currentKey ? 0 : -1}
            onClick={() => handleClick(item.key, item.disabled, item.loading)}
            onKeyDown={(e) => {
              const enabledItems = items.filter((i) => !i.disabled && !i.loading)
              const curIdx = enabledItems.findIndex((i) => i.key === item.key)
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault()
                const next = enabledItems[(curIdx + 1) % enabledItems.length]
                if (next) handleClick(next.key)
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault()
                const prev = enabledItems[(curIdx - 1 + enabledItems.length) % enabledItems.length]
                if (prev) handleClick(prev.key)
              }
            }}
          >
            {item.label}
            {item.loading && <Spin size="small" unstyled={unstyled} />}
          </div>
        ))}
      </div>
      <div className="sg-tabs-content" role="tabpanel">
        {activeItem?.children}
      </div>
    </div>
  )
}
