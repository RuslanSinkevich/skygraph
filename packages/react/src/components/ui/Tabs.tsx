import React, { useState } from 'react'
import { Spin } from './Spin'

export interface TabItem {
  key: string
  label: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (key: string) => void
  className?: string
  unstyled?: boolean
}

export function Tabs({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  className,
  unstyled,
}: TabsProps) {
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
      <div className={className}>
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
    <div className={['sg-tabs', className].filter(Boolean).join(' ')}>
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
            onClick={() => handleClick(item.key, item.disabled, item.loading)}
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
