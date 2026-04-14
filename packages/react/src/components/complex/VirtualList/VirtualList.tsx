import React, { forwardRef, useImperativeHandle } from 'react'
import { useVirtualScroll } from '../../../hooks/useVirtualScroll'
import type { VirtualItem } from '@skygraph/core'

export interface VirtualListProps<T = unknown> {
  data: T[]
  itemHeight: number | ((index: number) => number)
  overscan?: number
  renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactNode
  className?: string
  style?: React.CSSProperties
  itemKey?: (item: T, index: number) => React.Key
}

export interface VirtualListRef {
  scrollToIndex: (index: number, align?: 'start' | 'center' | 'end') => void
}

function VirtualListInner<T>(
  props: VirtualListProps<T>,
  ref: React.ForwardedRef<VirtualListRef>,
) {
  const {
    data,
    itemHeight,
    overscan,
    renderItem,
    className,
    style,
    itemKey,
  } = props

  const { range, containerRef, scrollToIndex } = useVirtualScroll({
    itemCount: data.length,
    itemHeight,
    overscan,
  })

  useImperativeHandle(ref, () => ({ scrollToIndex }), [scrollToIndex])

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        overflow: 'auto',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{ height: range.totalHeight, position: 'relative' }}>
        {range.visibleItems.map((vi: VirtualItem) => {
          const item = data[vi.index]
          const key = itemKey ? itemKey(item, vi.index) : vi.index
          const itemStyle: React.CSSProperties = {
            position: 'absolute',
            top: vi.offsetTop,
            left: 0,
            right: 0,
            height: vi.height,
          }
          return (
            <React.Fragment key={key}>
              {renderItem(item, vi.index, itemStyle)}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export const VirtualList = forwardRef(VirtualListInner) as <T>(
  props: VirtualListProps<T> & { ref?: React.Ref<VirtualListRef> },
) => React.ReactElement
