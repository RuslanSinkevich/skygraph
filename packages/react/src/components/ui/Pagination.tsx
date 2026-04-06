import React from 'react'

export interface PaginationProps {
  current: number
  total: number
  pageSize?: number
  onChange?: (page: number) => void
  showTotal?: boolean
  disabled?: boolean
  simple?: boolean
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export function Pagination({
  current,
  total,
  pageSize = 10,
  onChange,
  showTotal,
  disabled,
  simple,
  className,
  style,
  unstyled,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safeCurrentPage = Math.min(Math.max(1, current), totalPages)

  const go = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === safeCurrentPage) return
    onChange?.(page)
  }

  const pages = buildPages(safeCurrentPage, totalPages)

  if (unstyled) {
    return (
      <nav className={className} style={style} aria-label="Pagination">
        <button disabled={safeCurrentPage <= 1} onClick={() => go(safeCurrentPage - 1)}>‹</button>
        {pages.map((p, i) =>
          p === '...' ? <span key={`e${i}`}>…</span> : (
            <button key={p} onClick={() => go(p as number)} aria-current={p === safeCurrentPage ? 'page' : undefined}>
              {p}
            </button>
          )
        )}
        <button disabled={safeCurrentPage >= totalPages} onClick={() => go(safeCurrentPage + 1)}>›</button>
      </nav>
    )
  }

  if (simple) {
    return (
      <nav
        className={['sg-pagination sg-pagination-simple', disabled ? 'sg-pagination-disabled' : '', className].filter(Boolean).join(' ')}
        style={style}
        aria-label="Pagination"
      >
        <button className="sg-pagination-item sg-pagination-prev" disabled={safeCurrentPage <= 1} onClick={() => go(safeCurrentPage - 1)}>‹</button>
        <span className="sg-pagination-simple-pager">{safeCurrentPage} / {totalPages}</span>
        <button className="sg-pagination-item sg-pagination-next" disabled={safeCurrentPage >= totalPages} onClick={() => go(safeCurrentPage + 1)}>›</button>
      </nav>
    )
  }

  return (
    <nav
      className={['sg-pagination', disabled ? 'sg-pagination-disabled' : '', className].filter(Boolean).join(' ')}
      style={style}
      aria-label="Pagination"
    >
      {showTotal && (
        <span className="sg-pagination-total">Total {total}</span>
      )}
      <button
        className="sg-pagination-item sg-pagination-prev"
        disabled={safeCurrentPage <= 1}
        onClick={() => go(safeCurrentPage - 1)}
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="sg-pagination-ellipsis">…</span>
        ) : (
          <button
            key={p}
            className={`sg-pagination-item${p === safeCurrentPage ? ' sg-pagination-item-active' : ''}`}
            onClick={() => go(p as number)}
            aria-current={p === safeCurrentPage ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}
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
