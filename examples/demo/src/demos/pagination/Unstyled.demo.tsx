import { useState } from 'react'
import { Pagination } from '@skygraph/react'

/**
 * `unstyled` drops the `sg-pagination-*` classes but keeps the
 * clamping, ellipsis folding, `aria-current="page"` and disabled
 * logic. Style the buttons with a sibling selector.
 */
export function UnstyledPagination() {
  const [page, setPage] = useState(2)
  return (
    <div
      style={{
        display: 'inline-flex',
        gap: 6,
        padding: 8,
        background: '#0f172a',
        borderRadius: 8,
      }}
    >
      <style>{`
        .sg-unstyled-pager button { cursor: pointer; border: none; background: transparent; color: #e2e8f0; padding: 6px 10px; border-radius: 4px; font-size: 13px; }
        .sg-unstyled-pager button:hover { background: rgba(148, 163, 184, 0.15); }
        .sg-unstyled-pager button[aria-current="page"] { background: #38bdf8; color: #0b1120; font-weight: 600; }
        .sg-unstyled-pager button:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
      <Pagination
        unstyled
        className="sg-unstyled-pager"
        current={page}
        total={50}
        onChange={setPage}
      />
    </div>
  )
}
