import React from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, SizableProps } from '../../types'

export interface DescriptionsItem {
  key?: string
  label: React.ReactNode
  children: React.ReactNode
  span?: number
}

export interface DescriptionsProps extends BaseComponentProps, SizableProps {
  title?: React.ReactNode
  items: DescriptionsItem[]
  bordered?: boolean
  column?: number
  layout?: 'horizontal' | 'vertical'
  colon?: boolean
}

function buildRows(items: DescriptionsItem[], column: number): DescriptionsItem[][] {
  const rows: DescriptionsItem[][] = []
  let currentRow: DescriptionsItem[] = []
  let usedSpan = 0

  for (const item of items) {
    const span = Math.min(item.span ?? 1, column)
    if (usedSpan + span > column) {
      rows.push(currentRow)
      currentRow = []
      usedSpan = 0
    }
    currentRow.push(item)
    usedSpan += span
    if (usedSpan >= column) {
      rows.push(currentRow)
      currentRow = []
      usedSpan = 0
    }
  }
  if (currentRow.length > 0) rows.push(currentRow)
  return rows
}

export function Descriptions({
  title,
  items,
  bordered = false,
  column = 3,
  size: sizeProp,
  layout = 'horizontal',
  colon = true,
  className,
  style,
  unstyled,
}: DescriptionsProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const descSize = size === 'small' ? 'small' : 'default'

  const rows = buildRows(items, column)

  if (unstyled) {
    return (
      <div className={className} style={style} role="list">
        {title && <div>{title}</div>}
        <table>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((item, ci) => (
                  <React.Fragment key={item.key ?? ci}>
                    <th>{item.label}{colon ? ':' : ''}</th>
                    <td colSpan={item.span}>{item.children}</td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div
      className={[
        'sg-descriptions',
        `sg-descriptions-${descSize}`,
        bordered ? 'sg-descriptions-bordered' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
      role="list"
    >
      {title && <div className="sg-descriptions-title">{title}</div>}
      <table className="sg-descriptions-table">
        <tbody>
          {rows.map((row, ri) =>
            layout === 'vertical' ? (
              <React.Fragment key={ri}>
                <tr className="sg-descriptions-row">
                  {row.map((item, ci) => (
                    <th
                      key={`label-${item.key ?? ci}`}
                      className="sg-descriptions-item-label"
                      colSpan={item.span ?? 1}
                    >
                      {item.label}
                      {colon && <span className="sg-descriptions-colon">:</span>}
                    </th>
                  ))}
                </tr>
                <tr className="sg-descriptions-row">
                  {row.map((item, ci) => (
                    <td
                      key={`content-${item.key ?? ci}`}
                      className="sg-descriptions-item-content"
                      colSpan={item.span ?? 1}
                    >
                      {item.children}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ) : (
              <tr key={ri} className="sg-descriptions-row">
                {row.map((item, ci) => (
                  <React.Fragment key={item.key ?? ci}>
                    <th className="sg-descriptions-item-label">
                      {item.label}
                      {colon && <span className="sg-descriptions-colon">:</span>}
                    </th>
                    <td className="sg-descriptions-item-content" colSpan={item.span ?? 1}>
                      {item.children}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
