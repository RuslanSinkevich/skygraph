import { useState } from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps } from '../../types'
import type React from 'react'

export interface PaginationProps extends BaseComponentProps {
  current: number
  total: number
  pageSize?: number
  onChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode)
  disabled?: boolean
  simple?: boolean
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  showQuickJumper?: boolean
}

export function Pagination({
  current,
  total,
  pageSize = 10,
  onChange,
  onPageSizeChange,
  showTotal,
  disabled: disabledProp,
  simple,
  showSizeChanger,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper,
  className,
  style,
  unstyled,
}: PaginationProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled ?? false
  const [jumpValue, setJumpValue] = useState('')

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safeCurrentPage = Math.min(Math.max(1, current), totalPages)
  const rangeStart = (safeCurrentPage - 1) * pageSize + 1
  const rangeEnd = Math.min(safeCurrentPage * pageSize, total)

  const go = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === safeCurrentPage) return
    onChange?.(page)
  }

  const handleJump = () => {
    const num = parseInt(jumpValue, 10)
    if (!isNaN(num)) {
      go(num)
    }
    setJumpValue('')
  }

  const pages = buildPages(safeCurrentPage, totalPages)

  const renderTotal = () => {
    if (!showTotal) return null
    if (typeof showTotal === 'function') {
      return (
        <span className="sg-pagination-total">
          {showTotal(total, [rangeStart, rangeEnd])}
        </span>
      )
    }
    return <span className="sg-pagination-total">Total {total}</span>
  }

  const renderSizeChanger = () => {
    if (!showSizeChanger) return null
    return (
      <select
        className="sg-pagination-size-changer"
        value={pageSize}
        onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
        disabled={disabled}
      >
        {pageSizeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt} / page
          </option>
        ))}
      </select>
    )
  }

  const renderQuickJumper = () => {
    if (!showQuickJumper) return null
    return (
      <span className="sg-pagination-quick-jumper">
        Go to
        <input
          type="text"
          value={jumpValue}
          onChange={(e) => setJumpValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleJump()
          }}
          onBlur={handleJump}
          disabled={disabled}
          className="sg-pagination-jumper-input"
        />
      </span>
    )
  }

  if (unstyled) {
    return (
      <nav className={className} style={style} aria-label="Pagination">
        <button disabled={safeCurrentPage <= 1} onClick={() => go(safeCurrentPage - 1)}>‹</button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`e${i}`}>…</span>
          ) : (
            <button
              key={p}
              onClick={() => go(p as number)}
              aria-current={p === safeCurrentPage ? 'page' : undefined}
            >
              {p}
            </button>
          ),
        )}
        <button disabled={safeCurrentPage >= totalPages} onClick={() => go(safeCurrentPage + 1)}>
          ›
        </button>
      </nav>
    )
  }

  if (simple) {
    return (
      <nav
        className={[
          'sg-pagination sg-pagination-simple',
          disabled ? 'sg-pagination-disabled' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        aria-label="Pagination"
      >
        <button
          className="sg-pagination-item sg-pagination-prev"
          disabled={safeCurrentPage <= 1}
          onClick={() => go(safeCurrentPage - 1)}
        >
          ‹
        </button>
        <span className="sg-pagination-simple-pager">
          {safeCurrentPage} / {totalPages}
        </span>
        <button
          className="sg-pagination-item sg-pagination-next"
          disabled={safeCurrentPage >= totalPages}
          onClick={() => go(safeCurrentPage + 1)}
        >
          ›
        </button>
      </nav>
    )
  }

  return (
    <nav
      className={['sg-pagination', disabled ? 'sg-pagination-disabled' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      aria-label="Pagination"
    >
      {renderTotal()}
      <button
        className="sg-pagination-item sg-pagination-prev"
        disabled={safeCurrentPage <= 1}
        onClick={() => go(safeCurrentPage - 1)}
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="sg-pagination-ellipsis">
            …
          </span>
        ) : (
          <button
            key={p}
            className={`sg-pagination-item${p === safeCurrentPage ? ' sg-pagination-item-active' : ''}`}
            onClick={() => go(p as number)}
            aria-current={p === safeCurrentPage ? 'page' : undefined}
          >
            {p}
          </button>
        ),
      )}
      <button
        className="sg-pagination-item sg-pagination-next"
        disabled={safeCurrentPage >= totalPages}
        onClick={() => go(safeCurrentPage + 1)}
      >
        ›
      </button>
      {renderSizeChanger()}
      {renderQuickJumper()}
    </nav>
  )
}

function buildPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)
  return pages
}
