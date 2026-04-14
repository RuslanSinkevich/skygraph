import React from 'react'
import type { BaseComponentProps } from '../../types'

export interface TimelineItem {
  children: React.ReactNode
  color?: string
  dot?: React.ReactNode
  label?: React.ReactNode
  position?: 'left' | 'right'
}

export interface TimelineProps extends BaseComponentProps {
  items: TimelineItem[]
  mode?: 'left' | 'right' | 'alternate'
  pending?: React.ReactNode | boolean
  pendingDot?: React.ReactNode
  reverse?: boolean
}

export function Timeline({
  items: rawItems,
  mode = 'left',
  pending,
  pendingDot,
  reverse,
  className,
  style,
  unstyled,
}: TimelineProps) {
  let items = [...rawItems]

  if (pending) {
    items.push({
      children: typeof pending === 'boolean' ? null : pending,
      dot: pendingDot,
    })
  }

  if (reverse) items = items.reverse()

  const getPosition = (item: TimelineItem, index: number): 'left' | 'right' => {
    if (item.position) return item.position
    if (mode === 'alternate') return index % 2 === 0 ? 'left' : 'right'
    return mode
  }

  if (unstyled) {
    return (
      <ul className={className} style={style}>
        {items.map((item, i) => (
          <li key={i}>
            {item.label && <span>{item.label}</span>}
            <span>{item.dot ?? '●'}</span>
            <span>{item.children}</span>
          </li>
        ))}
      </ul>
    )
  }

  const isPending = !!pending

  return (
    <ul
      className={[
        'sg-timeline',
        `sg-timeline-${mode}`,
        className,
      ].filter(Boolean).join(' ')}
      style={style}
      role="list"
    >
      {items.map((item, i) => {
        const pos = getPosition(item, i)
        const isLast = i === items.length - 1
        const isPendingItem = isPending && isLast

        return (
          <li
            key={i}
            className={[
              'sg-timeline-item',
              `sg-timeline-item-${pos}`,
              isPendingItem ? 'sg-timeline-item-pending' : '',
            ].filter(Boolean).join(' ')}
            role="listitem"
          >
            {item.label !== undefined && (
              <div className="sg-timeline-item-label">{item.label}</div>
            )}
            <div className="sg-timeline-item-head-wrapper">
              <div
                className={[
                  'sg-timeline-item-head',
                  item.dot ? 'sg-timeline-item-head-custom' : '',
                ].filter(Boolean).join(' ')}
                style={item.color && !item.dot ? { borderColor: item.color, color: item.color } : undefined}
              >
                {item.dot}
              </div>
              {!isLast && <div className="sg-timeline-item-tail" />}
            </div>
            <div className="sg-timeline-item-content">{item.children}</div>
          </li>
        )
      })}
    </ul>
  )
}
